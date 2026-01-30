import { MobileFrame, MobileHeader, MobileContent } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Shield, MapPin, Dog, Clock, Calendar } from "lucide-react";

interface WalkerProfileScreenProps {
  onBack?: () => void;
  onSchedule?: () => void;
}

export function WalkerProfileScreen({ onBack, onSchedule }: WalkerProfileScreenProps) {
  const walker = {
    name: "Marina Silva",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 127,
    pricePerHour: 45,
    neighborhood: "Pinheiros, São Paulo",
    bio: "Amante de cães desde sempre! Formada em medicina veterinária, ofereço passeios seguros e divertidos. Tenho experiência com cães de todos os portes e temperamentos.",
    acceptedSizes: ["Pequeno", "Médio", "Grande"],
    isVerified: true,
    maxDogs: 3,
    totalWalks: 342,
    memberSince: "Jan 2023",
  };

  return (
    <MobileFrame>
      <div className="relative">
        {/* Hero Image */}
        <div className="h-72 bg-muted relative">
          <img
            src={walker.photo}
            alt={walker.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          <Button
            variant="ghost"
            size="iconSm"
            onClick={onBack}
            className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="relative -mt-16 px-4">
          <div className="bg-card rounded-3xl p-5 shadow-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-foreground">{walker.name}</h1>
                  {walker.isVerified && (
                    <div className="bg-success rounded-full p-1">
                      <Shield size={14} className="text-success-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{walker.neighborhood}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">R${walker.pricePerHour}</span>
                <span className="text-sm text-muted-foreground block">/hora</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star size={18} className="text-warning fill-warning" />
                <span className="font-bold text-foreground">{walker.rating}</span>
                <span className="text-sm text-muted-foreground">({walker.reviews} avaliações)</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-muted rounded-xl p-3 text-center">
                <Dog size={20} className="text-primary mx-auto mb-1" />
                <span className="text-lg font-bold text-foreground">{walker.maxDogs}</span>
                <span className="text-[10px] text-muted-foreground block">máx/passeio</span>
              </div>
              <div className="bg-muted rounded-xl p-3 text-center">
                <Clock size={20} className="text-primary mx-auto mb-1" />
                <span className="text-lg font-bold text-foreground">{walker.totalWalks}</span>
                <span className="text-[10px] text-muted-foreground block">passeios</span>
              </div>
              <div className="bg-muted rounded-xl p-3 text-center">
                <Calendar size={20} className="text-primary mx-auto mb-1" />
                <span className="text-xs font-bold text-foreground">{walker.memberSince}</span>
                <span className="text-[10px] text-muted-foreground block">membro desde</span>
              </div>
            </div>

            {/* Verified Badge */}
            {walker.isVerified && (
              <div className="bg-success/10 rounded-xl p-3 flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <Shield size={20} className="text-success-foreground" />
                </div>
                <div>
                  <span className="font-semibold text-success text-sm">Perfil Verificado</span>
                  <p className="text-xs text-muted-foreground">Documentos validados pela equipe</p>
                </div>
              </div>
            )}

            {/* Accepted Sizes */}
            <div className="mb-4">
              <span className="text-sm font-medium text-foreground mb-2 block">Aceita cães</span>
              <div className="flex gap-2">
                {walker.acceptedSizes.map((size) => (
                  <Badge
                    key={size}
                    variant="secondary"
                    className="bg-accent text-accent-foreground px-3 py-1 rounded-full"
                  >
                    {size}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <span className="text-sm font-medium text-foreground mb-2 block">Sobre</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{walker.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <Button onClick={onSchedule} className="w-full" size="lg">
          <Calendar size={20} />
          Agendar Passeio
        </Button>
      </div>
    </MobileFrame>
  );
}
