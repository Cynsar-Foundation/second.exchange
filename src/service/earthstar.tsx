import React, { PropsWithChildren, useContext, useEffect } from "react";
import { useReplica } from "react-earthstar";
import * as EarthstarService from "earthstar";
import { Crypto, setGlobalCryptoDriver } from "earthstar";
import { CryptoDriverSchnorr } from "../utils/setGlobalCrypto";

export interface IEarthStarService {
  getService(): any;
  getReplica(): any;
  setCryptoDriver(): any;
  generateShares(value: string): any;
}

export const EarthStarServiceContext = React.createContext<
  IEarthStarService | undefined
>(undefined);

const useEarthStarContext = () => {
  const context = useContext<IEarthStarService | undefined>(
    EarthStarServiceContext
  );
  if (context === undefined) {
    throw new Error(
      `Earth Star Service Context Was Not Provided. Make sure that your component is a child of EarthStarService`
    );
  }
  return context;
};

const EarthStarService: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const getService = () => EarthstarService;

  // Define how you get the replica. This should match your actual logic.
  const getReplica = () => {
    // Your logic to create and return a replica
  };

  const generateShares = async (sample: string) => {
    console.log("Creating shares");
    const shareKeypair = await Crypto.generateShareKeypair(sample);
    console.log("Creating shares finished", shareKeypair);
    return shareKeypair;
  };

  const keyPairAuthor = async (name: string) => {
    await Crypto.generateAuthorKeypair(name);
  };

  const setCryptoDriver = async () => {
    return setGlobalCryptoDriver(CryptoDriverSchnorr);
  };

  const earthStarService: IEarthStarService = {
    getService,
    getReplica,
    setCryptoDriver,
    generateShares,
  };

  useEffect(() => {
    earthStarService.setCryptoDriver();
  }, []);
  return (
    <EarthStarServiceContext.Provider value={earthStarService}>
      {children}
    </EarthStarServiceContext.Provider>
  );
};

export { useEarthStarContext };
export default EarthStarService;
