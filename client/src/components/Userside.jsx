import React from 'react'
import Navbar from './Navbar'
import Usercard from './Usercard'
import Followersactivitycard from './Followersactivitycard'

function Userside() {
  return (
    <div className='hidden lg:flex flex-col gap-4 items-center overflow-auto'>
       <Navbar />
       <Usercard/>
       <Followersactivitycard />  
    </div>
  )
}

export default Userside
