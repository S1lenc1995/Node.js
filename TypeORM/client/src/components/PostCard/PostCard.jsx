import { Link } from "react-router-dom";
import "./PostCard.scss"
const PostCard = ({el, cut}) =>{
    const {author, createDate, id, content, title, genre} = el
    return(
        <div className="post-card" key={id} id={id}>
            <h5>Title:{title}</h5>
            <p>Genre: {genre}</p>
            {cut?<p>Article: {content.length>10? content.substring(0, 10) + '...' : content}</p>:<p>Article:{content}</p> }
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