import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home';
import Dasboard from './pages/Dasboard';
import Loader from './components/Loader';

const App = (props) => {
  return (
    <div>
      <Loader />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
