/* eslint-env browser */

/**
 * @import {Root} from 'nlcst'
 * @import {Options} from 'retext-emoji'
 * @import {Processor} from 'unified'
 */

import {ok as assert} from 'devlop'
import retextEmoji from 'retext-emoji'
import retextEnglish from 'retext-english'
import retextStringify from 'retext-stringify'
import {unified} from 'unified'

const $convert = document.getElementsByName('convert')[0]
const $areas = document.querySelectorAll('textarea')

const $input = $areas[0]
const $output = $areas[1]

/** @type {Processor<Root, Root, undefined, Root, string> | undefined} */
let processor

/** @type {{options: Options}} */
const state = {options: {}}

$convert.addEventListener('change', onchange)
$input.addEventListener('input', oninput)

onchange({target: $convert})

/**
 * @param {{target: EventTarget | null}} event
 * @returns {undefined}
 */
function onchange(event) {
  // This is all just because TS doesn’t understand normal code.
  const target = /** @type {HTMLSelectElement} */ (event.target)

  const selectedOption = target.selectedOptions[0]

  if (selectedOption) {
    assert(target.name === 'convert')
    assert(
      selectedOption.value === 'decode' || selectedOption.value === 'encode'
    )
    state.options[target.name] = selectedOption.value
  }

  processor = unified()
    .use(retextEnglish)
    .use(retextEmoji, state.options)
    .use(retextStringify)

  oninput()
}

function oninput() {
  assert(processor)
  $output.value = processor.processSync($input.value).toString()
}
