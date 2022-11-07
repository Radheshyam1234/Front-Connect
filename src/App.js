import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  Posts,
  Explore,
  Login,
  SignUp,
  PrivateRoute,
  Profile,
  SinglePost,
} from "./features";
import { API_URL } from "./Utils/Constants";
import { loadPosts } from "./features/Posts/postSlice";
import { loadMyProfile } from "./features/Authentication/AuthenticationSlice";

import { Navbar } from "./features/Navbar/Navbar";
import { useAuthentication } from "./features/Authentication/AuthenticationSlice";
import { loadUsers } from "./features/Users/usersSlice";
import { setActiveUsers } from "./features/OnlineOffline/OnlinOfflineSlice";
import { NotFound } from "./Pages/Not-Found";

export const App = () => {
  const { token, user } = useAuthentication();
  const dispatch = useDispatch();
  const socket = useRef();

  useEffect(() => {
    dispatch(loadPosts());
    dispatch(loadMyProfile(token));
    dispatch(loadUsers());
  }, [token]);

  useEffect(() => {
    if (user) {
      socket.current = io(`${API_URL}`);
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        dispatch(setActiveUsers(users));
      });
    }
  }, [user]);

  return (
    <div>
      {user && <Navbar />}
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <Explore />
            </PrivateRoute>
          }
        />
        <Route
          path="/:userName"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/:userName/:postId"
          element={
            <PrivateRoute>
              <SinglePost />
            </PrivateRoute>
          }
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
