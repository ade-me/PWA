import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './views/homepage/Home'
import Welcome from './views/auths/Welcome'
import ForgotPassword from './views/auths/ForgotPassword'
import Register from './views/auths/Register'
import Login from './views/auths/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route exact path="/" element={<Welcome />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
