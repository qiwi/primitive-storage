import AbstractPersistentStorage from '../../src/storage/abstractPersistentStorage'

const processCycledRefs = AbstractPersistentStorage.processCycledRefs.bind(AbstractPersistentStorage)
const stringify = AbstractPersistentStorage.stringify.bind(AbstractPersistentStorage)
const {parse} = AbstractPersistentStorage

describe('storage/abstractPersistent', () => {
  describe('static', () => {
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

    describe('stringify', () => {
      it('transforms object to JSON string', () => {
        expect(stringify({foo: 'bar'})).toEqual('{"foo":"bar"}')
      })

      it('catches cycled refs', () => {
        const foo = {bar: 'baz'}
        foo.foo = foo

        expect(stringify(foo)).toEqual('{"bar":"baz","foo":"<cycled>"}')
      })
    })

    describe('parse', () => {
      it('parses JSON string', () => {
        expect(parse('{"foo":"bar"}')).toEqual({foo: 'bar'})
      })
    })
  })
})
