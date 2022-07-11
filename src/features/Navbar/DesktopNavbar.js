import React from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { CgAdd } from "react-icons/cg";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import {
  Box,
  HStack,
  Icon,
  Avatar,
  AvatarBadge,
  useColorMode,
} from "@chakra-ui/react";
import { smallAvatarStyle, navIconStyle } from "../Styles";
import { useAuthentication } from "../Authentication/AuthenticationSlice";

export const DesktopNavbar = () => {
  const { user } = useAuthentication();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack p="3" justify="end">
      <Box display={{ md: "block", base: "none" }}>
        <Icon as={CgAdd} {...navIconStyle} />
        <Link to="/">
          <Icon as={IoHomeOutline} {...navIconStyle} />
        </Link>

        <Link to="/">
          <Icon as={MdOutlineExplore} {...navIconStyle} />
        </Link>
      </Box>
      {colorMode === "dark" ? (
        <Icon
          as={BsToggleOn}
          onClick={() => toggleColorMode()}
          {...navIconStyle}
          fontSize="30px"
          mr="4"
        />
      ) : (
        <Icon
          as={BsToggleOff}
          onClick={() => toggleColorMode()}
          {...navIconStyle}
          fontSize="30px"
          mr="4"
        />
      )}
      <Box>
        <Link to="/">
          <Avatar src={user.profilephoto} {...smallAvatarStyle}>
            <AvatarBadge boxSize="1.2em" bg="green.300" />
          </Avatar>
        </Link>
      </Box>
    </HStack>
  );
};
