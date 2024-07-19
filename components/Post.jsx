/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import Icon from './Icon'

const Post = ({post, id}) => {
  return (
    <div className='flex  p-3  border-b border-gray-200 dark:border-zinc-900'>
      <img src={post?.profileImage} alt="post-image" className='rounded-full w-12 h-12 mr-4' />
      <div className='flex-1'>
        <div className=' flex items-center justify-between'>
            <div className='flex flex-col items-center  whitespace-nowrap'>
                <h4 className='font-bold text-sm truncate'>{post?.name}</h4>
                {/* <span className='text-xs truncate'>@{post?.username}</span> */}
            </div>
            <HiDotsHorizontal className='text-sm'/>
        </div>
        <Link href={`/posts/${id}`}>
        <p className='test-sm my-3'>{post?.text}</p>
        </Link>
        <Link href={`/posts/${id}`}>
        <img src={post?.image}  className='rounded-2xl mr-2  cursor-pointer' />
        </Link>
        <Icon id={id} uid={post.uid}/>
      </div>
    </div>
  )
}

export default Post
