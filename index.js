'use strict'

var affixEmoticonModifier = require('nlcst-affix-emoticon-modifier')
var emoticonModifier = require('nlcst-emoticon-modifier')
var emojiModifier = require('nlcst-emoji-modifier')
var toString = require('nlcst-to-string')
var visit = require('unist-util-visit')
var emoticons = require('emoticon')
var gemoji = require('gemoji')

module.exports = emoji

var own = {}.hasOwnProperty

var type = 'EmoticonNode'

var vs16 = 0xfe0f

// Map of visitors.
var fns = {
  encode: toEmoji,
  decode: toGemoji
}

var emoji2info = {}

var emoticon2emoji = {}
var gemoji2emoji = {}

init()

function emoji(options) {
  var Parser = this.Parser
  var proto = Parser.prototype
  var convert = (options || {}).convert
  var fn

  proto.useFirst('tokenizeSentence', emoticonModifier)
  proto.useFirst('tokenizeSentence', emojiModifier)
  proto.useFirst('tokenizeParagraph', affixEmoticonModifier)

  if (convert !== null && convert !== undefined) {
    fn = fns[convert]

    if (!fn) {
      throw new TypeError(
        'Illegal invocation: `' +
          convert +
          '` is not a valid value for ' +
          '`options.convert` in `retext#use(emoji, options)`'
      )
    }
  }

  return transformer

  function transformer(node) {
    visit(node, type, visitor)
  }

  function visitor(node) {
    var emoji = parse(toString(node))
    var info
    var data

    if (!emoji) return

    if (fn) {
      node.value = fn(emoji)
    }

    info = emoji2info[emoji]
    data = node.data || (node.data = {})
    data.emoji = info.emoji
    data.description = info.description
    data.names = info.names.concat()
    data.tags = info.tags.concat()
  }
}

// Map a value to an emoji.
function parse(value) {
  var without

  if (own.call(emoji2info, value)) return value
  if (own.call(emoticon2emoji, value)) return emoticon2emoji[value]
  if (own.call(gemoji2emoji, value)) return gemoji2emoji[value]

  if (value.charCodeAt(value.length - 1) === vs16) {
    without = value.slice(0, -1)
    /* istanbul ignore else - pretty weird to have something that parses as an
     * emoji, with a superfluous fe0f, and not have it exist, but hey, better
     * to be sure. */
    if (own.call(emoji2info, without)) return without
  }
}

// Change to a GitHub emoji short-code.
function toGemoji(emoji) {
  return ':' + emoji2info[emoji].names[0] + ':'
}

// Change to an emoji.
function toEmoji(emoji) {
  return emoji
}

// Construct dictionaries.
function init() {
  var length = gemoji.length
  var index = -1
  var info
  var offset
  var count
  var values
  var value

  while (++index < length) {
    info = gemoji[index]
    values = info.names
    count = values.length
    offset = -1

    emoji2info[info.emoji] = info

    while (++offset < count) {
      value = values[offset]
      gemoji2emoji[':' + value + ':'] = info.emoji
    }
  }

  index = -1
  length = emoticons.length

  while (++index < length) {
    info = emoticons[index]
    values = info.emoticons
    count = values.length
    offset = -1

    while (++offset < count) {
      value = values[offset]
      emoticon2emoji[value] = info.emoji
    }
  }
}
