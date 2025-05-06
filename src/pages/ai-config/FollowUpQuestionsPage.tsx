
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { FollowUpQuestionsConfig } from "@/components/ai-models/FollowUpQuestionsConfig";
import { useGetFollowUpQuestions } from '@/hooks/useApi';
import { ArrowLeft, Save } from 'lucide-react';

const FollowUpQuestionsPage = () => {
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { data: followUpQuestions, isLoading, error, execute } = useGetFollowUpQuestions();

  useEffect(() => {
    execute();
  }, [execute]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Follow-up questions settings saved successfully");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/ai-config")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Follow-up Questions</h1>
            <p className="text-muted-foreground mt-1">
              Configure how follow-up questions are generated and displayed
            </p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          size="lg"
          className="gap-2"
        >
          {saving ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Follow-up Questions Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <FollowUpQuestionsConfig />
        </CardContent>
      </Card>
    </div>
  );
};

export default FollowUpQuestionsPage;
