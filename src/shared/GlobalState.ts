import { atom, selector, selectorFamily } from 'recoil';

import ArticleService from './ArticleService';

export const darkModeState = atom({
  key: 'darkModeState',
  default: false,
});

export const articleQuery = selector({
  key: 'articleQuery',
  get: async ({ get }) => {
    return await ArticleService.getAll();
  },
});

export const toggleDarkModeState = selector({
  key: 'toggleDarkMode',
  //   set: ({ set }, newState) => {
  //     set(darkModeState, newState);
  //   },
  get: ({ get }) => {
    get(darkModeState);
  },
});

export const articleByIdQuery = selectorFamily({
  key: 'articleByIdQuery',
  get: id => async () => {
    return await ArticleService.getById(id);
  },
});
