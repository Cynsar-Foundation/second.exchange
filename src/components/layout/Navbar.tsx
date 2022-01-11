/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { KeyAuthModal } from "../KeyAuthModal";
import { useAuthModalValue } from "../../context";
import { useUserAuthValue } from "../../context";

import MetaMaskLogo from "../../assets/images/metamask.svg";

export const Navbar = () => {
    const { authOverlayActive, setAuthOverlayActive } =
        useAuthModalValue();
    const { isUserAuthenticated } = useUserAuthValue();

    useEffect(() => {
        setAuthOverlayActive(false);
    }, [isUserAuthenticated]);

    // When on custom domain change Link's "to" value to '/route'
    return (
        <div className="navbar-container">
            <nav>
                <Link
                    className={
                        isUserAuthenticated
                            ? "nav-logo selected-nav-option"
                            : "nav-logo"
                    }
                    to="/second.exchange/"
                >
                    second.exchange
                </Link>
                <div className="nav-options">
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
                <button
                    className={
                        isUserAuthenticated
                            ? "wallet-connected-button"
                            : "wallet-connect-button"
                    }
                    onClick={() => setAuthOverlayActive(!authOverlayActive)}
                >
                    {isUserAuthenticated ? (
                        <img
                            className="wallet-connected-figure"
                            src={MetaMaskLogo}
                            alt="metamask"
                        />
                    ) : (
                        "Connect"
                    )}
                    {isUserAuthenticated ? (
                        <div className="wallet-connected-text">Connected</div>
                    ) : (
                        ""
                    )}
                </button>
            </nav>
            {authOverlayActive && <KeyAuthModal />}
        </div>
    );
};
