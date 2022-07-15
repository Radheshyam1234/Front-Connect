import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFollowers } from "./FollowersSlice";
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
import { loadFollowers, resetFollowers } from "./FollowersSlice";

export const FollowersContainer = ({ userName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { followersDetail } = useFollowers();

  const dispatch = useDispatch();

  const handleOpenFollowersContainer = () => {
    setLoading(true);
    onOpen();
    const promise = dispatch(loadFollowers(userName));
    promise.finally(() => setLoading(false));
  };

  const handleCloseFollowerContainer = () => {
    onClose();
    dispatch(resetFollowers());
  };
  return (
    <>
      <Text
        as="button"
        onClick={handleOpenFollowersContainer}
        color="primary.700"
        cursor="pointer"
      >
        Followers
      </Text>

      <Modal isOpen={isOpen} onClose={handleCloseFollowerContainer}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Followers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              "Loading"
            ) : (
              <>
                {followersDetail && (
                  <>
                    {followersDetail.map((follower) => {
                      return (
                        <UserHorizontalCard
                          user={follower}
                          key={follower._id}
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
