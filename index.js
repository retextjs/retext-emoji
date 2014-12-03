/**
 * Dependencies.
 */

var Retext = require('wooorm/retext@0.4.0');
var emoji = require('wooorm/retext-emoji@0.5.2');

/**
 * Retext.
 */

var retext;

/**
 * DOM elements.
 */

var $input = document.getElementsByTagName('textarea')[0];
var $output = document.getElementsByTagName('textarea')[1];
var $convert = document.getElementsByName('convert')[0];

/**
 * Event handlers
 */

function onconvertchange() {
    var value = $convert.selectedOptions[0];

    if (!value) {
        return;
    }

    value = value.value;

    retext = new Retext().use(emoji, {
        'convert' : value
    });

    emojify();
}

/**
 * Emojify input.
 */

function emojify(value) {
    retext.parse($input.value, function (err, tree) {
        if (err) throw err;

        $output.value = tree;
    });
}

/**
 * Attach event handlers.
 */

$convert.addEventListener('change', onconvertchange);

$input.addEventListener('input', emojify);

/**
 * Provide initial emoji-fication.
 */

onconvertchange();
