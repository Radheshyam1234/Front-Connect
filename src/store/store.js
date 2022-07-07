import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/postSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
