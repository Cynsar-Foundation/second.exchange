/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useMoralis } from "react-moralis";

import { WalletModal } from "../WalletModal";
import { useWalletModalValue } from "../../context";

import MetaMaskLogo from "../../assets/images/metamask.svg";
import { Container, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const Navbar = () => {
  const { walletOverlayActive, setWalletOverlayActive } = useWalletModalValue();
  const { isAuthenticated } = useMoralis();
  useEffect(() => {
    setWalletOverlayActive(false);
  }, [isAuthenticated]);
  // When on custom domain change Link's "to" value to '/route'
  return (
    <div className="navbar-container">
      <BootstrapNavbar expand="lg" variant="light">
        {" "}
        <Link
          className={
            isAuthenticated ? "nav-logo selected-nav-option" : "nav-logo"
          }
          to="/second.exchange/"
        >
          second.exchange
        </Link>
        <BootstrapNavbar.Toggle aria-controls="navbarScroll" />
        <BootstrapNavbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 m-auto" navbarScroll>
            <Link className="nav-item" to="/second.exchange/explore">
              Explore
            </Link>
            <Link className="nav-item" to="/second.exchange/creators">
              Creators
            </Link>
            <Link className="nav-item" to="/second.exchange/community">
              Community
            </Link>
          </Nav>
          <div className="text-center">
            <button
              className={
                isAuthenticated
                  ? "wallet-connected-button"
                  : "wallet-connect-button"
              }
              onClick={() => setWalletOverlayActive(!walletOverlayActive)}
            >
              {isAuthenticated ? (
                <img
                  className="wallet-connected-figure"
                  src={MetaMaskLogo}
                  alt="metamask"
                />
              ) : (
                "Connect Wallet"
              )}
              {isAuthenticated ? (
                <div className="wallet-connected-text">Connected</div>
              ) : (
                ""
              )}
            </button>
          </div>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>

      {walletOverlayActive && (
        <Web3ReactProvider getLibrary={getLibrary}>
          <WalletModal />
        </Web3ReactProvider>
      )}
    </div>
  );
};
