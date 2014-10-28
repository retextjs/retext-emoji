# retext-emoji [![Build Status](https://travis-ci.org/wooorm/retext-emoji.svg?branch=master)](https://travis-ci.org/wooorm/retext-emoji) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-emoji.svg)](https://coveralls.io/r/wooorm/retext-emoji?branch=master)

**[retext](https://github.com/wooorm/retext "Retext")** encoding of gemoji short-codes to unicode, and decoding from unicode to short-code.

## Installation

npm:
```sh
$ npm install retext-emoji
```

Component:
```sh
$ component install wooorm/retext-emoji
```

Bower:
```sh
$ bower install retext-emoji
```

## Usage & API

### emoji

```js
var Retext = require('retext'),
    emoji = require('retext-emoji'),
    retext;

retext = new Retext().use(emoji, {
    'convert': 'encode'
});

retext.parse('It’s raining :cat:s and :dog:s!', function (err, tree) {
    tree.toString(); // 'It’s raining 🐱s and 🐶s!'
});
```

You **must** provide an `options` object as the second argument to `Retext#use`:

- `options` (`Object`)
- `options.convert` (`"encode"` or `"decode"`):
  - When `encode`, converts short-codes into their unicode equivalent (e.g., `:pig:` to `🐷`);
  - When `decode`, converts unicode emoji into their short-code equivalent (e.g., `🐷` to `:pig:`);

## Supported Gemoji

**retext-emoji** supports every  [wooorm/gemoji](https://github.com/wooorm/gemoji). There’s a whole list of supported gemoji at [gemoji's repo](https://github.com/wooorm/gemoji/#supported-gemoji).

## License

MIT © Titus Wormer
