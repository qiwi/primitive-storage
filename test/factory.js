import path from 'path'
import factory from '../src'
import InMemoryStorage from '../src/storage/InMemoryStorage'
import PersistentJsonFileStorage from '../src/storage/PersistentJsonFileStorage'
import PersistentLocalStorage from '../src/storage/PersistentLocalStorage'

describe('factory', () => {
  it('returns `PersistentJsonFileStorage` instance if `path` opt defined for Nodejs runtime', () => {
    expect(factory({path: path.resolve(__dirname, './storage/data.json')}).constructor.name).toBe(PersistentJsonFileStorage.name)
  })

  it('returns `PersistentLocalStorage` instance if `path` opt defined for browser', () => {
    global.window = {document: {}}
    expect(factory({path: 'foo'}).constructor.name).toBe(PersistentLocalStorage.name)
  })

  it('returns `inMemoryStorage` instance otherwise', () => {
    expect(factory().constructor.name).toBe(InMemoryStorage.name)
  })
})
