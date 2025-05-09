
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
