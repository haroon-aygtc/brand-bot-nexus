
import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Card {item}</h2>
            <p className="text-gray-500">This is a simple dashboard card.</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <ul className="divide-y divide-gray-200">
            {[
              { id: 1, name: 'John Doe', action: 'logged in', time: '5 minutes ago' },
              { id: 2, name: 'Jane Smith', action: 'updated profile', time: '10 minutes ago' },
              { id: 3, name: 'Bob Johnson', action: 'created new project', time: '30 minutes ago' }
            ].map(activity => (
              <li key={activity.id} className="py-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-4">
                    {activity.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-gray-500">
                      {activity.action} • {activity.time}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
