import React from 'react'
import Navbar from '../../layouts/Navbar/Navbar'

function Home() {
  return (
    <div className='flex items-center justify-center flex-col w-screen h-screen bg-blue-500'>
      <Navbar />
      {/* other things like posts component here*/}
    </div>
  )
}

export default Home