# retext-emoji [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

<!--lint disable heading-increment list-item-spacing-->

Emoji, gemoji, and emoticons in [**retext**][retext].

## Installation

[npm][npm-install]:

```bash
npm install retext-emoji
```

**retext-emoji** is also available as an AMD, CommonJS, and
globals module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var retext = require('retext');
var emoji = require('retext-emoji');
```

Process:

```javascript
var file = retext()
    .use(emoji, {convert: 'encode'})
    .process('I’m going to bed. :zzz:');
```

Yields:

```text
I’m going to bed. 💤
```

## API

### `retext().use(emoji[, options])`

Emoji, gemoji, and emoticons in [**retext**][retext].

###### `options`

*   `convert` (`'encode'` or `'decode'`, optional)
    — When `encode`, converts short-codes and emoticons to their
    unicode equivalent (`:heart:` and `<3` to `❤️`);  When `decode`,
    converts unicode emoji and emoticons to their short-code equivalent
    (`❤️` and `<3` to `:heart:`).

### `EmoticonNode`

**retext-emoji** adds a new node to [NLCST][]: `Emoticon` ([Symbol][]).

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

**retext-emoji** supports every [`wooorm/gemoji`][gemoji] and every
[`wooorm/emoticon`][emoticon].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/retext-emoji.svg

[travis]: https://travis-ci.org/wooorm/retext-emoji

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/retext-emoji.svg

[codecov]: https://codecov.io/github/wooorm/retext-emoji

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/retext-emoji/releases

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext

[nlcst]: https://github.com/wooorm/nlcst

[symbol]: https://github.com/wooorm/nlcst#symbol

[gemoji]: https://github.com/wooorm/gemoji/#supported-gemoji

[emoticon]: https://github.com/wooorm/emoticon/#supported-emoticon
