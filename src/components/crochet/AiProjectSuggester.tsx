"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { getProjectSuggestion, FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { WandSparkles } from "lucide-react";

const initialState: FormState = {
  message: "",
  suggestion: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      <WandSparkles className="mr-2 h-4 w-4" />
      {pending ? "Generando..." : "Obtener Sugerencia"}
    </Button>
  );
}

export function AiProjectSuggester() {
  const [state, formAction] = useActionState(
    getProjectSuggestion,
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
            ¿No sabes qué tejer?
          </CardTitle>
          <CardDescription>
            Dinos tus preferencias y nuestra IA te sugerirá un proyecto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="skillLevel">Nivel de habilidad</Label>
              <Select name="skillLevel" required>
                <SelectTrigger id="skillLevel">
                  <SelectValue placeholder="Selecciona tu nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Principiante</SelectItem>
                  <SelectItem value="intermediate">Intermedio</SelectItem>
                  <SelectItem value="expert">Experto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="yarnType">Tipo de hilo preferido</Label>
              <Select name="yarnType" required>
                <SelectTrigger id="yarnType">
                  <SelectValue placeholder="Selecciona un tipo de hilo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cotton">Algodón</SelectItem>
                  <SelectItem value="wool">Lana</SelectItem>
                  <SelectItem value="acrylic">Acrílico</SelectItem>
                  <SelectItem value="mixed">Mixto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state.success && state.suggestion && (
        <Card className="mt-8 animate-in fade-in-50 duration-500 shadow-lg border-accent/30">
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div>
                <CardTitle className="font-headline text-2xl">
                  {state.suggestion.projectName}
                </CardTitle>
                <CardDescription>
                  Dificultad: {state.suggestion.difficulty}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{state.suggestion.projectDescription}</p>
          </CardContent>
          {state.suggestion.patternLink && (
            <CardFooter>
              <Button asChild variant="link" className="p-0">
                <a
                  href={state.suggestion.patternLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver patrón
                </a>
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
}
