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
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import { videoTutorials } from "@/lib/data";
import type { VideoTutorial } from "@/lib/types";
import { PlayCircle } from "lucide-react";
import Image from "next/image";

function VideoTutorialCard({ tutorial }: { tutorial: VideoTutorial }) {
  const { isCompleted, toggleComplete } = useProgress(tutorial.id);

  return (
    <Card
      className={cn(
        "transition-all duration-300 w-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1",
        isCompleted ? "bg-primary/30 border-primary" : "bg-card"
      )}
    >
      <CardHeader className="p-0">
        <a
          href={tutorial.videoUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group block cursor-pointer"
        >
          <Image
            src={tutorial.thumbnail}
            alt={tutorial.title}
            width={600}
            height={400}
            className="object-cover w-full h-48"
            data-ai-hint={tutorial["data-ai-hint"]}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="h-16 w-16 text-white" />
          </div>
        </a>
        <div className="p-6 pb-2">
          <CardTitle className="font-headline text-2xl">
            {tutorial.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <CardDescription>{tutorial.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`complete-${tutorial.id}`}
            checked={isCompleted}
            onCheckedChange={toggleComplete}
            aria-label={`Mark ${tutorial.title} as complete`}
          />
          <label
            htmlFor={`complete-${tutorial.id}`}
            className="text-sm font-medium leading-none"
          >
            Marcar como completado
          </label>
        </div>
      </CardFooter>
    </Card>
  );
}

const difficultyOrder: VideoTutorial["difficulty"][] = [
  "Principiante",
  "Intermedio",
  "Experto",
];

const tutorialsByDifficulty = difficultyOrder.reduce<
  Record<string, VideoTutorial[]>
>((acc, difficulty) => {
  const tutorials = videoTutorials.filter(
    (tutorial) => tutorial.difficulty === difficulty
  );

  if (tutorials.length > 0) {
    acc[difficulty] = tutorials;
  }

  return acc;
}, {});

export function VideoTutorials() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["Principiante"]}
      className="w-full space-y-4"
    >
      {difficultyOrder.map(
        (difficulty) =>
          tutorialsByDifficulty[difficulty] && (
            <AccordionItem
              key={difficulty}
              value={difficulty}
              className="border rounded-lg bg-card shadow-sm overflow-hidden"
            >
              <AccordionTrigger className="p-6 font-headline text-2xl hover:no-underline">
                Nivel: {difficulty}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutorialsByDifficulty[difficulty].map((tutorial) => (
                    <VideoTutorialCard key={tutorial.id} tutorial={tutorial} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
      )}
    </Accordion>
  );
}
