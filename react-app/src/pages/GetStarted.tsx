import { Link } from "react-router-dom";
import { Camera, FileText, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";

const GetStarted = () => {
  const steps = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Login with Face ID",
      description: "Securely access your account using facial recognition",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Submit Queries",
      description: "Easily submit and track your service requests",
    },
    {
      icon: <User className="h-8 w-8" />,
      title: "Get Personalized Solutions",
      description: "Receive tailored recommendations and support",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get Started with Union Bank</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of banking with our AI-powered platform. Secure,
            efficient, and personalized just for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link to="/register">
              Get Started Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
            <Link to="/learn-more">Learn More About the Platform</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;