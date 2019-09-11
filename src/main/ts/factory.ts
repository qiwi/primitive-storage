import {IStorage, IStorageOpts, IAny} from './interface'

import {
  InMemoryStorage,
  PersistentLocalStorage,
  PersistentJsonFileStorage,
} from './storage/index'

type IOpts = IStorageOpts & {
  path?: string
}
type IWindow = {document: IAny} | void

export default (opts: IOpts = {}): IStorage => {
  const Constructor = getStorageConstructor(opts)
  // @ts-ignore
  return new Constructor(opts)
}

function getStorageConstructor(opts: IOpts): Function {
  return !opts.path
    ? InMemoryStorage
    : isBrowser()
    ? PersistentLocalStorage
    : PersistentJsonFileStorage
}

function isBrowser(): boolean {
  try {
    // @ts-ignore
    const w: IWindow = window || (global && global.window) || global
    /* tslint:disable */
    return typeof w !== 'undefined' && typeof w.document !== 'undefined'
  } catch (e) {
    return false
  }
}
