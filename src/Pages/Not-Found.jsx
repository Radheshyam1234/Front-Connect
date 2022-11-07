import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

export const NotFound = () => {
  return (
    <Box maxWidth="40rem" p="2rem" pt="5rem" overflow="auto" margin="auto">
      Sorry, this page isn't available. The link you followed may be broken, or
      the page may have been removed. Go back to{" "}
      <Link to="/" style={{ color: "red" }}>
        Front-Connect
      </Link>
    </Box>
  );
};
