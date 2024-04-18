import React, { useEffect, useState } from 'react';
import Home from '../homepage/Home';
import { ImHome } from "react-icons/im";
import { FaSquarePlus } from "react-icons/fa6";
import PostingModal from './PostingModal';
import './TestStyles.css';
import Profile from '../profile/Profile';

function HomeScreen() {
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-white'>
      <Home/>
    </div>
  );
}

function SearchScreen() {
  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <h2>Search for your friends!</h2>
    </div>
  );
}

function ChatsScreen() {
  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <h2>Chat your friends!</h2>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Profile/>
    </div>
  );
}

function TabNavigator() {
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem('selectedTab') || 'Home'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigateTo = (tabName) => {
    setSelectedTab(tabName);
    localStorage.setItem('selectedTab', tabName);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedTab = localStorage.getItem('selectedTab');
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);

  // Function to clear local storage at 12 AM
  const clearLocalStorageAtMidnight = () => {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // Next day
      0, // Midnight hours
      0, // Midnight minutes
      0 // Midnight seconds
    );

    const timeUntilMidnight = midnight.getTime() - now.getTime();

    // Clear local storage at midnight
    setTimeout(() => {
      localStorage.clear();
    }, timeUntilMidnight);
  };

  // function to clear local storage at midnight
  useEffect(() => {
    clearLocalStorageAtMidnight();

    // Re-run the function every day
    const interval = setInterval(clearLocalStorageAtMidnight, 24 * 60 * 60 * 1000);

    // Cleans up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col w-screen h-screen items-center justify-center'>
      <div className="shadowEffect-footer bottom-0 fixed flex items-center justify-between w-screen h-15 bg-white pl-8 pr-8 pt-3 pb-3 gap-1">
        <button onClick={() => navigateTo('Home')} className={selectedTab === 'Home' ? 'active-tab' : ''}><ImHome className='text-gray-700 text-3xl font-bold'/></button>
        <button onClick={() => navigateTo("Search")} className={selectedTab === 'Search' ? 'active-tab' : ''}>
          <svg className='text-gray-700 font-bold' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.111 20.0578L18.134 15.0808C19.099 13.5608 19.657 11.7588 19.657 9.82976C19.657 4.40976 15.248 -0.000244141 9.828 -0.000244141C4.408 -0.000244141 0 4.40976 0 9.82976C0 15.2498 4.408 19.6598 9.829 19.6598C11.663 19.6598 13.381 19.1548 14.851 18.2768L19.872 23.2978C22.016 25.4388 25.256 22.2018 23.111 20.0578ZM3.047 9.82976C3.047 6.09076 6.09 3.04776 9.829 3.04776C13.568 3.04776 16.611 6.08976 16.611 9.82976C16.611 13.5698 13.568 16.6118 9.829 16.6118C6.09 16.6118 3.047 13.5688 3.047 9.82976ZM5.057 8.06576C7.041 3.46676 13.721 3.99976 14.979 8.81476C12.445 5.84076 7.986 5.52076 5.057 8.06576Z" fill="black" />
          </svg>
        </button>
        {/* Open modal when clicking on this button */}
        <button onClick={openModal} className={selectedTab === 'Post' ? 'active-tab' : ''}><FaSquarePlus className='text-gray-700 text-[2.5em] font-bold' /></button> 
        <button onClick={() => navigateTo("Chats")} className={selectedTab === 'Chats' ? 'active-tab' : ''}>
          <svg className='text-gray-700 font-bold' width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.8153 8.352C20.8153 3.5 16.0643 0 10.8153 0C5.53432 0 0.815323 3.526 0.815323 8.352C0.815323 10.063 1.43032 11.743 2.52032 13.047C2.56732 14.574 1.66932 16.765 0.859323 18.359C3.02732 17.968 6.11132 17.101 7.50832 16.244C15.2053 18.121 20.8153 13.402 20.8153 8.352ZM6.31532 9.732C5.62632 9.732 5.06532 9.172 5.06532 8.482C5.06532 7.792 5.62632 7.232 6.31532 7.232C7.00432 7.232 7.56532 7.792 7.56532 8.482C7.56532 9.172 7.00432 9.732 6.31532 9.732ZM10.8153 9.732C10.1263 9.732 9.56532 9.172 9.56532 8.482C9.56532 7.792 10.1263 7.232 10.8153 7.232C11.5043 7.232 12.0653 7.792 12.0653 8.482C12.0653 9.172 11.5043 9.732 10.8153 9.732ZM15.3153 9.732C14.6263 9.732 14.0653 9.172 14.0653 8.482C14.0653 7.792 14.6263 7.232 15.3153 7.232C16.0043 7.232 16.5653 7.792 16.5653 8.482C16.5653 9.172 16.0043 9.732 15.3153 9.732ZM23.6983 18.521C23.6693 19.522 24.2563 20.956 24.7863 22C23.3673 21.742 21.3483 21.176 20.4343 20.615C17.0693 21.433 14.3203 20.325 12.8613 18.515C17.4183 17.855 21.1023 14.958 22.3503 11.173C23.8303 12.152 24.8153 13.664 24.8153 15.447C24.8153 16.567 24.4123 17.668 23.6983 18.521Z" fill="black" />
          </svg>
        </button>
        <button onClick={() => navigateTo("Profile")} className={selectedTab === 'Profile' ? 'active-tab' : ''}>
          <svg className='text-gray-700 font-bold' width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.8153 7.001C19.8153 10.866 16.6813 14.001 12.8153 14.001C8.94931 14.001 5.81531 10.866 5.81531 7.001C5.81531 3.134 8.94931 0 12.8153 0C16.6813 0 19.8153 3.134 19.8153 7.001ZM18.2173 14.181C16.7113 15.318 14.8433 16.001 12.8153 16.001C10.7853 16.001 8.91631 15.316 7.40831 14.179C3.33631 15.972 0.815308 21.555 0.815308 24H24.8153C24.8153 21.577 22.2153 15.994 18.2173 14.181Z" fill="black" />
          </svg>
        </button>
      </div>
      <div className='flex gap-5'>
        {selectedTab === 'Home' && <HomeScreen />}
        {selectedTab === 'Search' && <SearchScreen />}
        {/* Renders modal */}
        <PostingModal isOpen={isModalOpen} onClose={closeModal} />
        {selectedTab === 'Chats' && <ChatsScreen />}
        {selectedTab === 'Profile' && <ProfileScreen />}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className='w-screen h-screen bg-gray-200'>
      <TabNavigator/>
    </div>
  );
}
