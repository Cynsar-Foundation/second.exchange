import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { IoMdMoon } from 'react-icons/io';
import { VscBellDot } from 'react-icons/vsc';
import { IoMdSettings } from 'react-icons/io';

import FemaleAvatar from '../../assets/images/undraw-female-avatar.svg'
import AvaxLogo from '../../assets/images/avax.svg';
import NFTSymbol from '../../assets/images/nft-symbol.svg';

export const Sidebar = () => {
    return (
        <div className='SidebarContainer'>
            <div className='UserDetails'>
                <span><img className="UserProfilePicSidebar" src={FemaleAvatar} alt="female avatar" /></span>
                <div className='UserDetails__name-details'>
                    <div className='UserDetails__name'>
                        Second Exchanger
                    </div>
                    <div className='UserDetails__details'>
                        0x23456...4D5f2aE
                    </div>
                </div>
                <div className="UserDetails__chevron"><FaChevronDown size={24} /></div>
            </div>
            <div className='SidebarSection'>
                <div className="SidebarSection__title">
                    Your Balance
                </div>
                <div className="SidebarSection__value">
                    23,692.15
                </div>
                <div className="SidebarSection__unit">
                    <img className="AvaxLogo" src={AvaxLogo} alt="avax" />
                    <span>AVAX</span>
                </div>
            </div>
            <div className='SidebarSection'>
            <div className="SidebarSection__title">
                    Your Items
                </div>
                <div className="SidebarSection__value">
                    55
                </div>
                <div className="SidebarSection__unit">
                    <img style={{width: '20px', height: '20px', marginRight: 0, marginTop: '3px'}} className="AvaxLogo" src={NFTSymbol} alt="avax" />
                    <span>NFTs</span>
                </div>
            </div>
            <div className='SidebarButtons'>
                <div className="SidebarButtons__item">
                    <IoMdMoon size={30} />
                    <span className="SidebarButtons__text">Dark Mode</span>
                </div>
                <div className="SidebarButtons__item">
                    <VscBellDot size={30} />
                    <span className="SidebarButtons__text">Alerts</span>
                </div>
                <div className="SidebarButtons__item">
                    <IoMdSettings size={30} />
                    <span className="SidebarButtons__text">Settings</span>
                </div>
            </div>
        </div>
    )
}
