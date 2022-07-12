import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastHandler, ToastType } from "../../Utils/ToastUtils";

import { API_URL } from "../../Utils/Constants";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
  try {
    const {
      data: { response },
    } = await axios({
      method: "GET",
      url: `${API_URL}/posts`,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return response;
  } catch (error) {
    ToastHandler(ToastType.Error, error.response.data.response.message);
  }
});

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ postDetail }, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "POST",
        url: `${API_URL}/posts`,
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: { ...postDetail },
      });
      return response;
    } catch (error) {
      const message = error.response.data.response.message;
      ToastHandler(ToastType.Error, error.response.data.response.message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    usersWhoLikedPost: [],
    createPostStatus: "idle",
  },

  extraReducers: {
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [createPost.pending]: (state) => {
      state.createPostStatus = "pending";
    },
    [createPost.fulfilled]: (state, action) => {
      state.posts.unshift(action.payload);
      ToastHandler(ToastType.Success, "Post added successfully");
      state.createPostStatus = "idle";
    },
    [createPost.rejected]: (state, action) => {
      ToastHandler(ToastType.Error, action.payload);
      state.createPostStatus = "idle";
    },
  },
});

export default postSlice.reducer;
export const usePostSelector = () => useSelector((state) => state.posts);
