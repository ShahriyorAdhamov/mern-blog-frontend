import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../api/axios'

export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async () => {
        const {data} = await axios.get('/posts');
        return data
    }
)

export const fetchDeletePost = createAsyncThunk(
    'post/fetchDeletePost',
    async id => await axios.delete(`/posts/${id}`)
    
)

export const fetchTags = createAsyncThunk(
    'post/fetchTags',
    async () => {
        const {data} = await axios.get('/tags');
        return data
    }
)

const initialState = {
    posts: [],
    tags:[],
    isLoading: false,
    error: null
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.isLoading = true;
            state.posts = [];
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.posts = [];
            state.error = 'error';
        },

        //get tags
        [fetchTags.pending]: (state) => {
            state.isLoading = true;
            state.tags = [];
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.tags = action.payload;
        },
        [fetchTags.rejected]: (state, action) => {
            state.isLoading = false;
            state.tags = [];
            state.error = 'error';
        },
        // delete post
        [fetchDeletePost.pending]: (state, action) => { 
            state.posts = state.posts.filter(obj => obj._id !== action.meta.arg)
        }
    }
})

export default postSlice.reducer