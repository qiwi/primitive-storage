import path from 'path'
import factory from '../../main/js'
import InMemoryStorage from '../../main/js/storage/inMemoryStorage'
import PersistentJsonFileStorage from '../../main/js/storage/persistentJsonFileStorage'
import PersistentLocalStorage from '../../main/js/storage/persistentLocalStorage'

describe('factory', () => {
  it('returns `PersistentJsonFileStorage` instance if `path` opt defined for Nodejs runtime', () => {
    global.window = null
    expect(factory({ path: path.resolve(__dirname, './storage/data.json') }).constructor.name).toBe(PersistentJsonFileStorage.name)
  })

  it('returns `PersistentLocalStorage` instance if `path` opt defined for browser', () => {
    global.window = { document: {} }
    expect(factory({ path: 'foo' }).constructor.name).toBe(PersistentLocalStorage.name)
  })

  it('returns `inMemoryStorage` instance otherwise', () => {
    expect(factory().constructor.name).toBe(InMemoryStorage.name)
  })
})
