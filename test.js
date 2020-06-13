'use strict'

var test = require('tape')
var retext = require('retext')
var visit = require('unist-util-visit')
var u = require('unist-builder')
var emoji = require('.')

test('emoji', function (t) {
  var processor = retext().use(emoji)
  var fixture = 'It’s raining 🐱s and :dog:s. Now :3.'

  t.throws(
    function () {
      retext().use(emoji, {convert: false}).freeze()
    },
    /Illegal invocation: `false` is not a valid value/,
    'should throw when given invalid `convert`'
  )

  t.deepEqual(
    processor.runSync(processor.parse('This makes me feel :).')),
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
    ]),
    'should classify emoticons'
  )

  t.deepEqual(
    processor.runSync(processor.parse('This makes me feel :sob:.')),
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
    ]),
    'should classify gemoji'
  )

  t.deepEqual(
    processor.runSync(processor.parse('It’s raining 🐱s and 🐶s.')),
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
    ]),
    'should classify emoji'
  )

  t.deepEqual(
    processor.runSync(
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
    ),
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
    ]),
    'should ignore unknown emoji'
  )

  retext()
    .use(emoji)
    .process(fixture, function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, fixture],
        'should not transform without `convert`'
      )
    })

  retext()
    .use(emoji, {convert: 'encode'})
    .process(fixture, function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, 'It’s raining 🐱s and 🐶s. Now 👨.'],
        'should encode'
      )
    })

  retext()
    .use(emoji, {convert: 'decode'})
    .process(fixture, function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, 'It’s raining :cat:s and :dog:s. Now :man:.'],
        'should decode'
      )
    })

  retext()
    .use(data)
    .use(emoji)
    .process(fixture, function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, fixture],
        'should not overwrite existing data'
      )
    })

  function data() {
    return transformer
    function transformer(node) {
      visit(node, visitor)
    }

    function visitor(child) {
      child.data = {}
    }
  }

  t.end()
})

// eslint-disable-next-line max-params, unicorn/prevent-abbreviations
function p(sl, sc, so, el, ec, eo) {
  return {start: point(sl, sc, so), end: point(el, ec, eo)}
}

function point(l, c, o) {
  return {line: l, column: c, offset: o}
}
