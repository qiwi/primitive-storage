// @flow

import type {IObject} from './interface'
export {debounce, repeat} from 'push-it-to-the-limit'

export function processCycledRefs (obj: IObject, verified?: IObject[] = []): IObject | string {
  if (verified.includes(obj)) {
    return '<cycled>'
  }
  verified.push(obj)

  for (let key: string in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        obj[key] = processCycledRefs(obj[key], verified)
      }
    }
  }

  return obj
}
