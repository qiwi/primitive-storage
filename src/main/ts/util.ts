import {IAny, IObject} from './interface'
// @ts-ignore
export {debounce, repeat} from 'push-it-to-the-limit'

export function processCycledRefs(
  obj: IObject,
  verified: IObject[] = [],
): IObject | string {
  if (verified.includes(obj)) {
    return '<cycled>'
  }
  verified.push(obj)

  Object.keys(obj).forEach((key => {
    if (typeof obj[key] === 'object') {
      obj[key] = processCycledRefs(obj[key], verified)
    }
  }))

  return obj
}

export function clone(data: IAny): IAny {
  return JSON.parse(JSON.stringify(data))
}

export function echo(data: IAny): IAny {
  return data
}
