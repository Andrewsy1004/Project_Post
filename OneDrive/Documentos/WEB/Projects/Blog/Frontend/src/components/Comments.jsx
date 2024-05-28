import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { formatISO9075 } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash,faTimes  } from '@fortawesome/free-solid-svg-icons';
import { Editor} from "../components";
import { useState } from 'react';

export const Comments = ({ comment,user,commentState,setComent }) => { 
  const [showEditor, setShowEditor] = useState(false);
  const [content, setContent] = useState(comment.comment);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const saveComment = () => {
    const data = new FormData();
    data.append('comment', content);
    data.append('id', comment._id);

    fetch('http://localhost:3000/api/comment/update', {
      method: 'PATCH',
      body: data,
      credentials: 'include',
    })
    setComent(!commentState);
    setShowEditor(!showEditor);
  }

  const deleteComment = async () => {
    const id = comment._id;
    fetch('http://localhost:3000/api/comment/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ id: id }),
      credentials: 'include',
    });
    setComent(!commentState);
  }
  
  // console.log(comment)
  // console.log("use",user)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="comentario"
      style={{ position: 'relative' }} 
    >
     
     {user !== undefined ?(
           (user === comment.author._id)? (
            <>
              <button className="edit-icon-button" onClick={() => setShowEditor(!showEditor)}>
                <FontAwesomeIcon icon={faEdit} style={{ color: 'black' }} />
              </button>
              
              <button className="quit2-icon-button" onClick={deleteComment}>
                 <FontAwesomeIcon icon={faTimes } style={{ color: 'red' }} />
              </button>
            </>
          ): null 
        ):null 
     }
   
      <div className="contenido-comentario" dangerouslySetInnerHTML={{ __html: comment.comment }} />
      <div className="autor-comentario">
        <b>Por: {comment.author.username}</b>
      </div>
      <time>{formatISO9075(new Date(comment.createdAt))}</time>
      
      {
       showEditor ?(  
         <>
          <Editor value={content} onChange={ev => setContent(ev)} />
           <button className="save-icon-button" onClick={saveComment}>
              <FontAwesomeIcon icon={faSave} style={{ color: 'black' }} />
           </button> 
           
           <button className="quit-icon-button" onClick={() => setShowEditor(!showEditor)}>
              <FontAwesomeIcon icon={faTrash} style={{ color: 'red',opacity: '0.3' }} />
           </button>

         </> 
        ):null
     } 

    </motion.div>
  );
};
