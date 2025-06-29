"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import type { ProjectGuide } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

function ProjectGuideCard({ project }: { project: ProjectGuide }) {
  const { isCompleted, toggleComplete } = useProgress(project.id);

  const handleDownload = () => {
    if (project.pdfUrl) {
      window.open(project.pdfUrl, "_blank");
    }
  };

  return (
    <Card
      className={cn(
        "transition-all duration-300 w-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1",
        isCompleted ? "bg-primary/30 border-primary" : "bg-card"
      )}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            data-ai-hint={project["data-ai-hint"]}
          />
        </div>
        <div className="p-6 pb-2">
          <Badge
            variant={isCompleted ? "default" : "secondary"}
            className="mb-2"
          >
            {project.difficulty}
          </Badge>
          <CardTitle className="font-headline text-2xl">
            {project.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <CardDescription>{project.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`complete-${project.id}`}
            checked={isCompleted}
            onCheckedChange={toggleComplete}
            aria-label={`Mark ${project.name} as complete`}
          />
          <label
            htmlFor={`complete-${project.id}`}
            className="text-sm font-medium leading-none"
          >
            Completado
          </label>
        </div>
        {project.pdfUrl && (
          <Button variant="secondary" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Guía
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export function ProjectGuides({ projects }: { projects: ProjectGuide[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground col-span-1 md:col-span-2 lg:col-span-3">
        <p className="text-xl mb-2">
          ¡Vaya! No hay proyectos que coincidan con tu búsqueda.
        </p>
        <p>Prueba a cambiar los filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectGuideCard key={project.id} project={project} />
      ))}
    </div>
  );
}
