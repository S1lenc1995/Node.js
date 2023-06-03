import {createSlice, current} from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";

const initialState = {
    allPosts:[],
    currentPost: null,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        actionAllPosts:(state, {payload})=>{
            state.allPosts = [...payload]
        },
        actionCurentPost:(state, {payload})=>{
            state.currentPost = payload
        }
    }
})

export const {
    actionAllPosts,
    actionCurentPost,
} = postsSlice.actions

export const actionFetchAllPosts = ()=>(dispatch)=>{
    const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    setAuthToken(token);
    return axios
    .get('http://localhost:3000/api/posts')
    .then(({data, status})=>{
        alert(status)
        dispatch(actionAllPosts(data.result))
    })
    .catch((error) => {
        alert(error) 
      });
}

export const actionFetchCurentPost = (id)=>(dispatch)=>{
    const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    setAuthToken(token);
    return axios
    .get(`http://localhost:3000/api/post/${id}`)
    .then(({data, status})=>{
        console.log(data, 'main')
        alert(status)
        dispatch(actionCurentPost(data))
    })
    .catch((error) => {
        console.log(error)
        alert(error) 
      });
}

export const actionFetchCreateNewPost = (value)=>(dispatch)=>{ 
    const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    setAuthToken(token);           
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
    const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    setAuthToken(token);
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
    const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    setAuthToken(token);
    return axios
    .delete(`http://localhost:3000/api/delete/${id}`)
    .then(({data, status})=>{
        alert(status)
    })
    .catch((error) => {
        alert(error) 
      });
}

export default postsSlice.reducer;