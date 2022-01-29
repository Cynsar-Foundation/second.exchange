import React from 'react';
import { atom } from 'recoil';

export const authOverlayState = atom({
  key: 'authOverlayActive',
  default: false,
});
