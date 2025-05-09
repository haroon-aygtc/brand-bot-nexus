
import React from 'react';
import { Card } from './ui/card';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Users" 
          value="1,234" 
          description="Total users in the system" 
        />
        <DashboardCard 
          title="Revenue" 
          value="$12,345" 
          description="Total revenue this month" 
        />
        <DashboardCard 
          title="Activity" 
          value="89%" 
          description="User engagement rate" 
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <ActivityList />
        </div>
      </div>
    </div>
  );
};

// Simple card component for dashboard metrics
const DashboardCard = ({ title, value, description }: { 
  title: string; 
  value: string; 
  description: string; 
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <p className="text-3xl font-bold mt-2 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </Card>
  );
};

// Simple activity list component
const ActivityList = () => {
  const activities = [
    { id: 1, user: 'John Doe', action: 'logged in', time: '5 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'updated profile', time: '10 minutes ago' },
    { id: 3, user: 'Bob Johnson', action: 'created new project', time: '30 minutes ago' },
    { id: 4, user: 'Alice Williams', action: 'completed task', time: '2 hours ago' },
  ];

  return (
    <ul className="divide-y divide-gray-200">
      {activities.map(activity => (
        <li key={activity.id} className="py-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-4">
              {activity.user.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{activity.user}</p>
              <p className="text-sm text-gray-500">
                {activity.action} • {activity.time}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Dashboard;
