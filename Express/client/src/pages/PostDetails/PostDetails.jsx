import React from 'react';
import {useParams,  useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionFetchCurentPost, actionFetchDeletePost, actionFetchAllPosts } from '../../reducers';
import { selectorCurentPost } from '../../selectors';
import PostCard from '../../components/PostCard/PostCard';
import { Link } from "react-router-dom";

const PostDetails = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let curentPost = useSelector(selectorCurentPost)
    console.log(id, 'aaaaa')

    useEffect(()=>{
        dispatch(actionFetchCurentPost(id))
    },[])

       return(
        <>
          <Link to={`/editPost/${id}`}>
           <button>Eddit</button> 
           </Link>
           <button onClick={async()=>{
            dispatch(actionFetchDeletePost(id))
            await dispatch(actionFetchAllPosts())
            navigate('/');
            }}>Delete</button>
      {curentPost?.map((el)=>(
            <PostCard el={el} />  
            ))}
        </>
         
    )   
}

export default PostDetails