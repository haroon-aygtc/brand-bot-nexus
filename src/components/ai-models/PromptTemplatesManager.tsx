
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, X } from "lucide-react";
import { useState } from "react";

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export const PromptTemplatesManager = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([
    {
      id: "1",
      name: "Customer Support",
      description: "Template for handling customer inquiries",
      prompt: "You are a helpful customer support agent..."
    },
    {
      id: "2",
      name: "Technical Assistant",
      description: "Template for technical documentation",
      prompt: "You are a technical expert..."
    }
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    prompt: ""
  });

  const addTemplate = () => {
    if (newTemplate.name && newTemplate.prompt) {
      setTemplates([...templates, {
        id: Date.now().toString(),
        ...newTemplate
      }]);
      setNewTemplate({ name: "", description: "", prompt: "" });
    }
  };

  const removeTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Prompt Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {templates.map((template) => (
            <Card key={template.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeTemplate(template.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={template.prompt}
                className="mt-2"
                rows={3}
                readOnly
              />
            </Card>
          ))}
        </div>

        <div className="space-y-4 border rounded-lg p-4">
          <div className="space-y-2">
            <Label>Add New Template</Label>
            <Input
              placeholder="Template Name"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newTemplate.description}
              onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
            />
            <Textarea
              placeholder="Prompt Template"
              value={newTemplate.prompt}
              onChange={(e) => setNewTemplate({ ...newTemplate, prompt: e.target.value })}
              className="min-h-[100px]"
            />
            <Button onClick={addTemplate} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
