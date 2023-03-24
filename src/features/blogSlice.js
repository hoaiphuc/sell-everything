import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { getAllPosts, createPost, deletePost, updateStatusPost } from '../services/blog.service';

export const fetchAllPosts = createAsyncThunk('blog/fetchAllPosts', async () => {
  const response = await getAllPosts();
  return response;
});

export const addNewPost = createAsyncThunk('blog/addNewPost', async (postData) => {
  const response = await createPost(postData);
  return response;
});
export const removePost = createAsyncThunk('blog/deletePost', async (id) => {
  const response = await deletePost(id);
  return response;
});
export const updatePost = createAsyncThunk('blog/updatePost', async (status, postId) => {
  const response = await updateStatusPost(status, postId);
  return response;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(removePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;

export const selectAllPosts = createSelector(
  (state) => state.blog.posts,
  (posts) => {
    if (Array.isArray(posts.post)) {
      return posts.post;
    }
    return [];
  }
);
