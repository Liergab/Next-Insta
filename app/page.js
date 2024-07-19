
import Feed from '@/components/Feed'
import Input from '@/components/Input'
import ThemeSwitch from '@/components/ThemeSswitch'
import React from 'react'

const Home = () => {
  return (
    <section className=' max-w-full mx-auto dark:text-white text-black  border-r border-l xl:border-none '>
      <div className='flex item-center justify-between py-2 px-3 sticky top-0 bg-white dark:bg-zinc-900 border-b-2 border-gray-200 dark:border-zinc-900'>
        <h2>Home</h2>
        <div className='inline md:hidden'>
          <ThemeSwitch/>
        </div>
       
      </div>
      <Input/>
      <Feed/>
    </section>
  )
}

export default Home