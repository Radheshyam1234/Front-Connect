import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PostCard } from "./PostCard";
import { Box } from "@chakra-ui/react";
import { Loader } from "../../Loader/Loader";
import { ToastHandler, ToastType } from "../../Utils/ToastUtils";
import { API_URL } from "../../Utils/Constants";

export const SinglePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const {
          data: { response },
        } = await axios({
          method: "GET",
          url: `${API_URL}/posts/${postId}`,
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        });
        setPost(response);
      } catch (error) {
        console.log(error);
        ToastHandler(ToastType.Error, "Couldnot load the post");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <Box maxW="40rem" margin="auto" p="2rem" pt="5rem" h="100vh">
      {isLoading ? (
        <Loader size="lg" />
      ) : (
        post && <PostCard post={post} key={post._id} />
      )}
    </Box>
  );
};
