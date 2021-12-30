/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useMoralis } from "react-moralis";

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
        useWalletModalValue();
    const { isAuthenticated } = useMoralis();
    useEffect(() => {
        setWalletOverlayActive(false);
    }, [isAuthenticated]);
    // When on custom domain change Link's "to" value to '/route'
    return (
        <div className="navbar-container">
            <nav>
                <Link
                    className={
                        isAuthenticated
                            ? "nav-logo selected-nav-option"
                            : "nav-logo"
                    }
                    to="/second.exchange/"
                >
                    second.exchange
                </Link>
                <div className="nav-options">
                    <Link className="nav-item" to="/second.exchange/Explore">
                        Explore
                    </Link>
                    <Link className="nav-item" to="/second.exchange/Creators">
                        Creators
                    </Link>
                    <Link className="nav-item" to="/second.exchange/Community">
                        Community
                    </Link>
                </div>
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
            </nav>
            {walletOverlayActive && (
                <Web3ReactProvider getLibrary={getLibrary}>
                    <WalletModal />
                </Web3ReactProvider>
            )}
        </div>
    );
};
