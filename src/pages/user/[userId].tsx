import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { relayPoolAtom } from "../../atoms/relayPoolAtom";
import { useNostrOps } from "../../service/nostrOps";
import { getUniquePosts } from "../../utils";

type UserProfileProps = {};

const UserProfile: React.FC<UserProfileProps> = () => {
  const pool = useAtomValue(relayPoolAtom);
  const router = useRouter();
  const userId = router.query.userId;
  const { getUserPostsById, fetchedUserPosts } = useNostrOps();
  const [postList, setPostList] = useState<NostrEvent[]>([]);

  const fetchPosts = async () => {
    if (pool && postList.length === 0) {
      await getUserPostsById(pool, String(userId));
      console.log(fetchedUserPosts);
      if (fetchedUserPosts) setPostList(fetchedUserPosts);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [pool]);

  console.log(getUniquePosts(postList));

  return <div>Have a good coding</div>;
};
export default UserProfile;
