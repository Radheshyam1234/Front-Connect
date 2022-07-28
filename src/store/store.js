import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/Authentication/AuthenticationSlice";
import postsReducer from "../features/Posts/postSlice";
import profileReducer from "../features/Profile/ProfileSlice";
import followerReducer from "../features/Followers/FollowersSlice";
import followingReducer from "../features/Following/FollowingSlice";
import usersReducer from "../features/Users/usersSlice";
import OnlinOfflineReducer from "../features/OnlineOffline/OnlinOfflineSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    posts: postsReducer,
    profile: profileReducer,
    followers: followerReducer,
    following: followingReducer,
    users: usersReducer,
    activeStatus: OnlinOfflineReducer,
  },
});
