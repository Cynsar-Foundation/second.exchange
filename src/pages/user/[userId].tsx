import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { relayPoolAtom } from "../../atoms/relayPoolAtom";
import { useNostrOps } from "../../service/nostrOps";

type UserProfileProps = {};

const UserProfile: React.FC<UserProfileProps> = () => {
  const pool = useAtomValue(relayPoolAtom);
  const router = useRouter();
  const userId = router.query.userId;
  const { fetchedUserPosts, getUserPostsById } = useNostrOps();
  useEffect(() => {
    getUserPostsById(pool, String(userId));
    console.log(fetchedUserPosts);
  }, []);
  console.log();
  return <div>Have a good coding</div>;
};
export default UserProfile;
