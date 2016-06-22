/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext-emoji
 * @fileoverview Emoji, gemoji, and emoticons with retext.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var affixEmoticonModifier = require('nlcst-affix-emoticon-modifier');
var emoticonModifier = require('nlcst-emoticon-modifier');
var emojiModifier = require('nlcst-emoji-modifier');
var emoticons = require('emoticon');
var toString = require('nlcst-to-string');
var gemoji = require('gemoji');
var visit = require('unist-util-visit');

/* Constants. */
var EMOTICON_NODE = 'EmoticonNode';

/* Map of visitors. */
var fns = {
    encode: toEmoji,
    decode: toGemoji
}

/* Easy access. */
var unicodes = gemoji.unicode;
var names = gemoji.name;

var shortcodes = {};

emoticons = emoticons.emoticon;

(function () {
    var key;
    var shortcode;

    for (key in names) {
        shortcode = ':' + key + ':';
        shortcodes[shortcode] = names[key];
        shortcodes[shortcode].shortcode = shortcode;
    }

    for (key in emoticons) {
        emoticons[key].names = names[emoticons[key].name].names;
        emoticons[key].shortcode = names[emoticons[key].name].shortcode;
    }
})();

/**
 * Replace a short-code with a unicode emoji.
 *
 * @param {EmoticonNode} node - Emoticon node.
 */
function toEmoji(node) {
    var value = toString(node);
    var info = (shortcodes[value] || emoticons[value] || {}).emoji;

    if (info) {
        node.value = info;
    }
}

/**
 * Replace a unicode emoji with a short-code.
 *
 * @param {EmoticonNode} node - Emoticon node.
 */
function toGemoji(node) {
    var value = toString(node);
    var info = (unicodes[value] || emoticons[value] || {}).shortcode;

    if (info) {
        node.value = info;
    }
}

/**
 * Partially applied visit factory.
 *
 * @param {Function?} transformer - EmoticonNode-visitor.
 * @return {Function?} - Vititor.
 */
function visitFactory(transformer) {
    return function (node) {
        visit(node, EMOTICON_NODE, function (node) {
            var data = node.data;
            var value = toString(node);
            var info;

            if (transformer) {
                transformer(node);
            }

            info = unicodes[value] || shortcodes[value] || emoticons[value];

            if (!data) {
                data = node.data = {};
            }

            data.names = info.names.concat();
            data.description = info.description;
            data.tags = info.tags.concat();
        });
    }
}

/**
 * Attacher.
 *
 * @param {Retext} processor - Instance.
 * @param {Object?} [options] - Configuration.
 * @return {Function} Transformer.
 */
function emoji(processor, options) {
    var proto = processor.Parser.prototype;
    var convert = (options || {}).convert;
    var fn;

    proto.useFirst('tokenizeSentence', emoticonModifier);
    proto.useFirst('tokenizeSentence', emojiModifier);
    proto.useFirst('tokenizeParagraph', affixEmoticonModifier);

    if (convert !== null && convert !== undefined) {
        fn = fns[convert];

        if (!fn) {
            throw new TypeError(
                'Illegal invocation: `' + convert +
                '` is not a valid value for ' +
                '`options.convert` in `retext#use(emoji, options)`'
            );
        }
    }

    return visitFactory(fn);
}

/* Expose. */
module.exports = emoji;
