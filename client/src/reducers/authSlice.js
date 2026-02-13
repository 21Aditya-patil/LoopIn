import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as AuthApi from "../API/AuthRequest";

// Login Thunk
export const logIn = createAsyncThunk(
"auth/login", 
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AuthApi.logIn(formData);
      return response;
    } catch (error) {
      return rejectWithValue("Invalid email or password");
    }
  }
);

// Signup Thunk
export const signUp = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AuthApi.signUp(formData);
      return response;
    } catch (error) {
      return rejectWithValue("Signup failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isSignupSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSignupSuccess: (state) => {
      state.isSignupSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        // User is saved in backend, but don't log them in on frontend
        state.loading = false;
        state.isSignupSuccess = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, clearSignupSuccess } = authSlice.actions;
export default authSlice.reducer;
