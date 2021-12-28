import React from "react";

export const UserInfoSectionRect = ({
  InfoTitle,
  InfoValue,
  InfoImage,
  InfoUnit,
  InfoImageClass = "",
}) => {
  return (
    <div className="SidebarSection">
      <div className="SidebarSection__title">{InfoTitle}</div>
      <div className="SidebarSection__value">{InfoValue}</div>
      <div className="SidebarSection__unit">
        <img
          className={InfoImageClass + "AvaxLogo"}
          src={InfoImage}
          alt="avax"
        />
        <span>{InfoUnit}</span>
      </div>
    </div>
  );
};
