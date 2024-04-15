import React from 'react'
import "./NavbarStyles.css"

function Navbar({count = 1}) {
  return (
    <div className='Navbar top-0 fixed bg-white w-full flex items-center justify-between pl-6 pr-6 pt-3 pb-3'>
      <h1 className='text-2xl font-bold'>Home</h1>
      <div className='Notifications-btn w-10 h-10 flex items-center justify-center relative'>
        <svg className='Notificate-icon text-gray-700 text-3xl' width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.137 3.945C12.493 3.571 12.095 
           2.875 12.096 2.125V2.122C12.097 0.95 11.158 0 10 0C8.842 0 7.903 0.95 7.903
           2.122V2.125C7.904 2.876 7.507 3.571 6.862 3.945C2.195 6.657 4.877 15.66 0
           17.251V19H20V17.251C15.123 15.66 17.805 6.657 13.137 3.945ZM10 1C10.552 1 11 1.449 11
           2C11 2.552 10.552 3 10 3C9.448 3 9 2.552 9 2C9 1.449 9.448 1 10 1ZM13 21C13 22.598 11.608
           24 10.029 24C8.45 24 7 22.598 7
           21H13Z" fill="black"
          />
        </svg>
          {count > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white 
               rounded-full px-[7px] py-[3px] text-xs
               text-bold flex items-center
               justify-center"
          >{count}</span>
          )}
      </div>
    </div>
  )
}

export default Navbar