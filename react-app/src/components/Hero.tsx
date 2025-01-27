import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-primary to-primary/90 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Revolutionizing Customer Support with AI-Powered Facial Recognition
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Securely authenticate, ask your queries, and get personalized
          solutions—all in one place.
        </p>
        <div className="space-x-4 mb-12">
          <Button className="bg-secondary text-primary hover:bg-secondary/90 text-lg px-8 py-6">
            <Link to="/register">Get Started Now</Link>
          </Button>
          <Button
            variant="outline"
            className="border-white hover:bg-slate-100 text-primary text-lg px-8 py-6"
          >
            <Link to="/learn-more">Learn More</Link>
          </Button>
        </div>
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center">
            <Shield className="w-6 h-6 mr-2" />
            <span>Trusted by 100,000+ customers</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-6 h-6 mr-2" />
            <span>Powered by Secure AI Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
};

