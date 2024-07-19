import { app } from '@/app/firebase'
import Comments from '@/components/Comments'
import Post from '@/components/Post'
import ThemeSwitch from '@/components/ThemeSswitch'
import { doc,  getDoc, getFirestore } from 'firebase/firestore'
import Link from 'next/link'
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi'
const PostPage = async({params}) => {
  const db = getFirestore(app)
  let data = {}

  const querySnapshot =  await getDoc(doc(db, 'posts', params.id))
  data = {...querySnapshot.data(), id:querySnapshot.id}

  return (
    <div className='w-full  mx-auto  border-r border-l min-h-screen'>
      <div className='flex items-center justify-between space-x-2  py-2 px-3 sticky top-0 z-50 dark:bg-zinc-900 bg-white border-b border-gray-200'>
        <div className='flex items-center'>
          <Link href="/" className='hover:bg-gray-200 p-2 rounded-full'>
          <HiArrowLeft className='h-5 w-5'/>
          </Link>
          <h2 className='sm:text-lg'>Back</h2>
        </div>
        <div className='inline md:hidden'>
        <ThemeSwitch/>
        </div>
      </div>
     <Post post={data} id={data.id} />
     <Comments id={params.id}/>
    </div>
  )
}

export default PostPage