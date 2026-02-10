import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, Dog, CheckCircle2, Play } from "lucide-react";

interface WalkerBookingScreenProps {
  onBack?: () => void;
  onStartWalk?: () => void;
}

export function WalkerBookingScreen({ onBack, onStartWalk }: WalkerBookingScreenProps) {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      onStartWalk?.();
    }, 1500);
  };

  return (
    <MobileFrame>
      <div className="sticky top-0 z-50 flex items-center gap-3 px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={onBack} className="p-1">
          <ArrowLeft size={22} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Agendamento Confirmado</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Status Badge */}
        <div className="flex justify-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${started ? "bg-success/15 text-success" : "bg-primary/15 text-primary"}`}>
            <CheckCircle2 size={18} />
            {started ? "Passeio Iniciado!" : "Confirmado"}
          </div>
        </div>

        {/* Tutor Info */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground mb-2">Tutor</p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="João Pedro"
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground text-lg">João Pedro</h3>
              <p className="text-sm text-muted-foreground">Tutor verificado</p>
            </div>
          </div>
        </div>

        {/* Pet Info */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <p className="text-sm text-muted-foreground mb-2">Pet</p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop"
              alt="Thor"
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground">Thor 🐕</h3>
              <p className="text-sm text-muted-foreground">Golden Retriever • Grande</p>
            </div>
          </div>
        </div>

        {/* Walk Details */}
        <div className="bg-card rounded-2xl p-4 shadow-card space-y-3">
          <p className="text-sm text-muted-foreground mb-1">Detalhes do Passeio</p>
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-primary" />
            <span className="text-foreground">Hoje, 14:00</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-primary" />
            <span className="text-foreground">30 minutos</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-primary" />
            <span className="text-foreground">Praça Pinheiros, São Paulo</span>
          </div>
        </div>

        {/* Start Walk Button */}
        {!started ? (
          <Button
            onClick={handleStart}
            variant="gradient"
            size="xl"
            className="w-full gap-3"
          >
            <Play size={22} />
            Iniciar Passeio
          </Button>
        ) : (
          <div className="text-center space-y-2 animate-in fade-in">
            <div className="w-12 h-12 mx-auto bg-success/15 rounded-full flex items-center justify-center">
              <CheckCircle2 size={28} className="text-success" />
            </div>
            <p className="text-sm text-muted-foreground">
              Passeio iniciado! Notificando o tutor...
            </p>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}
