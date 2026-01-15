import React from 'react'
import { PostsData } from '../Data/postData'
import SinglePost from './SinglePost'

function Posts({ activeCategory }) {
  const filteredPosts = activeCategory === 'All' 
    ? PostsData 
    : PostsData.filter(post => post.category === activeCategory);

  return (
    <div className='flex flex-col gap-4'>
      {filteredPosts.map((post, id) => (
        <div key={id}>
          <SinglePost data={post} />
        </div>
      ))}
    </div>
  )
}

export default Posts
