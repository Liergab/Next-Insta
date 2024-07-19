'use client'
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "@/app/firebase";
import Post from "@/components/Post";

const Feed = () => {
  const [data, setData] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    // Define the query
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    // Set up the real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setData(posts);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [db]);

  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} post={post} id={post.id} />
      ))}
    </div>
  );
}

export default Feed;