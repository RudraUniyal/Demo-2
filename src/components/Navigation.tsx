import { Button } from "@/components/ui/button";
import { Waves, MapPin, Shield, Bell, Users, BarChart3, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-wave rounded-lg animate-pulse-glow">
              <Waves className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">OceanWatch</h1>
              <p className="text-xs text-muted-foreground">Coastal Hazard Intelligence</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </NavLink>
            <NavLink to="/report" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Report
            </NavLink>
            <NavLink to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </NavLink>
            <NavLink to="/alerts" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Alerts
            </NavLink>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="glass" size="sm">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Report Hazard
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}