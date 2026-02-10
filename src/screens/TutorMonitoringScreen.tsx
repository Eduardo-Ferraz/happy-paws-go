import { useState, useEffect, useCallback } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Dog, AlertTriangle, MapPin, Clock, Shield } from "lucide-react";

interface TutorMonitoringScreenProps {
  onWalkEnded?: () => void;
  onPhoto?: () => void;
}

// Planned route points
const PLANNED_ROUTE = [
  { x: 200, y: 700 },
  { x: 175, y: 650 },
  { x: 160, y: 600 },
  { x: 180, y: 550 },
  { x: 200, y: 500 },
  { x: 220, y: 450 },
  { x: 210, y: 400 },
  { x: 230, y: 350 },
  { x: 200, y: 300 },
  { x: 190, y: 250 },
];

// Deviated route points (>100m off planned path)
const DEVIATED_ROUTE = [
  { x: 200, y: 300 },
  { x: 260, y: 270 },
  { x: 320, y: 250 },
  { x: 350, y: 220 },
  { x: 370, y: 190 },
];

function pointsToPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
}

export function TutorMonitoringScreen({ onWalkEnded }: TutorMonitoringScreenProps) {
  const [elapsed, setElapsed] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeviating, setIsDeviating] = useState(false);
  const [deviationIndex, setDeviationIndex] = useState(0);
  const [walkEnded, setWalkEnded] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);

  // Timer
  useEffect(() => {
    if (walkEnded) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [walkEnded]);

  // Auto-animate dog along planned route
  useEffect(() => {
    if (walkEnded || isDeviating) return;
    const t = setInterval(() => {
      setCurrentIndex((i) => {
        if (i < PLANNED_ROUTE.length - 1) return i + 1;
        return i;
      });
    }, 1200);
    return () => clearInterval(t);
  }, [walkEnded, isDeviating]);

  // Animate deviation
  useEffect(() => {
    if (!isDeviating || walkEnded) return;
    const t = setInterval(() => {
      setDeviationIndex((i) => {
        if (i < DEVIATED_ROUTE.length - 1) return i + 1;
        return i;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [isDeviating, walkEnded]);

  const handleSimulateDeviation = useCallback(() => {
    setCurrentIndex(PLANNED_ROUTE.length - 1); // Jump to end of planned
    setIsDeviating(true);
    setDeviationIndex(0);
  }, []);

  const handleEndWalk = useCallback(() => {
    setWalkEnded(true);
    setShowEndMessage(true);
    setTimeout(() => {
      onWalkEnded?.();
    }, 3000);
  }, [onWalkEnded]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const currentPos = isDeviating
    ? DEVIATED_ROUTE[deviationIndex] || DEVIATED_ROUTE[DEVIATED_ROUTE.length - 1]
    : PLANNED_ROUTE[currentIndex] || PLANNED_ROUTE[0];

  const walkedPath = pointsToPath(PLANNED_ROUTE.slice(0, currentIndex + 1));
  const deviatedPath = isDeviating
    ? pointsToPath(DEVIATED_ROUTE.slice(0, deviationIndex + 1))
    : "";

  if (showEndMessage) {
    return (
      <MobileFrame className="flex items-center justify-center">
        <div className="text-center px-8 space-y-4 animate-in fade-in zoom-in">
          <div className="w-20 h-20 mx-auto bg-success/15 rounded-full flex items-center justify-center">
            <Dog size={40} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Passeio Finalizado!</h2>
          <p className="text-muted-foreground">
            O passeio de Thor foi encerrado com sucesso. 🐕
          </p>
          <p className="text-sm text-muted-foreground">
            Duração: {formatTime(elapsed)} • Redirecionando...
          </p>
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame className="relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-muted">
        <div className="w-full h-full relative">
          <svg className="w-full h-full" viewBox="0 0 400 800">
            {/* Streets */}
            <path d="M0,200 L400,200" stroke="hsl(var(--border))" strokeWidth="30" />
            <path d="M0,400 L400,400" stroke="hsl(var(--border))" strokeWidth="30" />
            <path d="M0,600 L400,600" stroke="hsl(var(--border))" strokeWidth="30" />
            <path d="M100,0 L100,800" stroke="hsl(var(--border))" strokeWidth="25" />
            <path d="M200,0 L200,800" stroke="hsl(var(--border))" strokeWidth="25" />
            <path d="M300,0 L300,800" stroke="hsl(var(--border))" strokeWidth="25" />

            {/* Planned route (gray dotted) */}
            <path
              d={pointsToPath(PLANNED_ROUTE)}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="4"
              fill="none"
              strokeDasharray="8,6"
              opacity={0.5}
            />

            {/* Walked path (primary color, or red if deviating) */}
            {walkedPath && (
              <path
                d={walkedPath}
                stroke={isDeviating ? "hsl(0 84% 60%)" : "hsl(24 95% 53%)"}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
            )}

            {/* Deviated path (RED) */}
            {deviatedPath && (
              <path
                d={deviatedPath}
                stroke="hsl(0 84% 60%)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
            )}

            {/* Start point */}
            <circle cx="200" cy="700" r="12" fill="hsl(142 71% 45%)" />
            <circle cx="200" cy="700" r="6" fill="white" />
          </svg>

          {/* Dog Icon */}
          <div
            className="absolute transition-all duration-1000 ease-in-out"
            style={{
              left: `${(currentPos.x / 400) * 100}%`,
              top: `${(currentPos.y / 800) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className={`rounded-full p-3 shadow-float ${isDeviating ? "bg-destructive animate-pulse" : "bg-primary"}`}>
              <Dog size={28} className="text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Info Bar */}
      <div className="absolute top-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Monitorando</p>
            <p className="font-bold text-foreground text-lg">Thor 🐕</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock size={16} className="text-primary" />
              <span className="text-sm font-mono font-bold">{formatTime(elapsed)}</span>
            </div>
          </div>
        </div>

        {/* Deviation Alert */}
        {isDeviating && (
          <div className="mt-3 pt-3 border-t border-destructive/30 flex items-center gap-2 text-destructive animate-in fade-in">
            <AlertTriangle size={18} className="animate-pulse" />
            <span className="text-sm font-semibold">⚠️ Desvio de rota detectado! (&gt;100m)</span>
          </div>
        )}
      </div>

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


      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-4 right-4 space-y-3">
        {/* Simulate Deviation Button */}
        {!isDeviating && !walkEnded && (
          <Button
            onClick={handleSimulateDeviation}
            variant="outline"
            className="w-full gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Shield size={18} />
            Simular Desvio de Rota (&gt;100m)
          </Button>
        )}

        {/* End Walk Button (simulating walker ending) */}
        {!walkEnded && (
          <Button
            onClick={handleEndWalk}
            variant="default"
            size="lg"
            className="w-full"
          >
            Finalizar Passeio
          </Button>
        )}
      </div>
    </MobileFrame>
  );
}
