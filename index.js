/**
 * @typedef {import('nlcst').Root} Root
 *
 * @typedef {import('nlcst-emoticon-modifier')} DoNotTouchAsThisImportIncludesEmoticonsInTree
 *
 * @typedef Options
 *   Configuration.
 * @property {'encode'|'decode'} [convert]
 *   If, and *how* to convert (`'encode'` or `'decode'`, optional).
 *
 *   When `encode` is given, converts short-codes and emoticons to their unicode
 *   equivalent (`:heart:` and `<3` to `❤️`).
 *
 *   When `decode` is given, converts unicode emoji and emoticons to their short-code
 *   equivalent (`❤️` and `<3` to `:heart:`).
 */

import {affixEmoticonModifier} from 'nlcst-affix-emoticon-modifier'
import {emoticonModifier} from 'nlcst-emoticon-modifier'
import {emojiModifier} from 'nlcst-emoji-modifier'
import {toString} from 'nlcst-to-string'
import {visit} from 'unist-util-visit'
import {emoticon} from 'emoticon'
import {gemoji} from 'gemoji'

const own = {}.hasOwnProperty

const vs16 = 0xfe_0f

/** @type {Record<string, gemoji[number]>} */
const emoji2info = {}
/** @type {Record<string, string>} */
const emoticon2emoji = {}
/** @type {Record<string, string>} */
const gemoji2emoji = {}

/**
 * Map of visitors.
 *
 * @type {Record<string, (value: string) => string>}
 */
const fns = {
  /**
   * Change to an emoji.
   *
   * @param {string} emoji
   * @returns {string}
   */
  encode: (emoji) => emoji,
  /**
   * Change to a GitHub emoji short-code.
   *
   * @param {string} emoji
   * @returns {string}
   */
  decode: (emoji) => ':' + emoji2info[emoji].names[0] + ':'
}

init()

/**
 * Plugin to support emoji, gemoji, and emoticons.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
export default function retextEmoji(options = {}) {
  const Parser = this.Parser
  // Hush.
  /* c8 ignore next */
  if (!Parser) throw new Error('Expected parser')
  const convert = options.convert
  /** @type {fns[keyof fns]|undefined} */
  let fn
  // Hush.
  // type-coverage:ignore-next-line
  const proto = Parser.prototype
  // Hush.
  // type-coverage:ignore-next-line
  proto.useFirst('tokenizeSentence', emoticonModifier)
  // Hush.
  // type-coverage:ignore-next-line
  proto.useFirst('tokenizeSentence', emojiModifier)
  // Hush.
  // type-coverage:ignore-next-line
  proto.useFirst('tokenizeParagraph', affixEmoticonModifier)

  if (convert !== null && convert !== undefined) {
    if (!Object.keys(fns).includes(convert)) {
      throw new TypeError(
        'Invalid `convert` value `' +
          convert +
          "`, expected `'encode'` or `'decode'`"
      )
    }

    fn = fns[convert]
  }

  return (node) => {
    visit(node, 'EmoticonNode', (node) => {
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

/**
 * Map a value to an emoji.
 *
 * @param {string} value
 */
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
