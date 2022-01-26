import './App.style.scss';

import React from 'react';
import { useRecoilValue } from 'recoil';

import { darkModeState } from '../../shared/GlobalState';
import Header from '../Header/Header.component';
import MainContent from '../MainContent/MainContent.component';

const App = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);

  return (
    <div className={`App ${isDarkModeEnabled ? 'App--dark-mode' : ''}`}>
      <Header />
      <MainContent />
    </div>
  );
};

export default App;
