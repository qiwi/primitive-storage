import {IStorage, IStorageOpts, IAny, IEntry} from '../interface'
import InMemoryStorage from './inMemoryStorage'

function notImplemented(): void {
  throw new Error('Not implemented')
}

export default class AbstractStorage implements IStorage {

  opts: IStorageOpts

  constructor(opts: IStorageOpts = {}) {
    this.opts = opts
  }

  get(key: string): IAny {
    notImplemented()
  }

  set(key: string, value: IAny, ttl?: number): void {
    notImplemented()
  }

  setTtl(key: string, ttl: number): void {
    notImplemented()
  }

  getTtl(key: string): void {
    notImplemented()
  }

  remove(key: string): void {
    notImplemented()
  }

  reset(): void {
    notImplemented()
  }

  size(): void {
    notImplemented()
  }

  // aliases
  put(...args: [string, IAny, number?]): void {
    this.set(...args)
  }

  del(...args: [string]): void {
    this.remove(...args)
  }

  clear(): void {
    this.reset()
  }

  static getExpirationDate(ttl?: number): number | null {
    if (!ttl) {
      return null
    }

    return ttl + Date.now()
  }

  static isExpiredEntry(entry: IEntry): boolean {
    return typeof entry.exp === 'number' && entry.exp <= Date.now()
  }

  static notImplemented = notImplemented

}
