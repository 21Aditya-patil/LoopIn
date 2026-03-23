import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as PostApi from "../API/PostRequest";

// Async Thunks

export const getPosts = createAsyncThunk("post/getAll", async (_, thunkAPI) => {
  try {
    const data = await PostApi.getPosts();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const data = await PostApi.createPost(postData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async ({ postId, userId }, thunkAPI) => {
    try {
      await PostApi.deletePost(postId, userId);
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updatePost = createAsyncThunk(
  "post/update",
  async ({ postId, updatedData, userId }, thunkAPI) => {
    try {
      const data = await PostApi.updatePost(postId, updatedData, userId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, thunkAPI) => {
    try {
      const data = await PostApi.getUserPosts(userId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const likePost = createAsyncThunk(
  "post/like",
  async (postId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.auth.user._id;

      const data = await PostApi.likePost(postId, userId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addComment = createAsyncThunk(
  "post/comment",
  async ({ postId, text }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.auth.user._id;

      const data = await PostApi.addComment(postId, userId, text);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const savePost = createAsyncThunk(
  "post/save",
  async (postId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.auth.user._id;

      const data = await PostApi.savePost(postId, userId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Slice (This is your postReducer)
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // CREATE POST
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Get POST
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Update POST
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;

        const updatedPost = action.payload;

        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id,
        );

        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })

      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE POST
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })

      // LIKE POST
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;

        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id,
        );

        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })

      // COMMENT
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedPost = action.payload;

        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id,
        );

        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })

      // SAVE
      .addCase(savePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;

        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id,
        );

        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      });
  },
});

export default postSlice.reducer;
