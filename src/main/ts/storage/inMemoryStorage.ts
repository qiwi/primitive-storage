import {repeat, clone, echo} from '../util'
import AbstractStorage from './abstractStorage'
import {IAny, ICachedStorage, IStorageOpts, IEntry} from '../interface'

export type IData = {
  [key: string]: IEntry
}

export default class InMemoryStorage extends AbstractStorage
  implements ICachedStorage {

  data: IData

  constructor(opts: IStorageOpts = {}) {
    super(opts)
    const {compactTimer} = opts
    this.reset()
    this.data = {}
    if (compactTimer) {
      this.compact = repeat(this.compact.bind(this), compactTimer)
      setTimeout(this.compact, compactTimer)
    }
  }

  has(key: string) {
    return this.data.hasOwnProperty(key)
  }

  get(key: string): IAny {
    const found: IEntry = this.data[key]

    if (!found) {
      return undefined
    }

    return this.resolve(found, key)
  }

  set(key: string, value: IAny, ttl?: number | null): void {
    const _value = (this.constructor as typeof InMemoryStorage).processValue(
      value,
      this.opts,
    )
    const _ttl = ttl || this.opts.defaultTtl
    const exp = (this.constructor as typeof InMemoryStorage).getExpirationDate(
      _ttl,
    )

    this.data[key] = {value: _value, exp}
  }

  setTtl(key: string, ttl: number): void {
    const found: IEntry = this.data[key]

    if (!found) {
      return undefined
    }

    found.exp = (this.constructor as typeof InMemoryStorage).getExpirationDate(
      ttl,
    )
  }

  getTtl(key: string): number | null | undefined {
    const found: IEntry = this.data[key]

    if (!found) {
      return undefined
    }

    if (found && found.exp === null) {
      return null
    }

    return found && found.exp && found.exp - Date.now()
  }

  remove(key: string): void {
    delete this.data[key]
  }

  size(): number {
    // $FlowFixMe Object.values() returns mixed[] https://github.com/facebook/flow/issues/2221
    const entries: IEntry[] = Object.values(this.data)
    // @ts-ignore
    return entries.filter(this.constructor.isExpiredEntry).length
  }

  reset(): void {
    this.data = {}
  }

  resolve(entry: IEntry, key: string): IAny {
    // @ts-ignore
    if (this.constructor.isExpiredEntry(entry)) {
      return this.remove(key)
    }

    return entry.value
  }

  compact = (): void => {
    for (const key in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        this.resolve(this.data[key], key)
      }
    }
  }

  static processValue(value: IAny, opts: IStorageOpts): IAny {
    return opts.clone === true
      ? clone(value)
      : typeof opts.clone === 'function'
      ? opts.clone(value)
      : echo(value)
  }

}
