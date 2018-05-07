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

  static write (path: string, data: string) {
    fs.writeFileSync(path, data, ENCODING)
  }

  static read (path: string): IAny {
    return fs.readFileSync(path, ENCODING)
  }
}
