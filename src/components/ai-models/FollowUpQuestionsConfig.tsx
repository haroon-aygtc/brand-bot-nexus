
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MessageSquarePlus, Plus, X } from "lucide-react";
import { useState } from "react";

interface FollowUpQuestion {
  id: string;
  text: string;
}

export const FollowUpQuestionsConfig = () => {
  const [enabled, setEnabled] = useState(true);
  const [position, setPosition] = useState("end");
  const [questions, setQuestions] = useState<FollowUpQuestion[]>([
    { id: "1", text: "Tell me more about this topic" },
    { id: "2", text: "What are the best practices?" },
    { id: "3", text: "Can you provide an example?" }
  ]);
  const [newQuestion, setNewQuestion] = useState("");

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { 
        id: Date.now().toString(), 
        text: newQuestion 
      }]);
      setNewQuestion("");
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquarePlus className="h-5 w-5" />
          Follow-up Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="follow-up-toggle">Enable Follow-up Questions</Label>
            <p className="text-sm text-muted-foreground">
              Suggest related questions after AI responses
            </p>
          </div>
          <Switch 
            id="follow-up-toggle" 
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>

        {enabled && (
          <>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select 
                value={position} 
                onValueChange={setPosition}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Start of response</SelectItem>
                  <SelectItem value="end">End of response</SelectItem>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                  <SelectItem value="floating">Floating bubble</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose where follow-up questions will appear
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="generation-method">Generation Method</Label>
              <Select defaultValue="dynamic">
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dynamic">Dynamically generated</SelectItem>
                  <SelectItem value="fixed">Fixed predefined set</SelectItem>
                  <SelectItem value="hybrid">Hybrid approach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Predefined Questions</Label>
                <p className="text-xs text-muted-foreground">
                  {questions.length} questions
                </p>
              </div>
              
              <div className="space-y-2 max-h-[200px] overflow-y-auto p-1">
                {questions.map((question) => (
                  <div 
                    key={question.id} 
                    className="flex items-center space-x-2 rounded-md border p-2"
                  >
                    <span className="flex-1 text-sm">{question.text}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => removeQuestion(question.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <Input 
                  placeholder="Add new question..." 
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addQuestion();
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={addQuestion}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-questions">Maximum Questions</Label>
              <Select defaultValue="3">
                <SelectTrigger>
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 question</SelectItem>
                  <SelectItem value="2">2 questions</SelectItem>
                  <SelectItem value="3">3 questions</SelectItem>
                  <SelectItem value="4">4 questions</SelectItem>
                  <SelectItem value="5">5 questions</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Maximum number of follow-up questions to display at once
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
