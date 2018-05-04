# Primitive storage

Storage impl for basic purposes.

#### Motivation
In 2018 it's easier to write own storage implementation than to find a suitable one.
* [memory-cache](https://www.npmjs.com/package/memory-cache) is good enough, but `setTimeout` for each entry looks redundant (0.2.0)
* [data-store](https://www.npmjs.com/package/data-store) — very nice, but only synchronous saving is supported, no debouncing, no ttl (2.0.1)
* [node-cache](https://www.npmjs.com/package/node-cache) — pretty OK. Callbacks and events are supported. But no JSON.stringify handling, no persistency out of box (4.2.0)

#### What's needed
* Key-Value scheme
* Optional TTL
* Lazy compaction
* Cycled refs handling (JSON.stringify, you know)
* Browser and nodejs runtime support

#### Install
```bash
    npm i @antongolub/primitive-storage
    yarn add @antongolub/primitive-storage
```

#### `API`
```javascript
interface IStorage {
  get(key: string): any,
  set(key: string, value: any, ttl?: number): void,
  remove(key: string): void,
  reset(): void
}
```

#### Usage examples
```javascript
    import {InMemoryStorage} from '@antongolub/primitive-storage'

    const storage = new InMemoryStorage({defaultTtl: 60000})

    storage.set('foo', 'bar')
    storage.get('foo')  // 'bar'
    
    // A minute later
    storage.get('foo')  // undefined
```

#### `Persistent`
It's very simple: if `path` property declared in opts, data is persisted.