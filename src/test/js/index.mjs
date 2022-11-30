import { factory } from '../../../target/bundle/primitive-storage.mjs'

describe('index', () => {
  it('exposes factory', () => {
    expect(factory).toEqual(expect.any(Function))
  })
})

