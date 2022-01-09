import React from "react";

import { IoMdMoon } from "react-icons/io";
import { VscBellDot } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";

import { MetarootModal } from "../MetarootModal";
import { UserInfoSectionRect } from "../UserInfoSectionRect";
import { UserProfileSection } from "../UserProfileSection";
import { SidebarButton } from "../SidebarButton";
import { useMetarootModalValue } from "../../context";

import FemaleAvatar from "../../assets/images/undraw-female-avatar.svg";
import NFTSymbol from "../../assets/images/nft-symbol.svg";

export const Sidebar = () => {
    const { metarootOverlayActive } = useMetarootModalValue();
    const userNFTs = 55;

    return (
        <div className="sidebar-container">
            <UserProfileSection
                userProfileImage={FemaleAvatar}
                userWalletAddress="123456"
            />
            <UserInfoSectionRect
                InfoTitle={"Your Items"}
                InfoValue={userNFTs}
                InfoImage={NFTSymbol}
                InfoUnit={"NFTs"}
                InfoImageClass={"NFT-logo"}
            />
            <div className="sidebar-buttons">
                <SidebarButton 
                    ButtonIcon={<IoMdMoon size={30}/>}
                    ButtonText={"DarkMode"}
                />
                <SidebarButton 
                    ButtonIcon={<VscBellDot size={30}/>}
                    ButtonText={"Alerts"}
                />
                <SidebarButton 
                    ButtonIcon={<IoMdSettings size={30}/>}
                    ButtonText={"Settings"}
                />
            </div>
            {metarootOverlayActive && <MetarootModal />}
        </div>
    );
};
