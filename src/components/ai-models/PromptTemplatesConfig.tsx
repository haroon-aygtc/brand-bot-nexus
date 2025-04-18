
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileText, Plus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
}

export const PromptTemplatesConfig = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("default");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");
  const [newTemplateContent, setNewTemplateContent] = useState("");

  const templates: PromptTemplate[] = [
    {
      id: "default",
      name: "Default Assistant",
      description: "Standard helpful and concise assistant template",
      content: "You are a helpful assistant. Provide clear, concise, and accurate responses to user queries."
    },
    {
      id: "customer-support",
      name: "Customer Support",
      description: "Specialized for handling customer inquiries",
      content: "You are a customer support agent. Be empathetic, helpful, and provide solutions to customer problems."
    },
    {
      id: "technical",
      name: "Technical Assistant",
      description: "Technical documentation and code-focused",
      content: "You are a technical assistant. Provide detailed technical explanations and code examples when appropriate."
    }
  ];

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  const handleSaveNewTemplate = () => {
    // In a real implementation, this would save the new template
    console.log("New template:", { name: newTemplateName, description: newTemplateDescription, content: newTemplateContent });
    setDialogOpen(false);
    // Reset form
    setNewTemplateName("");
    setNewTemplateDescription("");
    setNewTemplateContent("");
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
        <div className="grid grid-cols-1 gap-4">
          <RadioGroup 
            value={selectedTemplateId} 
            onValueChange={setSelectedTemplateId}
            className="space-y-2"
          >
            {templates.map(template => (
              <div key={template.id} className="flex items-start space-x-2">
                <RadioGroupItem value={template.id} id={template.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={template.id} className="font-medium">
                    {template.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
          
          <div className="rounded-md border p-4 mt-4">
            <Label className="block mb-2">Template Content</Label>
            <Textarea 
              className="min-h-[120px]" 
              value={selectedTemplate?.content || ""}
              readOnly
            />
            <p className="text-sm text-muted-foreground mt-2">
              This is the system prompt that will be sent to the AI model
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-2">
                <Plus className="mr-2 h-4 w-4" />
                Create New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Prompt Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input 
                    id="template-name" 
                    placeholder="E.g., Sales Assistant" 
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-description">Description</Label>
                  <Input 
                    id="template-description" 
                    placeholder="Short description of this template's purpose" 
                    value={newTemplateDescription}
                    onChange={(e) => setNewTemplateDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-content">Template Content</Label>
                  <Textarea 
                    id="template-content" 
                    placeholder="Enter the system prompt content here..." 
                    className="min-h-[150px]"
                    value={newTemplateContent}
                    onChange={(e) => setNewTemplateContent(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveNewTemplate}>
                  Save Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
