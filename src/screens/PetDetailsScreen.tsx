import { useState } from "react";
import { MobileFrame, MobileHeader, MobileContent } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Share2, Shield, AlertCircle, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PetDetailsScreenProps {
    onBack: () => void;
    // For prototype, we might accept optional pet data or default to mock
    petData?: any;
}

export function PetDetailsScreen({ onBack, petData }: PetDetailsScreenProps) {
    const { toast } = useToast();
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [emailToShare, setEmailToShare] = useState("");
    const [sharedUsers, setSharedUsers] = useState<{ email: string, status: string }[]>([
        { email: "spouse@email.com", status: "accepted" }
    ]);

    // Default Mock Data if no prop
    const pet = petData || {
        name: "Thor",
        photo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
        breed: "Golden Retriever",
        age: "2 anos",
        weight: "32 kg",
        alerts: ["Medo de carros", "Toma medicação"]
    };

    const handleShare = () => {
        if (!emailToShare) return;

        // Simulate API call
        setSharedUsers([...sharedUsers, { email: emailToShare, status: "pending" }]);
        setEmailToShare("");
        setIsShareOpen(false);

        toast({
            title: "Convite enviado!",
            description: `Um convite foi enviado para ${emailToShare}.`,
        });
    };

    return (
        <MobileFrame>
            <MobileHeader
                title="Detalhes do Pet"
                leftAction={
                    <Button variant="ghost" size="iconSm" onClick={onBack}>
                        <ArrowLeft size={20} />
                    </Button>
                }
                rightAction={
                    <Button variant="ghost" size="iconSm">
                        <Edit2 size={20} />
                    </Button>
                }
            />

            <MobileContent className="pb-8">

                {/* Hero Image */}
                <div className="relative h-64 -mt-4 -mx-4 mb-6">
                    <img
                        src={pet.photo}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-4 left-4">
                        <h1 className="text-3xl font-bold text-foreground">{pet.name}</h1>
                        <p className="text-muted-foreground">{pet.breed}</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/50 p-4 rounded-xl flex flex-col items-center">
                        <span className="text-2xl font-bold">{pet.age}</span>
                        <span className="text-xs text-muted-foreground uppercase">Idade</span>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-xl flex flex-col items-center">
                        <span className="text-2xl font-bold">{pet.weight}</span>
                        <span className="text-xs text-muted-foreground uppercase">Peso</span>
                    </div>
                </div>

                {/* Alerts */}
                <div className="mb-8">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle size={18} className="text-orange-500" />
                        Alertas e Cuidados
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {pet.alerts.map((alert: string) => (
                            <span key={alert} className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                                {alert}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Sharing Section */}
                <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Shield size={20} className="text-primary" />
                            <div>
                                <h3 className="font-semibold">Compartilhamento</h3>
                                <p className="text-xs text-muted-foreground">Gerencie quem pode ver este perfil</p>
                            </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => setIsShareOpen(true)}>
                            <Share2 size={16} className="mr-2" />
                            Convidar
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {sharedUsers.map((user, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user.email}</span>
                                        <span className={`text-[10px] ${user.status === 'accepted' ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {user.status === 'accepted' ? 'Aceito' : 'Pendente'}
                                        </span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="iconSm" className="text-muted-foreground hover:text-destructive">
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

            </MobileContent>

            {/* Share Dialog */}
            <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Compartilhar Perfil</DialogTitle>
                        <DialogDescription>
                            Convide outro tutor (ex: cônjuge, familiar) para gerenciar este pet com você.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="space-y-2">
                            <span className="text-sm font-medium">E-mail do convidado</span>
                            <Input
                                placeholder="exemplo@email.com"
                                value={emailToShare}
                                onChange={(e) => setEmailToShare(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsShareOpen(false)}>Cancelar</Button>
                        <Button onClick={handleShare}>Enviar Convite</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </MobileFrame>
    );
}
