import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home';
import Contact from './components/Contact';
import { HeroProvider } from './context/HeroContext'
import Dasboard from './pages/Dasboard';

const App = (props) => {
  const location = useLocation()

  return (
    <div>
      <HeroProvider>
        <Toaster position="top-right" />
        {location.pathname !== '/dashboard' && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dasboard />} />
        </Routes>
      </HeroProvider>
    </div>
  )
}

export default App
