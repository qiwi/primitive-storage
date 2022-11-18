import InMemoryStorage from '../../../main/ts/storage/inMemoryStorage'
import PersistentLocalStorage, {
  DEFAULT_PATH,
  PREFIX,
} from '../../../main/ts/storage/persistentLocalStorage'

const PATH = PREFIX + DEFAULT_PATH
const ls = localStorage

describe('storage/local', () => {
  describe('constructor', () => {
    it('returns proper instance', () => {
      const storage = new PersistentLocalStorage()
      expect(storage.cache).toBeInstanceOf(InMemoryStorage)
      expect(storage).toBeInstanceOf(PersistentLocalStorage)
      expect(storage.opts.path).toBe(PATH)
    })
  })

  describe('proto', () => {
    ls.setItem(PATH, '{"foo": {"value": "bar"}}')
    const opts = {path: DEFAULT_PATH}
    const storage = new PersistentLocalStorage(opts)

    describe('get', () => {
      it('resolves value by key', () => {
        expect(storage.get('foo')).toBe('bar')
      })

      it('returns undefined otherwise', () => {
        expect(storage.get('foofoo')).toBeUndefined()
      })
    })

    describe('set', () => {
      it('persists value to file', () => {
        storage.set('baz', 'qux')

        expect(storage.cache.data.baz.value).toBe('qux')

        expect(JSON.parse(ls.getItem(PATH) || '').baz.value).toBe('qux')
      })
    })

    describe('remove', () => {
      it('drops entry', () => {
        storage.remove('foo')
        expect(storage.get('foo')).toBeUndefined()

        expect(JSON.parse(ls.getItem(PATH) || '').foo).toBeUndefined()
      })
    })

    describe('reset', () => {
      it('flushes the storage', () => {
        storage.reset()
        expect(storage.get('baz')).toBeUndefined()
        expect(storage.cache.data).toEqual({})
        expect(JSON.parse(ls.getItem(PATH) || '')).toEqual({})
      })
    })
  })
})
