import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ChatBot from "@/components/ChatBot";
import { AuthProvider } from "@/context/auth-context";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GetStarted from "./pages/GetStarted";
import LearnMore from "./pages/LearnMore";
import Dashboard from "./pages/Dashboard";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const showChat = !["/login", "/register"].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {showChat && <ChatBot />}
    </>
  );
};

const App = () => (
  // return(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
  // );
);

export default App;
