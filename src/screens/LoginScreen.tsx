import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dog, ArrowRight, Eye, EyeOff } from "lucide-react";
import { MobileFrame, MobileContent } from "@/components/MobileFrame";

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
  onForgotPassword?: () => void;
}

export function LoginScreen({ onLogin, onRegister, onForgotPassword }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <MobileFrame className="bg-background">
      <MobileContent className="h-full flex flex-col justify-center px-6 pb-12">
        
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-12 animate-fade-in">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 rotate-3">
            <Dog size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground text-center">
            Happy Paws
          </h1>
          <p className="text-muted-foreground text-center mt-2 max-w-[260px]">
            O melhor amigo do seu melhor amigo 🐾
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-muted/50 border-input/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Sua senha secreta"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-muted/50 border-input/50 pr-10"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={onForgotPassword}
                className="text-xs font-medium text-primary hover:underline px-1 py-0.5"
              >
                Esqueceu a senha?
              </button>
            </div>
          </div>

          <Button 
            className="w-full h-12 text-base mt-2" 
            size="lg" 
            onClick={handleLogin}
            disabled={loading || !email || !password}
          >
            {loading ? "Entrando..." : "Entrar"}
            {!loading && <ArrowRight size={18} className="ml-2" />}
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?
            <button 
              onClick={onRegister}
              className="text-primary font-semibold ml-1 hover:underline"
            >
              Cadastre-se
            </button>
          </p>
        </div>

      </MobileContent>
    </MobileFrame>
  );
}
