import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background gradient-moonlight">
      <div className="text-center animate-fade-in">
        <h1 className="mb-4 text-6xl font-heading font-bold text-primary-foreground">404</h1>
        <p className="mb-8 text-xl text-primary-foreground/80">Oops! Page not found</p>
        <Link to="/">
          <Button variant="secondary" size="lg">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

