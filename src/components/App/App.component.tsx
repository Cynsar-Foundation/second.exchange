import './App.style.scss';

import { RelayService } from '@libs/api';
import { AppConfig } from '@libs/api/types';
import { inject } from 'njct';
import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { darkModeState } from '../../shared/GlobalState';
import HeaderNav from '../Header/Header.component';
import MainContent from '../MainContent/MainContent.component';
import { Writer } from '../Writer/Writer.component';
import { ArticleView } from '../ArticleView/ArticleView.component';
import { ProfileView } from '../ProfileView/ProfileView.component';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { nostrEventState } from 'src/application/states/relay.state';
// import { sessionKeyState } from 'src/application/state';
import { profilePostsState } from '@libs/application/state';

function useApp() {
  const [nostrEventsValue, setNostrEventsValue] = useRecoilState(nostrEventState);
  // const sessionKey = useRecoilValue(sessionKeyState);
  // @ts-ignore
//  const parsedSessionKey = JSON.parse(sessionKey);
  const [profilePosts, setProfilePosts] = useRecoilState(profilePostsState);

  useEffect(() => {
    setProfilePosts([]);
  }, []);

  useEffect(() => {
    const test: AppConfig = inject('config');
    const relayService: RelayService = inject('relayservice');
    const privFromLocalStorage = localStorage.getItem('user-auth');
    // todo proper auth state management
    const privKey = JSON.parse(privFromLocalStorage ? privFromLocalStorage : '{}')[
      'privKey'
    ];
    const authorURLs =
      // parsedSessionKey === null ?
       ['7b0ba10b13233979d17e545d56b1c1f6563ce0c9b0d1f3691b5ad3bf3cced6c0'];
        // : [
        //     '7b0ba10b13233979d17e545d56b1c1f6563ce0c9b0d1f3691b5ad3bf3cced6c0',
        //     '8d9df013c8a671457bf1522a5ad24a84a5294aacb33a33435e947651c0ee0cba',
        //     parsedSessionKey['pubKey'],
        //   ];
    relayService.setPrivateKey(privKey);
    for (const relayUrl of test.defaultRelays) relayService.addRelay(relayUrl);
    relayService.sub(
      (event, relay) => {
        setNostrEventsValue(events => [...events, event]);
      },
      {
        authors: authorURLs,
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
        <HeaderNav />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/write" element={<Writer />} />
          <Route path="/article/:slug" element={<ArticleView />} />
          <Route path="/profile/:slug" element={<ProfileView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
