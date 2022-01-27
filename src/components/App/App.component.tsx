import './App.style.scss';

import { AppConfig } from '@libs/api/types';
import { inject } from 'njct';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { darkModeState } from '../../shared/GlobalState';
import Header from '../Header/Header.component';
import MainContent from '../MainContent/MainContent.component';

function useApp() {
  useEffect(() => {
    const test: AppConfig = inject('config');
    console.log(test);
  }, []);
}

const App = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  useApp();
  return (
    <div className={`App ${isDarkModeEnabled ? 'App--dark-mode' : ''}`}>
      <Header />
      <MainContent />
    </div>
  );
};

export default App;
