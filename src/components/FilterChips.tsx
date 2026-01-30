import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterChip {
  id: string;
  label: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  selected: string[];
  onToggle: (id: string) => void;
  className?: string;
}

export function FilterChips({ chips, selected, onToggle, className }: FilterChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {chips.map((chip) => (
        <Button
          key={chip.id}
          variant={selected.includes(chip.id) ? "chipActive" : "chip"}
          size="chip"
          onClick={() => onToggle(chip.id)}
        >
          {chip.label}
        </Button>
      ))}
    </div>
  );
}
