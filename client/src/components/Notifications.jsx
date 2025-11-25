import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { notifications } from '../Data/notificationData'

function TrendCard() {
  return (
    <div className='flex flex-col gap-6 dark:bg-gray-800 bg-[#ffffffa3] rounded-xl p-4 shadow-[#ff9a3b] dark:shadow-[#ff9a3b] dark:shadow-xsoft shadow-soft'>
      <div className='flex items-center gap-2 font-bold border-b border-[#ff9a3b] py-2'>
        <IoIosNotificationsOutline className='text-2xl hover:-translate-y-1 transition-all ease-in-out'/>
        Notfications
      </div>
      {notifications.map((notifi, id) => {
        return <div key={id} className='flex items-start gap-3 '>
          <img src={notifi.img} alt="dp" className="w-8 h-8 rounded-full flex-shrink-0"/> 
          <div className='text-sm leading-relaxed'><span className='font-semibold text-blue-600 cursor-pointer'>{notifi.username}</span> {notifi.notif}</div>         
        </div>
      })}
    </div>
  )
}

export default TrendCard
