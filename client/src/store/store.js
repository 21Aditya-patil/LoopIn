import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";

// Load persisted state
function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

// Save to localStorage
function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem("store", serializedStore);
  } catch (e) {
    console.log(e);
  }
}

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: persistedState,
  devTools: true,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;

