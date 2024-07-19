/* eslint-disable @next/next/no-img-element */

'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { HiOutlinePhotograph } from "react-icons/hi";
import { app } from '@/app/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'

const Input = () => {
  const { data: session } = useSession();
  const imagePickRef = useRef(null)
  const [text, setText] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const db = getFirestore(app)

  const addImageToPost = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setImageFileUrl(URL.createObjectURL(file))
      console.log(imageFileUrl)
    }
  }

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage()
    }
  }, [selectedFile])

  const uploadImageToStorage = () => {
    setImageFileUploading(true)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + "-" + selectedFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, selectedFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error)
        setImageFileUploading(false)
        setImageFileUrl(null)
        setSelectedFile(null)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        setImageFileUrl(downloadURL)
        setImageFileUploading(false)
      }
    )
  }

  const handleSubmit = async () => {
    setPostLoading(true)
    const docRef = await addDoc(collection(db, 'posts'), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      text: text,
      profileImage: session.user.image,
      image: imageFileUrl,
      timestamp: serverTimestamp()
    })
    setPostLoading(false)
    setText('')
    setImageFileUrl(null)
    setSelectedFile(null)
    // location.reload()
  }

  if (!session) return null;

  return (
    <div className='flex border-b border-gray-200 dark:border-zinc-900 w-full p-4 space-x-3'>
      <img src={session?.user?.image} alt="img" className='w-11 h-11 cursor-pointer rounded-full' />
      <div className='w-full divide-y divide-gray-200 dark:divide-zinc-900'>
        <textarea className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700'
          placeholder='Whats Happening' rows="2"
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
        {
          selectedFile && (
            <div>
              <img src={imageFileUrl} alt="image" 
              className={`w-full max-h-[250px] object-cover cursor-pointer ${imageFileUploading ? 'animate-pulse' : ''}`} />
            </div>
          )
        }
        <div className='flex justify-between items-center pt-2.5'>
          <HiOutlinePhotograph
            onClick={() => imagePickRef.current.click()}
            className='h-10 w-10 text-sky-500 p-2 hover:bg-sky-200 rounded-full cursor-pointer' />
          <input type="file" onChange={addImageToPost} className='hidden' ref={imagePickRef} accept='image/*' />
          <button disabled={text.trim() === '' || postLoading || imageFileUploading}
            className='rounded-full bg-sky-500 py-1 
            px-4 font-bold hover:brightness-95 disabled:opacity-50 '
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default Input
