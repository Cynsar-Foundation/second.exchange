import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { getPublicKey } from "../utils";
import {useNostrSetupService}  from "./nostrSetup";
import NDK, { NDKEvent, NDKRelay, NDKSigner } from "@nostr-dev-kit/ndk";
import { profile } from "console";
import { useAtom } from "jotai";
import { homeFeedAtoms } from "../atoms/homeFeedAtom";

export interface INostrOps {
  getUserFromOtherRelay(relayUrl: any, pubKey?: string): any
  getPostById(pool:any, postId: string): any
  getPostComments(pool: any, postId: string): any
  publishPost(post: Post, pool: any): any
  publishComment(commentTex: any, tags: any, pool: any) : any
  _fetchedPost(): Promise<NostrEvent | undefined>
  updateAndPublishUserProfile(profileName: string,ndk: NDK,pubKey: string): any
  getCurrentUser(): any
}

export const NostrOpsContext = createContext<INostrOps | undefined >(undefined)

const NostrOpsService: React.FunctionComponent<PropsWithChildren> = ({children}: any) => {
  const [fetchedPost, setFetchedPost] = useState<NostrEvent | undefined>(undefined)
  const [fetchedComments, setFetchedComments] = useState<NostrEvent[]>([])
  const nostrSetupService = useNostrSetupService()
  const [feed, setFeed] = useAtom(homeFeedAtoms)
  const service = {
    
    getUserFromOtherRelay: async (pubKeys:[]) => {
      let ndkInstance = nostrSetupService.getNDK();
      if (!ndkInstance) {
        throw new Error('NDK instance not initialized');
      }
    
      try {
        // Subscribe to all provided public keys
        const subscription = ndkInstance.subscribe({ kinds: [0], authors: pubKeys });
        subscription.on('event', (event, relay, subscription) => {
          console.log('Received event:', event.content);
          setFeed(prevFeed => [...prevFeed, event.content]);
        });
        return subscription;
      } catch (error) {
        console.error('Error in getUserFromOtherRelay:', error);
        return null; // Return null or handle as required
      }
    },
      // This should check if the user key b
      updateAndPublishUserProfile: async (
        profileName: string,
        ndk: NDK, 
        pubkey: string
      ) => {
        if (!ndk) return
        const user = ndk.getUser({npub: pubkey})
        const profile = await user.fetchProfile()
        if (profile){
          profile.name = profileName
          await user.publish()
        } else {
          console.log('No profile fetched for user:', pubkey)
          user.profile.name = profileName
          await user.publish()
        }
      },

      getCurrentUser: async(

      ) => {
        const ndk = nostrSetupService.getNDK()
        const user = ndk.getUser({npub: ndk.activeUser?.npub})
        const presentUser  = await  user.fetchProfile()
        return presentUser
      },
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

