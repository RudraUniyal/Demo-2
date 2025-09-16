import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import Alerts from "./pages/Alerts";
// Auth components
import { Login } from "@/components/auth/Login";
import { Signup } from "@/components/auth/Signup";
import { UserProfile } from "@/components/auth/UserProfile";
// Forum components
import { Forum } from "@/components/forum/Forum";
import { ThreadDetail } from "@/components/forum/ThreadDetail";
// Emergency components
import { EmergencyResources } from "@/components/emergency/EmergencyResources";
// Mobile navigation
import { MobileNavigation } from "@/components/MobileNavigation";
// Localization
import { LocalizationProvider } from "@/contexts/LocalizationContext";

const queryClient = new QueryClient();

const App = () => (
  <LocalizationProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/report" element={<Report />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/forum/thread/:id" element={<ThreadDetail />} />
              <Route path="/emergency" element={<EmergencyResources />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileNavigation />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LocalizationProvider>
);

export default App;