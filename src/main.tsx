
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Use a simpler app structure to ensure it works
const App = () => {
  return (
    <div className="app-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Platform</h1>
        <p className="mb-4">A simple application that works.</p>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
