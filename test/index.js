/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module nlcst:to-string
 * @fileoverview Test suite for `retext-emoji`.
 */

'use strict';

/* eslint-env node */
/* jscs:disable jsDoc */
/* jscs:disable maximumLineLength */

/* Dependencies. */
var test = require('tape');
var retext = require('retext');
var visit = require('unist-util-visit');
var emoji = require('..');

/* Fixtures. */
var emoticon = require('./fixture/emoticon');
var emojis = require('./fixture/emoji');
var gemoji = require('./fixture/gemoji');

/* Tests. */
test('toString()', function (t) {
    t.test('should throw when given invalid `convert`', function (st) {
        st.throws(function () {
            retext().use(emoji, {
                convert: false
            });
        }, /Illegal invocation: `false` is not a valid value/);

        st.end();
    });

    t.test('should classify emoticons', function (st) {
        var processor = retext().use(emoji);
        var tree = processor.parse('This makes me feel :).')

        processor.run(tree);

        st.deepEqual(tree, emoticon);

        st.end();
    });

    t.test('should classify gemoji', function (st) {
        var processor = retext().use(emoji);
        var tree = processor.parse('This makes me feel :sob:.')

        processor.run(tree);

        st.deepEqual(tree, gemoji);

        st.end();
    });

    t.test('should classify emoji', function (st) {
        var processor = retext().use(emoji);
        var tree = processor.parse('It’s raining 🐱s and 🐶s.');

        processor.run(tree);

        st.deepEqual(tree, emojis);

        st.end();
    });

    t.test('should not transform without `convert`', function (st) {
        var processor = retext().use(emoji);
        var input = 'It’s raining 🐱s and :dog:s. Now :3.';
        var output = processor.process(input).toString();

        st.equal(output, input);

        st.end();
    });

    t.test('should encode', function (st) {
        var processor = retext().use(emoji, {convert: 'encode'});

        st.equal(
            processor.process(
                'It’s raining 🐱s and :dog:s. Now :3.'
            ).toString(),
            'It’s raining 🐱s and 🐶s. Now 👨.'
        );

        st.end();
    });

    t.test('should decode', function (st) {
        var processor = retext().use(emoji, {convert: 'decode'});

        st.equal(
            processor.process(
                'It’s raining 🐱s and :dog:s. Now :3.'
            ).toString(),
            'It’s raining :cat:s and :dog:s. Now :man:.'
        );

        st.end();
    });

    t.test('should not overwrite existing data', function (st) {
        var processor = retext()
            .use(function () {
                return function (node) {
                    visit(node, function (child) {
                        child.data = {};
                    });
                };
            })
            .use(emoji);

        st.equal(
            processor.process(
                'It’s raining 🐱s and :dog:s. Now :3.'
            ).toString(),
            'It’s raining 🐱s and :dog:s. Now :3.'
        );

        st.end();
    });

    t.end();
});
