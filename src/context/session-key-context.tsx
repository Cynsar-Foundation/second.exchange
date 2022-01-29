import React from 'react';
import { atom } from 'recoil';

export const sessionKeyState = atom({
  key: 'sessionKeyState',
  default: localStorage.getItem("user-auth")
    ? localStorage.getItem("user-auth")
    : null,
});
