import { Shield, UserCheck, Brain, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Facial Recognition Security",
    description: "Advanced biometric authentication for maximum account security",
    icon: Shield,
  },
  {
    title: "AI-Powered Feedback",
    description: "Get instant, intelligent responses to your banking queries",
    icon: Brain,
  },
  {
    title: "Personalized Service",
    description: "Tailored recommendations based on your banking patterns",
    icon: UserCheck,
  },
  {
    title: "Priority Banking",
    description: "Exclusive benefits and prioritized support for valued customers",
    icon: Star,
  },
];

export const Features = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Why Choose Union Bank
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-secondary mb-4" />
                <CardTitle className="text-xl font-semibold text-primary">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};