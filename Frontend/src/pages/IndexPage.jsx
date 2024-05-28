import { Post } from "../components"
import { useEffect, useState } from "react";

export const IndexPage = () => {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/api/post/getAllPost').then(response => {
      response.json().then(posts => {
        setPosts(posts);
        setLoading(response.status);
      });
    });
  }, []);
   

  return ( 
    <>
      {loading !=200 ? (
         <div className="spinner-container">
           <div className="spinner-border text-secondary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
         </div>
      
      ) : (
        posts.length > 0 && posts.map(post => (
          <Post key={post._id} {...post} />
        ))
      )}
  </>
  )
}


