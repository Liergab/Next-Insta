
import Feed from '@/components/Feed'
import Input from '@/components/Input'
import React from 'react'

const Home = () => {
  return (
    <section className=' max-w-full mx-auto dark:text-white text-black  border-r border-l xl:border-none '>
      <div className='py-2 px-3 sticky top-0  border-b border-gray-200'>
        <h2>Home</h2>
      </div>
      <Input/>
      <Feed/>
    </section>
  )
}

export default Home