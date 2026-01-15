import React from 'react'
import { FaRegHeart, FaRegComment, FaRegBookmark,FaShare  } from "react-icons/fa";

function SinglePost({data}) {
  return (
    <div className='flex flex-col p-4 dark:bg-gradient-to-br from-slate-800 via-slate-900 to-neutral-900 bg-[#ffffffa3] shadow-[#ff9a3b] dark:shadow-[#ff9a3b] dark:shadow-xsoft shadow-soft rounded-2xl gap-4'>
      <div className='flex items-center pb-1 gap-2'>
        <img src={data.img} alt="dp" className="w-8 h-8 rounded-full"/>
        <h1 className='font-bold text-xl'>{data.name}</h1>
      </div>
      {data.desc}
      <img src={data.img} alt="image" className='w-full rounded-xl max-h-80 object-cover' />
      <div className='flex gap-4 items-center'>
        <div className='flex gap-1 items-center'>
            <FaRegHeart />{data.likes}
        </div>
        <div className='flex gap-1 items-center'>
            <FaRegComment />
            2000
        </div>
        <div className='flex gap-1 items-center'>
            <FaRegBookmark />
            45
        </div>
        <div className='flex gap-1 items-center'>
            <FaShare />
            45
        </div>
      </div>
    </div>
  )
}

export default SinglePost
