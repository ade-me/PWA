import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './views/homepage/Home'
import Welcome from './views/homepage/Welcome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route exact path="/" element={<Welcome />} />
         <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
