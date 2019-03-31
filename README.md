# Pakal
[![Travis build](https://travis-ci.org/yisraelx/pakal.svg?branch=master)](https://travis-ci.org/yisraelx/pakal)
[![Codecov](https://codecov.io/gh/yisraelx/pakal/branch/master/graph/badge.svg)](https://codecov.io/gh/yisraelx/pakal)
[![MIT License](https://img.shields.io/github/license/yisraelx/pakal.svg?color=yellow)](https://github.com/yisraelx/pakal/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/100%25-TypeScript-blue.svg)](https://www.typescriptlang.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

**Pakal is utilities modules, written in typescript.**


## Packages structure
* The code is divided into many small modules and each module is a package in itself ([Packages List](https://github.com/yisraelx/pakal/blob/master/PACKAGES.md)).
* Each package in the scoop has only one function or class and it in the default export of the package.
* Group package brings together several modules from the scope, and in the export has access to all modules.

**Marks:**
* "**-**": __@{scope}/-{name}__ - Group package
* "**_**": **@{scope}/_{name}** - Internal package

## Install
```sh
$ npm install --save @pakal/-all
```
*Or install only the module you need*
```sh
$ npm install --save @pakal/for-each
```

## Use
**Modules**
```ts
import { forEach } from '@pakal/-all';
```
*Or import only the module you need*
```ts
import { default as forEach } from '@pakal/for-each';
```
**Browser**
```html
<script src="https://unpkg.com/@pakal/-all/bundle.umd.min.js"><script>
```
*Or import only the module you need*
```html
<script src="https://unpkg.com/@pakal/for-each/bundle.umd.min.js"><script>
```
```ts
let { forEach } = _;
```

## Compatibility
These modules are written in typescript and available in ES5 and ES6 standard.

* main - commonjs module and es5 standard (index.js)
* module - es2015 module and es5 standard (index.esm.js)
* esnext - es2015 module and current es standard (index.es.js)
* browser - bundle in umd format includes all dependencies in es5 standard (bundle.umd.js, bundle.umd.min.js)
* types - typescript declaration file (index.d.ts)

## Contribute
**Pull requests are welcome!**

**Install** - it will install the dependencies and link all workspaces packages.
```sh
$ yarn install
```
**Test** - it will run all workspaces tests.
```sh
$ yarn test
```
**Build** - it will build all the packages for release.
```sh
$ yarn build
```

## License
Copyright © [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license](https://github.com/yisraelx/pakal/blob/master/LICENSE).
