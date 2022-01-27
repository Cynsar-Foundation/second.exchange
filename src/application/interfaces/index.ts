export type EventCallback = (event: any, relay: any) => {};

export type SingleSubFilter = { author: string };
export type BulkSubFilter = { authors: string[] };

export interface RelayService {
  addRelay(url: string): void;
  removeRelay(url: string): void;
  subSingle(callback: EventCallback, filter: SingleSubFilter): void;
  subBulk(callback: EventCallback, filter: BulkSubFilter): void;
  publish(event: any): void;
}
