import { Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { relayPoolAtom } from "../atoms/relayPoolAtom";
import PostItem from "../components/Post/PostItem";
import { getUserPosts } from "../service/nostrOps";
import { getUniquePosts, toDateTime } from "../utils";

const MyPosts: React.FC = () => {
  const pool = useAtomValue(relayPoolAtom);
  const [showPosts, setShowPosts] = useState(false);
  const [loadTime, setLoadTime] = useState(1000);
  const [postList, setPostList] = useState<NostrEvent[]>([]);

  const fetchMyPosts = async () => {
    if (pool && postList.length === 0) {
      const myPosts = await getUserPosts(pool);
      setPostList(myPosts);
    }
  };

  const increaseLoadTime = () => {
    fetchMyPosts();
    setShowPosts(false);
    setLoadTime(loadTime + 1000);
  };

  useEffect(() => {
    fetchMyPosts();
  }, [pool]);

  useEffect(() => {
    setTimeout(() => setShowPosts(true), loadTime);
  }, [loadTime]);

  return (
    <>
      <Head>
        <title>Second Exchange</title>
      </Head>
      <Heading textAlign="center">My Posts</Heading>
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
          <Text>
            It could also be just that you don&apos;t have made any posts yet,
            start writing by clicking on the &quot;Post Blog&quot; button
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
          {getUniquePosts(postList).map((post) => {
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
