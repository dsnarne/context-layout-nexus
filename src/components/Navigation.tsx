import { Bell, Zap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardView = "notifications" | "integrations" | "rules";

interface NavigationProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

const navItems = [
  {
    id: "notifications" as const,
    label: "Notifications",
    icon: Bell,
    description: "Manage and view notifications",
  },
  {
    id: "integrations" as const,
    label: "Integrations",
    icon: Zap,
    description: "Connect external services",
  },
  {
    id: "rules" as const,
    label: "Rules",
    icon: Settings,
    description: "Configure automation rules",
  },
];

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  return (
    <nav className="p-4 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-all duration-200",
              isActive
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive && "text-primary-foreground")} />
            <div>
              <div className="font-medium">{item.label}</div>
              <div className={cn("text-xs", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {item.description}
              </div>
            </div>
          </button>
        );
      })}
    </nav>
  );
}