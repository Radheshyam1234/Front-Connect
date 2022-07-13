import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { usePostSelector } from "./postSlice";
import { PostCard } from "./PostCard";
import { filterStyle, activeFilterStyle, navIconStyle } from "../Styles";
import { SuggestionSection } from "../Users/SuggestionSection";
const postFilter = ["My Feed", "Trending", "Oldest", "Following"];

export const Posts = () => {
  const { posts } = usePostSelector();
  const [filter, setFilter] = useState("My Feed");

  return (
    <>
      <Grid
        margin="auto"
        p="2rem"
        pt="5rem"
        templateColumns={{ md: "3fr 1fr", base: "1fr" }}
        gap="2rem"
        justifyContent="space-around"
      >
        <GridItem overflowY={{ md: "auto" }} maxH="95vh">
          {posts?.length == 0 ? (
            "Loading"
          ) : (
            <Box maxW="40rem" margin="auto">
              {postFilter.map((filterValue) => {
                return (
                  <Tag
                    {...(filter === filterValue
                      ? activeFilterStyle
                      : filterStyle)}
                    key={filterValue}
                    onClick={() => {
                      setFilter(filterValue);
                    }}
                  >
                    <TagLabel>{filterValue}</TagLabel>
                  </Tag>
                );
              })}

              {posts.slice(0, 6).map((post) => {
                return <PostCard post={post} key={post._id} />;
              })}
            </Box>
          )}
        </GridItem>
        <SuggestionSection />
      </Grid>
    </>
  );
};
