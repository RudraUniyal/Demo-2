import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Download, 
  Search,
  AlertTriangle,
  Waves,
  Wind,
  Droplets,
  Zap
} from "lucide-react";

// Mock emergency contacts data
const emergencyContacts = [
  {
    id: 1,
    name: "National Emergency Response Center",
    phone: "112",
    description: "24/7 emergency response coordination",
    category: "national",
    responseTime: "Immediate"
  },
  {
    id: 2,
    name: "Coastal Hazard Monitoring Division",
    phone: "0484-2123456",
    description: "Real-time hazard monitoring and alerts",
    category: "monitoring",
    responseTime: "Within 15 minutes"
  },
  {
    id: 3,
    name: "State Disaster Management Authority",
    phone: "0471-2345678",
    description: "State-level disaster response coordination",
    category: "state",
    responseTime: "Within 30 minutes"
  },
  {
    id: 4,
    name: "Local Emergency Response Team",
    phone: "0484-2345678",
    description: "Local first responders for immediate assistance",
    category: "local",
    responseTime: "Within 10 minutes"
  }
];

// Mock emergency resources data
const emergencyResources = [
  {
    id: 1,
    title: "Tsunami Evacuation Plan",
    description: "Official evacuation routes and safe zones for coastal areas",
    type: "plan",
    category: "tsunami",
    download: "tsunami-evacuation-plan.pdf"
  },
  {
    id: 2,
    title: "Storm Surge Preparedness Guide",
    description: "How to prepare for and respond to storm surge events",
    type: "guide",
    category: "storm",
    download: "storm-surge-guide.pdf"
  },
  {
    id: 3,
    title: "Emergency Kit Checklist",
    description: "Essential items to include in your emergency preparedness kit",
    type: "checklist",
    category: "general",
    download: "emergency-kit-checklist.pdf"
  },
  {
    id: 4,
    title: "Flood Response Procedures",
    description: "Step-by-step procedures for responding to coastal flooding",
    type: "procedure",
    category: "flood",
    download: "flood-response-procedures.pdf"
  }
];

// Hazard categories
const hazardCategories = [
  { id: "all", name: "All Hazards", icon: AlertTriangle },
  { id: "tsunami", name: "Tsunami", icon: Waves },
  { id: "storm", name: "Storm Surge", icon: Wind },
  { id: "flood", name: "Flooding", icon: Droplets },
  { id: "waves", name: "High Waves", icon: Zap }
];

export function EmergencyResources() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = emergencyResources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Emergency Resources</h1>
          <p className="text-muted-foreground">Critical contacts and preparedness materials</p>
        </div>
        
        {/* Quick Contact Bar */}
        <Card className="mb-8 bg-gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="p-3 bg-destructive/10 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold">Emergency Hotline</h3>
                  <p className="text-2xl font-bold text-destructive">112</p>
                  <p className="text-sm text-muted-foreground">National emergency number</p>
                </div>
              </div>
              <Button variant="hero" size="lg" className="whitespace-nowrap">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Contacts */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>
                  Official response organizations and hotlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex items-start p-4 bg-muted/10 rounded-lg border border-border">
                      <div className="p-2 bg-primary/10 rounded-lg mr-4">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-semibold">{contact.name}</h3>
                          <Badge variant="secondary">{contact.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{contact.description}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="font-medium">{contact.phone}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{contact.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Hazard Categories */}
          <div>
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Hazard Types</CardTitle>
                <CardDescription>
                  Select a hazard for specific resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hazardCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                          selectedCategory === category.id
                            ? "bg-primary/10 border-primary"
                            : "bg-muted/10 border-border hover:bg-muted/20"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <Icon className="h-5 w-5 mr-3 text-primary" />
                        <span className="font-medium">{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Emergency Resources */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Preparedness Resources</h2>
              <p className="text-muted-foreground">Downloadable guides and planning materials</p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-10 bg-input/50 border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((resource) => {
              const category = hazardCategories.find(c => c.id === resource.category);
              const Icon = category?.icon || AlertTriangle;
              
              return (
                <Card key={resource.id} className="bg-gradient-card border-border hover:bg-card/70 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-lg mr-3">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <CardDescription>{resource.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">{resource.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end">
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Safety Tips */}
        <Card className="mt-8 bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Essential Safety Tips</CardTitle>
            <CardDescription>
              Quick reminders for staying safe during ocean hazards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="font-semibold mb-2">Tsunami Warning</div>
                <p className="text-sm text-muted-foreground">
                  Move inland immediately if you feel a strong earthquake near the coast
                </p>
              </div>
              <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/10">
                <div className="font-semibold mb-2">Storm Surge</div>
                <p className="text-sm text-muted-foreground">
                  Evacuate to higher ground before the storm arrives
                </p>
              </div>
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                <div className="font-semibold mb-2">High Waves</div>
                <p className="text-sm text-muted-foreground">
                  Stay away from the shoreline during severe weather
                </p>
              </div>
              <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                <div className="font-semibold mb-2">General Preparedness</div>
                <p className="text-sm text-muted-foreground">
                  Keep an emergency kit with essentials like water, food, and medications
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}