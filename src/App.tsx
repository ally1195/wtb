import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WeatherPage from './pages/WeatherPage';
import './App.css'



const App: React.FC = () => {
    return (
      <Router>
        <header className='header'>
          <h1>Weather The Better</h1>
          <nav>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/about" style={{ marginRight: '10px'}}>About</Link>
            <Link to="/weather">Weather</Link>
          </nav>
        </header>

        <main className='content'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/weather" element={<WeatherPage />} />
          </Routes>
        </main>
      </Router>
    );
  };

export default App
    
