import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Filter,
  Bell,
  Waves,
  Wind,
  Droplets,
  Zap
} from "lucide-react";

// Mock alert data
const mockAlerts = [
  {
    id: 1,
    type: "tsunami",
    severity: "critical",
    title: "Tsunami Warning",
    description: "A tsunami warning has been issued for coastal areas of Kerala. Evacuate immediately to higher ground.",
    location: "Kochi, Kerala",
    timestamp: "2025-09-17 14:32:15",
    expires: "2025-09-17 16:00:00",
    issuedBy: "INCOIS Tsunami Warning Center",
    status: "active"
  },
  {
    id: 2,
    type: "storm",
    severity: "high",
    title: "Storm Surge Advisory",
    description: "A storm surge advisory is in effect for Chennai coastal areas. Coastal flooding is possible during high tide.",
    location: "Chennai, Tamil Nadu",
    timestamp: "2025-09-17 14:15:30",
    expires: "2025-09-17 18:00:00",
    issuedBy: "Regional Meteorological Center",
    status: "active"
  },
  {
    id: 3,
    type: "waves",
    severity: "medium",
    title: "High Wave Warning",
    description: "Unusually high waves detected along the Karnataka coast. Mariners should exercise extreme caution.",
    location: "Mangalore, Karnataka",
    timestamp: "2025-09-17 13:45:22",
    expires: "2025-09-17 17:00:00",
    issuedBy: "Marine Forecasting Division",
    status: "active"
  },
  {
    id: 4,
    type: "flood",
    severity: "high",
    title: "Coastal Flooding Alert",
    description: "Minor coastal flooding expected during high tide cycles. Low-lying areas may experience inundation.",
    location: "Cochin, Kerala",
    timestamp: "2025-09-17 12:30:45",
    expires: "2025-09-17 15:30:00",
    issuedBy: "State Disaster Management Authority",
    status: "active"
  },
  {
    id: 5,
    type: "tsunami",
    severity: "critical",
    title: "Tsunami Watch",
    description: "A tsunami watch remains in effect for Andhra Pradesh coast. Further evaluation ongoing.",
    location: "Vishakhapatnam, Andhra Pradesh",
    timestamp: "2025-09-17 11:20:10",
    expires: "2025-09-17 14:00:00",
    issuedBy: "INCOIS Tsunami Warning Center",
    status: "expiring"
  }
];

// Alert type configuration
const alertTypes = {
  tsunami: { icon: Waves, color: "bg-red-500/10 text-red-400 border-red-500/20" },
  storm: { icon: Wind, color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  waves: { icon: Zap, color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  flood: { icon: Droplets, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" }
};

export default function Alerts() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  
  // Filter alerts
  const filteredAlerts = mockAlerts.filter(alert => {
    const typeMatch = selectedType === "all" || alert.type === selectedType;
    const severityMatch = selectedSeverity === "all" || alert.severity === selectedSeverity;
    return typeMatch && severityMatch;
  });
  
  // Get alert config
  const getAlertConfig = (type: string) => {
    return alertTypes[type as keyof typeof alertTypes] || alertTypes.tsunami;
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Active Alerts</h1>
                <p className="text-muted-foreground">Real-time hazard warnings and advisories</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="glass">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="hero">
                  <Bell className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Hazard Type</label>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedType === "all" ? "hero" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedType("all")}
                  >
                    All Types
                  </Button>
                  {Object.entries(alertTypes).map(([key, type]) => {
                    const Icon = type.icon;
                    return (
                      <Button
                        key={key}
                        variant={selectedType === key ? "hero" : "outline"}
                        size="sm"
                        onClick={() => setSelectedType(key)}
                        className="flex items-center"
                      >
                        <Icon className="h-4 w-4 mr-1" />
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground block mb-1">Severity</label>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedSeverity === "all" ? "hero" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedSeverity("all")}
                  >
                    All Levels
                  </Button>
                  <Button 
                    variant={selectedSeverity === "critical" ? "destructive" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedSeverity("critical")}
                  >
                    Critical
                  </Button>
                  <Button 
                    variant={selectedSeverity === "high" ? "hero" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedSeverity("high")}
                  >
                    High
                  </Button>
                  <Button 
                    variant={selectedSeverity === "medium" ? "secondary" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedSeverity("medium")}
                  >
                    Medium
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Alerts List */}
          <div className="space-y-6">
            {filteredAlerts.map((alert) => {
              const config = getAlertConfig(alert.type);
              const Icon = config.icon;
              
              return (
                <Card key={alert.id} className="bg-gradient-card border-border">
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg mr-4 ${config.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                            <CardTitle className="flex items-center">
                              {alert.title}
                              {alert.status === "expiring" && (
                                <Badge variant="secondary" className="ml-3">
                                  Expiring Soon
                                </Badge>
                              )}
                            </CardTitle>
                            <Badge 
                              variant={
                                alert.severity === "critical" ? "destructive" : 
                                alert.severity === "high" ? "default" : 
                                "secondary"
                              }
                            >
                              {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription>{alert.description}</CardDescription>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Share
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Issued: {alert.timestamp}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Expires: {alert.expires}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        Issued by: {alert.issuedBy}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="hero" size="sm">
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* No Alerts Message */}
          {filteredAlerts.length === 0 && (
            <Card className="bg-gradient-card border-border">
              <CardContent className="py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Active Alerts</h3>
                <p className="text-muted-foreground mb-4">
                  There are currently no active hazard alerts in your area.
                </p>
                <Button variant="hero">
                  Subscribe to Alerts
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}