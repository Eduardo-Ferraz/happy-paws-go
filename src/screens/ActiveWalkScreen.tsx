import { useState, useEffect } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Camera, AlertTriangle, Pause, Play, MapPin, Dog } from "lucide-react";

interface ActiveWalkScreenProps {
  onEnd?: () => void;
  onPhoto?: () => void;
  onEmergency?: () => void;
}

export function ActiveWalkScreen({ onEnd, onPhoto, onEmergency }: ActiveWalkScreenProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        setDistance((prev) => prev + 0.005 + Math.random() * 0.01);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <MobileFrame className="relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-muted">
        {/* Simulated Map */}
        <div className="w-full h-full relative">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            {/* Streets */}
            <path d="M0,200 L400,200" stroke="#e5e7eb" strokeWidth="30" />
            <path d="M0,400 L400,400" stroke="#e5e7eb" strokeWidth="30" />
            <path d="M0,600 L400,600" stroke="#e5e7eb" strokeWidth="30" />
            <path d="M100,0 L100,800" stroke="#e5e7eb" strokeWidth="25" />
            <path d="M200,0 L200,800" stroke="#e5e7eb" strokeWidth="25" />
            <path d="M300,0 L300,800" stroke="#e5e7eb" strokeWidth="25" />
            
            {/* Walk Path */}
            <path
              d="M200,700 Q150,600 200,500 T250,400 T200,300"
              stroke="hsl(24 95% 53%)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="0"
            />
            
            {/* Start Point */}
            <circle cx="200" cy="700" r="12" fill="hsl(142 71% 45%)" />
            <circle cx="200" cy="700" r="6" fill="white" />
          </svg>

          {/* Dog Icon - Animated */}
          <div 
            className="absolute animate-walk"
            style={{ 
              left: '47%', 
              top: '35%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="bg-primary rounded-full p-3 shadow-float">
              <Dog size={28} className="text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Info Bar */}
      <div className="absolute top-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Passeando com</p>
            <p className="font-bold text-foreground text-lg">Thor 🐕</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} className="text-primary" />
            <span className="text-sm">{distance.toFixed(2)} km</span>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2">
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-card flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
          <span className="text-3xl font-bold text-foreground font-mono">
            {formatTime(elapsedTime)}
          </span>
          <Button
            variant="ghost"
            size="iconSm"
            onClick={() => setIsPaused(!isPaused)}
            className="ml-2"
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-8 left-4 right-4">
        <div className="flex gap-4 justify-center mb-4">
          {/* Camera Button */}
          <Button
            onClick={onPhoto}
            variant="secondary"
            size="fab"
            className="bg-secondary text-secondary-foreground shadow-lg"
          >
            <Camera size={24} />
          </Button>

          {/* Emergency Button */}
          <Button
            onClick={onEmergency}
            variant="emergency"
            size="fab"
            className="shadow-lg"
          >
            <AlertTriangle size={24} />
          </Button>
        </div>

        {/* End Walk Button */}
        <Button
          onClick={onEnd}
          variant="outline"
          className="w-full h-14 text-base border-2"
          size="lg"
        >
          Finalizar Passeio
        </Button>
      </div>
    </MobileFrame>
  );
}
