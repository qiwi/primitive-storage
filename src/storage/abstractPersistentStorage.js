// @flow

import type { IAny, IStorage, IStorageOpts } from '../interface'
import AbstractStorage from './abstractStorage'
import InMemoryStorage from './inMemoryStorage'
import { processCycledRefs, debounce } from '../util'

export default class AbstractPersistentStorage extends AbstractStorage implements IStorage {
  opts: IStorageOpts
  cache: InMemoryStorage

  constructor (opts: IStorageOpts) {
    super(opts)

    this.cache = new InMemoryStorage(opts)
    this.syncFrom()

    if (this.opts.debounce) {
      (this: any).syncTo = debounce(this.syncTo.bind(this), this.opts.debounce)
    }
  }

  get (key: string): IAny {
    return this.cache.get(key)
  }

  set (key: string, value: IAny, ttl?: number): void {
    this.cache.set(key, value, ttl)
    this.syncTo()
  }

  setTtl (key: string, ttl: number): void {
    this.cache.setTtl(key, ttl)
    this.syncTo()
  }

  getTtl (key: string): ?number {
    return this.cache.getTtl(key)
  }

  remove (key: string): void {
    this.cache.remove(key)
    this.syncTo()
  }

  reset (): void {
    this.cache.reset()
    this.syncTo()
  }

  size (): number {
    return this.cache.size()
  }

  compact (): void {
    this.cache.compact()
    this.syncTo()
  }

  syncFrom (): void {
    this.cache.data = this.constructor.parse(this.constructor.read(this.opts.path)) || {}
  }

  syncTo (): void {
    this.constructor.write(this.opts.path, this.constructor.stringify(this.cache.data))
  }

  static write (path: string, data: string) {
    this.notImplemented()
  }

  static read (path: string): IAny {
    this.notImplemented()
  }

  static stringify (value: IAny): string {
    try {
      return JSON.stringify(value)
    } catch (err) {
      return JSON.stringify(processCycledRefs(value))
    }
  }

  static parse (value: string): IAny {
    return JSON.parse(value)
  }
}
