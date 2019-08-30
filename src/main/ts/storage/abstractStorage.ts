import {IStorage, IStorageOpts, IAny, IEntry} from '../interface'

export default abstract class AbstractStorage implements IStorage {

  opts: IStorageOpts

  constructor(opts: IStorageOpts = {}) {
    this.opts = opts
  }

  abstract get(key: string): IAny

  abstract set(key: string, value: IAny, ttl?: number): void

  abstract setTtl(key: string, ttl: number): void

  abstract getTtl(key: string): void

  abstract remove(key: string): void

  abstract reset(): void

  abstract size(): void

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

}
