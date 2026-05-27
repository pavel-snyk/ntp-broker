/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: "main",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    // simulate pkg binary generation
    [
      "@semantic-release/exec",
      {"prepareCmd": "npm run build && echo 'random-bytes-and-bits' > ntp-broker-linux"}
    ],
    // generate sboms
    [
      "@semantic-release/exec",
      {"prepareCmd": "mkdir -p sboms && npx snyk sbom --format spdx2.3+json > sboms/ntp-broker.sbom.spdx.json"}
    ],
    ['@semantic-release/npm', {npmPublish: false}],
    ['@semantic-release/exec', {publishCmd: 'npm publish'}],
    [
      "@semantic-release/github",
      {
        "assets": [
          {
            "path": "ntp-broker-linux",
            "name": "ntp-broker-linux",
            "label": "ntp-broker-linux"
          },
          {
            "path": "sboms/ntp-broker.sbom.spdx.json",
            "name": "ntp-broker.sbom.spdx.json",
            "label": "ntp-broker.sbom.spdx.json"
          }
        ]
      }
    ]
  ]
};
