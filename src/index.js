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
              { section: "Features", type: "feat" },
              { section: "Bug Fixes", type: "fix" },
              { section: "Performance Improvements", type: "perf" },
              { section: "Reverts", type: "revert" },
              { section: "Documentation", type: "docs" },
              { section: "Miscellaneous Chores", type: "chore" },
              { section: "Code Refactoring", type: "refactor" },
              { section: "Tests", type: "test" },
              { section: "Build System", type: "build" },
              { section: "Continuous Integration", type: "ci" },
              { effect: "hidden", section: "Styles", type: "style" }
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
          assets: [`CHANGELOG.${mdx ? "mdx" : "md"}`, "package.json"],
          message: "release: ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}"
        }
      ],
      "@semantic-release/github"
    ]
  };
}
