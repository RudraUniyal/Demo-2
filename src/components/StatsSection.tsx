import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Zap, Shield } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Reporters",
    description: "Citizens contributing to coastal safety"
  },
  {
    icon: MapPin,
    value: "2.5M",
    label: "Geotagged Reports",
    description: "Real-time hazard observations collected"
  },
  {
    icon: Zap,
    value: "99.9%",
    label: "Uptime",
    description: "Platform availability during emergencies"
  },
  {
    icon: Shield,
    value: "15min",
    label: "Response Time",
    description: "Average verification and alert processing"
  }
];

export function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-card to-muted/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Platform Impact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Protecting Communities
            <span className="block text-primary">Across Coastal India</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border text-center hover:shadow-wave transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="p-3 bg-gradient-wave rounded-lg w-fit mx-auto mb-4 group-hover:animate-pulse-glow">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}