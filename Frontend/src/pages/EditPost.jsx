import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import { fileUpload } from "../helpers/fileUpload.js";
import { Editor } from "../components/Editor";

export const EditPost = () => {
   const {id} = useParams();
   const [title,setTitle] = useState('');
   const [summary,setSummary] = useState('');
   const [content,setContent] = useState('');
   const [files, setFiles] = useState('');
   const [redirect,setRedirect] = useState(false);
   
   useEffect(() => {
    fetch(`http://localhost:3000/api/post/getPost/${id}`)
    .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, [id]);
  
  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('id', id);
    data.append('cover', files);
    
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    const response = await fetch('http://localhost:3000/api/post/editPost', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }
  
  const  onFileInputChange =  async ({target}) => {
    if(target.files.length === 0) return;
    const file =  await fileUpload(target.files[0]);
    setFiles(file);
  }
  
  return (
    <form onSubmit={updatePost}>
    <input 
       type="text"
       placeholder={'Title'}
       value={title}
       onChange={ev => setTitle(ev.target.value)} />
    
    <input 
       type="text"
       placeholder={'Summary'}
       value={summary}
       onChange={ev => setSummary(ev.target.value)} />
    
    <input 
        type="file"
        onChange={onFileInputChange} />
    
    <Editor onChange={setContent} value={content} />
    
    <button style={{marginTop:'5px'}}>Update post</button>
  </form>  
  )
}
