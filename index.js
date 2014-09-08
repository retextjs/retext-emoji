'use strict';

var gemoji, shortcode, shortcodes, names, unicode;

gemoji = require('gemoji');

names = gemoji.name;
unicode = gemoji.unicode;
shortcodes = gemoji.shortcode = {};

for (shortcode in names) {
    shortcodes[':' + shortcode + ':'] = names[shortcode];
}

function mergeEmojiExceptions(child, index, parent) {
    var siblings = parent.children,
        children = child.children,
        iterator = index,
        childIterator, node, nodes, value, length;

    if (
        child.type === 'WordNode' &&
        0 in children &&
        children[0].value in unicode
    ) {
        parent.children[index] = {
            'type' : 'PunctuationNode',
            'children' : children
        };

        return index - 1;
    }

    if (
        child.type !== 'PunctuationNode' ||
        !(0 in children) ||
        children[0].value !== ':') {
            return;
    }

    nodes = [];

    while (siblings[--iterator]) {
        node = siblings[iterator];
        nodes = nodes.concat(node.children.reverse());

        if (
            node.type === 'PunctuationNode' &&
            node.children[0].value === ':'
        ) {
            break;
        }
    }

    if (iterator === -1) {
        return;
    }

    nodes = nodes.reverse().concat(children);

    childIterator = -1;
    length = nodes.length;
    value = '';

    while (++childIterator < length) {
        value += nodes[childIterator].value;
    }

    if (!(value in shortcodes)) {
        return;
    }

    siblings.splice(iterator, index - iterator);
    child.children = nodes;

    return iterator;
}

function encode() {
    var self = this,
        value = shortcodes[self.toString()];

    if (value) {
        self.tail.remove();
        self.head.remove();
        self.head.fromString(value);
    }
}

function decode() {
    var self = this,
        value = unicode[self.toString()];

    if (value) {
        self.head.fromString(value);
        self.prepend(new self.TextOM.TextNode(':'));
        self.append(new self.TextOM.TextNode(':'));
    }
}

function attachFactory(type) {
    return function (retext) {
        var parser = retext.parser,
            TextOM = parser.TextOM,
            onchange = type === 'encode' ? encode : decode;

        parser.tokenizeSentenceModifiers = [
                mergeEmojiExceptions
            ].concat(parser.tokenizeSentenceModifiers);

        TextOM.PunctuationNode.on('changetextinside', onchange);
        TextOM.PunctuationNode.on('insertinside', onchange);
        TextOM.PunctuationNode.on('removeinside', onchange);
    };
}

function emoji(options) {
    if (arguments.length > 1) {
        throw new TypeError('Illegal invocation: retext-emoji was' +
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
