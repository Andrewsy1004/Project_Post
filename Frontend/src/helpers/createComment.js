import Swal from 'sweetalert2';

export const createComment = async (content, id, setCommentStatus, clearContent) => {
    const data = new FormData();
    data.append('comment', content);
    data.append('post', id);
    
    try {
      const response = await fetch('http://localhost:3000/api/comment/create', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      
      setCommentStatus(false);
      clearContent('');
      
    } catch (error) {
       Swal.fire({
         title: 'Error',
         text: error.toString(),
         icon: 'error',
         confirmButtonText: 'Ok'
      });
    }
  };
  
  