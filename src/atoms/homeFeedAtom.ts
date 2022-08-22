import { atom } from "jotai";

export const homeFeed = atom<NostrEvent[] | []>([]);
