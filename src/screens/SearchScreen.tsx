import { useState } from "react";
import { MobileFrame, MobileHeader, MobileContent } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalkerCard } from "@/components/WalkerCard";
import { FilterChips } from "@/components/FilterChips";
import { Search, SlidersHorizontal, MapPin, DollarSign, Dog } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const mockWalkers = [
  {
    id: "1",
    name: "Marina Silva",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    rating: 4.9,
    reviews: 127,
    pricePerHour: 45,
    neighborhood: "Pinheiros",
    acceptedSizes: ["P", "M", "G"],
    isVerified: true,
    maxDogs: 3,
  },
  {
    id: "2",
    name: "Carlos Eduardo",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    rating: 4.8,
    reviews: 89,
    pricePerHour: 35,
    neighborhood: "Vila Madalena",
    acceptedSizes: ["P", "M"],
    isVerified: true,
    maxDogs: 4,
  },
  {
    id: "3",
    name: "Ana Beatriz",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    rating: 4.7,
    reviews: 56,
    pricePerHour: 40,
    neighborhood: "Jardins",
    acceptedSizes: ["M", "G"],
    isVerified: false,
    maxDogs: 2,
  },
  {
    id: "4",
    name: "Pedro Henrique",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    rating: 5.0,
    reviews: 34,
    pricePerHour: 50,
    neighborhood: "Moema",
    acceptedSizes: ["P", "M", "G"],
    isVerified: true,
    maxDogs: 3,
  },
];

const sizeOptions = [
  { id: "P", label: "Pequeno" },
  { id: "M", label: "Médio" },
  { id: "G", label: "Grande" },
];

interface SearchScreenProps {
  onSelectWalker?: (walkerId: string) => void;
}

export function SearchScreen({ onSelectWalker }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([20, 60]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const filteredWalkers = mockWalkers.filter((walker) => {
    const matchesSearch =
      walker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      walker.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      walker.pricePerHour >= priceRange[0] &&
      walker.pricePerHour <= priceRange[1];
    const matchesSize =
      selectedSizes.length === 0 ||
      selectedSizes.some((size) => walker.acceptedSizes.includes(size));

    return matchesSearch && matchesPrice && matchesSize;
  });

  const toggleSize = (id: string) => {
    setSelectedSizes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <MobileFrame>
      <MobileHeader title="Encontrar Passeador" />

      <MobileContent className="pb-24">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar por nome ou bairro..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-2xl"
          />
          <Button
            variant={showFilters ? "default" : "ghost"}
            size="iconSm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-card rounded-2xl p-4 mb-4 shadow-card animate-scale-in">
            {/* Price Range */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign size={16} className="text-primary" />
                <span className="text-sm font-medium">Faixa de Preço</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  R${priceRange[0]} - R${priceRange[1]}
                </span>
              </div>
              <Slider
                min={10}
                max={100}
                step={5}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>

            {/* Size Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Dog size={16} className="text-primary" />
                <span className="text-sm font-medium">Porte do Cão</span>
              </div>
              <FilterChips
                chips={sizeOptions}
                selected={selectedSizes}
                onToggle={toggleSize}
              />
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            {filteredWalkers.length} passeadores encontrados
          </span>
        </div>

        {/* Walker List */}
        <div className="space-y-3">
          {filteredWalkers.length > 0 ? (
            filteredWalkers.map((walker) => (
              <WalkerCard
                key={walker.id}
                {...walker}
                onClick={() => onSelectWalker?.(walker.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                Nenhum passeador encontrado
              </h3>
              <p className="text-sm text-muted-foreground">
                Tente ajustar os filtros ou buscar em outro bairro
              </p>
            </div>
          )}
        </div>
      </MobileContent>
    </MobileFrame>
  );
}
