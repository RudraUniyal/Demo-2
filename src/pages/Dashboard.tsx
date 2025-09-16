import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  AlertTriangle, 
  Users, 
  Eye, 
  Clock,
  TrendingUp,
  Filter,
  Download
} from "lucide-react";
import { HazardMap } from "@/components/map/HazardMap";
import { HazardTrends } from "@/components/viz/HazardTrends";
import { RegionalHeatmap } from "@/components/viz/RegionalHeatmap";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Operations Dashboard</h1>
                <p className="text-muted-foreground">Real-time coastal hazard monitoring and response</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="glass" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="hero" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Reports</p>
                      <p className="text-2xl font-bold text-primary">247</p>
                    </div>
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                    <span className="text-xs text-green-400">+12% from yesterday</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Critical Alerts</p>
                      <p className="text-2xl font-bold text-destructive">18</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                  <div className="flex items-center mt-2">
                    <Clock className="h-3 w-3 text-orange-400 mr-1" />
                    <span className="text-xs text-orange-400">3 pending review</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Social Signals</p>
                      <p className="text-2xl font-bold text-accent">1.2K</p>
                    </div>
                    <Eye className="h-8 w-8 text-accent" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                    <span className="text-xs text-green-400">Real-time monitoring</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold text-primary">856</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-muted-foreground">Online now</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Interactive Hazard Map */}
          <HazardMap />
          
          {/* Data Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <HazardTrends />
            <RegionalHeatmap />
          </div>
        </div>
      </main>
    </div>
  );
}