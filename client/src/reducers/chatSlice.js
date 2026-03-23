import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ChatApi from "../API/ChatRequest";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const initialState = {
  currentChat: null,
  messages: [],
  conversations: [],
  loading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (userId) => {
    const res = await fetch(`${BASE_URL}/conversation/${userId}`);
    return await res.json();
  },
);

// Fetch Messages
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      return await ChatApi.getMessages(conversationId);
    } catch (error) {
      return rejectWithValue("Failed to fetch messages");
    }
  },
);

// Send Message (Save to DB)
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      return await ChatApi.sendMessage(messageData);
    } catch (error) {
      return rejectWithValue("Failed to send message");
    }
  },
);

// Delete Chat
export const deleteConversation = createAsyncThunk(
  "chat/deleteConversation",
  async (conversationId) => {
    await fetch(`${BASE_URL}/conversation/${conversationId}`, {
      method: "DELETE",
    });
    return conversationId;
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Set current chat
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
      state.messages = [];
    },

    // Clear chat
    clearChat: (state) => {
      state.currentChat = null;
      state.messages = [];
    },

    // Add message from Socket (Real-time)
    addMessageRealtime: (state, action) => {
      const newMessage = action.payload;

      // Only add if it belongs to current chat
      if (state.currentChat?._id !== newMessage.conversationId) return;

      // Prevent duplicate messages
      const exists = state.messages.find((msg) => msg._id === newMessage._id);

      if (!exists) {
        state.messages.push(newMessage);
      }
    },

    moveConversationToTop: (state, action) => {
      const conversationId = action.payload;

      const index = state.conversations.findIndex(
        (c) => c._id === conversationId,
      );

      if (index > -1) {
        const convo = state.conversations.splice(index, 1)[0];
        state.conversations.unshift(convo);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send message (DB response)
      .addCase(sendMessage.fulfilled, (state, action) => {
        const newMessage = action.payload;

        // Prevent duplicate (because socket may also add it)
        const exists = state.messages.find((msg) => msg._id === newMessage._id);

        if (!exists) {
          state.messages.push(newMessage);
        }
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.conversations = state.conversations.filter(
          (c) => c._id !== action.payload,
        );

        if (state.currentChat?._id === action.payload) {
          state.currentChat = null;
          state.messages = [];
        }

        toast.success("Conversation deleted successfully");
      })
      .addCase(deleteConversation.rejected, () => {
        toast.error("Failed to delete conversation");
      });
  },
});

export const {
  setCurrentChat,
  clearChat,
  addMessageRealtime,
  moveConversationToTop,
} = chatSlice.actions;

export default chatSlice.reducer;
