import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { homeFeed } from "../atoms/homeFeedAtom";
import PostItem from "../components/Post/PostItem";
import { getUniquePosts, toDateTime } from "../utils";
import Head from "next/head";
import { useNostrSetupService } from "../service/nostrSetup";

type PostType = {
  id: string;
  created_at: string;
  pubkey: string;
  content: string;
  title: string;
};

const Home: NextPage = () => {
  const postList = useAtomValue(homeFeed);
  const [showPosts, setShowPosts] = useState(false);
  const [loadTime, setLoadTime] = useState(1500);
  const [posts, setPosts] = useState<PostType[]>([]);
  const setupServices = useNostrSetupService();

  useEffect(() => {
    if (setupServices) {
      setupServices.initPool();
    }
    setTimeout(() => setShowPosts(true), loadTime);
  }, [loadTime]);

  useEffect(() => {
    setPosts(postList);
  }, [postList]);

  const renderPosts = () => {
    if (!showPosts) {
      return (
        <Flex justifyContent="center" alignItems="center" height="70vh">
          <Spinner size="xl" />
        </Flex>
      );
    }

    if (posts.length === 0) {
      return (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="15px"
          height="70vh"
        >
          <Text>Looks like there is no data here :(</Text>
          <Text>
            Sometimes due to network or Relay connection issues the data
            doesn&apos;t load properly.
          </Text>
          {loadTime < 5500 ? (
            <Button onClick={() => setLoadTime((prev) => prev + 1000)}>
              Reload
            </Button>
          ) : (
            <Text>
              Maximum requests reached, please confirm that the data exists or
              reload the page to try again.
            </Text>
          )}
        </Flex>
      );
    }

    return posts.map((post) => {
      const postContent = JSON.parse(post.content);
      const postBody = postContent?.content?.replace(/<[^>]+>/g, "");
      return (
        <PostItem
          key={post.id}
          date={toDateTime(post.created_at)}
          authorId={post.pubkey}
          postId={post.id}
          title={postContent.title}
          body={postBody}
        />
      );
    });
  };

  return (
    <>
      <Head>
        <title>Second Exchange</title>
      </Head>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt="25px"
        gap="25px"
      >
        {renderPosts()}
      </Flex>
    </>
  );
};

export default Home;
