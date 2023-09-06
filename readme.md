# retext-emoji

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[retext][]** plugin to support emoji (`❤️`), gemoji (`:heart:`), and
emoticons (`<3`).

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(retextEmoji[, options])`](#unifieduseretextemoji-options)
*   [Data](#data)
*   [Syntax tree](#syntax-tree)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([retext][]) plugin to classify emoji (`❤️`),
gemoji (`:heart:`), and emoticons (`<3`) as a specific node, and to optionally
transform them from one type to another.

## When should I use this?

You can either use this plugin any time there are emoji, gemoji, or emoticons
in prose that are (incorrectly) warned about by linting plugins, or you can
use it to transform them.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, 16.0+, or 18.0+), install with [npm][]:

```sh
npm install retext-emoji
```

In Deno with [`esm.sh`][esmsh]:

```js
import retextEmoji from 'https://esm.sh/retext-emoji@8'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import retextEmoji from 'https://esm.sh/retext-emoji@8?bundle'
</script>
```

## Use

```js
import retext from 'retext'
import emoji from 'retext-emoji'

const file = await retext()
  .use(emoji, {convert: 'encode'})
  .process('I’m going to bed. :zzz:')

console.log(String(file))
```

Yields:

```txt
I’m going to bed. 💤
```

## API

This package exports no identifiers.
The default export is `retextEmoji`.

### `unified().use(retextEmoji[, options])`

Support emoji (`❤️`), gemoji (`:heart:`), and emoticons (`<3`).

##### `options`

Configuration (optional).

###### `options.convert`

If, and *how* to convert (`'encode'` or `'decode'`, optional).

When `encode` is given, converts gemoji and emoticons to their unicode
equivalent (`:heart:` and `<3` to `❤️`).

When `decode` is given, converts unicode emoji and emoticons to their gemoji
equivalent (`❤️` and `<3` to `:heart:`).

## Data

`retext-emoji` supports every [`gemoji`][gemoji] and every
[`emoticon`][emoticon].

## Syntax tree

This plugin applies several nlcst utilities to build the AST.
See their readmes for the node types supported in the tree:

*   [`nlcst-emoticon-modifier`](https://github.com/syntax-tree/nlcst-emoticon-modifier#ast)
    — emoticons
*   [`nlcst-emoji-modifier`](https://github.com/syntax-tree/nlcst-emoji-modifier)
    — emoji and gemoji

## Types

This package is fully typed with [TypeScript][].
It exports the additional type `Options`.

It also registers the node types with `@types/nlcst`.
If you’re working with the syntax tree, make sure to import this plugin
somewhere in your types, as that registers the new node types in the tree.

```js
/**
 * @typedef {import('retext-emoji')}
 */

import {visit} from 'unist-util-visit'

/** @type {import('nlcst').Root} */
const tree = getNlcstNodeSomeHow()

visit(tree, function (node) {
  // `node` can now be `Emoticon`.
})
```

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, 16.0+, and 18.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/retextjs/retext-emoji/workflows/main/badge.svg

[build]: https://github.com/retextjs/retext-emoji/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-emoji.svg

[coverage]: https://codecov.io/github/retextjs/retext-emoji

[downloads-badge]: https://img.shields.io/npm/dm/retext-emoji.svg

[downloads]: https://www.npmjs.com/package/retext-emoji

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-emoji.svg

[size]: https://bundlephobia.com/result?p=retext-emoji

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/retextjs/retext/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/main/contributing.md

[support]: https://github.com/retextjs/.github/blob/main/support.md

[coc]: https://github.com/retextjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[retext]: https://github.com/retextjs/retext

[gemoji]: https://github.com/wooorm/gemoji/blob/main/support.md

[emoticon]: https://github.com/wooorm/emoticon/blob/main/support.md
