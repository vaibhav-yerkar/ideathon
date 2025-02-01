import { Navbar } from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MessageSquare } from "lucide-react";
import { useState } from "react";

const bankingFAQs = [
  {
    category: "Account Management",
    items: [
      {
        question: "How do I check my account balance online?",
        answer:
          "Log in to your online banking account, and your balance will be displayed on the dashboard. You can also view detailed transactions and statements.",
      },
      {
        question: "What should I do if I forget my password?",
        answer:
          "Click on the 'Forgot Password' link on the login page. You can reset it using Face ID, Aadhaar verification, or through an OTP sent to your registered mobile number.",
      },
    ],
  },
  {
    category: "Security",
    items: [
      {
        question: "Is Face ID login secure?",
        answer:
          "Yes, our facial recognition system uses advanced encryption and liveness detection to ensure secure authentication. Your biometric data is encrypted and stored safely.",
      },
      {
        question: "How can I enable two-factor authentication?",
        answer:
          "Go to Settings > Security > Two-Factor Authentication and follow the setup process. We recommend using both biometric and OTP verification for maximum security.",
      },
    ],
  },
  {
    category: "Transactions",
    items: [
      {
        question: "What are the daily transaction limits?",
        answer:
          "NEFT: ₹25,00,000 per day, IMPS: ₹5,00,000 per day, UPI: ₹1,00,000 per day. These limits can be adjusted through your branch.",
      },
      {
        question: "How long do international transfers take?",
        answer:
          "International transfers typically take 2-5 business days, depending on the destination country and intermediary banks.",
      },
    ],
  },
];

const FAQ = () => {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      if (file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        setFilePreview(url);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle query submission
    console.log({ query, file });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* FAQ Section */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bankingFAQs.map((category, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">
                    {category.category}
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((faq, faqIdx) => (
                      <AccordionItem
                        key={faqIdx}
                        value={`item-${idx}-${faqIdx}`}
                      >
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Query Section */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Submit Your Query
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="query">Describe your query</Label>
                  <Textarea
                    id="query"
                    placeholder="Type your question here..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload Audio/Video (optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Input
                      id="file"
                      type="file"
                      accept="audio/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {filePreview ? (
                      <div className="space-y-2">
                        <video
                          src={filePreview}
                          controls
                          className="max-w-full mx-auto"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setFile(null);
                            setFilePreview("");
                          }}
                        >
                          Remove File
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file")?.click()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose Audio/Video File
                      </Button>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Submit Query
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
