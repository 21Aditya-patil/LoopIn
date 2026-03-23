import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import postReducer from "../reducers/postSlice";
import chatReducer from "../reducers/chatSlice";
import userReducer from "../reducers/userSlice";
import eventReducer from "../reducers/eventSlice"
import searchReducer from "../reducers/searchSlice";
import themeReducer from "../reducers/themeSlice";

// Load only auth from localStorage
function loadFromLocalStorage() {
  try {
    const serializedAuth = window.localStorage.getItem("auth");
    if (!serializedAuth) return undefined;

    return {
      auth: JSON.parse(serializedAuth),
    };
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    chat: chatReducer,
    user: userReducer,
    events: eventReducer,
    search: searchReducer,
    theme: themeReducer,
  },
  preloadedState: persistedState,
  devTools: true,
});

// Save only auth
store.subscribe(() => {
  const { auth } = store.getState();
  window.localStorage.setItem("auth", JSON.stringify(auth));
});

export default store;