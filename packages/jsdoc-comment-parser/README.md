# `@matthamlin/jsdoc-comment-parser`

A quick and dirty jsdoc comment parser - copied and modified from
[comment-parser](https://github.com/syavorsky/comment-parser).

## API

```js
import commentParser from '@matthamlin/jsdoc-comment-parser'

let data = commentParser(`/*
* @param {number} foo Something
*/`)
```
