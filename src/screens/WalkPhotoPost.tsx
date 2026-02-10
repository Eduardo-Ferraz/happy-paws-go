import { useState } from "react";
import { MobileFrame, MobileHeader, MobileContent } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalkPhotoPostProps {
    onBack?: () => void;
    walkStatus?: "not_started" | "started" | "completed";
}

export function WalkPhotoPost({ onBack, walkStatus = "started" }: WalkPhotoPostProps) {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const [caption, setCaption] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const { toast } = useToast();

    const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePost = () => {
        if (!selectedPhoto) {
            toast({
                title: "Erro",
                description: "Selecione uma foto antes de postar",
                variant: "destructive",
            });
            return;
        }

        setIsPosting(true);

        // Simulate posting and sending notification
        setTimeout(() => {
            setIsPosting(false);

            // CA12.3: Notification to tutor
            toast({
                title: "Foto Postada! 📸",
                description: "O tutor foi notificado sobre a nova foto no mural",
            });

            // Reset form
            setSelectedPhoto(null);
            setCaption("");
        }, 1500);
    };

    // CA12.1: Only allow posting if walk is started
    const canPost = walkStatus === "started";

    return (
        <MobileFrame>
            <MobileHeader
                title="Postar no Mural"
                leftAction={
                    <Button variant="ghost" size="iconSm" onClick={onBack}>
                        <ArrowLeft size={20} />
                    </Button>
                }
            />

            <MobileContent className="pb-24">
                {/* Walk Status Warning */}
                {!canPost && (
                    <div className="bg-warning/10 border border-warning rounded-2xl p-4 mb-6">
                        <p className="text-sm text-warning font-medium">
                            ⚠️ Você só pode postar fotos durante um passeio ativo
                        </p>
                    </div>
                )}

                {/* Photo Upload */}
                <div className="mb-6">
                    <Label className="mb-2 block">Foto do Passeio</Label>

                    {selectedPhoto ? (
                        <div className="relative">
                            <img
                                src={selectedPhoto}
                                alt="Preview"
                                className="w-full h-64 object-cover rounded-2xl"
                            />
                            <Button
                                variant="secondary"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => setSelectedPhoto(null)}
                            >
                                Remover
                            </Button>
                        </div>
                    ) : (
                        <label
                            htmlFor="photo-upload"
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${canPost
                                    ? "border-muted-foreground/25 hover:border-primary hover:bg-muted"
                                    : "border-muted-foreground/10 bg-muted/50 cursor-not-allowed"
                                }`}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Camera size={40} className="text-muted-foreground mb-4" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                    <span className="font-semibold">Toque para selecionar</span>
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG (MAX. 10MB)</p>
                            </div>
                            <input
                                id="photo-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handlePhotoSelect}
                                disabled={!canPost}
                            />
                        </label>
                    )}
                </div>

                {/* Caption Input - CA12.2: Optional caption up to 100 characters */}
                <div className="mb-6">
                    <Label htmlFor="caption" className="mb-2 block">
                        Legenda <span className="text-muted-foreground font-normal">(opcional)</span>
                    </Label>
                    <Textarea
                        id="caption"
                        placeholder="Escreva uma legenda para a foto..."
                        value={caption}
                        onChange={(e) => {
                            if (e.target.value.length <= 100) {
                                setCaption(e.target.value);
                            }
                        }}
                        maxLength={100}
                        className="min-h-[100px] rounded-2xl resize-none"
                        disabled={!canPost}
                    />
                    <p className="text-xs text-muted-foreground mt-2 text-right">
                        {caption.length}/100 caracteres
                    </p>
                </div>

                {/* Example Feed Preview */}
                {selectedPhoto && (
                    <div className="bg-card rounded-2xl p-4 shadow-card">
                        <p className="text-xs text-muted-foreground mb-3">Prévia no Mural:</p>
                        <div className="flex items-start gap-3 mb-3">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                                alt="Walker"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h4 className="font-semibold text-sm text-foreground">João Silva (Passeador)</h4>
                                <p className="text-xs text-muted-foreground">Agora</p>
                            </div>
                        </div>
                        <img
                            src={selectedPhoto}
                            alt="Post preview"
                            className="w-full rounded-xl mb-2"
                        />
                        {caption && (
                            <p className="text-sm text-foreground">{caption}</p>
                        )}
                    </div>
                )}
            </MobileContent>

            {/* Post Button */}
            <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
                <Button
                    onClick={handlePost}
                    className="w-full"
                    size="lg"
                    disabled={!canPost || !selectedPhoto || isPosting}
                >
                    {isPosting ? "Postando..." : (
                        <>
                            <Upload size={20} className="mr-2" />
                            Postar no Mural
                        </>
                    )}
                </Button>
            </div>
        </MobileFrame>
    );
}
