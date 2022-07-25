import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  Icon,
  Box,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { SearchUsers } from "../Users/SearchUsers";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import {
  navBarStyle,
  navBarLogoStyle,
  inputStyle,
  inputWrapperStyle,
} from "../Styles";
import Logo from "./Logo.PNG";

export const Navbar = () => {
  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        {...navBarStyle}
        alignItems="center"
      >
        <GridItem w="100%" align="center">
          <Link to="/">
            <Image src={Logo} {...navBarLogoStyle} />
          </Link>
        </GridItem>
        <GridItem w={{ base: "100%", md: "75%" }}>
          <SearchUsers />
        </GridItem>
        <GridItem w="100%">
          <DesktopNavbar />
        </GridItem>
      </Grid>
      <MobileNavbar />
    </>
  );
};
