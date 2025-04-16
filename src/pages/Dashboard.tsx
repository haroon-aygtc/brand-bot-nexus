
import { BarChart3, BrainCircuit, MessagesSquare, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StatCard = ({ title, value, description, icon: Icon, trend, trendValue }: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-3 flex items-center text-xs">
          <span className={trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
          <span className="ml-1 text-muted-foreground">vs last period</span>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button>New Deployment</Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Conversations"
          value="1,234"
          description="Across all channels"
          icon={MessagesSquare}
          trend="up"
          trendValue="12%"
        />
        <StatCard
          title="Active Users"
          value="847"
          description="Unique users this month"
          icon={Users}
          trend="up"
          trendValue="5.3%"
        />
        <StatCard
          title="AI Response Rate"
          value="98.7%"
          description="Successfully answered queries"
          icon={BrainCircuit}
          trend="neutral"
          trendValue="0.2%"
        />
        <StatCard
          title="Average Response Time"
          value="1.2s"
          description="Time to generate response"
          icon={BarChart3}
          trend="down"
          trendValue="18%"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Conversation Volume</CardTitle>
            <CardDescription>Chat volume over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground border border-dashed rounded-md">
              Chart Placeholder (volume over time)
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Topics</CardTitle>
            <CardDescription>Most discussed topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Product Information', 'Pricing', 'Technical Support', 'Account Issues', 'Feature Requests'].map((topic, i) => (
                <div key={topic} className="flex items-center justify-between">
                  <span className="text-sm">{topic}</span>
                  <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-brand-purple" 
                      style={{ width: `${85 - i * 12}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
