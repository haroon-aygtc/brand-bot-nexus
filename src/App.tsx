import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
