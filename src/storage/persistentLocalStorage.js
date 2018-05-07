// @flow

import AbstractPersistentStorage from './abstractPersistentStorage'
import type {IAny, IStorage} from '../interface'
import {ENCODING} from "./persistentJsonFileStorage"

const ls = localStorage
export const PREFIX = '__@@ps__'
export const DEFAULT_PATH = 'default.json'

export default class PersistentLocalStorage extends AbstractPersistentStorage implements IStorage {
  constructor(opts = {}) {
    super(opts)
    this.opts.path = PREFIX + (opts.path || DEFAULT_PATH)
  }




  static write (path: string, data: string): void {
    ls.setItem(path, data)
  }

  static read (path: string): IAny {
    return ls.getItem(path)
  }
}
