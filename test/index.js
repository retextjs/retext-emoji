/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module retext:emoji
 * @fileoverview Test suite for retext-emoji.
 */

'use strict';

/* eslint-env node, mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var visit = require('unist-util-visit');
var retext = require('retext');
var emoji = require('..');

/*
 * Methods.
 */

var dequal = assert.deepEqual;
var equal = assert.strictEqual;
var throws = assert.throws;

/*
 * Retext.
 */

var encode = retext().use(emoji, {
    'convert': 'encode'
});

var decode = retext().use(emoji, {
    'convert': 'decode'
});

var neutral = retext().use(emoji);

/*
 * Helpers.
 */

/**
 * Helper to access CST after processing.
 */
function process(doc, processor) {
    var cst;

    processor.process(doc, function (err, file) {
        assert.ifError(err);

        cst = file.namespace('retext').cst;
    });

    visit(cst, 'EmoticonNode', function (node) {
        assert('data' in node);
        equal(typeof node.data.description, 'string');

        ['names', 'tags'].forEach(function (type) {
            var value = node.data[type];
            assert(Array.isArray(value));

            value.forEach(function (subvalue) {
                equal(typeof subvalue, 'string');
            })
        });
    });

    return cst;
}

/*
 * Tests.
 */

describe('retext-emoji', function () {
    it('should throw when given invalid `convert`', function () {
        throws(function () {
            retext.use(emoji, {
                'convert': false
            });
        }, /Illegal invocation: `false` is not a valid value/);
    });

    it('should classify emoticons', function () {
        var node = process('This makes me feel :).', neutral);

        dequal(node, require('./fixture/emoticon'));
    });

    it('should classify gemoji', function () {
        var node = process('This makes me feel :sob:.', neutral);

        dequal(node, require('./fixture/gemoji'));
    });

    it('should classify emoji', function () {
        var node = process('It’s raining 🐱s and 🐶s.', neutral);

        dequal(node, require('./fixture/emoji'));
    });

    it('should not transform without `convert`', function () {
        equal(neutral.process(
            'It’s raining 🐱s and :dog:s. Now :3.'
        ), 'It’s raining 🐱s and :dog:s. Now :3.');
    });

    it('should encode', function () {
        equal(encode.process(
            'It’s raining 🐱s and :dog:s. Now :3.'
        ), 'It’s raining 🐱s and 🐶s. Now 👨.');
    });

    it('should decode', function () {
        equal(decode.process(
            'It’s raining 🐱s and :dog:s. Now :3.'
        ), 'It’s raining :cat:s and :dog:s. Now :man:.');
    });

    /*
     * Note that this is a coverage test.
     */

    it('should not overwrite existing data', function () {
        var processor = retext().use(function () {
            return function (node) {
                visit(node, function (child) {
                    child.data = {};
                });
            };
        }).use(emoji);

        equal(
            processor.process('It’s raining 🐱s and :dog:s. Now :3.'),
            'It’s raining 🐱s and :dog:s. Now :3.'
        );
    });
});
