// @flow

import type { IStorage, IStorageOpts, IAny } from './interface'

import {
  InMemoryStorage,
  PersistentLocalStorage,
  PersistentJsonFileStorage
} from './storage'

type IOpts = IStorageOpts & {
  path?: ?string
}
type IWindow = {document: IAny} | void

export default (opts: IOpts = {}): IStorage => {
  const Constructor = getStorageConstructor(opts)

  return new Constructor(opts)
}

function getStorageConstructor (opts: IOpts): Function {
  return !opts.path
    ? InMemoryStorage
    : isBrowser()
      ? PersistentLocalStorage
      : PersistentJsonFileStorage
}

function isBrowser (): boolean {
  try {
    const w: IWindow = window || (global && global.window) || global

    return typeof w !== 'undefined' && typeof w.document !== 'undefined'
  } catch (e) {
    return false
  }
}
