import AbstractPersistentStorage from '../../src/storage/abstractPersistentStorage'
import InMemoryStorage from '../../src/storage/inMemoryStorage'

const processCycledRefs = AbstractPersistentStorage.processCycledRefs.bind(AbstractPersistentStorage)
const stringify = AbstractPersistentStorage.stringify.bind(AbstractPersistentStorage)
const write = AbstractPersistentStorage.write.bind(AbstractPersistentStorage)
const read = AbstractPersistentStorage.read.bind(AbstractPersistentStorage)
const {parse} = AbstractPersistentStorage

describe('storage/abstractPersistent', () => {
  describe('constructor', () => {
    it('returns proper instance', () => {
      class Storage extends AbstractPersistentStorage {
        syncFrom () {}
      }
      const storage = new Storage({})

      expect(storage.cache).toBeInstanceOf(InMemoryStorage)
    })
  })

  describe('proto', () => {
    describe('sync', () => {
      let persisted = 'qux'
      class Storage extends AbstractPersistentStorage {
        static read (path) { return 'read' + path + persisted }
        static write (path, data) { persisted = 'write' + path + data }
        static stringify (data) { return 'stringified' + data }
        static parse (data) { return 'parsed' + data }
      }
      const path = 'foo'
      const storage = new Storage({path})

      it('`syncFrom` composes `read` and `parse`', () => {
        storage.syncFrom()
        expect(storage.cache.data).toBe('parsedreadfooqux')
      })

      it('`syncTo` composes `stringify` and `write`', () => {
        storage.cache.data = 'bar'
        storage.syncTo()

        expect(persisted).toBe('writefoostringifiedbar')
      })
    })

    describe('IStorage methods', () => {
      class Storage extends AbstractPersistentStorage {
        static write () {}
        static read () { return '{"foo": {"value": "bar"}}' }
      }
      const storage = new Storage({path: 'qux'})
      const syncTo = jest.spyOn(storage, 'syncTo')
      const syncFrom = jest.spyOn(storage, 'syncFrom')

      beforeEach(() => {
        syncFrom.mockClear()
        syncTo.mockClear()
      })

      it('`get` returns value from cache', () => {
        expect(storage.get('foo')).toBe('bar')
        expect(syncTo).not.toHaveBeenCalled()
      })

      it('`set` adds value to cache and triggers `syncTo`', () => {
        expect(storage.set('bar', 'qux')).toBeUndefined()
        expect(syncTo).toHaveBeenCalled()
      })

      it('`remove` deletes target key and triggers `syncTo`', () => {
        expect(storage.remove('bar')).toBeUndefined()
        expect(syncTo).toHaveBeenCalled()
      })

      it('`reset` flushes cache and triggers `syncTo`', () => {
        expect(storage.reset()).toBeUndefined()
        expect(syncTo).toHaveBeenCalled()
      })
    })
  })

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

    describe('read', () => {
      it('is not implemented', () => {
        expect(read).toThrow('Not implemented')
      })
    })

    describe('write', () => {
      it('is not implemented', () => {
        expect(write).toThrow('Not implemented')
      })
    })
  })
})
