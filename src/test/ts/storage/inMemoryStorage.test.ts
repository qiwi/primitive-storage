import {describe, it, expect} from 'abstractest'

import InMemoryStorage from '../../../main/ts/storage/inMemoryStorage'

// mock.useFakeTimers()

describe('storage/in-memory', () => {
  describe('constructor', () => {
    it('returns proper instance', () => {
      const opts = {}
      const storage = new InMemoryStorage(opts)

      expect(storage.opts).toBe(opts)
      expect(storage).toBeInstanceOf(InMemoryStorage)
    })
  })

  describe('options', () => {
    describe('compactTimer', () => {
      it('wraps `compact` with repeater', (done) => {
        const compactTimer = 100
        const storage = new InMemoryStorage({compactTimer})

        storage.data = {
          foo: {value: 'bar', exp: Number.POSITIVE_INFINITY},
          baz: {value: 'qux', exp: Date.now() + 50},
        }

        setTimeout(() => {
          expect(storage.data).toEqual({
            foo: {value: 'bar', exp: Number.POSITIVE_INFINITY},
          })
          // @ts-ignore
          storage.compact.cancel?.()
          done()
        }, 150)
      })
    })

    describe('clone', () => {
      it('copies the value to data store', () => {
        const storage1 = new InMemoryStorage({clone: false})
        const storage2 = new InMemoryStorage({clone: true})
        const data = {foo: 'bar'}

        storage1.set('foo', data)
        storage2.set('foo', data)

        expect(storage1.data.foo.value).toBe(data)
        expect(storage2.data.foo.value).not.toBe(data)
        expect(storage2.data.foo.value).toEqual(data)
      })

      it('supports optional impl', () => {
        const storage = new InMemoryStorage({
          clone: (data: string) => data.toUpperCase(),
        })

        storage.set('foo', 'bar')
        expect(storage.data.foo.value).toBe('BAR')
      })
    })
  })

  describe('proto', () => {
    const storage = new InMemoryStorage()

    describe('set', () => {
      it('associates value w/ key', () => {
        storage.set('foo', 'bar')
        expect(storage.get('foo')).toBe('bar')
        expect(storage.data).toEqual({
          foo: {
            value: 'bar',
            exp: null,
          },
        })
      })

      it('value with ttl', (done) => {
        storage.set('baz', 'qux', 50)
        setTimeout(() => {
          expect(storage.get('baz')).toBeUndefined()
          done()
        }, 100)
      })
    })

    describe('getTtl', () => {
      it('gets current ttl', () => {
        storage.set('foo', 'foo', 1000)
        storage.set('bar', 'bar', null)

        expect(storage.getTtl('foo')).toBeCloseTo(1000, -2)
        expect(storage.getTtl('bar')).toBeNull()
        // expect(storage.getTtl('baz')).toBeUndefined()
      })
    })

    describe('setTtl', () => {
      it('sets a new ttl value', () => {
        storage.set('foo', 'bar', 10_000_000)
        storage.setTtl('foo', 1000)

        expect(storage.data.foo.exp).toBeCloseTo(Date.now() + 1000, -2)
      })
    })

    describe('get', () => {
      it('resolves value by key', () => {
        storage.set('foo', 'bar')
        expect(storage.get('foo')).toBe('bar')
      })

      it('returns undefined otherwise', () => {
        expect(storage.get('foofoo')).toBeUndefined()
      })
    })

    describe('remove', () => {
      it('drops entry', () => {
        storage.set('foo', 'bar')
        storage.remove('foo')
        expect(storage.get('foo')).toBeUndefined()
      })
    })

    describe('reset', () => {
      it('flushes the storage', () => {
        storage.set('foo', 'bar')
        storage.reset()
        expect(storage.get('foo')).toBeUndefined()
        expect(storage.data).toEqual({})
      })
    })

    describe('resolve', () => {
      it('returns actual entry value', () => {
        storage.set('foo', 'bar')

        expect(storage.resolve({value: 'bar', exp: Number.POSITIVE_INFINITY}, 'foo')).toBe(
          'bar',
        )
        expect(storage.get('foo')).toBe('bar')
      })

      it('drops entry if ttl expired', () => {
        storage.set('foo', 'bar')

        expect(storage.resolve({value: 'bar', exp: 0}, 'foo')).toBeUndefined()
        expect(storage.get('foo')).toBeUndefined()
      })
    })

    describe('compact', () => {
      it('drops all expired entries', () => {
        storage.data = {
          foo: {value: 'bar', exp: Number.POSITIVE_INFINITY},
          baz: {value: 'qux', exp: 0},
        }
        storage.compact()

        expect(storage.data).toEqual({
          foo: {value: 'bar', exp: Number.POSITIVE_INFINITY},
        })
      })
    })

    describe('size', () => {
      it('counts non-expired entries in storage', () => {
        storage.data = {
          foo: {value: 'bar', exp: Number.POSITIVE_INFINITY},
          baz: {value: 'qux', exp: 0},
        }

        expect(storage.size()).toBe(1)
      })
    })
  })
})
