import { useState, useEffect } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { BottomTabBar } from "@/components/BottomTabBar";
import { LoginScreen } from "@/screens/LoginScreen";
import { RegisterScreen } from "@/screens/RegisterScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { PetDetailsScreen } from "@/screens/PetDetailsScreen";
import { SupportScreen } from "@/screens/SupportScreen";
import { AddPetScreen } from "@/screens/AddPetScreen";
import { SearchScreen } from "@/screens/SearchScreen";
import { WalkerProfileScreen } from "@/screens/WalkerProfileScreen";
import { ScheduleScreen } from "@/screens/ScheduleScreen";
import { ActiveWalkScreen } from "@/screens/ActiveWalkScreen";
import { ActivityFeedScreen } from "@/screens/ActivityFeedScreen";
import { ReviewScreen } from "@/screens/ReviewScreen";
import { WalkerBookingScreen } from "@/screens/WalkerBookingScreen";
import { TutorMonitoringScreen } from "@/screens/TutorMonitoringScreen";
import { AttendantDashboardScreen, type Ticket } from "@/screens/AttendantDashboardScreen";
import { AttendantTicketScreen } from "@/screens/AttendantTicketScreen";
import { PetCard } from "@/components/PetCard";
import { Button } from "@/components/ui/button";
import { Dog, Plus, Calendar, MapPin, Bell, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

type Screen =
  | "login"
  | "register"
  | "profile"
  | "pet-details"
  | "support"
  | "add-pet"
  | "search"
  | "walker-profile"
  | "schedule"
  | "active-walk"
  | "activity-feed"
  | "review"
  | "walker-bookings"
  | "tutor-monitoring"
  | "attendant-dashboard"
  | "attendant-ticket"
  | "home";

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { toast } = useToast();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") setCurrentScreen("home");
    if (tab === "bookings") setCurrentScreen("walker-bookings");
    if (tab === "profile") setCurrentScreen("profile");
    if (tab === "messages") {
      toast({
        title: "Mensagens",
        description: "O chat estará disponível em breve no protótipo.",
      });
    }
  };

  // Renderização das Telas
  if (currentScreen === "login") {
    return (
      <LoginScreen
        onLogin={() => setCurrentScreen("home")}
        onRegister={() => setCurrentScreen("register")}
        onAttendantLogin={() => setCurrentScreen("attendant-dashboard")}
      />
    );
  }

  if (currentScreen === "register") {
    return <RegisterScreen onBack={() => setCurrentScreen("login")} onComplete={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "profile") {
    return (
      <ProfileScreen
        onLogout={() => setCurrentScreen("login")}
        onBack={() => setCurrentScreen("home")}
        onSupport={() => setCurrentScreen("support")}
      />
    );
  }

  if (currentScreen === "support") {
    return <SupportScreen onBack={() => setCurrentScreen("profile")} />;
  }

  if (currentScreen === "add-pet") {
    return <AddPetScreen onBack={() => setCurrentScreen("home")} onComplete={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "pet-details") {
    return <PetDetailsScreen onBack={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "search") {
    return <SearchScreen onBack={() => setCurrentScreen("home")} onSelectWalker={() => setCurrentScreen("walker-profile")} />;
  }

  if (currentScreen === "walker-profile") {
    return <WalkerProfileScreen onBack={() => setCurrentScreen("search")} onBook={() => setCurrentScreen("schedule")} />;
  }

  if (currentScreen === "schedule") {
    return <ScheduleScreen onBack={() => setCurrentScreen("walker-profile")} onComplete={() => setCurrentScreen("home")} />;
  }

  // --- ALTERAÇÃO AQUI NA ACTIVE WALK ---
  if (currentScreen === "active-walk") {
    return (
      <ActiveWalkScreen
        onEnd={() => setCurrentScreen("review")}
        onPhoto={(caption) => {
          // Notificação de sucesso para o passeador
          toast({
            title: "Foto enviada!",
            description: "A foto foi publicada no mural do pet.",
          });

          // Simulação de mensagem/notificação push para o tutor
          setTimeout(() => {
            toast({
              title: "📲 Notificação para o Tutor",
              description: `Nova foto de Thor disponível! Legenda: ${caption || "Sem legenda"}`,
              duration: 5000,
            });
          }, 1500);
        }}
        onEmergency={() => {
          toast({
            variant: "destructive",
            title: "Emergência Acionada",
            description: "Nossa equipe de suporte está entrando em contato agora.",
          });
        }}
      />
    );
  }

  if (currentScreen === "activity-feed") {
    return <ActivityFeedScreen onBack={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "review") {
    return <ReviewScreen onComplete={() => setCurrentScreen("home")} />;
  }

  if (currentScreen === "walker-bookings") {
    return (
      <WalkerBookingScreen
        onStartWalk={() => setCurrentScreen("active-walk")}
        onBack={() => {
          setActiveTab("home");
          setCurrentScreen("home");
        }}
      />
    );
  }

  if (currentScreen === "attendant-dashboard") {
    return (
      <AttendantDashboardScreen
        onSelectTicket={(ticket) => {
          setSelectedTicket(ticket);
          setCurrentScreen("attendant-ticket");
        }}
        onLogout={() => setCurrentScreen("login")}
      />
    );
  }

  if (currentScreen === "attendant-ticket" && selectedTicket) {
    return (
      <AttendantTicketScreen
        ticket={selectedTicket}
        onBack={() => setCurrentScreen("attendant-dashboard")}
      />
    );
  }

  // Home Screen (Default)
  return (
    <MobileFrame>
      <div className="p-6 pb-24 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Bom dia,</p>
            <h1 className="text-2xl font-bold text-foreground">João Pedro 👋</h1>
          </div>
          <Button variant="outline" size="icon" className="rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </Button>
        </div>

        {/* Pet Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Dog size={20} className="text-primary" /> Meus Pets
            </h2>
            <button onClick={() => setCurrentScreen("add-pet")} className="text-primary text-sm font-semibold flex items-center gap-1">
              <Plus size={16} /> Adicionar
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <PetCard name="Thor" breed="Golden Retriever" photo="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop" onClick={() => setCurrentScreen("pet-details")} />
            <div
              onClick={() => setCurrentScreen("add-pet")}
              className="min-w-[140px] aspect-[4/5] rounded-3xl border-2 border-dashed border-muted flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Plus size={20} className="text-muted-foreground" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">Novo Pet</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => setCurrentScreen("search")} className="h-28 rounded-3xl flex-col gap-2 shadow-card" variant="default">
            <div className="bg-white/20 p-2 rounded-xl">
              <Calendar size={24} />
            </div>
            Agendar Passeio
          </Button>
          <Button onClick={() => setCurrentScreen("search")} className="h-28 rounded-3xl flex-col gap-2 shadow-card" variant="secondary">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <MapPin size={24} />
            </div>
            Encontrar Passeador
          </Button>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground">Atividade Recente</h2>
            <button
              onClick={() => {
                setActiveTab("bookings");
                setCurrentScreen("activity-feed");
              }}
              className="text-sm text-primary font-medium"
            >
              Ver mural
            </button>
          </div>
          <div className="bg-card rounded-2xl overflow-hidden shadow-card">
            <div className="aspect-video relative">
              <img
                src="https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=250&fit=crop"
                alt="Thor passeando"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-xs font-medium">Ontem, 10:15</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Thor</span> correndo feliz pela praça 🏃‍♂️
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      <Toaster />
    </MobileFrame>
  );
}