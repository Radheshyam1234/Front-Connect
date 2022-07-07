import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthentication } from "../AuthenticationSlice";
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
import { loginUser } from "../AuthenticationSlice";
import {
  inputWrapperStyle,
  formWrapperStyle,
  inputStyle,
  inputRightElementIconStyle,
  headingStyle,
} from "../../Styles";
import { checkLoginFormValidity } from "./utils/checkLoginFormValidity";
export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuthentication();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  let from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    status: "",
    backendError: "",
  });
  const guestLogin = () => {
    setFormData({
      ...formData,
      email: "guestabc@gmail.com",
      password: "Guestp11@",
    });
  };

  const loginHandler = () => {
    if (checkLoginFormValidity({ formData, setFormData })) {
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token]);

  return (
    <SimpleGrid columns={[1, 1, 2]}>
      <Img
        p="4"
        display={{ base: "none", md: "block" }}
        src=" https://res.cloudinary.com/radheshyam11/image/upload/v1657204778/android-chrome-512x512_cq1pqw.png"
      />

      <Box>
        <Heading fontSize="x-large" {...headingStyle}>
          <Box>Front-Connect</Box>
        </Heading>

        <Box {...formWrapperStyle} p="8">
          <FormControl
            id="email"
            isRequired
            {...inputWrapperStyle}
            isInvalid={formData.emailError}
          >
            <Box>
              <Input
                {...inputStyle}
                type="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </Box>
            <FormErrorMessage>{formData.emailError}</FormErrorMessage>
          </FormControl>

          <Box>
            <FormControl
              id="password"
              isRequired
              {...inputWrapperStyle}
              isInvalid={formData.passwordError}
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
              <FormErrorMessage>{formData.passwordError}</FormErrorMessage>
            </FormControl>
          </Box>

          <Button variant="blockOutline" mt="8" onClick={guestLogin}>
            Guest User
          </Button>
          <Button variant="blockPrimary" mt="4" onClick={loginHandler}>
            Login
          </Button>
          <DividerWithTextOverlay />
          <Box mt="8" textAlign="center">
            Don't have an account?{" "}
            <Text as="span" color="primary.600" fontWeight="bold">
              Sign Up
            </Text>
          </Box>
        </Box>
      </Box>
    </SimpleGrid>
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
