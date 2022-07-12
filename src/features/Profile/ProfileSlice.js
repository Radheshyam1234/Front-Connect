import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastHandler, ToastType } from "../../Utils/ToastUtils";
import { API_URL } from "../../Utils/Constants";

export const loadUserProfile = createAsyncThunk(
  "profile/loadUserProfile",
  async (userName) => {
    const {
      data: { response },
    } = await axios({
      method: "GET",
      url: `${API_URL}/user/${userName}/profile`,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    return response;
  }
);

export const updateProfilePhoto = createAsyncThunk(
  "profile/update/photo",
  async (image) => {
    const {
      data: { response },
    } = await axios({
      method: "POST",
      url: `${API_URL}/user/updateprofilephoto`,
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: { image },
    });
    return response;
  }
);

export const updateProfileInfo = createAsyncThunk(
  "profile/update/info",
  async (updatedProfileInfo) => {
    try {
      const {
        data: { response },
      } = await axios({
        method: "POST",
        url: `${API_URL}/user/updateprofileinfo`,
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: updatedProfileInfo,
      });
      ToastHandler(ToastType.Success, "Profile Saved");
      return response;
    } catch (error) {
      console.log(error);
      ToastHandler(ToastType.Error, "Something went Wrong");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileDetails: null,
  },
  reducers: {
    resetProfile: (state, action) => {
      state.profileDetails = null;
    },
  },
  extraReducers: {
    [loadUserProfile.fulfilled]: (state, action) => {
      state.profileDetails = action.payload;
    },
  },
});
export default profileSlice.reducer;

export const { resetProfile } = profileSlice.actions;

export const useProfile = () => useSelector((state) => state.profile);
