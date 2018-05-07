// @flow

import AbstractStorage from './abstractStorage'
import InMemoryStorage from './inMemoryStorage'
import type {IAny, IObject, IStorage, IStorageOpts} from '../interface'

export default class AbstractPersistentStorage extends AbstractStorage implements IStorage {
  opts: IStorageOpts
  cache: InMemoryStorage

  constructor (opts: IAny) {
    super()

    this.opts = opts
    this.cache = new InMemoryStorage(opts)
    this.syncFrom()
  }

  syncFrom () {
    this.constructor.notImplemented()
  }

  syncTo () {
    this.constructor.notImplemented()
  }

  static stringify (value: IAny): string {
    try {
      return JSON.stringify(value)
    } catch (err) {
      return JSON.stringify(this.processCycledRefs(value))
    }
  }

  static parse (value: string): IAny {
    return JSON.parse(value)
  }

  static processCycledRefs (obj: IObject, verified?: IObject[] = []): IObject | string {
    if (verified.includes(obj)) {
      return '<cycled>'
    }
    verified.push(obj)

    for (let key: string in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          obj[key] = this.processCycledRefs(obj[key], verified)
        }
      }
    }

    return obj
  }
}
