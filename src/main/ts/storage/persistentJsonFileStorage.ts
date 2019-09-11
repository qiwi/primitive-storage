import {IAny, IStorage, IStorageOpts} from '../interface'
import AbstractPersistentStorage from './abstractPersistentStorage'

export const ENCODING = 'utf-8'

export type IFileStorageOpts = IStorageOpts & {
  path: string
  sync?: boolean
}

export default class PersistentJsonStorage extends AbstractPersistentStorage
  implements IStorage {

  constructor(opts: any) {
    super(opts)
  }

}

PersistentJsonStorage.prototype.io = {
  write: (path: string, data: string): void => {
    require('fs').writeFileSync(path, data, ENCODING)
  },

  read: (path: string): IAny => {
    return require('fs').readFileSync(path, ENCODING)
  },
}
