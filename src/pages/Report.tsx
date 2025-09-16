import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  MapPin, 
  Upload, 
  AlertTriangle,
  Waves,
  Zap,
  Wind,
  Droplets
} from "lucide-react";

const hazardTypes = [
  { icon: Waves, label: "Tsunami", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  { icon: Wind, label: "Storm Surge", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { icon: Zap, label: "High Waves", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { icon: Droplets, label: "Coastal Flooding", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
];

export default function Report() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Report Ocean Hazard</h1>
            <p className="text-xl text-muted-foreground">
              Help protect your community by reporting real-time coastal conditions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Report Form */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Hazard Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Hazard Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {hazardTypes.map((hazard, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`p-4 h-auto flex-col space-y-2 hover:scale-105 transition-all duration-300 ${hazard.color}`}
                      >
                        <hazard.icon className="h-6 w-6" />
                        <span className="text-sm">{hazard.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">Location</label>
                  <Button variant="glass" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Use Current Location
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Precise location helps authorities respond faster
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">Description</label>
                  <textarea
                    className="w-full p-3 bg-input border border-border rounded-lg resize-none"
                    rows={4}
                    placeholder="Describe what you're observing..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">Media Upload</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drop photos or videos here, or click to browse
                    </p>
                    <Button variant="glass" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Guidelines & Privacy */}
            <div className="space-y-6">
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Reporting Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">Be accurate and specific in your observations</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">Include clear photos or videos when safe to do so</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">Report immediately - timing is critical for safety</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">Your safety comes first - evacuate if instructed</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border">
                <CardHeader>
                  <CardTitle>Privacy & Consent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-border" />
                    <label className="text-sm">
                      I consent to public display of this report for community safety
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-border" />
                    <label className="text-sm">
                      Automatically blur faces in uploaded media
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your data helps authorities make informed decisions during emergencies. 
                    We protect your privacy while enabling effective disaster response.
                  </p>
                </CardContent>
              </Card>
              
              <Button variant="hero" size="lg" className="w-full">
                Submit Report
              </Button>
              
              <p className="text-center text-xs text-muted-foreground">
                Reports are verified by trained moderators before public display
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}