"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { YarnIcon } from "@/components/icons/YarnIcon";
import { Button } from "@/components/ui/button";
import {
  BookHeart,
  Home,
  LayoutGrid,
  GraduationCap,
  WandSparkles,
  User,
  Users,
  PanelLeft,
  LogIn,
  LogOut,
  LoaderCircle,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/galeria", label: "Galería", icon: LayoutGrid },
  { href: "/academia", label: "Academia", icon: GraduationCap },
  { href: "/asistente-ia", label: "Asistente IA", icon: WandSparkles },
  { href: "/comunidad", label: "Comunidad", icon: Users },
  { href: "/perfil", label: "Mi Perfil", icon: User },
];

const publicNavLinks = navLinks.filter((l) => l.href !== "/perfil");
const profileLink = navLinks.find((l) => l.href === "/perfil")!;

function NavLink({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && "bg-muted text-primary"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "El servicio de autenticación no está disponible.",
      });
      return;
    }
    try {
      await signOut(auth);
      toast({
        title: "Has cerrado sesión",
        description: "¡Esperamos verte pronto!",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cerrar la sesión. Inténtalo de nuevo.",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-sm z-20">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <YarnIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-headline text-foreground tracking-wider">
              La CrocheterIA
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          {publicNavLinks.map((link) => (
            <Button key={link.href} asChild variant="ghost" size="sm">
              <Link href={link.href}>
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden lg:flex">
            <a
              href="https://notebooklm.google.com/viewer/notebook/6deea074-1085-4244-9369-25dc95addbef"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookHeart className="mr-2 h-5 w-5" />
              Mi Biblia del Crochet
            </a>
          </Button>

          {loading ? (
            <LoaderCircle className="h-5 w-5 animate-spin hidden md:block" />
          ) : user ? (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/perfil">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </Link>
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Salir
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar Sesión
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Registrarse</Link>
              </Button>
            </div>
          )}

          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SheetHeader className="sr-only">
                <SheetTitle>Menú Principal</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-2.5 text-foreground mb-4"
                >
                  <YarnIcon className="h-6 w-6 text-primary" />
                  <span className="font-headline text-xl">La CrocheterIA</span>
                </Link>
                {publicNavLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    {...link}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
                {user && (
                  <NavLink
                    key={profileLink.href}
                    {...profileLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                )}
              </nav>
              <div className="mt-auto flex flex-col gap-2">
                {loading ? (
                  <LoaderCircle className="h-6 w-6 animate-spin mx-auto" />
                ) : !user ? (
                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                      size="lg"
                    >
                      <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                      size="lg"
                      variant="outline"
                    >
                      <Link href="/signup">Registrarse</Link>
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleLogout} size="lg" variant="outline">
                    <LogOut className="mr-2 h-5 w-5" />
                    Cerrar Sesión
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <a
                    href="https://notebooklm.google.com/viewer/notebook/6deea074-1085-4244-9369-25dc95addbef"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookHeart className="mr-2 h-5 w-5" />
                    Mi Biblia del Crochet
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
