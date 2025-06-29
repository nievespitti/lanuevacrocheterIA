"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StitchLessons } from "@/components/crochet/StitchLessons";
import { VideoTutorials } from "@/components/crochet/VideoTutorials";
import { CrochetHookIcon } from "@/components/icons/CrochetHookIcon";
import { Clapperboard } from "lucide-react";

export default function AcademiaPage() {
  return (
    <div className="animate-in fade-in-0 duration-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline">Academia</h1>
        <p className="text-muted-foreground mt-2">
          Tu ruta de aprendizaje desde principiante hasta experto.
        </p>
      </div>
      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-primary/20 p-1 h-auto rounded-lg max-w-md mx-auto">
          <TabsTrigger
            value="lessons"
            className="flex flex-row gap-2 items-center py-2 text-md data-[state=active]:bg-card data-[state=active]:text-accent-foreground data-[state=active]:shadow-md"
          >
            <CrochetHookIcon className="h-5 w-5" /> Lecciones de Puntos
          </TabsTrigger>
          <TabsTrigger
            value="tutorials"
            className="flex flex-row gap-2 items-center py-2 text-md data-[state=active]:bg-card data-[state=active]:text-accent-foreground data-[state=active]:shadow-md"
          >
            <Clapperboard className="h-5 w-5" /> Video Tutoriales
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="mt-6">
          <StitchLessons />
        </TabsContent>
        <TabsContent value="tutorials" className="mt-6">
          <VideoTutorials />
        </TabsContent>
      </Tabs>
    </div>
  );
}
