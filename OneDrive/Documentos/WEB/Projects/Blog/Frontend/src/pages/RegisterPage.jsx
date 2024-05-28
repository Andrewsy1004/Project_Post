import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock,faIdCard,faUser,faImage } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import {registerUser} from '../helpers';
import {UserContext} from "../context";
import {Navigate} from "react-router-dom";
import { fileUpload } from "../helpers/fileUpload";


export const RegisterPage = () => {
  const [FullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUserInfo} = useContext(UserContext);
  const [redirect,setRedirect] = useState(false);
  const [UrlImg, setUrlImg] = useState('');



  async function register(ev) {
    ev.preventDefault();
    await registerUser( FullName, username, password, setUserInfo, setRedirect, UrlImg);
  }
   
  const  onFileInputChange =  async ({target}) => {
    if(target.files.length === 0) return;
    const file =  await fileUpload(target.files[0]);
    setUrlImg(file);
  }
  
  if(redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>

      <div className="input-icon-container">
        <FontAwesomeIcon icon={faUser} className="input-icon" />
        <input 
         type="text" 
         placeholder="Nombre Completo"
         value={FullName}
         onChange={e => setFullName(e.target.value)} />
      </div>

      <div className="input-icon-container">
        <FontAwesomeIcon icon={faIdCard} className="input-icon" />
        <input 
         type="text" 
         placeholder="Usuario"
         value={username}
         onChange={e => setUsername(e.target.value)} />
      </div>
    
      <div className="input-icon-container">
        <FontAwesomeIcon icon={faLock} className="input-icon" />
        <input 
         type="password" 
         placeholder="Contraseña"
         value={password}
         onChange={e => setPassword(e.target.value)} />
      </div>
      
      <label htmlFor="image-upload" className="custom-file-input">
       <FontAwesomeIcon icon={faImage} className="input-icon_img" />
       <span className="placeholder-text">Foto de perfil</span> 
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onClick={onFileInputChange}
          style={{ display: 'none' }} 
        />
      </label> 
      
      <button>Registrar</button>
    </form>
  )
}
