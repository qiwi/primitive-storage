// @flow

import fs from 'fs'
import type {IAny, IStorage, IStorageOpts} from '../interface'
import InMemoryStorage from './inMemoryStorage'
import type {IData} from './inMemoryStorage'
import AbstractPersistentStorage from './abstractPersistentStorage'

export const ENCODING = 'utf-8'

export type IFileStorageOpts = IStorageOpts & {
  path: string,
  sync?: ?boolean,
}

export default class PersistentJsonStorage extends AbstractPersistentStorage implements IStorage {
  cache: InMemoryStorage
  opts: IFileStorageOpts
  constructor (opts: IFileStorageOpts) {
    super()
    const data: IData = this.constructor.readFile(opts.path)

    this.opts = opts
    this.cache = new InMemoryStorage(opts)
    this.cache.data = data
  }

  get (key: string): IAny {
    return this.cache.get(key)
  }

  set (key: string, value: IAny, ttl?: number): void {
    this.cache.set(key, value, ttl)
    this.sync()
  }

  remove (key: string): void {
    this.cache.remove(key)
    this.sync()
  }

  reset (): void {
    this.cache.reset()
  }

  sync () {
    this.constructor.writeFile(this.opts.path, this.cache.data)
  }

  static writeFile (path: string, data: IAny) {
    fs.writeFileSync(path, this.stringify(data), ENCODING)
  }

  static readFile (path: string): IAny {
    return this.parse(fs.readFileSync(path, ENCODING))
  }
}
