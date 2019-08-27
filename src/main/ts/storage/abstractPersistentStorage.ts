import {IAny, IStorage, IStorageOpts} from '../interface'
import AbstractStorage from './abstractStorage'
import InMemoryStorage from './inMemoryStorage'
import {processCycledRefs, debounce} from '../util'

export default class AbstractPersistentStorage extends AbstractStorage
  implements IStorage {

  cache: InMemoryStorage

  constructor(opts: IStorageOpts) {
    super(opts)

    this.cache = new InMemoryStorage(opts)
    this.syncFrom()
    if (this.opts.debounce) {
      this.syncTo = debounce(this.syncTo.bind(this), this.opts.debounce)
    }
  }

  get(key: string): IAny {
    return this.cache.get(key)
  }

  set(key: string, value: IAny, ttl?: number): void {
    this.cache.set(key, value, ttl)
    this.syncTo()
  }

  setTtl(key: string, ttl: number): void {
    this.cache.setTtl(key, ttl)
    this.syncTo()
  }

  getTtl(key: string): number | null | undefined {
    return this.cache.getTtl(key)
  }

  remove(key: string): void {
    this.cache.remove(key)
    this.syncTo()
  }

  reset(): void {
    this.cache.reset()
    this.syncTo()
  }

  size(): number {
    return this.cache.size()
  }

  compact(): void {
    this.cache.compact()
    this.syncTo()
  }

  syncFrom(): void {
    this.cache.data =
      (this.constructor as typeof AbstractPersistentStorage).parse(
        (this.constructor as typeof AbstractPersistentStorage).read(
          this.opts.path,
        ),
      ) || {}
  }

  syncTo(): void {
    (this.constructor as typeof AbstractPersistentStorage).write(
      this.opts.path,
      (this.constructor as typeof AbstractPersistentStorage).stringify(
        this.cache.data,
      ),
    )
  }

  static write(path: string, data: string) {
    this.notImplemented('write')
  }

  static read(path: string): IAny {
    this.notImplemented('read')
  }

  static stringify(value: IAny): string {
    try {
      return JSON.stringify(value)
      /* tslint:disable */
    } catch (err) {
      return JSON.stringify(processCycledRefs(value))
    }
  }

  static parse(value: string): IAny {
    return JSON.parse(value)
  }
}
