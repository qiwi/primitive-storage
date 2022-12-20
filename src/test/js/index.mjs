import '@jest/globals'
import { factory } from '../../../target/es6/index.mjs'

describe('index', () => {
  it('exposes factory', () => {
    expect(factory).toEqual(expect.any(Function))
    const storage = factory()

    storage.set('foo', 'bar')
    expect(storage.get('foo')).toEqual('bar')

    storage.compact.cancel?.()
  })
})

