import postsReducer,{
    actionFetchAllPosts,
    actionFetchCurentPost,
    actionFetchCreateNewPost,
    actionFetchUpdatePost,
    actionFetchDeletePost,
}  from "./posts.reducer";
import usersReducer,{
    actionFetchRegistrationUser,
    actionFetchLoginUser,
    actionFetchUserData,
    actionFetchUserDataUpdate,
    actionUserData
} from "./users.reducer"

export{
    postsReducer,
    actionFetchAllPosts,
    actionFetchCurentPost,
    actionFetchCreateNewPost,
    actionFetchUpdatePost,
    actionFetchDeletePost,

    usersReducer,
    actionFetchRegistrationUser,
    actionFetchLoginUser,
    actionFetchUserData,
    actionFetchUserDataUpdate,
    actionUserData
    
}