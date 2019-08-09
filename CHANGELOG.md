# [1.3.0](https://github.com/qiwi/primitive-storage/compare/v1.2.2...v1.3.0) (2019-08-09)


### Features

* expose storage constructors ([251adff](https://github.com/qiwi/primitive-storage/commit/251adff)), closes [#36](https://github.com/qiwi/primitive-storage/issues/36)

## [1.2.2](https://github.com/qiwi/primitive-storage/compare/v1.2.1...v1.2.2) (2019-08-06)


### Performance Improvements

* minor improvements, up deps, linting ([a732591](https://github.com/qiwi/primitive-storage/commit/a732591))

## [1.2.1](https://github.com/qiwi/primitive-storage/compare/v1.2.0...v1.2.1) (2018-12-19)


### Bug Fixes

* broken localStorage ref ([0087d0d](https://github.com/qiwi/primitive-storage/commit/0087d0d))

# [1.2.0](https://github.com/qiwi/primitive-storage/compare/v1.1.0...v1.2.0) (2018-06-21)


### Features

* add `getTtl` to obtain current value's rest of time ([9e54120](https://github.com/qiwi/primitive-storage/commit/9e54120))

# [1.1.0](https://github.com/qiwi/primitive-storage/compare/v1.0.0...v1.1.0) (2018-06-21)


### Features

* add `setTtl` method to refresh expiration timepoint ([f6d2d9a](https://github.com/qiwi/primitive-storage/commit/f6d2d9a))
* add debouncing for `syncTo` ([0f464b9](https://github.com/qiwi/primitive-storage/commit/0f464b9))
* support `clone` opt ([18371c8](https://github.com/qiwi/primitive-storage/commit/18371c8))
* support configurable `clone` impl ([e340010](https://github.com/qiwi/primitive-storage/commit/e340010))

# [1.1.0](https://github.com/qiwi/primitive-storage/compare/v1.0.0...v1.1.0) (2018-06-21)


### Features

* add debouncing for `syncTo` ([0f464b9](https://github.com/qiwi/primitive-storage/commit/0f464b9))
* support `clone` opt ([18371c8](https://github.com/qiwi/primitive-storage/commit/18371c8))
* support configurable `clone` impl ([e340010](https://github.com/qiwi/primitive-storage/commit/e340010))

<a name="1.0.0"></a>
# 1.0.0 (2018-05-21)


### Bug Fixes

* **rollup:** fix broken cjs exports ([7e394b0](https://github.com/antongolub/primitive-storage/commit/7e394b0))


### Features

* **AbstractStorage:** add method aliases: put, del, clear ([3fc0948](https://github.com/antongolub/primitive-storage/commit/3fc0948))
* **InMemoryStorage:** add `compact` method ([0fddb6b](https://github.com/antongolub/primitive-storage/commit/0fddb6b))
* add `size` method ([a01073a](https://github.com/antongolub/primitive-storage/commit/a01073a))
* add persistedLocalStorage support ([ff7beaa](https://github.com/antongolub/primitive-storage/commit/ff7beaa))
* add storage factory ([9e3dbe5](https://github.com/antongolub/primitive-storage/commit/9e3dbe5))
* **InMemoryStorage:** add `compactTimer` option ([4adf70d](https://github.com/antongolub/primitive-storage/commit/4adf70d))
