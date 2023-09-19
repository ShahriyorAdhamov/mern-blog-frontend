import {configureStore} from '@reduxjs/toolkit'
import postReducer from '../redux/slices/post'
import authReducer from '../redux/slices/auth'
export const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer
    },
    devTools: true
})