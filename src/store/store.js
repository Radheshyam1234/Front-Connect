import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/Authentication/AuthenticationSlice";
import postsReducer from "../features/Posts/postSlice";
import profileReducer from "../features/Profile/ProfileSlice";
import usersReducer from "../features/Users/usersSlice";
export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    posts: postsReducer,
    profile: profileReducer,
    users: usersReducer,
  },
});
