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
  Download,
  TrendingUp,
  AlertTriangle,
  Waves,
  Wind,
  Droplets
} from "lucide-react";

// Import Recharts components for better visualization
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

// Mock data for visualization
const hazardData = {
  tsunamis: [12, 19, 8, 15, 11, 22, 18],
  stormSurges: [8, 12, 5, 10, 7, 15, 11],
  highWaves: [25, 32, 18, 28, 22, 35, 30],
  flooding: [5, 8, 3, 7, 4, 10, 6]
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

// Prepare data for Recharts
const chartData = months.map((month, index) => ({
  month,
  tsunamis: hazardData.tsunamis[index],
  stormSurges: hazardData.stormSurges[index],
  highWaves: hazardData.highWaves[index],
  flooding: hazardData.flooding[index],
  total: hazardData.tsunamis[index] + hazardData.stormSurges[index] + hazardData.highWaves[index] + hazardData.flooding[index]
}));

// Prepare pie chart data
const pieData = [
  { name: "Tsunamis", value: hazardData.tsunamis.reduce((a, b) => a + b, 0) },
  { name: "Storm Surges", value: hazardData.stormSurges.reduce((a, b) => a + b, 0) },
  { name: "High Waves", value: hazardData.highWaves.reduce((a, b) => a + b, 0) },
  { name: "Flooding", value: hazardData.flooding.reduce((a, b) => a + b, 0) }
];

const COLORS = ["#FF4444", "#FF8800", "#00AAFF", "#00FF88"];

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
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    color: "hsl(var(--foreground))"
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="tsunamis" 
                  stroke="#FF4444" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="stormSurges" 
                  stroke="#FF8800" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="highWaves" 
                  stroke="#00AAFF" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="flooding" 
                  stroke="#00FF88" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        );
      
      case "pie":
        return (
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    color: "hsl(var(--foreground))"
                  }} 
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        );
      
      case "area":
        return (
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    color: "hsl(var(--foreground))"
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="tsunamis" 
                  stackId="1" 
                  stroke="#FF4444" 
                  fill="#FF4444" 
                  fillOpacity={0.6} 
                />
                <Area 
                  type="monotone" 
                  dataKey="stormSurges" 
                  stackId="1" 
                  stroke="#FF8800" 
                  fill="#FF8800" 
                  fillOpacity={0.6} 
                />
                <Area 
                  type="monotone" 
                  dataKey="highWaves" 
                  stackId="1" 
                  stroke="#00AAFF" 
                  fill="#00AAFF" 
                  fillOpacity={0.6} 
                />
                <Area 
                  type="monotone" 
                  dataKey="flooding" 
                  stackId="1" 
                  stroke="#00FF88" 
                  fill="#00FF88" 
                  fillOpacity={0.6} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      
      default: // bar chart
        return (
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    color: "hsl(var(--foreground))"
                  }} 
                />
                <Legend />
                <Bar dataKey="tsunamis" fill="#FF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="stormSurges" fill="#FF8800" radius={[4, 4, 0, 0]} />
                <Bar dataKey="highWaves" fill="#00AAFF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="flooding" fill="#00FF88" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
              variant={chartType === "area" ? "hero" : "outline"} 
              size="sm"
              onClick={() => setChartType("area")}
            >
              Area
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
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
              <div className="text-2xl font-bold text-primary">127</div>
            </div>
            <div className="text-sm text-muted-foreground">Total Reports</div>
          </div>
          <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/10">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-destructive mr-2" />
              <div className="text-2xl font-bold text-destructive">24</div>
            </div>
            <div className="text-sm text-muted-foreground">Critical Alerts</div>
          </div>
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
            <div className="flex items-center mb-2">
              <Waves className="h-5 w-5 text-accent mr-2" />
              <div className="text-2xl font-bold text-accent">89</div>
            </div>
            <div className="text-sm text-muted-foreground">Verified Reports</div>
          </div>
          <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
            <div className="flex items-center mb-2">
              <Wind className="h-5 w-5 text-secondary mr-2" />
              <div className="text-2xl font-bold">42</div>
            </div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}