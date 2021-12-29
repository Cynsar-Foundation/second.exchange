import React from 'react';

export const SidebarButton = ({ ButtonIcon, ButtonText}) => {
    return(
        <div className="sidebar-buttons__item">
            {ButtonIcon}
            <span className="sidebar-buttons__text">{ButtonText}</span>
        </div>
    );
}
