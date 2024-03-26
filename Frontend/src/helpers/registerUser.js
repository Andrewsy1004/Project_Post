import axios from 'axios';
import Swal from 'sweetalert2';

export const registerUser = async ( FullName, username, password, setUserInfo, setRedirect) => {
  try {
    const userData = {
      FullName,
      username,
      password
    }

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
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.errors && error.response.data.error.errors.length > 0) {
      errorMessage = "The registration failed: " + error.response.data.error.errors[0].msg;
    }

    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Ok'
    });

  }
}
