import AbstractPersistentStorage from '../../src/storage/abstractPersistentStorage'
import InMemoryStorage from '../../src/storage/inMemoryStorage'

const stringify = AbstractPersistentStorage.stringify.bind(AbstractPersistentStorage)
const write = AbstractPersistentStorage.write.bind(AbstractPersistentStorage)
const read = AbstractPersistentStorage.read.bind(AbstractPersistentStorage)
const {parse} = AbstractPersistentStorage

describe('storage/abstractPersistent', () => {
  describe('constructor', () => {
    class Storage extends AbstractPersistentStorage {
      syncFrom () {}
    }

    it('returns proper instance', () => {
      const storage = new Storage({})
      expect(storage.cache).toBeInstanceOf(InMemoryStorage)
    })

    it('supports `debounce` opts', () => {
      const storage1 = new Storage({path: 'foo'})
      const storage2 = new Storage({path: 'foo', debounce: {delay: 500, maxDelay: 1000}})

      expect(storage1.syncTo).toBe(Storage.prototype.syncTo)
      expect(storage2.syncTo).not.toBe(Storage.prototype.syncTo)
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

      it('`size` returns the count of non-expired cached entries', () => {
        storage.cache.data = {
          foo: {value: 'bar', exp: Infinity},
          baz: {value: 'qux', exp: 0}
        }

        expect(storage.size()).toBe(1)
      })

      it('`compact` throws away expired entries ant triggers `syncTo`', () => {
        expect(storage.compact()).toBeUndefined()
        expect(syncTo).toHaveBeenCalled()
      })
    })
  })

  describe('static', () => {
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
