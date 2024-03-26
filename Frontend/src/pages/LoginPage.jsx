import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock,faIdCard } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';
import {UserContext} from "../context";
import {Navigate} from "react-router-dom";
import axios from 'axios';
import { login } from '../helpers';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  

  const handleLoginClick = async (e) => {
    e.preventDefault();
    await login(username, password,setUserInfo,setRedirect);
  }
  
  if(redirect) {
    return <Navigate to={'/'} />;
  }
  
  return (
    <form className="login animate__backInLeft animate__animated" onSubmit={handleLoginClick}>
     <h1>Login</h1>

      <div className="input-icon-container">
        <FontAwesomeIcon icon={faIdCard} className="input-icon" />
        <input 
         type="text" 
         placeholder="Username"
         value={username}
         onChange={e => setUsername(e.target.value)} />
      </div>
    
      <div className="input-icon-container">
        <FontAwesomeIcon icon={faLock} className="input-icon" />
        <input 
         type="password" 
         placeholder="Password"
         value={password} 
         onChange={e => setPassword(e.target.value)} />
      </div>
    
     <button>Login</button>
    </form>
  )
}
