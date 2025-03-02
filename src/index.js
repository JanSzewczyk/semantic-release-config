/**
 * Function to get the semantic-release configuration.
 * @param {Object} configurationOptions The configuration options.
 * @param {Object} configurationOptions.features The configurable features.
 * @param {boolean} [configurationOptions.features.npmPublish=false] NPM publish flag.
 * @param {boolean} [configurationOptions.features.mdx=false] MDX CHANGELOG flag.
 * @returns {import('semantic-release').Options}
 */
export function getConfig({ features: { npmPublish = false, mdx = false } = {} } = {}) {
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
          presetConfig: {
            types: [
              { type: "feat", section: "Features" },
              { type: "fix", section: "Bug Fixes" },
              { type: "perf", section: "Performance Improvements" },
              { type: "revert", section: "Reverts" },
              { type: "docs", section: "Documentation" },
              { type: "chore", section: "Miscellaneous Chores" },
              { type: "refactor", section: "Code Refactoring" },
              { type: "test", section: "Tests" },
              { type: "build", section: "Build System" },
              { type: "ci", section: "Continuous Integration" },
              { type: "style", section: "Styles", hidden: true }
            ]
          }
        }
      ],
      [
        "@semantic-release/changelog",
        {
          changelogFile: `CHANGELOG.${mdx ? "mdx" : "md"}`,
          changelogTitle: `${!mdx ? "<!-- markdownlint-disable --><!-- textlint-disable -->" : ""}
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
          assets: [`CHANGELOG.${mdx ? "mdx" : "md"}`, "package.json"]
        }
      ],
      "@semantic-release/github"
    ]
  };
}
