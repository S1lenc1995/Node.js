import { Link } from "react-router-dom";
import "./PostCard.scss"
const PostCard = ({el, cut}) =>{
    const {author, createDate, id, text, title} = el
    return(
        <Link to={`/post/${id}`}>
        <div className="post-card" key={id} id={id}>
            <h5>{title}</h5>
            {cut?<p>{text.substring(0, 30)}...</p>:<p>{text}</p> }
            <p>{createDate}</p>
            <p>{author}</p>
            <></>
        </div>
        </Link>
    )
}

PostCard.defaultProps = {
    cut: false
  }

export default PostCard