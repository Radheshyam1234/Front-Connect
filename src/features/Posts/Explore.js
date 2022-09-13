import React, { useEffect, useState, useRef } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import axios from "axios";
import { PostCard } from "./PostCard";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { API_URL } from "../../Utils/Constants";
import { Loader } from "../../Loader/Loader";

export const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [infiniteScrollStatus, setInfinteScrollStatus] = useState({
    loading: false,
    completed: false,
  });
  const targetRef = useRef(null);

  const intersectionObserver = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
      }
    )
  );

  const getNewPost = async (pageNumber) => {
    setInfinteScrollStatus((prev) => ({ ...prev, loading: true }));
    try {
      const {
        data: { response },
      } = await axios({
        method: "GET",
        url: `${API_URL}/posts/page/${currentPage}`,
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      if (response.length > 0) {
        setPosts((prev) => {
          return [...prev, ...response];
        });
        intersectionObserver.current.observe(targetRef.current);
      } else {
        setInfinteScrollStatus({ loading: false, completed: true });
        intersectionObserver.current.unobserve(targetRef.current);
        return;
      }

      setInfinteScrollStatus((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewPost(currentPage);
  }, [currentPage]);

  return (
    <Box maxWidth="40rem" p="2rem" pt="5rem" overflow="auto" margin="auto">
      {posts.length > 0 &&
        posts.map((post) => {
          return <PostCard post={post} key={post._id} />;
        })}
      {infiniteScrollStatus.loading ? (
        <Box mt="4">
          <Loader size="lg" />
        </Box>
      ) : (
        ""
      )}
      {infiniteScrollStatus.completed ? (
        <Box display="flex" alignItems="center" justifyContent="center" pt="4">
          <Icon as={BsFillCheckCircleFill} color="green" fontSize="30px" />
          <Text ml="2">You are all caught up</Text>
        </Box>
      ) : (
        ""
      )}
      {<Box h="50px" ref={targetRef}></Box>}
    </Box>
  );
};
