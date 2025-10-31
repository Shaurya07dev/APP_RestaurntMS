import { Link, useLocation } from "react-router-dom";
import { Moon } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <Moon className="w-8 h-8 text-secondary group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-heading font-bold text-primary-foreground">
              Moon Light
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                isActive("/") 
                  ? "text-secondary" 
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/order" 
              className={`text-sm font-medium transition-colors ${
                isActive("/order") 
                  ? "text-secondary" 
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              Place Order
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors ${
                isActive("/about") 
                  ? "text-secondary" 
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors ${
                isActive("/contact") 
                  ? "text-secondary" 
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              Contact Us
            </Link>
          </div>
          
          <Link to="/order">
            <Button variant="secondary" size="lg" className="hidden md:inline-flex">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

