import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { UserHorizontalCard } from "../Users/UserHorizontalCard";
import { loadFollowing, resetFollowing } from "./FollowingSlice";
import { useFollowing } from "./FollowingSlice";
import { Loader } from "../../Loader/Loader";

export const FollowingContainer = ({ userName }) => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { followingDetails } = useFollowing();

  const dispatch = useDispatch();

  const handleOpenFollowingContainer = () => {
    setLoading(true);
    onOpen();
    const promise = dispatch(loadFollowing(userName));
    promise.finally(() => setLoading(false));
  };

  const handleCloseFollowingContainer = () => {
    onClose();
    dispatch(resetFollowing());
  };
  return (
    <>
      <Text
        as="button"
        onClick={handleOpenFollowingContainer}
        color="primary.700"
        cursor="pointer"
      >
        Following
      </Text>

      <Modal isOpen={isOpen} onClose={handleCloseFollowingContainer}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Followings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Loader size="sm" />
            ) : (
              <>
                {followingDetails && (
                  <>
                    {followingDetails.map((following) => {
                      return (
                        <UserHorizontalCard
                          user={following}
                          key={following._id}
                        />
                      );
                    })}
                  </>
                )}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
