'use strict'

/* eslint-env browser */

var unified = require('unified')
var english = require('retext-english')
var stringify = require('retext-stringify')
var emoji = require('retext-emoji')

var $convert = document.getElementsByName('convert')[0]
var $areas = document.querySelectorAll('textarea')

var $input = $areas[0]
var $output = $areas[1]

var processor
var state = {options: {}}

$convert.addEventListener('change', onchange)

$input.addEventListener('input', oninput)

onchange({target: $convert})

function onchange(event) {
  var value = event.target.selectedOptions[0]

  if (value) {
    state.options[event.target.name] = value.value
  }

  processor = unified()
    .use(english)
    .use(emoji, state.options)
    .use(stringify)

  oninput()
}

function oninput() {
  $output.value = processor.processSync($input.value).toString()
}
