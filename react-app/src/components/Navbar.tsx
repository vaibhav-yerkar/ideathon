import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-primary py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Union Bank
        </Link>
        <div className="space-x-4">
          <Button
            variant="outline"
            className="text-primary border-white hover:bg-slate-100"
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button className="bg-secondary text-primary hover:bg-secondary/90">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

