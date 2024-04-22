import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './ProfileStyles.css'
import { FaHeart } from 'react-icons/fa6';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Profile() {
    const [activeTab, setActiveTab] = useState('tab1');
    const [showComments, setShowComments] = useState(false);


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
  return (
      <section className='Profile-container w-[100vw] h-[100vh] flex flex-col bg-blue-500'>
          <div className='Profile-Nav top-0 fixed w-[100%] h-[60px] bg-white flex items-center justify-between p-6'>
            <span className='text-2xl font-bold'>Profile</span>
              <Link to='#'>
                <svg  
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 13.616V10.384C22.349 9.797 
                    21.307 9.632 20.781 8.365C20.254 7.094 20.881 6.23
                    21.628 4.657L19.343 2.372C17.782 3.114 16.91 3.747 15.636 3.219C14.367      
                    2.693 14.2 1.643 13.616 0H10.384C9.802 1.635 9.635 2.692 8.365 3.219C7.094 3.747
                    6.232 3.121 4.657 2.372L2.372 4.657C3.117 6.225 3.747 7.091 3.219 8.364C2.692 9.635
                    1.635 9.802 0 10.384V13.616C1.632 14.196 2.692 14.365 3.219 15.635C3.749 16.917 3.105
                    17.801 2.372 19.342L4.657 21.628C6.219 20.885 7.091 20.253 8.364 20.781C9.634 21.307 9.801 22.36
                    10.384 24H13.616C14.198 22.364 14.365 21.31 15.643 20.778H15.644C16.906 20.254 17.764 20.879 19.342
                    21.629L21.627 19.343C20.884 17.78 20.252 16.91 20.779 15.637C21.306 14.366 22.367 14.197 24 13.616ZM12
                    17C9.238 17 7 14.761 7 12C7 9.239 9.238 7 12 7C14.762 7 17 9.239 17 12C17 14.761 14.762 17 12 17ZM15 12C15
                    13.654 13.654 15 12 15C10.346 15 9 13.654 9 12C9 10.346 10.346 9 12 9C13.654 9 15 10.346 15 12Z"
                    fill="black"
                    />
                </svg>
              </Link>
          </div>
          <div className='bg-white h-[100vh] pt-[60px] p-6'>
            <div className='Profile-box bg-white h-[59vh] mt-3 mb-5 rounded-[8px]'>
                <div className="Profile-cover bg-gray-400 h-[40%]">
                   <img className="inset-0 w-full h-full object-cover" 
                   src="https://images.unsplash.com/photo-1600137541899-c6de40300ee0?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Photo" />
                </div>
                <div className='User-PROFILE-Box bg-gray-300 h-[60%] flex flex-col justify-between'>
                    <div className='flex justify-between h-[120px] pl-6 pr-3 pt-3 gap-9'>
                        <div className='flex flex-col justify-between'>
                              <div className='Profile-User-Image w-[80px] h-[80px] bg-black mt-[-45px] rounded-[50%]'>
                                 <img src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='User'/>
                              </div>
                              <div>
                                  <h1 className='text-[18px] font-bold'>Jone Doe</h1>
                                  <h3 className='flex gap-2 items-center text-center text-[13px]'>@jonedoe <span className='text-3xl font-bold text-center mt-[-12px]'>.</span> <p>Location</p></h3>
                              </div>
                        </div>
                        <div className='flex flex-col justify-between'>
                              <div className='flex bg-gray-400 h-[30px] w-[6rem] p-1 items-center gap-2 rounded-[20px]'>
                                <span className='w-[25px] h-[25px] bg-white flex items-center justify-center rounded-[50%]'>
                                    <svg width="12" height="11" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M6.5 0C3.06692 0 0 2.28908 0 5.42046C0 6.53088 0.400292 7.62125 1.10879 8.46733C1.13858 9.45858 0.554667 10.881 0.02925 11.9167C1.43867 11.6621 3.44229 11.0998 4.35067 10.543C9.3535 11.7601 13 8.69863 13 5.42046C13 2.27229 9.91196 0 6.5 0ZM3.79167 6.22917C3.34263 6.22917 2.97917 5.86571 2.97917 5.41667C2.97917 4.96763 3.34263 4.60417 3.79167 4.60417C4.24071 4.60417 4.60417 4.96763 4.60417 5.41667C4.60417 5.86571 4.24071 6.22917 3.79167 6.22917ZM6.5 6.22917C6.05096 6.22917 5.6875 5.86571 5.6875 5.41667C5.6875 4.96763 6.05096 4.60417 6.5 4.60417C6.94904 4.60417 7.3125 4.96763 7.3125 5.41667C7.3125 5.86571 6.94904 6.22917 6.5 6.22917ZM9.20833 6.22917C8.75983 6.22917 8.39583 5.86571 8.39583 5.41667C8.39583 4.96763 8.75983 4.60417 9.20833 4.60417C9.65738 4.60417 10.0208 4.96763 10.0208 5.41667C10.0208 5.86571 9.65738 6.22917 9.20833 6.22917Z" fill="black" />
                                    </svg>
                                </span>
                                <p className='text-center'>Chats</p>
                              </div>
                              <Link to='#' className='text-[11px] pl-4 text-right pr-1'>More Info</Link>
                        </div>
                    </div>
                    <div className='flex gap-5 pl-6 h-[1.5rem] items-center'>
                        <div className='flex bg-gray-400 h-[30px] w-[7.3rem] p-1 items-center gap-2 rounded-[20px]'>
                            <span className='w-[23px] h-[23px] bg-white flex items-center justify-center rounded-[50%]'>
                                <FaHeart className='text-[10px]'/>
                            </span>
                            <p className='text-center'>10k fans</p>
                        </div>
                        <div className='flex bg-gray-400 h-[30px] w-[8.8rem] p-1 items-center gap-2 rounded-[20px]'>
                            <span className='w-[23px] h-[23px] bg-white flex items-center justify-center rounded-[50%]'>
                                <svg width="11" height="10" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5932 0.244895C5.6688 0.0949474 5.8272 0 6 0C6.1734 0 6.3312 0.0949474 6.4068 0.244895C6.9912 1.40163 7.9968 3.39437 7.9968 3.39437C7.9968 3.39437 10.2834 3.69774 11.61 3.87432C11.8518 3.90616 12 4.10358 12 4.30679C12 4.41679 11.9568 4.52853 11.8614 4.61711C10.8954 5.50753 9.2322 7.04347 9.2322 7.04347C9.2322 7.04347 9.6384 9.22437 9.8736 10.4894C9.9234 10.7568 9.7086 11 9.4284 11C9.3552 11 9.282 10.9832 9.2154 10.9485C8.0346 10.3417 6 9.29789 6 9.29789C6 9.29789 3.9654 10.3417 2.7846 10.9485C2.718 10.9832 2.6442 11 2.571 11C2.292 11 2.076 10.7563 2.1264 10.4894C2.3622 9.22437 2.7684 7.04347 2.7684 7.04347C2.7684 7.04347 1.1046 5.50753 0.1392 4.61711C0.0432001 4.52853 0 4.41679 0 4.30737C0 4.10358 0.1494 3.90558 0.3906 3.87432C1.7172 3.69774 4.0032 3.39437 4.0032 3.39437C4.0032 3.39437 5.0094 1.40163 5.5932 0.244895Z" fill="black" />
                                </svg>
                            </span>
                            <p className='text-center'>1k followers</p>
                        </div>
                    </div>
                    <hr/>
                    <div className='Btns flex items-center h-[50px] justify-between p-3 mb-3 rounded-[8px]'>
                        <button className='h-[38px] text-white text-center font-bold text-[13px]'>Go Private</button>
                        <button className='h-[38px] text-white text-center font-bold text-[13px]'>Edit Avatar</button>
                    </div>
                </div>
            </div>
            <div className='h-[50vh]'>
            <div className='TESTEST flex items-center justify-center gap-[6rem] mb-3'>
              <button className={activeTab === 'tab1' ? 'active-tab-1' : ''} onClick={() => handleTabClick('tab1')}>120 POSTS</button>
              <button className={activeTab === 'tab2' ? 'active-tab-2' : ''} onClick={() => handleTabClick('tab2')}>232 MEDIA</button>
            </div>
            
            <div className='flex mb-4 h-[2px] bg-[#c6c6c6]' style={{ width: '100%' }}>
                <div
                    className="indicator-bar"
                    style={{
                        left: activeTab === 'tab1' ? 0 : '50%',
                        transition: 'left 0.3s ease',
                        backgroundColor: activeTab === 'tab1' ? 'black' : '#c6c6c6',
                    }}
                />
                <div
                    className="indicator-bar"
                    style={{
                        right: activeTab === 'tab2' ? 0 : '50%',
                        transition: 'rigth 0.3s ease',
                        backgroundColor: activeTab === 'tab2' ? 'black' : '#c6c6c6',
                    }}
                />
            </div>
      
            <ul className="h-[65vh] tab-content-1" style={{ display: activeTab === 'tab1' ? 'block' : 'none' }}>
              {/* Content for (posts) */}
                      <li className='Post-container w-[100%] p-3 flex flex-col gap-2 rounded-[7px]'>
                        <div className='User-name-Icon-container flex items-center justify-between w-[100%]'>
                            <div className='flex items-center gap-2'>
                                <div className='Avatar-container w-[4.5rem] h-[4.5rem] rounded-[50%] p-1 flex items-center justify-center'>
                                <img className='Avatar' src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
                                </div>
                                <div className='flex flex-col'>
                                <h3 className='text-[14px] font-bold'>User Name</h3>
                                <span className='text-[12px]'>Location</span>
                                </div>
                            </div>
                            <div className='h-[3rem]'>
                                <p className='top-0 right-0 text-[13px]'>4:08pm</p>
                            </div>
                          </div>
                          <div className='w-[100%] h-[18rem] bg-[#c6c6c6] rounded'>
            
            {/* Overlay */}
            <div className="inset-1 flex flex-col justify-between items-center px-4 py-2 h-[100%]">
              <div className='w-[100%] h-[20px]'></div>

              <div className='flex items-center w-[17rem] justify-between'>
                {/* Like button and count */}
                <div className="flex items-center mb-2">
                  <button className="flex items-center text-white px-1 py-1">
                    <FavoriteIcon className='mr-1 text-black text-3xl'/>
                  </button>
                  <span>100</span>
                </div>
                {/* Comments button and count */}
                <div className="flex items-center mb-2">
                  <button className="flex items-center text-white px-2 py-1" onClick={() => setShowComments(!showComments)}>
                    <svg
                      className='mr-1 text-black text-3xl'
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 0.666748C3.582 
                        0.666748 0 3.57608 0
                        7.16608C0 9.25341 1.21133
                        11.1107 3.09333 12.2994C3.672 13.7441
                        2.37133 14.9714 0.998667 15.3014C2.51267 15.4314 5.206 15.2207 7.248
                        13.6361C11.978 13.9947 16 10.9714 16 7.16608C16 3.57608 12.418
                        0.666748 8 0.666748Z"
                        fill="black"
                      />
                  </svg>
                  </button>
                  <span>5</span>
                </div>
                {/* Share button and count */}
                <div className="flex items-center mb-2">
                  <button className="flex items-center text-white px-2 py-1">
                    <svg
                      className='mr-1 text-black text-3xl'
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3.33333 4.66667C5.174 4.66667 6.66667 
                        6.15933 6.66667 8C6.66667 9.84067 5.174 11.3333
                        3.33333 11.3333C1.49267 11.3333 0 9.84067 0 8C0
                        6.15933 1.49267 4.66667 3.33333 4.66667ZM10.748
                        12.71C10.6993 12.9107 10.6667 13.1173 10.6667
                        13.3333C10.6667 14.806 11.8607 16 13.3333 16C14.806
                        16 16 14.806 16 13.3333C16 11.8607 14.806 10.6667
                        13.3333 10.6667C12.5567 10.6667 11.864 11.004 11.3767
                        11.534L7.718 9.58267C7.56467 10.0067 7.352 10.402 7.08933
                        10.7587L10.748 12.71ZM16 2.66667C16 1.194 14.806 0 13.3333
                        0C11.8607 0 10.6667 1.194 10.6667 2.66667C10.6667 2.88267
                        10.6993 3.08933 10.748 3.29L7.08933 5.24133C7.35267 5.598
                        7.56467 5.99267 7.718 6.41733L11.3767 4.466C11.864 4.996
                        12.5567 5.33333 13.3333 5.33333C14.806 5.33333 16 4.13933
                        16 2.66667Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
                      </li>
            </ul>
            
            <div className="tab-content-1" style={{ display: activeTab === 'tab2' ? 'block' : 'none' }}>
              {/* Content for (media collection) */}
              <h2>Media Collection</h2>
            </div>
          </div>
          </div>
      </section>
  )
}

export default Profile