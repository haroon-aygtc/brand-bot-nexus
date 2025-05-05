
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Search, AlertTriangle, CheckCircle2 } from "lucide-react";

const ContextRulesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Context Rules</h1>
          <p className="text-muted-foreground">
            Define rules that control how your AI assistant responds in different contexts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search rules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <RuleCard
          title="Compliance Check"
          description="Ensures all responses comply with financial regulatory requirements"
          priority="High"
          status="Active"
        />
        <RuleCard
          title="Personalization"
          description="Customizes responses based on user preferences and history"
          priority="Medium"
          status="Active"
        />
        <RuleCard
          title="Technical Language Simplification"
          description="Simplifies technical terms for non-technical users"
          priority="Medium"
          status="Active"
        />
        <RuleCard
          title="Sentiment Detection"
          description="Adjusts tone based on detected user sentiment"
          priority="Low"
          status="Inactive"
        />
        <RuleCard
          title="Competitor Mention Detection"
          description="Provides specific responses when competitors are mentioned"
          priority="High"
          status="Active"
        />
      </div>
    </div>
  );
};

interface RuleCardProps {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Active" | "Inactive";
}

const RuleCard = ({ title, description, priority, status }: RuleCardProps) => {
  const [isActive, setIsActive] = useState(status === "Active");

  const priorityColors = {
    High: "text-red-500 bg-red-100",
    Medium: "text-amber-500 bg-amber-100",
    Low: "text-green-500 bg-green-100"
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          {title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`rule-${title}`} className="sr-only">
            Toggle rule
          </Label>
          <Switch
            id={`rule-${title}`}
            checked={isActive}
            onCheckedChange={setIsActive}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
              {priority} Priority
            </span>
            <span className="flex items-center text-xs text-muted-foreground">
              {isActive ? (
                <>
                  <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                  Active
                </>
              ) : (
                <>
                  <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                  Inactive
                </>
              )}
            </span>
          </div>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContextRulesPage;
