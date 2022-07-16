import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../Utils/Constants";
import {
  followUserFromProfilePage,
  unFollowUserFromProfilePage,
} from "../Profile/ProfileSlice";
import { followTheUser, unFollowTheUser } from "../Followers/FollowersSlice";
import { updateProfilePhoto, updateProfileInfo } from "../Profile/ProfileSlice";
import { bookMarkPost, removeBookmarkPost } from "../Posts/postSlice";

export const signupUser = createAsyncThunk(
  "authentication/signuphandler",
  async (signUpDetails, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "POST",
        url: `${API_URL}/user/signup`,
        data: {
          ...signUpDetails,
        },
      });
      return response;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginhandler",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "POST",
        url: `${API_URL}/user/login`,
        data: {
          email,
          password,
        },
      });
      return response;
    } catch (error) {
      const message = error.response.data.message;
      return rejectWithValue(message);
    }
  }
);

export const loadMyProfile = createAsyncThunk(
  "user/myprofile",
  async (token) => {
    const {
      data: { response },
    } = await axios({
      method: "GET",
      url: `${API_URL}/user/myprofile`,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return response;
  }
);

const initialState = {
  token: JSON.parse(localStorage.getItem("token")) || "",
  user: null,
  isLoading: false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.clear();
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.isLoading = true;
    },

    [signupUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.NewUser;
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },

    [signupUser.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [loadMyProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [updateProfilePhoto.fulfilled]: (state, action) => {
      state.user.profilephoto = action.payload.profilephoto;
    },
    [updateProfileInfo.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [followTheUser.fulfilled]: (state, action) => {
      state.user.following.unshift(action.payload._id);
    },
    [unFollowTheUser.fulfilled]: (state, action) => {
      const index = state.user.following.findIndex(
        (following) => following.toString() === action.payload._id.toString()
      );

      if (index !== -1) {
        state.user.following.splice(index, 1);
      }
    },
    [followUserFromProfilePage.fulfilled]: (state, action) => {
      state.user.following.unshift(action.payload._id);
    },
    [unFollowUserFromProfilePage.fulfilled]: (state, action) => {
      const index = state.user.following.findIndex(
        (following) => following.toString() === action.payload._id.toString()
      );
      if (index !== -1) {
        state.user.following.splice(index, 1);
      }
    },
    [bookMarkPost.fulfilled]: (state, action) => {
      state.user.savedpost = action.payload.savedpost;
    },
    [removeBookmarkPost.fulfilled]: (state, action) => {
      state.user.savedpost = action.payload.savedpost;
    },
  },
});

export default authenticationSlice.reducer;
export const useAuthentication = () =>
  useSelector((state) => state.authentication);
export const { logoutUser } = authenticationSlice.actions;
