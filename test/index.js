'use strict';

var test = require('tape');
var retext = require('retext');
var visit = require('unist-util-visit');
var emoji = require('..');

var emoticon = require('./fixture/emoticon');
var emojis = require('./fixture/emoji');
var gemoji = require('./fixture/gemoji');

test('toString()', function (t) {
  t.test('should throw when given invalid `convert`', function (st) {
    st.throws(
      function () {
        retext().use(emoji, {convert: false}).freeze();
      },
      /Illegal invocation: `false` is not a valid value/
    );

    st.end();
  });

  t.test('should throw when given invalid `modifier fn`', function (st) {
    st.throws(
      function () {
        retext().use(emoji, {emojiModifierFn: 'InvalidFnName'}).freeze();
      },
      /Illegal invocation: `InvalidFnName` is not a valid value/
    );

    st.end();
  });

  t.test('should classify emoticons', function (st) {
    var processor = retext().use(emoji);
    var tree = processor.parse('This makes me feel :).');

    processor.run(tree);

    st.deepEqual(tree, emoticon);

    st.end();
  });

  t.test('should classify gemoji', function (st) {
    var processor = retext().use(emoji);
    var tree = processor.parse('This makes me feel :sob:.');

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
    var output = processor.processSync(input).toString();

    st.equal(output, input);

    st.end();
  });

  t.test('should encode', function (st) {
    var processor = retext().use(emoji, {convert: 'encode'});

    st.equal(
      processor.processSync('It’s raining 🐱s and :dog:s. Now :3.').toString(),
      'It’s raining 🐱s and 🐶s. Now 👨.'
    );

    st.end();
  });

  t.test('should decode', function (st) {
    var processor = retext().use(emoji, {convert: 'decode'});

    st.equal(
      processor.processSync('It’s raining 🐱s and :dog:s. Now :3.').toString(),
      'It’s raining :cat:s and :dog:s. Now :man:.'
    );

    st.end();
  });

  t.test('should not encode things that are not emojis', function (st) {
    var processor = retext().use(emoji, {
      convert: 'encode',
      emoticonModifierFn: 'use',
      affixEmoticonModifier: 'use',
      emojiModifier: 'useFirst'
    });

    st.equal(
      processor.processSync('Beautiful URL https://www.example.org?dl=0 :)').toString(),
      'Beautiful URL https://www.example.org?dl=0 😃'
    );

    st.end();
  });

  t.test('should not error on emojis only', function (st) {
    var processor = retext().use(emoji, {convert: 'encode'});

    st.equal(
      processor.processSync('☕️☕️☕️☕️').toString(),
      '☕️☕️☕️☕️'
    );

    st.end();
  });

  t.test('should not overwrite existing data', function (st) {
    var processor = retext()
      .use(function () {
        return transformer;
        function transformer(node) {
          visit(node, visitor);
        }
        function visitor(child) {
          child.data = {};
        }
      })
      .use(emoji);

    st.equal(
      processor.processSync('It’s raining 🐱s and :dog:s. Now :3.').toString(),
      'It’s raining 🐱s and :dog:s. Now :3.'
    );

    st.end();
  });

  t.end();
});
