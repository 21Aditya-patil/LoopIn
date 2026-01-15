import React from 'react'
import Navbar from './Navbar'
import Followersactivitycard from './Followersactivitycard'
import InfoCard from './InfoCard'


function AccountLeft() {
  return (
    <div className='hidden lg:flex flex-col gap-4 overflow-auto'>
      <Navbar />
      <InfoCard />
      <Followersactivitycard />
    </div>
  )
}

export default AccountLeft
