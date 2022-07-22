import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

export const Loader = ({ size }) => {
  return (
    <Box display="flex" h="100%" justifyContent="center" alignItems="center">
      <Spinner size={size} color="red.500" />
    </Box>
  );
};
