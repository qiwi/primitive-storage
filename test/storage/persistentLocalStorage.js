import PersistentLocalStorage, {PREFIX, DEFAULT_PATH} from '../../src/storage/persistentLocalStorage'
import InMemoryStorage from '../../src/storage/inMemoryStorage'
import type {IData} from '../../src/storage/inMemoryStorage'

const path = PREFIX + DEFAULT_PATH
const ls = localStorage

describe('storage/local', () => {
  describe('constructor', () => {
    it('returns proper instance', () => {
      const storage = new PersistentLocalStorage({
        path
      })

      expect(storage).toBeInstanceOf(PersistentLocalStorage)
    })
  })

  describe('proto', () => {
    const data = {foo: 'bar'}
    ls.setItem('')

    describe('syncFrom', () => {
      it('gets value from localStorage', () => {

      })
    })
  })
})
