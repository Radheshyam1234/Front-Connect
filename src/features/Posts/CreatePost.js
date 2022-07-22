import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  useDisclosure,
  Box,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Picker from "emoji-picker-react";
import { CgAdd } from "react-icons/cg";
import { FcAddImage } from "react-icons/fc";
import { uploadImage } from "./utils/uploadImage";
import { ToastHandler, ToastType } from "../../Utils/ToastUtils";
import {
  navIconStyle,
  uploadImageInputStyle,
  inputWrapperStyle,
  inputStyle,
} from "../Styles";
import { createPost } from "./postSlice";
import { usePostSelector } from "./postSlice";
import { Loader } from "../../Loader/Loader";

export const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { createPostStatus } = usePostSelector();
  const [postInput, setPostInput] = useState({
    content: "",
    photo: "",
  });
  const [seeInputImage, setSeeInputImage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [media, setMedia] = useState();
  const [uploadingImage, setUploadingImage] = useState(false);

  const clearInput = () => {
    setPostInput((postInput) => ({
      ...postInput,
      content: "",
    }));
    setSeeInputImage("");
  };

  const handleClose = () => {
    clearInput();
    onClose();
  };

  const onEmojiClick = (event, emojiObject) => {
    setPostInput((postInput) => ({
      ...postInput,
      content: postInput.content + emojiObject.emoji,
    }));
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    setMedia(file);
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let base64File = await toBase64(file);
    setSeeInputImage(base64File);
  };

  const createPostHandler = async () => {
    if (!media) {
      const postDetail = { ...postInput };
      dispatch(createPost({ postDetail }));
      clearInput();
      return;
    }
    try {
      setUploadingImage(true);
      const data = await uploadImage(media);
      setUploadingImage(false);
      if (data) {
        const postDetail = { ...postInput, photo: data.url };
        dispatch(createPost({ postDetail }));
        setMedia("");

        clearInput();
      } else {
        ToastHandler(ToastType.Error, "Somrthing went wrong ");
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Icon as={CgAdd} {...navIconStyle} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton onClick={handleClose} />
          <ModalBody>
            <FormControl isRequired {...inputWrapperStyle}>
              <Box>
                <Textarea
                  isRequired
                  {...inputStyle}
                  type="text"
                  placeholder="Write something here"
                  value={postInput.content}
                  onChange={(e) => {
                    setPostInput({ ...postInput, content: e.target.value });
                  }}
                />
              </Box>
            </FormControl>
            {seeInputImage ? <img src={seeInputImage} alt="post pic" /> : ""}

            {openEmoji && <Picker onEmojiClick={onEmojiClick} />}
          </ModalBody>

          <ModalFooter>
            <FormControl>
              <FormLabel htmlFor="photo" {...uploadImageInputStyle}>
                <Icon as={FcAddImage} fontSize="30px" />
                <Text ml={2} color="secondary.900">
                  Photo/Gif
                </Text>
              </FormLabel>
              <Input
                id="photo"
                type="file"
                display="none"
                accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                onChange={onFileChange}
              />
            </FormControl>

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
              isDisabled={
                postInput.content &&
                (!createPostStatus === "pending" || !uploadingImage)
                  ? false
                  : "true"
              }
              variant="solidPrimary"
              mr={3}
              onClick={(e) => {
                createPostHandler(e);
              }}
            >
              {createPostStatus === "pending" || uploadingImage ? (
                <Loader size="sm" />
              ) : (
                "Post"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
