import { configureStore } from '@reduxjs/toolkit';

import {
    postsReducer,
    usersReducer
} from "../reducers";


const store = configureStore({
    reducer:{
        posts: postsReducer,
        users: usersReducer,

    }
})

export default store;