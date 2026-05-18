# Roger Protocol Contribution Guide
> *Note: The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).*

Thank you for helping build the Roger Protocol! Before continuing, please make sure your are familiar with our project structure which can be found under Section 1 of [README.md](./README.md). To maintain stability and a clean environment, you MUST follow the described contribution workflow.

---

## 1. Issues, Versioning & Branching Conventions
To guarantee clarity, this project follows a milestone-driven release cycle using [Semantic Versioning](https://semver.org/) (SemVer 2.0).

We organize development by **Minor Version Branches** (e.g. `v1.1`, `v1.2`, ..., `v2.13`).

### 1.1. Milestone Assignment
When you open a GitHub issue, a maintainer will read your change proposal and assign a GitHub milestone to your issue usually as following:
* **Bug / Patch**: Current version branch
* **New Feature / Backward Compatible Changes**: Next minor version branch (e.g. `v1.1 -> v1.2`) 
* **Breaking Changes**: Next major version branch (e.g. `v1.1 -> v2.0`)

### 1.2. How to target your PR
We do not directly develop on the `main` branch. You MUST target your Pull Request from your personal fork to the minor branch matching your assigned milestone.

* **Milestone v1.1.2** -> Target your PR to the `v1.1` branch
* **Milestone v1.2.5** -> Target your PR to the `v1.2` branch

 #### What if the target minor branch isnt on GitHub yet?
If the branch matching your assigned milestone wasn't created yet, don't wait to start coding! 

1. Create your local branch from the closest version behind it (e.g. if your milestone is `v1.4.0` but the `v1.4` branch doesnt exist, branch locally from `v1.3`). 
2. Once you are ready to open your Pull Request, ask a maintainer in your GitHub issue to create the branch matching your assigned milestone. 
3. IMPORTANT: Once the maintainer creates the official target branch on GitHub, you MUST run the following command on your local machine before creating the PR: 
```bash 
git fetch upstream
git rebase upstream/<your-target-branch>
``` 
This ensure your code is up-to-date with the latest updates.

### 1.3. Branch Naming Convention
When working on your issue, you must name your branches using the following syntax: `type/version/short-description`.

* **Features:** `feat/v1.3/cool-feature`
* **Bug Fixes:** `fix/v1.3.1/api-timeout`
* **Documentation:** `docs/v1.3.2/fancy-icons`
* **Breaking Changes:** `feat!/v2.0/auth-change`

## 2. Architectural Guidelines

### 2.1. Import Boundaries
To prevent circular dependencies and keep the protocol modular, strict import boundaries are enforced:
  * **Core Features**: Features under the `/src/core` folder MUST NOT import any modules or logic in `/src/features`
  * **Features Decoupling**: To keep each feature implementation independent, features under the `/src/features` folder MUST NOT import modules or logic outside their domain

### 2.2. Pull Request Contents
Before making a Pull Request, ensure your changes are compliant with the following points:
  * **Documentation:** If you are modifying/creating/deleting a feature or making a major change, you MUST create the necessary documentation in /docs (refer to the /docs bullet point under Section 1 in [README.md](./README.md))

  * **Domain Creation:** If your changes introduce a completely new feature domain, you MUST connect it to our building pipeline using the following workflow (using a hypotetical new `billing` feature):
    * **Create the Domain Entrypoint:** Export all of your schemas cleanly via an `index.ts` file inside of your feature domain. (E.g. Create `index.ts` inside of `src/features/billing`, and export all of your files: `export * from ./file1; export * from ./file2`)
    * **Register the Domain in the Bundler:** Before being packaged, all TypeScript files are compild into production JavaScript and type definitions (`*.d.ts`) inside the `/dist` folder using `tsup`. Therefore, you must register your newly created domain entrypoint in the `tsup.config.ts` file as following:
    ```typescript
      entry: {
        core: "src/core/index.ts"
        billing: "src/features/billing/index.ts" // <-- Add your domain entrypoint like so
      }
    ```
    * **Expose to the npm package:** Register your compiled files under the `exports` map inside of the [package.json](./package.json) file as shown bellow so developers can use clean paths like `@roger-protocol/specs/billing`
    ```typescript
      "exports": {
        "./core": {
          "types": "./dist/core.d.ts",
          "import": "./dist/core.js",
          "require": "./dist/core.cjs"
        },
        "./billing": {
          "types": "./dist/billing.d.ts", // <-- Types must always be listed first 
          "import": "./dist/billing.js",
          "require": "./dist/billing.cjs"
        }
      }
    ```
