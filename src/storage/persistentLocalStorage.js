// @flow

import AbstractPersistentStorage from './abstractPersistentStorage'
import type {IStorage} from '../interface'

const ls = localStorage

export default class PersistentLocalStorage extends AbstractPersistentStorage implements IStorage {
  syncFrom () {}
  syncTo () {}
}
