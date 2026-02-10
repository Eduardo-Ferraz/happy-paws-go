import { useState } from "react";
import { MobileFrame, MobileHeader, MobileContent } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Star, Clock, MapPin, CheckCircle, CreditCard, Smartphone } from "lucide-react";

interface ReviewScreenProps {
  onBack?: () => void;
  onSubmit?: () => void;
}

export function ReviewScreen({ onBack, onSubmit }: ReviewScreenProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "pix">("credit_card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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

        {/* Payment Button */}
        <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full mb-4">
              💳 Realizar Pagamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Pagamento do Passeio</DialogTitle>
              <DialogDescription>
                Total: R$ 45,00
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label>Método de Pagamento</Label>
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "credit_card" | "pix")}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard size={20} className="text-primary" />
                      <span>Cartão de Crédito</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone size={20} className="text-primary" />
                      <span>Pix</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === "credit_card" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Nome no Cartão</Label>
                    <Input
                      id="cardName"
                      placeholder="NOME COMPLETO"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="cardExpiry">Validade</Label>
                      <Input
                        id="cardExpiry"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvv">CVV</Label>
                      <Input
                        id="cardCvv"
                        placeholder="000"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={3}
                        type="password"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Pix Instructions */}
              {paymentMethod === "pix" && (
                <div className="space-y-3">
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Chave Pix:</p>
                    <p className="font-mono font-bold text-foreground">pix@happypaws.com</p>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      💡 Após realizar o pagamento via Pix, o sistema confirmará automaticamente em alguns instantes.
                    </p>
                  </div>
                </div>
              )}

              {/* Payment Button */}
              <Button
                className="w-full"
                onClick={() => {
                  setIsProcessingPayment(true);
                  // Simulate payment processing
                  setTimeout(() => {
                    setIsProcessingPayment(false);
                    setIsPaymentOpen(false);
                    // Show success message or navigate
                  }, 2000);
                }}
                disabled={isProcessingPayment || (paymentMethod === "credit_card" && (!cardNumber || !cardName || !cardExpiry || !cardCvv))}
              >
                {isProcessingPayment ? "Processando..." : `Pagar R$ 45,00`}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
