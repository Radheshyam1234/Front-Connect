import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Img,
  FormControl,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  Button,
  Input,
  Heading,
  SimpleGrid,
  Divider,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { submitSignUpForm } from "./utils";
import { useAuthentication } from "../AuthenticationSlice";
import {
  inputWrapperStyle,
  formWrapperStyle,
  inputStyle,
  inputRightElementIconStyle,
  headingStyle,
} from "../../Styles";
import { Link } from "react-router-dom";
export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { token, user } = useAuthentication();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    fnameError: "",
    lnameError: "",
    emailError: "",
    userNameError: "",
    passwordError: "",
  });

  return (
    <Box p="20">
      <Heading fontSize="x-large" {...headingStyle}>
        <Box>Front-Connect</Box>
      </Heading>

      <Box {...formWrapperStyle}>
        <Box>
          <FormControl
            id="fname"
            isRequired
            {...inputWrapperStyle}
            isInvalid={error.fnameError}
          >
            <Box>
              <Input
                {...inputStyle}
                type="text"
                placeholder="Enter first name"
                value={formData.fname}
                onChange={(e) => {
                  setFormData({ ...formData, fname: e.target.value });
                }}
              />
            </Box>
            {error.fnameError && (
              <FormErrorMessage>{error.fnameError}</FormErrorMessage>
            )}
          </FormControl>
        </Box>

        <Box>
          <FormControl
            id="lname"
            isRequired
            {...inputWrapperStyle}
            isInvalid={error.lnameError}
          >
            <Box>
              <Input
                {...inputStyle}
                type="text"
                placeholder="Enterlast name"
                value={formData.lname}
                onChange={(e) => {
                  setFormData({ ...formData, lname: e.target.value });
                }}
              />
            </Box>
            {error.lnameError && (
              <FormErrorMessage>{error.lnameError}</FormErrorMessage>
            )}
          </FormControl>
        </Box>

        <Box>
          <FormControl
            id="email"
            isRequired
            {...inputWrapperStyle}
            isInvalid={error.emailError}
          >
            <Box>
              <Input
                {...inputStyle}
                type="email"
                placeholder="abc@abc.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </Box>
            {error.emailError && (
              <FormErrorMessage>{error.emailError}</FormErrorMessage>
            )}
          </FormControl>
        </Box>

        <Box>
          <FormControl
            id="username"
            isRequired
            {...inputWrapperStyle}
            isInvalid={error.userNameError}
          >
            <Box>
              <Input
                {...inputStyle}
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
            </Box>
            {error.userNameError && (
              <FormErrorMessage>{error.userNameError}</FormErrorMessage>
            )}
          </FormControl>
        </Box>

        <Box>
          <FormControl
            id="password"
            isRequired
            {...inputWrapperStyle}
            isInvalid={error.passwordError}
          >
            <Box>
              <InputGroup>
                <Input
                  {...inputStyle}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
                <InputRightElement
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  children={
                    showPassword ? (
                      <ViewIcon {...inputRightElementIconStyle} />
                    ) : (
                      <ViewOffIcon {...inputRightElementIconStyle} />
                    )
                  }
                />
              </InputGroup>
            </Box>
            {error.passwordError && (
              <FormErrorMessage>{error.passwordError}</FormErrorMessage>
            )}
          </FormControl>
        </Box>

        <Button
          variant="blockPrimary"
          mt="4"
          onClick={() => {
            submitSignUpForm({ formData, setError, dispatch });
          }}
        >
          Sign Up
        </Button>
        <DividerWithTextOverlay />
        <Box mt="8" textAlign="center">
          Already have an account?{" "}
          <Link to="/signin">
            <Text as="span" color="primary.600" fontWeight="bold">
              Login
            </Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export const DividerWithTextOverlay = () => {
  return (
    <Box position="relative">
      <Divider mt="2rem" borderColor="secondary.500" />
      <Text
        fontSize="0.8rem"
        color="gray.500"
        position="absolute"
        top="-1.25rem"
        left="calc(50% - 1.6875rem)"
        bg="white"
        p="0.5rem 1rem"
      >
        OR
      </Text>
    </Box>
  );
};
