'use strict';

var emoji, gemoji, Retext, AST, content, assert, fs, baseSentence,
    fullStop, encodeRetext, decodeRetext, names, name, unicode, unsupported,
    iterator;

emoji = require('..');
gemoji = require('gemoji');
AST = require('retext-ast');
content = require('retext-content');
Retext = require('retext');
assert = require('assert');

baseSentence = 'Lack of cross-device emoji support makes me ';
fullStop = '.';

encodeRetext = new Retext()
    .use(AST)
    .use(content)
    .use(emoji({
        'convert' : 'encode'
    }));

decodeRetext = new Retext()
    .use(AST)
    .use(content)
    .use(emoji({
        'convert' : 'decode'
    }));

describe('emoji()', function () {
    it('should be of type `function`', function () {
        assert(typeof emoji === 'function');
    });

    it('should throw when invoked by Retext, rather than the user',
        function () {
            var throwingRetext = new Retext().use(emoji);

            assert.throws(function () {
                assert(throwingRetext.parse());
            }, /Illegal invocation/);
        }
    );

    it('should throw when options or no options.convert are omitted',
        function () {
            assert.throws(function () {
                assert(new Retext().use(emoji()));
            }, /'undefined'/);

            assert.throws(function () {
                assert(new Retext().use(emoji({
                    'test' : 'encode'
                })));
            }, /'\[object Object\]'/);
        }
    );

    it('should throw when `convert` is given, but the value is neither ' +
        '`"encode"` nor `"decode"`', function () {
            assert.throws(function () {
                assert(new Retext().use(emoji({
                    'convert' : false
                })));
            }, /'false'/);
        }
    );

    it('should classify gemojis (e.g., `:sob:`) as a single punctuation node',
        function () {
            var tree = decodeRetext.parse('This makes me feel :sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':sob:'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should classify gemojis (e.g., `:sob:`) as a single punctuation ' +
        'node, when inserted after the initial parse', function () {
            var tree = decodeRetext.parse('This makes me feel ');
            tree.head.head.appendContent(':sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':sob:'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should NOT classify invalid gemoji-like sequences as gemojis ' +
        '(e.g., `:trololol:`) as a single punctuation node', function () {
            var tree = decodeRetext.parse('This makes me feel :trololol:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'trololol'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));

            tree = decodeRetext.parse('Hello Mr. Smith:\n');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Hello'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Mr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Smith'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':'
                    }
                ]
            }));
        }
    );

    it('should automatically convert gemojis (e.g., `:sob:`) to their ' +
        'unicode equivalent, when `convert` is `encode`', function () {
            var tree = encodeRetext.parse('This makes me feel :sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\uD83D\uDE2D'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should automatically convert gemojis (e.g., `:sob:`) to their ' +
        'unicode equivalent, when inserted after the initial parse and ' +
        '`convert` is `encode`', function () {
            var tree = encodeRetext.parse('This makes me feel ');
            tree.head.head.appendContent(':sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\uD83D\uDE2D'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should automatically convert emojis (e.g., `\uD83D\uDE2D`) to ' +
        'their gemoji equivalent, when `convert` is `decode`', function () {
            var tree = decodeRetext.parse('This makes me feel \uD83D\uDE2D.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':sob:'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should automatically convert emojis (e.g., `\uD83D\uDE2D`) to ' +
        'their gemoji equivalent, when inserted after the initial parse ' +
        'and `convert` is `decode`', function () {
            var tree = decodeRetext.parse('This makes me feel ');
            tree.head.head.appendContent('\uD83D\uDE2D.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'This'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'makes'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feel'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ':sob:'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );
});

names = gemoji.name;

// Delete unsupported gemoji.
unsupported = ['m', 'information_source'];
iterator = -1;

while (unsupported[++iterator]) {
    delete names[unsupported[iterator]];
}

for (name in names) {
    unicode = names[name];
    name = ':' + name + ':';

    describe('emoji `' + unicode + '`', function () {
        it('should decode the emoticon (from `' + unicode + '` to `' +
            name + '`)', function () {
                var source = baseSentence + unicode + fullStop,
                    tree = decodeRetext.parse(source),
                    emoji = tree.head.head.tail.prev;

                assert(tree.toString() === baseSentence + name + fullStop);
                assert(emoji.toString() === name);
                assert(emoji.type === emoji.PUNCTUATION_NODE);
            }
        );

        it('should encode the emoticon (from `' + name + '` to `' + unicode +
            '`)', function () {
                var source = baseSentence + name + fullStop,
                    tree = encodeRetext.parse(source),
                    emoji = tree.head.head.tail.prev;

                assert(tree.toString() === baseSentence + unicode + fullStop);
                assert(emoji.toString() === unicode);
                assert(emoji.type === emoji.PUNCTUATION_NODE);
            }
        );
    });
}
