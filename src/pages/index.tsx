import { Button, Flex, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { homeFeed } from "../atoms/homeFeedAtom";
import PostItem from "../components/Post/PostItem";

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
          {postList.map((post) => (
            <PostItem
              key={post.content}
              date={new Date()}
              authorId="testId"
              postId="postId"
              title="test"
              body="Veniam eu id veniam magna eiusmod ex labore. Cillum aliquip est officia id culpa esse do voluptate ad eu anim commodo do. Irure duis deserunt velit adipisicing laborum culpa consequat qui ea consectetur consequat. Fugiat sunt culpa mollit ut excepteur labore sint. Exercitation cupidatat et occaecat minim proident commodo enim. Ullamco nisi non aliqua pariatur Lorem veniam consequat consequat exercitation."
            />
          ))}
        </Flex>
      )}
    </>
  );
};

export default Home;
