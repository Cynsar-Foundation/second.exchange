/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { KeyAuthModal } from "../KeyAuthModal";
import { useAuthModalContext } from "../../context";
import { useUserAuthContext } from "../../context";

export const Navbar = () => {
  const { authOverlayActive, setAuthOverlayActive } = useAuthModalContext();
  const { isUserAuthenticated } = useUserAuthContext();

  useEffect(() => {
    setAuthOverlayActive(false);
  }, [isUserAuthenticated]);

  // When on custom domain change Link's "to" value to '/route'
  return (
    <div className="navbar-container">
      <nav>
        <Link
          className={
            isUserAuthenticated ? "nav-logo selected-nav-option" : "nav-logo"
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
        <Button
          className={
            isUserAuthenticated
              ? "wallet-connected-button"
              : "wallet-connect-button"
          }
          onClick={() => setAuthOverlayActive(!authOverlayActive)}
        >
          {!isUserAuthenticated && "Connect"}
          {isUserAuthenticated ? (
            <div className="wallet-connected-text">Connected</div>
          ) : (
            ""
          )}
        </Button>
      </nav>
      {authOverlayActive && <KeyAuthModal />}
    </div>
  );
};
