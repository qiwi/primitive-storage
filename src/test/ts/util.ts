import {clone,processCycledRefs} from '../../main/ts/util'

describe('util', () => {
  describe('processCycledRefs', () => {
    it('replaces found cycled refs with "<cycled>"', () => {
      class Foo {}
      // @ts-ignore
      Foo.prototype.quux = 'quux'
      const foo = new Foo()

      Object.assign(foo, {
        bar: {
          baz: {},
        },
        qux: 1,
      })
      // @ts-ignore
      foo.bar.baz.qux = foo
      // @ts-ignore
      foo.baz = foo.bar.baz

      const result = processCycledRefs(foo)

      expect(result).not.toBe(foo)
      expect(result).toEqual({
        bar: {
          baz: {
            qux: '<cycled>',
          },
        },
        baz: '<cycled>',
        qux: 1,
      })
    })
  })

  describe('clone', () => {
    it('clones data through JSON api', () => {
      const data = {foo: 'bar'}
      const cloned = clone(data)

      expect(cloned).toEqual(data)
      expect(cloned).not.toBe(data)
    })
  })
})
