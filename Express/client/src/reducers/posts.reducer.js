import {createSlice, current} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allPosts:[],
    currentPost: [],
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        actionAllPosts:(state, {payload})=>{
            state.allPosts = [...payload]
        },
        actionCurentPost:(state, {payload})=>{
            state.currentPost = [...payload]
        }
    }
})

export const {
    actionAllPosts,
    actionCurentPost,
} = postsSlice.actions

export const actionFetchAllPosts = ()=>(dispatch)=>{
    return axios
    .get('http://localhost:3000/api')
    .then(({data})=>{
        dispatch(actionAllPosts(data))
    })
    .catch(() => {
    
      });
}

export const actionFetchCurentPosts = (id)=>(dispatch)=>{
    return axios
    .get(`http://localhost:3000/api/${id}`)
    .then(({data})=>{
        console.log(data, 'oooohhhhhhh')
        dispatch(actionCurentPost(data))
    })
    .catch(() => {
    
      });
}

export default postsSlice.reducer;