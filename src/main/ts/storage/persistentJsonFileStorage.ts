import {IAny, ICachedStorage, IStorageOpts} from '../interface'
import AbstractPersistentStorage from './abstractPersistentStorage'

export const ENCODING = 'utf-8'

export type IFileStorageOpts = IStorageOpts & {
  path: string
  sync?: boolean
}

export default class PersistentJsonStorage extends AbstractPersistentStorage
  implements ICachedStorage {

  constructor(opts: any) {
    super(opts)
  }

}

let fs: any
try {
  // @ts-ignore
  fs = global.require ? global.require('fs') : await import('node:fs')
} catch {

}


PersistentJsonStorage.prototype.io = {
  write: (path: string, data: string): void => {
    fs.writeFileSync(path, data, ENCODING)
  },

  read: (path: string): IAny => {
    return fs.readFileSync(path, ENCODING)
  },
}
