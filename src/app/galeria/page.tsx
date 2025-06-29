"use client";

import { useState, useMemo } from "react";
import type { ProjectGuide } from "@/lib/types";
import { projectGuides } from "@/lib/data";
import { ProjectGuides } from "@/components/crochet/ProjectGuides";
import { ProjectFilters } from "@/components/crochet/ProjectFilters";

export default function GaleriaPage() {
  const [difficulty, setDifficulty] = useState<
    ProjectGuide["difficulty"] | "Todos"
  >("Todos");

  const filteredProjects = useMemo(() => {
    if (difficulty === "Todos") {
      return projectGuides;
    }
    return projectGuides.filter((project) => project.difficulty === difficulty);
  }, [difficulty]);

  return (
    <div className="animate-in fade-in-0 duration-500 flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline">Galería de Diseños</h1>
        <p className="text-muted-foreground mt-2">
          Encuentra tu próxima inspiración. Filtra por categoría, nivel y más.
        </p>
      </div>

      <ProjectFilters
        selectedDifficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />

      <ProjectGuides projects={filteredProjects} />
    </div>
  );
}
