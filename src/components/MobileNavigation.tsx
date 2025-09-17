import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  MapPin, 
  Shield, 
  MessageCircle, 
  AlertTriangle, 
  User, 
  Bell,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function MobileNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showReportModal, setShowReportModal] = useState(false);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/dashboard", icon: MapPin, label: "Map" },
    { path: "/alerts", icon: Shield, label: "Alerts" },
    { path: "/forum", icon: MessageCircle, label: "Forum" },
    { path: "/emergency", icon: AlertTriangle, label: "Emergency" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <nav className="mobile-nav safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`mobile-nav-item ${
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="mt-1">{item.label}</span>
              </NavLink>
            );
          })}
          
          {/* User Profile - only show if authenticated */}
          {isAuthenticated && (
            <NavLink
              to="/profile"
              className={`mobile-nav-item ${
                location.pathname === "/profile" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <User className="h-5 w-5" />
              <span className="mt-1">Profile</span>
            </NavLink>
          )}
        </div>
      </nav>
      
      {/* Floating Report Button - only show if authenticated */}
      {isAuthenticated && (
        <Button
          variant="hero"
          size="icon"
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40 md:hidden"
          onClick={() => setShowReportModal(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
      
      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowReportModal(false)}
          />
          <div className="relative bg-card border-t border-border rounded-t-xl w-full max-w-md animate-in slide-in-from-bottom duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Report Hazard</h3>
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <button 
                  className="w-full flex items-center p-4 bg-muted/10 rounded-lg border border-border hover:bg-muted/20 transition-colors"
                  onClick={() => {
                    navigate("/report");
                    setShowReportModal(false);
                  }}
                >
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>Report Location</span>
                </button>
                
                <button 
                  className="w-full flex items-center p-4 bg-muted/10 rounded-lg border border-border hover:bg-muted/20 transition-colors"
                  onClick={() => {
                    // In a real app, this would open the camera
                    alert("Camera functionality would open here");
                    setShowReportModal(false);
                  }}
                >
                  <Plus className="h-5 w-5 text-primary mr-3" />
                  <span>Take Photo</span>
                </button>
                
                <button 
                  className="w-full flex items-center p-4 bg-muted/10 rounded-lg border border-border hover:bg-muted/20 transition-colors"
                  onClick={() => {
                    // In a real app, this would open the gallery
                    alert("Gallery functionality would open here");
                    setShowReportModal(false);
                  }}
                >
                  <Plus className="h-5 w-5 text-primary mr-3" />
                  <span>Upload Media</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}