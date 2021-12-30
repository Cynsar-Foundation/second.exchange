import React from 'react';
import { useMetarootModalValue } from "../context";

import { BsPlusLg } from "react-icons/bs";

export const UserProfileSection = ({ userProfileImage, userWalletAddress }) => {
    const { metarootOverlayActive, setMetarootOverlayActive } =
        useMetarootModalValue();

    return(
        <div className="user-details">
            <span>
                <img
                    className="user-profile-pic-sidebar"
                    src={userProfileImage}
                    alt="female avatar"
                />
            </span>
            <div className="user-details__name-details">
                <div className="user-details__name">Second Exchanger</div>
                <div className="user-details__details">
                    {userWalletAddress}
                </div>
            </div>
            <div
                className="user-details__plus"
                onClick={() =>
                    setMetarootOverlayActive(!metarootOverlayActive)
                }
            >
                <BsPlusLg size={24} />
            </div>
        </div>
    );
}
