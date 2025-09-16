import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  X, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  MapPin,
  Waves,
  Wind,
  Droplets
} from "lucide-react";

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: "alert",
    severity: "critical",
    title: "Tsunami Warning Issued",
    message: "A tsunami warning has been issued for coastal areas of Kerala. Evacuate immediately.",
    timestamp: "2 min ago",
    read: false,
    location: "Kochi, Kerala"
  },
  {
    id: 2,
    type: "info",
    severity: "medium",
    title: "Storm Surge Advisory",
    message: "A storm surge advisory is in effect for Chennai coastal areas until 6 PM.",
    timestamp: "15 min ago",
    read: false,
    location: "Chennai, Tamil Nadu"
  },
  {
    id: 3,
    type: "update",
    severity: "low",
    title: "Report Verified",
    message: "Your tsunami report from Alleppey has been verified by authorities.",
    timestamp: "1 hour ago",
    read: true,
    location: "Alleppey, Kerala"
  },
  {
    id: 4,
    type: "alert",
    severity: "high",
    title: "High Wave Alert",
    message: "Unusually high waves detected along the Karnataka coast. Exercise caution.",
    timestamp: "3 hours ago",
    read: true,
    location: "Mangalore, Karnataka"
  }
];

// Notification type configuration
const notificationTypes = {
  alert: { icon: AlertTriangle, color: "text-destructive" },
  info: { icon: Info, color: "text-primary" },
  update: { icon: CheckCircle, color: "text-accent" }
};

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  
  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Filter notifications
  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => n.type === filter);
  
  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };
  
  // Get icon and color for notification type
  const getNotificationConfig = (type: string) => {
    return notificationTypes[type as keyof typeof notificationTypes] || notificationTypes.info;
  };
  
  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>
      
      {/* Notification Dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 bg-card/90 backdrop-blur-lg border-border shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="h-8 px-2 text-xs"
                >
                  Mark all read
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAll}
                  className="h-8 px-2 text-xs"
                >
                  Clear all
                </Button>
              </div>
            </div>
            
            {/* Filter */}
            <div className="flex border-b border-border">
              <Button 
                variant={filter === "all" ? "secondary" : "ghost"} 
                size="sm" 
                className="flex-1 rounded-none h-10"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={filter === "alert" ? "secondary" : "ghost"} 
                size="sm" 
                className="flex-1 rounded-none h-10"
                onClick={() => setFilter("alert")}
              >
                Alerts
              </Button>
              <Button 
                variant={filter === "info" ? "secondary" : "ghost"} 
                size="sm" 
                className="flex-1 rounded-none h-10"
                onClick={() => setFilter("info")}
              >
                Info
              </Button>
            </div>
            
            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2" />
                  <p>No notifications</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => {
                  const config = getNotificationConfig(notification.type);
                  const Icon = config.icon;
                  
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-b border-border hover:bg-muted/10 cursor-pointer ${
                        notification.read ? "" : "bg-primary/5"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <Icon className={`h-4 w-4 mt-0.5 mr-2 ${config.color}`} />
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              {!notification.read && (
                                <Badge variant="destructive" className="ml-2 h-2 w-2 p-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center mt-2">
                              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {notification.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNotifications(notifications.filter(n => n.id !== notification.id));
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-right">
                        {notification.timestamp}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            {/* Footer */}
            <div className="p-3 border-t border-border text-center">
              <Button variant="ghost" size="sm" className="text-xs">
                View all notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}