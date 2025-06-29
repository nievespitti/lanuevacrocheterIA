/**
 * @fileOverview Agente de IA para sugerir proyectos de crochet.
 *
 * - suggestProject - Una función que maneja el proceso de sugerencia de proyectos.
 * - SuggestProjectInput - El tipo de entrada para la función suggestProject.
 * - SuggestProjectOutput - El tipo de retorno para la función suggestProject.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectInputSchema = z.object({
  skillLevel: z
    .string()
    .describe("El nivel de habilidad del usuario en crochet (por ejemplo, principiante, intermedio, experto)."),
  yarnType: z
    .string()
    .describe('El tipo de hilo que prefiere el usuario (por ejemplo, algodón, lana, acrílico).'),
});
export type SuggestProjectInput = z.infer<typeof SuggestProjectInputSchema>;

const SuggestProjectOutputSchema = z.object({
  projectName: z.string().describe('El nombre del proyecto de crochet sugerido.'),
  projectDescription: z.string().describe('Una breve descripción del proyecto sugerido.'),
  patternLink: z.string().optional().describe('Un enlace al patrón de crochet para el proyecto, si está disponible.'),
  difficulty: z.string().describe('El nivel de dificultad del proyecto sugerido.'),
});
export type SuggestProjectOutput = z.infer<typeof SuggestProjectOutputSchema>;

export async function suggestProject(input: SuggestProjectInput): Promise<SuggestProjectOutput> {
  return suggestProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectPrompt',
  input: {schema: SuggestProjectInputSchema},
  output: {schema: SuggestProjectOutputSchema},
  prompt: `Eres un asistente de IA servicial que sugiere proyectos de crochet basándose en el nivel de habilidad del usuario y el tipo de hilo que prefiere. Todas tus respuestas deben ser en español.

Nivel de habilidad: {{{skillLevel}}}
Tipo de hilo preferido: {{{yarnType}}}

Sugiere un proyecto de crochet que sea adecuado para el usuario, proporcionando el nombre del proyecto, una breve descripción, un enlace opcional al patrón y el nivel de dificultad.
Asegúrate de que la dificultad del proyecto se corresponda con el nivel de habilidad del usuario.
`,
});

const suggestProjectFlow = ai.defineFlow(
  {
    name: 'suggestProjectFlow',
    inputSchema: SuggestProjectInputSchema,
    outputSchema: SuggestProjectOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
