import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { homeFeed } from "../atoms/homeFeedAtom";
import PostItem from "../components/Post/PostItem";
import { toDateTime } from "../utils";
import { Post } from "../types";

const Home: NextPage = () => {
  const postList = useAtomValue(homeFeed);
  const [showPosts, setShowPosts] = useState(false);
  const [loadTime, setLoadTime] = useState(1000);

  const increaseLoadTime = () => {
    setShowPosts(false);
    setLoadTime(loadTime + 1000);
  };

  useEffect(() => {
    setTimeout(() => setShowPosts(true), loadTime);
  }, [loadTime]);

  return (
    <>
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

export default Home;
