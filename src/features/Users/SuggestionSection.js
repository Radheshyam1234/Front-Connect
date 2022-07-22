import React, { useState, useEffect } from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import { UserHorizontalCard } from "./UserHorizontalCard";
import { mdAvatarStyle } from "../Styles";
import { Avatar, AvatarBadge, Flex, Spacer } from "@chakra-ui/react";
import { useAuthentication } from "../Authentication/AuthenticationSlice";
import { useUsers } from "./usersSlice";
import { Link } from "react-router-dom";

export const SuggestionSection = () => {
  const { allUsers } = useUsers();
  const { user } = useAuthentication();
  const [unfollowedUsers, setUnfollowedUsers] = useState();

  const getSixUnfollowedUsers = () => {
    return allUsers
      ?.filter(
        (person) =>
          !user?.following.includes(person._id) && person._id !== user?._id
      )
      .slice(0, 6);
  };

  return (
    <>
      <Box display={{ md: "block", base: "none" }}>
        <Flex>
          <Link to={`/${user?.userName}`}>
            <Avatar src={user?.profilephoto} {...mdAvatarStyle}>
              {user && <AvatarBadge boxSize="1.2em" bg="green.300" />}
            </Avatar>
          </Link>
          <Link to={`/${user?.userName}`}>
            <Box>
              <Text fontSize="14px" fontWeight="semibold">
                {user?.userName}
              </Text>

              <Text fontSize="12px" color="secondary.800" fontWeight="semibold">
                {user?.firstName + " " + user?.lastName}
              </Text>
            </Box>
          </Link>
          <Spacer />
          <Box as="span" color="primary.300">
            You
          </Box>
        </Flex>
        <Divider mt="1rem" />
        <Text color="secondary.700" fontWeight="500" m="1rem">
          Suggestions for you
        </Text>
        {getSixUnfollowedUsers()?.map((unfollowedUser) => {
          return (
            <UserHorizontalCard
              key={unfollowedUser._id}
              user={unfollowedUser}
            />
          );
        })}
      </Box>
    </>
  );
};
