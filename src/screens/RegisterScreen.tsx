import { useState } from "react";
import { MobileFrame, MobileHeader, MobileContent } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterChips } from "@/components/FilterChips";
import { Camera, Plus, ArrowLeft, Dog, User, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeOptions = [
  { id: "small", label: "Pequeno" },
  { id: "medium", label: "Médio" },
  { id: "large", label: "Grande" },
];

interface RegisterScreenProps {
  onBack?: () => void;
  onComplete?: () => void;
}

export function RegisterScreen({ onBack, onComplete }: RegisterScreenProps) {
  const [activeTab, setActiveTab] = useState<"tutor" | "walker">("tutor");
  const [selectedSize, setSelectedSize] = useState<string[]>(["medium"]);

  return (
    <MobileFrame>
      <MobileHeader
        title="Criar Perfil"
        leftAction={
          <Button variant="ghost" size="iconSm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
        }
      />

      <MobileContent className="pb-24">
        {/* Tab Switcher */}
        <div className="flex bg-muted rounded-2xl p-1 mb-6">
          <button
            onClick={() => setActiveTab("tutor")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
              activeTab === "tutor"
                ? "bg-card text-foreground shadow-card"
                : "text-muted-foreground"
            )}
          >
            <Dog size={18} />
            Sou Tutor
          </button>
          <button
            onClick={() => setActiveTab("walker")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
              activeTab === "walker"
                ? "bg-card text-foreground shadow-card"
                : "text-muted-foreground"
            )}
          >
            <User size={18} />
            Sou Passeador
          </button>
        </div>

        {activeTab === "tutor" ? (
          <>
            {/* Tutor Photo */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-accent">
                  <User size={48} className="text-muted-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-float">
                  <Camera size={18} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Sua foto</p>
            </div>

            {/* Tutor Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="tutor-name">Nome Completo</Label>
                <Input
                  id="tutor-name"
                  placeholder="Seu nome completo"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="tutor-email">E-mail</Label>
                <div className="relative mt-1.5">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="tutor-email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tutor-phone">Telefone</Label>
                <div className="relative mt-1.5">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="tutor-phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tutor-address">Endereço / Bairro</Label>
                <div className="relative mt-1.5">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="tutor-address"
                    placeholder="Seu bairro ou endereço"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tutor-cpf">CPF</Label>
                <Input
                  id="tutor-cpf"
                  placeholder="000.000.000-00"
                  className="mt-1.5"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Walker Photo */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-accent">
                  <User size={48} className="text-muted-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-float">
                  <Camera size={18} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Sua foto</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="full-name">Nome Completo</Label>
                <Input
                  id="full-name"
                  placeholder="Seu nome completo"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="bio">Biografia</Label>
                <Input
                  id="bio"
                  placeholder="Conte um pouco sobre você..."
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Preço/hora</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="R$ 40"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="max-dogs">Máx. de cães</Label>
                  <Input
                    id="max-dogs"
                    type="number"
                    placeholder="3"
                    className="mt-1.5"
                  />
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <Label className="mb-2 block">Documentos</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center gap-2 h-24 bg-muted rounded-2xl border-2 border-dashed border-border hover:border-primary transition-colors">
                    <Plus size={24} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      CNH ou RG
                    </span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 h-24 bg-muted rounded-2xl border-2 border-dashed border-border hover:border-primary transition-colors">
                    <Camera size={24} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Selfie
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Porte Aceito</Label>
                <FilterChips
                  chips={sizeOptions}
                  selected={selectedSize}
                  onToggle={(id) =>
                    setSelectedSize((prev) =>
                      prev.includes(id)
                        ? prev.filter((s) => s !== id)
                        : [...prev, id]
                    )
                  }
                />
              </div>
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
          <Button onClick={onComplete} className="w-full" size="lg">
            Continuar
          </Button>
        </div>
      </MobileContent>
    </MobileFrame>
  );
}
