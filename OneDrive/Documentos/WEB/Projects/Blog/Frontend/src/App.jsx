import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LayoutNavbar } from './layout';
import { CreatePost, IndexPage, LoginPage, PostPage, RegisterPage, EditPost,Institutions,AboutUs,Chat } from './pages';
import { UserContextProvider } from './context/UserContext.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

export const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const [showChat, setShowChat] = useState(false);
 
  const onclick = () => {
    setShowChat(!showChat);
  }
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<LayoutNavbar/>}>
          <Route index element={<IndexPage/> } />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/edit/:id" element={<EditPost/>} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/aboutus" element={<AboutUs/>} />
          
        </Route>
      </Routes>
      
      {
        isAuthenticated==='true' ? (
          <div className="chat-icon">
            <FontAwesomeIcon icon={faComments} size="3x" onClick={onclick}/>
          </div>
        ): null
      }
      
      {showChat && <Chat />}

    </UserContextProvider>
  )
}
