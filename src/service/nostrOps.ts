import { useState } from "react";
import { getPublicKey } from "../utils";
import { reconnect } from "./nostrSetup";

// Returns logged in user's posts if no userId is provided otherwise returns posts of given userId
export const getUserPosts = async (pool: any, userId?: string) => {
  if (!pool) pool = reconnect(pool);
  const fetchedEvents: NostrEvent[] = [];
  console.log(userId);
  const pubKey = userId
    ? userId
    : localStorage.getItem("keys") !== null
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
  const [fetchedComments, setFetchedComments] = useState<NostrEvent[]>([]);

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

  const getPostComments = async (pool: any, postId: string) => {
    await pool.sub({
      cb: async (event: NostrEvent) => {
        if (!fetchedComments.includes(event)) {
          setFetchedComments((prev) => [...prev, event]);
        }
      },
      filter: [
        {
          "#e": [postId],
          kinds: [1],
        },
      ],
    });
  };

  const publishPost = async (postContent: Post, pool: any) => {
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

  const publishComment = async (
    commentText: string,
    tags: any = [],
    pool: any
  ) => {
    if (!pool) pool = await reconnect(pool);
    const publicKey = getPublicKey();
    const event = {
      pubkey: publicKey,
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: tags,
      content: JSON.stringify(commentText),
    };
    await pool.publish(event);
  };

  return {
    getPostById,
    fetchedPost,
    fetchedComments,
    publishPost,
    getPostComments,
    publishComment,
  };
};
