import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../Utils/Constants";
import { updateProfilePhoto, updateProfileInfo } from "../Profile/ProfileSlice";

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
  },
});

export default authenticationSlice.reducer;
export const useAuthentication = () =>
  useSelector((state) => state.authentication);
export const { logoutUser } = authenticationSlice.actions;
