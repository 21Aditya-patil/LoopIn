import React from 'react'
import Userside from '../components/Userside'
import Postside from '../components/Postside'
import Navside from '../components/Navside'
import MobileNav from '../components/MobileNav'

function Home() {
  return (
    <div className='relative lg:overflow-hidden lg:h-[calc(100vh-2rem)] lg:grid lg:grid-cols-[18rem_auto_20rem] gap-4 min-h-[calc(100vh-2rem)] items-stretch'>
      <Userside />
      <MobileNav />
      <Postside withScroll={true} />
      <Navside />
    </div>
  )
}

export default Home
