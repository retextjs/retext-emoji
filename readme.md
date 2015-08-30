# retext-emoji [![Build Status](https://img.shields.io/travis/wooorm/retext-emoji.svg)](https://travis-ci.org/wooorm/retext-emoji) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/retext-emoji.svg)](https://codecov.io/github/wooorm/retext-emoji)

Emoji, gemoji, and emoticons in [**retext**](https://github.com/wooorm/retext).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install retext-emoji
```

**retext-emoji** is also available for [bower](http://bower.io/#install-packages),
and [duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and
globals module, [uncompressed](retext-emoji.js) and [compressed](retext-emoji.min.js).

## Usage

```js
var retext = require('retext');
var emoji = require('retext-emoji');
var inspect = require('unist-util-inspect');

retext().use(emoji).use(function () {
    return function (node) {
        console.log(inspect(node));
    }
}).process('I’m going to bed. :zzz:');
```

Yields:

```text
RootNode[1]
└─ ParagraphNode[1]
   └─ SentenceNode[10]
      ├─ WordNode[3]
      │  ├─ TextNode: 'I'
      │  ├─ PunctuationNode: '’'
      │  └─ TextNode: 'm'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1]
      │  └─ TextNode: 'going'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1]
      │  └─ TextNode: 'to'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1]
      │  └─ TextNode: 'bed'
      ├─ PunctuationNode: '.'
      ├─ WhiteSpaceNode: ' '
      └─ EmoticonNode: ':zzz:' [data={"names":["zzz"],"description":"sleeping symbol","tags":["sleeping"]}]
```

## API

### [retext](https://github.com/wooorm/retext/tree/feature/stable#api).[use](https://github.com/wooorm/retext/tree/feature/stable#retextuseplugin-options)(emoji\[, options\])

Emoji, gemoji, and emoticons in [**retext**](https://github.com/wooorm/retext).

**Parameters**

*   `emoji` — This plug-in;

*   `options` (`Object`, optional):

    *   `convert` (`"encode"` or `"decode"`, optional)
        — When `encode`, converts short-codes into their unicode equivalent
        (e.g., `:heart:` and `<3` to `❤️`); When `decode`, converts unicode
        emoji into their short-code equivalent (e.g., `❤️` and `<3` to
        `:heart:`).

### EmoticonNode

**retext-emoji** adds a new node to [NLCST](https://github.com/wooorm/nlcst),
namely, the `EmoticonNode` ([SymbolNode](https://github.com/wooorm/nlcst#symbolnode)).

Whether emoji (`❤️`), emoticon (`<3`), or gemoji (`:heart:`), all are classified
as this `EmoticonNode`.

```idl
interface EmoticonNode < SymbolNode {
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

**retext-emoji** supports every  [wooorm/gemoji](https://github.com/wooorm/gemoji/#supported-gemoji)
and every [wooorm/emoticon](https://github.com/wooorm/emoticon/#supported-emoticon).

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
