import {configureStore} from '@reduxjs/toolkit'
import postReducer from '../redux/slices/post'
import authReducer from '../redux/slices/auth'
import commentReducer from '../redux/slices/comment'
import userReducer from '../redux/slices/user'
export const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer,
        comment: commentReducer,
        user: userReducer
    },
    devTools: true
})