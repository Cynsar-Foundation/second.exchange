import { atom } from "jotai";

export const homeFeedAtoms = atom<NostrEvent[] | []>([]);
