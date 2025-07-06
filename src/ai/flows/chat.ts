'use server';
/**
 * @fileOverview A conversational AI agent for answering crochet questions.
 *
 * - chat - A function that handles the conversational chat.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
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
        const convertToGeminiMessage = (msg: ChatMessage) => ({
          role: msg.role,
          content: [{text: msg.content}],
        });

        const geminiHistory = history.map(convertToGeminiMessage);

        const response = await ai.generate({
          model: 'googleai/gemini-2.0-flash',
          system:
            'Eres un asistente de IA experto en crochet, amigable y servicial, llamado La CrocheterIA. Tu propósito es ayudar a los usuarios con todas sus dudas sobre el arte del crochet. Todas tus respuestas deben ser en español. Mantén tus respuestas claras, concisas y fáciles de entender para personas de todos los niveles de habilidad.',
          history: geminiHistory,
          prompt: message,
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
