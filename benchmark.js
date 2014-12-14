'use strict';

var Retext,
    emoji,
    gemoji;

/**
 * Dependencies.
 */

Retext = require('retext');
gemoji = require('gemoji');
emoji = require('./');

/**
 * Dependencies.
 */

var retext,
    retextWithEmoji;

retext = new Retext();
retextWithEmoji = new Retext().use(emoji);

/**
 * Fixtures.
 *
 * Source:
 *   http://www.gutenberg.org/cache/epub/11024/pg11024.html
 */

var paragraph,
    emojiParagraph;

/**
 * A paragraph, 5 sentences, filled with 10 emojis.
 */

emojiParagraph = 'Thou art a churlish knight to so ' +
    'affront a :woman: he could not sit upon his ' +
    gemoji.name.horse + ' any longer. ' +

    'For methinks something hath befallen my :3 ' +
    'and that he then, after a while, he ' +
    ':,( out in great voice. ' +

    'For that ' + gemoji.name.sunny + ' in the sky ' +
    'lieth in the south then Queen Helen fell down in ' +
    'a swoon, and :sleeping:. ' +

    'Touch me not, for I am not mortal, but ' +
    'o:) so the Lady of the Lake :zap: away, ' +
    'everything behind. ' +

    'Where :princess: had stood was clear, ' +
    'and she was gone since ' + gemoji.name.man + ' ' +
    'does not choose to assume my quarrel.';

/**
 * A paragraph, 5 sentences, without emojis.
 */

paragraph = 'Thou art a churlish knight to so affront ' +
    'a lady he could not sit upon his horse any ' +
    'longer. ' +

    'For methinks something hath befallen my lord ' +
    'and that he then, after a while, he cried out ' +
    'in great voice. ' +

    'For that light in the sky lieth in the south ' +
    'then Queen Helen fell down in a swoon, and ' +
    'lay. ' +

    'Touch me not, for I am not mortal, but Fay ' +
    'so the Lady of the Lake vanished away, ' +
    'everything behind. ' +

    'Where she had stood was clear, and she was ' +
    'gone since Sir Kay does not choose to assume my ' +
    'quarrel.';

/**
 * Benchmark.
 */

suite('retext w/o retext-emoji', function () {
    bench('A paragraph (5 sentences, 100 words, 10 emojis)', function (done) {
        retext.parse(emojiParagraph, done);
    });

    bench('A paragraph (5 sentences, 100 words, no emojis)', function (done) {
        retext.parse(paragraph, done);
    });
});

suite('retext w/ retext-emoji', function () {
    bench('A paragraph (5 sentences, 100 words, 10 emojis)', function (done) {
        retextWithEmoji.parse(emojiParagraph, done);
    });

    bench('A paragraph (5 sentences, 100 words, no emojis)', function (done) {
        retextWithEmoji.parse(paragraph, done);
    });
});
