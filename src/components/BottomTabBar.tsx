import { Home, Search, Calendar, User, Dog } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabItem {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface BottomTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  const tabs: { id: string; icon: React.ReactNode; label: string }[] = [
    { id: "home", icon: <Home size={22} />, label: "Início" },
    { id: "search", icon: <Search size={22} />, label: "Buscar" },
    { id: "bookings", icon: <Calendar size={22} />, label: "Passeios" },
    { id: "pets", icon: <Dog size={22} />, label: "Pets" },
    { id: "profile", icon: <User size={22} />, label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-card border-t border-border px-2 py-2 pb-6 flex justify-around items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
            activeTab === tab.id
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <div className={cn(
            "transition-transform duration-200",
            activeTab === tab.id && "scale-110"
          )}>
            {tab.icon}
          </div>
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
