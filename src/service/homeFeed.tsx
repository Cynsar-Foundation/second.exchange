import { useSetAtom } from "jotai";
import React, { PropsWithChildren } from "react";
import { createContext, FC, useContext } from "react";
import { authAtom } from "../atoms/authStateAtom";

export interface IHomeFeedService {
    setHomeFeed(): any
}

export const HomeFeedServiceContext = createContext<IHomeFeedService | undefined>(undefined);

const HomeFeedService: React.FunctionComponent<PropsWithChildren> = ({children}: any) => {
    const setUserAuthenticated = useSetAtom(authAtom)

    const homeFeed = {
        async setHomeFeed() {
            if (typeof window !== "undefined") {
                const initAuthor = [
                    // This needs to done with some automation
                  "dfb0b888e9b322e90c3ee3b06fe5d3e79bc2f3bdf1ffe31002919512d90129a4",
                ];
                setUserAuthenticated(localStorage.getItem("keys") !== null);
                localStorage.getItem("follow-list") !== null
                  ? ""
                  : localStorage.setItem("follow-list", JSON.stringify(initAuthor));
              }
              return
        }
    }
    const useHomeFeedContext = () =>{
        const context = useContext<IHomeFeedService | undefined>(HomeFeedServiceContext)
        if (context ===  undefined) {
            throw new Error(`HomeFeed Service Context Was Not Provided, Make 
            sure that your component is a child of HomeFeedService`)
        }
        return context
    }

    return (
        <>
        <HomeFeedServiceContext.Provider
            value={homeFeed}
            >
                {children}
            </HomeFeedServiceContext.Provider>
        </>
    )
}

export default HomeFeedService