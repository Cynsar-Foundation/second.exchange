import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

type PostItemProps = {
  title: string;
  date: Date;
  body: string;
  authorId: string;
  postId: string;
  comments?: number;
  votes?: number;
  authorProfilePic?: string;
};

const PostItem: React.FC<PostItemProps> = ({
  title,
  date,
  body,
  authorId,
  postId,
  comments,
  votes,
  authorProfilePic,
}) => {
  const router = useRouter();

  return (
    <Box
      border="1px solid #898989"
      p="10px 15px 15px 15px"
      borderRadius="lg"
      maxWidth="650px"
    >
      <Flex alignItems="center" columnGap="10px" mb="10px">
        <Tooltip label={authorId}>
          <Avatar
            cursor="pointer"
            onClick={() => router.push(`/user/${authorId}`)}
          />
        </Tooltip>
        <Flex flexDirection="column">
          <Heading
            color={useColorModeValue("brand.100", "white")}
            cursor="pointer"
            onClick={() => router.push(`/post/${postId}`)}
          >
            {title}
          </Heading>
          <Text color="gray.400" fontSize="14px">
            {moment(date).format("Do MMM YYYY")}
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Text noOfLines={3} mt="10px">
        {body}
      </Text>
      <Flex></Flex>
    </Box>
  );
};
export default PostItem;
