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
  get: ({ get }) => {
    get(darkModeState);
  },
  set: ({ get, set }) => {
      const currentValue = get(darkModeState);
      set(darkModeState, !currentValue);
  }
});

export const articleByIdQuery = selectorFamily({
  key: 'articleByIdQuery',
  get: id => async () => {
    // @ts-ignore
    return await ArticleService.getById(id);
  },
});
