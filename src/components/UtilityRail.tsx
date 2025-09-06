import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Palette, FileText, Zap, Clock, CheckCircle, AlertCircle } from "lucide-react";

export function UtilityRail() {
  const [workingContext, setWorkingContext] = useState("");
  const [contextCount, setContextCount] = useState(0);

  const handleSetContext = () => {
    setContextCount(workingContext.length);
    // In a real app, this would save to localStorage or send to a server
  };

  const handleClearContext = () => {
    setWorkingContext("");
    setContextCount(0);
  };

  const recentNotifications = [
    { id: "1", title: "System Alert", time: "2m", priority: "urgent" },
    { id: "2", title: "Deployment", time: "5m", priority: "medium" },
    { id: "3", title: "User Activity", time: "12m", priority: "low" },
  ];

  const quickActions = [
    { id: "1", label: "Create Rule", icon: Zap },
    { id: "2", label: "Export Data", icon: FileText },
    { id: "3", label: "System Status", icon: CheckCircle },
  ];

  return (
    <div className="p-4 space-y-6 h-full">
      {/* Color Picker */}
      <Card className="bg-gradient-card border-border shadow-elevation">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Palette className="h-4 w-4 text-primary" />
            <span>Theme Accent</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-3">
            {["hsl(217 91% 60%)", "hsl(259 94% 51%)", "hsl(142 76% 36%)", "hsl(38 92% 50%)", "hsl(0 72% 51%)"].map((color, i) => (
              <button
                key={i}
                className="w-6 h-6 rounded-full border-2 border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  document.documentElement.style.setProperty('--accent', color.match(/\d+\s+\d+%\s+\d+%/)?.[0] || '');
                }}
              />
            ))}
          </div>
          <input
            type="color"
            className="w-full h-8 rounded border border-border bg-transparent cursor-pointer"
            onChange={(e) => {
              const hex = e.target.value;
              const r = parseInt(hex.slice(1, 3), 16);
              const g = parseInt(hex.slice(3, 5), 16);
              const b = parseInt(hex.slice(5, 7), 16);
              const hsl = `${Math.round(Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI + 360) % 360} ${Math.round((Math.max(r, g, b) - Math.min(r, g, b)) / Math.max(r, g, b) * 100)}% ${Math.round((Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255 * 100)}%`;
              document.documentElement.style.setProperty('--accent', hsl);
            }}
          />
        </CardContent>
      </Card>

      {/* Working Context */}
      <Card className="bg-gradient-card border-border shadow-elevation">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm">
            <span className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-primary" />
              <span>Working Context</span>
            </span>
            <Badge variant="secondary" className="text-xs">
              {contextCount}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Add notes about current work context..."
            value={workingContext}
            onChange={(e) => setWorkingContext(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={handleSetContext} className="flex-1">
              Set
            </Button>
            <Button size="sm" variant="outline" onClick={handleClearContext}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card className="bg-gradient-card border-border shadow-elevation">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>Recent</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-24">
            <div className="space-y-2">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      notification.priority === "urgent" ? "bg-urgent" :
                      notification.priority === "medium" ? "bg-medium" : "bg-low"
                    }`} />
                    <span className="truncate">{notification.title}</span>
                  </div>
                  <span className="text-muted-foreground">{notification.time}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-card border-border shadow-elevation">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Zap className="h-4 w-4 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs h-8"
                >
                  <Icon className="h-3 w-3 mr-2" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Priority Overview */}
      <Card className="bg-gradient-card border-border shadow-elevation">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-sm">
            <AlertCircle className="h-4 w-4 text-primary" />
            <span>Priority Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-urgent" />
                <span>Urgent</span>
              </span>
              <Badge variant="destructive" className="text-xs">2</Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-medium" />
                <span>Medium</span>
              </span>
              <Badge variant="secondary" className="text-xs">1</Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-low" />
                <span>Low</span>
              </span>
              <Badge variant="secondary" className="text-xs">2</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}