import { config, RelayService } from '@libs/api';
import { inject, injector } from 'njct';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './components/App/App.component';
import { UserAuthProvider } from './context';

injector.provide('config', () => config);
injector.provide('relayservice', () => inject.service(RelayService));
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <UserAuthProvider>
      <App />
      </UserAuthProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.querySelector('#root'),
);
