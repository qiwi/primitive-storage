import {IAny, IStorage, IStorageOpts} from '../interface'
import AbstractPersistentStorage from './abstractPersistentStorage'

export const ENCODING = 'utf-8'

export type IFileStorageOpts = IStorageOpts & {
  path: string
  sync?: boolean
}

export default class PersistentJsonStorage extends AbstractPersistentStorage
  implements IStorage {

  static write(path: string, data: string) {
    require('fs').writeFileSync(path, data, ENCODING)
  }

  static read(path: string): IAny {
    return require('fs').readFileSync(path, ENCODING)
  }

}
