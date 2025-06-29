import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-project.ts';
import '@/ai/flows/adapt-pattern.ts';
import '@/ai/flows/chat.ts';
import '@/ai/flows/speech-to-text.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/generate-video-script.ts';
