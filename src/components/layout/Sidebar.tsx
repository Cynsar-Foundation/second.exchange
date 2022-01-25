import { Col, Row } from "antd";
import { IoMdMoon } from "react-icons/io";
import { VscBellDot } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";

import { UserKeyModal } from "../UserKeyModal";
import { SidebarButton } from "../SidebarButton";
import { MetarootModal } from "../MetarootModal";
import { useKeyModalContext } from "../../context";
import { useMetarootModalContext } from "../../context";
import { UserProfileSection } from "../UserProfileSection";
import { UserInfoSectionRect } from "../UserInfoSectionRect";

import NFTSymbol from "../../assets/images/nft-symbol.svg";
import FemaleAvatar from "../../assets/images/undraw-female-avatar.svg";

export const Sidebar = () => {
  const { metarootOverlayActive } = useMetarootModalContext();
  const { setKeyOverlayActive, keyOverlayActive } = useKeyModalContext();
  const userNFTs = 55;

  const handleYourKeys = () => {
    setKeyOverlayActive(!keyOverlayActive);
  };

  return (
    <div className="sidebar-container">
      <Row>
        <Col span={24}>
          <UserProfileSection
            userProfileImage={FemaleAvatar}
            userWalletAddress="123456"
          />
        </Col>
        <Col span={24} className="sidebar-section-main">
          <UserInfoSectionRect
            InfoTitle={"Your Items"}
            InfoValue={userNFTs}
            InfoImage={NFTSymbol}
            InfoUnit={"NFTs"}
            InfoImageClass={"NFT-logo"}
          />
        </Col>
        <Col span={24}>
          <div className="sidebar-buttons">
            <SidebarButton
              ButtonIcon={<IoMdMoon size={30} />}
              ButtonText={"DarkMode"}
            />
            <SidebarButton
              ButtonIcon={<VscBellDot size={30} />}
              ButtonText={"Alerts"}
            />
            <SidebarButton
              ButtonIcon={<IoMdSettings size={30} />}
              ButtonText={"Your Keys"}
              ButtonFunction={handleYourKeys}
            />
          </div>
        </Col>
      </Row>
      {metarootOverlayActive && <MetarootModal />}
      {keyOverlayActive && <UserKeyModal />}
    </div>
  );
};
