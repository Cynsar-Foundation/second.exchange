export type RelayState = {
    pool: any
}

type EventCallback = (event: any, relay: any) => {}

type SingleSubFilter = { author: string }
type BulkSubFilter = { authors: string[] }

export type RelayAction =
    | { type: 'addRelay', url: string }
    | { type: 'removeRelay', url: string }
    | { type: 'subSingle', cb: EventCallback, filter: SingleSubFilter }
    | { type: 'subBulk', cb: EventCallback, filter: BulkSubFilter }
    | { type: 'publish', event: any}
