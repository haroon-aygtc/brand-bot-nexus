
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, MessageSquare, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SimpleModelForm } from "./SimpleModelForm";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface AiModel {
  id: string;
  name: string;
  provider: string;
}

// Mock AI models for demonstration
const mockModels = [
  { id: "1", name: "GPT-4o Custom", provider: "openai" },
  { id: "2", name: "Gemini Pro Custom", provider: "gemini" },
  { id: "3", name: "Claude 3 Sonnet", provider: "anthropic" },
];

export const AiModelTesting = () => {
  const [models, setModels] = useState<AiModel[]>(mockModels);
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content: "Select an AI model to start testing. You can send messages to see how the model responds.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim() || !selectedModelId) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // In a real implementation, this would be an API call to test the selected model
      // const response = await fetch(`/api/ai-models/${selectedModelId}/test`, ...);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Get selected model info
      const selectedModel = models.find((m) => m.id === selectedModelId);
      
      // Create mock response based on the model provider
      let responseText = "";
      switch (selectedModel?.provider) {
        case "openai":
          responseText = `This is a simulated response from OpenAI's model. I'm responding to: "${userMessage.content}"`;
          break;
        case "gemini":
          responseText = `Gemini AI here. In response to your query: "${userMessage.content}"`;
          break;
        case "anthropic":
          responseText = `Claude from Anthropic. Regarding your message: "${userMessage.content}"`;
          break;
        default:
          responseText = `AI response to: "${userMessage.content}"`;
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error testing model:", error);
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "system",
          content: "Failed to get a response from the AI model. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleAddModel = (newModel: AiModel) => {
    setModels((prev) => [...prev, newModel]);
    setShowAddForm(false);
    setSelectedModelId(newModel.id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Select AI Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedModelId} onValueChange={setSelectedModelId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name} ({model.provider})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={() => setShowAddForm(!showAddForm)} 
              variant={showAddForm ? "secondary" : "outline"} 
              className="w-full"
            >
              {showAddForm ? "Cancel" : "Add New Model"}
            </Button>
          </CardContent>
        </Card>
        
        {showAddForm && (
          <SimpleModelForm onSuccess={handleAddModel} />
        )}
      </div>
      
      <div className="md:col-span-2">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {selectedModelId 
                ? `Testing: ${models.find(m => m.id === selectedModelId)?.name || 'Selected Model'}`
                : "AI Model Testing"}
            </CardTitle>
          </CardHeader>
          <Separator />
          
          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex w-full",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-2",
                        message.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : message.role === "system"
                          ? "bg-muted text-muted-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground max-w-[80%] rounded-lg px-4 py-3">
                      <Loader className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder={selectedModelId ? "Type a message..." : "Select a model first..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!selectedModelId || isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!selectedModelId || !input.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
