import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-16">
        {/* Hero Section */}
        <section className="gradient-moonlight py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                We'd love to hear from you. Whether you have questions, feedback, or want to make a reservation, 
                we're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
              {[
                { 
                  icon: MapPin, 
                  title: "Visit Us", 
                  info: "123 Moonlight Avenue",
                  extra: "Downtown, City 12345"
                },
                { 
                  icon: Phone, 
                  title: "Call Us", 
                  info: "+1 (555) 123-4567",
                  extra: "Mon-Sun: 9AM - 10PM"
                },
                { 
                  icon: Mail, 
                  title: "Email Us", 
                  info: "info@moonlightrest.com",
                  extra: "reservations@moonlightrest.com"
                },
                { 
                  icon: Clock, 
                  title: "Opening Hours", 
                  info: "Tue-Sun: 5PM - 11PM",
                  extra: "Closed on Mondays"
                }
              ].map((item, idx) => (
                <Card 
                  key={idx} 
                  className="p-6 text-center hover:shadow-elegant transition-all hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <item.icon className="w-10 h-10 mx-auto mb-4 text-secondary" />
                  <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-1">{item.info}</p>
                  <p className="text-muted-foreground text-xs">{item.extra}</p>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 shadow-elegant animate-fade-in">
                <h2 className="text-3xl font-heading font-bold mb-6 text-center">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      required
                      className="w-full min-h-[150px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    variant="secondary"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-accent/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-heading font-bold text-center mb-8 animate-fade-in">
                Find Us
              </h2>
              <Card className="overflow-hidden shadow-elegant animate-fade-in">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-secondary" />
                    <p className="text-muted-foreground">
                      Interactive map would be displayed here
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      123 Moonlight Avenue, Downtown
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-heading font-bold text-center mb-12 animate-fade-in">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    q: "Do I need a reservation?",
                    a: "While walk-ins are welcome, we highly recommend making a reservation to ensure we can accommodate you, especially during peak hours and weekends."
                  },
                  {
                    q: "What is your dress code?",
                    a: "We maintain a smart casual dress code. We want our guests to feel comfortable while maintaining the elegant atmosphere of our restaurant."
                  },
                  {
                    q: "Do you accommodate dietary restrictions?",
                    a: "Absolutely! Our chefs are happy to accommodate various dietary needs including vegetarian, vegan, gluten-free, and allergies. Please inform us when making your reservation."
                  },
                  {
                    q: "Do you offer private dining?",
                    a: "Yes, we have private dining rooms available for special occasions, business meetings, and events. Please contact us for more information and availability."
                  },
                  {
                    q: "Is parking available?",
                    a: "We offer valet parking service for our guests. There is also a public parking garage within a short walking distance."
                  }
                ].map((faq, idx) => (
                  <Card 
                    key={idx} 
                    className="p-6 hover:shadow-elegant transition-all animate-fade-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <h3 className="text-xl font-heading font-bold mb-3">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

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

export default ContactUs;

