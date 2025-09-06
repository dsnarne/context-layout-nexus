import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, Info } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  priority: "urgent" | "medium" | "low";
  timestamp: string;
  source: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Critical System Alert",
    message: "Database connection pool exhausted. Immediate attention required.",
    priority: "urgent",
    timestamp: "2 minutes ago",
    source: "System Monitor",
  },
  {
    id: "2",
    title: "API Rate Limit Warning",
    message: "GitHub API approaching rate limit threshold.",
    priority: "urgent",
    timestamp: "5 minutes ago",
    source: "GitHub Integration",
  },
  {
    id: "3",
    title: "Deployment Completed",
    message: "Production deployment v2.4.1 completed successfully.",
    priority: "medium",
    timestamp: "1 hour ago",
    source: "CI/CD Pipeline",
  },
  {
    id: "4",
    title: "New User Registration",
    message: "15 new users registered in the last hour.",
    priority: "low",
    timestamp: "2 hours ago",
    source: "User Management",
  },
  {
    id: "5",
    title: "Weekly Report Ready",
    message: "Your weekly analytics report is ready for review.",
    priority: "low",
    timestamp: "3 hours ago",
    source: "Analytics",
  },
];

const priorityConfig = {
  urgent: {
    color: "urgent",
    icon: AlertTriangle,
    label: "Urgent",
  },
  medium: {
    color: "medium",
    icon: Clock,
    label: "Medium",
  },
  low: {
    color: "low",
    icon: Info,
    label: "Low",
  },
};

export function NotificationsView() {
  const groupedNotifications = {
    urgent: mockNotifications.filter((n) => n.priority === "urgent"),
    medium: mockNotifications.filter((n) => n.priority === "medium"),
    low: mockNotifications.filter((n) => n.priority === "low"),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
        <p className="text-muted-foreground">Manage and respond to system notifications</p>
      </div>

      <div className="grid gap-6">
        {(["urgent", "medium", "low"] as const).map((priority) => {
          const config = priorityConfig[priority];
          const notifications = groupedNotifications[priority];
          const Icon = config.icon;

          return (
            <Card key={priority} className="bg-gradient-card border-border shadow-elevation">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Icon className={`h-5 w-5 text-${config.color}`} />
                  <span>{config.label} Priority</span>
                  <Badge variant="secondary" className="ml-auto">
                    {notifications.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No {priority} notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-3 p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${config.color} mt-2 shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-foreground truncate">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground shrink-0 ml-2">
                            {notification.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <span className="text-xs text-muted-foreground/80 mt-1 block">
                          From: {notification.source}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}