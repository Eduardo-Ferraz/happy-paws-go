import { useState, useEffect } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, AlertTriangle, Pause, Play, MapPin, Dog, X, Check } from "lucide-react";

interface ActiveWalkScreenProps {
  onEnd?: () => void;
  onPhoto?: (caption: string) => void; // Atualizado para receber a legenda
  onEmergency?: () => void;
}

// Componente Interno para o Modal de Foto e Legenda
function PhotoUploadModal({ onSave, onCancel }: { onSave: (c: string) => void, onCancel: () => void }) {
  const [caption, setCaption] = useState("");

  return (
    <div className="absolute inset-0 z-[100] bg-background/98 flex flex-col p-6 animate-in fade-in zoom-in duration-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Postar no Mural</h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X size={24} />
        </Button>
      </div>

      <div className="flex-1 space-y-6">
        <div className="aspect-square w-full bg-muted rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-border overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop" 
            alt="Preview" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute flex flex-col items-center text-muted-foreground">
            <Camera size={32} className="mb-2" />
            <p className="text-sm font-medium">Foto capturada!</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Legenda (opcional)</label>
          <Textarea 
            placeholder="Como está o passeio? (Ex: Thor amou os novos amigos!)"
            maxLength={100}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="resize-none h-24 rounded-2xl"
          />
          <p className="text-right text-xs text-muted-foreground font-mono">
            {caption.length}/100
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1 h-12" onClick={onCancel}>
          Cancelar
        </Button>
        <Button className="flex-1 h-12 gap-2" onClick={() => onSave(caption)}>
          <Check size={18} /> Postar Foto
        </Button>
      </div>
    </div>
  );
}

export function ActiveWalkScreen({ onEnd, onPhoto, onEmergency }: ActiveWalkScreenProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);

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

  const handleSavePhoto = (caption: string) => {
    setIsCapturing(false);
    if (onPhoto) onPhoto(caption);
  };

  return (
    <MobileFrame className="relative overflow-hidden">
      {/* Modal de Legenda */}
      {isCapturing && (
        <PhotoUploadModal onSave={handleSavePhoto} onCancel={() => setIsCapturing(false)} />
      )}

      {/* Map Background */}
      <div className="absolute inset-0 bg-muted">
        <div className="w-full h-full relative bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-46.662,-23.561,15/430x932@2x?access_token=mock')] bg-cover bg-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-12 h-12 bg-primary/20 rounded-full animate-ping absolute -inset-0" />
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-white shadow-lg relative">
                <Dog size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="absolute top-12 left-4 right-4 flex flex-col gap-3">
        <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-4 shadow-card flex justify-around items-center border border-border">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Distância</p>
            <p className="text-xl font-bold text-foreground">{distance.toFixed(2)} km</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Ritmo</p>
            <p className="text-xl font-bold text-foreground">12'45"</p>
          </div>
        </div>

        <div className="self-center bg-background/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-card flex items-center gap-3 border border-border">
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
          <Button
            onClick={() => setIsCapturing(true)}
            variant="secondary"
            size="fab"
            className="bg-secondary text-secondary-foreground shadow-lg h-16 w-16"
          >
            <Camera size={28} />
          </Button>

          <Button
            onClick={onEmergency}
            variant="emergency"
            size="fab"
            className="shadow-lg h-16 w-16"
          >
            <AlertTriangle size={28} />
          </Button>
        </div>

        <Button
          onClick={onEnd}
          variant="outline"
          className="w-full h-14 text-base border-2 bg-background/80 backdrop-blur-sm"
          size="lg"
        >
          Finalizar Passeio
        </Button>
      </div>
    </MobileFrame>
  );
}