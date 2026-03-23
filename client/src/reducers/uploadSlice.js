import { createAsyncThunk } from "@reduxjs/toolkit";
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
