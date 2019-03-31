# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.2.0](https://github.com/yisraelx/pakal/compare/v0.1.1...v0.2.0) (2019-03-31)


### Features

* add method getGlobal ([6f9ecbb](https://github.com/yisraelx/pakal/commit/6f9ecbb))
* add method isKindOf ([60a18cc](https://github.com/yisraelx/pakal/commit/60a18cc))
* add method isNative ([c9840c1](https://github.com/yisraelx/pakal/commit/c9840c1))
* add method isTypeOf ([d0f822c](https://github.com/yisraelx/pakal/commit/d0f822c))
* add method kindOf ([6c117b5](https://github.com/yisraelx/pakal/commit/6c117b5))
* add method safify ([4567163](https://github.com/yisraelx/pakal/commit/4567163))
* add method tagOf ([9341043](https://github.com/yisraelx/pakal/commit/9341043))
* add method toPrimitive ([4db9ef0](https://github.com/yisraelx/pakal/commit/4db9ef0))
* add method tryify ([3462b71](https://github.com/yisraelx/pakal/commit/3462b71))
* add method typeOf ([380e08b](https://github.com/yisraelx/pakal/commit/380e08b))
* **assertify:** Throws custom error type, Returns some value. ([263a43c](https://github.com/yisraelx/pakal/commit/263a43c))
* **forEach:** `thisArg` option, break loop, support array like ([184eba8](https://github.com/yisraelx/pakal/commit/184eba8))
* add method uniqueId ([bb69e72](https://github.com/yisraelx/pakal/commit/bb69e72))
* add method uniqueKey ([595ad10](https://github.com/yisraelx/pakal/commit/595ad10))


### Performance Improvements

* **keys:** Uses `Object.keys` if it exists ([bb4a7cd](https://github.com/yisraelx/pakal/commit/bb4a7cd))


### BREAKING CHANGES

* **forEach:** if `callback` invokes returns `false` it will break the
loop.
* **assertify:** By default if `fn` invokes returns `true` it will
returns `arguments[0]` instead of `void`.





<a name="0.1.1"></a>
## [0.1.1](https://github.com/yisraelx/pakal/compare/v0.1.0...v0.1.1) (2018-07-14)




**Note:** Version bump only for package pakal-repo
