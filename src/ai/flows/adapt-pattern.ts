'use server';
/**
 * @fileOverview An AI agent for adapting and translating crochet patterns from text or images.
 *
 * - adaptPattern - A function that handles the pattern adaptation process.
 * - AdaptPatternInput - The input type for the adaptPattern function.
 * - AdaptPatternOutput - The return type for the adaptPattern function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptPatternInputSchema = z.object({
  pattern: z
    .string()
    .optional()
    .describe('The original crochet pattern text. Use this as the primary source if provided.'),
  patternPhotoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of a crochet pattern, as a data URI. Use this to transcribe the pattern if the text version isn't provided. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  instruction: z
    .string()
    .describe('The user instruction for how to adapt the pattern (e.g., translate, simplify, change stitches).'),
});
export type AdaptPatternInput = z.infer<typeof AdaptPatternInputSchema>;

const AdaptPatternOutputSchema = z.object({
  adaptedPattern: z.string().describe('The resulting adapted crochet pattern.'),
});
export type AdaptPatternOutput = z.infer<typeof AdaptPatternOutputSchema>;

export async function adaptPattern(input: AdaptPatternInput): Promise<AdaptPatternOutput> {
  return adaptPatternFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptPatternPrompt',
  input: {schema: AdaptPatternInputSchema},
  output: {schema: AdaptPatternOutputSchema},
  prompt: `You are an expert crochet assistant. Your task is to adapt a crochet pattern based on a user's instruction.
If the pattern is provided as an image, first transcribe the text from the image accurately. Then, perform the adaptation on the transcribed text.
If the pattern is provided as text, use that directly. All your responses must be in Spanish.

Use the following nomenclature and symbol reference for your adaptations, especially for translations between English and Spanish terms.

**Nomenclatura Español - Inglés:**
*   **c (Cadeneta)** = **ch (Chain stitch)**
*   **pe (Punto enano)** = **sl st (Slip stitch)**
*   **pb (Punto bajo)** = **sc (Single crochet)**
*   **pma (Punto medio alto)** = **hdc (Half double crochet)**
*   **pa (Punto alto)** = **dc (Double crochet)**
*   **pad (Punto alto doble)** = **trc (Treble crochet)**
*   **pat (Punto alto triple)** = **dtr (Double treble crochet)**
*   **Anillo Mágico** = **Magic Ring / Magic Circle**
*   **Aumento (aum)** = **Increase (inc)**
*   **Disminución (dism)** = **Decrease (dec)**
*   **Punto relieve por delante** = **Front post (FP)**
*   **Punto relieve por detrás** = **Back post (BP)**

You must only output the adapted pattern, nothing else. Preserve formatting like line breaks.

User instruction: {{{instruction}}}

Original Pattern:
---
{{#if pattern}}
{{{pattern}}}
{{else}}
{{#if patternPhotoDataUri}}
{{media url=patternPhotoDataUri}}
{{/if}}
{{/if}}
---
`,
});

const adaptPatternFlow = ai.defineFlow(
  {
    name: 'adaptPatternFlow',
    inputSchema: AdaptPatternInputSchema,
    outputSchema: AdaptPatternOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
