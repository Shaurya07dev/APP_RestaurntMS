import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { MapPin, Phone, Mail, Clock, Star, Award, Users } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-6xl md:text-7xl font-heading font-bold text-white mb-6 animate-fade-in">
            Moon Light Restaurant
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light animate-fade-in">
            Experience the art of fine dining under the moonlight
          </p>
          <div className="flex gap-4 justify-center animate-fade-in">
            <Link to="/order">
              <Button variant="hero" size="lg" className="text-lg">
                View Menu
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary" size="lg" className="text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-moonlight">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Award, number: "20+", label: "Awards Won" },
              { icon: Users, number: "50K+", label: "Happy Customers" },
              { icon: Star, number: "4.9", label: "Average Rating" }
            ].map((stat, idx) => (
              <Card 
                key={idx} 
                className="p-8 text-center bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <div className="text-4xl font-heading font-bold text-primary-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Signature Dishes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Savor our carefully curated selection of exquisite dishes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: dish1, name: "Amuse-Bouche", desc: "Delicate seafood tartare with citrus notes" },
              { img: dish2, name: "Prime Cut", desc: "Perfectly aged beef with seasonal garnish" },
              { img: dish3, name: "Sweet Finale", desc: "Artisan dessert with gold leaf accent" }
            ].map((dish, idx) => (
              <Card 
                key={idx} 
                className="overflow-hidden group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={dish.img} 
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-2">{dish.name}</h3>
                  <p className="text-muted-foreground">{dish.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact Preview */}
      <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 animate-fade-in">
            Visit Us Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto animate-fade-in">
            We'd love to welcome you to an unforgettable dining experience
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12">
            {[
              { icon: MapPin, title: "Address", info: "123 Moonlight Avenue, Downtown" },
              { icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
              { icon: Mail, title: "Email", info: "info@moonlightrest.com" },
              { icon: Clock, title: "Hours", info: "Tue-Sun: 5PM - 11PM" }
            ].map((item, idx) => (
              <Card 
                key={idx} 
                className="p-6 text-center hover:shadow-elegant transition-all hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-secondary" />
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.info}</p>
              </Card>
            ))}
          </div>

          <Link to="/contact">
            <Button variant="secondary" size="lg" className="text-lg animate-fade-in">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Moon Light Restaurant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

