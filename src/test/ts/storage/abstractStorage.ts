import AbstractStorage from '../../../main/ts/storage/abstractStorage'

const {getExpirationDate, isExpiredEntry} = AbstractStorage

describe('storage/abstract', () => {
  describe('proto', () => {
    class Storage extends AbstractStorage {
      get(key: string): any {
        throw new Error('Not implemented')
      }

      set(key: string, value: any, ttl?: number): void {
        throw new Error('Not implemented')
      }

      remove(key: string): void {
        throw new Error('Not implemented')
      }

      reset(): void {
        throw new Error('Not implemented')
      }

      getTtl(key: string): void {
        throw new Error('Not implemented')
      }

      setTtl(key: string, ttl: number): void {
        throw new Error('Not implemented')
      }

      size(): void {
        throw new Error('Not implemented')
      }
    }

    const storage = new Storage()

    it('`get` is not implemented', () => {
      expect(() => storage.get('foo')).toThrow('Not implemented')
    })

    it('`set` is not implemented', () => {
      expect(() => storage.set('foo', 'bar')).toThrow('Not implemented')
    })

    it('`remove` is not implemented', () => {
      expect(() => storage.remove('foo')).toThrow('Not implemented')
    })

    it('`reset` is not implemented', () => {
      expect(() => storage.reset()).toThrow('Not implemented')
    })

    it('`put` does same as `set`', () => {
      const set = jest.spyOn(storage, 'set')

      expect(() => storage.put('foo', 'bar')).toThrow()
      expect(set).toHaveBeenCalledWith('foo', 'bar')
    })

    it('`del` works as like `remove`', () => {
      const remove = jest.spyOn(storage, 'remove')

      expect(() => storage.del('foo')).toThrow()
      expect(remove).toHaveBeenCalledWith('foo')
    })

    it('`clear` as `reset` alias', () => {
      const reset = jest.spyOn(storage, 'reset')

      expect(() => storage.clear()).toThrow()
      expect(reset).toHaveBeenCalled()
    })

    it('`size` is not implemented', () => {
      expect(() => storage.size()).toThrow('Not implemented')
    })
  })

  describe('static', () => {
    describe('getExpirationDate', () => {
      it('appends ttl to Date.now()', () => {
        expect(getExpirationDate(100)).toBeLessThanOrEqual(100 + Date.now())
      })

      it('returns null otherwise', () => {
        expect(getExpirationDate()).toBeNull()
      })
    })

    describe('isExpiredEntry', () => {
      it('returns true if ttl is expired', () => {
        expect(isExpiredEntry({exp: 0})).toBeTruthy()
      })

      it('returns false if ttl is greater than Date.now()', () => {
        expect(isExpiredEntry({exp: Infinity})).toBeFalsy()
      })

      it('returns false if no ttl found', () => {
        expect(isExpiredEntry({})).toBeFalsy()
      })
    })
  })
})
