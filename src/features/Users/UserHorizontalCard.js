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
import { followTheUser, unFollowTheUser } from "../Followers/FollowersSlice";

export const UserHorizontalCard = ({ user: person }) => {
  const [processing, setProcessing] = useState(false);
  const { user } = useAuthentication();
  const dispatch = useDispatch();

  const handleFollowUser = () => {
    setProcessing(true);
    const promise = dispatch(followTheUser(person.userName));
    promise.finally(() => setProcessing(false));
  };

  const handleUnFollowUser = () => {
    setProcessing(true);
    const promise = dispatch(unFollowTheUser(person.userName));
    promise.finally(() => setProcessing(false));
  };

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
          {user && user?._id === person?._id ? (
            <Text color="primary.500" fontWeight="semibold">
              You
            </Text>
          ) : (
            <>
              {user?.following?.includes(person?._id) ? (
                <Button
                  isDisabled={processing}
                  variant="solidPrimary"
                  size="sm"
                  onClick={() => {
                    handleUnFollowUser();
                  }}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  isDisabled={processing}
                  variant="outlinePrimary"
                  size="sm"
                  onClick={() => {
                    handleFollowUser();
                  }}
                >
                  Follow
                </Button>
              )}
            </>
          )}
        </Box>
      </Flex>
    </>
  );
};
