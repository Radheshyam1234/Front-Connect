import React from "react";
import { Link } from "react-router-dom";
import { Flex, Icon } from "@chakra-ui/react";
import { mobileNavWrapperStyle } from "../Styles";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { VscBell } from "react-icons/vsc";
import { navIconStyle } from "../Styles";
import { CreatePost } from "../Posts/CreatePost";

export const MobileNavbar = () => {
  return (
    <Flex {...mobileNavWrapperStyle}>
      <Link to="/">
        <Icon as={IoHomeOutline} {...navIconStyle} />
      </Link>
      <CreatePost />
      <Link to="/explore">
        <Icon as={MdOutlineExplore} {...navIconStyle} />
      </Link>
    </Flex>
  );
};
