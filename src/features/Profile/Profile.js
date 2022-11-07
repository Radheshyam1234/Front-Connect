import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loadUserProfile,
  resetProfile,
  useProfile,
  followUserFromProfilePage,
  unFollowUserFromProfilePage,
} from "./ProfileSlice";
import { usePostSelector } from "../Posts/postSlice";
import {
  useAuthentication,
  logoutUser,
} from "../Authentication/AuthenticationSlice";
import {
  Flex,
  HStack,
  VStack,
  Box,
  Avatar,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
} from "@chakra-ui/react";
import { BsGrid3X3, BsFillBookmarkFill } from "react-icons/bs";
import { PostCard } from "../Posts/PostCard";
import { EditProfile } from "./EditProfile";
import { FollowersContainer } from "../Followers/FollowersContainer";
import { FollowingContainer } from "../Following/FollowingContainer";
import {
  profileAvatarStyle,
  profileDetailsWrapperStyle,
  countStyle,
} from "../Styles";
import { Loader } from "../../Loader/Loader";

export const Profile = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const { userName } = useParams();
  const { profileDetails, profileFound } = useProfile();
  const { posts } = usePostSelector();
  const { user } = useAuthentication();
  const [isProfileOfUserloggedin, setIsProfileOfUserloggedin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserProfile(userName));
    return () => {
      dispatch(resetProfile());
      setIsProfileOfUserloggedin(false);
    };
  }, [userName]);

  useEffect(() => {
    if (user && profileDetails && user?._id === profileDetails?._id) {
      setIsProfileOfUserloggedin(true);
    }
  }, [profileDetails, user]);

  useEffect(() => {
    if (!profileFound) {
      navigate("/notfound");
    }
  }, [profileFound]);

  return (
    <Box h="100vh">
      {profileDetails ? (
        <Box maxW="90%" margin="auto">
          <Box maxW="50rem" margin="auto" pt="20">
            <Flex {...profileDetailsWrapperStyle}>
              <Avatar
                src={
                  isProfileOfUserloggedin
                    ? user?.profilephoto
                    : profileDetails?.profilephoto
                }
                {...profileAvatarStyle}
              />
              <Box pl={{ base: "0", md: "24" }}>
                <HStack alignItems="center" mb="1rem">
                  <Text pr="1.5rem" fontSize="2xl" fontWeight="300">
                    {profileDetails?.userName}
                  </Text>
                  {user?._id === profileDetails?._id ? (
                    <EditProfile />
                  ) : (
                    <>
                      {profileDetails?.followers.includes(user?._id) ? (
                        <Button
                          disabled={processing}
                          variant="solidSecondary"
                          onClick={() => {
                            setProcessing(true);
                            dispatch(
                              unFollowUserFromProfilePage(
                                profileDetails?.userName
                              )
                            ).finally(() => setProcessing(false));
                          }}
                        >
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          disabled={processing}
                          variant="solidPrimary"
                          onClick={() => {
                            setProcessing(true);
                            dispatch(
                              followUserFromProfilePage(
                                profileDetails?.userName
                              )
                            ).finally(() => setProcessing(false));
                          }}
                        >
                          Follow
                        </Button>
                      )}
                    </>
                  )}
                </HStack>

                <HStack spacing="1.5rem" mb="1rem">
                  <Text>
                    <Text {...countStyle}>
                      {
                        [
                          ...posts.filter(
                            (post) => post.postedBy._id === profileDetails?._id
                          ),
                        ].length
                      }{" "}
                      Posts
                    </Text>
                  </Text>
                  <Text>
                    <Text {...countStyle}>
                      {isProfileOfUserloggedin
                        ? user?.followers?.length
                        : profileDetails?.followers?.length}
                    </Text>
                    <FollowersContainer userName={profileDetails?.userName} />
                  </Text>
                  <Text>
                    <Text {...countStyle}>
                      {isProfileOfUserloggedin
                        ? user?.following?.length
                        : profileDetails?.following?.length}
                    </Text>
                    <FollowingContainer userName={profileDetails?.userName} />
                  </Text>
                </HStack>
                <VStack alignItems="left" spacing="0.25rem">
                  <Text fontWeight="500">
                    {isProfileOfUserloggedin
                      ? user?.firstName + " " + user?.lastName
                      : profileDetails?.firstName +
                        " " +
                        profileDetails?.lastName}
                  </Text>
                  <Text>
                    {isProfileOfUserloggedin
                      ? user?.description
                      : profileDetails?.description}
                  </Text>
                  <Text>
                    <a
                      href={
                        isProfileOfUserloggedin
                          ? user?.link
                          : profileDetails?.link
                      }
                    >
                      {isProfileOfUserloggedin
                        ? user?.link
                        : profileDetails?.link}
                    </a>
                  </Text>
                  {user?.userName === profileDetails?.userName && (
                    <Button
                      variant="solidPrimary"
                      onClick={() => dispatch(logoutUser())}
                    >
                      LogOut
                    </Button>
                  )}
                </VStack>
              </Box>
            </Flex>
          </Box>
          <Tabs>
            <TabList display="flex" justifyContent="center">
              <Tab mr="16">
                <Icon as={BsGrid3X3} mr="4" /> Posts
              </Tab>
              {user?.userName === profileDetails?.userName && (
                <Tab>
                  <Icon as={BsFillBookmarkFill} mr="4" /> Bookmarked
                </Tab>
              )}
            </TabList>
            <TabPanels maxWidth="40rem" m="auto">
              <TabPanel>
                {posts && (
                  <Box>
                    {[
                      ...posts.filter(
                        (post) => post.postedBy._id === profileDetails?._id
                      ),
                    ].map((post) => {
                      return <PostCard post={post} key={post._id} />;
                    })}
                  </Box>
                )}
              </TabPanel>
              <TabPanel>
                {user && posts && (
                  <>
                    {posts
                      ?.filter((post) => user?.savedpost?.includes(post._id))
                      .map((savedpost) => {
                        return (
                          <PostCard post={savedpost} key={savedpost._id} />
                        );
                      })}
                  </>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      ) : (
        <Loader size="lg" />
      )}
    </Box>
  );
};
