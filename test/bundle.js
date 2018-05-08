import path from 'path'
import factory from '../dist/bundle.es5'

describe('factory', () => {
  it('returns `PersistentJsonFileStorage` instance if `path` opt defined for Nodejs runtime', () => {
    expect(factory({path: path.resolve(__dirname, './storage/data.json')}).cache).toBeDefined()
  })

  it('returns `PersistentLocalStorage` instance if `path` opt defined for browser', () => {
    global.window = {document: {}}
    expect(factory({path: 'foo'}).cache).toBeDefined()
  })

  it('returns `inMemoryStorage` instance otherwise', () => {
    expect(factory().cache).toBeUndefined()
  })
})