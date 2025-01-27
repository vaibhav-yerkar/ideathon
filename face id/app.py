from flask import Flask, render_template, request, redirect, url_for, jsonify
import cv2
import mediapipe as mp
import os
import numpy as np
import pickle

# Initialize Flask app
app = Flask(__name__)

# Define the FaceRecognizer class (unchanged from your original code)
class FaceRecognizer:
    def __init__(self, database_path):
        self.mp_face_detection = mp.solutions.face_detection
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_detection = self.mp_face_detection.FaceDetection(min_detection_confidence=0.5)
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=True, 
            max_num_faces=1, 
            min_detection_confidence=0.5
        )
        self.known_faces = []
        self.known_labels = []
        self.database_path = database_path
        self.process_database()

    def extract_face_features(self, img):
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        detection_results = self.face_detection.process(rgb_img)
        if not detection_results.detections:
            return None
        detection = detection_results.detections[0]
        h, w, _ = img.shape
        bbox = detection.location_data.relative_bounding_box
        x, y = int(bbox.xmin * w), int(bbox.ymin * h)
        width, height = int(bbox.width * w), int(bbox.height * h)
        face_img = img[y:y+height, x:x+width]
        face_img = cv2.resize(face_img, (224, 224))
        normalized_face = face_img.astype('float32') / 255.0
        return normalized_face

    def process_database(self):
        cache_path = os.path.join(self.database_path, 'face_database.pkl')
        if os.path.exists(cache_path):
            with open(cache_path, 'rb') as f:
                data = pickle.load(f)
                self.known_faces = data['features']
                self.known_labels = data['labels']
        else:
            for filename in os.listdir(self.database_path):
                if filename.endswith(('.jpg', '.jpeg', '.png')):
                    img_path = os.path.join(self.database_path, filename)
                    img = cv2.imread(img_path)
                    face_features = self.extract_face_features(img)
                    if face_features is not None:
                        self.known_faces.append(face_features)
                        self.known_labels.append(filename.split('.')[0])
            with open(cache_path, 'wb') as f:
                pickle.dump({'features': self.known_faces, 'labels': self.known_labels}, f)

    def recognize_faces(self, img):
        rgb_frame = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = self.face_detection.process(rgb_frame)
        recognized_faces = []
        if results.detections:
            h, w, _ = img.shape
            for detection in results.detections:
                bbox = detection.location_data.relative_bounding_box
                x, y = int(bbox.xmin * w), int(bbox.ymin * h)
                width, height = int(bbox.width * w), int(bbox.height * h)
                face_img = img[y:y+height, x:x+width]
                processed_face = cv2.resize(face_img, (224, 224)).astype('float32') / 255.0
                best_match = None
                min_difference = float('inf')
                for i, known_face in enumerate(self.known_faces):
                    difference = np.mean((known_face - processed_face) ** 2)
                    if difference < min_difference:
                        min_difference = difference
                        best_match = i
                if best_match is not None and min_difference < 0.1:
                    label = self.known_labels[best_match]
                else:
                    label = "Unknown"
                recognized_faces.append((x, y, width, height, label, min_difference))
        return recognized_faces

# Initialize the FaceRecognizer
DATABASE_PATH = 'face_database/'
os.makedirs(DATABASE_PATH, exist_ok=True)
recognizer = FaceRecognizer(DATABASE_PATH)

# Define routes for the Flask app
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    img_path = os.path.join('uploads', file.filename)
    os.makedirs('uploads', exist_ok=True)
    file.save(img_path)
    img = cv2.imread(img_path)
    faces = recognizer.recognize_faces(img)
    results = []
    for (x, y, w, h, label, confidence) in faces:
        results.append({
            "x": x, "y": y, "width": w, "height": h, 
            "label": label, "confidence": 1 - confidence
        })
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
