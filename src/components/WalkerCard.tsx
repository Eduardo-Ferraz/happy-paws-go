import { Star, Shield, MapPin, Dog } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface WalkerCardProps {
  name: string;
  photo: string;
  rating: number;
  reviews: number;
  pricePerHour: number;
  neighborhood: string;
  acceptedSizes: string[];
  isVerified: boolean;
  maxDogs: number;
  onClick?: () => void;
}

export function WalkerCard({
  name,
  photo,
  rating,
  reviews,
  pricePerHour,
  neighborhood,
  acceptedSizes,
  isVerified,
  maxDogs,
  onClick,
}: WalkerCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-2xl p-4 shadow-card hover:shadow-lg transition-all duration-200 flex gap-4 text-left active:scale-[0.99]"
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted">
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        {isVerified && (
          <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1">
            <Shield size={12} className="text-success-foreground" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground truncate">{name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={14} className="text-warning fill-warning" />
              <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({reviews})</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">R${pricePerHour}</span>
            <span className="text-xs text-muted-foreground block">/hora</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span className="truncate">{neighborhood}</span>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Dog size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">até {maxDogs}</span>
          </div>
          <div className="flex gap-1">
            {acceptedSizes.map((size) => (
              <Badge
                key={size}
                variant="secondary"
                className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground"
              >
                {size}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
