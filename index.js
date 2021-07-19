import {affixEmoticonModifier} from 'nlcst-affix-emoticon-modifier'
import {emoticonModifier} from 'nlcst-emoticon-modifier'
import {emojiModifier} from 'nlcst-emoji-modifier'
import {toString} from 'nlcst-to-string'
import {visit} from 'unist-util-visit'
import {emoticon} from 'emoticon'
import {gemoji} from 'gemoji'

const own = {}.hasOwnProperty

const type = 'EmoticonNode'

const vs16 = 0xfe0f

// Map of visitors.
const fns = {
  // Change to an emoji.
  encode: (emoji) => {
    return emoji
  },
  // Change to a GitHub emoji short-code.
  decode: (emoji) => {
    return ':' + emoji2info[emoji].names[0] + ':'
  }
}

const emoji2info = {}
const emoticon2emoji = {}
const gemoji2emoji = {}

init()

export default function retextEmoji(options = {}) {
  const Parser = this.Parser
  const proto = Parser.prototype
  const convert = options.convert
  let fn

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

  return (node) => {
    visit(node, type, (node) => {
      const emoji = parse(toString(node))

      if (!emoji) return

      if (fn) {
        node.value = fn(emoji)
      }

      const info = emoji2info[emoji]
      const data = node.data || (node.data = {})
      data.emoji = info.emoji
      data.description = info.description
      data.names = info.names.concat()
      data.tags = info.tags.concat()
    })
  }
}

// Map a value to an emoji.
function parse(value) {
  if (own.call(emoji2info, value)) return value
  if (own.call(emoticon2emoji, value)) return emoticon2emoji[value]
  if (own.call(gemoji2emoji, value)) return gemoji2emoji[value]

  if (value.charCodeAt(value.length - 1) === vs16) {
    const without = value.slice(0, -1)
    if (own.call(emoji2info, without)) return without
  }
}

// Construct dictionaries.
function init() {
  let index = -1

  while (++index < gemoji.length) {
    const info = gemoji[index]
    const values = info.names
    let offset = -1

    emoji2info[info.emoji] = info

    while (++offset < values.length) {
      gemoji2emoji[':' + values[offset] + ':'] = info.emoji
    }
  }

  index = -1

  while (++index < emoticon.length) {
    const info = emoticon[index]
    let offset = -1

    while (++offset < info.emoticons.length) {
      emoticon2emoji[info.emoticons[offset]] = info.emoji
    }
  }
}
