import {createSlice, current} from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";

const initialState = {
    token: localStorage.getItem("token") || '',
    userEmail: localStorage.getItem("userEmail") || '',
    userData: ''
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        actionToken: (state, {payload}) => {
            localStorage.setItem('token', payload);
            state.token = payload
        },
        actionUserEmail: (state, {payload}) => {
            localStorage.setItem('userEmail', payload);
            state.userEmail = payload 
        },
        actionUserData: (state, {payload}) => {
           /*  localStorage.setItem('userData', payload); */
            state.userData = payload 
        },
    }
})

export const {
    actionToken,
    actionUserEmail,
    actionUserData
} = usersSlice.actions

export const actionFetchRegistrationUser = (value)=>(dispatch)=>{
    return axios
    .post('http://localhost:3000/auth/register', value)
    .then(({data, status })=>{
        alert(status)
       setAuthToken(data.token)
       dispatch(actionToken(data.token))
       dispatch(actionUserEmail(data.user.email)) 
    })
    .catch((err) => {
        alert(err.response.data)
      });
}

export const actionFetchLoginUser = (value)=>(dispatch)=>{
    return axios
    .post('http://localhost:3000/auth/login', value)
    .then(({data, status})=>{
        console.log(data.user.email)
        alert(status)
       setAuthToken(data.user.token)
       dispatch(actionToken(data.user.token))
       dispatch(actionUserEmail(data.user.email)) 
    })
    .catch((err) => {
        alert(err.response.data)
      });
}

export const actionFetchUserData = (value)=>(dispatch)=>{
    console.log(value, 're')
    return axios
    .post('http://localhost:3000/auth/userData', {email: value})
    .then(({data})=>{
        dispatch(actionUserData(data))
    })
    .catch((err) => {
        alert(err.response.data)
      });
}

export const actionFetchUserDataUpdate = (value)=>(dispatch)=>{
    console.log(value, 're')
    return axios
    .post('http://localhost:3000/auth/notificationsettings', value)
    .then(({data})=>{
        
    })
    .catch((err) => {
        alert(err.response.data)
      });
}

export default usersSlice.reducer;