import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zap, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react";

export function UtilityRail() {
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