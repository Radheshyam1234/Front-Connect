import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthentication } from "../Authentication/AuthenticationSlice";
import {
  Icon,
  Box,
  Text,
  Avatar,
  Flex,
  Spacer,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiSend } from "react-icons/bi";
import { smallAvatarStyle, cardActionIcon } from "../Styles";
import { addReply, deleteComment } from "./postSlice";

const getChildComments = (rootComment, comments) => {
  if (comments && rootComment)
    return comments.filter(
      (comment) =>
        comment.parentCommentId.toString() === rootComment._id.toString()
    );
};

export const SingleComment = ({ comment, postId, comments }) => {
  const dispatch = useDispatch();
  const { user } = useAuthentication();
  const [replyMessage, setReplyMessage] = useState("");
  const [openReplyInput, setOpenReplyInput] = useState(false);

  const handleReply = () => {
    let parentCommentId;
    if (comment.parentCommentId == "null")
      parentCommentId = comment._id.toString();
    else parentCommentId = comment.parentCommentId.toString();
    dispatch(addReply({ postId, replyMessage, parentCommentId }));
    setReplyMessage("");
    setOpenReplyInput(false);
  };
  return (
    <Box>
      <Box>
        <Flex p="2" alignItems="center">
          <Link to={`/${comment?.commentedBy?.userName}`}>
            <Avatar
              src={comment?.commentedBy?.profilephoto}
              {...smallAvatarStyle}
            />
          </Link>
          <Box {...commentStyle}>
            <Link to={`/${comment?.commentedBy?.userName}`}>
              <Text fontSize="10px" fontWeight="semibold">
                {comment.commentedBy.userName}
              </Text>
            </Link>
            <Text fontSize="12px">{comment.text}</Text>
          </Box>
          <Text
            color="secondary.500"
            ml="4"
            cursor="pointer"
            onClick={() => setOpenReplyInput(!openReplyInput)}
          >
            Reply
          </Text>
          <Spacer />
          {user._id === comment?.commentedBy?._id && (
            <Menu>
              <MenuButton>
                <Icon as={BiDotsVerticalRounded} />
              </MenuButton>
              <MenuList>
                {/* <MenuItem>Edit</MenuItem> */}
                <MenuItem
                  onClick={() =>
                    dispatch(deleteComment({ postId, commentId: comment._id }))
                  }
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
        {openReplyInput && (
          <InputGroup width="60%" ml="12">
            <Input
              type="text"
              placeholder="enter reply"
              value={replyMessage}
              onChange={(e) => {
                setReplyMessage(e.target.value);
              }}
            />
            <InputRightElement
              children={
                replyMessage.length ? (
                  <Icon
                    as={BiSend}
                    {...cardActionIcon}
                    color="primary.500"
                    onClick={handleReply}
                  />
                ) : (
                  <Icon as={BiSend} {...cardActionIcon} color="primary.50" />
                )
              }
            />
          </InputGroup>
        )}
      </Box>
      <Box ml="28">
        {" "}
        {getChildComments(comment, comments)?.map((childComment) => {
          return (
            <SingleComment
              comment={childComment}
              postId={postId}
              comments={comments}
            />
          );
        })}
      </Box>
    </Box>
  );
};

const commentStyle = {
  padding: "10px",
  background: "primary.900",
  color: "white",
  borderRadius: "20px 10px 25px 10px",
  maxWidth: "250px",
};
