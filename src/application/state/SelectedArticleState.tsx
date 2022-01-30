import React from 'react';
import { atom } from 'recoil';

export const selectedArticleState = atom({
  key: 'selectedArticleState',
  default: null,
});
