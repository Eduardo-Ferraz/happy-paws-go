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

type TutorFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
};

type WalkerFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
  bio: string;
  price: string;
  maxDogs: string;
};

const TUTOR_REQUIRED: (keyof TutorFields)[] = ["name", "email", "phone", "address", "cpf"];
const WALKER_REQUIRED: (keyof WalkerFields)[] = ["name", "email", "phone", "address", "cpf", "bio", "price", "maxDogs"];

export function RegisterScreen({ onBack, onComplete }: RegisterScreenProps) {
  const [activeTab, setActiveTab] = useState<"tutor" | "walker">("tutor");
  const [selectedSize, setSelectedSize] = useState<string[]>(["medium"]);

  const [tutorFields, setTutorFields] = useState<TutorFields>({
    name: "", email: "", phone: "", address: "", cpf: "",
  });

  const [walkerFields, setWalkerFields] = useState<WalkerFields>({
    name: "", email: "", phone: "", address: "", cpf: "", bio: "", price: "", maxDogs: "",
  });

  const [tutorErrors, setTutorErrors] = useState<Partial<Record<keyof TutorFields, boolean>>>({});
  const [walkerErrors, setWalkerErrors] = useState<Partial<Record<keyof WalkerFields, boolean>>>({});

  const handleTutorChange = (field: keyof TutorFields, value: string) => {
    setTutorFields((prev) => ({ ...prev, [field]: value }));
    if (value.trim()) {
      setTutorErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleWalkerChange = (field: keyof WalkerFields, value: string) => {
    setWalkerFields((prev) => ({ ...prev, [field]: value }));
    if (value.trim()) {
      setWalkerErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = () => {
    if (activeTab === "tutor") {
      const errors: Partial<Record<keyof TutorFields, boolean>> = {};
      let hasError = false;
      TUTOR_REQUIRED.forEach((field) => {
        if (!tutorFields[field].trim()) {
          errors[field] = true;
          hasError = true;
        }
      });
      setTutorErrors(errors);
      if (hasError) return;
    } else {
      const errors: Partial<Record<keyof WalkerFields, boolean>> = {};
      let hasError = false;
      WALKER_REQUIRED.forEach((field) => {
        if (!walkerFields[field].trim()) {
          errors[field] = true;
          hasError = true;
        }
      });
      setWalkerErrors(errors);
      if (hasError) return;
    }
    onComplete?.();
  };

  const inputErrorClass = "border-destructive focus-visible:ring-destructive";

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
          <TutorForm
            fields={tutorFields}
            errors={tutorErrors}
            onChange={handleTutorChange}
            inputErrorClass={inputErrorClass}
          />
        ) : (
          <WalkerForm
            fields={walkerFields}
            errors={walkerErrors}
            onChange={handleWalkerChange}
            selectedSize={selectedSize}
            onToggleSize={(id) =>
              setSelectedSize((prev) =>
                prev.includes(id)
                  ? prev.filter((s) => s !== id)
                  : [...prev, id]
              )
            }
            inputErrorClass={inputErrorClass}
          />
        )}

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
          <Button onClick={handleSubmit} className="w-full" size="lg">
            Continuar
          </Button>
        </div>
      </MobileContent>
    </MobileFrame>
  );
}

/* ── Tutor Form ── */
interface TutorFormProps {
  fields: TutorFields;
  errors: Partial<Record<keyof TutorFields, boolean>>;
  onChange: (field: keyof TutorFields, value: string) => void;
  inputErrorClass: string;
}

function TutorForm({ fields, errors, onChange, inputErrorClass }: TutorFormProps) {
  return (
    <>
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
          <Label htmlFor="tutor-name">Nome Completo</Label>
          <Input
            id="tutor-name"
            placeholder="Seu nome completo"
            value={fields.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={cn("mt-1.5", errors.name && inputErrorClass)}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>

        <div>
          <Label htmlFor="tutor-email">E-mail</Label>
          <div className="relative mt-1.5">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="tutor-email"
              type="email"
              placeholder="seu@email.com"
              value={fields.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={cn("pl-10", errors.email && inputErrorClass)}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>

        <div>
          <Label htmlFor="tutor-phone">Telefone</Label>
          <div className="relative mt-1.5">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="tutor-phone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={fields.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className={cn("pl-10", errors.phone && inputErrorClass)}
            />
          </div>
          {errors.phone && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>

        <div>
          <Label htmlFor="tutor-address">Endereço / Bairro</Label>
          <div className="relative mt-1.5">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="tutor-address"
              placeholder="Seu bairro ou endereço"
              value={fields.address}
              onChange={(e) => onChange("address", e.target.value)}
              className={cn("pl-10", errors.address && inputErrorClass)}
            />
          </div>
          {errors.address && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>

        <div>
          <Label htmlFor="tutor-cpf">CPF</Label>
          <Input
            id="tutor-cpf"
            placeholder="000.000.000-00"
            value={fields.cpf}
            onChange={(e) => onChange("cpf", e.target.value)}
            className={cn("mt-1.5", errors.cpf && inputErrorClass)}
          />
          {errors.cpf && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>
      </div>
    </>
  );
}

/* ── Walker Form ── */
interface WalkerFormProps {
  fields: WalkerFields;
  errors: Partial<Record<keyof WalkerFields, boolean>>;
  onChange: (field: keyof WalkerFields, value: string) => void;
  selectedSize: string[];
  onToggleSize: (id: string) => void;
  inputErrorClass: string;
}

function WalkerForm({ fields, errors, onChange, selectedSize, onToggleSize, inputErrorClass }: WalkerFormProps) {
  return (
    <>
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
          <Label htmlFor="walker-name">Nome Completo</Label>
          <Input
            id="walker-name"
            placeholder="Seu nome completo"
            value={fields.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={cn("mt-1.5", errors.name && inputErrorClass)}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>

        <div>
          <Label htmlFor="walker-email">E-mail</Label>
          <div className="relative mt-1.5">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="walker-email"
              type="email"
              placeholder="seu@email.com"
              value={fields.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={cn("pl-10", errors.email && inputErrorClass)}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>

        <div>
          <Label htmlFor="walker-phone">Telefone</Label>
          <div className="relative mt-1.5">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="walker-phone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={fields.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className={cn("pl-10", errors.phone && inputErrorClass)}
            />
          </div>
          {errors.phone && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>

        <div>
          <Label htmlFor="walker-address">Endereço / Bairro</Label>
          <div className="relative mt-1.5">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="walker-address"
              placeholder="Seu bairro ou endereço"
              value={fields.address}
              onChange={(e) => onChange("address", e.target.value)}
              className={cn("pl-10", errors.address && inputErrorClass)}
            />
          </div>
          {errors.address && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>

        <div>
          <Label htmlFor="walker-cpf">CPF</Label>
          <Input
            id="walker-cpf"
            placeholder="000.000.000-00"
            value={fields.cpf}
            onChange={(e) => onChange("cpf", e.target.value)}
            className={cn("mt-1.5", errors.cpf && inputErrorClass)}
          />
          {errors.cpf && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>

        <div>
          <Label htmlFor="walker-bio">Biografia</Label>
          <Input
            id="walker-bio"
            placeholder="Conte um pouco sobre você..."
            value={fields.bio}
            onChange={(e) => onChange("bio", e.target.value)}
            className={cn("mt-1.5", errors.bio && inputErrorClass)}
          />
          {errors.bio && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="walker-price">Preço/hora</Label>
            <Input
              id="walker-price"
              type="number"
              placeholder="R$ 40"
              value={fields.price}
              onChange={(e) => onChange("price", e.target.value)}
              className={cn("mt-1.5", errors.price && inputErrorClass)}
            />
            {errors.price && <p className="text-xs text-destructive mt-1">Obrigatório</p>}
          </div>
          <div>
            <Label htmlFor="walker-maxDogs">Máx. de cães</Label>
            <Input
              id="walker-maxDogs"
              type="number"
              placeholder="3"
              value={fields.maxDogs}
              onChange={(e) => onChange("maxDogs", e.target.value)}
              className={cn("mt-1.5", errors.maxDogs && inputErrorClass)}
            />
            {errors.maxDogs && <p className="text-xs text-destructive mt-1">Obrigatório</p>}
          </div>
        </div>

        {/* Document Upload */}
        <div>
          <Label className="mb-2 block">Documentos</Label>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 h-24 bg-muted rounded-2xl border-2 border-dashed border-border hover:border-primary transition-colors">
              <Plus size={24} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">CNH ou RG</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 h-24 bg-muted rounded-2xl border-2 border-dashed border-border hover:border-primary transition-colors">
              <Camera size={24} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Selfie</span>
            </button>
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Porte Aceito</Label>
          <FilterChips
            chips={sizeOptions}
            selected={selectedSize}
            onToggle={onToggleSize}
          />
        </div>
      </div>
    </>
  );
}
