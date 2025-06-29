"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/hooks/useProgress";
import { StitchIcon } from "@/components/icons/StitchIcon";
import { cn } from "@/lib/utils";
import { stitchLessons } from "@/lib/data";
import type { StitchLesson } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

function StitchLessonCard({
  lesson,
  totalSteps,
}: {
  lesson: StitchLesson;
  totalSteps: number;
}) {
  const { isCompleted, toggleComplete } = useProgress(lesson.id);

  const handleDownload = () => {
    if (lesson.pdfUrl) {
      window.open(lesson.pdfUrl, "_blank");
    }
  };

  return (
    <Card
      className={cn(
        "transition-all duration-300 w-full shadow-md hover:shadow-xl hover:-translate-y-1 h-full flex flex-col",
        isCompleted ? "bg-primary/30 border-primary" : "bg-card"
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <Badge
              variant={isCompleted ? "default" : "secondary"}
              className="mb-3"
            >
              Lección {lesson.step} de {totalSteps}
            </Badge>
            <CardTitle className="font-headline text-2xl mb-2">
              {lesson.name}
            </CardTitle>
            <CardDescription>{lesson.description}</CardDescription>
          </div>
          <StitchIcon
            name={lesson.icon}
            className="h-16 w-16 text-primary/70 shrink-0"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* This area is intentionally left blank to maintain a consistent card height and layout. */}
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`complete-${lesson.id}`}
            checked={isCompleted}
            onCheckedChange={toggleComplete}
            aria-label={`Mark ${lesson.name} as complete`}
          />
          <label
            htmlFor={`complete-${lesson.id}`}
            className="text-sm font-medium leading-none"
          >
            Completado
          </label>
        </div>
        {lesson.pdfUrl && (
          <Button variant="secondary" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Guía
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

const difficultyOrder: StitchLesson["difficulty"][] = [
  "Principiante",
  "Intermedio",
  "Experto",
];

// Pre-sort and group lessons for better performance and to avoid complex logic inside the component render.
const lessonsByDifficulty = difficultyOrder.reduce<
  Record<string, StitchLesson[]>
>((acc, difficulty) => {
  const lessons = stitchLessons
    .filter((lesson) => lesson.difficulty === difficulty)
    .sort((a, b) => a.step - b.step);

  if (lessons.length > 0) {
    acc[difficulty] = lessons;
  }

  return acc;
}, {});

export function StitchLessons() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["Principiante"]}
      className="w-full space-y-4"
    >
      {difficultyOrder.map(
        (difficulty) =>
          lessonsByDifficulty[difficulty] && (
            <AccordionItem
              key={difficulty}
              value={difficulty}
              className="border rounded-lg bg-card shadow-sm overflow-hidden"
            >
              <AccordionTrigger className="p-6 font-headline text-2xl hover:no-underline">
                Nivel: {difficulty}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lessonsByDifficulty[difficulty].map((lesson) => (
                    <StitchLessonCard
                      key={lesson.id}
                      lesson={lesson}
                      totalSteps={lessonsByDifficulty[difficulty].length}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
      )}
    </Accordion>
  );
}
