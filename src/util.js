// @flow

import type {IObject, IAny} from './interface'

export function debounce(fn: Function, delay?: number, context?: IAny): Function {
  if (!delay) {
    return fn
  }

  let timeout: TimeoutID
  let lastArgs: IAny[]

  return (...args: IAny[]) => {
    lastArgs = args

    if (!timeout) {
      timeout = setTimeout(() => {
        fn.call(context, ...lastArgs)
      }, delay)
    }
  }
}

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
