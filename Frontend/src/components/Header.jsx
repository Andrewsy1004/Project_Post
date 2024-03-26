import { Link } from "react-router-dom"
import {useEffect, useContext, useState } from 'react';
import {UserContext} from "../context";
import axios from 'axios';

export const Header = () => {
  const {setUserInfo,userInfo} = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  useEffect(() => {
    if(isAuthenticated === 'true') {
      axios.get('http://localhost:3000/api/user/profile', { withCredentials: true })
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => console.error("Error fetching user info:", error));
    }
  }, [isAuthenticated]);
  
  async function logout() {
    fetch('http://localhost:3000/api/user/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    localStorage.setItem('isAuthenticated', 'false');
  }

  const username = userInfo?.username;
  

  return (
    <header> 
       <Link to="/" className='logo'>  MyBlog </Link>
        <nav>
         {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout <b>{username}</b></a>
          </>
         )}
         {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        </nav>
    </header>
  )
}
