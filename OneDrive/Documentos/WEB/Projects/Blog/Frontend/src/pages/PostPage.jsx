import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Editor, Comments } from "../components";
import { createComment } from "../helpers";
import { AiFillPlusCircle } from 'react-icons/ai';


export const PostPage = () => {
  const [comments, setComments] = useState("");
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [content, setContent] = useState('');
  const [coment, setComent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/post/getPost/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
          setLoading(response.status);
        });
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/comment/getAll/${id}`)
      .then(response => {
        response.json().then(comments => {
          setComments(comments);
        });
      });
  }, [showComments]);

  const deletePost = async () => {
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

  const handleSubmitComment = async (ev) => {
    ev.preventDefault();
    await createComment(content, id, setComent, setContent);

  };

  if (loading != 200) {
    return (
      <div className="spinner-container">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!postInfo) return '';
  const defaultImage = "https://www.lavanguardia.com/andro4all/hero/2023/10/foto-de-perfil-whatsapp.jpg?width=1200&aspect_ratio=16:9";

  //  console.log(postInfo)
  // console.log(postInfo.author?._id)


  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>
        {formatISO9075(new Date(postInfo.createdAt)) + ' ' +
          new Date(postInfo.createdAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }).split(' ')[1]}
      </time>

      <div className="author">
        by @{postInfo.author.username}
        <img className="image-username  mx-1" src={postInfo.author.UrlImg || defaultImage} alt="" />
      </div>


      {
        (userInfo?._id !== undefined) ? (
          (userInfo._id === postInfo.author?._id) ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
              <div className="edit-btn-container">
                <Link className="edit-btn" to={`/edit/${postInfo._id}`} style={{ textDecoration: 'none', padding: '10px' }} >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Editar Post
                </Link>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={deletePost} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer', width: '100%' }}>
                  <FontAwesomeIcon icon={faTrash}  /> Eliminar Post
                </button>
              </div>
            </div>
          ) : null
        ) : null
      }


      {
        (userInfo?._id !== undefined || userInfo?.id !== undefined) ? (
          (userInfo._id !== postInfo.author?._id || userInfo.id !== postInfo.author?.id) ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
              <button className="buttonStyle" onClick={() => setComent(true)}>
                <AiFillPlusCircle style={{ marginRight: '8px' }} /> Comentario
              </button>
              <button className="buttonStyle" onClick={() => setComent(false)}>
                <AiFillPlusCircle style={{ marginRight: '8px', transform: 'rotate(45deg)' }} />  Comentario
              </button>
            </div>
          ) : null
        ) : null

      }



      <div className="image" style={{ marginTop: '20px', marginBottom: '25px' }}>
        <img src={postInfo.cover} alt="" />
      </div>

      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />


      {(coment && userInfo.id !== postInfo.author._id) && (
        <>
          <Editor value={content} onChange={ev => setContent(ev)} />
          <button className="buttonStyle" onClick={handleSubmitComment}>Crear Comentario</button>
        </>
      )}

      <button className="buttonStyle" style={{ marginTop: '20px' }} onClick={() => setShowComments(!showComments)}> Comentarios </button>

      {showComments && (
        comments.map((comment, index) => (
          <Comments key={index} comment={comment} user={userInfo.id || userInfo._id} commentState={showComments} setComent={setShowComments} />
        ))
      )}


    </div>
  )
}
