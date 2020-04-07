import * as path from 'path'
import factory from '../../main/ts/factory'

describe('factory', () => {
  it('returns `PersistentJsonFileStorage` instance if `path` opt defined for Nodejs runtime', () => {
    // @ts-ignore
    global.window = null
    expect(
      factory({path: path.resolve(__dirname, './storage/data.json')}).cache,
    ).toBeDefined()
  })

  it('returns `PersistentLocalStorage` instance if `path` opt defined for browser', () => {
    // @ts-ignore
    global.window = {document: {}}
    expect(factory({path: 'foo'}).cache).toBeDefined()
  })

  it('returns `inMemoryStorage` instance otherwise', () => {
    expect(factory().cache).toBeUndefined()
  })
})
