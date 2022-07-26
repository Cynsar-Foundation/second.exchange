import {
  Avatar,
  Divider,
  Flex,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { relayPoolAtom } from "../../atoms/relayPoolAtom";
import { getPostById } from "../../service/nostrOps";
import { NostrEvent, Post } from "../../types";

const PostPage: React.FC = () => {
  const router = useRouter();
  const pool = useAtomValue(relayPoolAtom);
  const postId = router.query.postId;
  const [postContent, setPostContent] = useState<NostrEvent | undefined>(
    undefined
  );
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let post;
    const fetchPost = async () => {
      if (pool) {
        post = await getPostById(pool, String(postId));
      }
    };
    setTimeout(() => fetchPost(), 2000);
    console.log(post);
    if (post !== null) setPostContent(post);
  }, [pool, reload, postId]);

  const authorId = "testId";
  const title = "Sample Title";
  const body =
    "Labore incididunt cillum cillum incididunt adipisicing tempor est occaecat nisi non irure anim nisi dolore. Sunt sunt cupidatat tempor do veniam incididunt laborum laboris qui ut fugiat Lorem. Occaecat labore esse proident duis in ad irure ullamco.";
  const date = new Date();

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      {postContent && postContent !== null && (
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
      )}
    </>
  );
};

export default PostPage;
