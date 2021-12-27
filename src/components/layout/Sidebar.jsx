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

export const Sidebar = () => {
    const [userBalance, setUserBalance] = useState("");
    const { metarootOverlayActive } = useMetarootModalValue();
    const { Moralis, user } = useMoralis();
    const userAddress = user.attributes.accounts[0];
    const userNFTs = 55;
    let maxAddressLength = 10;
    let userAddressDisplay = userAddress.substring(0, maxAddressLength) + "...";

    useEffect(() => {
        Moralis.Web3API.account
            .getNativeBalance()
            .then((balance) => setUserBalance(balance));
    }, [Moralis.Web3API.account, userBalance]);

    return (
        <div className="SidebarContainer">
            <UserProfileSection
                userProfileImage={FemaleAvatar}
                userWalletAddress={userAddressDisplay}
            />
            <UserInfoSectionRect
                InfoTitle={"Your Balance"}
                InfoValue={userBalance["balance"]}
                InfoImage={AvaxLogo}
                InfoUnit={"AVAX"}
            />
            <UserInfoSectionRect
                InfoTitle={"Your Items"}
                InfoValue={userNFTs}
                InfoImage={NFTSymbol}
                InfoUnit={"NFTs"}
                InfoImageClass={"NFTLogo"}
            />
            <div className="SidebarButtons">
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
