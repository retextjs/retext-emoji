'use strict';

/**
 * Dependencies.
 */

var emoji,
    gemoji,
    Retext,
    ast,
    content,
    inspect,
    assert;

emoji = require('./');
gemoji = require('gemoji');
ast = require('retext-ast');
content = require('retext-content');
inspect = require('retext-inspect');
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
    decode,
    retext,
    TextOM;

encode = new Retext()
    .use(ast)
    .use(content)
    .use(inspect)
    .use(emoji, {
        'convert': 'encode'
    });

decode = new Retext()
    .use(ast)
    .use(content)
    .use(inspect)
    .use(emoji, {
        'convert': 'decode'
    });

retext = new Retext()
    .use(ast)
    .use(content)
    .use(inspect)
    .use(emoji);

TextOM = retext.TextOM;

/**
 * Tests.
 */

describe('emoji()', function () {
    it('should be a `function`', function () {
        assert(typeof emoji === 'function');
    });

    it('should throw when invoked by the user', function () {
        assert.throws(function () {
            emoji();
        }, /Illegal invocation/);

        assert.throws(function () {
            emoji({
                'convert': 'encode'
            });
        }, /Illegal invocation/);
    });

    it('should NOT throw when not given `options`', function () {
        assert.doesNotThrow(function () {
            new Retext().use(emoji);
        }, /undefined/);
    });

    it('should NOT throw when not given `options.convert`', function () {
        assert.doesNotThrow(function () {
            new Retext().use(emoji, {
                'test': 'encode'
            });
        }, /undefined/);
    });

    it('should throw when `convert` is neither `encode`, `decode`, ' +
        '`null`, nor `undefined`',
        function () {
            assert.throws(function () {
                assert(new Retext().use(emoji, {
                    'convert': false
                }));
            }, /false/);
        }
    );

    it('should classify gemoji (such as `:sob:`) as an `EmoticonNode`',
        function (done) {
            decode.parse(
                'This makes me feel :sob:.',
                function (err, tree) {
                    assert(tree.head.head.toAST() === JSON.stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': ':sob:',
                                'data': {
                                    'names': [
                                        'sob'
                                    ],
                                    'description': 'loudly crying face',
                                    'tags': [
                                        'sad',
                                        'cry',
                                        'bawling'
                                    ]
                                }
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    }));

                    done(err);
                }
            );
        }
    );

    it('should classify gemoji (such as `:sob:`) as a `EmoticonNode`, ' +
        'when inserted after the initial parse',
        function (done) {
            decode.parse(
                'This makes me feel',
                function (err, tree) {
                    tree.head.head.appendContent(' :sob:.');

                    assert(tree.head.head.toAST() === JSON.stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': ':sob:',
                                'data': {
                                    'names': [
                                        'sob'
                                    ],
                                    'description': 'loudly crying face',
                                    'tags': [
                                        'sad',
                                        'cry',
                                        'bawling'
                                    ]
                                }
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    }));

                    done(err);
                }
            );
        }
    );

    it('should NOT classify gemoji-like sequences (such as `:trololol:`) ' +
        'as `EmoticonNode`',
        function (done) {
            decode.parse(
                'This makes me feel :trololol:.',
                function (err, tree) {
                    assert(tree.head.head.toAST() === JSON.stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': ':'
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'trololol'
                                    }
                                ]
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': ':'
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    }));

                    done(err);
                }
            );
        }
    );

    it('should NOT classify gemoji-like sequences (such as `L.L. Smith:`) ' +
        'as `EmoticonNode`',
        function (done) {
            decode.parse(
                'Hello L.L. Smith:\n',
                function (err, tree) {
                    assert(tree.head.head.toAST() === JSON.stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'Hello'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'L'
                                    },
                                    {
                                        'type': 'PunctuationNode',
                                        'value': '.'
                                    },
                                    {
                                        'type': 'TextNode',
                                        'value': 'L'
                                    },
                                    {
                                        'type': 'PunctuationNode',
                                        'value': '.'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'Smith'
                                    }
                                ]
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': ':'
                            }
                        ]
                    }));

                    done(err);
                }
            );
        }
    );
});

describe('TextOM.EmoticonNode', function () {
    it('should add a `names` array to `EmoticonNode`s data', function () {
        var emoticon;

        emoticon = new TextOM.EmoticonNode(':sob:');

        assert(Array.isArray(emoticon.data.names));
        assert(emoticon.data.names.length !== 0);

        emoticon.data.names.forEach(function (name) {
            assert(typeof name === 'string');
            assert(name in gemoji.name);

            assert(gemoji.name[name].names.indexOf(name) !== -1);
        });
    });

    it('should add a `tags` array to `EmoticonNode`s data', function () {
        var emoticon;

        emoticon = new TextOM.EmoticonNode(':relaxed:');

        assert(Array.isArray(emoticon.data.tags));

        emoticon.data.tags.forEach(function (tag) {
            assert(typeof tag === 'string');

            assert(gemoji.name.relaxed.tags.indexOf(tag) !== -1);
        });
    });

    it('should add a `description` to `EmoticonNode`s data', function () {
        var emoticon;

        emoticon = new TextOM.EmoticonNode(':+1:');

        assert(typeof emoticon.data.description === 'string');

        assert(gemoji.name['+1'].description === emoticon.data.description);
    });

    it('should have a `toEmoji` method', function () {
        var emoticon;

        emoticon = new TextOM.EmoticonNode(':+1:');

        emoticon.toEmoji();

        assert(emoticon.toString() === gemoji.name['+1'].emoji);
    });

    it('should have a `toGemoji` method', function () {
        var emoticon;

        emoticon = new TextOM.EmoticonNode(gemoji.name.thumbsdown.emoji);

        emoticon.toGemoji();

        assert(emoticon.toString() === ':thumbsdown:');
    });

    it('should update data when a new (g)emoji is given', function () {
        var emoticon,
            description;

        emoticon = new TextOM.EmoticonNode(':white_large_square:');

        description = emoticon.data.description;

        emoticon.fromString(gemoji.name.link.emoji);

        assert(description !== emoticon.data.description);
    });

    it('should set empty data attributes when an incorrect emoji is given',
        function () {
            var emoticon;

            emoticon = new TextOM.EmoticonNode(':white_large_square:');

            assert.doesNotThrow(function () {
                emoticon.fromString(':trololol:');

                assert(emoticon.data.names.length === 0);
                assert(emoticon.data.tags.length === 0);
                assert(emoticon.data.description === null);
            });
        }
    );
});

describe('use(emoji)', function () {
    it('should NOT convert gemoji (such as `:sob:`) to their unicode ' +
        'equivalent, when `convert` is not given',
        function (done) {
            retext.parse(
                'This makes me feel :sob:.',
                function (err, tree) {
                    assert(tree.head.head.toAST() === JSON.stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': ':sob:',
                                'data': {
                                    'names': [
                                        'sob'
                                    ],
                                    'description': 'loudly crying face',
                                    'tags': [
                                        'sad',
                                        'cry',
                                        'bawling'
                                    ]
                                }
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    }));

                    done(err);
                }
            );
        }
    );

    it('should NOT convert gemoji (such as `:sob:`) to their unicode ' +
        'equivalent, after the initial parse, when `convert` is not given',
        function (done) {
            retext.parse(
                'This makes me feel',
                function (err, tree) {
                    tree.head.head.appendContent(' :sob:.');

                    assert(tree.head.head.toAST() === JSON.stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': ':sob:',
                                'data': {
                                    'names': [
                                        'sob'
                                    ],
                                    'description': 'loudly crying face',
                                    'tags': [
                                        'sad',
                                        'cry',
                                        'bawling'
                                    ]
                                }
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    }));

                    done(err);
                }
            );
        }
    );

    it('should NOT convert gemoji (such as `\uD83D\uDE2D`) to their named ' +
        'equivalent, when `convert` is not given',
        function (done) {
            retext.parse(
                'This makes me feel \uD83D\uDE2D.',
                function (err, tree) {
                    assert(tree.head.head.toAST() === JSON.stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': '\uD83D\uDE2D',
                                'data': {
                                    'names': [
                                        'sob'
                                    ],
                                    'description': 'loudly crying face',
                                    'tags': [
                                        'sad',
                                        'cry',
                                        'bawling'
                                    ]
                                }
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    }));

                    done(err);
                }
            );
        }
    );

    it('should NOT convert gemoji (such as `\uD83D\uDE2D`) to their named ' +
        'equivalent, after the initial parse, when `convert` is not given',
        function (done) {
            retext.parse(
                'This makes me feel',
                function (err, tree) {
                    tree.head.head.appendContent(' \uD83D\uDE2D.');

                    assert(tree.head.head.toAST() === JSON.stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': '\uD83D\uDE2D',
                                'data': {
                                    'names': [
                                        'sob'
                                    ],
                                    'description': 'loudly crying face',
                                    'tags': [
                                        'sad',
                                        'cry',
                                        'bawling'
                                    ]
                                }
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    }));

                    done(err);
                }
            );
        }
    );
});

describe('use(emoji, {convert: "encode"})', function () {
    it('should convert gemoji (such as `:sob:`) to their unicode ' +
        'equivalent, when `convert` is `encode`',
        function (done) {
            encode.parse(
                'This makes me feel :sob:.',
                function (err, tree) {
                    assert(tree.head.head.toAST() === JSON.stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': '\uD83D\uDE2D',
                                'data': {
                                    'names': [
                                        'sob'
                                    ],
                                    'description': 'loudly crying face',
                                    'tags': [
                                        'sad',
                                        'cry',
                                        'bawling'
                                    ]
                                }
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
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
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': '\uD83D\uDE2D',
                                'data': {
                                    'names': [
                                        'sob'
                                    ],
                                    'description': 'loudly crying face',
                                    'tags': [
                                        'sad',
                                        'cry',
                                        'bawling'
                                    ]
                                }
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    }));

                    done(err);
                }
            );
        }
    );
});

describe('use(emoji, {convert: "decode"})', function () {
    it('should convert gemoji (such as `\uD83D\uDE2D`) to their named ' +
        'equivalent, when `convert` is `decode`',
        function (done) {
            decode.parse(
                'This makes me feel \uD83D\uDE2D.',
                function (err, tree) {
                    assert(tree.head.head.toAST() === JSON.stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': ':sob:',
                                'data': {
                                    'names': [
                                        'sob'
                                    ],
                                    'description': 'loudly crying face',
                                    'tags': [
                                        'sad',
                                        'cry',
                                        'bawling'
                                    ]
                                }
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
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
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'This'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'makes'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'me'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'feel'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': ':sob:',
                                'data': {
                                    'names': [
                                        'sob'
                                    ],
                                    'description': 'loudly crying face',
                                    'tags': [
                                        'sad',
                                        'cry',
                                        'bawling'
                                    ]
                                }
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    }));

                    done(err);
                }
            );
        }
    );
});

function describeEmoji(key, information) {
    var shortcode,
        unicode;

    shortcode = information.shortcode;
    unicode = information.emoji;

    describe(unicode, function () {
        if (gemoji.unicode[unicode].name === key) {
            it('should decode, from ' + unicode + ' to `' + shortcode + '`',
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
                        assert(node.type === node.EMOTICON_NODE);

                        done(err);
                    });
                }
            );
        }

        it('should encode, from `' + shortcode + '` to ' + unicode,
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
                    assert(node.type === node.EMOTICON_NODE);

                    done(err);
                });
            }
        );
    });
}

Object.keys(gemoji.name).forEach(function (name) {
    describeEmoji(name, gemoji.name[name]);
});
