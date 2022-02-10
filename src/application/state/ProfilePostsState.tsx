import { atom, selector, selectorFamily } from 'recoil';
import { NostrEvent } from '../interfaces';

export const profilePostsState = atom<NostrEvent[] | []>({
  key: 'profilePostsState',
  default: [],
});
