import { processCycledRefs, clone } from '../../main/js/util'

describe('util', () => {
  describe('processCycledRefs', () => {
    it('replaces found cycled refs with "<cycled>"', () => {
      class Foo {}
      Foo.prototype.quux = 'quux'
      const foo = new Foo()

      Object.assign(foo, {
        bar: {
          baz: {}
        },
        qux: 1
      })

      foo.bar.baz.qux = foo
      foo.baz = foo.bar.baz

      expect(processCycledRefs(foo)).toEqual({
        bar: {
          baz: {
            qux: '<cycled>'
          }
        },
        baz: '<cycled>',
        qux: 1
      })
    })
  })

  describe('clone', () => {
    it('clones data through JSON api', () => {
      const data = { foo: 'bar' }
      const cloned = clone(data)

      expect(cloned).toEqual(data)
      expect(cloned).not.toBe(data)
    })
  })
})
