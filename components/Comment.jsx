/* eslint-disable @next/next/no-img-element */
import { app } from "@/app/firebase"
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from "react-icons/hi"
import { signIn, useSession } from 'next-auth/react';


const Comment = ({comment, commentId, originalPostId}) => {
    const{data:session} = useSession()
    const db =  getFirestore(app)
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);

    const likePost = async () => {
        if (session) {
          try {
            if (isLiked) {
              await deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId, "likes", session.user.uid));
            } else {
              await setDoc(doc(db, 'posts', originalPostId, "comments" , commentId, "likes", session.user.uid), {
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
        const unsubscribe = onSnapshot(collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'), (snapshot) => {
          setLikes(snapshot.docs);
        });
    
        return () => unsubscribe();
      }, [db, originalPostId, commentId]);
      
      useEffect(() => {
        if (session) {
          setIsLiked(likes.some((like) => like.id === session.user.uid));
        }
      }, [likes, session]);
  return (
    <div className='flex  p-3  border-b border-gray-200 pl-10'>
    <img src={comment?.userImg} alt="post-image" className='rounded-full w-9 h-9 mr-4' />
    <div className='flex-1'>
      <div className=' flex items-center justify-between'>
          <div className='flex flex-col items-center  whitespace-nowrap'>
              <h4 className='font-bold text-sm truncate'>{comment?.name}</h4>
              {/* <span className='text-xs truncate'>@{post?.username}</span> */}
          </div>
          <HiDotsHorizontal className='text-sm'/>
      </div>
      
      <p className='text-[14px] my-3'>{comment?.comment}</p>
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
     
    </div>
  </div>
  )
}

export default Comment