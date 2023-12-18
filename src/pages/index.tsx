import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { homeFeed, homeFeedAtoms } from "../atoms/homeFeedAtom";
import PostItem from "../components/Post/PostItem";
import { getUniquePosts, toDateTime } from "../utils";
import Head from "next/head";
import { useNostrSetupService } from "../service/nostrSetup";
import UserProfile from "../components/SocialFeed/FollowUser";
import { useNostrOpsService } from "../service/nostrOps";
import { useHomeFeedContext } from "../service/homefeed";
import { ndkAtom } from "../atoms/ndkAtom";
import UserProfiles from "../components/SocialFeed/FollowUser";

/**
 * This is the home feed, this is going to take a lot of data from here and there and fix it here. 
 * So mostly services would feed in here.
 * 
 */

type PostType = {
  id: string;
  created_at: string;
  pubkey: string;
  content: string;
  title: string;
};

const Home: NextPage = () => {
  const ndk = useAtomValue(ndkAtom)
  const otherUsersTofollow = useAtomValue(homeFeedAtoms);
  const [showPosts, setShowPosts] = useState(false);
  const [usersToFollow , setUsersToFollow] = useState<NostrEvent[]>([])
  const [loadTime, setLoadTime] = useState(1500);
  const [posts, setPosts] = useState<PostType[]>([]);
  const setupServices = useNostrSetupService();
  const feedService = useHomeFeedContext()
  const [hasFetchedUsers, setHasFetchedUsers] = useState(false);

  useEffect(() => {
    if (!hasFetchedUsers && (setupServices.isNDKInitialized() || ndk)) {
      feedService.getUserDetails().then(() => {
        setHasFetchedUsers(true);
      });
    }
  }, [setupServices, ndk, hasFetchedUsers, feedService]);

  const renderPosts = () => {
    if (!otherUsersTofollow) {
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
          <Text>Looks like there is no content here :(</Text>
          <Text>
            Maybe start following a list of user.
          </Text>
          { otherUsersTofollow && 
            <UserProfiles
            profileData={otherUsersTofollow}
            onFollow={'c'}
          />}
        </Flex>
      );
    }
// {
//   "content": "OPENSATS IS PROVIDING FUNDING TO SIXTY OPEN SOURCE CONTRIBUTORS AND PROJECTS. MORE TO BE APPROVED SOON.\n\nWE OPERATE ON A BITCOIN STANDARD. ALL FIAT DONATIONS ARE IMMEDIATELY CONVERTED TO BITCOIN. OUR TREASURY SECURED BY GEOGRAPHICALLY DISTRIBUTED MULTISIG WALLETS.\n\n100% OF ALL DONATIONS ARE PAID TO GRANT RECIPIENTS. WE DO NOT TAKE A CUT. GRANTS ARE PAID IN BITCOIN. MONTHLY. \n\nONWARD 🫡\n\nhttps://opensats.org",
//   "created_at": 1702842731,
//   "id": "d5541899c0aa8c675de89f46f39d76711fff74cecc979e5c1188e6df24e4d59a",
//   "kind": 1,
//   "pubkey": "04c915daefee38317fa734444acee390a8269fe5810b2241e5e6dd343dfbecc9",
//   "sig": "e2f4b64311210a482aa82d6486ef5ea50332118575c9d83e97263f310be60b14920f00a41d89e20c23902ef0a5a30419c1b6352912ee7da7c5712cee4139f093",
//   "tags": [],
//   "relays": [
//     "wss://nostr.wine/"
//   ]
// }
// {
//   "content": "Decentralization is rarely appreciated by those who sit at or near the center of the system.\n\nInstead, it tends to be appreciated by those at the periphery of the system, as well as those who do sit near the center but can still see things from their perspective.",
//   "created_at": 1702847060,
//   "id": "a6e6512a0ad970702059b03e14464c9cc9cf5523bbeb333a7501b24c918a621f",
//   "kind": 1,
//   "pubkey": "eab0e756d32b80bcd464f3d844b8040303075a13eabc3599a762c9ac7ab91f4f",
//   "sig": "52a77409639951374431a5174b9e335f0da73628173bf9673fa03b603d1434751d5af36bf66deb0120394d52987beb33c1bbf443b4d4ca77418a31c641f02d3d",
//   "tags": []
// }
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
