import { useState, useRef } from "react";
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
  Droplets,
  X
} from "lucide-react";

const hazardTypes = [
  { icon: Waves, label: "Tsunami", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  { icon: Wind, label: "Storm Surge", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { icon: Zap, label: "High Waves", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { icon: Droplets, label: "Coastal Flooding", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
];

export default function Report() {
  const [selectedHazard, setSelectedHazard] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get current location
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          lat: latitude,
          lng: longitude
        });
        setIsGettingLocation(false);
        
        // In a real app, you would reverse geocode the coordinates to get an address
        // For demo purposes, we'll just show the coordinates
      },
      (error) => {
        setLocationError(`Unable to retrieve your location: ${error.message}`);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setMediaFiles(prev => [...prev, ...newFiles]);
      
      // Create preview URLs
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  // Remove a media file
  const removeMediaFile = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Trigger file input
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit to an API
    console.log({
      hazardType: selectedHazard,
      location,
      description,
      mediaFiles: mediaFiles.length
    });
    
    alert("Report submitted successfully!");
  };

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
          
          <form onSubmit={handleSubmit}>
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
                      {hazardTypes.map((hazard, index) => {
                        const Icon = hazard.icon;
                        return (
                          <Button
                            key={index}
                            type="button"
                            variant={selectedHazard === hazard.label ? "default" : "outline"}
                            className={`p-4 h-auto flex-col space-y-2 hover:scale-105 transition-all duration-300 ${hazard.color}`}
                            onClick={() => setSelectedHazard(hazard.label)}
                          >
                            <Icon className="h-6 w-6" />
                            <span className="text-sm">{hazard.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Location</label>
                    <Button 
                      type="button"
                      variant="glass" 
                      className="w-full justify-start"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {isGettingLocation ? "Getting Location..." : 
                       location ? `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}` : 
                       "Use Current Location"}
                    </Button>
                    {locationError && (
                      <p className="text-xs text-red-500 mt-2">{locationError}</p>
                    )}
                    {location && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Location captured successfully
                      </p>
                    )}
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Media Upload</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop photos or videos here, or click to browse
                      </p>
                      <Button 
                        type="button"
                        variant="glass" 
                        size="sm"
                        onClick={triggerFileInput}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Select Files
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    {/* Media Previews */}
                    {previewUrls.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={url} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-24 object-cover rounded"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6"
                              onClick={() => removeMediaFile(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
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
                      <input type="checkbox" id="consent" className="rounded border-border" required />
                      <label htmlFor="consent" className="text-sm">
                        I consent to public display of this report for community safety
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="blur" className="rounded border-border" />
                      <label htmlFor="blur" className="text-sm">
                        Automatically blur faces in uploaded media
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your data helps authorities make informed decisions during emergencies. 
                      We protect your privacy while enabling effective disaster response.
                    </p>
                  </CardContent>
                </Card>
                
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Submit Report
                </Button>
                
                <p className="text-center text-xs text-muted-foreground">
                  Reports are verified by trained moderators before public display
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}