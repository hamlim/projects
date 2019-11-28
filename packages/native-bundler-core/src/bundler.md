# Bundler

The goal of this module is to delegate the process of bundling and transforming assets.

It should crawl the import tree, flag imports as different types, and correctly pass those to the transformer for that asset type.

## Asset Types

Assets are indicated by a query param on the import location.

The different type of imports are:

- js imports (work without a query string)
- svg imports, specified by `?nb=svg` at the end of the import string
- css imports, specified by `?nb=css` at the end of the import string
- html imports, specified by `?nb=html` at the end of the import string
- text imports, specified by `?nb=txt` at the end of the import string

All of these imports work with relative paths and absolute urls
