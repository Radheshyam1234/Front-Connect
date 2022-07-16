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

export const editPost = createAsyncThunk(
  "posts/edit",
  async ({ postId, editedContent }, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "POST",
        url: `${API_URL}/posts/${postId}/editpost`,
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: { editedContent },
      });
      return response;
    } catch (error) {
      const message = error.response.data.message;
      ToastHandler(ToastType.Error, message);
    }
  }
);

export const deletePost = createAsyncThunk("posts/delete", async (postId) => {
  try {
    const {
      data: { response },
    } = await axios({
      method: "DELETE",
      url: `${API_URL}/posts/${postId}`,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return response;
  } catch (error) {
    const message = error.response.data.message;
    ToastHandler(ToastType.Error, message);
  }
});

export const likeThePost = createAsyncThunk(
  "posts/like",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "POST",
        url: `${API_URL}/posts/${postId}/addlike`,
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          postId,
        },
      });
      return response;
    } catch (error) {
      const message = error.response.data.response.message;

      return rejectWithValue(message);
    }
  }
);

export const removeLikeFromPost = createAsyncThunk(
  "posts/removelike",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "POST",
        url: `${API_URL}/posts/${postId}/removelike`,
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          postId,
        },
      });
      return response;
    } catch (error) {
      const message = error.response.data.response.message;

      return rejectWithValue(message);
    }
  }
);

export const getUsersWhoLikedThePost = createAsyncThunk(
  "posts/likedby",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "GET",
        url: `${API_URL}/posts/${postId}/likedby`,
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          postId,
        },
      });
      return response;
    } catch (error) {
      const message = error.response.data.response.message;
      return rejectWithValue(message);
    }
  }
);

export const bookMarkPost = createAsyncThunk(
  "posts/addbookmark",
  async (postId) => {
    const {
      data: { response },
    } = await axios({
      method: "POST",
      url: `${API_URL}/user/${postId}/addbookmark`,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return response;
  }
);

export const removeBookmarkPost = createAsyncThunk(
  "posts/removebookmark",
  async (postId) => {
    const {
      data: { response },
    } = await axios({
      method: "POST",
      url: `${API_URL}/user/${postId}/removebookmark`,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return response;
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    usersWhoLikedPost: [],
    createPostStatus: "idle",
  },
  reducers: {
    resetUsersWhoLikedThePost: (state) => {
      state.usersWhoLikedPost = [];
    },
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
    [editPost.fulfilled]: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post?._id === action.payload._id
      );

      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          content: action.payload.content,
        };
        ToastHandler(ToastType.Success, "Post Saved Successfully");
      }
    },
    [deletePost.fulfilled]: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );

      if (index !== -1) {
        state.posts.splice(index, 1);
        ToastHandler(ToastType.Success, "Post Deleted ");
      }
    },
    [likeThePost.fulfilled]: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );

      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          likes: action.payload.likes,
        };
      }
    },
    [likeThePost.rejected]: (state, action) => {
      console.log(action.payload);
      ToastHandler(ToastType.Error, action.payload);
    },
    [removeLikeFromPost.fulfilled]: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );

      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          likes: action.payload.likes,
        };
      }
    },
    [removeLikeFromPost.rejected]: (state, action) => {
      ToastHandler(ToastType.Error, action.payload);
    },
    [getUsersWhoLikedThePost.fulfilled]: (state, action) => {
      state.usersWhoLikedPost = action.payload;
    },
    [getUsersWhoLikedThePost.rejected]: (state, action) => {
      ToastHandler(ToastType.Error, action.payload);
    },
  },
});

export default postSlice.reducer;
export const { resetUsersWhoLikedThePost } = postSlice.actions;
export const usePostSelector = () => useSelector((state) => state.posts);
