import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function UserProfile() {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [reports, setReports] = useState(0);
  const [verifiedReports, setVerifiedReports] = useState(0);
  const [memberSince, setMemberSince] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setName(`${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username);
      setEmail(user.email);
      // Set default values for other fields
      setLocation("Not specified");
      setReports(24); // This would come from the backend in a real implementation
      setVerifiedReports(18); // This would come from the backend in a real implementation
      setMemberSince(new Date().toLocaleDateString());
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      // In a real implementation, you would update the user profile via the backend API
      // For now, we'll just simulate a successful update
      setTimeout(() => {
        setIsLoading(false);
        setSuccess("Profile updated successfully!");
      }, 1000);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error("Profile update error:", err);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in</h2>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">User Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{name || user.username}</CardTitle>
                  <CardDescription>Community Reporter</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reports</span>
                    <span className="font-medium">{reports}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verified</span>
                    <span className="font-medium text-green-400">{verifiedReports}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">{memberSince}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-2 rounded mb-4">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-green-500 text-sm bg-green-50 p-2 rounded mb-4">
                    {success}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-input/50 border-border"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-input/50 border-border"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, State"
                        className="bg-input/50 border-border"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notification">Notification Preferences</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Email Notifications</span>
                          <Button variant="outline" size="sm">Enabled</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">SMS Alerts</span>
                          <Button variant="outline" size="sm">Disabled</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Push Notifications</span>
                          <Button variant="outline" size="sm">Enabled</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      type="submit" 
                      className="flex-1" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button 
                      type="button" 
                      className="flex-1" 
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}