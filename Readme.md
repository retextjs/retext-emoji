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
    inspect = require('retext-inspect'),
    emoji = require('retext-emoji'),
    retext;

retext = new Retext().use(inspect).use(emoji, {
    'convert': 'encode'
});

retext.parse('I’m going to bed. :zzz:', function (err, tree) {
    console.log(tree.toString()); // 'I’m going to bed. 💤'

    console.log(tree.head.head);
    /**
     * SentenceNode[10]
     *   ├─ WordNode[3]
     *   │  ├─ TextNode: 'I'
     *   │  ├─ PunctuationNode: '’'
     *   │  └─ TextNode: 'm'
     *   ├─ WhiteSpaceNode: ' '
     *   ├─ WordNode[1]
     *   │  └─ TextNode: 'going'
     *   ├─ WhiteSpaceNode: ' '
     *   ├─ WordNode[1]
     *   │  └─ TextNode: 'to'
     *   ├─ WhiteSpaceNode: ' '
     *   ├─ WordNode[1]
     *   │  └─ TextNode: 'bed'
     *   ├─ PunctuationNode: '.'
     *   ├─ WhiteSpaceNode: ' '
     *   └─ EmoticonNode: '💤'
     */

    console.log(tree.head.head.tail.data);
    /**
     * {
     *   names: [ 'zzz' ],
     *   description: 'sleeping symbol',
     *   tags: [ 'sleeping' ]
     * }
     */
});
```

You **may** provide an `options` object as the second argument to `Retext#use`:

- `options` (`Object`)
- `options.convert` (`"encode"` or `"decode"`, or `null`):
  - When `encode`, converts short-codes into their unicode equivalent (e.g., `:pig:` to `🐷`);
  - When `decode`, converts unicode emoji into their short-code equivalent (e.g., `🐷` to `:pig:`);
  - When `null`, applies no conversion.

### EmoticonNode

All emoticons, whether emoji (:pig:) or gemoji (`:pig:`), are classified as `EmoticonNode`s. `EmoticonNode` subclasses `SymbolNode`.

#### EmoticonNode#toEmoji()

> **Note that this method has no effect if you’ve specified a `convert` option.**

```js
var node = new TextOM.EmoticonNode(':pig:');
console.log(node); // EmoticonNode: ':pig:'

node.toEmoji();
console.log(node); // EmoticonNode: '🐷'
```

Transforms an emoticon into an emoji.

#### EmoticonNode#toGemoji()

> **Note that this method has no effect if you’ve specified a `convert` option.**

```js
var node = new TextOM.EmoticonNode('🐷');
console.log(node); // EmoticonNode: '🐷'

node.toGemoji();
console.log(node); // EmoticonNode: ':pig:'
```

Transforms an emoticon into a gemoji.

## Supported Gemoji

**retext-emoji** supports every  [wooorm/gemoji](https://github.com/wooorm/gemoji). There’s a whole list of supported gemoji at [gemoji’s repo](https://github.com/wooorm/gemoji/#supported-gemoji).

## License

MIT © Titus Wormer
