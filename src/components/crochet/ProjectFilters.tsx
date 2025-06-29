"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ProjectGuide } from "@/lib/types";

type Difficulty = ProjectGuide["difficulty"] | "Todos";

interface ProjectFiltersProps {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const difficultyLevels: Difficulty[] = [
  "Todos",
  "Principiante",
  "Intermedio",
  "Experto",
];

export function ProjectFilters({
  selectedDifficulty,
  onDifficultyChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 bg-card border border-border/50 p-4 rounded-lg shadow-sm">
      <h3 className="font-headline text-lg text-foreground">
        Filtrar por Nivel:
      </h3>
      <RadioGroup
        value={selectedDifficulty}
        onValueChange={(value) => onDifficultyChange(value as Difficulty)}
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
      >
        {difficultyLevels.map((level) => (
          <div key={level} className="flex items-center space-x-2">
            <RadioGroupItem value={level} id={`level-${level}`} />
            <Label
              htmlFor={`level-${level}`}
              className="font-body text-base cursor-pointer"
            >
              {level}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
