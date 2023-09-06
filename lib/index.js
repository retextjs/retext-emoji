/**
 * @typedef {import('gemoji').Gemoji} Gemoji
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('unified').Processor} Processor
 */

/**
 * @callback Convert
 *   Convert.
 * @param {string} value
 *   Input.
 * @returns {string}
 *   Output.
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {'decode' | 'encode' | null | undefined} [convert]
 *   Whether to decode (`❤️` and `<3` to `:heart:`), encode (`:heart:` and `<3`
 *   to `❤️`), or do nothing (optional).
 */

import {emoticon} from 'emoticon'
import {gemoji} from 'gemoji'
import {emojiModifier} from 'nlcst-emoji-modifier'
import {affixEmoticonModifier} from 'nlcst-affix-emoticon-modifier'
import {emoticonModifier} from 'nlcst-emoticon-modifier'
import {toString} from 'nlcst-to-string'
import {visit} from 'unist-util-visit'

const vs16 = 0xfe_0f

/** @type {Record<string, Gemoji>} */
const emojiToInfo = {}
/** @type {Record<string, string>} */
const emoticonToEmoji = {}
/** @type {Record<string, string>} */
const gemojiToEmoji = {}

init()

/** @type {Readonly<Options>} */
const emptyOptions = {}

/**
 * Plugin to support emoji (`❤️`), gemoji (`:heart:`), and emoticons (`<3`).
 *
 * @this {Processor}
 *   Processor.
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function retextEmoji(options) {
  const settings = options || emptyOptions
  const convert = settings.convert

  // Register extensions to parser.
  let sentence = this.data('nlcstSentenceExtensions')
  let paragraph = this.data('nlcstParagraphExtensions')

  if (!sentence) {
    this.data('nlcstSentenceExtensions', (sentence = []))
  }

  if (!paragraph) {
    this.data('nlcstParagraphExtensions', (paragraph = []))
  }

  sentence.push(emojiModifier, emoticonModifier)
  paragraph.push(affixEmoticonModifier)

  /** @type {Convert | undefined} */
  let convertFn

  if (convert === null || convert === undefined) {
    // Empty.
  } else if (convert === 'decode') {
    convertFn = decode
  } else if (convert === 'encode') {
    convertFn = identity
  } else {
    throw new TypeError(
      'Invalid `convert` value `' +
        convert +
        "`, expected `'decode'` or `'encode'`"
    )
  }

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'EmoticonNode', function (node) {
      const emoji = parse(toString(node))

      if (!emoji) return

      if (convertFn) {
        node.value = convertFn(emoji)
      }

      const info = emojiToInfo[emoji]
      const data = node.data || (node.data = {})
      data.emoji = info.emoji
      data.description = info.description
      data.names = [...info.names]
      data.tags = [...info.tags]
    })
  }
}

/**
 * Map a value to an emoji.
 *
 * @param {string} value
 *   Input.
 * @returns {string | undefined}
 *   Output.
 */
function parse(value) {
  if (Object.hasOwn(emojiToInfo, value)) return value
  if (Object.hasOwn(emoticonToEmoji, value)) return emoticonToEmoji[value]
  if (Object.hasOwn(gemojiToEmoji, value)) return gemojiToEmoji[value]

  if (value.charCodeAt(value.length - 1) === vs16) {
    const without = value.slice(0, -1)
    if (Object.hasOwn(emojiToInfo, without)) return without
  }
}

// Construct dictionaries.
function init() {
  let index = -1

  while (++index < gemoji.length) {
    const info = gemoji[index]
    const values = info.names
    let offset = -1

    emojiToInfo[info.emoji] = info

    while (++offset < values.length) {
      gemojiToEmoji[':' + values[offset] + ':'] = info.emoji
    }
  }

  index = -1

  while (++index < emoticon.length) {
    const info = emoticon[index]
    let offset = -1

    while (++offset < info.emoticons.length) {
      emoticonToEmoji[info.emoticons[offset]] = info.emoji
    }
  }
}

/**
 * @type {Convert}
 */
function decode(value) {
  return ':' + emojiToInfo[value].names[0] + ':'
}

/**
 * @type {Convert}
 */
function identity(value) {
  return value
}
