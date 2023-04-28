import PostCard from "../../components/PostCard"
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { actionFetchAllPosts } from "../../reducers";
import { selectorAllPosts } from "../../selectors";
import { Link } from "react-router-dom";

import "./Main.scss"


const Main = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actionFetchAllPosts())
    },[])

    const allPosts = useSelector(selectorAllPosts)
  
    return(
        <main className='posts-container'>
              <Link to={'/create_post'}>
              <button>Create post</button>
              </Link>
         
            <div className='posts-container__news'>
            {allPosts?.map((el)=>(
            <PostCard el={el} cut={true}/>  
            ))}
            </div>
         
        </main>
    )
}

export default Main