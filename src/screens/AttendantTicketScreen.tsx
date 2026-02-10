import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Download, Image, Clock, User, Headset, AlertTriangle } from "lucide-react";
import type { Ticket } from "./AttendantDashboardScreen";

interface AttendantTicketScreenProps {
  ticket: Ticket;
  onBack: () => void;
}

export function AttendantTicketScreen({ ticket, onBack }: AttendantTicketScreenProps) {
  const [status, setStatus] = useState(ticket.status);
  const [response, setResponse] = useState("");
  const [interactions, setInteractions] = useState(ticket.interactions);

  const now = () => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
  };

  const handleSendResponse = () => {
    if (!response.trim()) return;

    const newInteraction = {
      author: "Atendente",
      message: response.trim(),
      timestamp: now(),
    };

    setInteractions((prev) => [...prev, newInteraction]);
    setResponse("");

    // Auto-change status from "Em análise" to "Em atendimento"
    if (status === "Em análise") {
      setStatus("Em atendimento");
    }
  };

  const typeColors: Record<string, string> = {
    Emergência: "bg-destructive text-destructive-foreground",
    Financeiro: "bg-primary text-primary-foreground",
    Técnico: "bg-secondary text-secondary-foreground",
    Denúncia: "bg-accent text-accent-foreground",
  };

  const statusColors: Record<string, string> = {
    "Em análise": "bg-muted text-muted-foreground",
    "Em atendimento": "bg-primary/15 text-primary",
    Resolvido: "bg-success/15 text-success",
  };

  return (
    <MobileFrame>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground text-sm truncate">{ticket.subject}</p>
            <p className="text-xs text-muted-foreground font-mono">{ticket.protocol}</p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-4 pb-3 flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${typeColors[ticket.type]}`}>
            {ticket.type === "Emergência" && <AlertTriangle size={12} />}
            {ticket.type}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
            {status}
          </span>
          <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
            <Clock size={12} />
            Espera: {ticket.waitTime}min
          </span>
        </div>
      </div>

      <div className="px-4 py-4 pb-32 space-y-4">
        {/* User Info */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <p className="text-xs text-muted-foreground mb-1">Solicitante</p>
          <p className="font-semibold text-foreground">{ticket.userName}</p>
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <p className="text-xs text-muted-foreground mb-2">Descrição do Chamado</p>
          <p className="text-sm text-foreground leading-relaxed">{ticket.description}</p>
        </div>

        {/* Attachments / Evidence */}
        {ticket.attachments.length > 0 && (
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <Image size={16} className="text-primary" />
              <p className="text-xs text-muted-foreground font-semibold">
                Evidências ({ticket.attachments.length})
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ticket.attachments.map((att, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden border border-border">
                  <img
                    src={att.url}
                    alt={att.name}
                    className="w-full h-28 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-card/90 rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground"
                    >
                      <Download size={14} />
                      Baixar
                    </a>
                  </div>
                  <p className="text-[10px] text-muted-foreground px-2 py-1 truncate">{att.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interaction History / Audit Log */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-primary" />
            <p className="text-xs text-muted-foreground font-semibold">
              Histórico de Interações
            </p>
          </div>

          <div className="space-y-3">
            {interactions.map((interaction, i) => {
              const isAttendant = interaction.author === "Atendente";
              return (
                <div
                  key={i}
                  className={`flex gap-2 ${isAttendant ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isAttendant ? "bg-primary/15" : "bg-muted"
                  }`}>
                    {isAttendant ? (
                      <Headset size={14} className="text-primary" />
                    ) : (
                      <User size={14} className="text-muted-foreground" />
                    )}
                  </div>
                  <div className={`flex-1 max-w-[75%] ${isAttendant ? "text-right" : ""}`}>
                    <div
                      className={`inline-block rounded-2xl px-3 py-2 text-sm ${
                        isAttendant
                          ? "bg-primary/10 text-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {interaction.message}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock size={10} />
                      {interaction.timestamp} — {interaction.author}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Response Input - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-background/95 backdrop-blur-sm border-t border-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite sua resposta..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendResponse()}
            className="flex-1 h-11 px-4 rounded-xl bg-muted/50 border border-input/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            onClick={handleSendResponse}
            disabled={!response.trim()}
            size="icon"
            className="h-11 w-11"
          >
            <Send size={18} />
          </Button>
        </div>
        {status === "Em análise" && (
          <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
            Ao responder, o status mudará para "Em atendimento" automaticamente
          </p>
        )}
      </div>
    </MobileFrame>
  );
}
