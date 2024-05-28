import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post animate__animated animate__fadeInLeft">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={cover} alt='' />
        </Link>
      </div>

      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author"> Escrito: {author.username}</a>
          <time>
            {formatISO9075(new Date(createdAt)) + ' ' +
              new Date(createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }).split(' ')[1]}
          </time>
        </p>

        <p className="summary">{summary}</p>
      </div>
    </div>
  )
}
