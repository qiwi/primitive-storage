import AbstractStorage from '../../src/storage/abstractStorage'

const {getExpirationDate} = AbstractStorage

describe('storage/abstract', () => {
  describe('proto', () => {
    class Storage extends AbstractStorage {}
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
  })

  describe('static', () => {
    describe('getExpirationDate', () => {
      it('appends ttl to Date.now()', () => {
        expect(getExpirationDate(100)).toBe(100 + Date.now())
      })

      it('returns null otherwise', () => {
        expect(getExpirationDate()).toBeNull()
      })
    })
  })
})
