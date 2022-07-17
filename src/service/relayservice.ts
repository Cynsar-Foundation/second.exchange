import { relayPool } from "nostr-tools";
import {
  EventCallback,
  SingleSubFilter,
  BulkSubFilter,
  SubFilter,
} from "../types";

const pool = relayPool();

export const addRelay = (url: string) => {
  pool.addRelay(url);
};

export const removeRelay = (url: string) => {
  pool.removeRelay(url);
};

export const subSingle = (callback: EventCallback, filter: SingleSubFilter) => {
  pool.subSingle(callback, filter);
};

export const subBulk = (callback: EventCallback, filter: BulkSubFilter) => {
  pool.subBulk(callback, filter);
};

export const publish = (event: any) => {
  pool.publish(event);
};

export const sub = (callback: EventCallback, filter: SubFilter, id: string) => {
  pool.sub({ cb: callback, filter: filter }, id);
};

export const setPrivateKey = (key: string) => {
  pool.setPrivateKey(key);
};
