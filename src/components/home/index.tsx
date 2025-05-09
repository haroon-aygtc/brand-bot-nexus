
import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Platform</h1>
      <p className="mb-4">This is a simple demo application.</p>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <p>
          This application demonstrates a React frontend with a Laravel backend.
          You can use this as a starting point for your own projects.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Frontend Features</h3>
          <ul className="list-disc pl-5">
            <li>React with TypeScript</li>
            <li>TailwindCSS for styling</li>
            <li>React Router for navigation</li>
            <li>ShadCN UI components</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Backend Features</h3>
          <ul className="list-disc pl-5">
            <li>Laravel API</li>
            <li>Authentication with Sanctum</li>
            <li>Role-based permissions</li>
            <li>RESTful API endpoints</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
