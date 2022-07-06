import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
  try {
    const {
      data: { response },
    } = await axios({
      method: "GET",
      url: `https://front-connect-backend.herokuapp.com/posts`,
      headers: {
        authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIyOTExNzYyOWMwNWZkN2IwZGYwZjYiLCJpYXQiOjE2NTcxMTgzMDF9.qk-LV35TcooImxTqp52twFolWiVNBNk7-AJqy11W7sc",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    usersWhoLikedPost: [],
  },

  extraReducers: {
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export default postSlice.reducer;
export const usePostSelector = () => useSelector((state) => state.posts);
