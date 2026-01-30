import { useState } from "react";
import { MobileFrame, MobileHeader, MobileContent } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Clock, Repeat, CalendarDays, Dog } from "lucide-react";
import { cn } from "@/lib/utils";

const timeSlots = [
  "07:00", "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

const weekDays = [
  { id: "mon", label: "Seg" },
  { id: "tue", label: "Ter" },
  { id: "wed", label: "Qua" },
  { id: "thu", label: "Qui" },
  { id: "fri", label: "Sex" },
  { id: "sat", label: "Sáb" },
  { id: "sun", label: "Dom" },
];

interface ScheduleScreenProps {
  onBack?: () => void;
  onConfirm?: () => void;
}

export function ScheduleScreen({ onBack, onConfirm }: ScheduleScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  
  const pricePerHour = 45;
  const walkDuration = 1; // 1 hour

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  const calculateTotal = () => {
    if (isRecurring) {
      return selectedDays.length * pricePerHour * 4; // 4 weeks
    }
    return pricePerHour * walkDuration;
  };

  return (
    <MobileFrame>
      <MobileHeader
        title="Agendar Passeio"
        leftAction={
          <Button variant="ghost" size="iconSm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
        }
      />

      <MobileContent className="pb-32">
        {/* Walker Mini Card */}
        <div className="bg-card rounded-2xl p-4 flex items-center gap-4 mb-6 shadow-card">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="Marina"
            className="w-14 h-14 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Marina Silva</h3>
            <p className="text-sm text-muted-foreground">R${pricePerHour}/hora</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Dog size={16} />
            <span className="text-sm">máx 3</span>
          </div>
        </div>

        {/* Toggle: Single vs Recurring */}
        <div className="flex bg-muted rounded-2xl p-1 mb-6">
          <button
            onClick={() => setIsRecurring(false)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
              !isRecurring
                ? "bg-card text-foreground shadow-card"
                : "text-muted-foreground"
            )}
          >
            <CalendarDays size={18} />
            Avulso
          </button>
          <button
            onClick={() => setIsRecurring(true)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
              isRecurring
                ? "bg-card text-foreground shadow-card"
                : "text-muted-foreground"
            )}
          >
            <Repeat size={18} />
            Recorrente
          </button>
        </div>

        {/* Calendar or Day Selection */}
        {!isRecurring ? (
          <div className="bg-card rounded-2xl p-4 shadow-card mb-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <CalendarDays size={18} className="text-primary" />
              Selecione a data
            </h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-xl pointer-events-auto"
            />
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-4 shadow-card mb-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Repeat size={18} className="text-primary" />
              Dias da semana
            </h3>
            <div className="flex gap-2">
              {weekDays.map((day) => (
                <button
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-medium text-sm transition-all",
                    selectedDays.includes(day.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  )}
                >
                  {day.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Cobrado mensalmente (4 semanas)
            </p>
          </div>
        )}

        {/* Time Selection */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-6">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Horário
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-2.5 rounded-xl font-medium text-sm transition-all",
                  selectedTime === time
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-accent rounded-2xl p-4">
          <h3 className="font-semibold text-foreground mb-3">Resumo</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {isRecurring
                  ? `${selectedDays.length} dias/semana x 4 semanas`
                  : "Passeio de 1 hora"}
              </span>
              <span className="text-foreground">
                {isRecurring
                  ? `${selectedDays.length * 4}x R$${pricePerHour}`
                  : `R$${pricePerHour}`}
              </span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary text-lg">R${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </MobileContent>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <Button
          onClick={onConfirm}
          className="w-full"
          size="lg"
          disabled={!selectedTime || (isRecurring && selectedDays.length === 0)}
        >
          Solicitar Agendamento
        </Button>
      </div>
    </MobileFrame>
  );
}
