import React from "react";
import { Link } from "react-router-dom";
import { Flex, Icon } from "@chakra-ui/react";
import { mobileNavWrapperStyle } from "../Styles";
import { CgAdd } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { VscBell } from "react-icons/vsc";
import { navIconStyle } from "../Styles";

export const MobileNavbar = () => {
  return (
    <Flex {...mobileNavWrapperStyle}>
      <Link to="/">
        <Icon as={IoHomeOutline} {...navIconStyle} />
      </Link>
      <Icon as={MdOutlineExplore} {...navIconStyle} />
      <Icon as={CgAdd} {...navIconStyle} />
      <Icon as={VscBell} {...navIconStyle} />
    </Flex>
  );
};
