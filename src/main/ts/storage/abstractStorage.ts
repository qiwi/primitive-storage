import {IStorage, IStorageOpts, IAny, IEntry} from '../interface'
import InMemoryStorage from './inMemoryStorage'

function notImplemented(method: string): void {
  throw new Error(`${method} not implemented`)
}

export default class AbstractStorage implements IStorage {

  opts: IStorageOpts

  constructor(opts: IStorageOpts = {}) {
    this.opts = opts
  }

  get(key: string): IAny {
    notImplemented('get')
  }

  set(key: string, value: IAny, ttl?: number): void {
    notImplemented('set')
  }

  setTtl(key: string, ttl: number): void {
    notImplemented('setTtl')
  }

  getTtl(key: string): void {
    notImplemented('getTtl')
  }

  remove(key: string): void {
    notImplemented('remove')
  }

  reset(): void {
    notImplemented('reset')
  }

  size(): void {
    notImplemented('size')
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
