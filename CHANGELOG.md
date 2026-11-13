# Changelog

## [0.3.0-beta.3](https://github.com/roger-protocol/roger-specs/compare/v0.3.0-beta.2...v0.3.0-beta.3) (2026-11-13)

### Features

* change all unions for discriminatedUnions ([07fe3c9](https://github.com/roger-protocol/roger-specs/commit/07fe3c94a832ab5e1d891c251f27a2778a7d2d03))

### Bug Fixes

* fix list response schemas being of type "object" instead of type ([63abc25](https://github.com/roger-protocol/roger-specs/commit/63abc250923a251264f62e36adb3fbdecf08bd28))
* fix the whole place array marked as binary in the createDeployment ([b321d54](https://github.com/roger-protocol/roger-specs/commit/b321d54ace3d24afcbc091358d98ce8e9d7770c4))
* make token_type_hint as per RFC 7009 ([190c6e4](https://github.com/roger-protocol/roger-specs/commit/190c6e4f2827c68dc96c5892a33a7e6f5ef72b5d))
* mark all request bodies as required accross all endpoints ([2d1fa08](https://github.com/roger-protocol/roger-specs/commit/2d1fa082e897282079504e85df8f0c7d3f032e0d))
* register OpenAPI components and normalize field names ([a5b1bbb](https://github.com/roger-protocol/roger-specs/commit/a5b1bbb355203ac70394a79dffe216efa92b443b))

## [0.3.0-beta.2](https://github.com/roger-protocol/roger-specs/compare/v0.3.0-beta.1...v0.3.0-beta.2) (2026-11-12)

### Features

* add response_type to /auth/oauth as per RFC 6749 section 4.2.1 ([3eb2d6e](https://github.com/roger-protocol/roger-specs/commit/3eb2d6e5d7473cd47884fe72f117eb602d9f5308))
* make state optional in /auth/oauth as per RFC 6749 Section 4.1.1 ([d43e3ce](https://github.com/roger-protocol/roger-specs/commit/d43e3ce87a2e79ef97d7bc15f5e08648049f14db))

### Bug Fixes

* change authentication routes body content type from json to ([95838bb](https://github.com/roger-protocol/roger-specs/commit/95838bbe3212052445a46478a110e838635d14fb))
* remove unions when using x-www-form-urlencoded ([aa57ca6](https://github.com/roger-protocol/roger-specs/commit/aa57ca659e3d06a7faf4851936abfc06a01f5565))

## [0.3.0-beta.1](https://github.com/roger-protocol/roger-specs/compare/v0.3.0-beta.0...v0.3.0-beta.1) (2026-11-09)

### Features

* add error codes to the /auth/oauth route ([fb727a3](https://github.com/roger-protocol/roger-specs/commit/fb727a3b023d2db5d937c70a9796293d62663425))
* require the token endpoint to return a refresh_token ([f7f961d](https://github.com/roger-protocol/roger-specs/commit/f7f961d64ad1a3c447ce0c9eedd2d21de60998ba))

## [0.3.0-beta.0](https://github.com/roger-protocol/roger-specs/compare/v0.2.2...v0.3.0-beta.0) (2026-11-08)

### Features

* make error_description optional ([0a8dfe8](https://github.com/roger-protocol/roger-specs/commit/0a8dfe80de363a6631450564c3138d2c83e4c770))
* make every union schemas components ([5314ec3](https://github.com/roger-protocol/roger-specs/commit/5314ec3d386796403d6b638d09602798fddc5595))
* replace domain specific error schemas by a global error schema ([86e495f](https://github.com/roger-protocol/roger-specs/commit/86e495f3bcc32b18db9afc48d44776aa3507d384))

### Bug Fixes

* incorrect use of "in" to check if a key is in a map ([77a6b53](https://github.com/roger-protocol/roger-specs/commit/77a6b5307c96b440e953c8bcb3c58a14cd7ca4f0))

## [0.2.2](https://github.com/roger-protocol/roger-specs/compare/v0.2.1...v0.2.2) (2026-10-12)

### Bug Fixes

* supportedStorageKinds in the storage config schema was defined as ([71918de](https://github.com/roger-protocol/roger-specs/commit/71918de5043510efd073bc91c4909b28a63d4325))

## [0.2.1](https://github.com/roger-protocol/roger-specs/compare/v0.1.0...v0.2.1) (2026-10-12)

### Features

* add an operationId to each route for better code generation ([3d3af43](https://github.com/roger-protocol/roger-specs/commit/3d3af439f4d71aa3153f982bc390625a48933e63))
* fix typos in the project config schema ([948dfe6](https://github.com/roger-protocol/roger-specs/commit/948dfe6012f248fff701735c79fa98b122d7d83a))
* unify the features schema ([bbb55d1](https://github.com/roger-protocol/roger-specs/commit/bbb55d131739d980d37d9bea8d23185fcaf3321a))

## [0.2.1-beta.0](https://github.com/roger-protocol/roger-specs/compare/v0.1.0...v0.2.1-beta.0) (2026-10-12)

### Features

* add an operationId to each route for better code generation ([3966aea](https://github.com/roger-protocol/roger-specs/commit/3966aeab5c68ad037174b1df7897566513e02bd0))
* fix typos in the project config schema ([397b9c7](https://github.com/roger-protocol/roger-specs/commit/397b9c76541ea147d11945f31fb3703782570473))
* unify the features schema ([84deb89](https://github.com/roger-protocol/roger-specs/commit/84deb893350212fcac156acad1692876bb4f630d))

## [0.1.0](https://github.com/roger-protocol/roger-specs/compare/v0.1.0-beta.0...v0.1.0) (2026-10-06)

### Reverts

* Revert "V0.1 Release" (#20) ([68cf167](https://github.com/roger-protocol/roger-specs/commit/68cf1679f56cab797768b2b0c68266590804888c)), closes [#20](https://github.com/roger-protocol/roger-specs/issues/20)

## 0.1.0-beta.0 (2026-10-04)

### Features

* add "kind" field to projects (will add support for plugin in the ([be5bb9e](https://github.com/roger-protocol/roger-specs/commit/be5bb9eac46198c1ae35af01ca24de3f8c530bdb))
* add path aliases support ([7afb3fd](https://github.com/roger-protocol/roger-specs/commit/7afb3fd259b6b3066ab3c7e91615e0b2ad5822c4))
* add route tagging utility for openapi generation ([#9](https://github.com/roger-protocol/roger-specs/issues/9)) ([94de18f](https://github.com/roger-protocol/roger-specs/commit/94de18f31fc6981fb938e09a1e8fd25c3de05a71))
* add versioning entry to the manifest schema ([ced6e37](https://github.com/roger-protocol/roger-specs/commit/ced6e372704dc12550edd6826c9bc10cb9d95852))
* added ESLint ([f39e61b](https://github.com/roger-protocol/roger-specs/commit/f39e61bfb1e581153e6cb9ce2275b11372e78414))
* create the /features route ([d7a3469](https://github.com/roger-protocol/roger-specs/commit/d7a34693441c92f2216a70b7c9dde7c60ae04ae7))
* create the manifest file schema ([ed5e940](https://github.com/roger-protocol/roger-specs/commit/ed5e940fc9945b36dbc5782558249c159b06cc2b))
* create the projects configuration schema ([8bf9f27](https://github.com/roger-protocol/roger-specs/commit/8bf9f27710196bf690e300149c1cb26787664264))
* create the version route ([9feadbb](https://github.com/roger-protocol/roger-specs/commit/9feadbb1efa73695af96904173e40f53532ac774))
* created issues/pr templates ([1d7a3e9](https://github.com/roger-protocol/roger-specs/commit/1d7a3e9e219975b3ab333f5586c0f047a93228a1))
* implement artifact checking ([12b6832](https://github.com/roger-protocol/roger-specs/commit/12b6832e7ff5219e8f145b5c8756d973f8e7c3b2))
* implement credentials ([d5dd945](https://github.com/roger-protocol/roger-specs/commit/d5dd94563973c6623a281da5d75945ef5c50f94b))
* implement deployments ([ffc0365](https://github.com/roger-protocol/roger-specs/commit/ffc03652b4205606ff159d396e70a4566052adbf))
* implement environments ([053262e](https://github.com/roger-protocol/roger-specs/commit/053262e7b6a2bae39e521a766a9e4cb00f6b5f5f))
* implement OAuth2 PKCE and Session Management ([21eec74](https://github.com/roger-protocol/roger-specs/commit/21eec744440b329a7f5b3610118a6f0867c9deae))
* implement storage ([3d72636](https://github.com/roger-protocol/roger-specs/commit/3d72636eb6e44b6d87b00a0e21a56cd4ed7814f0))
* implement targets ([73768d5](https://github.com/roger-protocol/roger-specs/commit/73768d50bdb1006dfb17d14a2bdb34d3b9c7d8ec))
* initial commit ([1f147c1](https://github.com/roger-protocol/roger-specs/commit/1f147c1fd6e92b5a7c79f75e82f6d0d579a3b69f))
* introduce project routes ([a54a187](https://github.com/roger-protocol/roger-specs/commit/a54a1870e3934094c79bd6a7e49a8afbc9d05513))
* introduce standardized errors schemas ([da6fc4c](https://github.com/roger-protocol/roger-specs/commit/da6fc4c66d5a971bd2e3dc3aed9d126ff4ef8f0b))
* removed the release cycle section from README ([158993a](https://github.com/roger-protocol/roger-specs/commit/158993a8a4c32b4b706cf6b4fd2ec0b6f6fc4688))

### Bug Fixes

* **ci:** Login to NPM before running release-it ([9cbb7bb](https://github.com/roger-protocol/roger-specs/commit/9cbb7bb538cb83f00b179c8c2f2bbb7f0e36fd0f))
* ignore dist and node_modules in eslint ([ec456e3](https://github.com/roger-protocol/roger-specs/commit/ec456e3d8596b777baf8ffe73d264160cd577d89))
* migrate from NodeNext to ESNext/Bundler to allow extensionless ([f1ab025](https://github.com/roger-protocol/roger-specs/commit/f1ab025ec80f20dfc9af09022853549bdb97185f))
* **release:** create the build command ([e7a472d](https://github.com/roger-protocol/roger-specs/commit/e7a472d4e21b2ecd67b42ad702fd01bcf6e5740b))
