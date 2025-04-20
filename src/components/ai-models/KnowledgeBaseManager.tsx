
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Book, FileText, Plus, X } from "lucide-react";
import { useState } from "react";

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  enabled: boolean;
}

export const KnowledgeBaseManager = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([
    {
      id: "1",
      title: "Company Information",
      content: "Our company specializes in AI-powered solutions...",
      enabled: true
    },
    {
      id: "2",
      title: "Product Knowledge",
      content: "Details about our product lineup and features...",
      enabled: true
    }
  ]);

  const [newItem, setNewItem] = useState({ title: "", content: "" });

  const addItem = () => {
    if (newItem.title && newItem.content) {
      setItems([...items, {
        id: Date.now().toString(),
        title: newItem.title,
        content: newItem.content,
        enabled: true
      }]);
      setNewItem({ title: "", content: "" });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          Knowledge Base
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <Switch 
                    checked={item.enabled}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.content.substring(0, 100)}...
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4 border rounded-lg p-4">
          <div className="space-y-2">
            <Label>Add New Knowledge Item</Label>
            <Input
              placeholder="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            />
            <Textarea
              placeholder="Content"
              value={newItem.content}
              onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
              className="min-h-[100px]"
            />
            <Button onClick={addItem} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Knowledge Item
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
