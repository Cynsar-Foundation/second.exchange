/* eslint-disable prettier/prettier */
import './Header.style.scss';

import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BsFillKeyFill, BsPencilSquare } from 'react-icons/bs';
import { BiUserCircle, BiLogOut } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

import { KeyAuthModal } from "../AuthModal/AuthModal";
import { UserKeyModal } from '../UserKeyModal/UserKeyModal';

import { darkModeState, toggleDarkModeState } from '../../shared/GlobalState';
import { userAuthState, authModalState, keyModalState } from 'src/application/state';
import { Button, Popover } from 'antd';

const Header = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  const [darkMode, toggleDarkMode] = useRecoilState(toggleDarkModeState);

  const navigate = useNavigate();
  const [ authModalActive, setAuthModalActive ] = useRecoilState(authModalState);
  const [ isUserAuthenticated ] = useRecoilState(userAuthState);
  const [ keyModalActive, setKeyModalActive ] = useRecoilState(keyModalState);

  const [ popoverVisible, setPopoverVisible ] = useState({visible: false});

  const hidePopover = () => {
    setPopoverVisible({
      visible: false,
    });
  };

  const handleVisibleChange = (visible: boolean) => {
    setPopoverVisible({ visible });
  };

  const handleAuthClick = () => {
    isUserAuthenticated 
      ?
        navigate('/write')
      :
        setAuthModalActive(true);
  };

  useEffect(() => {
    setAuthModalActive(false);
  }, [isUserAuthenticated]);

  const PopoverContent = () => {
    return(
      <div>
        <div className="Header__content__user">
            <button 
              className='Header__content__user-format'
              onClick={() => { hidePopover(); setAuthModalActive(true)}}
            >
                <div>
                <BiLogOut size={30} />
                </div>
                </button>
            <button 
              className='Header__content__user-format-text'
              onClick={() => { hidePopover(); setAuthModalActive(true) }}
            >
                Logout
            </button>
        </div>
        <div className="Header__content__keys">
            <button 
              className='Header__content__keys-format'
              onClick={() => { hidePopover(); setKeyModalActive(true)}}
            >
                <div>
                <BsFillKeyFill size={30} />
                </div>
                </button>
            <button 
              className='Header__content__user-format-text'
              onClick={() => { hidePopover(); setKeyModalActive(true)}}
            >
                Your Keys
            </button>
        </div>
      </div>
    )
  }

  return (
    <header className={`Header ${isDarkModeEnabled ? 'Header--dark-mode' : ''}`}>
      <div className="Header__content">
        <div className="Header__content__logo" onClick={() => navigate('/')} />
        <div className="Header__content__title-container">
          <span className="Header__content__title-container__title" onClick={() => navigate('/')}>
            Second Exchange
          </span>
        </div>
        <div className="Header__content__dark-mode">
          <label
            htmlFor="dark-mode-select"
            className={`Header__content__dark-mode__label ${
              isDarkModeEnabled ? 'Header__content__dark-mode__label--toggled' : ''
            }`}
          >
            Dark mode:
          </label>
          <input
            id="dark-mode-select"
            className="Header__content__dark-mode__input"
            type="checkbox"
            // @ts-ignore
            value={ isDarkModeEnabled }
            // @ts-ignore
            onChange={ toggleDarkMode }
          />
        </div>
        <div className="Header__content__write">
            <button 
                className="Header__content__write-button"
                onClick={handleAuthClick}
            >
                <div>
                <BsPencilSquare size={20} />
                </div>
            </button>
            <button
                className="Header__content__write-button-text"
                onClick={handleAuthClick}
            >
                Post Blog
            </button>
        </div>
        {isUserAuthenticated &&
          <Popover
          content={<PopoverContent />}
          trigger="click"
          visible={popoverVisible.visible}
          onVisibleChange={handleVisibleChange}
        >
          <Button style={{ background: "transparent", borderColor: "black", color: "black" }} type="primary">Connected</Button>
        </Popover>
        }

      </div>
      { keyModalActive && <UserKeyModal />}
      { authModalActive && <KeyAuthModal />}
    </header>
  );
};

export default Header;
