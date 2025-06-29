'use server';
/**
 * @fileOverview Un agente de IA para generar guiones para vídeo-tutoriales de crochet.
 *
 * - generateVideoScript - Una función que genera un guion de vídeo basado en un tema.
 * - GenerateVideoScriptInput - El tipo de entrada para la función generateVideoScript.
 * - GenerateVideoScriptOutput - El tipo de retorno para la función generateVideoScript.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoScriptInputSchema = z.object({
  topic: z
    .string()
    .describe("El tema del vídeo-tutorial de crochet (p. ej., 'Cómo hacer un nudo deslizado')."),
});
export type GenerateVideoScriptInput = z.infer<typeof GenerateVideoScriptInputSchema>;

const GenerateVideoScriptOutputSchema = z.object({
  script: z.string().describe('El guion de vídeo generado, formateado y listo para usar.'),
});
export type GenerateVideoScriptOutput = z.infer<typeof GenerateVideoScriptOutputSchema>;

export async function generateVideoScript(input: GenerateVideoScriptInput): Promise<GenerateVideoScriptOutput> {
  return generateVideoScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoScriptPrompt',
  input: {schema: GenerateVideoScriptInputSchema},
  output: {schema: GenerateVideoScriptOutputSchema},
  prompt: `Eres un productor de vídeo experto y un maestro de crochet. Tu tarea es crear un guion detallado y fácil de seguir para un vídeo-tutorial corto (de 1 a 2 minutos) en español sobre el tema proporcionado.

El guion debe estar estructurado en secciones claras. Utiliza el siguiente formato EXACTO, incluyendo los encabezados en mayúsculas:

TÍTULO DEL VÍDEO: [Un título atractivo y claro para YouTube]

INTRODUCCIÓN (0-15 segundos)
- VOZ EN OFF: [Texto amigable y acogedor. Preséntate (La CrocheterIA), menciona el tema del tutorial y lo que se aprenderá.]
- EN PANTALLA: [Describe la escena visual. Por ej., 'Primer plano de manos con ganchillo e hilo de colores vivos. Título del vídeo animado aparece en pantalla.']

MATERIALES (15-25 segundos)
- VOZ EN OFF: [Enumera los materiales necesarios de forma clara y concisa. Por ej., 'Para esto necesitarás tu ganchillo y un poco de hilo de algodón.']
- EN PANTALLA: [Describe la escena. Por ej., 'Plano cenital mostrando el ganchillo y el ovillo de hilo sobre una superficie de madera clara.']

PASO A PASO
- PASO 1: [Descripción corta de la acción]
  - VOZ EN OFF: [Instrucción clara y directa para este paso.]
  - EN PANTALLA: [Plano detalle extremo (extreme close-up) de las manos ejecutando la acción a cámara lenta. Usar texto superpuesto si es necesario para aclarar.]
- PASO 2: [Descripción corta de la acción]
  - VOZ EN OFF: [Instrucción clara y directa para este paso.]
  - EN PANTALLA: [Plano detalle de las manos. Mostrar el resultado del paso anterior antes de empezar el nuevo.]
- (Añade tantos pasos como sean necesarios para explicar el tema. Sé muy detallado y divide el proceso en acciones pequeñas y manejables).

RESUMEN Y CONSEJO (Últimos 20 segundos)
- VOZ EN OFF: [Repasa rápidamente lo aprendido y ofrece un consejo útil o un truco relacionado con la técnica.]
- EN PANTALLA: [Mostrar el resultado final del punto o técnica. Quizás un ejemplo de cómo se usa en un proyecto.]

CIERRE (Últimos 10 segundos)
- VOZ EN OFF: [Anima al espectador a practicar. Invítale a suscribirse, dar like y visitar LaCrocheterIA.com para más tutoriales.]
- EN PANTALLA: [Logo de La CrocheterIA. Enlaces a redes sociales y a la web.]

---
TEMA DEL TUTORIAL: {{{topic}}}
---
`,
});

const generateVideoScriptFlow = ai.defineFlow(
  {
    name: 'generateVideoScriptFlow',
    inputSchema: GenerateVideoScriptInputSchema,
    outputSchema: GenerateVideoScriptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
