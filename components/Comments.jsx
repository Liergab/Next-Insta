"use client"
import { app } from '@/app/firebase'
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'

const Comments = ({id}) => {

    const db = getFirestore(app)
    const [comments, setComments] = useState([])

    useEffect(() => {
        onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
            setComments(snapshot.docs)
        })
    },[db, id])
  return (
    <div>
        {
            comments.map((comment) => (
                <Comment key={comment.id} comment={comment.data()} commentId={comment.id} originalPostId={id}/>
            ))
        }
    </div>
  )
}

export default Comments