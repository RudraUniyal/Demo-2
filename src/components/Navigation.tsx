import { Button } from "@/components/ui/button";
import { Waves, MapPin, Shield, Bell, Users, BarChart3, Settings, User, MessageCircle, AlertTriangle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useAuth } from "@/contexts/AuthContext";

export function Navigation() {
  const { t } = useLocalization();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
              {t("navigation.home")}
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/report" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("navigation.report")}
              </NavLink>
            )}
            <NavLink to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("navigation.dashboard")}
            </NavLink>
            <NavLink to="/alerts" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("navigation.alerts")}
            </NavLink>
            <NavLink to="/forum" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="h-4 w-4 inline mr-1" />
              {t("navigation.forum")}
            </NavLink>
            <NavLink to="/emergency" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              <AlertTriangle className="h-4 w-4 inline mr-1" />
              {t("navigation.emergency")}
            </NavLink>
          </div>
          
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <NotificationCenter />
            
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
                  <User className="h-4 w-4" />
                  {t("navigation.profile")}
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  {t("navigation.logout")}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                  {t("navigation.signin")}
                </Button>
                <Button variant="hero" size="sm" onClick={() => navigate("/signup")}>
                  {t("navigation.signup")}
                </Button>
              </>
            )}
            
            {isAuthenticated && (
              <Button variant="hero" size="sm" onClick={() => navigate("/report")}>
                <MapPin className="h-4 w-4 mr-2" />
                {t("hero.start_reporting")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}