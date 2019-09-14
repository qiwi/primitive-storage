import {IAny, IObject} from './interface'

export {debounce, repeat} from 'push-it-to-the-limit'

export const processCycledRefs = (
  obj: IObject,
  verified: IObject[] = [],
): IObject | string => {

  if (verified.includes(obj)) {
    return '<cycled>'
  }

  verified.push(obj)

  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      obj[key] = processCycledRefs(obj[key], verified)
    }
  })

  return obj
}

export const clone = (data: IAny): IAny => JSON.parse(JSON.stringify(data))

export const echo = (data: IAny): IAny => data
