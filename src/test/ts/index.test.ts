import {mock, describe, it, expect} from 'abstractest'
import factory, {
  AbstractPersistentStorage,
  AbstractStorage,
  InMemoryStorage,
  PersistentJsonFileStorage,
  PersistentLocalStorage,
} from '../../main/ts'

describe('index', () => {
  it('exposes factory ', () => {
    expect(factory).toEqual(expect.any(Function))
  })

  it('exposes constructors', () => {
    const constructors = [
      AbstractStorage,
      AbstractPersistentStorage,
      InMemoryStorage,
      PersistentLocalStorage,
      PersistentJsonFileStorage,
    ]

    constructors.forEach(Constructor =>
      expect(Constructor).toEqual(expect.any(Function)),
    )
  })
})
