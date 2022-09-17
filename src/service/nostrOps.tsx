import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { getPublicKey } from "../utils";
import {useNostrSetupService}  from "./nostrSetup";

export interface INostrOps {
  getUserPosts(pool: any, userId?: string): Promise<NostrEvent[]>
  getPostById(pool:any, postId: string): any
  getPostComments(pool: any, postId: string): any
  publishPost(post: Post, pool: any): any
  publishComment(commentTex: any, tags: any, pool: any) : any
  _fetchedPost(): Promise<NostrEvent | undefined>
}

export const NostrOpsContext = createContext<INostrOps | undefined >(undefined)

const NostrOpsService: React.FunctionComponent<PropsWithChildren> = ({children}: any) => {
  const [fetchedPost, setFetchedPost] = useState<NostrEvent | undefined>(undefined)
  const [fetchedComments, setFetchedComments] = useState<NostrEvent[]>([])
  const nostrSetupService = useNostrSetupService()
  const service = {
    getUserPosts: async (pool: any, userId?: string) => {
      if (!pool) pool = nostrSetupService.reconnect(pool);
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
    },
    
    getPostById: async (pool: any, postId: string) => {
        if (!pool) {
          pool = await nostrSetupService.reconnect(pool);
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
      },
      getPostComments: async (pool: any, postId: string) => {
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
      },
      publishPost: async (postContent: Post, pool: any) => {
        if (!pool) pool = await nostrSetupService.reconnect(pool);
        const publicKey = getPublicKey();
        const event = {
          pubkey: publicKey,
          created_at: Math.floor(Date.now() / 1000),
          kind: 1,
          tags: [],
          content: JSON.stringify(postContent),
        };
        await pool.publish(event);
      },
     publishComment: async (
        commentText: string,
        tags: any = [],
        pool: any
      ) => {
        if (!pool) pool = await nostrSetupService.reconnect(pool);
        const publicKey = getPublicKey();
        const event = {
          pubkey: publicKey,
          created_at: Math.floor(Date.now() / 1000),
          kind: 1,
          tags: tags,
          content: JSON.stringify(commentText),
        };
        await pool.publish(event);
      },

      _fetchedPost: async() => {
        return fetchedPost;
      }
  }
  
  return (
    <>
      <NostrOpsContext.Provider value={service}>
         {children}
      </NostrOpsContext.Provider>
    </>
  )
}

export const useNostrOpsService = () =>{
  const context = useContext<INostrOps | undefined>(NostrOpsContext)
  if (context ===  undefined) {
      throw new Error(`NostrOps Service Context Was Not Provided, Make 
      sure that your component is a child of NostrOpsService`)
  }
  return context
}

export default NostrOpsService

// Returns logged in user's posts if no userId is provided otherwise returns posts of given userId

