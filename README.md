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
