import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <nav className="navbar">
        
      </nav>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
    </>
  );
}

export default App;
