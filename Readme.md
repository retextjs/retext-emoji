# retext-emoji [![Build Status](https://img.shields.io/travis/wooorm/retext-emoji.svg?style=flat)](https://travis-ci.org/wooorm/retext-emoji) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-emoji.svg?style=flat)](https://coveralls.io/r/wooorm/retext-emoji?branch=master)

Emoji and emoticons for **[retext](https://github.com/wooorm/retext)**.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
$ npm install retext-emoji
```

[Component.js](https://github.com/componentjs/component):

```bash
$ component install wooorm/retext-emoji
```

[Bower](http://bower.io/#install-packages):

```bash
$ bower install retext-emoji
```

[Duo](http://duojs.org/#getting-started):

```javascript
var emoji = require('wooorm/retext-emoji');
```

## Usage & API

### emoji

```javascript
var Retext = require('retext');
var inspect = require('retext-inspect');
var emoji = require('retext-emoji');

var retext = new Retext().use(inspect).use(emoji, {
    'convert': 'encode'
});

retext.parse('I’m going to bed. :zzz:', function (err, tree) {
    console.log(tree.toString()); // 'I’m going to bed. 💤'

    console.log(tree.head.head);
    /*
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
     *   └─ EmoticonNode: '💤' [data={"names":["zzz"],"description":"sleeping symbol","tags":["sleeping"]}]
     */
});
```

Parameters:

- `options` (`Object` or `null`)
- `options.convert` (`"encode"` or `"decode"`, or `null`):
  - When `encode`, converts short-codes into their unicode equivalent (e.g., `:heart:` and `<3` to `❤️`);
  - When `decode`, converts unicode emoji into their short-code equivalent (e.g., `❤️` and `<3` to `:heart:`);
  - When `null`, applies no conversion.

### EmoticonNode

All emoticons, whether emoji (`❤️`), emoticons (`<3`), or gemoji (`:heart:`), are classified as `EmoticonNode`s. `EmoticonNode` subclasses `SymbolNode`.

#### [EmoticonNode](#emoticonnode)#toEmoji()

> **Note that this method has no effect if you’ve specified a `convert` option.**

```javascript
var node = new TextOM.EmoticonNode(':heart:');
console.log(node); // EmoticonNode: ':heart:'

node.toEmoji();
console.log(node); // EmoticonNode: '❤️'

node.fromString('<3').toEmoji(); // EmoticonNode: '❤️'
```

Transforms a gemoji/emoticon into an emoji.

#### [EmoticonNode](#emoticonnode)#toGemoji()

> **Note that this method has no effect if you’ve specified a `convert` option.**

```javascript
var node = new TextOM.EmoticonNode('❤️');
console.log(node); // EmoticonNode: '❤️'

node.toGemoji();
console.log(node); // EmoticonNode: ':heart:'

node.fromString('<3').toGemoji();
console.log(node); // EmoticonNode: ':heart:'
```

Transforms an emoji/emoticon into a gemoji.

## Supported Gemoji

**retext-emoji** supports every  [wooorm/gemoji](https://github.com/wooorm/gemoji/#supported-gemoji) and every [wooorm/emoticon](https://github.com/wooorm/emoticon/#supported-emoticons).

## Performance

On a MacBook Air. **retext** works just as fast on content with emoji/gemoji/emoticons, and 2% slower on content without them, when using **retext-emoji**.

```text
           retext w/o retext-emoji
  184 op/s » A paragraph (5 sentences, 100 words, 10 emojis)
  238 op/s » A paragraph (5 sentences, 100 words, no emojis)

           retext w/ retext-emoji
  183 op/s » A paragraph (5 sentences, 100 words, 10 emojis)
  232 op/s » A paragraph (5 sentences, 100 words, no emojis)
```

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
