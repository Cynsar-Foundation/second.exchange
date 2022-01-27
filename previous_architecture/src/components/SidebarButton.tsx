import React, { FC } from 'react';

interface IProps {
    ButtonIcon: any,
    ButtonText: string,
    ButtonFunction?: () => any
}

export const SidebarButton: FC<IProps> = ({ ButtonIcon, ButtonText, ButtonFunction }) => {
    return(
        <div 
            className="sidebar-buttons__item"
            onClick={() => {
                if(ButtonFunction) 
                    ButtonFunction();
            }}
        >
            {ButtonIcon}
            <span className="sidebar-buttons__text">{ButtonText}</span>
        </div>
    );
}
