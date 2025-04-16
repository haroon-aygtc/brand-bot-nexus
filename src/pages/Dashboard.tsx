
import { BarChart3, Code, MessageSquare, Settings, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StatCard = ({ title, value, trend, trendValue, icon: Icon }: {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  icon: React.ElementType;
}) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="flex items-center text-xs">
          <span className={
            trend === 'up' ? 'text-emerald-500' : 
            trend === 'down' ? 'text-red-500' : 
            'text-muted-foreground'
          }>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
          <span className="ml-1 text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

const QuickActionCard = ({ title, icon: Icon, onClick }: {
  title: string;
  icon: React.ElementType;
  onClick: () => void;
}) => {
  return (
    <Card 
      className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
          <Icon className="h-6 w-6 text-slate-600" />
        </div>
        <h3 className="text-sm font-medium">{title}</h3>
      </CardContent>
    </Card>
  );
};

const StatusItem = ({ label, value, status }: {
  label: string;
  value: string;
  status: 'success' | 'warning' | 'error' | 'info';
}) => {
  const statusClasses = {
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    error: 'text-red-500',
    info: 'text-blue-500'
  };

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium ${statusClasses[status]}`}>{value}</span>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your dashboard.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button>New Deployment</Button>
        </div>
      </div>
      
      {/* Top-level tabs */}
      <div className="flex overflow-x-auto py-2 -mx-6 px-6 scrollbar-none">
        <div className="flex space-x-1 border-b border-border w-full min-w-max">
          <Button variant="ghost" className="rounded-none border-b-2 border-primary text-primary">
            Overview
          </Button>
          <Button variant="ghost" className="rounded-none border-b-2 border-transparent hover:border-primary/40">
            Widget Config
          </Button>
          <Button variant="ghost" className="rounded-none border-b-2 border-transparent hover:border-primary/40">
            Context Rules
          </Button>
          <Button variant="ghost" className="rounded-none border-b-2 border-transparent hover:border-primary/40">
            Templates
          </Button>
          <Button variant="ghost" className="rounded-none border-b-2 border-transparent hover:border-primary/40">
            Embed Code
          </Button>
          <Button variant="ghost" className="rounded-none border-b-2 border-transparent hover:border-primary/40">
            Analytics
          </Button>
          <Button variant="ghost" className="rounded-none border-b-2 border-transparent hover:border-primary/40">
            Response Formatter
          </Button>
          <Button variant="ghost" className="rounded-none border-b-2 border-transparent hover:border-primary/40">
            AI Models
          </Button>
          <Button variant="ghost" className="rounded-none border-b-2 border-transparent hover:border-primary/40">
            Web Scraping
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col-reverse md:flex-row gap-6">
        <div className="md:w-3/4 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Conversations"
              value="1,248"
              trend="up"
              trendValue="+12%"
              icon={MessageSquare}
            />
            <StatCard
              title="Active Users"
              value="342"
              trend="up"
              trendValue="+5%"
              icon={Users}
            />
            <StatCard
              title="Response Rate"
              value="98.7%"
              trend="neutral"
              trendValue="0.5%"
              icon={BarChart3}
            />
            <StatCard
              title="Avg. Response Time"
              value="1.2s"
              trend="down"
              trendValue="-0.3%"
              icon={BarChart3}
            />
          </div>
          
          {/* Quick Actions */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <QuickActionCard 
                  title="Configure Widget" 
                  icon={Settings} 
                  onClick={() => console.log('Configure Widget')} 
                />
                <QuickActionCard 
                  title="Edit Context Rules" 
                  icon={MessageSquare} 
                  onClick={() => console.log('Edit Context Rules')} 
                />
                <QuickActionCard 
                  title="Get Embed Code" 
                  icon={Code} 
                  onClick={() => console.log('Get Embed Code')} 
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Chart/Analytics Placeholder */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Conversation Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] bg-muted/30 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Chart Placeholder (volume over time)</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* System Status */}
        <div className="md:w-1/4">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
              <p className="text-sm text-muted-foreground">Current system health</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <StatusItem 
                  label="API Status" 
                  value="Operational" 
                  status="success" 
                />
                <StatusItem 
                  label="Gemini API" 
                  value="Connected" 
                  status="success" 
                />
                <StatusItem 
                  label="Hugging Face API" 
                  value="Connected" 
                  status="success" 
                />
                <StatusItem 
                  label="Database" 
                  value="Healthy" 
                  status="success" 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
