import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadPosts } from "./features/Posts/postSlice";
import { Posts, Login, SignUp, PrivateRoute } from "./features";
import { Navbar } from "./features/Navbar/Navbar";
import { useAuthentication } from "./features/Authentication/AuthenticationSlice";

export const App = () => {
  const { token, user } = useAuthentication();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  return (
    <div>
      {user && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};
