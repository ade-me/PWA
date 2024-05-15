import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter as Router

// Import views using lazy loading
const Welcome = lazy(() => import('./views/auths/Welcome'));
const ForgotPassword = lazy(() => import('./views/auths/ForgotPassword'));
const Register = lazy(() => import('./views/auths/Register'));
const Login = lazy(() => import('./views/auths/Login')); 
const LandingPage = lazy(() => import('./views/navigations/LandingPage'));
const MyWallet = lazy(() => import('./views/mywallet/MyWallet'));
const AvatarGeneratorPage = lazy(() => import('./views/avatarpage/AvatarGeneratorPage'));
const ScratchAvatar = lazy(() => import('./views/AvatarScrach/ScratchAvatar'));
const AvatarConfigurator = lazy(() => import('./views/avatarconfiguration/AvatarConfigurator'));
const LikedProfiles = lazy(() => import('./views/likedprofiles/LikedProfiles'));
const PrivateAvatar = lazy(() => import('./views/privateavatar/PrivateAvatar'));
const Settings = lazy(() => import('./views/profile/Settings/Settings'));
const ProfileSettings = lazy(() => import('./views/profile/profileSettings/ProfileSettings'));

function App() {
  return (
    <Router> {/* Wrap your Routes in a Router */}
      <Routes>
        <Route exact path="/" element={<Suspense fallback={<div className="flex items-center justify-center h-[100vh]">Loading...</div>}><Welcome /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<div className="flex items-center justify-center h-[100vh]">Loading...</div>}><Register /></Suspense>} />
        <Route path='/login' element={<Suspense fallback={<div className="flex items-center justify-center h-[100vh]">Loading...</div>}><Login /></Suspense>} />
        <Route path='/avatar-generator' element={<Suspense fallback={<div className="flex items-center justify-center h-[100vh]">Loading...</div>}><AvatarGeneratorPage /></Suspense>} />
        <Route path='/scratch-avatar' element={<Suspense fallback={<div className="flex items-center justify-center h-[100vh]">Loading...</div>}><ScratchAvatar /></Suspense>} />
        <Route path='/private-avatar' element={<Suspense fallback={<div className="flex items-center justify-center h-[100vh]">Loading...</div>}><PrivateAvatar /></Suspense>} />
        <Route path='/configurator' element={<Suspense fallback={<div className="flex items-center justify-center h-[100vh]">Loading...</div>}><AvatarConfigurator /></Suspense>} />
        <Route path='/forgot-password' element={<Suspense fallback={<div className="flex items-center justify-center h-[100vh]">Loading...</div>}><ForgotPassword /></Suspense>} />
        <Route path='/home' element={<Suspense fallback={<div className="flex items-center justify-center h-[100vh]">Loading...</div>}><LandingPage /></Suspense>} />
        <Route path='/wallet' element={<Suspense fallback={<div className="flex items-center justify-center h-[100vh]">Loading...</div>}><MyWallet /></Suspense>} />
        <Route path='/liked' element={<Suspense fallback={<div className="flex items-center justify-center h-[100nivh]">Loading...</div>}><LikedProfiles /></Suspense>} />
        <Route path='/settings' element={<Suspense fallback={<div className="flex items-center justify-center h-[100nivh]">Loading...</div>}><Settings /></Suspense>} />
        <Route path='/profile-settings' element={<Suspense fallback={<div className="flex items-center justify-center h-[100nivh]">Loading...</div>}><ProfileSettings /></Suspense>} />
      </Routes>
    </Router>
  )
}

export default App;
