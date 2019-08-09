import factory, {
  AbstractStorage,
  AbstractPersistentStorage,
  InMemoryStorage,
  PersistentLocalStorage,
  PersistentJsonFileStorage
} from '../../main/js'

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
      PersistentJsonFileStorage
    ]

    constructors.forEach(Constructor => expect(Constructor).toEqual(expect.any(Function)))
  })
})
