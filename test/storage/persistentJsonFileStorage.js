import path from 'path'
import fs from 'fs'
import PersistentJsonFileStorage, {ENCODING} from '../../src/storage/persistentJsonFileStorage'
import InMemoryStorage from '../../src/storage/inMemoryStorage'

const PATH = path.resolve(__dirname, './data.json')
const INITIAL_DATA = {foo: {value: 'bar', exp: null}}
const reset = () => fs.writeFileSync(PATH, JSON.stringify(INITIAL_DATA), ENCODING)

describe('storage/json-file', () => {
  beforeAll(reset)
  afterAll(reset)

  describe('constructor', () => {
    it('returns proper instance', () => {
      const opts = {path: PATH}
      const storage = new PersistentJsonFileStorage(opts)

      expect(storage.opts).toBe(opts)
      expect(storage).toBeInstanceOf(PersistentJsonFileStorage)
      expect(storage.cache).toBeInstanceOf(InMemoryStorage)
      expect(storage.cache.data).toEqual(INITIAL_DATA)
    })
  })

  describe('proto', () => {
    const opts = {path: PATH}
    const storage = new PersistentJsonFileStorage(opts)

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
        expect(JSON.parse(fs.readFileSync(PATH)).baz.value).toBe('qux')
      })
    })

    describe('remove', () => {
      it('drops entry', () => {
        storage.remove('foo')
        expect(storage.get('foo')).toBeUndefined()
        expect(JSON.parse(fs.readFileSync(PATH)).foo).toBeUndefined()
      })
    })

    describe('reset', () => {
      it('flushes the storage', () => {
        storage.reset()
        expect(storage.get('baz')).toBeUndefined()
        expect(storage.cache.data).toEqual({})
        expect(JSON.parse(fs.readFileSync(PATH))).toEqual({})
      })
    })
  })

  describe('static', () => {
    describe('write', () => {
      it('persists data to file', () => {
        const data = {baz: 'qux'}

        PersistentJsonFileStorage.write(PATH, JSON.stringify(data))
        expect(fs.readFileSync(PATH, ENCODING)).toBe('{"baz":"qux"}')
      })
    })

    describe('read', () => {
      it('reads and parses file data', () => {
        reset()

        expect(PersistentJsonFileStorage.read(PATH)).toEqual(JSON.stringify({foo: {value: 'bar', exp: null}}))
      })
    })
  })
})
