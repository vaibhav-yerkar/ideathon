import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, Lock, User, Shield, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
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

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [loginMethod, setLoginMethod] = useState<
    "face" | "aadhaar" | "password"
  >("password");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    aadhaarNumber: "",
    selfieImage: null as string | null,
  });

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      }, 1);
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setIsCameraOn(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      const image = canvas.toDataURL("image/jpeg");
      setCapturedImage(image);
      setFormData((prev) => ({ ...prev, selfieImage: image }));
      stopCamera();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatAadhaarNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");

    const groups = [];
    for (let i = 0; i < digits.length && i < 12; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    return groups.join(" ");
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatAadhaarNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      aadhaarNumber: formattedValue,
    }));
  };

  const isAadhaarValid = (aadhaar: string) => {
    const digitsOnly = aadhaar.replace(/\D/g, "");
    return digitsOnly.length === 12;
  };

  const handleLogin = async () => {
    try {
      let loginPayload;

      switch (loginMethod) {
        case "face":
          loginPayload = {
            method: "face",
            selfieImage: formData.selfieImage,
          };
          break;
        case "aadhaar":
          if (!isAadhaarValid(formData.aadhaarNumber)) {
            alert("Please enter a valid 12-digit Aadhaar number");
            return;
          }
          loginPayload = {
            method: "aadhaar",
            aadhaarNumber: formData.aadhaarNumber.replace(/\s/g, ""),
          };
          break;
        case "password":
          loginPayload = {
            method: "password",
            email: formData.email,
            password: formData.password,
          };
          break;
      }

      // Send to backend (uncomment and modify URL when ready)
      // const response = await fetch('YOUR_API_ENDPOINT/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(loginPayload),
      // });

      // Handle response accordingly
      // if (response.ok) {
      //   // Handle successful login (e.g., store token, redirect)
      // }
      setIsAuthenticated(true);
      navigate("/dashboard");

      console.log("Login payload:", loginPayload);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>Login to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center gap-4 mb-6">
                <Button
                  variant={loginMethod === "face" ? "default" : "outline"}
                  onClick={() => setLoginMethod("face")}
                  className="flex-1"
                >
                  <Camera className="mr-2" />
                  Face ID
                </Button>
                <Button
                  variant={loginMethod === "aadhaar" ? "default" : "outline"}
                  onClick={() => setLoginMethod("aadhaar")}
                  className="flex-1"
                >
                  <Shield className="mr-2" />
                  Aadhaar
                </Button>
                <Button
                  variant={loginMethod === "password" ? "default" : "outline"}
                  onClick={() => setLoginMethod("password")}
                  className="flex-1"
                >
                  <Lock className="mr-2" />
                  Password
                </Button>
              </div>

              {loginMethod === "face" && (
                <div className="text-center">
                  {!isCameraOn && !capturedImage && (
                    <>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                        <Camera className="mx-auto h-16 w-16 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Camera access required for Face ID login
                        </p>
                      </div>
                      <Button className="w-full" onClick={startCamera}>
                        Start Face Scan
                      </Button>
                    </>
                  )}

                  {isCameraOn && !capturedImage && (
                    <div className="space-y-4">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            stopCamera();
                            setCapturedImage(null);
                            setFormData((prev) => ({
                              ...prev,
                              selfieImage: null,
                            }));
                          }}
                          className="text-red-500 flex-1 border-red-500 hover:bg-red-500 hover:text-white"
                        >
                          Cancel
                        </Button>
                        <Button onClick={capturePhoto} className="flex-1">
                          Capture Photo
                        </Button>
                      </div>
                    </div>
                  )}

                  {capturedImage && (
                    <div className="space-y-4">
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full rounded-lg"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCapturedImage(null);
                            setFormData((prev) => ({
                              ...prev,
                              selfieImage: null,
                            }));
                            startCamera();
                          }}
                          className="flex-1"
                        >
                          Retake
                        </Button>
                        <Button onClick={handleLogin} className="flex-1">
                          Login with Face ID
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {loginMethod === "aadhaar" && (
                <div className="space-y-4">
                  <div>
                    <InputWithIcon
                      name="aadhaarNumber"
                      placeholder="Enter Aadhaar Number"
                      onChange={handleAadhaarChange}
                      value={formData.aadhaarNumber}
                      maxLength={14}
                      inputMode="numeric"
                      pattern="\d*"
                      onKeyPress={(e) => {
                        if (
                          !/[\d\s\b]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Delete" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight"
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {formData.aadhaarNumber &&
                      !isAadhaarValid(formData.aadhaarNumber) && (
                        <p className="text-sm text-red-500 mt-1">
                          Please enter a valid 12-digit Aadhaar number
                        </p>
                      )}
                  </div>
                  <Button
                    disabled={!isAadhaarValid(formData.aadhaarNumber)}
                    className="w-full"
                    onClick={handleLogin}
                  >
                    Send OTP
                  </Button>
                </div>
              )}

              {loginMethod === "password" && (
                <div className="space-y-4">
                  <div>
                    <InputWithIcon
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      icon={<AtSign className="h-4 w-4" />}
                    />
                  </div>
                  <div>
                    <InputWithIcon
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      icon={<Lock className="h-4 w-4" />}
                    />
                  </div>
                  <Button className="w-full" onClick={handleLogin}>
                    Login
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
              <div className="text-sm text-center">
                New user?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center">
                  <Shield className="w-3 h-3 mr-1" /> SSL Secured
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center">
                  <User className="w-3 h-3 mr-1" /> AI Powered
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
