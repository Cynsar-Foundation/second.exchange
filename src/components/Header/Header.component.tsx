/* eslint-disable prettier/prettier */
import './Header.style.scss';

import React, { useEffect, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authOverlayActive } from 'src/context/auth-modal-context';

// import { useAuthModalContext } from "../../context";
import { useUserAuthContext } from '../../context';
import { darkModeState, toggleDarkModeState } from '../../shared/GlobalState';
import { KeyAuthModal } from '../AuthModal/KeyAuthModal';

const Header = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  // const [darkMode, toggleDarkMode] = useRecoilState(toggleDarkModeState);

  const navigate = useNavigate();
//  const { authOverlayActive, setAuthOverlayActive } = useAuthModalContext();
  const [overlayActive, setOverlayActive ] = useRecoilState(authOverlayActive);
  const { isUserAuthenticated } = useUserAuthContext();
// const isUserAuthenticated = true;
  useEffect(() => {
    setOverlayActive(false);
  }, [isUserAuthenticated]);

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
            // value={}
            onChange={() => {}}
          />
        </div>
        <div className="Header__content__write">
            <button 
                className="Header__content__write-button"
                onClick={() => {
                  isUserAuthenticated 
                  ?
                    navigate('/write')
                  :
                    setOverlayActive(true);
                }}
            >
                <div>
                <BsPencilSquare size={20} />
                </div>
            </button>
            <button
                className="Header__content__write-button-text"
                onClick={() => {
                  isUserAuthenticated 
                    ?
                      navigate('/write')
                    :
                      setOverlayActive(true);}}
            >
                Post Blog
            </button>
        </div>
        { isUserAuthenticated && <div className="Header__content__user">
            <button className='Header__content__user-format'>
                <div>
                <BiUserCircle size={30} />
                </div>
                </button>
            <button className='Header__content__user-format-text'>
                Connected
            </button>
        </div>
        }
      </div>
      { overlayActive && <KeyAuthModal />}
    </header>
  );
};

export default Header;
