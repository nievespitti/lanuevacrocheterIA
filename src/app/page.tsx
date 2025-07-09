import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  LayoutGrid,
  GraduationCap,
  WandSparkles,
} from "lucide-react";
import { projectGuides } from "@/lib/data";

export default function Home() {
  const featuredProjects = projectGuides.slice(0, 3);

  return (
    <div className="flex flex-col gap-12 md:gap-16 animate-in fade-in-0 duration-500">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-4">
          Tu universo del crochet, potenciado por IA
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
          Descubre patrones, perfecciona tus habilidades con nuestra academia y
          da vida a tus ideas con nuestro asistente creativo único.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/galeria">
              Explorar Diseños <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/academia">Empezar a Aprender</Link>
          </Button>
        </div>
      </section>

      {/* Featured Designs */}
      <section>
        <h2 className="text-3xl font-headline text-center mb-8">
          Diseños Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link key={project.id} href="/galeria">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                <CardHeader className="p-0">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="object-cover w-full h-48"
                    data-ai-hint={project["data-ai-hint"]}
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="font-headline text-xl mb-1">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Sections Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <Card className="p-6 flex flex-col items-center">
          <GraduationCap className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-2xl font-headline mb-2">Academia</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            Desde puntos básicos hasta técnicas maestras. Aprende a tu ritmo.
          </p>
          <Button asChild variant="secondary">
            <Link href="/academia">Ir a la Academia</Link>
          </Button>
        </Card>
        <Card className="p-6 flex flex-col items-center">
          <LayoutGrid className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-2xl font-headline mb-2">Galería de Diseños</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            Inspírate con cientos de patrones para todos los niveles y gustos.
          </p>
          <Button asChild variant="secondary">
            <Link href="/galeria">Ver Galería</Link>
          </Button>
        </Card>
        <Card className="p-6 flex flex-col items-center">
          <WandSparkles className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-2xl font-headline mb-2">Asistente IA</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            Traduce, adapta y crea patrones con nuestro innovador asistente.
          </p>
          <Button asChild variant="secondary">
            <Link href="/asistente-ia">Probar Asistente</Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
