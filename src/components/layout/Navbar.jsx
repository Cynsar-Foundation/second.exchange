/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useMoralis } from "react-moralis";

import { WalletModal } from "../WalletModal";
import { useWalletModalValue } from "../../context";

import MetaMaskLogo from '../../assets/images/metamask.svg';

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
    }, [isAuthenticated])
    return (
            <div className="NavbarContainer">
                <nav>
                    <Link className={isAuthenticated ? "NavLogo SelectedNavOption" : "NavLogo"} to="/">
                        second.exchange
                    </Link>
                    <div className="NavOptions">
                        <Link className="NavItem" to="/Explore">
                            Explore
                        </Link>
                        <Link className="NavItem" to="/Creators">
                            Creators
                        </Link>
                        <Link className="NavItem" to="/Community">
                            Community
                        </Link>
                    </div>
                    <button
                        className={isAuthenticated ? "WalletConnectedButton" : "WalletConnectButton"}
                        onClick={() =>
                            setWalletOverlayActive(!walletOverlayActive)
                        }
                    >
                        {isAuthenticated ? <img className="WalletConnectedFigure" src={MetaMaskLogo} alt="metamask" /> : "Connect Wallet"}
                        {isAuthenticated ? <div className="WalletConnectedText">Connected</div> : ""}
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
