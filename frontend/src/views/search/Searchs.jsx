import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function Searchs() {
  return (
      <section className='Search-Container flex items-center justify-center h-[100vh] bg-white '>
          <div className='Search-Wrapper h-[100%] w-[100%]'>
              <div className='Search-nav h-[60px] bg-white flex items-center justify-between pl-6 pr-6'>
                  <h1 className='text-2xl font-bold'>Search</h1>
                  <button className='text-[17px]'>Filter</button>
              </div>
              <hr/>
              <div className='Search-container pl-6 pr-6 pt-2'>
                  <div className='bg-gray-200 rounded-[9px] flex items-center gap-1 pl-4 pr-2 h-[50px]'>
                      <span>
                          <SearchIcon/> 
                      </span>
                      <input type='text' placeholder='Search for friends...' className='bg-transparent w-[70%]'/>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default Searchs