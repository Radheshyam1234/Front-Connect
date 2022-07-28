import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Avatar,
  Box,
  Divider,
  Icon,
  Input,
  FormControl,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import {
  cardActionIcon,
  smallAvatarStyle,
  inputWrapperStyle,
  commentInputStyle,
} from "../Styles";
import { SingleComment } from "./SingleComment";
import { useAuthentication } from "../Authentication/AuthenticationSlice";
import { addComment } from "./postSlice";
import { API_URL } from "../../Utils/Constants";
import { Loader } from "../../Loader/Loader";

const getRootComments = (comments) => {
  return comments.filter((comment) => comment.parentCommentId == "null");
};

export const CommentSection = ({ post }) => {
  const { user } = useAuthentication();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCommentsOfaPost = async () => {
      try {
        setLoading(true);
        const {
          data: { response },
        } = await axios({
          method: "GET",
          url: `${API_URL}/posts/${post._id}/comment`,
          headers: {
            authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        });
        setComments(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCommentsOfaPost();
  }, [post]);
  return (
    <>
      <FormControl id="password" {...inputWrapperStyle} mt={2} width="auto">
        <Box>
          <InputGroup>
            <Input
              {...commentInputStyle}
              type="text"
              placeholder="Add a comment"
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
            />
            <InputLeftElement
              children={
                <Avatar
                  ml="4"
                  src={user?.profilephoto}
                  {...smallAvatarStyle}
                ></Avatar>
              }
            />
            <InputRightElement
              children={
                commentInput.length ? (
                  <Icon
                    as={BiSend}
                    {...cardActionIcon}
                    color="primary.500"
                    onClick={() => {
                      dispatch(addComment({ commentInput, postId: post._id }));
                      setCommentInput("");
                    }}
                  />
                ) : (
                  <Icon as={BiSend} {...cardActionIcon} color="primary.50" />
                )
              }
            />
          </InputGroup>
        </Box>
      </FormControl>
      <Divider />
      <Box maxH="20rem" overflow="auto">
        {comments?.length ? (
          getRootComments(comments)?.map((rootComment) => (
            <SingleComment
              comment={rootComment}
              postId={post._id}
              comments={comments}
              key={rootComment._id}
            />
          ))
        ) : loading ? (
          <Loader size="sm" />
        ) : (
          "No comments."
        )}
      </Box>
    </>
  );
};
