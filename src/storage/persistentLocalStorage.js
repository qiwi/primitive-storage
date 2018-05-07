// @flow

import type {IAny, IStorage, IStorageOpts} from '../interface'
import AbstractPersistentStorage from './abstractPersistentStorage'
import InMemoryStorage from './inMemoryStorage'

const ls = localStorage
export const PREFIX = '__@@ps__'
export const DEFAULT_PATH = 'default.json'

export default class PersistentLocalStorage extends AbstractPersistentStorage implements IStorage {
  cache: InMemoryStorage
  opts: IStorageOpts

  constructor(opts: IStorageOpts = {}) {
    const path = PREFIX + (opts.path || DEFAULT_PATH)
    const _opts = Object.assign(opts, {path})

    super(_opts)
  }

  static write (path: string, data: string): void {
    ls.setItem(path, data)
  }

  static read (path: string): IAny {
    return ls.getItem(path)
  }
}
