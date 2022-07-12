import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthentication } from "../Authentication/AuthenticationSlice";
import { updateProfilePhoto, updateProfileInfo } from "./ProfileSlice";
import { uploadImage } from "../Posts/utils";
import {
  Avatar,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Box,
  Input,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  profileAvatarStyle,
  inputWrapperStyle,
  inputStyle,
  navIconStyle,
} from "../Styles";
import { ToastHandler, ToastType } from "../../Utils/ToastUtils";
import { BiImageAdd } from "react-icons/bi";

export const EditProfile = () => {
  const [processing, setProcessing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthentication();
  const dispatch = useDispatch();
  const [updatedProfileData, setUpdatedProfileData] = useState();

  const handleOpen = () => {
    setUpdatedProfileData(user);
    onOpen();
  };

  const handleClose = () => {
    onClose();
    setUpdatedProfileData(null);
  };

  const handleProfilePicChange = async (e) => {
    try {
      const data = await uploadImage(e.target.files[0]);

      if (data) {
        dispatch(updateProfilePhoto(data.url));
        console.log(data);
        ToastHandler(ToastType.Success, "Profile picture updated ");
      } else {
        ToastHandler(ToastType.Error, "Somrthing went wrong ");
      }
    } catch (error) {
      console.log(error);
      ToastHandler(ToastType.Success, "Something went Wrong ");
    }
  };

  const submitHandler = () => {
    if (!updatedProfileData.firstName || !updatedProfileData.lastName) {
      ToastHandler(ToastType.Warn, "Please fill Firstname and Lastname  ");
    } else {
      setProcessing(true);
      dispatch(updateProfileInfo(updatedProfileData)).finally(() => {
        onClose();
        setProcessing(false);
      });
    }
  };

  return (
    <>
      <Button variant="outlineSecondary" onClick={handleOpen}>
        Edit profile
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box>
                <Avatar
                  src={user?.profilephoto}
                  {...profileAvatarStyle}
                  ml="32"
                />
                <Menu>
                  <MenuButton>
                    <Icon as={BiImageAdd} {...navIconStyle} mt="24" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <FormLabel htmlFor="profilepic">
                        New Profile Photo
                      </FormLabel>
                      <Input
                        type="file"
                        id="profilepic"
                        onChange={handleProfilePicChange}
                        accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                        display="none"
                      />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(updateProfilePhoto(""));
                      }}
                      color="primary.50"
                    >
                      Remove profile photo
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <FormControl isRequired {...inputWrapperStyle}>
                  <Input
                    {...inputStyle}
                    type="text"
                    placeholder="Enter first name"
                    value={updatedProfileData?.firstName}
                    onChange={(e) => {
                      setUpdatedProfileData({
                        ...updatedProfileData,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired {...inputWrapperStyle}>
                  <Input
                    {...inputStyle}
                    type="text"
                    placeholder="Enter last name"
                    value={updatedProfileData?.lastName}
                    onChange={(e) => {
                      setUpdatedProfileData({
                        ...updatedProfileData,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired {...inputWrapperStyle}>
                  <Input
                    {...inputStyle}
                    type="text"
                    placeholder="Portfolio Url"
                    value={updatedProfileData?.link}
                    onChange={(e) => {
                      setUpdatedProfileData({
                        ...updatedProfileData,
                        link: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired {...inputWrapperStyle}>
                  <Input
                    {...inputStyle}
                    type="text"
                    placeholder="Enter Bio"
                    value={updatedProfileData?.description}
                    onChange={(e) => {
                      setUpdatedProfileData({
                        ...updatedProfileData,
                        description: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={processing}
              variant="solidPrimary"
              onClick={submitHandler}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
