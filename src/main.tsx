import { config, RelayService } from '@libs/api';
import { inject, injector } from 'njct';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/provider';

import App from './components/App/App.component';

injector.provide('config', () => config);
injector.provide('relayservice', () => inject.service(RelayService));
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.querySelector('#root'),
);
