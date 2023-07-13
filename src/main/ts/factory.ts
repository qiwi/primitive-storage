import type {IConstructor} from '@qiwi/substrate'

import { IAny,ICachedStorage, IFactoryOpts } from './interface'
import {
  InMemoryStorage,
  PersistentJsonFileStorage,
  PersistentLocalStorage,
} from './storage/index'


type IWindow = {document: IAny} | void

export default (opts: IFactoryOpts = {}): ICachedStorage => {
  const Constructor = getStorageConstructor(opts)

  return new Constructor(opts)
}

function getStorageConstructor(opts: IFactoryOpts): IConstructor<ICachedStorage> {
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
