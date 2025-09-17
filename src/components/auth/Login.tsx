import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Mock authentication - in a real app, this would call your backend API
      if ((email === "user@example.com" && password === "user123") || 
          (email === "admin@example.com" && password === "admin123")) {
        
        // Mock user data
        const mockUser = email === "admin@example.com" ? {
          _id: "1",
          username: "admin",
          email: "admin@example.com",
          firstName: "Admin",
          lastName: "User",
          role: "admin"
        } : {
          _id: "2",
          username: "user",
          email: "user@example.com",
          firstName: "Regular",
          lastName: "User",
          role: "user"
        };

        // Mock token
        const mockToken = "mock-jwt-token-for-demo-purposes";
        
        // Use the auth context to log in
        login(mockUser, mockToken);
        
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-border">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-wave rounded-xl animate-pulse-glow">
              <Waves className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your OceanWatch account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input/50 border-border"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate("/signup")}
              className="text-primary hover:underline"
            >
              Sign up
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}