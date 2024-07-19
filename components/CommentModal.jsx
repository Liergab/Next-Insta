/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react'
import { Snapshot, useRecoilState } from 'recoil'
import { modalState, postIdstate } from '@/atom/ModalAtom'
import Modal from 'react-modal'
import { HiX } from 'react-icons/hi'
import { useSession } from 'next-auth/react'
import { app } from '@/app/firebase'
import { addDoc, collection, doc, getFirestore, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

const CommentModal = () => {
  const db = getFirestore(app)
  const {data:session} = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const [postId, setPostId] =useRecoilState(postIdstate)
  const [input, setInput] = useState("")
  const [post, setPost] = useState({})
 const router = useRouter()
  useEffect(() => {
    if(postId !== ""){
      const postRef = doc(db, 'posts', postId)
      const unsubscribe = onSnapshot(
        postRef,
        (snapshot) => {
          if(snapshot.exists()){
            setPost(snapshot.data())
          }else{
            console.log('No such Documents')
          }
        }
      )
      return  () => unsubscribe()
    }
  },[postId])

  const sendComment = async () => {
    addDoc(collection(db, 'posts', postId, 'comments'),{
      name:session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      comment:input,
      timestamp: serverTimestamp()
    }).then(() => {
      setInput()
      setOpen(false)
      router.push(`/posts/${postId}`)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      {
        open && (
          <Modal
              isOpen={open}
              onRequestClose={() => setOpen(false)}
              ariaHideApp={false}
              className="mx-w-96 w-[90%] md:w-[50%] absolute top-24 left-[5%] md:left-[25%]  bg-white dark:bg-slate-800 border-2 border-gray-200 rounded-xl shadow-md"
          >
            <div className='p-4'>
              <div className='border-b border-gray-200 py-2 px-1.5'>
                <HiX  className='text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer' onClick={() => setOpen(false)}/>
              </div>
              <div className='p-2 flex  items-center space-x-1 relative'>
                <span className='w-0.5 h-full  absolute left-8 top-11 bg-gray-300' />
                <img src={post?.profileImage} alt="" className='w-11 h-11 rounded-full mr-4 z-10'/>
                <h4 className='font-bold text-[15px] hover:underline truncate'>{post?.name}</h4>
                <h4 className='text-[14px] hover:underline truncate'>@{post?.username}</h4>
                <p className='text-gray-500 text-[15px] mt-16 mb-2'>{post?.test}</p>
              </div>
              <div className='flex p-3 space-x-3'>
                <img src={session.user.image} alt=""  className='h-11 w-11 rounded-3xl cursor-pointer hover:brightness-95 z-10'/>
                <div className='w-full divide-y divide-gray-200'>
                  <div>
                    <textarea 
                    className='dark:bg-slate-800 w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 dark:text-gray-300 placeholder:text-gray-500 dark:placeholder:text-gray-200'
                    placeholder='Whats Happening'
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    >
                    </textarea>
                  </div>
                  <div className='flex items-center justify-end pt-2.5'>
                  <button disabled={input === ""}
                    className='rounded-full bg-sky-500 py-1  text-white
                    px-4 font-bold hover:brightness-95 disabled:opacity-50 '
                    onClick={sendComment}
                  
                  >
                    reply
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )
      }
    </div>
  )
}

export default CommentModal