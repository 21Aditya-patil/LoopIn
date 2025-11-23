import React from 'react'
import logo from '/logo.png'
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <div className='flex gap-3 items-center'>
      <img src={logo} alt="" className='h-10 w-10'/>
      <input type="text" placeholder='Search something...' className='outline-none p-2 text-base rounded-xl bg-white border border-slate-300'/>
      <FaSearch className='text-[#ff9a3b] text-base hover:text-[#fccc89] cursor-pointer'/>
    </div>
  )
}

export default Navbar
