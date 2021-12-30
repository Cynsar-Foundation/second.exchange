import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import { IoMdMoon } from "react-icons/io";
import { VscBellDot } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";

import { MetarootModal } from "../MetarootModal";
import { UserInfoSectionRect } from "../UserInfoSectionRect";
import { UserProfileSection } from "../UserProfileSection";
import { SidebarButton } from "../SidebarButton";
import { useMetarootModalValue } from "../../context";

import FemaleAvatar from "../../assets/images/undraw-female-avatar.svg";
import AvaxLogo from "../../assets/images/avax.svg";
import NFTSymbol from "../../assets/images/nft-symbol.svg";
import Moralis from "moralis/types";

export const Sidebar = () => {
    const [userBalance, setUserBalance] = useState("");
    const { metarootOverlayActive } = useMetarootModalValue();
    const { Moralis, user } = useMoralis();
    // Cheap fix, user should be tested for null value
    const userAddress: any[string] = (user as Moralis.User<Moralis.Attributes>).attributes.accounts[0];
    const userNFTs = 55;
    let maxAddressLength = 10;
    let userAddressDisplay = userAddress.substring(0, maxAddressLength) + "...";

    useEffect(() => {
        Moralis.Web3API.account
            .getNativeBalance({chain: undefined, address: ""})
            // @ts-ignore
            .then((balance) => setUserBalance(balance));
    }, [Moralis.Web3API.account, userBalance]);

    return (
        <div className="sidebar-container">
            <UserProfileSection
                userProfileImage={FemaleAvatar}
                userWalletAddress={userAddressDisplay}
            />
            <UserInfoSectionRect
                InfoTitle={"Your Balance"}
                // @ts-ignore
                InfoValue={userBalance["balance"]}
                InfoImage={AvaxLogo}
                InfoUnit={"AVAX"}
                InfoImageClass={""}
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
