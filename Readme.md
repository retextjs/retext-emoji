# retext-emoji [![Build Status](https://travis-ci.org/wooorm/retext-emoji.png)](https://travis-ci.org/wooorm/retext-emoji)

**[retext](https://github.com/wooorm/retext "Retext")** encoding of gemoji short-codes to unicode, and decoding from unicode to short-code.

## Installation

```sh
$ npm install retext-emoji
```

## Usage & API

### emoji(options?)

```js
var Retext = require('retext'),
    emoji = require('retext-emoji');

var text = new Retext()
    .use(emoji({
        'convert' : 'encode'
    }))
    .parse('It’s raining :cat:s and :dog:s!')
    .toString(); // 'It’s raining 🐱s and 🐶s!'
```

- `options` (`Object`)
- `options.convert` (`encode` or `decode`):
  - When `encode`, converts short-codes into their unicode equivalent (e.g., `:pig:` to `🐷`);
  - When `decode`, converts unicode emojis into their short-code equivalent (e.g., `🐷` to `:pig:`);

## License

  MIT
