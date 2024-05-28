import axios from 'axios';
import Swal from 'sweetalert2';

export const login = async (username, password,setUserInfo,setRedirect) => {
    try {
        const response = await axios.post('http://localhost:3000/api/user/login', {
          username,
          password
        }, {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        });
        
        // Si el login es exitoso
        const userInfo = response.data;
        setUserInfo(userInfo);
        setRedirect(true);
        
        localStorage.setItem('isAuthenticated', 'true');
  
      } catch(error) {
        if (error.response && error.response.data) {
            Swal.fire({
              icon: 'error', 
              title: 'Error',
              text: error.response.data.msg 
            });
        }
      }
}