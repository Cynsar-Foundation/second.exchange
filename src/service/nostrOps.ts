import { useState } from "react";
import { getPublicKey } from "../utils";
import { reconnect } from "./nostrSetup";

export const publishPost = async (postContent: Post, pool: any) => {
  if (!pool) pool = await reconnect(pool);
  const publicKey = getPublicKey();
  const event = {
    pubkey: publicKey,
    created_at: Math.floor(Date.now() / 1000),
    kind: 1,
    tags: [],
    content: JSON.stringify(postContent),
  };
  await pool.publish(event);
};

export const getMyPosts = async (pool: any) => {
  if (!pool) pool = reconnect(pool);
  const fetchedEvents: NostrEvent[] = [];
  const pubKey =
    localStorage.getItem("keys") !== null
      ? JSON.parse(localStorage.getItem("keys")!).publicKey
      : null;
  await pool.sub(
    {
      cb: async (event: NostrEvent) => {
        switch (event.kind) {
          case 0:
          case 1:
          case 2:
            fetchedEvents.push(event);
            return;
        }
      },
      filter: [
        {
          authors: [pubKey],
          kinds: [0, 1, 3],
        },
      ],
    },
    "profile-browser"
  );
  return fetchedEvents;
};

export const useNostrOps = () => {
  const [fetchedPost, setFetchedPost] = useState<NostrEvent | undefined>(
    undefined
  );
  const [fetchedUserPosts, setFetchedUserPosts] = useState<NostrEvent[]>();

  const getUserPostsById = async (pool: any, userId: string) => {
    if (!pool) pool = reconnect(pool);
    await pool.sub(
      {
        cb: async (event: NostrEvent) => {
          switch (event.kind) {
            case 0:
            case 1:
            case 2:
              setFetchedUserPosts((prev) => ({
                ...prev,
                event,
              }));
              return;
          }
        },
        filter: [
          {
            authors: [userId],
            kinds: [0, 1, 3],
          },
        ],
      },
      "profile-browser"
    );
  };

  const getPostById = async (pool: any, postId: string) => {
    if (!pool) {
      pool = await reconnect(pool);
    }
    await pool.sub(
      {
        cb: async (event: NostrEvent) => {
          switch (event.kind) {
            case 0:
            case 1:
            case 2:
            case 3:
              setFetchedPost(event);
              return;
          }
        },
        filter: { ids: [postId] },
        // filter: [
        //   {
        //     "#e": [postId],
        //     kinds: [0, 1, 2, 3],
        //   },
        // ],
      },
      "profile-browser"
    );
  };

  return { getPostById, fetchedPost, getUserPostsById, fetchedUserPosts };
};
