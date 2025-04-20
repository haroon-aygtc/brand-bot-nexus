
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge } from "lucide-react";

export const PerformanceMetrics = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground">Avg. Response Time</p>
            <p className="text-2xl font-bold">1.2s</p>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <p className="text-2xl font-bold">99.8%</p>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground">Daily Requests</p>
            <p className="text-2xl font-bold">2.4k</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
