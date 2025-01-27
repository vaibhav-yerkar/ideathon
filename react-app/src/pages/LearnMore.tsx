import { Link } from "react-router-dom";
import { Shield, Brain, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/Navbar";

const LearnMore = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Facial Recognition Authentication",
      description:
        "Secure and convenient login using advanced Face ID technology",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Driven Service Ticketing",
      description:
        "Automatically generate and route detailed service tickets",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Prioritization",
      description:
        "Fair and transparent prioritization based on engagement",
    },
  ];

  const faqs = [
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use state-of-the-art encryption and security measures to protect your data. All facial recognition data is encrypted and stored securely.",
    },
    {
      question: "How do I upload a video query?",
      answer:
        "Simply log in to your account, navigate to the dashboard, and click on 'Submit a Query'. You can then upload your video directly through our secure interface.",
    },
    {
      question: "What happens if Face ID doesn't work?",
      answer:
        "Don't worry! You can always use alternative login methods such as Aadhaar-based OTP or traditional password login.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learn More About Our Platform</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how our AI-powered banking platform revolutionizes your banking
            experience with advanced security and personalized service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="mb-4">
            <Link to="/register">Ready to Get Started? Register Now</Link>
          </Button>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;