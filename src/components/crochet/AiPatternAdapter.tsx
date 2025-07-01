"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useState, useRef } from "react";
import {
  getPatternAdaptation,
  type PatternFormState,
  generateSpeechFromText,
} from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  TextSelect,
  Volume2,
  LoaderCircle,
  UploadCloud,
  X,
} from "lucide-react";
import Image from "next/image";

const initialState: PatternFormState = {
  message: "",
  adaptation: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      <TextSelect className="mr-2 h-4 w-4" />
      {pending ? "Adaptando..." : "Adaptar Patrón"}
    </Button>
  );
}

export function AiPatternAdapter() {
  const [state, formAction] = useActionState(
    getPatternAdaptation,
    initialState
  );
  const { toast } = useToast();
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [patternPhotoUri, setPatternPhotoUri] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state.success && state.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
    // Reset results on new submission
    if (state.message) {
      setAudioDataUri(null);
    }
  }, [state, toast]);

  const handleListen = async () => {
    if (!state.adaptation?.adaptedPattern) return;
    setIsGeneratingAudio(true);
    setAudioDataUri(null);
    const result = await generateSpeechFromText(
      state.adaptation.adaptedPattern
    );
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error de Audio",
        description: result.error,
      });
    } else if (result.audioDataUri) {
      setAudioDataUri(result.audioDataUri);
    }
    setIsGeneratingAudio(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPatternPhotoUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    setPatternPhotoUri(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">
            Adaptador de Patrones
          </CardTitle>
          <CardDescription>
            Pega un patrón, o sube una foto de buena calidad, y dile a la IA
            cómo adaptarlo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pattern">Patrón Original (en texto)</Label>
              <Textarea
                id="pattern"
                name="pattern"
                placeholder="Pega aquí el patrón de crochet..."
                className="min-h-[150px]"
              />
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-muted-foreground text-sm">
                O
              </span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pattern-photo">Patrón Original (en imagen)</Label>
              {patternPhotoUri ? (
                <div className="relative group">
                  <Image
                    src={patternPhotoUri}
                    alt="Previsualización del patrón"
                    width={500}
                    height={200}
                    className="rounded-md w-full h-auto object-contain border bg-muted/50"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity"
                    onClick={clearPhoto}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Quitar imagen</span>
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="pattern-photo-input"
                  className="flex flex-col items-center justify-center w-full min-h-32 p-4 text-center border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Haz clic para subir</span>{" "}
                      o arrastra una imagen
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, etc. (Máx 4MB)
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 px-2 italic">
                      Consejo: Para mejores resultados, usa una foto plana,
                      nítida y bien iluminada.
                    </p>
                  </div>
                  <Input
                    id="pattern-photo-input"
                    name="pattern-photo-input-field"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </label>
              )}
              <input
                type="hidden"
                name="patternPhotoDataUri"
                value={patternPhotoUri || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instruction">Instrucción</Label>
              <Input
                id="instruction"
                name="instruction"
                placeholder="Ej: 'Traduce a español y usa puntos altos'"
                required
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state.success && state.adaptation && (
        <Card className="mt-8 animate-in fade-in-50 duration-500 shadow-lg border-accent/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="font-headline text-2xl">
                Patrón Adaptado
              </CardTitle>
              <Button
                onClick={handleListen}
                disabled={isGeneratingAudio}
                variant="outline"
                size="icon"
              >
                {isGeneratingAudio ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
                <span className="sr-only">Escuchar patrón</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {audioDataUri && (
              <div className="mb-4">
                <audio src={audioDataUri} controls className="w-full" />
              </div>
            )}
            <pre className="whitespace-pre-wrap font-body text-sm">
              {state.adaptation.adaptedPattern}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
