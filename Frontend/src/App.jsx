import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LayoutNavbar } from './layout';
import { CreatePost, IndexPage, LoginPage, PostPage, RegisterPage, EditPost} from './pages';
import { UserContextProvider } from './context/UserContext.jsx';

export const App = () => {
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

          
        </Route>
      </Routes>
    </UserContextProvider>
  )
}
