import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Mock regional data
const regionalData = [
  { region: "Kerala", reports: 42, severity: "high" },
  { region: "Tamil Nadu", reports: 38, severity: "high" },
  { region: "Karnataka", reports: 29, severity: "medium" },
  { region: "Goa", reports: 18, severity: "medium" },
  { region: "Maharashtra", reports: 35, severity: "high" },
  { region: "Gujarat", reports: 22, severity: "medium" },
  { region: "Odisha", reports: 15, severity: "low" },
  { region: "West Bengal", reports: 12, severity: "low" },
  { region: "Andhra Pradesh", reports: 28, severity: "medium" },
  { region: "Telangana", reports: 8, severity: "low" }
];

export function RegionalHeatmap() {
  // Get max reports for normalization
  const maxReports = Math.max(...regionalData.map(d => d.reports));
  
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Regional Hazard Distribution
        </CardTitle>
        <CardDescription>
          Heatmap showing hazard report density across regions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {regionalData.map((region) => {
            const percentage = (region.reports / maxReports) * 100;
            let bgColor = "";
            
            switch (region.severity) {
              case "high":
                bgColor = "bg-red-500/20";
                break;
              case "medium":
                bgColor = "bg-orange-500/20";
                break;
              case "low":
                bgColor = "bg-yellow-500/20";
                break;
              default:
                bgColor = "bg-blue-500/20";
            }
            
            return (
              <div key={region.region} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{region.region}</span>
                  <span className="text-sm text-muted-foreground">{region.reports} reports</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${bgColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500/20 rounded-full mr-2"></div>
            <span className="text-sm">High Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500/20 rounded-full mr-2"></div>
            <span className="text-sm">Medium Risk</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500/20 rounded-full mr-2"></div>
            <span className="text-sm">Low Risk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}