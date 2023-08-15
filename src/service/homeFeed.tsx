import React, { PropsWithChildren, useContext } from "react";
import { useSetAtom } from "jotai";
import { authAtom } from "../atoms/authStateAtom";

export interface IHomeFeedService {
  setHomeFeed(): any;
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
  const setUserAuthenticated = useSetAtom(authAtom);

  const homeFeed = {
    async setHomeFeed() {
      if (typeof window !== "undefined") {
        const initAuthor = [
          "dfb0b888e9b322e90c3ee3b06fe5d3e79bc2f3bdf1ffe31002919512d90129a4",
        ];
        setUserAuthenticated(localStorage.getItem("keys") !== null);

        if (!localStorage.getItem("follow-list")) {
          localStorage.setItem("follow-list", JSON.stringify(initAuthor));
        }
      }
      return;
    },
  };

  return (
    <HomeFeedServiceContext.Provider value={homeFeed}>
      {children}
    </HomeFeedServiceContext.Provider>
  );
};

export { useHomeFeedContext };
export default HomeFeedService;
