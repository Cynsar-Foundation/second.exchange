/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { WalletModal } from "../WalletModal";
import { useWalletModalValue } from "../../context";

import MetaMaskLogo from "../../assets/images/metamask.svg";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const Navbar = () => {
  const { walletOverlayActive, setWalletOverlayActive } =
    useWalletModalValue() || false;

  return (
    <Router>
      <div data-testid="NavbarContainer" className="NavbarContainer">
        <nav>
          <Link className="NavLogo" to="#">
            second.exchange
          </Link>
          <div className="NavOptions">
            <Link className="NavItem" to="#">
              Explore
            </Link>
            <Link className="NavItem" to="#">
              Creators
            </Link>
            <Link className="NavItem" to="#">
              Community
            </Link>
          </div>
          <button
            className="WalletConnectButton"
            onClick={() => setWalletOverlayActive(!walletOverlayActive)}
          >
            Connect Wallet
          </button>
        </nav>
      </div>
      {walletOverlayActive && (
        <Web3ReactProvider getLibrary={getLibrary}>
          <WalletModal />
        </Web3ReactProvider>
      )}
    </Router>
  );
};
