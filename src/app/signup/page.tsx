"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
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
import { LoaderCircle } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Error de Configuración",
        description: "El servicio de autenticación no está disponible en este momento. Por favor, recarga la página.",
      });
      return;
    }
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "¡Cuenta creada!",
        description: "Bienvenida a La CrocheterIA. Te hemos redirigido a tu perfil.",
      });
      router.push("/perfil");
    } catch (error: any) {
      console.error("Error signing up:", error);
      let description = "Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo.";
      if (error.code === 'auth/weak-password') {
        description = "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.";
      } else if (error.code === 'auth/email-already-in-use') {
        description = "Este correo electrónico ya está en uso. Por favor, inicie sesión.";
      }
      toast({
        variant: "destructive",
        title: "Error al registrarse",
        description: description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 animate-in fade-in-0 duration-500">
      <Card className="mx-auto max-w-sm w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Crear Cuenta</CardTitle>
          <CardDescription>
            Introduce tus datos para registrarte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Creando cuenta..." : "Crear mi cuenta"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline">
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
