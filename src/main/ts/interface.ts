import {IStorage} from '@qiwi/substrate'

export type IAny = any

export type IEntry = {
  value?: IAny
  exp?: number | null
}

export type IDebounceOpts = {
  delay: number
  maxDelay?: number
  leading?: boolean
  trailing?: boolean
}

export type IStorageOpts = {
  defaultTtl?: number
  debounce?: IDebounceOpts
  clone?: boolean | Function
  syncTimer?: number
  [key: string]: IAny
}
export interface ICachedStorage extends IStorage {
  data?: any,
  opts: IStorageOpts
  get(key: string): IAny
  set(key: string, value: IAny, ttl?: number): void
  setTtl(key: string, ttl: number): void
  getTtl(key: string): void
  remove(key: string): void
  reset(): void
  cache?: ICachedStorage
}

export type IObject = {
  hasOwnProperty: (key: string) => boolean
  [key: string]: IAny
}

export interface IIO {
  write(path: string, data: string): void
  read(path: string): any
}
