import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Github, Slack, Calendar, Database } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
}

const integrations: Integration[] = [
  {
    id: "gmail",
    name: "Gmail",
    description: "Sync email notifications and create rules based on email content",
    icon: Mail,
    status: "disconnected",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send notifications to Slack channels and manage team communications",
    icon: Slack,
    status: "connected",
    lastSync: "5 minutes ago",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Monitor repository events, pull requests, and code deployments",
    icon: Github,
    status: "connected",
    lastSync: "2 minutes ago",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "Create calendar events and sync meeting notifications",
    icon: Calendar,
    status: "error",
    lastSync: "1 hour ago",
  },
  {
    id: "database",
    name: "Database Monitor",
    description: "Track database performance and receive system alerts",
    icon: Database,
    status: "connected",
    lastSync: "1 minute ago",
  },
  {
    id: "discord",
    name: "Discord",
    description: "Send notifications to Discord servers and channels",
    icon: MessageSquare,
    status: "disconnected",
  },
];

const statusConfig = {
  connected: {
    color: "success",
    label: "Connected",
    variant: "default" as const,
  },
  disconnected: {
    color: "muted-foreground",
    label: "Not Connected",
    variant: "secondary" as const,
  },
  error: {
    color: "destructive",
    label: "Error",
    variant: "destructive" as const,
  },
};

export function IntegrationsView() {
  const handleConnect = (integrationId: string) => {
    if (integrationId === "gmail") {
      window.open("/api/v1/auth/google", "_blank");
    } else if (integrationId === "slack") {
      window.open("/api/v1/auth/slack", "_blank");
    }
    // For demo purposes, we'll just log the action
    console.log(`Connecting to ${integrationId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Integrations</h1>
        <p className="text-muted-foreground">Connect external services to enhance your workflow</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const config = statusConfig[integration.status];

          return (
            <Card key={integration.id} className="bg-gradient-card border-border shadow-elevation hover:shadow-glow transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                  </div>
                  <Badge variant={config.variant} className="text-xs">
                    {config.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{integration.description}</p>
                
                {integration.lastSync && (
                  <p className="text-xs text-muted-foreground">
                    Last sync: {integration.lastSync}
                  </p>
                )}

                <div className="flex space-x-2">
                  {integration.status === "connected" ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        Configure
                      </Button>
                      <Button variant="destructive" size="sm">
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-primary hover:opacity-90" 
                      size="sm"
                      onClick={() => handleConnect(integration.id)}
                    >
                      Connect {integration.name}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}