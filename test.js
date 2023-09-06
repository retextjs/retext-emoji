/**
 * @typedef {import('nlcst-emoticon-modifier').Emoticon} Emoticon
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {retext} from 'retext'
import retextEmoji from 'retext-emoji'
import {u} from 'unist-builder'

const processor = retext().use(retextEmoji)

test('retext-emoji', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('retext-emoji')).sort(), [
      'default'
    ])
  })

  await t.test('should throw when given invalid `convert`', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how the runtime handles invalid `convert`.
      retext().use(retextEmoji, {convert: false}).freeze()
    }, /Invalid `convert` value `false`, expected `'decode'` or `'encode'`/)
  })

  await t.test('should classify emoticons', async function () {
    const tree = processor.parse('This makes me feel :).')

    await processor.run(tree)

    assert.deepEqual(
      tree,
      u('RootNode', {position: p(1, 1, 0, 1, 23, 22)}, [
        u('ParagraphNode', {position: p(1, 1, 0, 1, 23, 22)}, [
          u('SentenceNode', {position: p(1, 1, 0, 1, 23, 22)}, [
            u('WordNode', {position: p(1, 1, 0, 1, 5, 4)}, [
              u('TextNode', {position: p(1, 1, 0, 1, 5, 4)}, 'This')
            ]),
            u('WhiteSpaceNode', {position: p(1, 5, 4, 1, 6, 5)}, ' '),
            u('WordNode', {position: p(1, 6, 5, 1, 11, 10)}, [
              u('TextNode', {position: p(1, 6, 5, 1, 11, 10)}, 'makes')
            ]),
            u('WhiteSpaceNode', {position: p(1, 11, 10, 1, 12, 11)}, ' '),
            u('WordNode', {position: p(1, 12, 11, 1, 14, 13)}, [
              u('TextNode', {position: p(1, 12, 11, 1, 14, 13)}, 'me')
            ]),
            u('WhiteSpaceNode', {position: p(1, 14, 13, 1, 15, 14)}, ' '),
            u('WordNode', {position: p(1, 15, 14, 1, 19, 18)}, [
              u('TextNode', {position: p(1, 15, 14, 1, 19, 18)}, 'feel')
            ]),
            u('WhiteSpaceNode', {position: p(1, 19, 18, 1, 20, 19)}, ' '),
            u(
              'EmoticonNode',
              {
                position: p(1, 20, 19, 1, 22, 21),
                data: {
                  emoji: '😃',
                  description: 'grinning face with big eyes',
                  names: ['smiley'],
                  tags: ['happy', 'joy', 'haha']
                }
              },
              ':)'
            ),
            u('PunctuationNode', {position: p(1, 22, 21, 1, 23, 22)}, '.')
          ])
        ])
      ])
    )
  })

  await t.test('should classify gemoji', async function () {
    const tree = processor.parse('This makes me feel :sob:.')

    await processor.run(tree)

    assert.deepEqual(
      tree,
      u('RootNode', {position: p(1, 1, 0, 1, 26, 25)}, [
        u('ParagraphNode', {position: p(1, 1, 0, 1, 26, 25)}, [
          u('SentenceNode', {position: p(1, 1, 0, 1, 26, 25)}, [
            u('WordNode', {position: p(1, 1, 0, 1, 5, 4)}, [
              u('TextNode', {position: p(1, 1, 0, 1, 5, 4)}, 'This')
            ]),
            u('WhiteSpaceNode', {position: p(1, 5, 4, 1, 6, 5)}, ' '),
            u('WordNode', {position: p(1, 6, 5, 1, 11, 10)}, [
              u('TextNode', {position: p(1, 6, 5, 1, 11, 10)}, 'makes')
            ]),
            u('WhiteSpaceNode', {position: p(1, 11, 10, 1, 12, 11)}, ' '),
            u('WordNode', {position: p(1, 12, 11, 1, 14, 13)}, [
              u('TextNode', {position: p(1, 12, 11, 1, 14, 13)}, 'me')
            ]),
            u('WhiteSpaceNode', {position: p(1, 14, 13, 1, 15, 14)}, ' '),
            u('WordNode', {position: p(1, 15, 14, 1, 19, 18)}, [
              u('TextNode', {position: p(1, 15, 14, 1, 19, 18)}, 'feel')
            ]),
            u('WhiteSpaceNode', {position: p(1, 19, 18, 1, 20, 19)}, ' '),
            u(
              'EmoticonNode',
              {
                position: p(1, 20, 19, 1, 25, 24),
                data: {
                  emoji: '😭',
                  description: 'loudly crying face',
                  names: ['sob'],
                  tags: ['sad', 'cry', 'bawling']
                }
              },
              ':sob:'
            ),
            u('PunctuationNode', {position: p(1, 25, 24, 1, 26, 25)}, '.')
          ])
        ])
      ])
    )
  })

  await t.test('should classify emoji', async function () {
    const tree = processor.parse('It’s raining 🐱s and 🐶s.')

    await processor.run(tree)

    assert.deepEqual(
      tree,
      u('RootNode', {position: p(1, 1, 0, 1, 26, 25)}, [
        u('ParagraphNode', {position: p(1, 1, 0, 1, 26, 25)}, [
          u('SentenceNode', {position: p(1, 1, 0, 1, 26, 25)}, [
            u('WordNode', {position: p(1, 1, 0, 1, 5, 4)}, [
              u('TextNode', {position: p(1, 1, 0, 1, 3, 2)}, 'It'),
              u('PunctuationNode', {position: p(1, 3, 2, 1, 4, 3)}, '’'),
              u('TextNode', {position: p(1, 4, 3, 1, 5, 4)}, 's')
            ]),
            u('WhiteSpaceNode', {position: p(1, 5, 4, 1, 6, 5)}, ' '),
            u('WordNode', {position: p(1, 6, 5, 1, 13, 12)}, [
              u('TextNode', {position: p(1, 6, 5, 1, 13, 12)}, 'raining')
            ]),
            u('WhiteSpaceNode', {position: p(1, 13, 12, 1, 14, 13)}, ' '),
            u(
              'EmoticonNode',
              {
                position: p(1, 14, 13, 1, 16, 15),
                data: {
                  emoji: '🐱',
                  description: 'cat face',
                  names: ['cat'],
                  tags: ['pet']
                }
              },
              '🐱'
            ),
            u('WordNode', {position: p(1, 16, 15, 1, 17, 16)}, [
              u('TextNode', {position: p(1, 16, 15, 1, 17, 16)}, 's')
            ]),
            u('WhiteSpaceNode', {position: p(1, 17, 16, 1, 18, 17)}, ' '),
            u('WordNode', {position: p(1, 18, 17, 1, 21, 20)}, [
              u('TextNode', {position: p(1, 18, 17, 1, 21, 20)}, 'and')
            ]),
            u('WhiteSpaceNode', {position: p(1, 21, 20, 1, 22, 21)}, ' '),
            u(
              'EmoticonNode',
              {
                position: p(1, 22, 21, 1, 24, 23),
                data: {
                  emoji: '🐶',
                  description: 'dog face',
                  names: ['dog'],
                  tags: ['pet']
                }
              },
              '🐶'
            ),
            u('WordNode', {position: p(1, 24, 23, 1, 26, 25)}, [
              u('TextNode', {position: p(1, 24, 23, 1, 25, 24)}, 's'),
              u('PunctuationNode', {position: p(1, 25, 24, 1, 26, 25)}, '.')
            ])
          ])
        ])
      ])
    )
  })

  await t.test('should ignore unknown emoji', async function () {
    const tree = u('RootNode', [
      u('ParagraphNode', [
        u('SentenceNode', [
          u('WordNode', [u('TextNode', 'This')]),
          u('WhiteSpaceNode', ' '),
          u('WordNode', [u('TextNode', 'makes')]),
          u('WhiteSpaceNode', ' '),
          u('WordNode', [u('TextNode', 'me')]),
          u('WhiteSpaceNode', ' '),
          u('WordNode', [u('TextNode', 'feel')]),
          u('WhiteSpaceNode', ' '),
          u('EmoticonNode', '*weird*'),
          u('PunctuationNode', '.')
        ])
      ])
    ])

    await processor.run(tree)

    assert.deepEqual(
      tree,
      u('RootNode', [
        u('ParagraphNode', [
          u('SentenceNode', [
            u('WordNode', [u('TextNode', 'This')]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', [u('TextNode', 'makes')]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', [u('TextNode', 'me')]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', [u('TextNode', 'feel')]),
            u('WhiteSpaceNode', ' '),
            u('EmoticonNode', '*weird*'),
            u('PunctuationNode', '.')
          ])
        ])
      ])
    )
  })

  await t.test('should not transform without `convert`', async function () {
    const file = await retext()
      .use(retextEmoji)
      .process('It’s raining 🐱s and :dog:s. Now :3.')

    assert.deepEqual(String(file), 'It’s raining 🐱s and :dog:s. Now :3.')
  })

  await t.test('should encode', async function () {
    const file = await retext()
      .use(retextEmoji, {convert: 'encode'})
      .process('It’s raining 🐱s and :dog:s. Now :3.')

    assert.deepEqual(String(file), 'It’s raining 🐱s and 🐶s. Now 👨.')
  })

  await t.test('should decode', async function () {
    const file = await retext()
      .use(retextEmoji, {convert: 'decode'})
      .process('It’s raining 🐱s and :dog:s. Now :3.')

    assert.deepEqual(String(file), 'It’s raining :cat:s and :dog:s. Now :man:.')
  })

  await t.test('should not overwrite existing data', async function () {
    /** @type {Emoticon} */
    // @ts-expect-error: unregistered data.
    const emoji = u('EmoticonNode', {data: {alpha: true, bravo: 2}}, ':+1:')

    await retext()
      .use(retextEmoji)
      .run(
        u('RootNode', [u('SentenceNode', [emoji, u('PunctuationNode', '.')])])
      )

    assert.deepEqual(emoji, {
      type: 'EmoticonNode',
      value: ':+1:',
      data: {
        alpha: true,
        bravo: 2,
        description: 'thumbs up',
        emoji: '👍',
        names: ['+1', 'thumbsup'],
        tags: ['approve', 'ok']
      }
    })
  })

  await t.test(
    'should support a superfluous variant selector 16',
    async function () {
      const file = await retext()
        .use(retextEmoji, {convert: 'decode'})
        .process('Zap! ⚡️')

      assert.deepEqual(String(file), 'Zap! :zap:')
    }
  )
})

/**
 * @param {number} sl
 * @param {number} sc
 * @param {number} so
 * @param {number} el
 * @param {number} ec
 * @param {number} eo
 */
// eslint-disable-next-line max-params, unicorn/prevent-abbreviations
function p(sl, sc, so, el, ec, eo) {
  return {start: point(sl, sc, so), end: point(el, ec, eo)}
}

/**
 * @param {number} l
 * @param {number} c
 * @param {number} o
 */
function point(l, c, o) {
  return {line: l, column: c, offset: o}
}
