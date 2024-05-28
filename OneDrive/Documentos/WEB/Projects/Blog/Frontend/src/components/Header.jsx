import { Link } from "react-router-dom"
import {useEffect, useContext, useState } from 'react';
import {UserContext} from "../context";
import axios from 'axios';
import '../styles/header.css'

export const Header = () => {
  const {setUserInfo,userInfo} = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/login/success', { withCredentials: true });
        //console.log(response.data); 
        
        setUserInfo(response.data);
        localStorage.setItem('isAuthenticated', 'true');        
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, []);


  useEffect(() => {
    if(isAuthenticated === 'true') {
      axios.get('http://localhost:3000/api/user/profile', { withCredentials: true })
        .then(response => {
          //console.log(response.data);
          setUserInfo(response.data);
        })
        .catch(error => console.error("Error fetching user info:", error));
    }
  }, [isAuthenticated]);
  
  const username = userInfo?.username;
  


  async function logout() {
    const username = userInfo?.username;
  
    if (username && username.includes('@gmail.com') && isAuthenticated === 'true') {
      setUserInfo(null);
      localStorage.setItem('isAuthenticated', 'false');
      window.open("http://localhost:3000/auth/logout", "_self");       
    } else if(username && isAuthenticated === 'true') {
      try {
        await fetch('http://localhost:3000/api/user/logout', {
          credentials: 'include',
          method: 'POST',
        });
        setUserInfo(null);
        localStorage.setItem('isAuthenticated', 'false');
        // Redirigir al usuario a la página principal u otra página
        window.location.href = "/";
      } catch (error) {
        console.error("Error cerrando sesión:", error);
      }
    }
  }
  
   const defaultImage = "https://www.lavanguardia.com/andro4all/hero/2023/10/foto-de-perfil-whatsapp.jpg?width=1200&aspect_ratio=16:9";
   
  //  console.log(userInfo?.UrlImg);
  
  return (
    <header> 
       <Link to="/" className='logo'>  MentalHealth </Link>
        <nav>
         {username && (
          <>
            <Link to="/institutions">Instituciones</Link>
            <Link to="/aboutus">Sobre Nosotros</Link>
            <Link to="/create">Crear Articulo</Link>
            
            <div className="author-container">
              <img className="author-image" src={userInfo?.UrlImg || defaultImage} alt=""/>
              <a onClick={logout} className="logout-link">Salir <b>{username}</b></a>
            </div>
          
          </>
         )}
         {!username && (
          <>
            <Link to="/institutions">Instituciones</Link>
            <Link to="/aboutus">Sobre Nosotros</Link>
             <Link to="/login">Iniciar Sesion</Link>
             <Link to="/register">Registrar</Link>
          </>
        )}
        </nav>
    </header>
  )
}
