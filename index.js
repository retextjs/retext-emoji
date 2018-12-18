'use strict';

var retext = require('retext');
var emoji = require('retext-emoji');

retext().use(emoji);

var $convert = document.getElementsByName('convert')[0];
var $areas = document.getElementsByTagName('textarea');
var $input = $areas[0];
var $output = $areas[1];

$convert.addEventListener('change', oninputchange);
$input.addEventListener('input', oninputchange);

oninputchange();

function oninputchange() {
  var state = $convert.selectedOptions[0].value;
  var processor = retext().use(emoji, {convert : state});

  $output.value = processor.processSync($input.value);
}
