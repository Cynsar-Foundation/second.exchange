import { atom } from "jotai";

export const fetchedComments = atom<NostrEvent[] | []>([]);
