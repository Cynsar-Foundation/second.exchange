import { atom } from "jotai";
import { NostrEvent } from "../types";

export const homeFeed = atom<NostrEvent[] | []>([]);
