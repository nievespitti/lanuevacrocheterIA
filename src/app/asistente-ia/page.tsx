import { AiProjectSuggester } from "@/components/crochet/AiProjectSuggester";
import { AiPatternAdapter } from "@/components/crochet/AiPatternAdapter";
import { AiChat } from "@/components/crochet/AiChat";
import { AiVideoScriptGenerator } from "@/components/crochet/AiVideoScriptGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WandSparkles, TextSelect, MessageCircle, Film } from "lucide-react";

export default function AsistentePage() {
  return (
    <div className="animate-in fade-in-0 duration-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline">Asistente de IA</h1>
        <p className="text-muted-foreground mt-2">
          Tu compañero creativo para generar, adaptar y resolver dudas de
          patrones.
        </p>
      </div>

      <Tabs defaultValue="suggester" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-primary/20 p-1 h-auto rounded-lg max-w-2xl mx-auto mb-8">
          <TabsTrigger
            value="suggester"
            className="flex flex-col h-auto text-center gap-1 p-2 data-[state=active]:bg-card data-[state=active]:text-accent-foreground data-[state=active]:shadow-md"
          >
            <WandSparkles className="h-5 w-5" />
            <span className="text-sm leading-tight">
              Sugerir
              <br />
              Proyecto
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="adapter"
            className="flex flex-col h-auto text-center gap-1 p-2 data-[state=active]:bg-card data-[state=active]:text-accent-foreground data-[state=active]:shadow-md"
          >
            <TextSelect className="h-5 w-5" />
            <span className="text-sm leading-tight">
              Adaptar
              <br />
              Patrón
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="flex flex-col h-auto text-center gap-1 p-2 data-[state=active]:bg-card data-[state=active]:text-accent-foreground data-[state=active]:shadow-md"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm leading-tight">
              Resolver
              <br />
              Dudas
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="script"
            className="flex flex-col h-auto text-center gap-1 p-2 data-[state=active]:bg-card data-[state=active]:text-accent-foreground data-[state=active]:shadow-md"
          >
            <Film className="h-5 w-5" />
            <span className="text-sm leading-tight">
              Generar
              <br />
              Guion
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="suggester">
          <AiProjectSuggester />
        </TabsContent>
        <TabsContent value="adapter">
          <AiPatternAdapter />
        </TabsContent>
        <TabsContent value="chat">
          <AiChat />
        </TabsContent>
        <TabsContent value="script">
          <AiVideoScriptGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
