import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Linkify from "react-linkify";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { MdOutlineMoreVert } from "react-icons/md";
import { getTime, copyLink } from "./utils";
import { ComponentDecorator } from "../../Utils/ComponentDecorator";

import {
  Avatar,
  Box,
  Button,
  Text,
  Icon,
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
  likesCounterStyle,
} from "../Styles";

export const PostCard = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <Box {...postCardWrapperStyle}>
        <Box {...postCardUserInfoStyle}>
          <Avatar src={post?.postedBy?.profilephoto} {...smallAvatarStyle} />

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
                <>
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

                <MenuItem onClick={() => copyLink({ post })}>Share</MenuItem>

                <MenuItem>Follow {post?.postedBy?.firstName}</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
        <Text {...postCardContentStyle}>
          <Linkify componentDecorator={ComponentDecorator}>
            {post?.content}
          </Linkify>
        </Text>

        {post?.photo && <Image src={post?.photo} {...postImageStyle} />}

        <Flex {...cardActionsStyle}>
          <Box>
            <Icon as={AiOutlineHeart} {...cardActionIcon} />
          </Box>
          <Box ml="4">
            <Icon as={FaRegCommentDots} {...cardActionIcon} />
          </Box>
          <Spacer />
          <Box>
            <Icon as={BsBookmark} {...cardActionIcon} />
          </Box>
        </Flex>
        <Text {...likesCounterStyle}>8 likes</Text>
        <Text {...commentsCounterStyle}>View all 5 comments</Text>
      </Box>
    </>
  );
};
