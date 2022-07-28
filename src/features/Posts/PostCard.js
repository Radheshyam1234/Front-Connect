import React, { useState } from "react";
import { Link } from "react-router-dom";
import Linkify from "react-linkify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { MdOutlineMoreVert } from "react-icons/md";

import {
  Avatar,
  Box,
  Button,
  Text,
  Icon,
  IconButton,
  Image,
  Flex,
  Spacer,
  Divider,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AvatarBadge,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { useAuthentication } from "../Authentication/AuthenticationSlice";
import { getTime, copyLink } from "./utils";
import { ComponentDecorator } from "../../Utils/ComponentDecorator";
import { followTheUser, unFollowTheUser } from "../Followers/FollowersSlice";
import { LikesContainer } from "./LikesContainer";
import { deletePost, likeThePost, removeLikeFromPost } from "./postSlice";
import { bookMarkPost, removeBookmarkPost } from "./postSlice";
import { EditPost } from "./EditPost";
import { CommentSection } from "./CommentSection";
import { useOnlineOrOfflineSelector } from "../OnlineOffline/OnlinOfflineSlice";
import { isUserOnline } from "../../Utils/CheckUserStatus";

import {
  postCardWrapperStyle,
  postCardUserInfoStyle,
  smallAvatarStyle,
  postCardContentStyle,
  dateStyle,
  postImageStyle,
  cardActionsStyle,
  cardActionIcon,
  commentsCounterStyle,
} from "../Styles";

export const PostCard = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [openComments, setOpenComments] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuthentication();
  const { activeUsers } = useOnlineOrOfflineSelector();
  const [likeBtnDisabled, setLikeBtnDisabled] = useState(false);
  const [bookmarkDisabled, setBookmarkDisabled] = useState(false);

  const likeUnlikeHandler = ({ type }) => {
    setLikeBtnDisabled(true);
    if (type === "like") {
      dispatch(likeThePost({ postId: post?._id })).finally(() => {
        setLikeBtnDisabled(false);
      });
    } else {
      dispatch(removeLikeFromPost({ postId: post?._id })).finally(() => {
        setLikeBtnDisabled(false);
      });
    }
  };
  const bookmarkRemoveBookmarkHandler = ({ type }) => {
    setBookmarkDisabled(true);
    if (type === "bookmark")
      dispatch(bookMarkPost(post._id)).finally(() => {
        setBookmarkDisabled(false);
      });
    else {
      dispatch(removeBookmarkPost(post._id)).finally(() => {
        setBookmarkDisabled(false);
      });
    }
  };

  const totalComments = post?.comments?.length;

  return (
    <>
      <Box {...postCardWrapperStyle} maxW={{ base: "20rem", sm: "35rem" }}>
        <Box {...postCardUserInfoStyle}>
          <Avatar src={post?.postedBy?.profilephoto} {...smallAvatarStyle}>
            {activeUsers && isUserOnline(activeUsers, post?.postedBy?._id) && (
              <AvatarBadge boxSize="1.2em" bg="green.300" />
            )}
          </Avatar>

          <Box>
            <Link to={`/${post?.postedBy?.userName}`}>
              <Text color="primary.800" cursor="pointer">
                {post?.postedBy?.userName}
              </Text>
              <Text {...dateStyle}>{getTime(post?.createdAt)}</Text>
            </Link>
          </Box>
          <Box ml="auto">
            <Menu>
              <MenuButton>
                <Icon as={MdOutlineMoreVert} />
              </MenuButton>
              <MenuList>
                {post?.postedBy?._id === user?._id && (
                  <>
                    <EditPost post={post} />
                    <MenuItem onClick={onOpen}>Delete</MenuItem>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                      isCentered
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogBody>
                            Are you sure want to delete this post ?
                          </AlertDialogBody>
                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                dispatch(deletePost(post?._id));
                                onClose();
                              }}
                              ml={3}
                            >
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </>
                )}

                <MenuItem onClick={() => copyLink({ post })}>Share</MenuItem>

                {post?.postedBy?._id !== user?._id && (
                  <>
                    {user?.following?.includes(post?.postedBy?._id) ? (
                      <MenuItem
                        onClick={() => {
                          dispatch(unFollowTheUser(post?.postedBy?.userName));
                        }}
                      >
                        Unfollow {post?.postedBy?.firstName}
                      </MenuItem>
                    ) : (
                      <MenuItem
                        onClick={() => {
                          dispatch(followTheUser(post?.postedBy?.userName));
                        }}
                      >
                        Follow {post?.postedBy?.firstName}
                      </MenuItem>
                    )}
                  </>
                )}
              </MenuList>
            </Menu>
          </Box>
        </Box>
        <Text {...postCardContentStyle}>
          <Linkify componentDecorator={ComponentDecorator}>
            {post?.content}
          </Linkify>
        </Text>

        {post?.photo && (
          <Image src={post?.photo} alt="Loading" {...postImageStyle} />
        )}

        <Flex {...cardActionsStyle}>
          <Box>
            {post?.likes?.includes(user?._id) ? (
              <IconButton
                isDisabled={likeBtnDisabled}
                color="red"
                icon={<AiFillHeart />}
                {...cardActionIcon}
                onClick={() => {
                  likeUnlikeHandler({ type: "removelike" });
                }}
              />
            ) : (
              <IconButton
                isDisabled={likeBtnDisabled}
                icon={<AiOutlineHeart />}
                {...cardActionIcon}
                onClick={() => {
                  likeUnlikeHandler({ type: "like" });
                }}
              />
            )}
          </Box>
          <Box ml="4">
            <Icon
              as={FaRegCommentDots}
              {...cardActionIcon}
              onClick={() => {
                setOpenComments(!openComments);
              }}
            />
          </Box>
          <Spacer />
          <Box>
            {user?.savedpost?.includes(post?._id) ? (
              <IconButton
                isDisabled={bookmarkDisabled}
                icon={<BsFillBookmarkFill />}
                {...cardActionIcon}
                onClick={() => {
                  bookmarkRemoveBookmarkHandler({ type: "removeBookmark" });
                }}
              />
            ) : (
              <IconButton
                isDisabled={bookmarkDisabled}
                icon={<BsBookmark />}
                {...cardActionIcon}
                onClick={() => {
                  bookmarkRemoveBookmarkHandler({ type: "bookmark" });
                }}
              />
            )}
          </Box>
        </Flex>
        <LikesContainer post={post} />
        <Text
          {...commentsCounterStyle}
          onClick={() => {
            setOpenComments(!openComments);
          }}
        >
          {totalComments > 0 ? <>View all {totalComments} comments</> : ""}
        </Text>

        <Divider mt="1" />

        {openComments && <CommentSection post={post} />}
      </Box>
    </>
  );
};
