import React from 'react'
import { FaHeart } from 'react-icons/fa6';
import { LiaTimesSolid } from 'react-icons/lia';

function SwiperCard({profile}) {
    return (
        <div className="relative bg-white shadow-md rounded-lg overflow-hidden h-[68vh]">
          <img src={profile.image} alt={profile.name} className="w-[100%] h-[100%] object-cover absolute" />
          <div className="p-4 absolute bottom-0 left-0 flex items-end justify-between w-[100%]">
                <h2 className="text-2xl font-bold mb-2 text-white flex gap-2">{profile.name} <span className='text-gray-300'>|</span> {profile.age}</h2>
                <div className='h-[6rem] w-[3rem] flex flex-col items-center justify-between'>
                    <button className='bg-gray-300 w-[2rem] h-[2rem] flex items-center justify-center rounded-[50%]'>
                        <LiaTimesSolid className='text-[15px] font-bold' />
                    </button>
                    <button className='w-[3rem] h-[3rem] rounded-[50%] flex items-center justify-center bg-white'>
                        <FaHeart />
                    </button>
                </div>
          </div>
        </div>
      );
}

export default SwiperCard