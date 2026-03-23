import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserById,
  followUser,
  unFollowUser,
} from "../API/UserRequest";
import { setUser } from "../reducers/authSlice";

// Fetch user
export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId, thunkAPI) => {
    try {
      return await getUserById(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Follow user
export const followUserThunk = createAsyncThunk(
  "user/follow",
  async (targetUserId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentUserId = state.auth.user._id;

      const result = await followUser(targetUserId, currentUserId);

      // Update logged-in user
      thunkAPI.dispatch(setUser(result.currentUser));

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Unfollow user
export const unFollowUserThunk = createAsyncThunk(
  "user/unfollow",
  async (targetUserId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentUserId = state.auth.user._id;

      const result = await unFollowUser(targetUserId, currentUserId);

      thunkAPI.dispatch(setUser(result.currentUser));

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profileUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.profileUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(followUserThunk.fulfilled, (state, action) => {
        state.profileUser = action.payload.profileUser;
      })
      .addCase(unFollowUserThunk.fulfilled, (state, action) => {
        state.profileUser = action.payload.profileUser;
      });
  },
});

export default userSlice.reducer;