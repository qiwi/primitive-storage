import {IAny, ICachedStorage, IStorageOpts} from '../interface'
import AbstractPersistentStorage from './abstractPersistentStorage'
import {r} from '@antongolub/r'

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

const fs = r('node:fs')

PersistentJsonStorage.prototype.io = {
  write: (path: string, data: string): void => {
    fs.writeFileSync(path, data, ENCODING)
  },

  read: (path: string): IAny => {
    return fs.readFileSync(path, ENCODING)
  },
}
