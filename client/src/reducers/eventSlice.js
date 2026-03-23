import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEvents,
  createEventApi,
  deleteEventApi,
} from "../API/EventRequest";

// ================= FETCH EVENTS =================
export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getEvents();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ================= CREATE EVENT =================
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await createEventApi(eventData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ================= DELETE EVENT =================
export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await deleteEventApi(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
      })

      // DELETE
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload,
        );
      });
  },
});

export default eventSlice.reducer;
