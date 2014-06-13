'use strict';

var gemoji, shortcode, shortcodes, names, unicode;

gemoji = require('gemoji');

names = gemoji.name;
shortcodes = gemoji.shortcode = {};

for (shortcode in names) {
    shortcodes[':' + shortcode + ':'] = names[shortcode];
}

function onchangeFactory(method) {
    return function () {
        var self = this,
            value = self.toString(),
            startNode, nodes, iterator, emoticon;

        if (value !== ':') {
            method(self, value);
            return;
        }

        startNode = self.prev;
        nodes = [];
        iterator = -1;

        while (startNode) {
            if (startNode.type === startNode.PUNCTUATION_NODE) {
                value = startNode.toString();

                if (value === ':') {
                    emoticon = nodes.reverse().join('');

                    if (gemoji.name[emoticon]) {
                        startNode.remove();

                        while (nodes[++iterator]) {
                            nodes[iterator].remove();
                        }

                        self.fromString(':' + emoticon + ':');
                    }

                    return;
                }

                // Many gemojis contain underscores, and two contain
                // dashes (`:e-mail:` and `:non-potable_water:`).
                if (value !== '_' && value !== '-') {
                    return;
                }
            }
            nodes.push(startNode);
            startNode = startNode.prev;
        }
    };
}

function encode(node, value) {
    value = gemoji.shortcode[value];

    if (value) {
        node.fromString(value);
    }
}

function decode(node, value) {
    value = gemoji.unicode[value];

    if (value) {
        node.fromString(':' + value + ':');
    }
}

function attachFactory(type) {
    return function (retext) {
        var TextOM = retext.parser.TextOM,
            onchange = onchangeFactory(
                type === 'encode' ? encode : decode
            );

        TextOM.PunctuationNode.on('changetext', onchange);
        TextOM.PunctuationNode.on('changeprev', onchange);
    };
}

function emoji(options) {
    if (arguments.length > 1) {
        throw new TypeError('Illegal invocation: smartypants was' +
            ' called by Retext, but should be called by the user');
    }

    if (!options || !('convert' in options)) {
        throw new TypeError('Illegal invocation: \'' + options +
            '\' is not a valid arguments for \'emoji\'');
    }

    var convert = options.convert;

    if (convert !== 'decode' && convert !== 'encode') {
        throw new TypeError('Illegal invocation: \'' + convert +
            '\' is not a valid option for `convert` in ' +
            '\'emoji\'');
    }

    function method () {}

    method.attach = attachFactory(convert);

    return method;
}

exports = module.exports = emoji;
