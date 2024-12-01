import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type for the posts slice
export type Post = {
  id: number;
  title: string;
  body: string;
};

export type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

// Initial state
const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data: Post[] = await response.json();
  return data;
});

// Create the posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

// Export actions
export const { clearPosts } = postsSlice.actions;

// Export selectors
export const selectPosts = (state: { posts: PostsState }) => state.posts.posts;
export const selectPostsLoading = (state: { posts: PostsState }) => state.posts.loading;
export const selectPostsError = (state: { posts: PostsState }) => state.posts.error;

// Export reducer
export default postsSlice.reducer;
