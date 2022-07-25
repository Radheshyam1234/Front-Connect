import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  Icon,
  Avatar,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  inputStyle,
  mdAvatarStyle,
  inputWrapperStyle,
  searchedUserCard,
} from "../Styles";
import { BiSearch } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { useUsers } from "./usersSlice";

const searchUsers = (users, search) => {
  if (search) {
    return users?.filter(({ userName, firstName, lastName }) => {
      const userNameLowerCase = userName.toLowerCase();
      const firstNameLowerCase = firstName.toLowerCase();
      const lastNameLowerCase = lastName.toLowerCase();
      const searchLowerCase = search.toLowerCase();
      return (
        userNameLowerCase.includes(searchLowerCase) ||
        firstNameLowerCase.includes(searchLowerCase) ||
        lastNameLowerCase.includes(searchLowerCase)
      );
    });
  }
  return [];
};

export const SearchUsers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allUsers } = useUsers();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    setSearchResults(searchUsers(allUsers, search));
  }, [search]);

  function debounceFun(searchHandler, delay) {
    let timerId;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timerId);
      timerId = setTimeout((e) => {
        setSearch(args[0].target.value);
      }, delay);
    };
  }

  const searchHandler = (args) => {
    setSearch(args[0].target.value);
  };
  const optimizedSearchHandler = useCallback(
    debounceFun(searchHandler, 600),
    []
  );

  const searchInputRef = useRef(null);

  const closeSearchResults = () => {
    setSearch("");
    onClose();
  };
  return (
    <Popover isOpen={isOpen} initialFocusRef={searchInputRef}>
      <PopoverTrigger>
        <FormControl id="password" {...inputWrapperStyle} mt={2} width="auto">
          <Box>
            <InputGroup>
              {!search && (
                <InputLeftElement
                  children={<Icon as={BiSearch} onClick={onOpen} />}
                />
              )}
              <Input
                autoComplete="off"
                {...inputStyle}
                ref={searchInputRef}
                onClick={onOpen}
                placeholder="Search user"
                onChange={optimizedSearchHandler}
                onBlur={closeSearchResults}
              />

              {search && (
                <InputRightElement
                  children={
                    <Icon
                      as={GrFormClose}
                      onClick={() => closeSearchResults()}
                    />
                  }
                />
              )}
            </InputGroup>
          </Box>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />

        <PopoverHeader>Search Results</PopoverHeader>

        <PopoverBody maxH="30rem" overflow="auto">
          {searchResults?.length !== 0 ? (
            searchResults?.map((searchedUser) => {
              return (
                <Link to={`/${searchedUser?.userName}`} key={searchedUser._id}>
                  <Flex
                    p="2"
                    {...searchedUserCard}
                    onClick={() => closeSearchResults()}
                  >
                    <Avatar
                      src={searchedUser.profilephoto}
                      {...mdAvatarStyle}
                    />

                    <Box>
                      <Text fontSize="14px">{searchedUser?.userName}</Text>
                      <Text
                        fontSize="12px"
                        color="secondary.800"
                        fontWeight="semibold"
                      >
                        {searchedUser?.firstName + " " + searchedUser?.lastName}
                      </Text>
                    </Box>
                  </Flex>
                </Link>
              );
            })
          ) : (
            <Text>No Results found</Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
