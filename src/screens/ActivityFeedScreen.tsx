import { useState } from "react";
import { MobileFrame, MobileHeader, MobileContent } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { AchievementBadge } from "@/components/AchievementBadge";
import { ActivityPost } from "@/components/ActivityPost";
import { Trophy, Footprints, Flame, Star, Medal, Crown } from "lucide-react";

const achievements = [
  { icon: Footprints, title: "Primeiro Passeio", description: "Complete seu primeiro passeio", unlocked: true },
  { icon: Flame, title: "5 em Sequência", description: "5 passeios seguidos", unlocked: true },
  { icon: Star, title: "Super Ativo", description: "10 passeios no mês", unlocked: true },
  { icon: Medal, title: "Maratonista", description: "50km percorridos", unlocked: false },
  { icon: Crown, title: "Top Dog", description: "100 passeios totais", unlocked: false },
];

const activityPosts = [
  {
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    caption: "Aproveitando o parque Ibirapuera! ☀️",
    petName: "Thor",
    timestamp: "Hoje, 14:30",
    likes: 12,
  },
  {
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=crop",
    caption: "Correndo feliz pela praça 🏃‍♂️",
    petName: "Thor",
    timestamp: "Ontem, 10:15",
    likes: 8,
  },
  {
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&h=400&fit=crop",
    caption: "Fazendo novos amigos 🐶",
    petName: "Thor",
    timestamp: "3 dias atrás",
    likes: 24,
  },
];

export function ActivityFeedScreen() {
  const [activeTab, setActiveTab] = useState<"feed" | "achievements">("feed");

  return (
    <MobileFrame>
      <MobileHeader title="Mural de Atividades" />

      <MobileContent className="pb-24">
        {/* Pet Header */}
        <div className="bg-gradient-to-br from-primary/10 to-accent rounded-2xl p-4 mb-6 flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-card">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop"
                alt="Thor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
              <Trophy size={12} className="text-primary-foreground" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">Thor</h2>
            <p className="text-sm text-muted-foreground">15 passeios • 12.5 km</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex -space-x-1">
                {achievements.filter(a => a.unlocked).slice(0, 3).map((a, i) => (
                  <div key={i} className="w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                    <a.icon size={10} className="text-primary-foreground" />
                  </div>
                ))}
              </div>
              <span className="text-xs text-primary font-medium ml-1">3 conquistas</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-muted rounded-2xl p-1 mb-6">
          <button
            onClick={() => setActiveTab("feed")}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === "feed"
                ? "bg-card text-foreground shadow-card"
                : "text-muted-foreground"
            }`}
          >
            📷 Fotos
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === "achievements"
                ? "bg-card text-foreground shadow-card"
                : "text-muted-foreground"
            }`}
          >
            🏆 Conquistas
          </button>
        </div>

        {activeTab === "feed" ? (
          <div className="space-y-4">
            {activityPosts.map((post, index) => (
              <ActivityPost key={index} {...post} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <AchievementBadge key={index} {...achievement} />
            ))}
          </div>
        )}
      </MobileContent>
    </MobileFrame>
  );
}
