import { useState } from "react";
import { MobileFrame, MobileHeader, MobileContent } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Plus, MessageSquare, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface SupportScreenProps {
    onBack: () => void;
}

type Ticket = {
    id: string;
    category: string;
    status: "Aberto" | "Em Análise" | "Resolvido";
    title: string;
    date: string;
};

export function SupportScreen({ onBack }: SupportScreenProps) {
    const { toast } = useToast();
    const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
    const [newTicket, setNewTicket] = useState({ category: "", description: "" });

    const [tickets, setTickets] = useState<Ticket[]>([
        { id: "1", category: "Financeiro", status: "Resolvido", title: "Problema com pagamento", date: "05/02/2026" },
        { id: "2", category: "Técnico", status: "Em Análise", title: "App travando no mapa", date: "08/02/2026" },
    ]);

    const handleSubmit = () => {
        if (!newTicket.category || !newTicket.description) return;

        const ticket: Ticket = {
            id: Math.random().toString(36).substr(2, 9),
            category: newTicket.category,
            status: "Aberto",
            title: newTicket.description.substring(0, 20) + "...",
            date: new Date().toLocaleDateString("pt-BR"),
        };

        setTickets([ticket, ...tickets]);
        setIsNewTicketOpen(false);
        setNewTicket({ category: "", description: "" });
        toast({
            title: "Chamado criado",
            description: `Protocolo: #${ticket.id}`,
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Resolvido": return "bg-green-100 text-green-700 hover:bg-green-100";
            case "Em Análise": return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
            default: return "bg-blue-100 text-blue-700 hover:bg-blue-100";
        }
    };

    return (
        <MobileFrame>
            <MobileHeader
                title="Suporte"
                leftAction={
                    <Button variant="ghost" size="iconSm" onClick={onBack}>
                        <ArrowLeft size={20} />
                    </Button>
                }
            />

            <MobileContent className="pb-24">
                {/* Active Tickets List */}
                <div className="space-y-4">
                    {tickets.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                            <p>Nenhum chamado encontrado</p>
                        </div>
                    ) : (
                        tickets.map(ticket => (
                            <div key={ticket.id} className="bg-card p-4 rounded-xl shadow-sm border border-border/50 animate-slide-up">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-mono text-muted-foreground mb-1">#{ticket.id} • {ticket.date}</span>
                                        <h3 className="font-semibold text-foreground">{ticket.category}</h3>
                                    </div>
                                    <Badge className={getStatusColor(ticket.status)} variant="secondary">
                                        {ticket.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{ticket.title}</p>
                            </div>
                        ))
                    )}
                </div>

            </MobileContent>

            {/* FAB */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    onClick={() => setIsNewTicketOpen(true)}
                    className="h-14 w-14 rounded-full shadow-lg"
                >
                    <Plus size={24} />
                </Button>
            </div>

            {/* New Ticket Dialog */}
            <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Abrir Chamado</DialogTitle>
                        <DialogDescription>
                            Descreva seu problema para nossa equipe.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Categoria</label>
                            <Select
                                value={newTicket.category}
                                onValueChange={(val) => setNewTicket({ ...newTicket, category: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Emergência">Emergência</SelectItem>
                                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                                    <SelectItem value="Técnico">Técnico</SelectItem>
                                    <SelectItem value="Denúncia">Denúncia</SelectItem>
                                    <SelectItem value="Outros">Outros</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Descrição</label>
                            <Textarea
                                placeholder="Detalhe o ocorrido..."
                                className="min-h-[100px]"
                                value={newTicket.description}
                                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewTicketOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSubmit} disabled={!newTicket.category || !newTicket.description}>Enviar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </MobileFrame>
    );
}
