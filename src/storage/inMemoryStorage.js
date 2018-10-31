// @flow
import { repeat, clone, echo } from '../util'
import AbstractStorage from './abstractStorage'
import type { IAny, IStorage, IStorageOpts, IEntry } from '../interface'

export type IData = {
  [key: string]: IEntry
}

export default class InMemoryStorage extends AbstractStorage implements IStorage {
  opts: IStorageOpts
  data: IData

  constructor (opts: IStorageOpts = {}) {
    super(opts)
    const { compactTimer } = opts

    this.reset()

    if (compactTimer) {
      this.compact = repeat(this.compact.bind(this), compactTimer)
      setTimeout(this.compact, compactTimer)
    }
  }

  get (key: string): IAny {
    const found: IEntry = this.data[key]

    if (!found) {
      return undefined
    }

    return this.resolve(found, key)
  }

  set (key: string, value: IAny, ttl?: number): void {
    const _value = this.constructor.processValue(value, this.opts)
    const _ttl = ttl || this.opts.defaultTtl
    const exp = this.constructor.getExpirationDate(_ttl)

    this.data[key] = { value: _value, exp }
  }

  setTtl (key: string, ttl: number): void {
    const found: IEntry = this.data[key]

    if (!found) {
      return undefined
    }

    found.exp = this.constructor.getExpirationDate(ttl)
  }

  getTtl (key: string): ?number {
    const found: IEntry = this.data[key]

    return found
      ? found.exp === null
        ? null
        : found.exp - Date.now()
      : undefined
  }

  remove (key: string): void {
    delete this.data[key]
  }

  size (): number {
    // $FlowFixMe Object.values() returns mixed[] https://github.com/facebook/flow/issues/2221
    const entries: IEntry[] = Object.values(this.data)

    return entries
      .filter(this.constructor.isExpiredEntry)
      .length
  }

  reset (): void {
    this.data = {}
  }

  resolve (entry: IEntry, key: string): ?IAny {
    if (this.constructor.isExpiredEntry(entry)) {
      return this.remove(key)
    }

    return entry.value
  }

  compact = (): void => {
    for (let key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        this.resolve(this.data[key], key)
      }
    }
  }

  static processValue (value: IAny, opts: IStorageOpts): IAny {
    return opts.clone === true
      ? clone(value)
      : typeof opts.clone === 'function'
        ? opts.clone(value)
        : echo(value)
  }
}
