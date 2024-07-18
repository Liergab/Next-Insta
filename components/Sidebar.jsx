/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import ThemeSwitch from './ThemeSswitch'
import { FaXTwitter } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
const Sidebar = () => {
  const{data:session} = useSession()
  console.log(session)
  return (
    <section className='flex flex-col justify-between h-screen gap-4 p-3'>
      <div className='flex flex-col justify-between items-center  gap-4 p-3'>
      <Link href="/">
        <FaXTwitter className='w-16 h-16 cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-300 rounded-full p-2 transition-all duration-300' />
      </Link>
      <Link href="/" className='flex items-center space-x-2 px- dark:hover:bg-slate-700  hover:bg-gray-300 rounded-full transition-all duration-300 p-3 gap-2 w-fit'>
        <AiFillHome className='w-7 h-7 cursor-pointer '/>
        <span className='test-xl font-bold hidden xl:inline'>HOME</span>
      </Link>
     {session ? (
      <button onClick={() => signOut()}
      className='border font-bold border-slate-400 px-10 py-2 rounded-md bg-slate-300 dark:bg-transparent dark:hover:bg-slate-950 hover:brightness-95 transition-all duration-300 shadow-md hidden xl:inline'>
        SIGN OUT
      </button>
     ):(
      <button onClick={() => signIn()}
        className='border font-bold border-slate-400 px-10 py-2 rounded-md bg-slate-300 dark:bg-transparent dark:hover:bg-slate-950 hover:brightness-95 transition-all duration-300 shadow-md hidden xl:inline'>
          SIGN IN
        </button>
     )}
        
      <ThemeSwitch/> 
      </div>
      {session && 
        <div className='flex items-center gap-2 hover:bg-gray-300 rounded-full p-2 transition-all duration-300 w-fit'> 
          <img src={session.user.image} alt={session.user.name} className='w-10 h-10 rounded-full' />
          <div className='hidden xl:inline'>
          <h4 className='test-sm'>{session.user.name}</h4>
          <h4 className='test-xs text-slate-500'>@{session.user.username}</h4>
          </div>
        </div>
      }
      
    </section>
  )
}

export default Sidebar