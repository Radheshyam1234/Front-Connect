import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadPosts } from "./features/Posts/postSlice";
import { Posts } from "./features";

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Posts />} />
      </Routes>
    </div>
  );
};
