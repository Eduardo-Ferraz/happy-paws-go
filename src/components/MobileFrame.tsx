import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
  className?: string;
}

export function MobileFrame({ children, className }: MobileFrameProps) {
  return (
    <div className={cn(
      "w-full max-w-[430px] min-h-screen mx-auto bg-background relative overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
}

interface MobileHeaderProps {
  title: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  className?: string;
}

export function MobileHeader({ title, leftAction, rightAction, className }: MobileHeaderProps) {
  return (
    <header className={cn(
      "sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border",
      className
    )}>
      <div className="w-12 flex justify-start">
        {leftAction}
      </div>
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
      <div className="w-12 flex justify-end">
        {rightAction}
      </div>
    </header>
  );
}

interface MobileContentProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function MobileContent({ children, className, noPadding }: MobileContentProps) {
  return (
    <main className={cn(
      "flex-1 overflow-y-auto",
      !noPadding && "px-4 py-4",
      className
    )}>
      {children}
    </main>
  );
}

interface BottomNavProps {
  children: ReactNode;
  className?: string;
}

export function BottomNav({ children, className }: BottomNavProps) {
  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-card border-t border-border px-2 py-2 pb-6 flex justify-around items-center shadow-lg z-50",
      className
    )}>
      {children}
    </nav>
  );
}
