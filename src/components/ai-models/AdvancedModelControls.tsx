
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Thermometer, Zap, Cpu, RotateCw, Save, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const AdvancedModelControls = () => {
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [topP, setTopP] = useState(0.9);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();
  
  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call to save model configuration
    setTimeout(() => {
      toast({
        title: "Model configuration saved",
        description: "Your advanced model settings have been updated successfully.",
      });
      setIsSaving(false);
    }, 1000);
  };
  
  const handleTestModel = async () => {
    setIsTesting(true);
    
    // Simulate API call to test model
    setTimeout(() => {
      toast({
        title: "Model test completed",
        description: "Test response received in 1.2 seconds with 98% success rate.",
      });
      setIsTesting(false);
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          Advanced Model Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="temperature" className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              Temperature
            </Label>
            <span className="text-sm font-medium">{temperature}</span>
          </div>
          <Slider 
            id="temperature"
            min={0} 
            max={1} 
            step={0.01} 
            value={[temperature]} 
            onValueChange={(value) => setTemperature(value[0])} 
          />
          <p className="text-xs text-muted-foreground">
            Controls randomness: lower is more deterministic, higher is more creative
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="max-tokens" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Max Tokens
            </Label>
            <Input 
              id="max-tokens" 
              type="number" 
              className="w-20 h-8" 
              value={maxTokens} 
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              min={1}
              max={4096}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Maximum number of tokens to generate
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="top-p" className="flex items-center gap-2">
              <RotateCw className="h-4 w-4" />
              Top P
            </Label>
            <span className="text-sm font-medium">{topP}</span>
          </div>
          <Slider 
            id="top-p"
            min={0} 
            max={1} 
            step={0.01} 
            value={[topP]} 
            onValueChange={(value) => setTopP(value[0])} 
          />
          <p className="text-xs text-muted-foreground">
            Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="frequency-penalty" className="text-sm">
              Frequency Penalty
            </Label>
            <span className="text-sm font-medium">{frequencyPenalty}</span>
          </div>
          <Slider 
            id="frequency-penalty"
            min={-2} 
            max={2} 
            step={0.1} 
            value={[frequencyPenalty]} 
            onValueChange={(value) => setFrequencyPenalty(value[0])} 
          />
          <p className="text-xs text-muted-foreground">
            Reduces repetition by penalizing tokens that have appeared already (-2.0 to 2.0)
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="presence-penalty" className="text-sm">
              Presence Penalty
            </Label>
            <span className="text-sm font-medium">{presencePenalty}</span>
          </div>
          <Slider 
            id="presence-penalty"
            min={-2} 
            max={2} 
            step={0.1} 
            value={[presencePenalty]} 
            onValueChange={(value) => setPresencePenalty(value[0])} 
          />
          <p className="text-xs text-muted-foreground">
            Encourages the model to talk about new topics by penalizing tokens already used (-2.0 to 2.0)
          </p>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleTestModel} disabled={isTesting}>
            {isTesting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Test Model
              </>
            )}
          </Button>
          
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Controls
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
