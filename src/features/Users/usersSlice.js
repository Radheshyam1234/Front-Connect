import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../Utils/Constants";

export const loadUsers = createAsyncThunk("users/loadUsers", async () => {
  const {
    data: { response },
  } = await axios({
    method: "GET",
    url: `${API_URL}/user/allusers`,
    headers: {
      authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });
  return response;
});

export const usersSlice = createSlice({
  name: "allusers",
  initialState: {
    allUsers: [],
  },
  reducers: {},
  extraReducers: {
    [loadUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
    },
    [loadUsers.rejected]: (state, action) => {
      console.log(action.error.message);
    },
  },
});

export default usersSlice.reducer;

export const useUsers = () => useSelector((state) => state.users);
