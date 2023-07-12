import {describe, it, expect} from 'abstractest'
import * as path from 'node:path'
import {fileURLToPath} from 'node:url'

import factory from '../../main/ts/factory'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
