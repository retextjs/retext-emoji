'use strict';

/**
 * Dependencies.
 */

var emoji,
    gemoji,
    Retext,
    ast,
    content,
    assert;

emoji = require('..');
gemoji = require('gemoji');
ast = require('retext-ast');
content = require('retext-content');
Retext = require('retext');
assert = require('assert');

/**
 * Fixtures.
 */

var baseSentence,
    fullStop;

baseSentence = 'Lack of cross-device emoji support makes me ';
fullStop = '.';

/**
 * Retext.
 */

var encode,
    decode;

encode = new Retext()
    .use(ast)
    .use(content)
    .use(emoji({
        'convert' : 'encode'
    }));

decode = new Retext()
    .use(ast)
    .use(content)
    .use(emoji({
        'convert' : 'decode'
    }));

/**
 * Tests.
 */

describe('emoji()', function () {
    it('should be a `function`', function () {
        assert(typeof emoji === 'function');
    });

    it('should pass an error when invoked by `Retext` instead of the user',
        function (done) {
            var retext;

            retext = new Retext().use(emoji);

            retext.parse(null, function (err) {
                assert.throws(function () {
                    throw err;
                }, /Illegal invocation/);

                done();
            });
        }
    );

    it('should throw when not given `options`', function () {
        assert.throws(function () {
            new Retext().use(emoji());
        }, /undefined/);
    });

    it('should throw when not given `options.convert`', function () {
        assert.throws(function () {
            new Retext().use(emoji({
                'test' : 'encode'
            }));
        }, /object Object/);
    });

    it('should throw when `convert` is neither `encode` nor `decode`',
        function () {
            assert.throws(function () {
                assert(new Retext().use(emoji({
                    'convert' : false
                })));
            }, /false/);
        }
    );

    it('should classify gemoji (such as `:sob:`) as a `PunctuationNode`',
        function (done) {
            decode.parse(
                'This makes me feel :sob:.',
                function (err, tree) {
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

                    done(err);
                }
            );
        }
    );

    it('should classify gemoji (such as `:sob:`) as a `PunctuationNode`, ' +
        'when inserted after the initial parse',
        function (done) {
            decode.parse(
                'This makes me feel',
                function (err, tree) {
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

                    done(err);
                }
            );
        }
    );

    it('should NOT classify gemoji-like sequences (such as `:trololol:`) ' +
        'as `PunctuationNode`',
        function (done) {
            decode.parse(
                'This makes me feel :trololol:.',
                function (err, tree) {
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

                    done(err);
                }
            );
        }
    );

    it('should NOT classify gemoji-like sequences (such as `L.L. Smith:`) ' +
        'as `PunctuationNode`',
        function (done) {
            decode.parse(
                'Hello L.L. Smith:\n',
                function (err, tree) {
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

                    done(err);
                }
            );
        }
    );
});

describe('emoji({convert: "encode"})', function () {
    it('should convert gemoji (such as `:sob:`) to their unicode ' +
        'equivalent, when `convert` is `encode`',
        function (done) {
            encode.parse(
                'This makes me feel :sob:.',
                function (err, tree) {
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

                    done(err);
                }
            );
        }
    );

    it('should convert gemoji (such as `:sob:`) to their unicode ' +
        'equivalent, after the initial parse, when `convert` is `encode`',
        function (done) {
            encode.parse(
                'This makes me feel',
                function (err, tree) {
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

                    done(err);
                }
            );
        }
    );
});

describe('emoji({convert: "decode"})', function () {
    it('should convert gemoji (such as `\uD83D\uDE2D`) to their named ' +
        'equivalent, when `convert` is `decode`',
        function (done) {
            decode.parse(
                'This makes me feel \uD83D\uDE2D.',
                function (err, tree) {
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

                    done(err);
                }
            );
        }
    );

    it('should convert gemoji (such as `\uD83D\uDE2D`) to their named ' +
        'equivalent, after the initial parse, when `convert` is `decode`',
        function (done) {
            decode.parse(
                'This makes me feel',
                function (err, tree) {
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

                    done(err);
                }
            );
        }
    );
});

function describeEmoji(key, unicode) {
    var shortcode;

    shortcode = ':' + key + ':';

    describe(unicode, function () {
        if (gemoji.unicode[unicode] === key) {
            it('should decode, from `' + unicode + '` to `' + shortcode + '`',
                function (done) {
                    var source;

                    source = baseSentence + unicode + fullStop;

                    decode.parse(source, function (err, tree) {
                        var node;

                        node = tree.head.head.tail.prev;

                        assert(
                            tree.toString() ===
                            baseSentence + shortcode + fullStop
                        );

                        assert(node.toString() === shortcode);
                        assert(node.type === node.PUNCTUATION_NODE);

                        done(err);
                    });
                }
            );
        }

        it('should encode, from `' + shortcode + '` to `' + unicode + '`',
            function (done) {
                var source;

                source = baseSentence + shortcode + fullStop;

                encode.parse(source, function (err, tree) {
                    var node;

                    node = tree.head.head.tail.prev;

                    assert(
                        tree.toString() === baseSentence + unicode + fullStop
                    );

                    assert(node.toString() === unicode);
                    assert(node.type === node.PUNCTUATION_NODE);

                    done(err);
                });
            }
        );
    });
}

var key;

for (key in gemoji.name) {
    describeEmoji(key, gemoji.name[key]);
}
