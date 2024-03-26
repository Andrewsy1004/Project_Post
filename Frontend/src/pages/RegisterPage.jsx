import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock,faIdCard,faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import {registerUser} from '../helpers';
import {UserContext} from "../context";
import {Navigate} from "react-router-dom";


export const RegisterPage = () => {
  const [FullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUserInfo} = useContext(UserContext);
  const [redirect,setRedirect] = useState(false);


  async function register(ev) {
    ev.preventDefault();
    await registerUser( FullName, username, password, setUserInfo, setRedirect );
  }
  

  if(redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="register animate__backInRight animate__animated" onSubmit={register}>
      <h1>Register</h1>

      <div className="input-icon-container">
        <FontAwesomeIcon icon={faUser} className="input-icon" />
        <input 
         type="text" 
         placeholder="Full Name"
         value={FullName}
         onChange={e => setFullName(e.target.value)} />
      </div>

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

      <button>Register</button>
    </form>
  )
}
