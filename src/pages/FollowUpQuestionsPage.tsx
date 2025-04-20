
import { FollowUpBuilder } from "@/components/ai-models/FollowUpBuilder";
import { FollowUpQuestionsConfig } from "@/components/ai-models/FollowUpQuestionsConfig";

const FollowUpQuestionsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Follow-up Questions</h1>
        <p className="text-muted-foreground">
          Configure and manage AI follow-up questions and conversation flow
        </p>
      </div>
      <div className="grid gap-6">
        <FollowUpQuestionsConfig />
        <FollowUpBuilder />
      </div>
    </div>
  );
};

export default FollowUpQuestionsPage;
