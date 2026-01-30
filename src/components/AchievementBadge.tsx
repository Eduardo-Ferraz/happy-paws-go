import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AchievementBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  unlocked?: boolean;
  className?: string;
}

export function AchievementBadge({
  icon: Icon,
  title,
  description,
  unlocked = false,
  className,
}: AchievementBadgeProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all",
        unlocked
          ? "bg-gradient-to-b from-primary/10 to-accent"
          : "bg-muted opacity-50",
        className
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          unlocked
            ? "bg-primary text-primary-foreground shadow-float"
            : "bg-muted-foreground/20 text-muted-foreground"
        )}
      >
        <Icon size={24} />
      </div>
      <div className="text-center">
        <p className={cn(
          "text-xs font-semibold",
          unlocked ? "text-foreground" : "text-muted-foreground"
        )}>
          {title}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}
