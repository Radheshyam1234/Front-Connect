import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../Utils/Constants";

export const loadFollowers = createAsyncThunk(
  "user/loadFollowers",
  async (username) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "GET",
        url: `${API_URL}/user/${username}/followers`,
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

export const followTheUser = createAsyncThunk(
  "followersOrFollowing/follow",
  async (userName) => {
    const {
      data: { response },
    } = await axios({
      method: "POST",
      url: `${API_URL}/user/${userName}/follow`,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return response;
  }
);

export const unFollowTheUser = createAsyncThunk(
  "followersOrFollowing/unfollow",
  async (userName) => {
    const {
      data: { response },
    } = await axios({
      method: "POST",
      url: `${API_URL}/user/${userName}/unfollow`,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return response;
  }
);

const followersSlice = createSlice({
  name: "followers",
  initialState: {
    followersDetail: [],
  },
  reducers: {
    resetFollowers: (state) => {
      state.followersDetail = [];
    },
  },
  extraReducers: {
    [loadFollowers.fulfilled]: (state, action) => {
      state.followersDetail = action.payload;
    },
    [loadFollowers.rejected]: (state, action) => {
      console.log(action.error.message);
    },
  },
});
export default followersSlice.reducer;

export const { resetFollowers } = followersSlice.actions;

export const useFollowers = () => useSelector((state) => state.followers);
