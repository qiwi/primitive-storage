import * as path from 'node:path'
import {fileURLToPath} from 'node:url'

import factory, {
  InMemoryStorage,
  PersistentJsonFileStorage,
  PersistentLocalStorage,
} from '../../main/ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe('factory', () => {
  it('returns `PersistentJsonFileStorage` instance if `path` opt defined for Nodejs runtime', () => {
    // @ts-ignore
    global.window = null
    expect(
      factory({path: path.resolve(__dirname, './storage/data.json')})
        .constructor.name,
    ).toBe(PersistentJsonFileStorage.name)
  })

  it('returns `PersistentLocalStorage` instance if `path` opt defined for browser', () => {
    // @ts-ignore
    global.window = {document: {}}
    expect(factory({path: 'foo'}).constructor.name).toBe(
      PersistentLocalStorage.name,
    )
  })

  it('returns `inMemoryStorage` instance otherwise', () => {
    expect(factory().constructor.name).toBe(InMemoryStorage.name)
  })
})
