// @flow

export type IAny = any

export type IStorageOpts = {
  defaultTtl?: number,
  [key: string]: IAny
}
export interface IStorage {
  opts: IStorageOpts,
  get(key: string): IAny,
  set(key: string, value: IAny, ttl?: number): void,
  remove(key: string): void,
  reset(): void
}

export type IObject = {
  hasOwnProperty: (key: string) => boolean,
  [key: string]: IAny,
}

export type IMemoizeTarget = (...args: IAny[]) => IAny
export type IMemoizeOpts = {
  fn: IMemoizeTarget,
  prefix?: string,
  scope?: IAny,
  store?: IStorage,
  ttl?: number
}
