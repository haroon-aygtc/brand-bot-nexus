
import { ResponseFormatter } from "@/components/ai-models/ResponseFormatter";

const ResponseFormatterPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Response Formatter</h1>
        <p className="text-muted-foreground">
          Configure how AI responses are formatted and styled
        </p>
      </div>
      <ResponseFormatter />
    </div>
  );
};

export default ResponseFormatterPage;
