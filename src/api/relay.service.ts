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
    RelayService.pool.subSingle(callback, filter);
  }
  subBulk(callback: EventCallback, filter: BulkSubFilter) {
    RelayService.pool.subBulk(callback, filter);
  }
  publish(event: any) {
    RelayService.pool.publish(event);
  }
  sub(callback: EventCallback, filter: Interface.SubFilter, id: string): void {
    RelayService.pool.sub({ cb: callback, filter: filter }, id);
  }
  setPrivateKey(key: string) {
    RelayService.pool.setPrivateKey(key);
  }
}
