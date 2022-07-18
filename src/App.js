import { useEffect } from "react";
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
} from "./features";
import { loadPosts } from "./features/Posts/postSlice";
import { loadMyProfile } from "./features/Authentication/AuthenticationSlice";

import { Navbar } from "./features/Navbar/Navbar";
import { useAuthentication } from "./features/Authentication/AuthenticationSlice";
import { loadUsers } from "./features/Users/usersSlice";

export const App = () => {
  const { token, user } = useAuthentication();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
    dispatch(loadMyProfile(token));
    dispatch(loadUsers());
  }, [token]);
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
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};
