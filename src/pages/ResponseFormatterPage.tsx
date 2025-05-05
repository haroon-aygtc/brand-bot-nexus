
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResponseFormatterPage = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Response Formatter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border border-border">
            <p className="text-muted-foreground">Response Formatter - Coming Soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResponseFormatterPage;
