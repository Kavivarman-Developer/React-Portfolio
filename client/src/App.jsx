import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home';
import Dasboard from './pages/Dasboard';
import AllProjects from './pages/AllProjects';
import Loader from './components/Loader';

const App = () => {
  return (
    <div>
      <Loader />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0B0F14",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "10px",
            color: "#F8FAFC",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            padding: "10px 14px",
          },
          success: {
            iconTheme: {
              primary: "#0EA5A0",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
