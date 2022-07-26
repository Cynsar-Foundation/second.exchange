import {
  Avatar,
  Divider,
  Flex,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

const Post: React.FC = () => {
  const router = useRouter();

  const authorId = "testId";
  const title = "Sample Title";
  const body =
    "Labore incididunt cillum cillum incididunt adipisicing tempor est occaecat nisi non irure anim nisi dolore. Sunt sunt cupidatat tempor do veniam incididunt laborum laboris qui ut fugiat Lorem. Occaecat labore esse proident duis in ad irure ullamco.";
  const date = new Date();

  return (
    <>
      <Flex width="100%" alignItems="center" justifyContent="center">
        <Flex
          flexDirection="column"
          justifyContent="center"
          mt="30px"
          maxWidth="700px"
          rowGap="10px"
        >
          <Flex alignItems="center" columnGap="15px">
            <Tooltip label={authorId}>
              <Avatar
                cursor="pointer"
                onClick={() => router.push(`/user/${authorId}`)}
              />
            </Tooltip>
            <Flex flexDirection="column">
              <Heading>{title}</Heading>
              <Text color="gray.600" mt="5px">
                {moment(date).format("Do MMM YYYY")}
              </Text>
            </Flex>
          </Flex>
          <Divider borderColor="#898989" />
          <Text mt="10px">{body}</Text>
          <Flex mt="20px" justifyContent="flex-start">
            <Text fontSize="25px" fontWeight="bold">
              Comments
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Post;
