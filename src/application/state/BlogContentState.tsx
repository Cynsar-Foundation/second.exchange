import React from 'react';
import { atom } from 'recoil';

export const blogContentState = atom<string | undefined>({
  key: 'blogContentState',
  default: '',
});
