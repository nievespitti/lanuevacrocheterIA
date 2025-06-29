export type StitchLesson = {
    id: string;
    name: string;
    description: string;
    icon: string;
    difficulty: "Principiante" | "Intermedio" | "Experto";
    step: number;
    pdfUrl?: string;
  };
  
  export type VideoTutorial = {
    id: string;
    title: string;
    description: string;
    difficulty: "Principiante" | "Intermedio" | "Experto";
    thumbnail: string;
    "data-ai-hint": string;
    videoUrl?: string;
  };
  
  export type ProjectGuide = {
    id: string;
    name: string;
    description: string;
    difficulty: "Principiante" | "Intermedio" | "Experto";
    image: string;
    "data-ai-hint": string;
    pdfUrl?: string;
  };
  