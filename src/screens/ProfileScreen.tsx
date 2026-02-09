import { useState } from "react";
import { MobileFrame, MobileHeader, MobileContent, BottomNav } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    User, Mail, Phone, MapPin, LogOut,
    Dog, DollarSign, Briefcase, ChevronRight, Settings
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfileScreenProps {
    onLogout: () => void;
    onBack?: () => void;
    onSupport?: () => void;
}

export function ProfileScreen({ onLogout, onBack, onSupport }: ProfileScreenProps) {
    // Mock User State
    const [isWalker, setIsWalker] = useState(true); // Toggle for prototype
    const [isAvailable, setIsAvailable] = useState(true);
    const [price, setPrice] = useState("45");
    const [maxDogs, setMaxDogs] = useState("3");

    return (
        <MobileFrame>
            <MobileHeader
                title="Meu Perfil"
                rightAction={
                    <Button variant="ghost" size="iconSm" onClick={onLogout}>
                        <LogOut size={20} className="text-destructive" />
                    </Button>
                }
            />

            <MobileContent className="pb-24">

                {/* Profile Header */}
                <div className="flex flex-col items-center mb-6 animate-fade-in">
                    <Avatar className="w-24 h-24 mb-3 border-4 border-background shadow-xl">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">João Pedro</h2>
                    <p className="text-sm text-muted-foreground">joao.pedro@email.com</p>

                    <div className="flex gap-2 mt-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            Tutor
                        </span>
                        {isWalker && (
                            <span className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-xs font-medium">
                                Passeador
                            </span>
                        )}
                    </div>
                </div>

                {/* Prototype Toggle */}
                <div className="bg-muted/50 p-3 rounded-xl mb-6 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">MODO PROTÓTIPO: Ser Passeador?</span>
                    <Switch checked={isWalker} onCheckedChange={setIsWalker} />
                </div>

                {/* Walker Settings */}
                {isWalker && (
                    <div className="space-y-4 mb-6 animate-slide-up">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                            Painel do Passeador
                        </h3>
                        <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50">

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium">Disponibilidade</p>
                                        <p className="text-xs text-muted-foreground">
                                            {isAvailable ? "Visível nas buscas" : "Indisponível"}
                                        </p>
                                    </div>
                                </div>
                                <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
                            </div>

                            <Separator className="my-3" />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs text-muted-foreground mb-1 block">Preço / Hora</Label>
                                    <div className="relative">
                                        <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="pl-8 h-9"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground mb-1 block">Máx Caẽs</Label>
                                    <div className="relative">
                                        <Dog size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            value={maxDogs}
                                            onChange={(e) => setMaxDogs(e.target.value)}
                                            className="pl-8 h-9"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Personal Info */}
                <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                        Dados Pessoais
                    </h3>
                    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 divide-y divide-border/50">
                        <div className="p-4 flex items-center gap-4">
                            <Phone size={18} className="text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Telefone</p>
                                <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
                            </div>
                            <Button variant="ghost" size="iconSm"><ChevronRight size={18} /></Button>
                        </div>
                        <div className="p-4 flex items-center gap-4">
                            <MapPin size={18} className="text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Endereço</p>
                                <p className="text-sm text-muted-foreground">Rua das Flores, 123</p>
                            </div>
                            <Button variant="ghost" size="iconSm"><ChevronRight size={18} /></Button>
                        </div>
                    </div>
                </div>

                {/* App Settings */}
                <div className="mt-6 space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                        Aplicativo
                    </h3>
                    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 divide-y divide-border/50">
                        <button className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left" onClick={onSupport}>
                            <Briefcase size={18} className="text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Suporte e Ajuda</p>
                            </div>
                            <ChevronRight size={18} className="text-muted-foreground" />
                        </button>
                        <button className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left" onClick={onLogout}>
                            <LogOut size={18} className="text-destructive" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-destructive">Sair da Conta</p>
                            </div>
                        </button>
                    </div>
                </div>

            </MobileContent>
        </MobileFrame>
    );
}
