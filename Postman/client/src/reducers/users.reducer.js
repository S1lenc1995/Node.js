import {createSlice, current} from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";

const initialState = {
    token: localStorage.getItem("token") || ''
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        actionToken: (state, {payload}) => {
            localStorage.setItem('token', payload);
            state.token = payload
        },
    }
})

export const {
    actionToken
} = usersSlice.actions

export const actionFetchRegistrationUser = (value)=>(dispatch)=>{
    return axios
    .post('http://localhost:3000/auth/register', value)
    .then(({data})=>{
       setAuthToken(data.token)
       dispatch(actionToken(data.token))
    })
    .catch(() => {
    
      });
}

export const actionFetchLoginUser = (value)=>(dispatch)=>{
    return axios
    .post('http://localhost:3000/auth/login', value)
    .then(({data})=>{
       setAuthToken(data.user.token)
       dispatch(actionToken(data.user.token))
    })
    .catch(() => {
    
      });
}

export default usersSlice.reducer;