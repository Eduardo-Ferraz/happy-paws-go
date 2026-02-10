import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headset, Clock, AlertTriangle, Search, LogOut } from "lucide-react";

export interface Ticket {
  id: string;
  protocol: string;
  type: "Financeiro" | "Técnico" | "Emergência" | "Denúncia";
  subject: string;
  description: string;
  status: "Em análise" | "Em atendimento" | "Resolvido";
  waitTime: number; // minutes
  createdAt: string;
  userName: string;
  attachments: { name: string; url: string }[];
  interactions: { author: string; message: string; timestamp: string }[];
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: "1",
    protocol: "EMG-2024-001",
    type: "Emergência",
    subject: "Cachorro fugiu durante passeio",
    description: "Meu cachorro Thor escapou da coleira durante o passeio com a passeadora Marina. Ele correu em direção à Av. Paulista. A passeadora está tentando alcançá-lo mas preciso de ajuda urgente.",
    status: "Em análise",
    waitTime: 2,
    createdAt: "2024-12-10T14:30:00",
    userName: "João Pedro",
    attachments: [
      { name: "local_fuga.png", url: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop" },
      { name: "coleira_aberta.jpg", url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop" },
    ],
    interactions: [
      { author: "João Pedro", message: "Meu cachorro fugiu! Preciso de ajuda urgente!", timestamp: "14:30" },
    ],
  },
  {
    id: "2",
    protocol: "EMG-2024-002",
    type: "Emergência",
    subject: "Passeador não apareceu",
    description: "O passeador confirmou o agendamento para as 10h mas já se passaram 40 minutos e ele não apareceu. Não responde mensagens nem ligações.",
    status: "Em análise",
    waitTime: 5,
    createdAt: "2024-12-10T10:40:00",
    userName: "Maria Clara",
    attachments: [
      { name: "confirmacao_agendamento.png", url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop" },
    ],
    interactions: [
      { author: "Maria Clara", message: "O passeador não veio! Já estou esperando há 40 minutos.", timestamp: "10:40" },
    ],
  },
  {
    id: "3",
    protocol: "FIN-2024-015",
    type: "Financeiro",
    subject: "Cobrança duplicada no cartão",
    description: "Fui cobrado duas vezes pelo mesmo passeio do dia 08/12. O valor de R$45,00 aparece duplicado na minha fatura.",
    status: "Em análise",
    waitTime: 18,
    createdAt: "2024-12-09T16:20:00",
    userName: "Carlos Oliveira",
    attachments: [
      { name: "fatura_cartao.png", url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
    ],
    interactions: [
      { author: "Carlos Oliveira", message: "Fui cobrado em duplicidade, gostaria do estorno.", timestamp: "16:20" },
    ],
  },
  {
    id: "4",
    protocol: "TEC-2024-042",
    type: "Técnico",
    subject: "GPS não atualiza posição",
    description: "Durante o passeio, o GPS parou de atualizar a posição do passeador. A última atualização foi há 15 minutos e estou preocupado.",
    status: "Em atendimento",
    waitTime: 12,
    createdAt: "2024-12-10T11:00:00",
    userName: "Ana Beatriz",
    attachments: [
      { name: "tela_gps_travado.png", url: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop" },
    ],
    interactions: [
      { author: "Ana Beatriz", message: "O GPS travou e não mostra onde meu cachorro está.", timestamp: "11:00" },
      { author: "Atendente", message: "Estamos verificando o problema. Pode tentar fechar e abrir o app?", timestamp: "11:05" },
    ],
  },
  {
    id: "5",
    protocol: "DEN-2024-008",
    type: "Denúncia",
    subject: "Passeador maltratou o animal",
    description: "Recebi vídeo de vizinho mostrando que o passeador puxou meu cachorro pela coleira de forma violenta. Quero que seja investigado.",
    status: "Em análise",
    waitTime: 35,
    createdAt: "2024-12-09T09:15:00",
    userName: "Fernanda Lima",
    attachments: [
      { name: "video_evidencia.mp4", url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop" },
      { name: "foto_machucado.jpg", url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop" },
    ],
    interactions: [
      { author: "Fernanda Lima", message: "Meu cachorro foi maltratado, tenho provas em vídeo.", timestamp: "09:15" },
    ],
  },
];

interface AttendantDashboardScreenProps {
  onSelectTicket: (ticket: Ticket) => void;
  onLogout: () => void;
}

export function AttendantDashboardScreen({ onSelectTicket, onLogout }: AttendantDashboardScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);

  // Sort: emergencies first, then by wait time desc
  const sortedTickets = [...MOCK_TICKETS].sort((a, b) => {
    if (a.type === "Emergência" && b.type !== "Emergência") return -1;
    if (b.type === "Emergência" && a.type !== "Emergência") return 1;
    return b.waitTime - a.waitTime;
  });

  const filtered = sortedTickets.filter((t) => {
    const matchesSearch =
      !searchQuery ||
      t.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filterType || t.type === filterType;
    return matchesSearch && matchesType;
  });

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

  const types = ["Emergência", "Financeiro", "Técnico", "Denúncia"];

  return (
    <MobileFrame>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Headset size={22} className="text-primary" />
            <h1 className="text-lg font-bold text-foreground">Central de Atendimento</h1>
          </div>
          <button onClick={onLogout} className="text-muted-foreground hover:text-foreground p-1">
            <LogOut size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por protocolo, assunto ou nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-muted/50 border border-input/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Type Filters */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto">
          <Button
            variant={filterType === null ? "chipActive" : "chip"}
            size="chip"
            onClick={() => setFilterType(null)}
          >
            Todos
          </Button>
          {types.map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "chipActive" : "chip"}
              size="chip"
              onClick={() => setFilterType(filterType === type ? null : type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-3 flex gap-3">
        <div className="flex-1 bg-destructive/10 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-destructive">
            {MOCK_TICKETS.filter((t) => t.type === "Emergência").length}
          </p>
          <p className="text-xs text-muted-foreground">Emergências</p>
        </div>
        <div className="flex-1 bg-primary/10 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-primary">
            {MOCK_TICKETS.filter((t) => t.status === "Em análise").length}
          </p>
          <p className="text-xs text-muted-foreground">Em análise</p>
        </div>
        <div className="flex-1 bg-muted rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{MOCK_TICKETS.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
      </div>

      {/* Ticket List */}
      <div className="px-4 pb-24 space-y-3">
        {filtered.map((ticket) => (
          <button
            key={ticket.id}
            onClick={() => onSelectTicket(ticket)}
            className={`w-full text-left rounded-2xl p-4 shadow-card transition-all hover:shadow-md ${
              ticket.type === "Emergência"
                ? "bg-destructive/5 border-2 border-destructive/30"
                : "bg-card border border-border"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${typeColors[ticket.type]}`}>
                  {ticket.type === "Emergência" && <AlertTriangle size={12} />}
                  {ticket.type}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                  {ticket.status}
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                <Clock size={12} />
                <span className="text-xs">{ticket.waitTime}min</span>
              </div>
            </div>

            <p className="font-semibold text-foreground text-sm mb-1">{ticket.subject}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">{ticket.protocol}</span>
              <span className="text-xs text-muted-foreground">{ticket.userName}</span>
            </div>
          </button>
        ))}
      </div>
    </MobileFrame>
  );
}
