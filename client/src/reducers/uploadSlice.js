import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UploadApi from "../API/UploadRequest";

export const uploadMedia = createAsyncThunk(
  "upload/media",
  async (formData, thunkAPI) => {
    try {
      const data = await UploadApi.uploadMedia(formData);
      return data; // IMPORTANT
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    isLoading: false,
    uploadedFiles: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadedFiles = action.payload;
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default uploadSlice.reducer;
