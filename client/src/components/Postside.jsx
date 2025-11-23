import React from 'react'
import Postshare from './Postshare'
import MultiPosts from './MultiPosts'

function Postside() {
  return (
    <div className='flex flex-col max-h-screen overflow-y-auto gap-4 pb-20 lg:pb-4 pt-[80px] lg:pt-0'>
      <Postshare />
      <MultiPosts />
    </div>
  )
}

export default Postside
