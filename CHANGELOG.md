## [1.4.7](https://github.com/qiwi/primitive-storage/compare/v1.4.6...v1.4.7) (2022-11-18)

### Fixes & improvements
* perf: migrate to gh actions (#98) ([6b680de](https://github.com/qiwi/primitive-storage/commit/6b680dedfebb54c95ee8b3943f80352b865fe9f9))

## [1.4.6](https://github.com/qiwi/primitive-storage/compare/v1.4.5...v1.4.6) (2021-08-20)


### Bug Fixes

* **package:** update deps, fix vuls ([ab955dd](https://github.com/qiwi/primitive-storage/commit/ab955dd879f2068fda2c9036918ea468d86b55b2))

## [1.4.5](https://github.com/qiwi/primitive-storage/compare/v1.4.4...v1.4.5) (2021-06-21)


### Bug Fixes

* **pkg:** update deps, fix vuls ([567adfa](https://github.com/qiwi/primitive-storage/commit/567adfa64b7d010bf078250df28096e205bb765d))

## [1.4.4](https://github.com/qiwi/primitive-storage/compare/v1.4.3...v1.4.4) (2020-04-07)


### Bug Fixes

* **package:** fix bundle dir layout ([54ae949](https://github.com/qiwi/primitive-storage/commit/54ae949e51b2fb02a648fbfc57a3cd9025b891e6))

## [1.4.3](https://github.com/qiwi/primitive-storage/compare/v1.4.2...v1.4.3) (2020-04-07)


### Bug Fixes

* up deps & make *Storage be compatible with IStorage ([4f2f6a2](https://github.com/qiwi/primitive-storage/commit/4f2f6a21eb7b9a70c72155de48b8f40cb4d2505d))

## [1.4.2](https://github.com/qiwi/primitive-storage/compare/v1.4.1...v1.4.2) (2019-09-14)


### Bug Fixes

* **util:** processCycledRefs should not mutate src object ([19f8f75](https://github.com/qiwi/primitive-storage/commit/19f8f75))

## [1.4.1](https://github.com/qiwi/primitive-storage/compare/v1.4.0...v1.4.1) (2019-09-11)


### Bug Fixes

* **facade:** export ifaces and types ([7a34890](https://github.com/qiwi/primitive-storage/commit/7a34890))
* **package:** fix deps clash ([186e3b7](https://github.com/qiwi/primitive-storage/commit/186e3b7))

# [1.4.0](https://github.com/qiwi/primitive-storage/compare/v1.3.0...v1.4.0) (2019-09-11)


### Features

* migrate to typescript ([c94fb26](https://github.com/qiwi/primitive-storage/commit/c94fb26)), closes [#24](https://github.com/qiwi/primitive-storage/issues/24) [#35](https://github.com/qiwi/primitive-storage/issues/35)

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
