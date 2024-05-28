import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { fileUpload } from "../helpers/fileUpload";
import { Editor } from "../components/Editor";
import Swal from "sweetalert2";

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
    ev.preventDefault();
    
    const psychologyKeywords = ['psicología', 'terapia', 'cognitivo', 'conductual', 'emocional', 'psiquiatría', 'mente', 'salud mental', 'trastorno', 'depresión', 'ansiedad', 'terapeuta'];
    
    let containsPsychologyContent = psychologyKeywords.some(keyword => content.toLowerCase().includes(keyword));

   if(!containsPsychologyContent || content.length < 100) {
     Swal.fire({
       title: 'Error',
       text: 'El contenido no es valido.',
       icon: 'error',
       confirmButtonText: 'Ok'
     });
     return;
   }


    if (!title.trim() || !summary.trim() || !content.trim() || files.length === 0) {
      Swal.fire({
          title: 'Error',
          text: 'Todos los campos deben estar llenos para crear un nuevo post.',
          icon: 'error',
          confirmButtonText: 'Ok'
      });
      return; 
     }

    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('cover', files);
    
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
        placeholder={'Titulo'}
        value={title}
        onChange={e => setTitle(e.target.value)}/>
      
      <input 
        type="text"
        placeholder={'Resumen'}
        value={summary}
        onChange={e => setSummary(e.target.value)}/>

      <input 
       type="file"
       onChange={onFileInputChange} />

      <Editor value={content} onChange={ev => setContent(ev)}/>

      <button style={{marginTop:'5px'}}>Publicar</button>
    </form>
  )
}
