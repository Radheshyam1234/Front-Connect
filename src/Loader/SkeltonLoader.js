import React from "react";

import { Box, Avatar, Text, Flex, Spacer } from "@chakra-ui/react";
import {
  postCardWrapperStyle,
  postCardUserInfoStyle,
  smallAvatarStyle,
  postCardContentStyle,
  postImageStyle,
  cardActionsStyle,
} from "../features/Styles";
import {
  avatarSkeltonLoaderStyle,
  mediumContentSkeltonLoaderStyle,
  postCardSkeltonLoaderStyle,
  postImageSkeltonLoaderStyle,
  smallContentSkeltonLoaderStyle,
} from "../features/Styles/skeltonLoader";

export const SkeltonLoader = () => {
  return (
    <>
      <Box
        className="skeleton"
        {...postCardWrapperStyle}
        {...postCardSkeltonLoaderStyle}
        maxW={{ base: "20rem", sm: "35rem" }}
      >
        <Box {...postCardUserInfoStyle}>
          <Avatar {...smallAvatarStyle} {...avatarSkeltonLoaderStyle} />

          <Box>
            <Box {...smallContentSkeltonLoaderStyle}></Box>
            <Box {...smallContentSkeltonLoaderStyle}></Box>
          </Box>
          <Box ml="auto"></Box>
        </Box>
        <Text {...postCardContentStyle}></Text>

        <Box {...postImageSkeltonLoaderStyle}></Box>
        <Flex {...cardActionsStyle}>
          <Box {...smallContentSkeltonLoaderStyle}></Box>
          <Box ml="4" {...smallContentSkeltonLoaderStyle}></Box>
          <Spacer />
          <Box {...smallContentSkeltonLoaderStyle}></Box>
        </Flex>
        <Box {...smallContentSkeltonLoaderStyle} mb="4"></Box>
        <Box {...mediumContentSkeltonLoaderStyle} mb="4"></Box>
      </Box>
    </>
  );
};
