import React, { FC } from 'react';
import { useMetarootModalContext } from "../context";

import { BsPlusLg } from "react-icons/bs";

interface IProps {
    userProfileImage: any,
    userWalletAddress: string
}

export const UserProfileSection: FC<IProps> = ({ userProfileImage, userWalletAddress }) => {
    const { metarootOverlayActive, setMetarootOverlayActive } =
        useMetarootModalContext();

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
