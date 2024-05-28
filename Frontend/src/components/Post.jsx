import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

export const Post = ({_id,title,summary,cover,content,createdAt,author}) => {
  return (
    <div className="post animate__bounceInLeft animate__animated">
      <div className="image">
       <Link to={`/post/${_id}`}>
         <img src={cover} alt=''  />
       </Link>
      </div>       

     <div className="texts">
       <Link to={`/post/${_id}`}>
         <h2>{title}</h2>
       </Link>
       <p className="info">
         <a className="author"> By {author.username}</a>
         <time>{formatISO9075(new Date(createdAt))}</time>
       </p>

       <p className="summary">{summary}</p>
    </div>
 </div>
  )
}
