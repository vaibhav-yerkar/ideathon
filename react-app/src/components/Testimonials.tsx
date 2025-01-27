import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const testimonials = [
  {
    name: "Vatsalya Singh",
    role: "Business Owner",
    content: "The video query feature helped me get instant assistance with my loan application. Highly recommended!",
  },
  {
    name: "Ravi Kumar",
    role: "New Customer",
    content: "Seamless onboarding experience with facial recognition. Got my housing loan approved quickly!",
  },
];

export const Testimonials = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Customer Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};