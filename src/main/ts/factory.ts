import type {IConstructor} from '@qiwi/substrate'

import {IAny,ICachedStorage, IStorageOpts} from './interface'
import {
  InMemoryStorage,
  PersistentJsonFileStorage,
  PersistentLocalStorage,
} from './storage/index'

type IOpts = IStorageOpts & {
  path?: string
}
type IWindow = {document: IAny} | void

export default (opts: IOpts = {}): ICachedStorage => {
  const Constructor = getStorageConstructor(opts)

  return new Constructor(opts)
}

function getStorageConstructor(opts: IOpts): IConstructor<ICachedStorage> {
  return opts.path
    ? isBrowser()
    ? PersistentLocalStorage
    : PersistentJsonFileStorage
    : InMemoryStorage
}

function isBrowser(): boolean {
  try {
    const w: IWindow = window || (global && global.window) || global
    /* tslint:disable */
    return w !== undefined && w.document !== undefined
  } catch {
    return false
  }
}
