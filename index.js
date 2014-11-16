'use strict';

/**
 * Dependencies.
 */

var unicodes,
    key,
    names,
    shortcodes,
    shortcode,
    gemoji,
    modifier;

gemoji = require('gemoji');
modifier = require('nlcst-emoji-modifier');

unicodes = gemoji.unicode;
names = gemoji.name;

shortcodes = {};

for (key in names) {
    shortcode = ':' + key + ':';
    shortcodes[shortcode] = names[key];
    shortcodes[shortcode].shortcode = shortcode;
}

/**
 * Replace a short-code with a unicode emoji.
 *
 * @this {EmoticonNode}
 */

function toEmoji() {
    var self,
        value;

    self = this;
    value = shortcodes[self.toString()];

    if (value) {
        self.fromString(value.emoji);
    }
}

/**
 * Replace a unicode emoji with a short-code.
 *
 * @this {EmoticonNode}
 */

function toGemoji() {
    var self,
        value;

    self = this;
    value = unicodes[self.toString()];

    if (value) {
        self.fromString(value.shortcode);
    }
}

/**
 * Change factory. Constructs a `changetext` listener.
 *
 * @param {string} onchange - which function to invoke
 *   when the internal value changes.
 * @return {function(this:EmoticonNode)}
 */

function changeFactory(onchange) {
   /**
    * Invoked when the internal value changes. If the
    * emoji is still valid, updates its data.
    *
    * @this {EmoticonNode}
    */

    return function () {
        var self,
            value,
            data,
            information;

        self = this;
        value = self.toString();

        information = unicodes[value] || shortcodes[value];

        data = self.data;

        if (information) {
            data.names = information.names.concat();
            data.description = information.description;
            data.tags = information.tags.concat();
        } else {
            data.names = [];
            data.description = null;
            data.tags = [];
        }

        if (onchange) {
            self[onchange]();
        }
    };
}

/**
 * Define `EMOTICON_NODE`.
 */

var EMOTICON_NODE;

EMOTICON_NODE = 'EmoticonNode';

/**
 * Define `emoji`.
 */

function emoji(retext, options) {
    var TextOM,
        SymbolNode,
        convert,
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

    /**
     * Construct an `EmoticonNode`.
     */

    TextOM = retext.TextOM;

    SymbolNode = TextOM.SymbolNode;

    /**
     * Define `PunctuationNode`.
     *
     * @constructor
     */

    function EmoticonNode() {
        SymbolNode.apply(this, arguments);
    }

    /**
     * The type of an instance of `EmoticonNode`.
     *
     * @readonly
     * @static
     */

    EmoticonNode.prototype.type = EMOTICON_NODE;

    /**
     * Transform a gemoji into an emoji.
     *
     * @this {EmoticonNode}
     */

    EmoticonNode.prototype.toEmoji = toEmoji;

   /**
    * Transform an emoji into a gemoji.
    *
    * @this {EmoticonNode}
    */

   EmoticonNode.prototype.toGemoji = toGemoji;

    /**
     * Inherit from `SymbolNode.prototype`.
     */

    SymbolNode.isImplementedBy(EmoticonNode);

    /**
     * Expose `EmoticonNode` on `TextOM`.
     */

    TextOM.EmoticonNode = EmoticonNode;

    /**
     * Expose `EmoticonNode`s type on `TextOM`
     * and `Node.prototype`.
     */

    TextOM.EMOTICON_NODE = EMOTICON_NODE;
    TextOM.Node.prototype.EMOTICON_NODE = EMOTICON_NODE;

    /**
     * Enable `SentenceNode` to accept `EmoticonNode`s.
     */

    TextOM.SentenceNode.prototype.allowedChildTypes.push(EMOTICON_NODE);

    /**
     * Add automatic emoji de- and encoding.
     */

    convert = options.convert;

    if (
        convert !== 'decode' &&
        convert !== 'encode' &&
        convert !== null &&
        convert !== undefined
    ) {
        throw new TypeError(
            'Illegal invocation: `' + convert +
            '` is not a valid value for ' +
            '`options.convert` in `retext#use(emoji, options)`'
        );
    }

    if (convert === 'encode') {
        onchange = 'toEmoji';
    } else if (convert === 'decode') {
        onchange = 'toGemoji';
    }

    EmoticonNode.on('changetext', changeFactory(onchange));

    /**
     * Add the NLCST plugin.
     */

    modifier(retext.parser);
}

/**
 * Expose `emoji`.
 */

module.exports = emoji;
