// Dependencies:
var retext = require('retext');
var emoji = require('./index.js');

// Process:
var file = retext()
    .use(emoji, {convert: 'encode'})
    .process('I’m going to bed. :zzz:');

// Yields:
console.log('text', String(file));
