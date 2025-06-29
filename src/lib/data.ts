import type { StitchLesson, VideoTutorial, ProjectGuide } from "./types";

export const stitchLessons: StitchLesson[] = [
  // Principiante
  {
    id: "sl1",
    name: "Introducción al Crochet",
    description: "Descubre la historia, los beneficios y los conceptos básicos para empezar en el mundo del crochet.",
    icon: "IntroIcon", // Uses fallback icon
    difficulty: "Principiante",
    step: 1,
    pdfUrl: "/guides/principiante/guia_1_1_introduccion_crochet.pdf",
  },
  {
    id: "sl2",
    name: "Materiales y Herramientas",
    description: "Conoce los diferentes tipos de hilos, ganchillos y accesorios esenciales que necesitarás para tejer.",
    icon: "ToolsIcon", // Uses fallback icon
    difficulty: "Principiante",
    step: 2,
    pdfUrl: "/guides/principiante/guia_1_2_materiales_herramientas.pdf",
  },
  {
    id: "sl3",
    name: "Sostener Ganchillo e Hilo",
    description: "Aprende las técnicas correctas para sostener tus herramientas y mantener una tensión uniforme.",
    icon: "HoldIcon", // Uses fallback icon
    difficulty: "Principiante",
    step: 3,
    pdfUrl: "/guides/principiante/guia_1_3_sostener_ganchillo_hilo.pdf",
  },
  {
    id: "sl4",
    name: "Nudo Deslizado y Cadeneta",
    description: "El punto de partida de casi todos los proyectos. Aprende a hacer la base de tu tejido.",
    icon: "ChainIcon",
    difficulty: "Principiante",
    step: 4,
    pdfUrl: "/guides/principiante/guia_1_4_cadena_base.pdf",
  },
  {
    id: "sl5",
    name: "Punto Bajo",
    description: "Uno de los puntos más fundamentales y versátiles. Crea un tejido denso y firme.",
    icon: "SingleCrochetIcon",
    difficulty: "Principiante",
    step: 5,
    pdfUrl: "/guides/principiante/guia_1_5_punto_bajo.pdf",
  },
  {
    id: "sl6",
    name: "Punto Medio Alto",
    description: "Un punto de altura intermedia, perfecto para crear tejidos con más caída que el punto bajo.",
    icon: "HalfDoubleCrochetIcon",
    difficulty: "Principiante",
    step: 6,
    pdfUrl: "/guides/principiante/guia_1_6_punto_medio_alto.pdf",
  },
  {
    id: "sl7",
    name: "Punto Alto",
    description: "Un punto más alto que crea un tejido flexible y avanza rápidamente en los proyectos.",
    icon: "DoubleCrochetIcon",
    difficulty: "Principiante",
    step: 7,
    pdfUrl: "/guides/principiante/guia_1_7_punto_alto.pdf",
  },
  {
    id: "sl8",
    name: "Punto Deslizado",
    description: "También conocido como punto enano, se usa para unir vueltas o moverse por el tejido sin añadir altura.",
    icon: "SlipStitchIcon", // Uses fallback icon
    difficulty: "Principiante",
    step: 8,
    pdfUrl: "/guides/principiante/guia_1_8_punto_deslizado.pdf",
  },

  // Intermedio
  {
    id: "sl_int_1",
    name: "Aumentos y Disminuciones",
    description: "Aprende a dar forma a tu tejido creando curvas y ángulos para amigurumis y prendas.",
    icon: "IncreaseDecreaseIcon", // Fallback icon
    difficulty: "Intermedio",
    step: 1,
    pdfUrl: "/guides/intermedio/guia_2_1_aumentos_disminuciones.pdf",
  },
  {
    id: "sl_int_2",
    name: "Leer Patrones y Diagramas",
    description: "Descifra el lenguaje universal del crochet para poder seguir cualquier guía escrita o visual.",
    icon: "DiagramIcon", // Fallback icon
    difficulty: "Intermedio",
    step: 2,
    pdfUrl: "/guides/intermedio/guia_2_2_leer_patrones_diagramas.pdf",
  },
  
  // Experto
  {
    id: "sl_exp_1",
    name: "Anillo Mágico",
    description: "Una técnica esencial para empezar a tejer en redondo sin un agujero en el centro.",
    icon: "MagicRingIcon",
    difficulty: "Experto",
    step: 1,
    pdfUrl: "/guides/experto/guia_3_1_anillo_magico.pdf",
  },
];

export const videoTutorials: VideoTutorial[] = [
  // Principiante
  {
    id: "vt_princ_1",
    title: "Introducción al Crochet (Vídeo)",
    description: "Un resumen visual de la historia y los conceptos básicos del crochet.",
    difficulty: "Principiante",
    thumbnail: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet history",
    videoUrl: "#",
  },
  {
    id: "vt_princ_2",
    title: "Tus Primeros Materiales",
    description: "Te mostramos los hilos, ganchillos y accesorios que necesitas para empezar.",
    difficulty: "Principiante",
    thumbnail: "https://placehold.co/600x400.png",
    "data-ai-hint": "yarn hooks",
    videoUrl: "#",
  },
  {
    id: "vt_princ_3",
    title: "Agarre Correcto del Ganchillo",
    description: "Visualiza cómo sostener tus herramientas para una tensión perfecta.",
    difficulty: "Principiante",
    thumbnail: "https://placehold.co/600x400.png",
    "data-ai-hint": "hands crochet",
    videoUrl: "#",
  },
  {
    id: "vt_princ_4",
    title: "Nudo Deslizado y Cadeneta",
    description: "Aprende paso a paso a crear la base de todos tus proyectos.",
    difficulty: "Principiante",
    thumbnail: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet chain",
    videoUrl: "#",
  },

  // Intermedio
  {
    id: "vt_int_1",
    title: "Aumentos y Disminuciones",
    description: "Aprende a dar forma a tu tejido creando curvas y ángulos para amigurumis y prendas.",
    difficulty: "Intermedio",
    thumbnail: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet shape",
    videoUrl: "#",
  },
  {
    id: "vt_int_2",
    title: "Cómo Leer un Diagrama",
    description: "Descifra los símbolos y síguenos mientras tejemos un patrón desde un diagrama.",
    difficulty: "Intermedio",
    thumbnail: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet pattern",
    videoUrl: "#",
  },

  // Experto
  {
    id: "vt_exp_1",
    title: "El Anillo Mágico Perfecto",
    description: "Domina la técnica del anillo mágico para inicios de amigurumi impecables.",
    difficulty: "Experto",
    thumbnail: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet magic ring",
    videoUrl: "#",
  },
];


export const projectGuides: ProjectGuide[] = [
  {
    id: "p1",
    name: "Posavasos Sencillo",
    description:
      "Un proyecto rápido y útil para practicar tus puntos bajos en redondo.",
    difficulty: "Principiante",
    image: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet coaster",
    pdfUrl: "/guides/proyecto-posavasos-sencillo.pdf",
  },
  {
    id: "p2",
    name: "Bufanda Clásica",
    description:
      "Un proyecto perfecto para principiantes para practicar la tensión y los puntos básicos.",
    difficulty: "Principiante",
    image: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet scarf",
    pdfUrl: "/guides/proyecto-bufanda-clasica.pdf",
  },
  {
    id: "p3",
    name: "Gorro Básico",
    description:
      "Aprende a tejer en redondo y a hacer disminuciones para crear un gorro acogedor.",
    difficulty: "Intermedio",
    image: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet beanie",
    pdfUrl: "/guides/proyecto-gorro-basico.pdf",
  },
  {
    id: "p4",
    name: "Amigurumi de Pulpo",
    description:
      "Crea un adorable pulpo de juguete. Ideal para practicar el anillo mágico y los aumentos.",
    difficulty: "Intermedio",
    image: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet octopus",
    pdfUrl: "/guides/proyecto-amigurumi-de-pulpo.pdf",
  },
  {
    id: "p5",
    name: "Chal de la Abuela",
    description:
      "Un proyecto clásico y relajante que utiliza el famoso 'granny square' para crear una prenda hermosa.",
    difficulty: "Experto",
    image: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet shawl",
    pdfUrl: "/guides/proyecto-chal-de-la-abuela.pdf",
  },
   {
    id: "p6",
    name: "Manta de Bebé",
    description:
      "Un regalo precioso y práctico. Combina diferentes puntos para crear texturas únicas.",
    difficulty: "Experto",
    image: "https://placehold.co/600x400.png",
    "data-ai-hint": "crochet baby blanket",
    pdfUrl: "/guides/proyecto-manta-de-bebe.pdf",
  },
];
