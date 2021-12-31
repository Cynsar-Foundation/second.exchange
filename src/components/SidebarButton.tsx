import React, { FC } from 'react';

interface IProps {
    ButtonIcon: any,
    ButtonText: string
}

export const SidebarButton: FC<IProps> = ({ ButtonIcon, ButtonText }) => {
    return(
        <div className="sidebar-buttons__item">
            {ButtonIcon}
            <span className="sidebar-buttons__text">{ButtonText}</span>
        </div>
    );
}
