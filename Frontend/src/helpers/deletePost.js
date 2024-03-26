import Swal from 'sweetalert2';

export const deletePost = async (id, navigate) => {
  try {
    const response = await fetch(`http://localhost:3000/api/post/deletePost/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const responseData = await response.json(); 
    Swal.fire({
      title: 'Success - Post deleted',
      text: responseData.message, 
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });

  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.toString(),
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }
};

