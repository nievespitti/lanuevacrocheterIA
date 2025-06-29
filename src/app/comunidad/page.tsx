import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, MessageSquare } from "lucide-react";
import Image from "next/image";

// Sample data for community projects
const communityProjects = [
  {
    id: 1,
    userName: "TejedoraCreativa",
    projectName: "Mi primer Amigurumi",
    imageUrl: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet amigurumi",
  },
  {
    id: 2,
    userName: "HilosDeAmor",
    projectName: "Manta de Retales",
    imageUrl: "https://placehold.co/600x400.png",
    "data-ai-hint": "patchwork blanket",
  },
  {
    id: 3,
    userName: "CrochetConAlma",
    projectName: "Top de Verano",
    imageUrl: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet top",
  },
];

export default function ComunidadPage() {
  return (
    <div className="animate-in fade-in-0 duration-500 flex flex-col gap-12">
      <div className="text-center">
        <h1 className="text-4xl font-headline">Comunidad La CrocheterIA</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Un espacio para conectar, compartir tus creaciones y crecer juntas.
          ¡Bienvenida a tu tribu tejedora!
        </p>
      </div>

      {/* Featured Community Projects */}
      <section>
        <h2 className="text-3xl font-headline text-center mb-8">
          Proyectos de la Comunidad
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.projectName}
                    fill
                    className="object-cover"
                    data-ai-hint={project["data-ai-hint"]}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="font-headline text-xl mb-1">
                  {project.projectName}
                </CardTitle>
                <CardDescription className="text-sm">
                  Por: {project.userName}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Community Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col items-center text-center">
          <Award className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-2xl font-headline mb-2">Retos Mensuales</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            Cada mes, un nuevo desafío para poner a prueba tu creatividad y
            aprender nuevas técnicas. ¡Participa y gana premios!
          </p>
          <Button variant="secondary" disabled>
            Próximamente
          </Button>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center">
          <MessageSquare className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-2xl font-headline mb-2">Foros de Discusión</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            ¿Tienes dudas? ¿Quieres compartir un truco? Únete a la conversación
            en nuestros foros temáticos.
          </p>
          <Button variant="secondary" disabled>
            Únete a la conversación
          </Button>
        </Card>
      </section>
    </div>
  );
}
