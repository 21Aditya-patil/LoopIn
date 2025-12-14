import React from 'react'
import cover from '/cover.jpg'
import dp from '/one.jpg'
import { Link } from 'react-router-dom'

function Usercard() {
  return (
    <div className='flex flex-col w-full rounded-2xl border dark:border-gray-600 border-gray-200 relative gap-4 dark:bg-gray-800 bg-[#ffffffa3] p-2 pb-2 shadow-[#ff9a3b] dark:shadow-xsoft shadow-soft'>
      <div className='relative flex flex-col justify-center items-center'>
        <img src={cover} alt="bg" className='w-full object-cover rounded-xl'/>
        <img src={dp} alt="dp" className='absolute w-24 rounded-full -bottom-12 shadow-lg shadow-gray-900 hover:-translate-y-2 transition-all ease-in-out cursor-pointer object-cover'/>
      </div>

      <div className='flex flex-col items-center mt-12 gap-1'>
        <span className='font-bold'>Vineet</span>
        <span>Web Devloper</span>
      </div>

      <div>
        <hr className='mx-6 border border-gray-400' />

        <div className='flex flex-row items-center gap-6 justify-evenly'>
            <div className='flex flex-col items-center justify-center'>
                <span className='font-bold text-lg'>255</span>
                <span>Followers</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <span className='font-bold text-lg'>255</span>
                <span>Following</span>
            </div>
        </div>
        <hr className='mx-6 border border-gray-400' />
      </div>
      <Link to="/account" className='self-center font-bold text-[#ff9a3b] hover:text-[#fccc89] cursor-pointer'>My Profile</Link>
    </div>
  )
}

export default Usercard
