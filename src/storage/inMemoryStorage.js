// @flow
import AbstractStorage from './abstractStorage'
import type {IAny, IStorage, IStorageOpts} from '../interface'

export type IEntry = {
  value: IAny,
  exp: number | null
}

export type IData = {
  [key: string]: IEntry
}

export default class InMemoryStorage extends AbstractStorage implements IStorage {
  opts: IStorageOpts
  data: IData
  constructor (opts: IStorageOpts = {}) {
    super()
    this.opts = opts
    this.reset()
  }

  get (key: string): IAny {
    const found: IEntry = this.data[key]

    if (!found) {
      return undefined
    }

    if (typeof found.exp === 'number' && found.exp <= Date.now()) {
      return this.remove(key)
    }

    return found.value
  }

  set (key: string, value: IAny, ttl?: number): void {
    const _ttl = ttl || this.opts.defaultTtl
    const exp = this.constructor.getExpirationDate(_ttl)

    this.data[key] = {value, exp}
  }

  remove (key: string): void {
    delete this.data[key]
  }

  reset (): void {
    this.data = {}
  }
}
