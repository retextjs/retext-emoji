'use strict'

var affixEmoticonModifier = require('nlcst-affix-emoticon-modifier')
var emoticonModifier = require('nlcst-emoticon-modifier')
var emojiModifier = require('nlcst-emoji-modifier')
var emoticons = require('emoticon')
var toString = require('nlcst-to-string')
var gemoji = require('gemoji')
var visit = require('unist-util-visit')

module.exports = emoji

var type = 'EmoticonNode'

// Map of visitors.
var fns = {
  encode: toEmoji,
  decode: toGemoji
}

var unicodes = gemoji.unicode
var names = gemoji.name

var shortcodes = {}

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
    var data = node.data
    var value = toString(node)
    var info

    if (fn) {
      fn(node)
    }

    info = unicodes[value] || shortcodes[value] || emoticons[value]

    if (!data) {
      data = {}
      node.data = data
    }

    data.names = info.names.concat()
    data.description = info.description
    data.tags = info.tags.concat()
  }
}

// Replace a unicode emoji with a short-code.
function toGemoji(node) {
  var value = toString(node)
  var info = (unicodes[value] || emoticons[value] || {}).shortcode

  if (info) {
    node.value = info
  }
}

// Replace a short-code with a unicode emoji.
function toEmoji(node) {
  var value = toString(node)
  var info = (shortcodes[value] || emoticons[value] || {}).emoji

  if (info) {
    node.value = info
  }
}

function init() {
  var key
  var shortcode
  var result = {}
  var length = emoticons.length
  var index = -1
  var count
  var offset
  var subset
  var name

  for (key in names) {
    shortcode = ':' + key + ':'
    shortcodes[shortcode] = names[key]
    shortcodes[shortcode].shortcode = shortcode
  }

  while (++index < length) {
    name = emoticons[index].name
    subset = emoticons[index].emoticons
    count = subset.length
    offset = -1

    while (++offset < count) {
      result[subset[offset]] = names[name]
    }
  }

  emoticons = result
}
