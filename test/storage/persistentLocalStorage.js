import PersistentLocalStorage from '../../src/storage/persistentLocalStorage'
import InMemoryStorage from '../../src/storage/inMemoryStorage'
import type {IData} from '../../src/storage/inMemoryStorage'

const path = '__@@scope_prefix__'

describe('storage/local', () => {
  describe('constructor', () => {
    it('returns proper instance', () => {
      const storage = new PersistentLocalStorage({
        path
      })

      expect(storage).toBeInstanceOf(PersistentLocalStorage)
    })
  })

  describe('proto', () => {})
})
