import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PhotoUploadModalProps {
  onSave: (caption: string) => void;
  onCancel: () => void;
}

export function PhotoUploadModal({ onSave, onCancel }: PhotoUploadModalProps) {
  const [caption, setCaption] = useState("");

  return (
    <div className="absolute inset-0 z-[100] bg-background/95 flex items-center justify-center p-6">
      <div className="w-full space-y-4">
        <h3 className="text-lg font-bold">Nova foto do pet 📸</h3>
        <div className="aspect-square w-full bg-muted rounded-2xl flex items-center justify-center border-2 border-dashed">
          <p className="text-muted-foreground text-center px-4">Pré-visualização da Foto (Simulada)</p>
        </div>
        <div className="space-y-1">
          <Textarea 
            placeholder="Escreva uma legenda opcional..."
            maxLength={100} // Regra de negócio: máx 100 caracteres
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="resize-none"
          />
          <p className="text-right text-xs text-muted-foreground">
            {caption.length}/100
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>Cancelar</Button>
          <Button className="flex-1" onClick={() => onSave(caption)}>Postar no Mural</Button>
        </div>
      </div>
    </div>
  );
}