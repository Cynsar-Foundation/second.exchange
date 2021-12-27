import React from 'react';
import { useMetarootModalValue } from "../context";

import { BsPlusLg } from "react-icons/bs";

export const UserProfileSection = ({ userProfileImage, userWalletAddress }) => {
    const { metarootOverlayActive, setMetarootOverlayActive } =
        useMetarootModalValue();

    return(
        <div className="UserDetails">
            <span>
                <img
                    className="UserProfilePicSidebar"
                    src={userProfileImage}
                    alt="female avatar"
                />
            </span>
            <div className="UserDetails__name-details">
                <div className="UserDetails__name">Second Exchanger</div>
                <div className="UserDetails__details">
                    {userWalletAddress}
                </div>
            </div>
            <div
                className="UserDetails__plus"
                onClick={() =>
                    setMetarootOverlayActive(!metarootOverlayActive)
                }
            >
                <BsPlusLg size={24} />
            </div>
        </div>
    );
}
