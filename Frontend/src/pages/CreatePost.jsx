import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { fileUpload } from "../helpers/fileUpload";
import { Editor } from "../components/Editor";

export const CreatePost = () => {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  const  onFileInputChange =  async ({target}) => {
    if(target.files.length === 0) return;
    const file =  await fileUpload(target.files[0]);
    setFiles(file);
  }
  

  async function createNewPost(ev) {    
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('cover', files);

    ev.preventDefault();
    
    const response = await fetch('http://localhost:3000/api/post/create', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
        
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }


  return (
    <form  onSubmit={createNewPost}>
      <input 
        type="text"
        placeholder={'Title'}
        value={title}
        onChange={e => setTitle(e.target.value)}/>
      
      <input 
        type="text"
        placeholder={'Summary'}
        value={summary}
        onChange={e => setSummary(e.target.value)}/>

      <input 
       type="file"
       onChange={onFileInputChange} />

      <Editor value={content} onChange={ev => setContent(ev)}/>

      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  )
}
