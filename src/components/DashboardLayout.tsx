import { useState } from "react";
import { Navigation } from "./Navigation";
import { NotificationsView } from "./NotificationsView";
import { IntegrationsView } from "./IntegrationsView";
import { RulesView } from "./RulesView";
import { UtilityRail } from "./UtilityRail";
import { ThemeToggle } from "./ThemeToggle";

type DashboardView = "notifications" | "integrations" | "rules";

export function DashboardLayout() {
  const [activeView, setActiveView] = useState<DashboardView>("notifications");

  const renderMainContent = () => {
    switch (activeView) {
      case "notifications":
        return <NotificationsView />;
      case "integrations":
        return <IntegrationsView />;
      case "rules":
        return <RulesView />;
      default:
        return <NotificationsView />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-nav border-b border-border flex items-center justify-between px-4 z-50">
        <div className="text-sm font-medium text-foreground">Dashboard</div>
        <ThemeToggle />
      </div>

      {/* Main Layout */}
      <div className="flex w-full pt-12">
        {/* Left Navigation */}
        <div className="w-64 bg-nav border-r border-border">
          <Navigation activeView={activeView} onViewChange={setActiveView} />
        </div>

        {/* Center Content */}
        <div className="flex-1 p-6">
          {renderMainContent()}
        </div>

        {/* Right Utility Rail */}
        <div className="w-80 bg-rail border-l border-border">
          <UtilityRail />
        </div>
      </div>
    </div>
  );
}