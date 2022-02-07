import { atom, selector, selectorFamily } from 'recoil';
import { NostrEvent } from '../interfaces';

export const nostrEventState = atom<NostrEvent[] | []>({
  key: 'nostrEventState',
  default: [],
});

export const nostrEvents = selector<NostrEvent[]>({
  key: 'nostrEvents',
  get: ({ get }) => get(nostrEventState)
});
