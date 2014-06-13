'use strict';

var emoji, Retext, AST, content, assert, fs, baseSentence,
    fullStop, encodeRetext, decodeRetext, inputs, outputs,
    unsupportedOutputs;

emoji = require('..');
AST = require('retext-ast');
content = require('retext-content');
Retext = require('retext');
assert = require('assert');
fs = require('fs');

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

    it('should throw when `convert` is given, but the value is neither `"encode"` nor `"decode"`',
        function () {
            assert.throws(function () {
                assert(new Retext().use(emoji({
                    'convert' : false
                })));
            }, /'false'/);
        }
    );

    it('should classify gemojis (e.g., `:sob:`) as a single punctuation node', function () {
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
    });

    it('should classify gemojis (e.g., `:sob:`) as a single punctuation node, when inserted after the initial parse', function () {
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
    });

    it('should NOT classify invalid gemoji-like sequences as gemojis (e.g., `:trololol:`) as a single punctuation node', function () {
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
    });

    it('should automatically convert gemojis (e.g., `:sob:`) to their unicode equivalent, when `convert` is `encode`', function () {
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
    });

    it('should automatically convert gemojis (e.g., `:sob:`) to their unicode equivalent, when inserted after the initial parse and `convert` is `encode`', function () {
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
    });

    it('should automatically convert emojis (e.g., `\uD83D\uDE2D`) to their gemoji equivalent, when `convert` is `decode`', function () {
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
    });

    it('should automatically convert emojis (e.g., `\uD83D\uDE2D`) to their gemoji equivalent, when inserted after the initial parse and `convert` is `decode`', function () {
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
    });
});

inputs = fs.readFileSync('node_modules/gemoji/spec/input.txt', 'utf-8')
    .split('\n');

outputs = fs.readFileSync('node_modules/gemoji/spec/output.txt', 'utf-8')
    .split('\n');

// Convert escaped unicode characters into actual unicode characters.
inputs = inputs.map(function (input) {
    return input.replace(/\\u([\d\w]{4})/gi, function (match, $1) {
        return String.fromCharCode(parseInt($1, 16));
    });
});

// Remove last newline.
inputs.pop();
outputs.pop();

// Delete unsupported gemoji.
delete inputs[outputs.indexOf('m')];
delete inputs[outputs.indexOf('information_source')];

inputs.forEach(function (input, index) {
    var output = ':' + outputs[index] + ':';

    describe('emoji `' + output + '`', function () {
        it('should decode the emoticon (from `' + input + '` to `' +
            output + '`)', function () {
                var source = baseSentence + input + fullStop,
                    tree = decodeRetext.parse(source),
                    emoji = tree.head.head.tail.prev;

                assert(tree.toString() === baseSentence + output + fullStop);
                assert(emoji.toString() === output);
                assert(emoji.type === emoji.PUNCTUATION_NODE);
            }
        );

        it('should encode the emoticon (from `' + output + '` to `' + input +
            '`)', function () {
                var source = baseSentence + output + fullStop,
                    tree = encodeRetext.parse(source),
                    emoji = tree.head.head.tail.prev;

                assert(tree.toString() === baseSentence + input + fullStop);
                assert(emoji.toString() === input);
                assert(emoji.type === emoji.PUNCTUATION_NODE);
            }
        );
    });
});
