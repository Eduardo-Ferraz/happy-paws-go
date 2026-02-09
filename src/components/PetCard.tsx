import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PetCardProps {
  name: string;
  photo: string;
  breed: string;
  age: string;
  size: "Pequeno" | "Médio" | "Grande";
  alerts?: string[];
  onEdit?: () => void;
  onClick?: () => void;
}

export function PetCard({
  name,
  photo,
  breed,
  age,
  size,
  alerts = [],
  onEdit,
  onClick,
}: PetCardProps) {
  const sizeColors = {
    Pequeno: "bg-success/10 text-success",
    Médio: "bg-secondary/10 text-secondary",
    Grande: "bg-primary/10 text-primary",
  };

  return (
    <div
      className="bg-card rounded-2xl p-4 shadow-card active:scale-[0.98] transition-transform cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{breed}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{age}</p>
            </div>
            <Button
              variant="ghost"
              size="iconSm"
              onClick={onEdit}
              className="text-muted-foreground"
            >
              <Pencil size={16} />
            </Button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Badge className={cn("text-xs font-medium", sizeColors[size])}>
              {size}
            </Badge>
          </div>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Alertas:</p>
          <div className="flex flex-wrap gap-1.5">
            {alerts.map((alert) => (
              <Badge
                key={alert}
                variant="outline"
                className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/5 text-destructive border-destructive/20"
              >
                ⚠️ {alert}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
