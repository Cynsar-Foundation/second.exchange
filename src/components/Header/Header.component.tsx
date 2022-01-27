import './Header.style.scss';

import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { darkModeState, toggleDarkModeState } from '../../shared/GlobalState';

const Header = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  // const [darkMode, toggleDarkMode] = useRecoilState(toggleDarkModeState);

  return (
    <header className={`Header ${isDarkModeEnabled ? 'Header--dark-mode' : ''}`}>
      <div className="Header__content">
        <div className="Header__content__logo" />
        <div className="Header__content__title-container">
          <span className="Header__content__title-container__title">
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
      </div>
    </header>
  );
};

export default Header;
