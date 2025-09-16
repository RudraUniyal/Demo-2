import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Globe, 
  Eye, 
  Zap, 
  MapPin, 
  MessageSquare, 
  Shield, 
  Wifi,
  Camera,
  Bell,
  BarChart3,
  Users
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "PWA Ready",
    description: "Works offline with Service Worker sync for low-connectivity coastal areas",
    category: "Technology"
  },
  {
    icon: Camera,
    title: "Media Capture",
    description: "Photo/video reporting with automatic geotagging and EXIF data",
    category: "Reporting"
  },
  {
    icon: Globe,
    title: "Multilingual NLP",
    description: "Support for major Indian languages with sentiment analysis",
    category: "Intelligence"
  },
  {
    icon: Eye,
    title: "Social Monitoring",
    description: "Real-time social media ingestion with relevance classification",
    category: "Intelligence"
  },
  {
    icon: MapPin,
    title: "Interactive Maps",
    description: "Dynamic hotspot detection with hexagonal grid clustering",
    category: "Visualization"
  },
  {
    icon: Shield,
    title: "Trust Scoring",
    description: "Reporter verification with confidence metrics and moderation",
    category: "Security"
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Role-aware notifications via web push, email, and SMS",
    category: "Communication"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time metrics for decision-makers and analysts",
    category: "Analytics"
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Citizens, volunteers, officials, and analysts with appropriate permissions",
    category: "Security"
  }
];

const categoryColors = {
  "Technology": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Reporting": "bg-green-500/10 text-green-400 border-green-500/20",
  "Intelligence": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Visualization": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Security": "bg-red-500/10 text-red-400 border-red-500/20",
  "Communication": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Analytics": "bg-pink-500/10 text-pink-400 border-pink-500/20"
};

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive Ocean
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Hazard Intelligence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced technology stack designed for coastal communities, emergency responders, 
            and government agencies to collaborate on ocean safety.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gradient-wave rounded-lg group-hover:animate-pulse-glow transition-all duration-300">
                    <feature.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <Badge 
                    variant="outline" 
                    className={categoryColors[feature.category as keyof typeof categoryColors]}
                  >
                    {feature.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}