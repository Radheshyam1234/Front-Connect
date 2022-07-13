import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Avatar,
  AvatarBadge,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { smallAvatarStyle, userHorizontalCardStyle } from "../Styles";
import { useAuthentication } from "../Authentication/AuthenticationSlice";

export const UserHorizontalCard = ({ user: person }) => {
  const { user } = useAuthentication();
  const dispatch = useDispatch();

  return (
    <>
      <Flex {...userHorizontalCardStyle}>
        <Link to={`/${person?.userName}`}>
          <Avatar src={person?.profilephoto} {...smallAvatarStyle} />
        </Link>

        <Box>
          <Link to={`/${person?.userName}`}>
            <Text fontSize="13px" fontWeight="semibold">
              {person?.userName}
            </Text>
            <Text fontSize="14px" color="secondary.900">
              {person?.firstName + " " + person?.lastName}
            </Text>
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Button variant="solidPrimary" size="sm">
            Follow
          </Button>
        </Box>
      </Flex>
    </>
  );
};
