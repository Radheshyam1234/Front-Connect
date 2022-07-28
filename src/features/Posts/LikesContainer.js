import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getUsersWhoLikedThePost,
  resetUsersWhoLikedThePost,
} from "./postSlice";
import { usePostSelector } from "./postSlice";
import {
  useDisclosure,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { UserHorizontalCard } from "../Users/UserHorizontalCard";
import { likesCounterStyle } from "../Styles";

export const LikesContainer = ({ post }) => {
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { usersWhoLikedPost } = usePostSelector();
  const totalLikes = post.likes.length;

  const handleOpenLikeContainer = () => {
    onOpen();
    setLoading(true);
    const promise = dispatch(getUsersWhoLikedThePost({ postId: post._id }));
    promise.finally(() => setLoading(false));
  };

  const handleCloseLikeContainer = () => {
    onClose();
    dispatch(resetUsersWhoLikedThePost());
  };
  return (
    <>
      {totalLikes ? (
        <Text
          {...likesCounterStyle}
          onClick={handleOpenLikeContainer}
          cursor="pointer"
        >
          {totalLikes} likes
        </Text>
      ) : (
        ""
      )}

      <Modal isOpen={isOpen} onClose={handleCloseLikeContainer}>
        <ModalOverlay />
        <ModalContent maxH="25rem" overflow="auto">
          <ModalHeader>Likes</ModalHeader>

          {loading ? (
            "Loading"
          ) : (
            <>
              {usersWhoLikedPost?.map((user) => (
                <UserHorizontalCard key={user._id} user={user} />
              ))}
            </>
          )}
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
