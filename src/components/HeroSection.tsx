import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap, Users, Shield } from "lucide-react";
import heroImage from "@/assets/hero-ocean.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Ocean monitoring station with dramatic waves" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/40" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary/50 rounded-full animate-wave" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <Badge variant="secondary" className="mb-6 bg-card/50 backdrop-blur-sm">
          <Zap className="h-3 w-3 mr-1" />
          Real-time Ocean Hazard Intelligence
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-foreground">The all-in-one</span>
          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-x">
            Ocean Safety Platform
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Crowdsourced reporting, real-time social intelligence, and multilingual early warning systems 
          to protect coastal communities from tsunamis, storm surges, and ocean hazards.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button variant="hero" size="lg" className="min-w-[200px]">
            <MapPin className="h-5 w-5 mr-2" />
            Start Reporting
          </Button>
          <Button variant="glass" size="lg" className="min-w-[200px]">
            <Shield className="h-5 w-5 mr-2" />
            View Dashboard
          </Button>
        </div>
        
        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:bg-card/70 transition-all duration-300">
            <MapPin className="h-8 w-8 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Geotagged Reporting</h3>
            <p className="text-sm text-muted-foreground">Submit real-time hazard observations with precise location data</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:bg-card/70 transition-all duration-300">
            <Users className="h-8 w-8 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Community Network</h3>
            <p className="text-sm text-muted-foreground">Connect citizens, volunteers, and officials in one platform</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:bg-card/70 transition-all duration-300">
            <Shield className="h-8 w-8 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered Alerts</h3>
            <p className="text-sm text-muted-foreground">Multilingual NLP for intelligent hazard classification</p>
          </div>
        </div>
      </div>
    </section>
  );
}