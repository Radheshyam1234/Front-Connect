import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "./postSlice";
import {
  Text,
  Input,
  FormLabel,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  MenuItem,
  Textarea,
} from "@chakra-ui/react";
import {
  inputWrapperStyle,
  inputStyle,
  uploadImageInputStyle,
} from "../Styles";
import Picker from "emoji-picker-react";

export const EditPost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedContent, setEditedContent] = useState();
  const [contentError, setContentError] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(false);
  const dispatch = useDispatch();

  const onEmojiClick = (event, emojiObject) => {
    setEditedContent(editedContent + emojiObject.emoji);
  };

  const handleOpenEditPostContainer = () => {
    setEditedContent(post?.content);
    onOpen();
  };

  const handleCloseEditPostContainer = () => {
    onClose();
    setEditedContent("");
    setOpenEmoji(false);
  };

  const handleSubmit = () => {
    if (!editedContent.length) {
      setContentError("Please enter the content.");
      return;
    }
    setSaveBtnDisabled(true);
    dispatch(editPost({ postId: post._id, editedContent })).finally(() => {
      setSaveBtnDisabled(false);
      onClose();
    });
  };
  return (
    <>
      <MenuItem onClick={handleOpenEditPostContainer}>Edit</MenuItem>
      <Modal isOpen={isOpen} onClose={handleCloseEditPostContainer}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Edit</ModalHeader>
          <ModalBody>
            <FormControl
              id="email"
              isRequired
              {...inputWrapperStyle}
              isInvalid={contentError}
            >
              <Box>
                <Textarea
                  height="8rem"
                  {...inputStyle}
                  type="text"
                  value={editedContent}
                  placeholder="Enter your content"
                  onChange={(e) => {
                    setEditedContent(e.target.value);
                  }}
                />
              </Box>
              <FormErrorMessage>{contentError}</FormErrorMessage>
            </FormControl>
            {openEmoji && <Picker onEmojiClick={onEmojiClick} />}
          </ModalBody>
          <ModalFooter>
            <FormControl m={2}>
              <FormLabel
                htmlFor="emoji"
                {...uploadImageInputStyle}
                onClick={() => {
                  setOpenEmoji(!openEmoji);
                }}
              >
                <Text fontSize="20px">😀</Text>
                <Text ml={2} color="secondary.900">
                  Emojis
                </Text>
              </FormLabel>
              <Input id="emoji" display="none" />
            </FormControl>
            <Button
              variant="solidPrimary"
              disabled={saveBtnDisabled}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
