import React from 'react';

export const UserInfoSectionRect = ({ InfoTitle, InfoValue, InfoImage, InfoUnit, InfoImageClass=''}) => {
    return (
        <div className="sidebar-section">
            <div className="sidebar-section__title">{InfoTitle}</div>
            <div className="sidebar-section__value">
                {InfoValue}
            </div>
            <div className="sidebar-section__unit">
                <img className={InfoImageClass + "avax-logo"} src={InfoImage} alt="avax" />
                <span>{InfoUnit}</span>
            </div>
        </div>
    );
}
