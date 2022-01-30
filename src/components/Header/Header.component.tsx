/* eslint-disable prettier/prettier */
import './Header.style.scss';

import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BsPencilSquare } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

import { KeyAuthModal } from "../AuthModal/AuthModal";
import { UserKeyModal } from '../UserKeyModal/UserKeyModal';

import { darkModeState, toggleDarkModeState } from '../../shared/GlobalState';
import { userAuthState, authModalState, keyModalState } from 'src/application/state';

const Header = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  // const [darkMode, toggleDarkMode] = useRecoilState(toggleDarkModeState);

  const navigate = useNavigate();
  const [authModalActive, setAuthModalActive ] = useRecoilState(authModalState);
  const [ isUserAuthenticated ] = useRecoilState(userAuthState);
  const [keyModalActive, setKeyModalActive] = useRecoilState(keyModalState);

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
        { isUserAuthenticated && <div className="Header__content__user">
            <button 
              className='Header__content__user-format'
              onClick={() => setKeyModalActive(true)}
            >
                <div>
                <BiUserCircle size={30} />
                </div>
                </button>
            <button 
              className='Header__content__user-format-text'
              onClick={() => setKeyModalActive(true)}
            >
                Connected
            </button>
        </div>
        }
      </div>
      { keyModalActive && <UserKeyModal />}
      { authModalActive && <KeyAuthModal />}
    </header>
  );
};

export default Header;
