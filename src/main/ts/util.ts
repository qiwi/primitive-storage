import {IAny, IObject} from './interface'

export {debounce, repeat} from 'push-it-to-the-limit'

export const processCycledRefs = (
  obj: IObject,
  verified: IObject[] = [],
  target: IObject = {},
): IObject | string => {

  if (verified.includes(obj)) {
    return '<cycled>'
  }

  verified.push(obj)

  Object.keys(obj).forEach(key => {
    target[key] = typeof obj[key] === 'object'
      ? processCycledRefs(obj[key], verified)
      : obj[key]
  })

  return target
}

export const clone = (data: IAny): IAny => JSON.parse(JSON.stringify(data))

export const echo = (data: IAny): IAny => data
