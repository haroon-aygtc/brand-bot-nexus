
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { GitBranch, Plus, X } from "lucide-react";
import { useState } from "react";

interface Option {
  id: string;
  text: string;
  nextQuestionId?: string;
}

interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'conditional';
  options: Option[];
}

export const FollowUpBuilder = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [questionType, setQuestionType] = useState<'single' | 'multiple' | 'conditional'>('single');
  
  const addQuestion = () => {
    if (currentQuestion.trim()) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: currentQuestion,
        type: questionType,
        options: []
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion("");
    }
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: [...q.options, { id: Date.now().toString(), text: "New Option" }]
        };
      }
      return q;
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Follow-up Flow Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Enter new question..."
              className="flex-1"
            />
            <Select value={questionType} onValueChange={(value: any) => setQuestionType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Choice</SelectItem>
                <SelectItem value="multiple">Multiple Choice</SelectItem>
                <SelectItem value="conditional">Conditional (Yes/No)</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((question) => (
              <Card key={question.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{question.text}</h4>
                    <p className="text-sm text-muted-foreground">Type: {question.type}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => addOption(question.id)}>
                    Add Option
                  </Button>
                </div>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center gap-2 p-2 border rounded-md">
                      <Input 
                        value={option.text}
                        onChange={(e) => {
                          setQuestions(questions.map(q => {
                            if (q.id === question.id) {
                              return {
                                ...q,
                                options: q.options.map(o => 
                                  o.id === option.id ? { ...o, text: e.target.value } : o
                                )
                              };
                            }
                            return q;
                          }));
                        }}
                        className="flex-1"
                      />
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
