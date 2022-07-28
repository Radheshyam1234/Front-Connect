import { createSlice } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";

export const onlineOfflineSlice = createSlice({
  name: "online or offline",
  initialState: {
    activeUsers: [],
  },
  reducers: {
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
  },
});

export default onlineOfflineSlice.reducer;
export const { setActiveUsers } = onlineOfflineSlice.actions;
export const useOnlineOrOfflineSelector = () =>
  useSelector((state) => state.activeStatus);
