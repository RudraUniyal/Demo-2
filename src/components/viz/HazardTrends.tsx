import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Calendar,
  Filter,
  Download
} from "lucide-react";

// Mock data for visualization
const hazardData = {
  tsunamis: [12, 19, 8, 15, 11, 22, 18],
  stormSurges: [8, 12, 5, 10, 7, 15, 11],
  highWaves: [25, 32, 18, 28, 22, 35, 30],
  flooding: [5, 8, 3, 7, 4, 10, 6]
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const hazardTypes = [
  { id: "all", name: "All Hazards" },
  { id: "tsunami", name: "Tsunamis" },
  { id: "storm", name: "Storm Surges" },
  { id: "waves", name: "High Waves" },
  { id: "flood", name: "Flooding" }
];

export function HazardTrends() {
  const [selectedType, setSelectedType] = useState("all");
  const [timeRange, setTimeRange] = useState("7d");
  const [chartType, setChartType] = useState("bar");

  // Get data based on selected type
  const getData = () => {
    switch (selectedType) {
      case "tsunami": return hazardData.tsunamis;
      case "storm": return hazardData.stormSurges;
      case "waves": return hazardData.highWaves;
      case "flood": return hazardData.flooding;
      default: 
        return hazardData.tsunamis.map((val, i) => 
          val + hazardData.stormSurges[i] + hazardData.highWaves[i] + hazardData.flooding[i]
        );
    }
  };

  const data = getData();

  // Chart component based on type
  const renderChart = () => {
    const maxValue = Math.max(...data);
    
    switch (chartType) {
      case "line":
        return (
          <div className="h-64 flex items-end justify-between pt-4">
            {data.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1 px-1">
                <div 
                  className="w-full bg-primary rounded-t hover:bg-accent transition-colors"
                  style={{ height: `${(value / maxValue) * 90}%` }}
                />
                <span className="text-xs text-muted-foreground mt-2">{months[index]}</span>
              </div>
            ))}
          </div>
        );
      
      case "pie":
        const total = data.reduce((sum, val) => sum + val, 0);
        return (
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48 rounded-full border-8 border-primary flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{total}</div>
                <div className="text-sm text-muted-foreground">Total Reports</div>
              </div>
            </div>
          </div>
        );
      
      default: // bar chart
        return (
          <div className="h-64 flex items-end justify-between pt-4">
            {data.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1 px-1">
                <div 
                  className="w-full bg-gradient-to-t from-primary to-accent rounded-t hover:from-accent hover:to-primary transition-all"
                  style={{ height: `${(value / maxValue) * 90}%` }}
                />
                <span className="text-xs text-muted-foreground mt-2">{months[index]}</span>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Hazard Trends & Analytics
            </CardTitle>
            <CardDescription>
              Historical data and pattern analysis for ocean hazards
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={chartType === "bar" ? "hero" : "outline"} 
              size="sm"
              onClick={() => setChartType("bar")}
            >
              Bar
            </Button>
            <Button 
              variant={chartType === "line" ? "hero" : "outline"} 
              size="sm"
              onClick={() => setChartType("line")}
            >
              Line
            </Button>
            <Button 
              variant={chartType === "pie" ? "hero" : "outline"} 
              size="sm"
              onClick={() => setChartType("pie")}
            >
              Pie
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {hazardTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "hero" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.id)}
              >
                {type.name}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              {timeRange}
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          {renderChart()}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="text-2xl font-bold text-primary">127</div>
            <div className="text-sm text-muted-foreground">Total Reports</div>
          </div>
          <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/10">
            <div className="text-2xl font-bold text-destructive">24</div>
            <div className="text-sm text-muted-foreground">Critical Alerts</div>
          </div>
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
            <div className="text-2xl font-bold text-accent">89</div>
            <div className="text-sm text-muted-foreground">Verified Reports</div>
          </div>
          <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
            <div className="text-2xl font-bold">42</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}