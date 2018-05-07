// @flow

import fs from 'fs'
import type {IAny, IStorage, IStorageOpts} from '../interface'
import InMemoryStorage from './inMemoryStorage'
import AbstractPersistentStorage from './abstractPersistentStorage'

export const ENCODING = 'utf-8'

export type IFileStorageOpts = IStorageOpts & {
  path: string,
  sync?: ?boolean,
}

export default class PersistentJsonStorage extends AbstractPersistentStorage implements IStorage {
  cache: InMemoryStorage
  opts: IFileStorageOpts

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
  }

  syncFrom () {
    this.cache.data = this.constructor.readFile(this.opts.path)
  }

  syncTo () {
    this.constructor.writeFile(this.opts.path, this.cache.data)
  }

  static writeFile (path: string, data: IAny) {
    fs.writeFileSync(path, this.stringify(data), ENCODING)
  }

  static readFile (path: string): IAny {
    return this.parse(fs.readFileSync(path, ENCODING))
  }
}
