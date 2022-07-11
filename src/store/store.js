import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/Authentication/AuthenticationSlice";
import postsReducer from "../features/Posts/postSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    posts: postsReducer,
  },
});
