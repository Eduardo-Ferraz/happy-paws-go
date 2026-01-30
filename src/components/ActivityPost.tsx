import { Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityPostProps {
  image: string;
  caption: string;
  petName: string;
  timestamp: string;
  likes?: number;
  className?: string;
}

export function ActivityPost({
  image,
  caption,
  petName,
  timestamp,
  likes = 0,
  className,
}: ActivityPostProps) {
  return (
    <div className={cn("bg-card rounded-2xl overflow-hidden shadow-card", className)}>
      <div className="aspect-square relative">
        <img
          src={image}
          alt={caption}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors">
              <Heart size={20} />
              <span className="text-sm">{likes}</span>
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle size={20} />
            </button>
          </div>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        
        <p className="text-sm">
          <span className="font-semibold text-foreground">{petName}</span>{" "}
          <span className="text-muted-foreground">{caption}</span>
        </p>
      </div>
    </div>
  );
}
