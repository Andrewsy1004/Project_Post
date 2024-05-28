import axios from 'axios';
import Swal from 'sweetalert2';

export const registerUser = async (FullName, username, password, setUserInfo, setRedirect, UrlImg) => {
  try {
    
    if (!FullName || !username || !password || !UrlImg) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return; 
    }

    if (password.length < 0) {
      Swal.fire({
        title: 'Error',
        text: 'Password must be at least 8 characters long.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return; 
    }

    const userData = {
      FullName,
      username,
      password,
      UrlImg
    };

    const response = await axios.post('http://localhost:3000/api/user/register', userData, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    });

    const userInfo = response.data;
    setUserInfo(userInfo);
    setRedirect(true);

    localStorage.setItem('isAuthenticated', 'true'); 

  } catch (error) {
    let errorMessage = "The registration failed.";
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.errors) {
      errorMessage = error.response.data.error.errors.map(e => e.msg).join(', ');
    }

    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }
}
