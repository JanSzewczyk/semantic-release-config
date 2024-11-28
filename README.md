# @szum-tech/semantic-release-preset

![GitHub release (latest by date)](https://img.shields.io/github/v/release/JanSzewczyk/semantic-release-preset)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/JanSzewczyk/semantic-release-preset)](https://github.com/JanSzewczyk/semantic-release-preset/pulls)
[![GitHub issues](https://img.shields.io/github/issues/JanSzewczyk/semantic-release-preset)](https://github.com/JanSzewczyk/semantic-release-preset/issues)
![GitHub Repo stars](https://img.shields.io/github/stars/JanSzewczyk/semantic-release-preset?style=social)

[![released](https://github.com/JanSzewczyk/semantic-release-preset/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/JanSzewczyk/semantic-release-preset/actions/workflows/publish.yml)

[![npm](https://img.shields.io/npm/v/@szum-tech/semantic-release-preset)](https://www.npmjs.com/package/@szum-tech/semantic-release-preset)
![npm](https://img.shields.io/npm/dm/@szum-tech/semantic-release-preset)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JanSzewczyk/semantic-release-preset/blob/main/LICENSE)

---

Semantic-release shareable configuration to publish GitHub projects using GitHub Actions workflows.

# Features

- Uses [Conventional Commits](https://www.conventionalcommits.org/) to generate
  [release notes](https://github.com/semantic-release/release-notes-generator),
  [changelogs](https://github.com/semantic-release/changelog) and
  [determine the version for new releases](https://github.com/semantic-release/commit-analyzer).
- [Creates or updates a CHANGELOG.md file](https://github.com/semantic-release/changelog).
- [Publishes to npm (optional)](https://github.com/semantic-release/npm).
- [Creates a new release on GitHub](https://github.com/semantic-release/github)
- [Updates GitHub issues and PRs that are resolved by a new release](https://github.com/semantic-release/github#successcomment).
- [Commits and pushes the current `version` to `package.json`](https://github.com/semantic-release/git).

# Usage

## Installation

[@szum-tech/semantic-release-preset](https://www.npmjs.com/package/@szum-tech/semantic-release-preset) is available as
an [npm package](https://www.npmjs.com/package/@szum-tech/semantic-release-preset).

**npm:**

```sh
npm install -D @szum-tech/semantic-release-preset semantic-release @types/semantic-release
```

**yarn:**

```sh
yarn add -D @szum-tech/semantic-release-preset semantic-release @types/semantic-release
```

## Setup release configuration file

First create `release.config.js` file in main project root and add configuration:

```js
/** @type {import('semantic-release').Options} */
module.exports = {
  branches: ["main"],
  extends: "@szum-tech/semantic-release-preset"
  // OR
  // if you don't want to publish your project on npm, please use:
  // extends: "@szum-tech/semantic-release-preset/without-npm"
};
```

The `branches` array is [mandatory](https://semantic-release.gitbook.io/semantic-release/usage/configuration#branches),
and in most repositories you should put the default git branch here (`main`, or `master` if it's an older repository).

## Environment Variables Configuration

Ensure that your CI configuration has the following environment variables set:

- GITHUB_TOKEN:
  [A GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- NPM_TOKEN: [A npm personal access token](https://www.npmjs.com/package/settings) (**optional** if you don't publish
  your project on npm)

## Minimal GitHub Release workflow

This is the bare minimum required steps to trigger a new release. This will push a new release every time an eligible
commit is pushed to git. Check the opinionated flow to see how to trigger releases manually. Create
`.github/workflows/publish.yml`:

```yaml
name: Publish 🚀

on:
  push:
    branches: [main]

jobs:
  publish:
    name: Publish 🚀
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        node-version: [18.x]
        os: [ubuntu-latest]

    steps:
      - name: Checkout code 📚
        uses: actions/checkout@v3

      - name: Set up Node 🟢
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install packages ⚙️
        run: npm ci
      #        run: yarn install --frozen-lockfile

      - name: Publish package 🚀
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }} # OPTIONAL if you don't publish your project on npm
        run: npx semantic-release
#        run: yarn semantic-release
```

# Changelog

The [changelog](https://github.com/JanSzewczyk/semantic-release-preset/blob/main/CHANGELOG.md) is regularly updated to
reflect what's changed in each new release.

# License

This project is licensed under the terms of the
[MIT license](https://github.com/JanSzewczyk/semantic-release-preset/blob/main/LICENSE).
