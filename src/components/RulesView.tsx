import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Filter, Zap, Trash2, Edit } from "lucide-react";

interface Rule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: "active" | "inactive";
  lastTriggered?: string;
}

const mockRules: Rule[] = [
  {
    id: "1",
    name: "Critical Alert Escalation",
    description: "Escalate urgent notifications to Slack after 5 minutes",
    trigger: "Priority = Urgent AND Time > 5min",
    action: "Send to Slack #alerts",
    status: "active",
    lastTriggered: "2 minutes ago",
  },
  {
    id: "2",
    name: "Deployment Notifications",
    description: "Notify team when deployments complete",
    trigger: "Source = CI/CD AND Status = Complete",
    action: "Send to Slack #deployments",
    status: "active",
    lastTriggered: "1 hour ago",
  },
  {
    id: "3",
    name: "Off-hours Alert Filter",
    description: "Filter low priority alerts during weekends",
    trigger: "Priority = Low AND Weekend = True",
    action: "Suppress notification",
    status: "inactive",
  },
];

export function RulesView() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "",
    trigger: "",
    action: "",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Rules</h1>
          <p className="text-muted-foreground">Automate your notification workflow</p>
        </div>
        <Button 
          onClick={() => setShowBuilder(!showBuilder)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Rule
        </Button>
      </div>

      {showBuilder && (
        <Card className="bg-gradient-card border-border shadow-elevation">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Rule Builder</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="rule-name">Rule Name</Label>
              <Input
                id="rule-name"
                placeholder="Enter rule name..."
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>When (Trigger)</Label>
                <div className="space-y-2 mt-1">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="priority">Priority equals</SelectItem>
                      <SelectItem value="source">Source contains</SelectItem>
                      <SelectItem value="time">Time exceeds</SelectItem>
                      <SelectItem value="keyword">Message contains</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Condition value..." />
                </div>
              </div>

              <div>
                <Label>Then (Action)</Label>
                <div className="space-y-2 mt-1">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slack">Send to Slack</SelectItem>
                      <SelectItem value="email">Send email</SelectItem>
                      <SelectItem value="suppress">Suppress notification</SelectItem>
                      <SelectItem value="escalate">Escalate priority</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Action parameters..." />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowBuilder(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-primary hover:opacity-90">
                Create Rule
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {mockRules.map((rule) => (
          <Card key={rule.id} className="bg-gradient-card border-border shadow-elevation">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Filter className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={rule.status === "active" ? "default" : "secondary"}>
                    {rule.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-foreground">Trigger:</span>
                  <p className="text-muted-foreground mt-1">{rule.trigger}</p>
                </div>
                <div>
                  <span className="font-medium text-foreground">Action:</span>
                  <p className="text-muted-foreground mt-1">{rule.action}</p>
                </div>
              </div>
              {rule.lastTriggered && (
                <p className="text-xs text-muted-foreground mt-3">
                  Last triggered: {rule.lastTriggered}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}