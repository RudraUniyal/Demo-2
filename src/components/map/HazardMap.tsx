import { useState } from "react";
import { MapPin, AlertTriangle, Eye, Waves, Zap, Wind, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Leaflet map components
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock hazard data with real coordinates
const mockHazardData = [
  {
    id: 1,
    type: "tsunami",
    severity: "critical",
    location: "Kochi, Kerala",
    coordinates: { lat: 9.9312, lng: 76.2673 },
    timestamp: "2 min ago",
    description: "High wave activity detected near coast",
    reporter: "Alex M.",
    verified: true
  },
  {
    id: 2,
    type: "storm",
    severity: "moderate",
    location: "Chennai, Tamil Nadu",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    timestamp: "15 min ago",
    description: "Storm surge warning issued for coastal areas",
    reporter: "Coast Guard",
    verified: true
  },
  {
    id: 3,
    type: "social",
    severity: "low",
    location: "Mumbai, Maharashtra",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    timestamp: "32 min ago",
    description: "Social media reports of unusual wave activity",
    reporter: "Community",
    verified: false
  },
  {
    id: 4,
    type: "flooding",
    severity: "high",
    location: "Cochin, Kerala",
    coordinates: { lat: 9.9312, lng: 76.2673 },
    timestamp: "45 min ago",
    description: "Coastal flooding reported in low-lying areas",
    reporter: "Local Authority",
    verified: true
  }
];

// Hazard type configuration
const hazardTypes = {
  tsunami: { icon: Waves, color: "bg-red-500/10 text-red-400 border-red-500/20", label: "Tsunami" },
  storm: { icon: Wind, color: "bg-orange-500/10 text-orange-400 border-orange-500/20", label: "Storm Surge" },
  waves: { icon: Zap, color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", label: "High Waves" },
  flooding: { icon: Droplets, color: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "Flooding" },
  social: { icon: Eye, color: "bg-purple-500/10 text-purple-400 border-purple-500/20", label: "Social Signal" }
};

export function HazardMap() {
  const [selectedHazard, setSelectedHazard] = useState<any>(null);
  const [mapView, setMapView] = useState("satellite");
  const [filter, setFilter] = useState("all");

  // Filter hazards based on selection
  const filteredHazards = filter === "all" 
    ? mockHazardData 
    : mockHazardData.filter(hazard => hazard.type === filter);

  // Get hazard type config
  const getHazardConfig = (type: string) => {
    return hazardTypes[type as keyof typeof hazardTypes] || hazardTypes.tsunami;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Map Visualization */}
      <div className="lg:col-span-3">
        <Card className="bg-gradient-card border-border h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Live Hazard Map
            </CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant={mapView === "satellite" ? "hero" : "outline"} 
                size="sm"
                onClick={() => setMapView("satellite")}
              >
                Satellite
              </Button>
              <Button 
                variant={mapView === "terrain" ? "hero" : "outline"} 
                size="sm"
                onClick={() => setMapView("terrain")}
              >
                Terrain
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96 rounded-lg overflow-hidden relative">
              {/* Simple map placeholder - will be replaced with actual map */}
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive Hazard Map</p>
                  <p className="text-sm text-muted-foreground mt-2">Real-time visualization of coastal hazards</p>
                </div>
              </div>
            </div>
            
            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm font-medium mr-2">Hazard Types:</span>
              {Object.entries(hazardTypes).map(([key, type]) => {
                const Icon = type.icon;
                return (
                  <button
                    key={key}
                    className={`flex items-center text-xs px-2 py-1 rounded border ${type.color} ${
                      filter === key ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setFilter(filter === key ? "all" : key)}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Hazard Details Panel */}
      <div className="lg:col-span-1">
        <Card className="bg-gradient-card border-border h-full">
          <CardHeader>
            <CardTitle>
              {selectedHazard ? "Hazard Details" : "Recent Activity"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedHazard ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedHazard.location}</h3>
                    <p className="text-sm text-muted-foreground">{selectedHazard.timestamp}</p>
                  </div>
                  <Badge variant={selectedHazard.severity === "critical" ? "destructive" : selectedHazard.severity === "high" ? "default" : "secondary"}>
                    {selectedHazard.severity.charAt(0).toUpperCase() + selectedHazard.severity.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  {(() => {
                    const config = getHazardConfig(selectedHazard.type);
                    const Icon = config.icon;
                    return (
                      <div className={`p-2 rounded-lg ${config.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    );
                  })()}
                  <span className="text-sm font-medium">
                    {getHazardConfig(selectedHazard.type).label}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm">{selectedHazard.description}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reported by</span>
                  <span>{selectedHazard.reporter}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={selectedHazard.verified ? "default" : "secondary"}>
                    {selectedHazard.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                
                <div className="pt-4 flex space-x-2">
                  <Button variant="hero" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-medium">Latest Reports</h4>
                {mockHazardData.slice(0, 3).map((hazard) => {
                  const config = getHazardConfig(hazard.type);
                  const Icon = config.icon;
                  
                  return (
                    <div 
                      key={hazard.id} 
                      className="p-3 bg-muted/10 rounded-lg border border-border hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => setSelectedHazard(hazard)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-1 rounded ${config.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{hazard.location}</p>
                            <Badge variant="secondary" className="text-xs">
                              {hazard.timestamp}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {hazard.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}