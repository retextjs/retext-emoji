# retext-emoji [![Build Status](https://travis-ci.org/wooorm/retext-emoji.png)](https://travis-ci.org/wooorm/retext-emoji)

**[retext](https://github.com/wooorm/retext "Retext")** implementation of the textual parts of [Gemoji](https://github.com/github/gemoji "Github Emojis").

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
  - When `encode`, converts named Gemojis into their unicode equivalent (e.g., `:pig:` to `🐷`);
  - When `decode`, converts named unicode emojis into their named equivalent (e.g., `🐷` to `:pig:`);

## License

  MIT
