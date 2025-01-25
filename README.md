<h1 align="center">@szum-tech/semantic-release-config</h1>
<p align="center"><a href="https://semantic-release.gitbook.io/semantic-release">Semantic-release</a> shareable configuration.</p>
<br>
<div align="center" style="display: flex; flex-direction: column; gap: 1em;">
    <div style="display: flex; gap: .5em; justify-content: center">
        <a href="https://github.com/JanSzewczyk/semantic-release-config"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/JanSzewczyk/semantic-release-config"></a>
        <a href="https://github.com/JanSzewczyk/semantic-release-config/pulls"><img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/JanSzewczyk/semantic-release-config"></a>
        <a href="https://github.com/JanSzewczyk/semantic-release-config/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/JanSzewczyk/semantic-release-config"></a>
        <a href="https://github.com/JanSzewczyk/semantic-release-config"><img alt="Github stars" src="https://img.shields.io/github/stars/JanSzewczyk/semantic-release-config?style=social"></a>
    </div>
    <div style="display: flex; gap: .5em; justify-content: center">
        <a href="https://github.com/JanSzewczyk/semantic-release-config/actions/workflows/publish.yml"><img alt="Publish action" src="https://github.com/JanSzewczyk/semantic-release-config/actions/workflows/publish.yml/badge.svg?branch=main"></a>
        <a href="https://github.com/JanSzewczyk/semantic-release-config/actions/workflows/codeql.yml"><img alt="CodeQL action" src="https://github.com/JanSzewczyk/semantic-release-config/actions/workflows/codeql.yml/badge.svg"></a>
    </div>
    <div style="display: flex; gap: .5em; justify-content: center">
        <a href="https://www.npmjs.com/package/@szum-tech/semantic-release-config"><img alt="NPM version" src="https://img.shields.io/npm/v/@szum-tech/semantic-release-config"></a>
        <a href="https://www.npmjs.com/package/@szum-tech/semantic-release-config"><img alt="Downloads" src="https://img.shields.io/npm/dm/@szum-tech/semantic-release-config"></a>
    </div>
</div>
<br>
<p align="center">
    Setting up a Semantic-release configuration should be easier.
    <br/>
    <a href="https://semantic-release.gitbook.io/semantic-release">Semantic-release</a> shareable configuration to publish GitHub projects using GitHub Actions workflows.
</p>

---

## 📚 Features

- Uses [Conventional Commits](https://www.conventionalcommits.org/) to generate
  [release notes](https://github.com/semantic-release/release-notes-generator),
  [changelogs](https://github.com/semantic-release/changelog) and
  [determine the version for new releases](https://github.com/semantic-release/commit-analyzer).
- [Creates or updates a CHANGELOG.md file](https://github.com/semantic-release/changelog).
- [Publishes to npm (optional)](https://github.com/semantic-release/npm).
- [Creates a new release on GitHub](https://github.com/semantic-release/github).
- [Updates GitHub issues and PRs that are resolved by a new release](https://github.com/semantic-release/github#successcomment).
- [Commits and pushes the current `version` to `package.json`](https://github.com/semantic-release/git).
- Offers predefined configurations or configuration builder function

## 📖 Table of Contents

<!-- TOC -->
  * [📚 Features](#-features)
  * [📖 Table of Contents](#-table-of-contents)
  * [🎯 Getting Started](#-getting-started)
    * [⚙️ Installation](#-installation)
    * [Configuration](#configuration)
      * [Predefined configs](#predefined-configs)
      * [Configuration Builder](#configuration-builder)
  * [💻 Environment Variables Configuration](#-environment-variables-configuration)
  * [🚀 Minimal GitHub Release workflow](#-minimal-github-release-workflow)
  * [🛠️ Developer Info](#-developer-info)
    * [Dependencies](#dependencies)
  * [📓 Changelog](#-changelog)
  * [📜 License](#-license)
<!-- TOC -->

## 🎯 Getting Started

### ⚙️ Installation

[@szum-tech/semantic-release-config](https://www.npmjs.com/package/@szum-tech/semantic-release-config) is available as
an [npm package](https://www.npmjs.com/package/@szum-tech/semantic-release-config).

```shell
# NPM
npm install --save-dev semantic-release @szum-tech/semantic-release-config

# YARN
yarn add -D semantic-release @szum-tech/semantic-release-config

# PNPM
pnpm add --save-dev semantic-release @szum-tech/semantic-release-config

# BUN
bun add --dev semantic-release @szum-tech/semantic-release-config
```

### Configuration

Basic information needed to understand, how to set up semantic-release configuration, you are able to find under
[USAGE > Configuration](https://semantic-release.gitbook.io/semantic-release/usage/configuration) in `semantic-release`
documentation.

#### Predefined configs

- `without-npm` - `@szum-tech/semantic-release-config/without-npm` - allows you to perform the code release process,
  excluding publishing the code to npm
- `with-npm` - `@szum-tech/semantic-release-config/with-npm` - allows you to perform the code release process, including
  publishing the code to npm

**Predefined configurations could be set via either:**

- A `.releaserc` file, written in YAML or JSON, with optional extensions: `.yaml`/`.yml`/`.json`/`.js`/`.cjs`/`.mjs`
- A `release.config.(js|cjs|.mjs)` file that exports an object
- A `release` key in the project's `package.json` file

**The following examples show how to integrate predefined configuration in project:**

- Via `release.config.mjs` file:

```js
export { default } from "@szum-tech/semantic-release-config/with-npm";
// OR
// export { config } from "@szum-tech/semantic-release-config/without-npm";
// if you don't want to publish your project on npm
```

Imported configurations also could be used to extends yours:

```js
/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["master", "next"],
  extends: "@szum-tech/semantic-release-config/with-npm"
  // OR
  // extends: "@szum-tech/semantic-release-config/without-npm";
  // if you don't want to publish your project on npm
};
```

- Via `release.config.cjs` file:

```js
module.exports = require("@szum-tech/semantic-release-config/with-npm");
// OR
// module.exports = required("@szum-tech/semantic-release-config/without-npm");
// if you don't want to publish your project on npm
```

OR extend configuration

```js
/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ["master", "next"],
  extends: "@szum-tech/semantic-release-config/with-npm"
  // OR
  // extends: "@szum-tech/semantic-release-config/without-npm";
  // if you don't want to publish your project on npm
};
```

- Via `release` key in the project's `package.json` file:

```json
{
  "release": {
    "extends": "@szum-tech/semantic-release-config/with-npm"
    // OR
    //  "extends": "@szum-tech/semantic-release-config/without-npm";
    // if you don't want to publish your project on npm
  }
}
```

- Via `.releaserc` file:

```json
{
  "extends": "@szum-tech/semantic-release-config/with-npm"
  // OR
  //  "extends": "@szum-tech/semantic-release-config/without-npm";
  // if you don't want to publish your project on npm
}
```

#### Configuration Builder

`@szum-tech/semantic-release-config` also returns the `getConfig` function:

```js
// For *.mjs
import { getConfig } from "@szum-tech/semantic-release-config";

// For *.cjs
const { getConfig } = require("@szum-tech/semantic-release-config");
```

This function takes an argument `configurationOptions`, where the is located `features` variable - defining configurable
features.

**Features Table**

| Name |                Description                |  Type   | Default Value |
| :--: | :---------------------------------------: | :-----: | :-----------: |
| npm  | Defined if release will be publish on npm | Boolean |     false     |

**The following examples show how to integrate configuration builder function in project:**

- Via `release.config.mjs` file:

```js
import { getConfig } from "@szum-tech/semantic-release-config";

export default getConfig({ features: { npmPublish: true } });
```

- Via `release.config.cjs` file:

```js
const { getConfig } = require("@szum-tech/semantic-release-config");

module.exports = getConfig({ features: { npmPublish: true } });
```

## 💻 Environment Variables Configuration

Ensure that your CI configuration has the following environment variables set:

- GITHUB_TOKEN:
  [A GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- NPM_TOKEN: [A npm personal access token](https://www.npmjs.com/package/settings) (**optional** if you don't publish
  your project on npm)

## 🚀 Minimal GitHub Release workflow

This is the bare minimum required steps to trigger a new release. This will push a new release every time an eligible
commit is pushed to git. Check the opinionated flow to see how to trigger releases manually. Create
`.github/workflows/publish.yml`:

```yaml
name: Publish 🚀

on:
  push:
    branches: [main]

env:
  NODE_VERSION: 22.x

jobs:
  publish:
    name: Publish 🚀
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code 📚
        uses: actions/checkout@v4
      - name: Set up Node 🟢
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"
      - name: Install packages ⚙️
        run: npm ci
      - name: Build 🏗️
        run: npm run build
      - name: Publish package 🚀
        run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

> [!TIP]
> See also [publish.yml](https://github.com/JanSzewczyk/semantic-release-config/blob/main/.github/workflows/publish.yml) file.

## 🛠️ Developer Info

### Dependencies

![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fsemantic-release-config/%40semantic-release%2Fchangelog)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fsemantic-release-config/%40semantic-release%2Fcommit-analyzer)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fsemantic-release-config/%40semantic-release%2Fgit)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fsemantic-release-config/%40semantic-release%2Fgithub)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fsemantic-release-config/%40semantic-release%2Fnpm)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fsemantic-release-config/%40semantic-release%2Frelease-notes-generator)
![NPM (prod) Dependency Version](https://img.shields.io/npm/dependency-version/%40szum-tech%2Fsemantic-release-config/conventional-changelog-conventionalcommits)

## 📓 Changelog

The [changelog](https://github.com/JanSzewczyk/semantic-release-config/blob/main/CHANGELOG.md) is regularly updated to
reflect what's changed in each new release.

## 📜 License

This project is licensed under the terms of the
[MIT license](https://github.com/JanSzewczyk/semantic-release-config/blob/main/LICENSE).
