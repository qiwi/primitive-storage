// @flow

import type {IStorage, IStorageOpts, IAny} from './interface'
type IOpts = IStorageOpts & {
  path?: ?string
}
type IWindow = {document: IAny} | void

module.exports = (opts: IOpts = {}): IStorage => {
  const Constructor = loadConstructor(opts)

  return new Constructor(opts)
}

function loadConstructor(opts: IOpts): Function {
  let path = './storage/inMemoryStorage'

  if (opts.path) {
    path = isBrowser()
      ? './storage/persistentLocalStorage'
      : './storage/persistentJsonFileStorage'
  }

  return require(path).default
}

function isBrowser() {
  try {
    const w: IWindow = window
    return typeof w !== 'undefined' && typeof w.document !== 'undefined'

  } catch (e) {
    return false
  }
}
