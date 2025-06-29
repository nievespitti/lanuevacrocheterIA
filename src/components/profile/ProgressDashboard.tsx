"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { stitchLessons } from "@/lib/data";
import { projectGuides } from "@/lib/data";
import type { StitchLesson, ProjectGuide } from "@/lib/types";
import { Trophy, BookCheck } from "lucide-react";
import Link from "next/link";

const PROGRESS_KEY = "la_crocheteria_progress";

export function ProgressDashboard() {
  const [completedLessons, setCompletedLessons] = useState<StitchLesson[]>([]);
  const [completedProjects, setCompletedProjects] = useState<ProjectGuide[]>(
    []
  );

  useEffect(() => {
    // This effect runs only on the client side after the component mounts
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);

        const completedLessonIds = Object.keys(progress).filter(
          (id) => progress[id] && id.startsWith("sl")
        );
        const completedProjectIds = Object.keys(progress).filter(
          (id) => progress[id] && id.startsWith("p")
        );

        setCompletedLessons(
          stitchLessons.filter((lesson) =>
            completedLessonIds.includes(lesson.id)
          )
        );
        setCompletedProjects(
          projectGuides.filter((project) =>
            completedProjectIds.includes(project.id)
          )
        );
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
  }, []);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <BookCheck className="h-6 w-6 text-primary" />
            Lecciones Completadas
          </CardTitle>
          <CardDescription>
            ¡Buen trabajo! Estas son las técnicas que ya dominas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedLessons.length > 0 ? (
            <ul className="space-y-3">
              {completedLessons.map((lesson) => (
                <li key={lesson.id} className="flex items-center gap-3">
                  <BookCheck className="h-5 w-5 text-primary" />
                  <span className="font-medium">{lesson.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              <p>Aún no has completado ninguna lección.</p>
              <Link
                href="/academia"
                className="text-primary font-semibold hover:underline mt-2 inline-block"
              >
                ¡Empieza a aprender ahora!
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Trophy className="h-6 w-6 text-primary" />
            Proyectos Finalizados
          </CardTitle>
          <CardDescription>
            Tus creaciones terminadas. ¡Un motivo para estar orgullosa!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedProjects.length > 0 ? (
            <ul className="space-y-3">
              {completedProjects.map((project) => (
                <li key={project.id} className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="font-medium">{project.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              <p>Aún no has finalizado ningún proyecto.</p>
              <Link
                href="/galeria"
                className="text-primary font-semibold hover:underline mt-2 inline-block"
              >
                ¡Encuentra tu próxima creación!
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
