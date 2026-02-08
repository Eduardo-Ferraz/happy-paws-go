import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { BottomTabBar } from "@/components/BottomTabBar";
import { RegisterScreen } from "@/screens/RegisterScreen";
import { AddPetScreen } from "@/screens/AddPetScreen";
import { SearchScreen } from "@/screens/SearchScreen";
import { WalkerProfileScreen } from "@/screens/WalkerProfileScreen";
import { ScheduleScreen } from "@/screens/ScheduleScreen";
import { ActiveWalkScreen } from "@/screens/ActiveWalkScreen";
import { ActivityFeedScreen } from "@/screens/ActivityFeedScreen";
import { ReviewScreen } from "@/screens/ReviewScreen";
import { PetCard } from "@/components/PetCard";
import { Button } from "@/components/ui/button";
import { Dog, Plus, Calendar, MapPin, Bell, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

type Screen = 
  | "home" 
  | "search" 
  | "walker-profile" 
  | "schedule" 
  | "active-walk" 
  | "review" 
  | "register" 
  | "add-pet"
  | "bookings" 
  | "pets" 
  | "profile"
  | "activity-feed";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();

  const handleProfileComplete = () => {
    setCurrentScreen("home");
    toast({
      title: "Perfil criado com sucesso",
      description: "Seu perfil foi salvo com sucesso!",
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") setCurrentScreen("home");
    if (tab === "search") setCurrentScreen("search");
    if (tab === "bookings") setCurrentScreen("activity-feed");
    if (tab === "pets") setCurrentScreen("pets");
    if (tab === "profile") setCurrentScreen("register");
  };

  // Render different screens based on navigation
  if (currentScreen === "register") {
    return (
      <RegisterScreen
        onBack={() => setCurrentScreen("home")}
        onComplete={handleProfileComplete}
      />
    );
  }

  if (currentScreen === "add-pet") {
    return (
      <AddPetScreen
        onBack={() => setCurrentScreen("pets")}
        onComplete={() => setCurrentScreen("pets")}
      />
    );
  }

  if (currentScreen === "search") {
    return (
      <>
        <SearchScreen onSelectWalker={() => setCurrentScreen("walker-profile")} />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );
  }

  if (currentScreen === "walker-profile") {
    return (
      <WalkerProfileScreen
        onBack={() => setCurrentScreen("search")}
        onSchedule={() => setCurrentScreen("schedule")}
      />
    );
  }

  if (currentScreen === "schedule") {
    return (
      <ScheduleScreen
        onBack={() => setCurrentScreen("walker-profile")}
        onConfirm={() => setCurrentScreen("active-walk")}
      />
    );
  }

  if (currentScreen === "active-walk") {
    return (
      <ActiveWalkScreen
        onEnd={() => setCurrentScreen("review")}
        onPhoto={() => {}}
        onEmergency={() => {}}
      />
    );
  }

  if (currentScreen === "review") {
    return (
      <ReviewScreen
        onBack={() => setCurrentScreen("home")}
        onSubmit={() => setCurrentScreen("home")}
      />
    );
  }

  if (currentScreen === "activity-feed") {
    return (
      <>
        <ActivityFeedScreen />
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      </>
    );
  }

  if (currentScreen === "pets") {
    return (
      <MobileFrame>
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
          <h1 className="text-lg font-bold text-foreground">Meus Pets</h1>
          <Button variant="default" size="sm" className="gap-2" onClick={() => setCurrentScreen("add-pet")}>
            <Plus size={16} />
            Adicionar
          </Button>
        </div>
        <div className="px-4 py-4 pb-24 space-y-4">
          <PetCard
            name="Thor"
            photo="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop"
            breed="Golden Retriever"
            age="2 anos"
            size="Grande"
            alerts={["Medo de carros", "Toma medicação"]}
          />
          <PetCard
            name="Luna"
            photo="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop"
            breed="Poodle"
            age="4 anos"
            size="Pequeno"
            alerts={["Idoso"]}
          />
        </div>
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      </MobileFrame>
    );
  }

  // Home Screen
  return (
    <MobileFrame>
      <div className="px-4 py-4 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-sm">Olá! 👋</p>
            <h1 className="text-2xl font-bold text-foreground">João Pedro</h1>
          </div>
          <button className="relative w-12 h-12 bg-muted rounded-full flex items-center justify-center">
            <Bell size={22} className="text-foreground" />
            <div className="absolute top-2 right-2 w-3 h-3 bg-destructive rounded-full border-2 border-background" />
          </button>
        </div>

        {/* Quick Action Card */}
        <div className="gradient-primary rounded-3xl p-5 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
          <div className="absolute bottom-0 right-8 w-20 h-20 bg-white/10 rounded-full -mb-6" />
          <div className="relative">
            <h2 className="text-primary-foreground text-lg font-bold mb-1">
              Agendar Passeio
            </h2>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Encontre o passeador ideal para seu pet
            </p>
            <Button
              onClick={() => {
                setActiveTab("search");
                setCurrentScreen("search");
              }}
              variant="secondary"
              size="sm"
              className="bg-white text-primary hover:bg-white/90"
            >
              Buscar agora
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        {/* My Pets Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground">Meus Pets</h2>
            <button
              onClick={() => {
                setActiveTab("pets");
                setCurrentScreen("pets");
              }}
              className="text-sm text-primary font-medium"
            >
              Ver todos
            </button>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-1 border-2 border-primary">
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop"
                  alt="Thor"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-medium text-foreground">Thor</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-1 border-2 border-transparent">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&h=100&fit=crop"
                  alt="Luna"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-medium text-foreground">Luna</span>
            </div>
            <button
              onClick={() => setCurrentScreen("add-pet")}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-1 hover:border-primary transition-colors">
                <Plus size={24} className="text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Adicionar</span>
            </button>
          </div>
        </div>

        {/* Upcoming Walks */}
        <div className="mb-6">
          <h2 className="font-bold text-foreground mb-3">Próximo Passeio</h2>
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="Marina"
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Marina Silva</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <span>Amanhã, 14:00</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Dog size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Thor</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin size={14} />
                <span className="text-sm">Pinheiros</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCurrentScreen("active-walk")}
              >
                Ver detalhes
              </Button>
            </div>
          </div>
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
};

export default Index;
