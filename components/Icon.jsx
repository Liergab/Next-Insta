"use client";
import React, { useEffect, useState } from 'react';
import { HiHeart, HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from 'react-icons/hi';
import { signIn, useSession } from 'next-auth/react';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { app } from '@/app/firebase';


const Icon = ({ id, uid }) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const db = getFirestore(app);

  const likePost = async () => {
    if (session) {
      try {
        if (isLiked) {
          await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
        } else {
          await setDoc(doc(db, 'posts', id, "likes", session.user.uid), {
            username: session.user.username,
            timestamp: serverTimestamp()
          });
        }
      } catch (error) {
        console.error("Error liking the post: ", error);
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      setLikes(snapshot.docs);
    });

    return () => unsubscribe();
  }, [db, id]);

  useEffect(() => {
    if (session) {
      setIsLiked(likes.some((like) => like.id === session.user.uid));
    }
  }, [likes, session]);

  const handleDelete = async () => {
    if(window.confirm('Are you want to delete this post?')){
      if(session?.user.uid === uid){
        deleteDoc(doc(db,'posts', id)).then(() => {
          console.log('Document deleted')
          location.reload()
         }).catch((error) => {
          console.log(error)
         })
      }else{
        alert('You are not authorize to delete this post!')
      }
    }
  }

  return (
    <div className='flex justify-start gap-5 p-4'>
    <h1 className='hidden'>Hello</h1>
      <HiOutlineChat
        className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100'
      />
      <div className='flex items-center'>
      {isLiked ? (
        <HiHeart
          onClick={likePost}
          className='h-8 w-8 cursor-pointer rounded-full transition text-red-600 duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
        />
      ) : (
        <HiOutlineHeart
          onClick={likePost}
          className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
        />
      )}
      {likes.length > 0 && <span className="text-xs text-red-500">{likes.length}</span>}
      </div>
     
     {session?.user?.uid === uid && (
        <HiOutlineTrash
        onClick={handleDelete}
        className='h-8 w-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
      />

     )}
    
    </div>
  );
};

export default Icon;
