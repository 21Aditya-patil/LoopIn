import React from 'react'
import { PostsData } from '../Data/postData'
import SinglePost from './SinglePost'

function Posts() {
  return (
    <div className='flex flex-col gap-4'>
      {PostsData.map((post, id) => (
        <div key={id}>
          <SinglePost data={post} />
        </div>
      ))}
    </div>
  )
}

export default Posts
