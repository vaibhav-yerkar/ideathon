import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Upload,
  User,
  AtSign,
  Phone,
  Lock,
  Camera,
  FileText,
  Hand,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    aadhaarFile: null as File | null,
    panFile: null as File | null,
    selfieImage: null as string | null,
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file uploads
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "aadhaarFile" | "panFile"
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        [fileType]: e.target.files[0],
      });
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
      });
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        } else {
          console.log("Video ref is not available");
        }
      }, 1);
      setIsCameraOpen(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      const image = canvas.toDataURL("image/jpeg");
      setCapturedImage(image);
      setFormData({
        ...formData,
        selfieImage: image,
      });
      stopCamera();
    }
  };

  const handleSubmit = async () => {
    try {
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("password", formData.password);
      if (formData.aadhaarFile)
        submitData.append("aadhaarFile", formData.aadhaarFile);
      if (formData.panFile) submitData.append("panFile", formData.panFile);
      if (formData.selfieImage)
        submitData.append("selfieImage", formData.selfieImage);

      // Send to backend (uncomment and modify URL when ready)
      // await fetch('YOUR_API_ENDPOINT/register', {
      //   method: 'POST',
      //   body: submitData,
      // });

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Create Account
              </CardTitle>
              <CardDescription>
                Complete your profile to get started
              </CardDescription>
              <div className="mt-4 flex justify-between items-center">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div key={index} className="flex-1">
                    <div
                      className={`h-2 rounded-full mx-1 ${
                        step > index ? "bg-primary" : "bg-gray-200"
                      }`}
                    />
                    <p className="text-xs mt-1 text-gray-500">
                      Step {index + 1}
                    </p>
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <InputWithIcon
                      placeholder="Full Name"
                      icon={<User className="h-4 w-4" />}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      name="fullName"
                      required
                    />
                  </div>
                  <div>
                    <InputWithIcon
                      type="email"
                      placeholder="Email"
                      icon={<AtSign className="h-4 w-4" />}
                      value={formData.email}
                      onChange={handleInputChange}
                      name="email"
                      required
                    />
                  </div>
                  <div>
                    <InputWithIcon
                      type="tel"
                      placeholder="Phone Number"
                      icon={<Phone className="h-4 w-4" />}
                      value={formData.phone}
                      onChange={handleInputChange}
                      name="phone"
                      required
                    />
                  </div>
                  <div>
                    <InputWithIcon
                      type="password"
                      placeholder="Create Password"
                      icon={<Lock className="h-4 w-4" />}
                      value={formData.password}
                      onChange={handleInputChange}
                      name="password"
                      required
                    />
                  </div>
                  <Button className="w-full" onClick={() => setStep(2)}>
                    Next
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Upload Aadhaar Card
                    </p>
                    <input
                      type="file"
                      name="aadhaar"
                      id="aadhaar-input"
                      className="hidden"
                      accept=".png, .jpg, .jpeg, .pdf"
                      onChange={(e) => handleFileUpload(e, "aadhaarFile")}
                    />
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        document.getElementById("aadhaar-input")?.click()
                      }
                    >
                      <Upload className="mr-2 h-4 w-4" /> Choose File
                    </Button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Upload PAN Card
                    </p>
                    <input
                      type="file"
                      name="pan"
                      id="pan-input"
                      className="hidden"
                      accept=".png, .jpg, .jpeg, .pdf"
                      onChange={(e) => handleFileUpload(e, "panFile")}
                    />
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        document.getElementById("pan-input")?.click()
                      }
                    >
                      <Upload className="mr-2 h-4 w-4" /> Choose File
                    </Button>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button className="flex-1" onClick={() => setStep(3)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {!isCameraOpen && !capturedImage && (
                      <>
                        <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">
                          Take a selfie for Face ID login (Optional)
                        </p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={startCamera}
                        >
                          Open Camera
                        </Button>
                      </>
                    )}
                    {isCameraOpen && (
                      <div className="space-y-4">
                        <video
                          ref={videoRef}
                          autoPlay
                          onLoadedMetadata={() => videoRef.current?.play()}
                          muted
                          playsInline
                          className="w-full rounded-lg"
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={stopCamera}
                          >
                            Cancel
                          </Button>
                          <Button className="flex-1" onClick={capturePhoto}>
                            Take Photo
                          </Button>
                        </div>
                      </div>
                    )}

                    {capturedImage && (
                      <div className="space-y-4">
                        <img
                          src={capturedImage}
                          alt="Captured selfie"
                          className="w-full rounded-lg"
                        />
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setCapturedImage(null);
                            startCamera();
                          }}
                        >
                          Retake Photo
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button className="flex-1" onClick={handleSubmit}>
                      Complete Registration
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login here
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
