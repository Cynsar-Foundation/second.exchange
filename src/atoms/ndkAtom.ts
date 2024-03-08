import NDK from "@nostr-dev-kit/ndk";
import { atom } from "jotai";

export const ndkAtom = atom<NDK | null>(null);
