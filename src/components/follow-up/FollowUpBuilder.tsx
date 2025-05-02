
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Move, ArrowUpDown } from 'lucide-react';

interface FollowUpQuestion {
  id: string;
  question: string;
  description?: string;
  position: 'start' | 'inline' | 'end';
}

const FollowUpBuilder = () => {
  const [followUps, setFollowUps] = useState<FollowUpQuestion[]>([
    {
      id: '1',
      question: 'Need help with something else?',
      description: 'General follow-up for any conversation',
      position: 'end'
    }
  ]);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [position, setPosition] = useState<'start' | 'inline' | 'end'>('end');
  
  const addFollowUp = () => {
    if (!newQuestion.trim()) return;
    
    const newId = Date.now().toString();
    const newFollowUp: FollowUpQuestion = {
      id: newId,
      question: newQuestion,
      description: newDescription,
      position: position
    };
    
    setFollowUps([...followUps, newFollowUp]);
    setNewQuestion('');
    setNewDescription('');
  };
  
  const removeFollowUp = (id: string) => {
    setFollowUps(followUps.filter(item => item.id !== id));
  };

  const moveFollowUp = (id: string, direction: 'up' | 'down') => {
    const index = followUps.findIndex(item => item.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === followUps.length - 1)
    ) {
      return;
    }
    
    const newFollowUps = [...followUps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newFollowUps[index], newFollowUps[targetIndex]] = 
      [newFollowUps[targetIndex], newFollowUps[index]];
    
    setFollowUps(newFollowUps);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Follow-Up Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="follow-up">Add New Follow-Up</Label>
          <Input
            id="follow-up"
            placeholder="Enter a follow-up question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          
          <Textarea
            placeholder="Description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="h-20"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select 
                value={position} 
                onValueChange={(value) => setPosition(value as 'start' | 'inline' | 'end')}
              >
                <SelectTrigger id="position">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Start of Reply</SelectItem>
                  <SelectItem value="inline">Inline (Middle)</SelectItem>
                  <SelectItem value="end">End of Reply</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={addFollowUp} 
                disabled={!newQuestion.trim()}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Follow-Up
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium mb-3">Active Follow-Up Questions</h3>
          
          {followUps.length === 0 ? (
            <p className="text-muted-foreground text-sm">No follow-ups configured yet</p>
          ) : (
            <div className="space-y-3">
              {followUps.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-start justify-between border-b pb-3"
                >
                  <div className="flex-1 mr-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{item.question}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.position === 'start' ? 'Start' : item.position === 'end' ? 'End' : 'Inline'}
                      </Badge>
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => moveFollowUp(item.id, 'up')}
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => removeFollowUp(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <div className="bg-muted/50 rounded-md p-3 border">
            <h4 className="text-sm font-medium mb-2">Preview</h4>
            <div className="bg-white rounded-md p-3 border">
              <p className="text-sm">Your question has been answered. Here's what I understand...</p>
              
              {followUps.filter(item => item.position === 'start').length > 0 && (
                <div className="mt-2 border-t pt-2">
                  <p className="text-sm font-medium">Start Follow-Ups:</p>
                  <ul className="mt-1 space-y-1">
                    {followUps
                      .filter(item => item.position === 'start')
                      .map(item => (
                        <li key={item.id} className="text-sm text-blue-600 underline cursor-pointer">
                          {item.question}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              
              <p className="mt-2 text-sm">...main part of the response would go here...</p>
              
              {followUps.filter(item => item.position === 'inline').length > 0 && (
                <div className="mt-2 border-t pt-2">
                  <p className="text-sm font-medium">Inline Follow-Ups:</p>
                  <ul className="mt-1 space-y-1">
                    {followUps
                      .filter(item => item.position === 'inline')
                      .map(item => (
                        <li key={item.id} className="text-sm text-blue-600 underline cursor-pointer">
                          {item.question}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              
              <p className="mt-2 text-sm">...conclusion to the response...</p>
              
              {followUps.filter(item => item.position === 'end').length > 0 && (
                <div className="mt-2 border-t pt-2">
                  <p className="text-sm font-medium">End Follow-Ups:</p>
                  <ul className="mt-1 space-y-1">
                    {followUps
                      .filter(item => item.position === 'end')
                      .map(item => (
                        <li key={item.id} className="text-sm text-blue-600 underline cursor-pointer">
                          {item.question}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowUpBuilder;
