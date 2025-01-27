import cv2
import mediapipe as mp
import os
import numpy as np
import pickle

class FaceRecognizer:
    def __init__(self, database_path):
        # MediaPipe face detection and landmark setup
        self.mp_face_detection = mp.solutions.face_detection
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_detection = self.mp_face_detection.FaceDetection(min_detection_confidence=0.5)
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=True, 
            max_num_faces=1, 
            min_detection_confidence=0.5
        )
        
        # Known faces database
        self.known_faces = []
        self.known_labels = []
        self.database_path = database_path
        
        # Load or create database
        self.process_database()

    def extract_face_features(self, img):
        # Convert to RGB for MediaPipe
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Detect face
        detection_results = self.face_detection.process(rgb_img)
        
        if not detection_results.detections:
            return None
        
        # Get face box
        detection = detection_results.detections[0]
        h, w, _ = img.shape
        bbox = detection.location_data.relative_bounding_box
        x, y = int(bbox.xmin * w), int(bbox.ymin * h)
        width, height = int(bbox.width * w), int(bbox.height * h)
        
        # Extract face region
        face_img = img[y:y+height, x:x+width]
        
        # Resize and normalize
        face_img = cv2.resize(face_img, (224, 224))
        normalized_face = face_img.astype('float32') / 255.0
        
        return normalized_face

    def process_database(self):
        # Check if processed database exists
        cache_path = os.path.join(self.database_path, 'face_database.pkl')
        
        if os.path.exists(cache_path):
            # Load processed database
            with open(cache_path, 'rb') as f:
                data = pickle.load(f)
                self.known_faces = data['features']
                self.known_labels = data['labels']
        else:
            # Process database images
            for filename in os.listdir(self.database_path):
                if filename.endswith(('.jpg', '.jpeg', '.png')):
                    img_path = os.path.join(self.database_path, filename)
                    img = cv2.imread(img_path)
                    
                    # Extract and process face
                    face_features = self.extract_face_features(img)
                    
                    if face_features is not None:
                        self.known_faces.append(face_features)
                        self.known_labels.append(filename.split('.')[0])
            
            # Save processed database
            with open(cache_path, 'wb') as f:
                pickle.dump({
                    'features': self.known_faces, 
                    'labels': self.known_labels
                }, f)

    def recognize_faces(self, frame):
        # Convert frame to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Detect faces
        results = self.face_detection.process(rgb_frame)
        
        recognized_faces = []
        if results.detections:
            h, w, _ = frame.shape
            for detection in results.detections:
                # Get bounding box
                bbox = detection.location_data.relative_bounding_box
                x, y = int(bbox.xmin * w), int(bbox.ymin * h)
                width, height = int(bbox.width * w), int(bbox.height * h)
                
                # Extract and process face
                face_img = frame[y:y+height, x:x+width]
                processed_face = cv2.resize(face_img, (224, 224)).astype('float32') / 255.0
                
                # Compare with known faces
                best_match = None
                min_difference = float('inf')
                
                for i, known_face in enumerate(self.known_faces):
                    # More robust comparison using Mean Squared Error
                    difference = np.mean((known_face - processed_face) ** 2)
                    if difference < min_difference:
                        min_difference = difference
                        best_match = i
                
                # Determine label
                if best_match is not None and min_difference < 0.1:
                    label = self.known_labels[best_match]
                else:
                    label = "Unknown"
                
                recognized_faces.append((x, y, width, height, label, min_difference))
        
        return recognized_faces

    def run_recognition(self):
        cap = cv2.VideoCapture(0)

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            faces = self.recognize_faces(frame)

            for (x, y, w, h, label, confidence) in faces:
                color = (0, 255, 0) if label != "Unknown" else (0, 0, 255)
                cv2.rectangle(frame, (x, y), (x+w, y+h), color, 2)

                display_text = f"{label} ({1-confidence:.2f})"
                cv2.putText(frame, display_text, (x, y-10), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

            cv2.imshow('Face Recognition', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

def main():
    # Path to the database folder
    DATABASE_PATH = 'face_database/'
    # os.makedirs(DATABASE_PATH, exist_ok=True)

    recognizer = FaceRecognizer(DATABASE_PATH)
    recognizer.run_recognition()

if __name__ == '__main__':
    main()