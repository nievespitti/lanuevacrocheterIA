"use client";

import { useFormStatus } from "react-dom";
import {
  useActionState,
  useState,
  useEffect,
  useRef,
  startTransition,
} from "react";
import {
  chatWithAI,
  type ChatActionState,
  transcribeAudio,
  type SpeechToActionState,
} from "@/app/actions";
import type { ChatMessage } from "@/ai/flows/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Send, User, Bot, Mic, MicOff, LoaderCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const initialChatState: ChatActionState = {
  response: null,
  userInput: null,
  success: false,
  id: 0,
};

const initialTranscribeState: SpeechToActionState = {
  transcript: null,
  success: false,
  id: 0,
};

export function AiChat() {
  const [chatState, formAction, isChatPending] = useActionState(
    chatWithAI,
    initialChatState
  );
  const [transcribeState, transcribeAction, isTranscribing] = useActionState(
    transcribeAudio,
    initialTranscribeState
  );

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (chatState.id > 0 && chatState.userInput && chatState.response) {
      const newUserMessage: ChatMessage = {
        role: "user",
        content: chatState.userInput,
      };
      const newModelMessage: ChatMessage = {
        role: "model",
        content: chatState.response,
      };
      setMessages((prev) => [...prev, newUserMessage, newModelMessage]);
    }
  }, [chatState]);

  useEffect(() => {
    if (transcribeState.id > 0) {
      if (transcribeState.success && transcribeState.transcript) {
        if (inputRef.current) {
          inputRef.current.value = transcribeState.transcript;
          inputRef.current.focus();
        }
      } else if (transcribeState.error) {
        toast({
          variant: "destructive",
          title: "Error de transcripción",
          description: transcribeState.error,
        });
      }
    }
  }, [transcribeState, toast]);

  useEffect(() => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTop =
        scrollAreaViewportRef.current.scrollHeight;
    }
  }, [messages, isChatPending]);

  useEffect(() => {
    if (!isChatPending && chatState.id > 0) {
      formRef.current?.reset();
    }
  }, [isChatPending, chatState.id]);

  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
    } else {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: "destructive",
          title: "Función no soportada",
          description: "Tu navegador no soporta la grabación de audio.",
        });
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setIsRecording(true);

        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        const audioChunks: BlobPart[] = [];
        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            const base64data = reader.result as string;
            const formData = new FormData();
            formData.append("audioDataUri", base64data);
            startTransition(() => {
              transcribeAction(formData);
            });
          };

          setIsRecording(false);
          stream.getTracks().forEach((track) => track.stop());
        };

        recorder.start();
      } catch (err) {
        console.error("Error accessing microphone:", err);
        toast({
          variant: "destructive",
          title: "Error de micrófono",
          description:
            "No se pudo acceder al micrófono. Por favor, revisa los permisos en tu navegador.",
        });
        setIsRecording(false);
      }
    }
  };

  const isUIBlocked = isChatPending || isRecording || isTranscribing;

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[70vh]">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-headline">Resolver Dudas</h2>
        <p className="text-muted-foreground">
          Pregúntame cualquier cosa sobre crochet. ¡Estoy aquí para ayudarte!
        </p>
      </div>
      <ScrollArea
        className="flex-grow rounded-md border mb-4"
        viewportRef={scrollAreaViewportRef}
      >
        <div className="p-4 space-y-4">
          {messages.length === 0 && !isChatPending && (
            <div className="text-center text-muted-foreground p-8 animate-in fade-in">
              <Bot className="h-12 w-12 mx-auto mb-4" />
              <p>Empieza la conversación. Pregúntame algo como:</p>
              <p className="text-sm mt-2">
                <em>"¿Cuál es la diferencia entre punto alto y punto bajo?"</em>
              </p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-4 animate-in fade-in",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "model" && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>
                    <Bot className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 text-sm whitespace-pre-wrap",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isChatPending && (
            <div className="flex items-start gap-4 justify-start animate-in fade-in">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback>
                  <Bot className="h-5 w-5 text-primary animate-spin" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3 text-sm space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form
        action={formAction}
        ref={formRef}
        className="flex items-center gap-2"
      >
        <Input
          ref={inputRef}
          name="message"
          placeholder={
            isRecording
              ? "Grabando..."
              : isTranscribing
              ? "Transcribiendo..."
              : "Escribe tu pregunta o usa el micro..."
          }
          disabled={isUIBlocked}
          autoComplete="off"
          required
        />
        <input type="hidden" name="history" value={JSON.stringify(messages)} />

        <Button
          type="button"
          onClick={handleMicClick}
          disabled={isChatPending}
          size="icon"
          variant="ghost"
          aria-label="Grabar mensaje de voz"
        >
          {isRecording ? (
            <MicOff className="h-5 w-5 text-destructive animate-pulse" />
          ) : isTranscribing ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>

        <Button
          type="submit"
          disabled={isUIBlocked}
          size="icon"
          aria-label="Enviar mensaje"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
