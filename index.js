'use strict';

/**
 * Dependencies.
 */

var gemoji;

gemoji = require('gemoji');

/**
 * Constants.
 */

var key,
    shortcodes,
    names,
    unicode,
    has;

names = gemoji.name;
unicode = gemoji.unicode;

shortcodes = {};

has = Object.prototype.hasOwnProperty;

/**
 * Quick access to short-codes.
 */

for (key in names) {
    /* istanbul ignore else */
    if (has.call(names, key)) {
        shortcodes[':' + key + ':'] = names[key];
    }
}

/**
 * Merge gemoji, punctuation marks and words, into a
 * punctuation node.
 *
 * @param {CSTNode} child
 * @param {number} index
 * @param {CSTNode} parent
 * @return {undefined|number} - Either void, or the
 *   next index to iterate over.
 */

function mergeEmojiExceptions(child, index, parent) {
    var siblings,
        children,
        siblingIndex,
        childIndex,
        node,
        nodes,
        value,
        length;

    siblings = parent.children;
    children = child.children;
    siblingIndex = index;

    if (
        child.type === 'WordNode' &&
        has.call(children, 0)
    ) {
        value = children[0].value;

        /**
         * Sometimes a unicode emoji is marked as a
         * word. Replace it with a `PunctuationNode`.
         */

        if (has.call(unicode, value)) {
            siblings[index].type = 'PunctuationNode';

            return;
        }

        /**
         * Sometimes a unicode emoji is split in two
         * and marked as a first a `PunctuationNode`,
         * followed by `WordNode`. Remove the last
         * and add its value to the first.
         */

        node = siblings[index - 1];

        if (
            node &&
            node.type === 'PunctuationNode' &&
            has.call(node.children, 0) &&
            has.call(unicode, node.children[0].value + value)
        ) {
            node.children[0].value += value;

            siblings.splice(index, 1);

            return index - 1;
        }
    }

    if (
        child.type !== 'PunctuationNode' ||
        !has.call(children, 0) ||
        children[0].value !== ':'
    ) {
        return;
    }

    nodes = [];

    while (siblings[--siblingIndex]) {
        node = siblings[siblingIndex];
        nodes = nodes.concat(node.children.reverse());

        if (
            node.type === 'PunctuationNode' &&
            node.children[0].value === ':'
        ) {
            break;
        }
    }

    if (siblingIndex === -1) {
        return;
    }

    nodes = nodes.reverse().concat(children);

    childIndex = -1;
    length = nodes.length;
    value = '';

    while (++childIndex < length) {
        value += nodes[childIndex].value;
    }

    if (!has.call(shortcodes, value)) {
        return;
    }

    siblings.splice(siblingIndex, index - siblingIndex);
    child.children = nodes;

    return siblingIndex;
}

/**
 * Replace a short-code with a unicode emoji.
 *
 * @this {PunctuationNode}
 */

function encode() {
    var self,
        value;

    self = this;
    value = shortcodes[self.toString()];

    if (value) {
        while (self.tail) {
            self.tail.remove();
        }

        self.head.fromString(value);
    }
}

/**
 * Replace a unicode emoji with a short-code.
 *
 * @this {PunctuationNode}
 */

function decode() {
    var self,
        value;

    self = this;
    value = unicode[self.toString()];

    if (value) {
        self.head.fromString(value);

        self.prepend(new self.TextOM.TextNode(':'));
        self.append(new self.TextOM.TextNode(':'));
    }
}

/**
 * Define `attachFactory`.
 *
 * @param {string} type - either `encode` or `decode`.
 * @return {function}
 */

function attachFactory(type) {
    var onchange;

    if (type === 'encode') {
        onchange = encode;
    } else {
        onchange = decode;
    }

    /**
     * @param {Retext} retext
     */

    return function (retext) {
        var PunctuationNode;

        PunctuationNode = retext.TextOM.PunctuationNode;

        retext.parser.tokenizeSentenceModifiers.unshift(mergeEmojiExceptions);

        PunctuationNode.on('changetextinside', onchange);
        PunctuationNode.on('insertinside', onchange);
        PunctuationNode.on('removeinside', onchange);
    };
}

/**
 * Define `emojiFactory`.
 */

function emojiFactory(options) {
    var convert;

    if (arguments.length > 1) {
        throw new TypeError(
            'Illegal invocation: `emoji` was ' +
            'invoked by `Retext`, but should be ' +
            'invoked by the user'
        );
    }

    if (!options) {
        throw new TypeError(
            'Illegal invocation: `' + options + '` ' +
            'is not a valid value for `options` in ' +
            '`emoji(options)`'
        );
    }

    convert = options.convert;

    if (
        !convert ||
        (
            convert !== 'decode' &&
            convert !== 'encode'
        )
    ) {
        throw new TypeError(
            'Illegal invocation: `' + convert +
            '` is not a valid value for ' +
            '`options.convert` in `emoji(options)`'
        );
    }

    function emoji () {}

    emoji.attach = attachFactory(convert);

    return emoji;
}

/**
 * Expose `emojiFactory`.
 */

module.exports = emojiFactory;
