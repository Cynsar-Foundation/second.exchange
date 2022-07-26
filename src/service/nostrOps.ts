import { defaultRelays } from "../config/defaultRelays";
import { NostrEvent, Post } from "../types";
import { getPrivateKey, getPublicKey } from "../utils";

export const publishPost = async (postContent: Post) => {
  const { relayPool } = await import("nostr-tools");
  const pool = relayPool();
  const privateKey = getPrivateKey();
  const publicKey = getPublicKey();
  pool.setPrivateKey(privateKey);
  defaultRelays.map((relayUrl: string) => pool.addRelay(relayUrl));
  const event = {
    pubkey: publicKey,
    created_at: Math.floor(Date.now() / 1000),
    kind: 1,
    tags: [],
    content: JSON.stringify(postContent),
  };
  await pool.publish(event);
};

export const getMyPosts = () => {
  return [];
};
