import { useState } from "react";
import { MobileFrame, MobileHeader, MobileContent } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Star, Clock, MapPin, CheckCircle } from "lucide-react";

interface ReviewScreenProps {
  onBack?: () => void;
  onSubmit?: () => void;
}

export function ReviewScreen({ onBack, onSubmit }: ReviewScreenProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const walkSummary = {
    walker: "Marina Silva",
    walkerPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    petName: "Thor",
    duration: "45 min",
    distance: "2.3 km",
    date: "Hoje, 15:30",
  };

  return (
    <MobileFrame>
      <MobileHeader
        title="Passeio Concluído"
        leftAction={
          <Button variant="ghost" size="iconSm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
        }
      />

      <MobileContent className="pb-24">
        {/* Success Animation */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={40} className="text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Passeio Finalizado!</h2>
          <p className="text-muted-foreground text-sm">{walkSummary.petName} teve um ótimo passeio 🐕</p>
        </div>

        {/* Walk Summary Card */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={walkSummary.walkerPhoto}
              alt={walkSummary.walker}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground">{walkSummary.walker}</h3>
              <p className="text-sm text-muted-foreground">{walkSummary.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duração</p>
                <p className="font-bold text-foreground">{walkSummary.duration}</p>
              </div>
            </div>
            <div className="bg-muted rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Distância</p>
                <p className="font-bold text-foreground">{walkSummary.distance}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-6">
          <h3 className="font-semibold text-foreground mb-4 text-center">
            Como foi o passeio?
          </h3>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  size={40}
                  className={
                    star <= rating
                      ? "text-warning fill-warning"
                      : "text-muted-foreground"
                  }
                />
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {rating === 0 && "Toque para avaliar"}
            {rating === 1 && "Muito ruim 😞"}
            {rating === 2 && "Ruim 😕"}
            {rating === 3 && "Regular 😐"}
            {rating === 4 && "Bom 😊"}
            {rating === 5 && "Excelente! 🤩"}
          </p>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Comentário <span className="text-muted-foreground font-normal">(opcional)</span>
          </label>
          <Textarea
            placeholder="Conte como foi a experiência..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] rounded-2xl resize-none"
          />
        </div>

        {/* History Button */}
        <Button variant="outline" className="w-full mb-4">
          Ver Histórico de Passeios
        </Button>
      </MobileContent>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <Button
          onClick={onSubmit}
          className="w-full"
          size="lg"
          disabled={rating === 0}
        >
          Enviar Avaliação
        </Button>
      </div>
    </MobileFrame>
  );
}
