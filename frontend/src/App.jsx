import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './views/auths/Welcome'
import ForgotPassword from './views/auths/ForgotPassword'
import Register from './views/auths/Register'
import Login from './views/auths/Login'
import LandingPage from './views/navigations/LandingPage';
import MyWallet from './views/mywallet/MyWallet'
import AvatarGeneratorPage from './views/avatarpage/AvatarGeneratorPage'
import ScratchAvatar from './views/avatarpage/ScratchAvatar'
// import axios from "axios";

// axios.defaults.baseURL = 'https://pwa-backend-rosy.vercel.app';
// axios.defaults.withCredentials = true

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route exact path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/avatar-generator' element={<AvatarGeneratorPage />} />
        <Route path='/scratch-avatar' element={<ScratchAvatar/>}/>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/home' element={<LandingPage />} />
        <Route path='/wallet' element={<MyWallet/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
