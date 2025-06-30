'use server';

import { suggestProject, type SuggestProjectOutput } from '@/ai/flows/suggest-project';
import { adaptPattern, type AdaptPatternInput, type AdaptPatternOutput } from '@/ai/flows/adapt-pattern';
import { chat, type ChatInput, type ChatMessage } from '@/ai/flows/chat';
import { speechToText, type SpeechToTextInput } from '@/ai/flows/speech-to-text';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { generateVideoScript, type GenerateVideoScriptInput, type GenerateVideoScriptOutput } from '@/ai/flows/generate-video-script';
import { z } from 'zod';

const SuggestProjectActionInputSchema = z.object({
  skillLevel: z.string().min(1, { message: 'Por favor, seleccione un nivel de habilidad.' }),
  yarnType: z.string().min(1, { message: 'Por favor, seleccione un tipo de hilo.' }),
});

export type FormState = {
  message: string;
  suggestion: SuggestProjectOutput | null;
  success: boolean;
}

export async function getProjectSuggestion(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SuggestProjectActionInputSchema.safeParse({
    skillLevel: formData.get('skillLevel'),
    yarnType: formData.get('yarnType'),
  });

  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.issues.map((issue) => issue.message).join(', ');
    return {
      message: errorMessage || 'Entrada inválida.',
      suggestion: null,
      success: false,
    };
  }
  
  try {
    const result = await suggestProject(validatedFields.data);
    return {
      message: '¡Aquí tienes una sugerencia de proyecto!',
      suggestion: result,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Error al contactar la IA. Es posible que el servicio no esté disponible en tu región. Por favor, inténtelo de nuevo más tarde.',
      suggestion: null,
      success: false,
    };
  }
}

const AdaptPatternActionInputSchema = z.object({
    pattern: z.string().optional(),
    patternPhotoDataUri: z.string().optional(),
    instruction: z.string().min(5, { message: 'La instrucción parece demasiado corta.' }),
});

export type PatternFormState = {
    message: string;
    adaptation: AdaptPatternOutput | null;
    success: boolean;
};

export async function getPatternAdaptation(
    prevState: PatternFormState,
    formData: FormData
): Promise<PatternFormState> {
    try {
        const rawData = {
            pattern: formData.get('pattern'),
            patternPhotoDataUri: formData.get('patternPhotoDataUri'),
            instruction: formData.get('instruction'),
        };

        const validatedFields = AdaptPatternActionInputSchema.safeParse(rawData);

        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.issues.map((issue) => issue.message).join(', ');
            return {
                message: errorMessage || 'Entrada inválida.',
                adaptation: null,
                success: false,
            };
        }

        const { pattern, patternPhotoDataUri, instruction } = validatedFields.data;

        if (!pattern && !patternPhotoDataUri) {
            return {
                message: 'Debes proporcionar un patrón en texto o subir una imagen.',
                adaptation: null,
                success: false,
            };
        }

        if (pattern && pattern.length < 10) {
            return {
                message: 'El patrón en texto parece demasiado corto.',
                adaptation: null,
                success: false,
            };
        }
        
        const input: AdaptPatternInput = {
            instruction: instruction,
            ...(pattern && { pattern }),
            ...(patternPhotoDataUri && { patternPhotoDataUri }),
        };

        const result = await adaptPattern(input);
        
        return {
            message: '¡Aquí tienes tu patrón adaptado!',
            adaptation: result,
            success: true,
        };
    } catch (error) {
        console.error("Error in getPatternAdaptation:", error);
        return {
            message: 'Error al contactar la IA. Es posible que el servicio no esté disponible en tu región. Por favor, inténtelo de nuevo más tarde.',
            adaptation: null,
            success: false,
        };
    }
}


const ChatActionInputSchema = z.object({
  history: z.string(), // history will be a JSON string
  message: z.string().min(1, { message: 'El mensaje no puede estar vacío.' }),
});

export type ChatActionState = {
  response: string | null;
  userInput: string | null;
  success: boolean;
  id: number;
};

export async function chatWithAI(
  prevState: ChatActionState,
  formData: FormData
): Promise<ChatActionState> {
  const validatedFields = ChatActionInputSchema.safeParse({
    history: formData.get('history'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.issues.map((issue) => issue.message).join(', ');
    return {
      response: errorMessage || 'Entrada inválida.',
      userInput: formData.get('message') as string,
      success: false,
      id: prevState.id + 1,
    };
  }
  
  const userInput = validatedFields.data.message;
  const input: ChatInput = {
    history: JSON.parse(validatedFields.data.history),
    message: userInput,
  };

  try {
    const result = await chat(input);
    return {
      response: result.response,
      userInput,
      success: true,
      id: prevState.id + 1,
    };
  } catch (error) {
    console.error(error);
    return {
      response: 'Error al contactar la IA. Es posible que el servicio no esté disponible en tu región. Por favor, inténtelo de nuevo más tarde.',
      userInput,
      success: false,
      id: prevState.id + 1,
    };
  }
}

const SpeechToActionInputSchema = z.object({
  audioDataUri: z.string().min(1, { message: 'El audio no puede estar vacío.' }),
});

export type SpeechToActionState = {
  transcript: string | null;
  success: boolean;
  error?: string;
  id: number;
}

export async function transcribeAudio(
  prevState: SpeechToActionState,
  formData: FormData
): Promise<SpeechToActionState> {
  const validatedFields = SpeechToActionInputSchema.safeParse({
    audioDataUri: formData.get('audioDataUri'),
  });

  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.issues.map((issue) => issue.message).join(', ');
    return {
      transcript: null,
      success: false,
      error: errorMessage || 'Entrada de audio inválida.',
      id: prevState.id + 1,
    };
  }

  const input: SpeechToTextInput = {
    audioDataUri: validatedFields.data.audioDataUri,
  };

  try {
    const result = await speechToText(input);
    return {
      transcript: result.transcript,
      success: true,
      error: undefined,
      id: prevState.id + 1,
    };
  } catch (error) {
    console.error(error);
    return {
      transcript: null,
      success: false,
      error: 'Error al contactar la IA. Es posible que el servicio no esté disponible en tu región. Por favor, inténtelo de nuevo más tarde.',
      id: prevState.id + 1,
    };
  }
}

export async function generateSpeechFromText(text: string): Promise<{ audioDataUri?: string; error?: string; }> {
  if (!text) {
    return { error: 'El texto no puede estar vacío.' };
  }

  try {
    const result = await textToSpeech(text);
    return { audioDataUri: result.audioDataUri };
  } catch (error) {
    console.error(error);
    return { error: 'Error al contactar la IA. Es posible que el servicio no esté disponible en tu región. Por favor, inténtelo de nuevo más tarde.' };
  }
}

const GenerateVideoScriptActionInputSchema = z.object({
  topic: z.string().min(5, { message: 'El tema parece demasiado corto.' }),
});

export type VideoScriptFormState = {
    message: string;
    script: GenerateVideoScriptOutput | null;
    success: boolean;
};

export async function generateVideoScriptAction(
    prevState: VideoScriptFormState,
    formData: FormData
): Promise<VideoScriptFormState> {
    const validatedFields = GenerateVideoScriptActionInputSchema.safeParse({
        topic: formData.get('topic'),
    });

    if (!validatedFields.success) {
        const errorMessage = validatedFields.error.issues.map((issue) => issue.message).join(', ');
        return {
            message: errorMessage || 'Entrada inválida.',
            script: null,
            success: false,
        };
    }

    try {
        const result = await generateVideoScript(validatedFields.data);
        return {
            message: '¡Aquí tienes tu guion de vídeo!',
            script: result,
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: 'Error al contactar la IA. Es posible que el servicio no esté disponible en tu región. Por favor, inténtelo de nuevo más tarde.',
            script: null,
            success: false,
        };
    }
}
