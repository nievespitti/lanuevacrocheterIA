'use server';
/**
 * @fileOverview A conversational AI agent for answering crochet questions.
 * This file has been updated to fix a build error by changing how the prompt is constructed.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof MessageSchema>;

const ChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI model's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

// Lazy-initialize the flow to prevent build-time errors.
let _chatFlow: ReturnType<typeof ai.defineFlow> | null = null;

function getChatFlow() {
  if (!_chatFlow) {
    _chatFlow = ai.defineFlow(
      {
        name: 'chatFlow',
        inputSchema: ChatInputSchema,
        outputSchema: ChatOutputSchema,
      },
      async ({history, message}) => {
        // Construct a single prompt string with system message, history, and user message.
        // This is to work around a build issue with the previous ai.generate() structure.
        const systemMessage =
          'Eres un asistente de IA experto en crochet, amigable y servicial, llamado La CrocheterIA. Tu propósito es ayudar a los usuarios con todas sus dudas sobre el arte del crochet. Todas tus respuestas deben ser en español. Mantén tus respuestas claras, concisas y fáciles de entender para personas de todos los niveles de habilidad.';

        const historyText = history
          .map(msg => `${msg.role}: ${msg.content}`)
          .join('\n');

        const fullPrompt = `${systemMessage}\n\n--- HISTORIAL ---\n${historyText}\n\n--- PREGUNTA ACTUAL ---\nuser: ${message}\nmodel:`;

        const response = await ai.generate({
          prompt: fullPrompt,
        });

        return {response: response.text};
      }
    );
  }

  return _chatFlow;
}

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const chatFlow = getChatFlow();
  return chatFlow(input);
}
