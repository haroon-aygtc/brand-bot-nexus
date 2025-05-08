
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const providers = [
  { value: "openai", label: "OpenAI" },
  { value: "gemini", label: "Google Gemini" },
  { value: "mistral", label: "Mistral AI" },
  { value: "grok", label: "Grok" },
  { value: "huggingface", label: "Hugging Face" },
  { value: "anthropic", label: "Anthropic" }
];

const modelsByProvider = {
  openai: [
    { value: "gpt-4o", label: "GPT-4o" },
    { value: "gpt-4o-mini", label: "GPT-4o Mini" },
    { value: "gpt-4.5-preview", label: "GPT-4.5 Preview" }
  ],
  gemini: [
    { value: "gemini-pro", label: "Gemini Pro" },
    { value: "gemini-ultra", label: "Gemini Ultra" }
  ],
  mistral: [
    { value: "mistral-small", label: "Mistral Small" },
    { value: "mistral-medium", label: "Mistral Medium" },
    { value: "mistral-large", label: "Mistral Large" }
  ],
  grok: [
    { value: "grok-1", label: "Grok-1" }
  ],
  huggingface: [
    { value: "llama-3-70b", label: "Llama 3 (70B)" },
    { value: "llama-3-8b", label: "Llama 3 (8B)" },
    { value: "mistral-7b", label: "Mistral 7B" },
    { value: "phi-2", label: "Phi-2" }
  ],
  anthropic: [
    { value: "claude-3-opus", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku" }
  ]
};

interface SimpleModelFormProps {
  onSuccess?: (model: any) => void;
}

export const SimpleModelForm = ({ onSuccess }: SimpleModelFormProps) => {
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProviderChange = (value: string) => {
    setProvider(value);
    // Reset model when provider changes
    setModel("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !provider || !model) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would be an API call
      // const response = await api.aiModels.create({...});
      
      // For now, simulate success
      setTimeout(() => {
        const newModel = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          provider,
          model,
          apiKey,
          temperature,
          maxTokens,
          systemPrompt,
          enabled,
          createdAt: new Date().toISOString()
        };
        
        toast.success("AI model created successfully");
        setIsSubmitting(false);
        
        // Reset form
        setName("");
        setApiKey("");
        setSystemPrompt("");
        
        if (onSuccess) {
          onSuccess(newModel);
        }
      }, 1000);
    } catch (error) {
      toast.error("Failed to create AI model");
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create AI Model</CardTitle>
          <CardDescription>
            Configure a new AI model with simplified settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Model Name</Label>
              <Input
                id="name"
                placeholder="My Custom AI Model"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select value={provider} onValueChange={handleProviderChange} required>
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select value={model} onValueChange={setModel} required>
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {modelsByProvider[provider as keyof typeof modelsByProvider]?.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="temperature">Temperature: {temperature}</Label>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={([value]) => setTemperature(value)}
            />
            <p className="text-xs text-muted-foreground">
              Controls randomness: lower is more deterministic, higher is more creative
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="max-tokens">Max Tokens</Label>
            <Input
              id="max-tokens"
              type="number"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              min={1}
              max={32000}
            />
            <p className="text-xs text-muted-foreground">
              Maximum number of tokens to generate in the response
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="system-prompt">System Prompt</Label>
            <Textarea
              id="system-prompt"
              placeholder="You are a helpful assistant..."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Instructions to set the AI's behavior (optional)
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="enabled" className="cursor-pointer">Enable this model</Label>
            <Switch
              id="enabled"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Creating Model...
              </>
            ) : (
              "Create Model"
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
