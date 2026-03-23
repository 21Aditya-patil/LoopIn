import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as AuthApi from "../API/AuthRequest";
import * as UpdateUserApi from "../API/UpdateRequest";
import * as DeleteUserApi from "../API/DeleteRequest";

const safeParse = (data) => {
  try {
    if (!data || data === "undefined" || data === "null") return null;
    return JSON.parse(data);
  } catch (err) {
    console.error("Invalid JSON in localStorage:", err);
    return null;
  }
};

// Load from localStorage (persist login)
const storedUser = safeParse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

// ================= LOGIN =================
export const logIn = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AuthApi.logIn(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Invalid username or password");
    }
  }
);

// ================= SIGNUP =================
export const signUp = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AuthApi.signUp(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

// ================= UPDATE USER =================
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, data }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await UpdateUserApi.updateUser(userId, data, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ================= DELETE USER =================
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({ userId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await DeleteUserApi.deleteUser(userId, token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser, // ✅ safe now
    token: storedToken || null,
    loading: false,
    error: null,
    isSignupSuccess: false,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    clearError: (state) => {
      state.error = null;
    },

    clearSignupSuccess: (state) => {
      state.isSignupSuccess = false;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder
      // ===== LOGIN =====
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== SIGNUP =====
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.isSignupSuccess = true;

        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== UPDATE USER =====
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      // ===== DELETE USER =====
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  },
});

export const { logout, clearError, clearSignupSuccess, setUser } =
  authSlice.actions;

export default authSlice.reducer;