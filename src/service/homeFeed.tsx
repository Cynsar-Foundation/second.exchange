import React, { PropsWithChildren, useContext, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { authAtom } from "../atoms/authStateAtom";
import NostrSetupService, { useNostrSetupService } from "./nostrSetup";
import { useNostrOpsService } from "./nostrOps";
import { homeFeedAtoms } from "../atoms/homeFeedAtom";
/**
 * The home feed services fetches from the list of the follow list or the list stored somewhere in the world for the keys 
 * the approach should  be that where a user keys --> follow if no list then just simply ask the user to search from a list of keys , like how tags , etc
 * So that we can match the user follow and auto follow them and store them 
 */
export interface IHomeFeedService {
  setHomeFeed(): any;
  getUserDetails(): any
}

export const HomeFeedServiceContext = React.createContext<IHomeFeedService | undefined>(undefined);

const useHomeFeedContext = () => {
  const context = useContext<IHomeFeedService | undefined>(HomeFeedServiceContext);
  if (context === undefined) {
    throw new Error(`HomeFeed Service Context Was Not Provided. Make sure that your component is a child of HomeFeedService`);
  }
  return context;
};

const HomeFeedService: React.FunctionComponent<PropsWithChildren> = ({ children }: any) => {
  const service  = useNostrOpsService()
  const [feed, setFeed] = useAtom(homeFeedAtoms)
  const homeFeed = {
    async setHomeFeed() {
    
      const initAuthor = {
          pubkey: "04c915daefee38317fa734444acee390a8269fe5810b2241e5e6dd343dfbecc9",
          relayUrl: 'wss://nostr.wine/'

      } ;
      // Get the user Details 
      return;
    },
    async getUserDetails() {
      const initAuthors = ["04c915daefee38317fa734444acee390a8269fe5810b2241e5e6dd343dfbecc9",
                           "e88a691e98d9987c964521dff60025f60700378a4879180dcbbb4a5027850411"];
    
      try {
        const users = await service.getUserFromOtherRelay(initAuthors);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }    
  };


  return (
    <HomeFeedServiceContext.Provider value={homeFeed}>
      {children}
    </HomeFeedServiceContext.Provider>
  );
};

export { useHomeFeedContext };
export default HomeFeedService;
