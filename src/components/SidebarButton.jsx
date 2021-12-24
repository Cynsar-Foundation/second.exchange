import React from 'react';

export const SidebarButton = ({ ButtonIcon, ButtonText}) => {
    return(
        <div className="SidebarButtons__item">
            {ButtonIcon}
            <span className="SidebarButtons__text">{ButtonText}</span>
        </div>
    );
}
