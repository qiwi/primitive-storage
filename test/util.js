import {debounce, processCycledRefs} from '../src/util'

describe('util', () => {
  describe('debounce', () => {
    it('limits invocation frequency', done => {
      let counter = 0
      const fn = v => { counter += v }
      const delayed = debounce(fn, 5)
      const data = [1, 2, 3, 4, 5]

      data.forEach(v => delayed(v))

      setTimeout(() => {
        expect(counter).toBe(5)
        done()
      }, 10)
    })

    it('factory return same fn if no delay specified', () => {
      const fn = () => {}

      expect(debounce(fn)).toBe(fn)
    })
  })

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
