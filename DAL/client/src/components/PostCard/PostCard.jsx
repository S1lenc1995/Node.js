import { Link } from "react-router-dom";
import "./PostCard.scss"
const PostCard = ({el, cut}) =>{
    const {author, createDate, id, text, title} = el
    return(
        <div className="post-card" key={id} id={id}>
            <h5>Title:{title}</h5>
            {cut?<p>Article: {text.length>10? text.substring(0, 10) + '...' : text}</p>:<p>Article:{text}</p> }
            <p>Create date: {createDate}</p>
            <p>Author: {author}</p>
            <></>
        </div>
    )
}

PostCard.defaultProps = {
    cut: false
  }

export default PostCard