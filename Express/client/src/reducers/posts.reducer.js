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

export const actionFetchCurentPost = (id)=>(dispatch)=>{
    return axios
    .get(`http://localhost:3000/api/post/${id}`)
    .then(({data, status})=>{
        alert(status)
        dispatch(actionCurentPost(data))
    })
    .catch((error) => {
        alert(error.response.status)
      });
}

export const actionFetchCreateNewPost = (value)=>(dispatch)=>{            
    return axios   
    .post(`http://localhost:3000/api/createNewPost`, (value))
    .then(({data, status})=>{
        alert(status)
    })
    .catch((error) => {
        alert(error.response.status)
      });
}

export const actionFetchUpdatePost = (id, value)=>(dispatch)=>{
    return axios
    .put(`http://localhost:3000/api/editpost/${id}`, value)
    .then(({data, status})=>{
        alert(status)
        
    })
    .catch((error) => {
        alert(error.response.status)
      });
}

export const actionFetchDeletePost = (id)=>(dispatch)=>{
    return axios
    .delete(`http://localhost:3000/api/delete/${id}`)
    .then(({data, status})=>{
        alert(status)
    })
    .catch((error) => {
        alert(error.response.status)
      });
}

export default postsSlice.reducer;