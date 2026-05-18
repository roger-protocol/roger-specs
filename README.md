# The Roger Protocol Specifications

This repository contains the Roger Protocol Specifications.

We are open to contributions. See [CONTRIBUTING.md](./CONTRIBUTING.md) or more details.

---

## 1. Project Structure
The Roger Protocol Specifications repository uses the following folder structure:

* `/docs`: Documentation files that will be parsed by [Fumadocs](fumadocs.dev). This folder uses the [Fumadocs Page Tree](https://www.fumadocs.dev/docs/page-conventions) structure, and uses the [.mdx format](https://www.fumadocs.dev/docs/markdown) to write documentation files.

* `/src`:  this contains the official protocol definitions written as type-safe Zod schemas.
  * `/src/shared`: the shared folder contains all constants and logic that can be safely shared accross core and features domains.
  * `/src/core`: the core folder contains all of the non-optional, independent, features that all specification consumers must implement.
  * `/src/features`: the features folder contains all of the optional features that the specification consumer may implement. *Note: TypeScript files must be located under domain folders inside of /src/features (e.g. /src/features/my-feature/index.ts)*

## 2. Installation & Usage
The Roger Protocol Specifications package is available on npm under the Apache-2.0 license. The npm package includes an `openapi.json` file, which can also be found in the asset section of any GitHub release.

### 2.1. JavaScript / TypeScript Setup
To use the Roger Protocol Specifications package inside of your JS/TS project, ensure you have [Node.js](https://nodejs.org/en/download) installed and run the following command:
```bash
npm i @roger-protocol/specs
```
Then, import Zod schemas in your JS/TS files
```ts
import { loginBodySchema } from "@roger-protocol/specs/auth"
import { coolFeatureBodySchema } from "@roger-protocol/specs/feature"
```

### 2.2. Non-JavaScript Ecosystems (Go, Rust, Luau, ...)
If you are implementing the Roger Protocol in another programming language than JavaScript/TypeScript, you can use the compiled `openapi.json` to generate type-safe clients with tools like [openapi-generator](https://github.com/OpenAPITools/openapi-generator).

The `openapi.json` file can be found in multiple locations:
* **Locally via npm:** Located under `../node_modules/@roger-protocol/specs/dist/openapi.json` after install
* **Directly in GitHub:** Attached as a static asset under the GitHub Release of your choice

## 3. Release Cycle
The Roger Protocol does not follow a strict release schedule. Instead, features and bug fixes pile up in their dedicated minor version branches until they are tested and a new version is released. There are two distinct release workflows:

### 3.1. Minor/Major Releases (`vX.0.0`/`vX.Y.0`)
Minor and Major release s contain new features, upgrades, or breaking changes. They undergo a strict staging phase:

* **Release Candidate (-rc):** Once a development branch is completed (e.g. `v1.2`), a staging branch named `release/v1.2.0-rc` is created and pushed to the NPM registry under a pre-release tag (e.g `v.1.2.0-rc.0`)
* **Community Testing:** Developers using the Roger Protocol can then use the `-rc` npm package version to implement the new features and report bugs before the full release
* **Production Promotion:** Once the release candidate is tested and approved, the `-rc` branch is merged into `main` automatically triggering the production launch

### 3.2. Patch Releases (`vX.Y.Z`)
Once a release candidate is merged into main, its corresponding development branch will not accept any other changes other than patches. Patches contain bug fixes, security fixes or various changes that do not introduce new features or breaking changes. They ignore the release candidate cycle:

* **Critical Patches (High Priority):** When an issue is marked as critical, it is given a milestone and reviewed in priority so they reach the development branch faster. Once a critical patch is tested and merged into the development branch, maintainers will immediately open a PR to merge the patch into `main`
* **Batched Patches (Normal Priority)**: Low severity patches are merged into the development branch where they accumulate with other patches. They are then merged to main on a regular basis to keep the package up to date
