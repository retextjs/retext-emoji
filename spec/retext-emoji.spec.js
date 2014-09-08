'use strict';

var emoji, gemoji, Retext, AST, content, assert, baseSentence,
    fullStop, encodeRetext, decodeRetext, name, unicode;

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

    it('should classify gemoji (e.g., `:sob:`) as a single punctuation node',
        function () {
            var tree = decodeRetext.parse('This makes me feel :sob:.');

            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'This'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'makes'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'me'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'feel'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'sob'
                            },
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should classify gemoji (e.g., `:sob:`) as a single punctuation ' +
        'node, when inserted after the initial parse', function () {
            var tree = decodeRetext.parse('This makes me feel');
            tree.head.head.appendContent(' :sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'This'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'makes'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'me'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'feel'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'sob'
                            },
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should NOT classify invalid gemoji-like sequences as gemoji ' +
        '(e.g., `:trololol:`) as a single punctuation node', function () {
            var tree = decodeRetext.parse('This makes me feel :trololol:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'This'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'makes'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'me'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'feel'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'trololol'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));

            tree = decodeRetext.parse('Hello L.L. Smith:\n');

            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Hello'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'L'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'L'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Smith'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should automatically convert gemoji (e.g., `:sob:`) to their ' +
        'unicode equivalent, when `convert` is `encode`', function () {
            var tree = encodeRetext.parse('This makes me feel :sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'This'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'makes'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'me'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'feel'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '\uD83D\uDE2D'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should automatically convert gemoji (e.g., `:sob:`) to their ' +
        'unicode equivalent, when inserted after the initial parse and ' +
        '`convert` is `encode`', function () {
            var tree = encodeRetext.parse('This makes me feel');
            tree.head.head.appendContent(' :sob:.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'This'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'makes'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'me'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'feel'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '\uD83D\uDE2D'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should automatically convert emoji (e.g., `\uD83D\uDE2D`) to ' +
        'their gemoji equivalent, when `convert` is `decode`', function () {
            var tree = decodeRetext.parse('This makes me feel \uD83D\uDE2D.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'This'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'makes'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'me'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'feel'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'sob'
                            },
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should automatically convert emoji (e.g., `\uD83D\uDE2D`) to ' +
        'their gemoji equivalent, when inserted after the initial parse ' +
        'and `convert` is `decode`', function () {
            var tree = decodeRetext.parse('This makes me feel');
            tree.head.head.appendContent(' \uD83D\uDE2D.');
            assert(tree.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'This'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'makes'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'me'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'feel'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'sob'
                            },
                            {
                                'type' : 'TextNode',
                                'value' : ':'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );
});

function describeEmoji(name, unicode) {
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

for (name in gemoji.name) {
    describeEmoji(':' + name + ':', gemoji.name[name]);
}
