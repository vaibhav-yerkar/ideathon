import { Camera, MessageSquare, Clock, Calendar } from "lucide-react";

const steps = [
  {
    icon: <Camera className="w-12 h-12 text-secondary mb-4" />,
    title: "Secure Login",
    description: "Log in securely with Face ID or Aadhaar verification",
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-secondary mb-4" />,
    title: "Submit Query",
    description: "Submit your query via video or audio format",
  },
  {
    icon: <Clock className="w-12 h-12 text-secondary mb-4" />,
    title: "Get Solutions",
    description: "Receive personalized service ticket and solutions",
  },
  {
    icon: <Calendar className="w-12 h-12 text-secondary mb-4" />,
    title: "Schedule Meeting",
    description: "Book an appointment or get instant assistance",
  },
];

export const HowItWorks = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 hover:scale-105 transition-transform duration-300"
            >
              {step.icon}
              <h3 className="text-xl font-semibold mb-2 text-primary">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};