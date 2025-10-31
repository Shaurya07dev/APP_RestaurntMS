import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { ChefHat, Heart, Award, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-16">
        {/* Hero Section */}
        <section className="gradient-moonlight py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
                Our Story
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Moon Light Restaurant was born from a passion for creating unforgettable dining experiences 
                that blend culinary excellence with elegant ambiance.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="p-8 hover:shadow-elegant transition-all animate-fade-in">
                <Heart className="w-12 h-12 text-secondary mb-4" />
                <h2 className="text-3xl font-heading font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To create extraordinary culinary experiences that delight the senses and bring people 
                  together. We are committed to sourcing the finest ingredients, employing traditional 
                  techniques with modern innovation, and providing exceptional service in an elegant setting.
                </p>
              </Card>
              
              <Card className="p-8 hover:shadow-elegant transition-all animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Award className="w-12 h-12 text-secondary mb-4" />
                <h2 className="text-3xl font-heading font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be recognized as the premier fine dining destination, where culinary artistry meets 
                  impeccable service. We strive to set new standards in gastronomy while maintaining the 
                  warmth and intimacy that make every visit memorable.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Chef & Team */}
        <section className="py-20 bg-accent/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our talented culinary team brings decades of combined experience from world-renowned restaurants
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: ChefHat,
                  title: "Executive Chef",
                  name: "Chef Alexandre Dubois",
                  desc: "30+ years of culinary excellence, trained in Michelin-starred kitchens across France and Italy"
                },
                {
                  icon: Users,
                  title: "Culinary Director",
                  name: "Maria Santos",
                  desc: "Award-winning pastry chef with expertise in French and Mediterranean cuisine"
                },
                {
                  icon: Award,
                  title: "Wine Sommelier",
                  name: "Jean-Pierre Laurent",
                  desc: "Master sommelier with an extensive collection of rare and vintage wines"
                }
              ].map((member, idx) => (
                <Card 
                  key={idx} 
                  className="p-8 text-center hover:shadow-elegant transition-all hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <member.icon className="w-16 h-16 mx-auto mb-4 text-secondary" />
                  <h3 className="text-xl font-heading font-bold mb-2">{member.name}</h3>
                  <p className="text-secondary text-sm font-semibold mb-3">{member.title}</p>
                  <p className="text-muted-foreground text-sm">{member.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 animate-fade-in">
                Our Values
              </h2>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Excellence",
                    desc: "We never compromise on quality. Every dish is crafted with precision and care, using only the finest ingredients."
                  },
                  {
                    title: "Innovation",
                    desc: "While respecting culinary traditions, we constantly explore new techniques and flavor combinations to surprise and delight."
                  },
                  {
                    title: "Sustainability",
                    desc: "We partner with local farms and suppliers who share our commitment to sustainable and ethical practices."
                  },
                  {
                    title: "Hospitality",
                    desc: "Every guest is treated like family. Our team is dedicated to creating warm, memorable experiences."
                  }
                ].map((value, idx) => (
                  <Card 
                    key={idx} 
                    className="p-8 hover:shadow-elegant transition-all animate-fade-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <h3 className="text-2xl font-heading font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="py-20 gradient-moonlight">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-primary-foreground mb-12 animate-fade-in">
                Our Journey
              </h2>
              
              <div className="space-y-6">
                {[
                  { year: "2005", event: "Moon Light Restaurant opens its doors in downtown" },
                  { year: "2008", event: "Awarded first Michelin star for culinary excellence" },
                  { year: "2012", event: "Expansion to include private dining rooms and wine cellar" },
                  { year: "2015", event: "Recognition as 'Best Fine Dining Restaurant' by National Culinary Association" },
                  { year: "2020", event: "Launch of exclusive chef's tasting menu experience" },
                  { year: "2025", event: "Celebrating 20 years of culinary excellence" }
                ].map((milestone, idx) => (
                  <div 
                    key={idx} 
                    className="flex gap-4 items-start animate-fade-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="text-3xl font-heading font-bold text-secondary min-w-[100px]">
                      {milestone.year}
                    </div>
                    <div className="flex-1 bg-primary-foreground/10 backdrop-blur-sm p-4 rounded-lg border border-primary-foreground/20">
                      <p className="text-primary-foreground/90">{milestone.event}</p>
                    </div>
                  </div>
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

export default AboutUs;

