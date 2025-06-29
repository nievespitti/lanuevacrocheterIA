"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ProgressDashboard } from "@/components/profile/ProgressDashboard";
import { LoaderCircle } from "lucide-react";

export default function PerfilPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Cargando tu perfil...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirection is handled by useEffect
  }

  return (
    <div className="animate-in fade-in-0 duration-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline">Mi Perfil</h1>
        <p className="text-muted-foreground mt-2">
          Tu progreso, tus logros y tus proyectos favoritos en un solo lugar.
        </p>
      </div>
      <ProgressDashboard />
    </div>
  );
}
