# retext-emoji

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**retext**][retext] plugin to support emoji, gemoji, and emoticons.

## Install

[npm][]:

```sh
npm install retext-emoji
```

## Use

```js
var retext = require('retext')
var emoji = require('retext-emoji')

var file = retext()
  .use(emoji, {convert: 'encode'})
  .processSync('I’m going to bed. :zzz:')

console.log(String(file))
```

Yields:

```txt
I’m going to bed. 💤
```

## API

### `retext().use(emoji[, options])`

Support emoji, gemoji, and emoticons.

###### `options.convert`

If, and *how* to convert (`'encode'` or `'decode'`, optional).

When `encode` is given, converts short-codes and emoticons to their unicode
equivalent (`:heart:` and `<3` to `❤️`).

When `decode` is given, converts unicode emoji and emoticons to their short-code
equivalent (`❤️` and `<3` to `:heart:`).

### `EmoticonNode`

`retext-emoji` adds a new node to [**nlcst**][nlcst]:
**Emoticon** ([**Literal**][literal]).

Whether emoji (`❤️`), emoticon (`<3`), or gemoji (`:heart:`), all are classified
as `EmoticonNode`s.

```idl
interface Emoticon < Symbol {
  type: "EmoticonNode"
  data: EmoticonData
}

interface EmoticonData {
  emoji: string
  names: [string]
  description: string?
  tags: [string]
}
```

## Support

`retext-emoji` supports every [`gemoji`][gemoji] and every
[`emoticon`][emoticon].

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext-emoji.svg

[build]: https://travis-ci.org/retextjs/retext-emoji

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-emoji.svg

[coverage]: https://codecov.io/github/retextjs/retext-emoji

[downloads-badge]: https://img.shields.io/npm/dm/retext-emoji.svg

[downloads]: https://www.npmjs.com/package/retext-emoji

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-emoji.svg

[size]: https://bundlephobia.com/result?p=retext-emoji

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/master/contributing.md

[support]: https://github.com/retextjs/.github/blob/master/support.md

[coc]: https://github.com/retextjs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[nlcst]: https://github.com/syntax-tree/nlcst

[literal]: https://github.com/syntax-tree/nlcst#literal

[gemoji]: https://github.com/wooorm/gemoji/blob/master/support.md

[emoticon]: https://github.com/wooorm/emoticon/blob/master/support.md
