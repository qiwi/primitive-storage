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

// https://stackoverflow.com/questions/72432973/ts-jest-cannot-use-top-level-await-even-with-correct-tsconfig
let fs: any
try {
  // @ts-ignore
  fs = global.require ? global.require('fs') : await import('node:fs')
} catch { /** noop */ }

PersistentJsonStorage.prototype.io = {
  write: (path: string, data: string): void => {
    fs.writeFileSync(path, data, ENCODING)
  },

  read: (path: string): IAny => {
    return fs.readFileSync(path, ENCODING)
  },
}
