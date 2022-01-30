export type EventCallback = (event: NostrEvent, relay: any) => any;

export type SingleSubFilter = { author: string };
export type BulkSubFilter = { authors: string[] };
export type SubFilter = { authors: string[]; kinds: number[] };

export interface RelayService {
  addRelay(url: string): void;
  removeRelay(url: string): void;
  subSingle(callback: EventCallback, filter: SingleSubFilter): void;
  subBulk(callback: EventCallback, filter: BulkSubFilter): void;
  publish(event: NostrEvent): void;
  sub(callback: EventCallback, filter: SubFilter, id: string): void;
  setPrivateKey(key:string):void;
}

export type NostrEvent = {
  id: string; //<32-bytes sha256 of the the serialized event data>
  pubkey: string; //<32-bytes hex-encoded public key of the event creator>,
  created_at: number; //<unix timestamp in seconds>,
  kind: number; //<integer>,
  tags: any[];
  content: string; //<arbitrary string>,
  sig: string; //<64-bytes signature of the sha256 hash of the serialized event data, which is the same as the id field>
};
