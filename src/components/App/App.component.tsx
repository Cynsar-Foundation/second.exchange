import './App.style.scss';

import { RelayService } from '@libs/api';
import { AppConfig } from '@libs/api/types';
import { inject } from 'njct';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { darkModeState } from '../../shared/GlobalState';
import Header from '../Header/Header.component';
import MainContent from '../MainContent/MainContent.component';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Writer } from '../Writer/Writer';
import { ArticlePage } from '../Article/ArticlePage.component';

function useApp() {
  useEffect(() => {
    const test: AppConfig = inject('config');
    const relayService: RelayService = inject('relayservice');
    for (const relayUrl of test.defaultRelays) relayService.addRelay(relayUrl);
  }, []);
}

const App = () => {
  const isDarkModeEnabled = useRecoilValue(darkModeState);
  useApp();
  return (
    <Router>
    <div className={`App ${isDarkModeEnabled ? 'App--dark-mode' : ''}`}>
      <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/write" element={<Writer />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
        </Routes>
    </div>
      </Router>
  );
};

export default App;
