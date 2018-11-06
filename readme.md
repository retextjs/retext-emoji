# retext-emoji [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Downloads][downloads-badge]][downloads] [![Chat][chat-badge]][chat]

Emoji, gemoji, and emoticons in [**retext**][retext].

## Installation

[npm][]:

```bash
npm install retext-emoji
```

## Usage

```javascript
var retext = require('retext');
var emoji = require('retext-emoji');

var file = retext()
  .use(emoji, {convert: 'encode'})
  .processSync('I’m going to bed. :zzz:');

console.log(String(file));
```

Yields:

```text
I’m going to bed. 💤
```

## API

### `retext().use(emoji[, options])`

Emoji, gemoji, and emoticons in [**retext**][retext].

##### `options`

Optional configuration.

###### `options.convert`

How to convert (`'encode'` or `'decode'`, optional).

When `encode`, converts short-codes and emoticons to their unicode equivalent
(`:heart:` and `<3` to `❤️`).

When `decode`, converts unicode emoji and emoticons to their short-code
equivalent (`❤️` and `<3` to `:heart:`).

### `EmoticonNode`

`retext-emoji` adds a new node to [NLCST][]: `Emoticon` ([Symbol][]).

Whether emoji (`❤️`), emoticon (`<3`), or gemoji (`:heart:`), all are
classified as `EmoticonNode`s.

```idl
interface Emoticon < Symbol {
  type: "EmoticonNode";
  data: EmoticonData;
}

interface EmoticonData {
  names: [string];
  description: string | null;
  tags: [string];
}
```

## Support

`retext-emoji` supports every [`gemoji`][gemoji] and every
[`emoticon`][emoticon].

## Contribute

See [`contributing.md` in `retextjs/retext`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext-emoji.svg

[build]: https://travis-ci.org/retextjs/retext-emoji

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-emoji.svg

[coverage]: https://codecov.io/github/retextjs/retext-emoji

[downloads-badge]: https://img.shields.io/npm/dm/retext-emoji.svg

[downloads]: https://www.npmjs.com/package/retext-emoji

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[nlcst]: https://github.com/syntax-tree/nlcst

[symbol]: https://github.com/syntax-tree/nlcst#symbol

[gemoji]: https://github.com/wooorm/gemoji/#supported-gemoji

[emoticon]: https://github.com/wooorm/emoticon/#supported-emoticon

[contributing]: https://github.com/retextjs/retext/blob/master/contributing.md

[coc]: https://github.com/retextjs/retext/blob/master/code-of-conduct.md
