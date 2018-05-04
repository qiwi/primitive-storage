// @flow

import type {IStorage, IStorageOpts, IAny} from '../interface'

function notImplemented (): void {
  throw new Error('Not implemented')
}

export default class AbstractStorage implements IStorage {
  opts: IStorageOpts
  get (key: string): IAny { notImplemented() }
  set (key: string, value: IAny, ttl?: number): void { notImplemented() }
  remove (key: string): void { notImplemented() }
  reset (): void { notImplemented() }

  static getExpirationDate (ttl?: number): number | null {
    if (!ttl) {
      return null
    }

    return ttl + Date.now()
  }
}
