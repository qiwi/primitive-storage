// @flow

import AbstractStorage from './abstractStorage'
import InMemoryStorage from './inMemoryStorage'
import type {IAny, IObject, IStorage, IStorageOpts} from '../interface'

export default class AbstractPersistentStorage extends AbstractStorage implements IStorage {
  opts: IStorageOpts
  cache: InMemoryStorage

  constructor (opts: IAny) {
    super()

    this.opts = opts
    this.cache = new InMemoryStorage(opts)
    this.syncFrom()
  }

  get (key: string): IAny {
    return this.cache.get(key)
  }

  set (key: string, value: IAny, ttl?: number): void {
    this.cache.set(key, value, ttl)
    this.syncTo()
  }

  remove (key: string): void {
    this.cache.remove(key)
    this.syncTo()
  }

  reset (): void {
    this.cache.reset()
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
      return JSON.stringify(this.processCycledRefs(value))
    }
  }

  static parse (value: string): IAny {
    return JSON.parse(value)
  }

  static processCycledRefs (obj: IObject, verified?: IObject[] = []): IObject | string {
    if (verified.includes(obj)) {
      return '<cycled>'
    }
    verified.push(obj)

    for (let key: string in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          obj[key] = this.processCycledRefs(obj[key], verified)
        }
      }
    }

    return obj
  }
}
