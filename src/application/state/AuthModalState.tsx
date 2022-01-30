import React from 'react';
import { atom } from 'recoil';

export const authModalState = atom({
  key: 'authModalActive',
  default: false,
});
