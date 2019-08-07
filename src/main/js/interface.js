// @flow

export type IAny = any

export type IEntry = {
  value: IAny,
  exp: number | null
}

export type IDebounceOpts = {
  delay: number,
  maxDelay?: number,
  leading?: boolean,
  trailing?: boolean
}

export type IStorageOpts = {
  defaultTtl?: number,
  debounce?: IDebounceOpts,
  clone?: boolean | Function,
  syncTimer?: number,
  [key: string]: IAny
}
export interface IStorage {
  opts: IStorageOpts,
  get(key: string): IAny,
  set(key: string, value: IAny, ttl?: number): void,
  setTtl(key: string, ttl: number): void,
  getTtl(key: string): ?number,
  remove(key: string): void,
  reset(): void
}

export type IObject = {
  hasOwnProperty: (key: string) => boolean,
  [key: string]: IAny,
}
