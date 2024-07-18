import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore"
import { app } from "@/app/firebase"
import Post from "@/components/Post"
const Feed = async() => {
    const db = getFirestore(app)
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
        data.push({id:doc.id, ...doc.data()})
    })
    
  return (
    <div>
       { data.map((post) => (
         <Post key={post.id} post={post} id={post.id}/>
       ))}
    </div>
  )
}

export default Feed