/**
 * Function to get the semantic-release configuration.
 * @param {Object} configurationOptions The configuration options.
 * @param {Object} configurationOptions.features The configurable features.
 * @param {boolean} [configurationOptions.features.npmPublish=false] NPM publish flag.
 * @returns {import('semantic-release').Options}
 */
export function getConfig({ features: { npmPublish = false } = {} } = {}) {
  return {
    branches: ["main"],
    plugins: [
      [
        "@semantic-release/commit-analyzer",
        {
          preset: "conventionalcommits"
        }
      ],
      [
        "@semantic-release/release-notes-generator",
        {
          preset: "conventionalcommits",
          presetConfig: {}
        }
      ],
      [
        "@semantic-release/changelog",
        {
          changelogTitle: `<!-- markdownlint-disable --><!-- textlint-disable -->
# 📓 Changelog
All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.`
        }
      ],
      ["@semantic-release/npm", { npmPublish }],
      [
        "@semantic-release/git",
        {
          message: "release: ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}",
          assets: ["CHANGELOG.md", "package.json"]
        }
      ],
      "@semantic-release/github"
    ]
  };
}
