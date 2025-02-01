import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! How can I help you today?",
    },
  ]);

  return (
    <div className="fixed bottom-16 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4"
          >
            <Card className="w-[400px] h-[600px] flex flex-col bg-gray-100">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">Chat Support</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      message.type === "bot" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-2 max-w-[80%] ${
                        message.type === "bot"
                          ? "bg-gray-100 text-primary"
                          : "bg-primary text-white"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full rounded-md border p-2"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const content = e.currentTarget.value;
                      if (content.trim()) {
                        setMessages([
                          ...messages,
                          { type: "user", content },
                          {
                            type: "bot",
                            content:
                              "Thanks for your message! I'll help you soon.",
                          },
                        ]);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full h-12 w-12 shadow-lg fixed bottom-4 right-4"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ChatBot;
