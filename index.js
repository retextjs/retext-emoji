'use strict';

/**
 * Dependencies.
 */

var gemoji,
    nlcstToString;

gemoji = require('gemoji');
nlcstToString = require('nlcst-to-string');

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
        node,
        nodes,
        value;

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
         * word. Replace it with a `SymbolNode`.
         */

        if (has.call(unicode, value)) {
            siblings[index] = {
                'type': 'SymbolNode',
                'value': nlcstToString(siblings[index])
            };

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
            (
                node.type === 'PunctuationNode' ||
                node.type === 'SymbolNode'
            ) &&
            has.call(unicode, nlcstToString(node) + value)
        ) {
            node.type = 'SymbolNode';
            node.value = nlcstToString(node) + value;

            siblings.splice(index, 1);

            return index - 1;
        }
    }

    if (
        (
            child.type !== 'PunctuationNode' &&
            child.type !== 'SymbolNode'
        ) ||
        nlcstToString(child) !== ':'
    ) {
        return;
    }

    nodes = [];

    while (siblings[--siblingIndex]) {
        node = siblings[siblingIndex];

        if (node.children) {
            nodes = nodes.concat(node.children.reverse());
        } else {
            nodes.push(node);
        }

        if (
            (
                node.type === 'PunctuationNode' ||
                node.type === 'SymbolNode'
            ) &&
            nlcstToString(node) === ':'
        ) {
            break;
        }
    }

    if (siblingIndex === -1) {
        return;
    }

    nodes.reverse().push(child);

    value = nlcstToString({
        'children': nodes
    });

    if (!has.call(shortcodes, value)) {
        return;
    }

    siblings.splice(siblingIndex, index - siblingIndex);

    child.type = 'SymbolNode';
    child.value = value;

    return siblingIndex;
}

/**
 * Replace a short-code with a unicode emoji.
 *
 * @this {SymbolNode}
 */

function encode() {
    var self,
        value;

    self = this;
    value = shortcodes[self.toString()];

    if (value) {
        self.fromString(value);
    }
}

/**
 * Replace a unicode emoji with a short-code.
 *
 * @this {SymbolNode}
 */

function decode() {
    var self,
        value;

    self = this;
    value = unicode[self.toString()];

    if (value) {
        self.fromString(':' + value + ':');
    }
}

/**
 * Define `emojiFactory`.
 */

function emoji(retext, options) {
    var convert,
        onchange;

    if (arguments.length < 2) {
        throw new TypeError(
            'Illegal invocation: `emoji` was ' +
            'invoked by the user. This is no longer valid. ' +
            'This breaking change occurred in ' +
            'retext-emoji@0.3.0. See GitHub for more ' +
            'information'
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
            '`options.convert` in `retext#use(emoji, options)`'
        );
    }

    if (convert === 'encode') {
        onchange = encode;
    } else {
        onchange = decode;
    }

    retext.parser.tokenizeSentenceModifiers.unshift(mergeEmojiExceptions);

    retext.TextOM.SymbolNode.on('changetext', onchange);
}

/**
 * Expose `emojiFactory`.
 */

module.exports = emoji;
