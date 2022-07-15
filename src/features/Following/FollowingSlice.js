import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { unFollowTheUser } from "../Followers/FollowersSlice";
import { API_URL } from "../../Utils/Constants";

export const loadFollowing = createAsyncThunk(
  "user/loadFollowings",
  async (username) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "GET",
        url: `${API_URL}/user/${username}/following`,
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const followingSlice = createSlice({
  name: "following",
  initialState: {
    followingDetails: [],
  },
  reducers: {
    resetFollowing: (state) => {
      state.followingDetails = [];
    },
  },
  extraReducers: {
    [loadFollowing.fulfilled]: (state, action) => {
      state.followingDetails = action.payload;
    },
    [loadFollowing.rejected]: (state, action) => {
      console.log(action.error.message);
    },
  },
});

export default followingSlice.reducer;
export const { resetFollowing } = followingSlice.actions;
export const useFollowing = () => useSelector((state) => state.following);
