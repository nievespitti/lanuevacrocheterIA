"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import {
  generateVideoScriptAction,
  type VideoScriptFormState,
} from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Film } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const initialState: VideoScriptFormState = {
  message: "",
  script: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      <Film className="mr-2 h-4 w-4" />
      {pending ? "Generando Guion..." : "Generar Guion"}
    </Button>
  );
}

export function AiVideoScriptGenerator() {
  const [state, formAction] = useActionState(
    generateVideoScriptAction,
    initialState
  );
  const { toast } = useToast();

  useEffect(() => {
    if (!state.success && state.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">
            Generador de Guiones de Vídeo
          </CardTitle>
          <CardDescription>
            Introduce el tema de tu tutorial y la IA creará un guion para ti.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Tema del Vídeo</Label>
              <Input
                id="topic"
                name="topic"
                placeholder="Ej: 'Cómo hacer un anillo mágico'"
                required
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state.success && state.script && (
        <Card className="mt-8 animate-in fade-in-50 duration-500 shadow-lg border-accent/30">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Guion Generado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full rounded-md border p-4 bg-muted/50">
              <pre className="whitespace-pre-wrap font-body text-sm">
                {state.script.script}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
