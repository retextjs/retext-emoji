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
    *   [`Options`](#options)
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
In Node.js (version 16+), install with [npm][]:

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
The default export is [`retextEmoji`][api-retext-emoji].

### `unified().use(retextEmoji[, options])`

Plugin to support emoji (`❤️`), gemoji (`:heart:`), and emoticons (`<3`).

###### Parameters

*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Transform ([`Transformer`][unified-transformer]).

### `Options`

Configuration (TypeScript type).

###### Fields

*   `convert` (`'encode'` or `'decode'`, optional)
    — whether to decode (`❤️` and `<3` to `:heart:`), encode (`:heart:` and
    `<3` to `❤️`), or do nothing

## Data

`retext-emoji` supports every [`emoticon`][emoticon] and [`gemoji`][gemoji].

## Syntax tree

This plugin applies several nlcst utilities to build the AST.
See their readmes for the node types supported in the tree:

*   [`nlcst-emoticon-modifier`][nlcst-emoticon-modifier]
    — emoticons
*   [`nlcst-emoji-modifier`][nlcst-emoji-modifier]
    — emoji and gemoji

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

The `Emoticon` node is exposed from
[`nlcst-emoticon-modifier`][nlcst-emoticon-modifier].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `retext-emoji@^9`,
compatible with Node.js 16.

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

[size-badge]: https://img.shields.io/bundlejs/size/retext-emoji

[size]: https://bundlejs.com/?q=retext-emoji

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

[emoticon]: https://github.com/wooorm/emoticon/blob/main/support.md

[gemoji]: https://github.com/wooorm/gemoji/blob/main/support.md

[nlcst-emoticon-modifier]: https://github.com/syntax-tree/nlcst-emoticon-modifier

[nlcst-emoji-modifier]: https://github.com/syntax-tree/nlcst-emoji-modifier

[retext]: https://github.com/retextjs/retext

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[api-retext-emoji]: #unifieduseretextemoji-options

[api-options]: #options
