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
          
          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Map Placeholder */}
            <Card className="lg:col-span-2 bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Live Hazard Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center border border-border">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive map will be integrated here</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Showing crowdsourced reports, social signals, and official advisories
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Alerts */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">High Wave Alert</p>
                      <p className="text-xs text-muted-foreground">Kochi, Kerala - 2 min ago</p>
                      <Badge variant="destructive" className="mt-1">Critical</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <AlertTriangle className="h-4 w-4 text-orange-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Storm Surge Warning</p>
                      <p className="text-xs text-muted-foreground">Chennai, Tamil Nadu - 15 min ago</p>
                      <Badge variant="secondary" className="mt-1">Moderate</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <Eye className="h-4 w-4 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Social Media Burst</p>
                      <p className="text-xs text-muted-foreground">Mumbai, Maharashtra - 32 min ago</p>
                      <Badge variant="outline" className="mt-1">Monitoring</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}