// import {inject} from 'njct';
import type { Interface } from '@libs/application';
import {
  BulkSubFilter,
  EventCallback,
  SingleSubFilter,
} from '@libs/application/interfaces';

import { relayPool } from '../external/nostr-tools';

export class RelayService implements Interface.RelayService {
  static pool = relayPool();

  addRelay(url: string) {
    RelayService.pool.addRelay(url);
  }
  removeRelay(url: string) {
    RelayService.pool.removeRelay(url);
  }
  subSingle(callback: EventCallback, filter: SingleSubFilter) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    RelayService.pool.subSingle(callback, filter);
  }
  subBulk(callback: EventCallback, filter: BulkSubFilter) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    RelayService.pool.subBulk(callback, filter);
  }
  publish(event: any) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    RelayService.pool.publish(event);
  }
}
