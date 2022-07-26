import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import PostItem from "../components/Post/PostItem";
import { getMyPosts } from "../service/nostrOps";
import { NostrEvent, Post } from "../types";
import { toDateTime } from "../utils";

type MyPostsProps = {};

const MyPosts: React.FC<MyPostsProps> = () => {
  const [showPosts, setShowPosts] = useState(false);
  const [loadTime, setLoadTime] = useState(1000);
  const [postList, setPostList] = useState<NostrEvent[]>([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const myPosts = await getMyPosts();
      console.log(myPosts);
      setPostList(myPosts);
    };
    fetchMyPosts();
  }, []);

  const increaseLoadTime = () => {
    setShowPosts(false);
    setLoadTime(loadTime + 1000);
  };

  useEffect(() => {
    setTimeout(() => setShowPosts(true), loadTime);
  }, [loadTime]);

  return (
    <>
      <Head>
        <title>Second Exchange</title>
      </Head>
      {!showPosts && (
        <Flex position="absolute" top="45%" left="47%">
          <Spinner size="xl" />
        </Flex>
      )}
      {showPosts && postList.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          rowGap="15px"
          position="absolute"
          top="40%"
          left="30%"
        >
          <Text>Looks like there is no data here :(</Text>
          <Text>
            Sometimes due to network or Relay connection issues the data
            doesn&apos;t load properly.
          </Text>
          {loadTime < 5500 ? (
            <Button onClick={increaseLoadTime}>Reload</Button>
          ) : (
            <Text>
              Maximum requests reached, please confirm that the data exists or
              reload the page to try again
            </Text>
          )}
        </Flex>
      )}
      {showPosts && (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt="25px"
          rowGap="25px"
        >
          {postList.map((post) => {
            const postContent: Post = JSON.parse(post.content);
            const postBody = postContent.content.replace(/<[^>]+>/g, "");
            return (
              <PostItem
                key={String(post.id)}
                date={toDateTime(post.created_at)}
                authorId={post.pubkey}
                postId={post.id!}
                title={postContent.title}
                body={postBody}
              />
            );
          })}
        </Flex>
      )}
    </>
  );
};

export default MyPosts;
