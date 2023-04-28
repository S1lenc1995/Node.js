import React from 'react';
import {useParams} from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionFetchCurentPosts } from '../../reducers';
import { selectorCurentPost } from '../../selectors';
import PostCard from '../../components/PostCard/PostCard';

const PostDetails = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    let curentPost = useSelector(selectorCurentPost)
    console.log(curentPost, 'aaaaa')

    useEffect(()=>{
        dispatch(actionFetchCurentPosts(id))
    },[])

       return(
         <PostCard el={curentPost[0]}/>  
    )  
}

export default PostDetails