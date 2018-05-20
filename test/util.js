import {processCycledRefs} from '../src/util'

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
})
