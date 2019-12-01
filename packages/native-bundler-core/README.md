# Native Bundler

This is an attempt at making a javascript-based asset bundler that follows the following constraints/features:

1. Imports must be from absolute locations (`import React from 'https://unpkg.com/react@16.4.2/umd/react.production.min.js';`) or relative assets (i.e. no node_modules)
2. Support for imports of non-JS assets

- CSS ✅
- MDX ✅
- JS ✅
- HTML
- SVG
- TXT
- MD
- More?

3. Support static builds

Maybe more as well, but those are the ones I want to start with.

## TODO:

- [ ] Test Runner

  - [ ] support file diffs

- [ ] Bundler
  - [x] Asset Downloader
  - [x] Determine import query param structure
  - [x] Actual bundling assets
  - [ ] Fix asset ID generation logic
  - [ ] Plugin Architecture
