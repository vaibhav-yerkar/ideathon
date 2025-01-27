import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />

      {/* AI & Technology Section */}
      <div className="py-20 bg-gradient-to-b from-primary/5 to-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Powered by Advanced AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Our platform leverages cutting-edge AI algorithms for facial
            recognition and data analytics, integrated with Aadhaar for secure
            identity verification.
          </p>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Seamless Customer Support?
          </h2>
          <div className="space-x-4">
            <Button
              asChild
              className="bg-secondary text-primary hover:bg-secondary/90"
            >
              <Link to="/register">Register Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-primary hover:bg-slate-100"
            >
              <Link to="/login">Login to Account</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="hover:text-secondary">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-secondary">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/learn-more" className="hover:text-secondary">
                    Learn More
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  support@unionbank.com
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  1800-123-4567
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-secondary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2024 Union Bank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

