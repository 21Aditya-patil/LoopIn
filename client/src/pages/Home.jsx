import React from 'react'
import Userside from '../components/Userside'
import Postside from '../components/Postside'
import Navside from '../components/Navside'
import MobileNav from '../components/MobileNav'

function Home() {
  return (
    <div className='relative xl:flex justify-center items-center'>
      <div className='relative lg:grid grid-cols-[18rem_auto_20rem] xl:grid-cols-[22rem_50rem_26rem] gap-10 '>
        <Userside />
        <MobileNav />
        <Postside />
        <Navside />
      </div>
    </div>
  )
}

export default Home
