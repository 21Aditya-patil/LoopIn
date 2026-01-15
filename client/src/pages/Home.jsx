import React from 'react'
import Userside from '../components/Userside'
import Postside from '../components/Postside'
import Navside from '../components/Navside'
import MobileNav from '../components/MobileNav'

function Home() {
  return (
    <div className='relative lg:grid lg:grid-cols-[18rem_auto_20rem] gap-4 h-screen items-stretch'>
      <Userside />
      <MobileNav />
      <Postside withScroll={true} />
      <Navside />
    </div>
  )
}

export default Home
