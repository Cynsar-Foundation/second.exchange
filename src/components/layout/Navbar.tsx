/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { WalletModal } from "../WalletModal";
import Menu from "../../assets/images/menu.png";
import { useWalletModalValue } from "../../context";
import MetaMaskLogo from "../../assets/images/metamask.svg";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const Navbar = () => {
  const { walletOverlayActive, setWalletOverlayActive } = useWalletModalValue();
  const { isAuthenticated } = useMoralis();
  const [visible, setVisible] = useState(false);
  const width = window.innerWidth;
  console.log("width", width);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    setWalletOverlayActive(false);
  }, [isAuthenticated]);
  // When on custom domain change Link's "to" value to '/route'
  if (width <= 768) {
    return (
      <div className="navbar-container">
        <Link
          className={
            isAuthenticated ? "nav-logo selected-nav-option" : "nav-logo"
          }
          to="/second.exchange/"
        >
          second.exchange
        </Link>
        <Button className="nav-btn" type="primary" onClick={showDrawer}>
          <img src={Menu} alt={Menu} />
        </Button>
        <Drawer
          title="second.exchange"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <Link className="drawer-item" to="/second.exchange/explore">
            Explore
          </Link>
          <Link className="drawer-item" to="/second.exchange/creators">
            Creators
          </Link>
          <Link className="drawer-item" to="/second.exchange/community">
            Community
          </Link>
          <div className="mobile-connect-btn">
            <button
              className={
                isAuthenticated
                  ? "wallet-connected-button"
                  : "wallet-connect-button-mobile"
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
        </Drawer>

        {walletOverlayActive && (
          <Web3ReactProvider getLibrary={getLibrary}>
            <WalletModal />
          </Web3ReactProvider>
        )}
      </div>
    );
  } else {
    return (
      <div className="navbar-container">
        <div>
          <Link
            className={
              isAuthenticated ? "nav-logo selected-nav-option" : "nav-logo"
            }
            to="/second.exchange/"
          >
            second.exchange
          </Link>
        </div>
        <div>
          <Link className="nav-item" to="/second.exchange/explore">
            Explore
          </Link>
          <Link className="nav-item" to="/second.exchange/creators">
            Creators
          </Link>
          <Link className="nav-item" to="/second.exchange/community">
            Community
          </Link>
        </div>
        <div>
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
        {walletOverlayActive && (
          <Web3ReactProvider getLibrary={getLibrary}>
            <WalletModal />
          </Web3ReactProvider>
        )}
      </div>
    );
  }
};
