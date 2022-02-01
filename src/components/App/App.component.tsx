import './App.style.scss';

import { RelayService } from '@libs/api';
import { AppConfig } from '@libs/api/types';
import { inject } from 'njct';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { darkModeState } from '../../shared/GlobalState';
import Header from '../Header/Header.component';
import MainContent from '../MainContent/MainContent.component';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Writer } from '../Writer/Writer';

function useApp() {
  useEffect(() => {
    const test: AppConfig = inject('config');
    const relayService: RelayService = inject('relayservice');
    const privFromLocalStorage = localStorage.getItem('user-auth');
    // todo proper auth state management
    const privKey = JSON.parse(privFromLocalStorage ? privFromLocalStorage : '{}')[
      'privKey'
    ];
    relayService.setPrivateKey(privKey);
    for (const relayUrl of test.defaultRelays) relayService.addRelay(relayUrl);
    relayService.sub(
      (event, relay) => {
        console.log(event);
      },
      {
        authors: [
          '3cc926bad81f4128b7c5d08e49a1025e0120d32b79285fd3f9b70fa2404992e5',
          '7b0ba10b13233979d17e545d56b1c1f6563ce0c9b0d1f3691b5ad3bf3cced6c0',
        ],
        kinds: [0, 1, 3],
      },
      'main-channel',
    );
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
