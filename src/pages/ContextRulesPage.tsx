
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { useState } from "react"

interface ContextRule {
  id: string;
  name: string;
  condition: string;
  active: boolean;
}

const ContextRulesPage = () => {
  const [rules, setRules] = useState<ContextRule[]>([
    {
      id: "1",
      name: "Technical Support",
      condition: "message.contains('error') || message.contains('problem')",
      active: true
    },
    {
      id: "2",
      name: "Product Inquiry",
      condition: "message.contains('price') || message.contains('available')",
      active: true
    }
  ]);

  const [newRule, setNewRule] = useState({
    name: "",
    condition: ""
  });

  const addRule = () => {
    if (newRule.name && newRule.condition) {
      setRules([...rules, {
        id: Date.now().toString(),
        name: newRule.name,
        condition: newRule.condition,
        active: true
      }]);
      setNewRule({ name: "", condition: "" });
    }
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Context Rules</h1>
        <p className="text-sm text-muted-foreground">
          Define rules to provide specific context to your AI based on user input
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Rule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Rule Name</Label>
            <Input
              id="name"
              value={newRule.name}
              onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              placeholder="e.g., Technical Support"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Input
              id="condition"
              value={newRule.condition}
              onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
              placeholder="e.g., message.contains('error')"
            />
          </div>
          <Button onClick={addRule} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {rules.map((rule) => (
          <Card key={rule.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">{rule.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Condition: {rule.condition}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.active}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <Label>{rule.active ? "Active" : "Inactive"}</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteRule(rule.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContextRulesPage;
