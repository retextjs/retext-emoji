(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

/*

var file = retext()
  .use(emoji, {convert: 'encode'})
  .processSync('I’m going to bed. :zzz:')
*/

function oninputchange() {
  var state = $convert.selectedOptions[0].value;
  var processor = retext().use(emoji, {convert : state});

  $output.value = processor.processSync($input.value);
}

},{"retext":44,"retext-emoji":41}],2:[function(require,module,exports){
'use strict'

module.exports = iterate

var own = {}.hasOwnProperty

function iterate(values, callback, context) {
  var index = -1
  var result

  if (!values) {
    throw new Error('Iterate requires that |this| not be ' + values)
  }

  if (!own.call(values, 'length')) {
    throw new Error('Iterate requires that |this| has a `length`')
  }

  if (typeof callback !== 'function') {
    throw new Error('`callback` must be a function')
  }

  /* The length might change, so we do not cache it. */
  while (++index < values.length) {
    /* Skip missing values. */
    if (!(index in values)) {
      continue
    }

    result = callback.call(context, values[index], index, values)

    /* If `callback` returns a `number`, move `index` over to
     * `number`. */
    if (typeof result === 'number') {
      /* Make sure that negative numbers do not break the loop. */
      if (result < 0) {
        index = 0
      }

      index = result - 1
    }
  }
}

},{}],3:[function(require,module,exports){
'use strict'

module.exports = bail

function bail(err) {
  if (err) {
    throw err
  }
}

},{}],4:[function(require,module,exports){
module.exports=[
  {
    "name": "angry",
    "emoji": "😠",
    "tags": [
      "mad",
      "annoyed"
    ],
    "description": "angry face",
    "emoticons": [
      ">:(",
      ">:[",
      ">:-(",
      ">:-[",
      ">=(",
      ">=[",
      ">=-(",
      ">=-["
    ]
  },
  {
    "name": "blush",
    "emoji": "😊",
    "tags": [
      "proud"
    ],
    "description": "smiling face with smiling eyes",
    "emoticons": [
      ":\")",
      ":\"]",
      ":\"D",
      ":-\")",
      ":-\"]",
      ":-\"D",
      "=\")",
      "=\"]",
      "=\"D",
      "=-\")",
      "=-\"]",
      "=-\"D"
    ]
  },
  {
    "name": "broken_heart",
    "emoji": "💔",
    "tags": [],
    "description": "broken heart",
    "emoticons": [
      "<\\3",
      "</3"
    ]
  },
  {
    "name": "confused",
    "emoji": "😕",
    "tags": [],
    "description": "confused face",
    "emoticons": [
      ":/",
      ":\\",
      ":-/",
      ":-\\",
      "=/",
      "=\\",
      "=-/",
      "=-\\"
    ]
  },
  {
    "name": "cry",
    "emoji": "😢",
    "tags": [
      "sad",
      "tear"
    ],
    "description": "crying face",
    "emoticons": [
      ":,(",
      ":,[",
      ":,|",
      ":,-(",
      ":,-[",
      ":,-|",
      ":'(",
      ":'[",
      ":'|",
      ":'-(",
      ":'-[",
      ":'-|",
      "=,(",
      "=,[",
      "=,|",
      "=,-(",
      "=,-[",
      "=,-|",
      "='(",
      "='[",
      "='|",
      "='-(",
      "='-[",
      "='-|"
    ]
  },
  {
    "name": "frowning",
    "emoji": "😦",
    "tags": [],
    "description": "frowning face with open mouth",
    "emoticons": [
      ":(",
      ":[",
      ":-(",
      ":-[",
      "=(",
      "=[",
      "=-(",
      "=-["
    ]
  },
  {
    "name": "heart",
    "emoji": "❤️",
    "tags": [
      "love"
    ],
    "description": "red heart",
    "emoticons": [
      "<3"
    ]
  },
  {
    "name": "imp",
    "emoji": "👿",
    "tags": [
      "angry",
      "devil",
      "evil",
      "horns"
    ],
    "description": "angry face with horns",
    "emoticons": [
      "]:(",
      "]:[",
      "]:-(",
      "]:-[",
      "]=(",
      "]=[",
      "]=-(",
      "]=-["
    ]
  },
  {
    "name": "innocent",
    "emoji": "😇",
    "tags": [
      "angel"
    ],
    "description": "smiling face with halo",
    "emoticons": [
      "o:)",
      "o:]",
      "o:D",
      "o:-)",
      "o:-]",
      "o:-D",
      "o=)",
      "o=]",
      "o=D",
      "o=-)",
      "o=-]",
      "o=-D",
      "O:)",
      "O:]",
      "O:D",
      "O:-)",
      "O:-]",
      "O:-D",
      "O=)",
      "O=]",
      "O=D",
      "O=-)",
      "O=-]",
      "O=-D",
      "0:)",
      "0:]",
      "0:D",
      "0:-)",
      "0:-]",
      "0:-D",
      "0=)",
      "0=]",
      "0=D",
      "0=-)",
      "0=-]",
      "0=-D"
    ]
  },
  {
    "name": "joy",
    "emoji": "😂",
    "tags": [
      "tears"
    ],
    "description": "face with tears of joy",
    "emoticons": [
      ":,)",
      ":,]",
      ":,D",
      ":,-)",
      ":,-]",
      ":,-D",
      ":')",
      ":']",
      ":'D",
      ":'-)",
      ":'-]",
      ":'-D",
      "=,)",
      "=,]",
      "=,D",
      "=,-)",
      "=,-]",
      "=,-D",
      "=')",
      "=']",
      "='D",
      "='-)",
      "='-]",
      "='-D"
    ]
  },
  {
    "name": "kissing",
    "emoji": "😗",
    "tags": [],
    "description": "kissing face",
    "emoticons": [
      ":*",
      ":-*",
      "=*",
      "=-*"
    ]
  },
  {
    "name": "laughing",
    "emoji": "😆",
    "tags": [
      "happy",
      "haha"
    ],
    "description": "smiling face with open mouth & closed eyes",
    "emoticons": [
      "x)",
      "x]",
      "xD",
      "x-)",
      "x-]",
      "x-D",
      "X)",
      "X]",
      "X-)",
      "X-]",
      "X-D"
    ]
  },
  {
    "name": "man",
    "emoji": "👨",
    "tags": [
      "mustache",
      "father",
      "dad"
    ],
    "description": "man",
    "emoticons": [
      ":3",
      ":-3",
      "=3",
      "=-3",
      ";3",
      ";-3",
      "x3",
      "x-3",
      "X3",
      "X-3"
    ]
  },
  {
    "name": "neutral_face",
    "emoji": "😐",
    "tags": [
      "meh"
    ],
    "description": "neutral face",
    "emoticons": [
      ":|",
      ":-|",
      "=|",
      "=-|"
    ]
  },
  {
    "name": "no_mouth",
    "emoji": "😶",
    "tags": [
      "mute",
      "silence"
    ],
    "description": "face without mouth",
    "emoticons": [
      ":-"
    ]
  },
  {
    "name": "open_mouth",
    "emoji": "😮",
    "tags": [
      "surprise",
      "impressed",
      "wow"
    ],
    "description": "face with open mouth",
    "emoticons": [
      ":o",
      ":O",
      ":0",
      ":-o",
      ":-O",
      ":-0",
      "=o",
      "=O",
      "=0",
      "=-o",
      "=-O",
      "=-0"
    ]
  },
  {
    "name": "rage",
    "emoji": "😡",
    "tags": [
      "angry"
    ],
    "description": "pouting face",
    "emoticons": [
      ":@",
      ":-@",
      "=@",
      "=-@"
    ]
  },
  {
    "name": "smile",
    "emoji": "😄",
    "tags": [
      "happy",
      "joy",
      "laugh",
      "pleased"
    ],
    "description": "smiling face with open mouth & smiling eyes",
    "emoticons": [
      ":D",
      ":-D",
      "=D",
      "=-D"
    ]
  },
  {
    "name": "smiley",
    "emoji": "😃",
    "tags": [
      "happy",
      "joy",
      "haha"
    ],
    "description": "smiling face with open mouth",
    "emoticons": [
      ":)",
      ":]",
      ":-)",
      ":-]",
      "=)",
      "=]",
      "=-)",
      "=-]"
    ]
  },
  {
    "name": "smiling_imp",
    "emoji": "😈",
    "tags": [
      "devil",
      "evil",
      "horns"
    ],
    "description": "smiling face with horns",
    "emoticons": [
      "]:)",
      "]:]",
      "]:D",
      "]:-)",
      "]:-]",
      "]:-D",
      "]=)",
      "]=]",
      "]=D",
      "]=-)",
      "]=-]",
      "]=-D"
    ]
  },
  {
    "name": "sob",
    "emoji": "😭",
    "tags": [
      "sad",
      "cry",
      "bawling"
    ],
    "description": "loudly crying face",
    "emoticons": [
      ":,'(",
      ":,'[",
      ":,'-(",
      ":,'-[",
      ":',(",
      ":',[",
      ":',-(",
      ":',-[",
      "=,'(",
      "=,'[",
      "=,'-(",
      "=,'-[",
      "=',(",
      "=',[",
      "=',-(",
      "=',-["
    ]
  },
  {
    "name": "stuck_out_tongue",
    "emoji": "😛",
    "tags": [],
    "description": "face with stuck-out tongue",
    "emoticons": [
      ":p",
      ":P",
      ":d",
      ":-p",
      ":-P",
      ":-d",
      "=p",
      "=P",
      "=d",
      "=-p",
      "=-P",
      "=-d"
    ]
  },
  {
    "name": "stuck_out_tongue_closed_eyes",
    "emoji": "😝",
    "tags": [
      "prank"
    ],
    "description": "face with stuck-out tongue & closed eyes",
    "emoticons": [
      "xP",
      "x-p",
      "x-P",
      "x-d",
      "Xp",
      "Xd",
      "X-p",
      "X-P",
      "X-d"
    ]
  },
  {
    "name": "stuck_out_tongue_winking_eye",
    "emoji": "😜",
    "tags": [
      "prank",
      "silly"
    ],
    "description": "face with stuck-out tongue & winking eye",
    "emoticons": [
      ";p",
      ";P",
      ";d",
      ";-p",
      ";-P",
      ";-d"
    ]
  },
  {
    "name": "sunglasses",
    "emoji": "😎",
    "tags": [
      "cool"
    ],
    "description": "smiling face with sunglasses",
    "emoticons": [
      "8)",
      "8]",
      "8D",
      "8-)",
      "8-]",
      "8-D",
      "B)",
      "B]",
      "B-)",
      "B-]",
      "B-D"
    ]
  },
  {
    "name": "sweat",
    "emoji": "😓",
    "tags": [],
    "description": "face with cold sweat",
    "emoticons": [
      ",:(",
      ",:[",
      ",:-(",
      ",:-[",
      ",=(",
      ",=[",
      ",=-(",
      ",=-[",
      "':(",
      "':[",
      "':-(",
      "':-[",
      "'=(",
      "'=[",
      "'=-(",
      "'=-["
    ]
  },
  {
    "name": "sweat_smile",
    "emoji": "😅",
    "tags": [
      "hot"
    ],
    "description": "smiling face with open mouth & cold sweat",
    "emoticons": [
      ",:)",
      ",:]",
      ",:D",
      ",:-)",
      ",:-]",
      ",:-D",
      ",=)",
      ",=]",
      ",=D",
      ",=-)",
      ",=-]",
      ",=-D",
      "':)",
      "':]",
      "':D",
      "':-)",
      "':-]",
      "':-D",
      "'=)",
      "'=]",
      "'=D",
      "'=-)",
      "'=-]",
      "'=-D"
    ]
  },
  {
    "name": "unamused",
    "emoji": "😒",
    "tags": [
      "meh"
    ],
    "description": "unamused face",
    "emoticons": [
      ":$",
      ":s",
      ":z",
      ":S",
      ":Z",
      ":-$",
      ":-s",
      ":-z",
      ":-S",
      ":-Z",
      "=$",
      "=s",
      "=z",
      "=S",
      "=Z",
      "=-$",
      "=-s",
      "=-z",
      "=-S",
      "=-Z"
    ]
  },
  {
    "name": "wink",
    "emoji": "😉",
    "tags": [
      "flirt"
    ],
    "description": "winking face",
    "emoticons": [
      ";)",
      ";]",
      ";D",
      ";-)",
      ";-]",
      ";-D"
    ]
  }
]

},{}],5:[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

},{}],6:[function(require,module,exports){
module.exports={
  "😀": {
    "category": "people",
    "description": "grinning face",
    "names": [
      "grinning"
    ],
    "tags": [
      "smile",
      "happy"
    ]
  },
  "😃": {
    "category": "people",
    "description": "smiling face with open mouth",
    "names": [
      "smiley"
    ],
    "tags": [
      "happy",
      "joy",
      "haha"
    ]
  },
  "😄": {
    "category": "people",
    "description": "smiling face with open mouth & smiling eyes",
    "names": [
      "smile"
    ],
    "tags": [
      "happy",
      "joy",
      "laugh",
      "pleased"
    ]
  },
  "😁": {
    "category": "people",
    "description": "grinning face with smiling eyes",
    "names": [
      "grin"
    ],
    "tags": []
  },
  "😆": {
    "category": "people",
    "description": "smiling face with open mouth & closed eyes",
    "names": [
      "laughing",
      "satisfied"
    ],
    "tags": [
      "happy",
      "haha"
    ]
  },
  "😅": {
    "category": "people",
    "description": "smiling face with open mouth & cold sweat",
    "names": [
      "sweat_smile"
    ],
    "tags": [
      "hot"
    ]
  },
  "😂": {
    "category": "people",
    "description": "face with tears of joy",
    "names": [
      "joy"
    ],
    "tags": [
      "tears"
    ]
  },
  "🤣": {
    "category": "people",
    "description": "rolling on the floor laughing",
    "names": [
      "rofl"
    ],
    "tags": [
      "lol",
      "laughing"
    ]
  },
  "☺️": {
    "category": "people",
    "description": "smiling face",
    "names": [
      "relaxed"
    ],
    "tags": [
      "blush",
      "pleased"
    ]
  },
  "😊": {
    "category": "people",
    "description": "smiling face with smiling eyes",
    "names": [
      "blush"
    ],
    "tags": [
      "proud"
    ]
  },
  "😇": {
    "category": "people",
    "description": "smiling face with halo",
    "names": [
      "innocent"
    ],
    "tags": [
      "angel"
    ]
  },
  "🙂": {
    "category": "people",
    "description": "slightly smiling face",
    "names": [
      "slightly_smiling_face"
    ],
    "tags": []
  },
  "🙃": {
    "category": "people",
    "description": "upside-down face",
    "names": [
      "upside_down_face"
    ],
    "tags": []
  },
  "😉": {
    "category": "people",
    "description": "winking face",
    "names": [
      "wink"
    ],
    "tags": [
      "flirt"
    ]
  },
  "😌": {
    "category": "people",
    "description": "relieved face",
    "names": [
      "relieved"
    ],
    "tags": [
      "whew"
    ]
  },
  "😍": {
    "category": "people",
    "description": "smiling face with heart-eyes",
    "names": [
      "heart_eyes"
    ],
    "tags": [
      "love",
      "crush"
    ]
  },
  "😘": {
    "category": "people",
    "description": "face blowing a kiss",
    "names": [
      "kissing_heart"
    ],
    "tags": [
      "flirt"
    ]
  },
  "😗": {
    "category": "people",
    "description": "kissing face",
    "names": [
      "kissing"
    ],
    "tags": []
  },
  "😙": {
    "category": "people",
    "description": "kissing face with smiling eyes",
    "names": [
      "kissing_smiling_eyes"
    ],
    "tags": []
  },
  "😚": {
    "category": "people",
    "description": "kissing face with closed eyes",
    "names": [
      "kissing_closed_eyes"
    ],
    "tags": []
  },
  "😋": {
    "category": "people",
    "description": "face savouring delicious food",
    "names": [
      "yum"
    ],
    "tags": [
      "tongue",
      "lick"
    ]
  },
  "😜": {
    "category": "people",
    "description": "face with stuck-out tongue & winking eye",
    "names": [
      "stuck_out_tongue_winking_eye"
    ],
    "tags": [
      "prank",
      "silly"
    ]
  },
  "😝": {
    "category": "people",
    "description": "face with stuck-out tongue & closed eyes",
    "names": [
      "stuck_out_tongue_closed_eyes"
    ],
    "tags": [
      "prank"
    ]
  },
  "😛": {
    "category": "people",
    "description": "face with stuck-out tongue",
    "names": [
      "stuck_out_tongue"
    ],
    "tags": []
  },
  "🤑": {
    "category": "people",
    "description": "money-mouth face",
    "names": [
      "money_mouth_face"
    ],
    "tags": [
      "rich"
    ]
  },
  "🤗": {
    "category": "people",
    "description": "hugging face",
    "names": [
      "hugs"
    ],
    "tags": []
  },
  "🤓": {
    "category": "people",
    "description": "nerd face",
    "names": [
      "nerd_face"
    ],
    "tags": [
      "geek",
      "glasses"
    ]
  },
  "😎": {
    "category": "people",
    "description": "smiling face with sunglasses",
    "names": [
      "sunglasses"
    ],
    "tags": [
      "cool"
    ]
  },
  "🤡": {
    "category": "people",
    "description": "clown face",
    "names": [
      "clown_face"
    ],
    "tags": []
  },
  "🤠": {
    "category": "people",
    "description": "cowboy hat face",
    "names": [
      "cowboy_hat_face"
    ],
    "tags": []
  },
  "😏": {
    "category": "people",
    "description": "smirking face",
    "names": [
      "smirk"
    ],
    "tags": [
      "smug"
    ]
  },
  "😒": {
    "category": "people",
    "description": "unamused face",
    "names": [
      "unamused"
    ],
    "tags": [
      "meh"
    ]
  },
  "😞": {
    "category": "people",
    "description": "disappointed face",
    "names": [
      "disappointed"
    ],
    "tags": [
      "sad"
    ]
  },
  "😔": {
    "category": "people",
    "description": "pensive face",
    "names": [
      "pensive"
    ],
    "tags": []
  },
  "😟": {
    "category": "people",
    "description": "worried face",
    "names": [
      "worried"
    ],
    "tags": [
      "nervous"
    ]
  },
  "😕": {
    "category": "people",
    "description": "confused face",
    "names": [
      "confused"
    ],
    "tags": []
  },
  "🙁": {
    "category": "people",
    "description": "slightly frowning face",
    "names": [
      "slightly_frowning_face"
    ],
    "tags": []
  },
  "☹️": {
    "category": "people",
    "description": "frowning face",
    "names": [
      "frowning_face"
    ],
    "tags": []
  },
  "😣": {
    "category": "people",
    "description": "persevering face",
    "names": [
      "persevere"
    ],
    "tags": [
      "struggling"
    ]
  },
  "😖": {
    "category": "people",
    "description": "confounded face",
    "names": [
      "confounded"
    ],
    "tags": []
  },
  "😫": {
    "category": "people",
    "description": "tired face",
    "names": [
      "tired_face"
    ],
    "tags": [
      "upset",
      "whine"
    ]
  },
  "😩": {
    "category": "people",
    "description": "weary face",
    "names": [
      "weary"
    ],
    "tags": [
      "tired"
    ]
  },
  "😤": {
    "category": "people",
    "description": "face with steam from nose",
    "names": [
      "triumph"
    ],
    "tags": [
      "smug"
    ]
  },
  "😠": {
    "category": "people",
    "description": "angry face",
    "names": [
      "angry"
    ],
    "tags": [
      "mad",
      "annoyed"
    ]
  },
  "😡": {
    "category": "people",
    "description": "pouting face",
    "names": [
      "rage",
      "pout"
    ],
    "tags": [
      "angry"
    ]
  },
  "😶": {
    "category": "people",
    "description": "face without mouth",
    "names": [
      "no_mouth"
    ],
    "tags": [
      "mute",
      "silence"
    ]
  },
  "😐": {
    "category": "people",
    "description": "neutral face",
    "names": [
      "neutral_face"
    ],
    "tags": [
      "meh"
    ]
  },
  "😑": {
    "category": "people",
    "description": "expressionless face",
    "names": [
      "expressionless"
    ],
    "tags": []
  },
  "😯": {
    "category": "people",
    "description": "hushed face",
    "names": [
      "hushed"
    ],
    "tags": [
      "silence",
      "speechless"
    ]
  },
  "😦": {
    "category": "people",
    "description": "frowning face with open mouth",
    "names": [
      "frowning"
    ],
    "tags": []
  },
  "😧": {
    "category": "people",
    "description": "anguished face",
    "names": [
      "anguished"
    ],
    "tags": [
      "stunned"
    ]
  },
  "😮": {
    "category": "people",
    "description": "face with open mouth",
    "names": [
      "open_mouth"
    ],
    "tags": [
      "surprise",
      "impressed",
      "wow"
    ]
  },
  "😲": {
    "category": "people",
    "description": "astonished face",
    "names": [
      "astonished"
    ],
    "tags": [
      "amazed",
      "gasp"
    ]
  },
  "😵": {
    "category": "people",
    "description": "dizzy face",
    "names": [
      "dizzy_face"
    ],
    "tags": []
  },
  "😳": {
    "category": "people",
    "description": "flushed face",
    "names": [
      "flushed"
    ],
    "tags": []
  },
  "😱": {
    "category": "people",
    "description": "face screaming in fear",
    "names": [
      "scream"
    ],
    "tags": [
      "horror",
      "shocked"
    ]
  },
  "😨": {
    "category": "people",
    "description": "fearful face",
    "names": [
      "fearful"
    ],
    "tags": [
      "scared",
      "shocked",
      "oops"
    ]
  },
  "😰": {
    "category": "people",
    "description": "face with open mouth & cold sweat",
    "names": [
      "cold_sweat"
    ],
    "tags": [
      "nervous"
    ]
  },
  "😢": {
    "category": "people",
    "description": "crying face",
    "names": [
      "cry"
    ],
    "tags": [
      "sad",
      "tear"
    ]
  },
  "😥": {
    "category": "people",
    "description": "disappointed but relieved face",
    "names": [
      "disappointed_relieved"
    ],
    "tags": [
      "phew",
      "sweat",
      "nervous"
    ]
  },
  "🤤": {
    "category": "people",
    "description": "drooling face",
    "names": [
      "drooling_face"
    ],
    "tags": []
  },
  "😭": {
    "category": "people",
    "description": "loudly crying face",
    "names": [
      "sob"
    ],
    "tags": [
      "sad",
      "cry",
      "bawling"
    ]
  },
  "😓": {
    "category": "people",
    "description": "face with cold sweat",
    "names": [
      "sweat"
    ],
    "tags": []
  },
  "😪": {
    "category": "people",
    "description": "sleepy face",
    "names": [
      "sleepy"
    ],
    "tags": [
      "tired"
    ]
  },
  "😴": {
    "category": "people",
    "description": "sleeping face",
    "names": [
      "sleeping"
    ],
    "tags": [
      "zzz"
    ]
  },
  "🙄": {
    "category": "people",
    "description": "face with rolling eyes",
    "names": [
      "roll_eyes"
    ],
    "tags": []
  },
  "🤔": {
    "category": "people",
    "description": "thinking face",
    "names": [
      "thinking"
    ],
    "tags": []
  },
  "🤥": {
    "category": "people",
    "description": "lying face",
    "names": [
      "lying_face"
    ],
    "tags": [
      "liar"
    ]
  },
  "😬": {
    "category": "people",
    "description": "grimacing face",
    "names": [
      "grimacing"
    ],
    "tags": []
  },
  "🤐": {
    "category": "people",
    "description": "zipper-mouth face",
    "names": [
      "zipper_mouth_face"
    ],
    "tags": [
      "silence",
      "hush"
    ]
  },
  "🤢": {
    "category": "people",
    "description": "nauseated face",
    "names": [
      "nauseated_face"
    ],
    "tags": [
      "sick",
      "barf",
      "disgusted"
    ]
  },
  "🤧": {
    "category": "people",
    "description": "sneezing face",
    "names": [
      "sneezing_face"
    ],
    "tags": [
      "achoo",
      "sick"
    ]
  },
  "😷": {
    "category": "people",
    "description": "face with medical mask",
    "names": [
      "mask"
    ],
    "tags": [
      "sick",
      "ill"
    ]
  },
  "🤒": {
    "category": "people",
    "description": "face with thermometer",
    "names": [
      "face_with_thermometer"
    ],
    "tags": [
      "sick"
    ]
  },
  "🤕": {
    "category": "people",
    "description": "face with head-bandage",
    "names": [
      "face_with_head_bandage"
    ],
    "tags": [
      "hurt"
    ]
  },
  "😈": {
    "category": "people",
    "description": "smiling face with horns",
    "names": [
      "smiling_imp"
    ],
    "tags": [
      "devil",
      "evil",
      "horns"
    ]
  },
  "👿": {
    "category": "people",
    "description": "angry face with horns",
    "names": [
      "imp"
    ],
    "tags": [
      "angry",
      "devil",
      "evil",
      "horns"
    ]
  },
  "👹": {
    "category": "people",
    "description": "ogre",
    "names": [
      "japanese_ogre"
    ],
    "tags": [
      "monster"
    ]
  },
  "👺": {
    "category": "people",
    "description": "goblin",
    "names": [
      "japanese_goblin"
    ],
    "tags": []
  },
  "💩": {
    "category": "people",
    "description": "pile of poo",
    "names": [
      "hankey",
      "poop",
      "shit"
    ],
    "tags": [
      "crap"
    ]
  },
  "👻": {
    "category": "people",
    "description": "ghost",
    "names": [
      "ghost"
    ],
    "tags": [
      "halloween"
    ]
  },
  "💀": {
    "category": "people",
    "description": "skull",
    "names": [
      "skull"
    ],
    "tags": [
      "dead",
      "danger",
      "poison"
    ]
  },
  "☠️": {
    "category": "people",
    "description": "skull and crossbones",
    "names": [
      "skull_and_crossbones"
    ],
    "tags": [
      "danger",
      "pirate"
    ]
  },
  "👽": {
    "category": "people",
    "description": "alien",
    "names": [
      "alien"
    ],
    "tags": [
      "ufo"
    ]
  },
  "👾": {
    "category": "people",
    "description": "alien monster",
    "names": [
      "space_invader"
    ],
    "tags": [
      "game",
      "retro"
    ]
  },
  "🤖": {
    "category": "people",
    "description": "robot face",
    "names": [
      "robot"
    ],
    "tags": []
  },
  "🎃": {
    "category": "people",
    "description": "jack-o-lantern",
    "names": [
      "jack_o_lantern"
    ],
    "tags": [
      "halloween"
    ]
  },
  "😺": {
    "category": "people",
    "description": "smiling cat face with open mouth",
    "names": [
      "smiley_cat"
    ],
    "tags": []
  },
  "😸": {
    "category": "people",
    "description": "grinning cat face with smiling eyes",
    "names": [
      "smile_cat"
    ],
    "tags": []
  },
  "😹": {
    "category": "people",
    "description": "cat face with tears of joy",
    "names": [
      "joy_cat"
    ],
    "tags": []
  },
  "😻": {
    "category": "people",
    "description": "smiling cat face with heart-eyes",
    "names": [
      "heart_eyes_cat"
    ],
    "tags": []
  },
  "😼": {
    "category": "people",
    "description": "cat face with wry smile",
    "names": [
      "smirk_cat"
    ],
    "tags": []
  },
  "😽": {
    "category": "people",
    "description": "kissing cat face with closed eyes",
    "names": [
      "kissing_cat"
    ],
    "tags": []
  },
  "🙀": {
    "category": "people",
    "description": "weary cat face",
    "names": [
      "scream_cat"
    ],
    "tags": [
      "horror"
    ]
  },
  "😿": {
    "category": "people",
    "description": "crying cat face",
    "names": [
      "crying_cat_face"
    ],
    "tags": [
      "sad",
      "tear"
    ]
  },
  "😾": {
    "category": "people",
    "description": "pouting cat face",
    "names": [
      "pouting_cat"
    ],
    "tags": []
  },
  "👐": {
    "category": "people",
    "description": "open hands",
    "names": [
      "open_hands"
    ],
    "tags": []
  },
  "🙌": {
    "category": "people",
    "description": "raising hands",
    "names": [
      "raised_hands"
    ],
    "tags": [
      "hooray"
    ]
  },
  "👏": {
    "category": "people",
    "description": "clapping hands",
    "names": [
      "clap"
    ],
    "tags": [
      "praise",
      "applause"
    ]
  },
  "🙏": {
    "category": "people",
    "description": "folded hands",
    "names": [
      "pray"
    ],
    "tags": [
      "please",
      "hope",
      "wish"
    ]
  },
  "🤝": {
    "category": "people",
    "description": "handshake",
    "names": [
      "handshake"
    ],
    "tags": [
      "deal"
    ]
  },
  "👍": {
    "category": "people",
    "description": "thumbs up",
    "names": [
      "+1",
      "thumbsup"
    ],
    "tags": [
      "approve",
      "ok"
    ]
  },
  "👎": {
    "category": "people",
    "description": "thumbs down",
    "names": [
      "-1",
      "thumbsdown"
    ],
    "tags": [
      "disapprove",
      "bury"
    ]
  },
  "👊": {
    "category": "people",
    "description": "oncoming fist",
    "names": [
      "fist_oncoming",
      "facepunch",
      "punch"
    ],
    "tags": [
      "attack"
    ]
  },
  "✊": {
    "category": "people",
    "description": "raised fist",
    "names": [
      "fist_raised",
      "fist"
    ],
    "tags": [
      "power"
    ]
  },
  "🤛": {
    "category": "people",
    "description": "left-facing fist",
    "names": [
      "fist_left"
    ],
    "tags": []
  },
  "🤜": {
    "category": "people",
    "description": "right-facing fist",
    "names": [
      "fist_right"
    ],
    "tags": []
  },
  "🤞": {
    "category": "people",
    "description": "crossed fingers",
    "names": [
      "crossed_fingers"
    ],
    "tags": [
      "luck",
      "hopeful"
    ]
  },
  "✌️": {
    "category": "people",
    "description": "victory hand",
    "names": [
      "v"
    ],
    "tags": [
      "victory",
      "peace"
    ]
  },
  "🤘": {
    "category": "people",
    "description": "sign of the horns",
    "names": [
      "metal"
    ],
    "tags": []
  },
  "👌": {
    "category": "people",
    "description": "OK hand",
    "names": [
      "ok_hand"
    ],
    "tags": []
  },
  "👈": {
    "category": "people",
    "description": "backhand index pointing left",
    "names": [
      "point_left"
    ],
    "tags": []
  },
  "👉": {
    "category": "people",
    "description": "backhand index pointing right",
    "names": [
      "point_right"
    ],
    "tags": []
  },
  "👆": {
    "category": "people",
    "description": "backhand index pointing up",
    "names": [
      "point_up_2"
    ],
    "tags": []
  },
  "👇": {
    "category": "people",
    "description": "backhand index pointing down",
    "names": [
      "point_down"
    ],
    "tags": []
  },
  "☝️": {
    "category": "people",
    "description": "index pointing up",
    "names": [
      "point_up"
    ],
    "tags": []
  },
  "✋": {
    "category": "people",
    "description": "raised hand",
    "names": [
      "hand",
      "raised_hand"
    ],
    "tags": [
      "highfive",
      "stop"
    ]
  },
  "🤚": {
    "category": "people",
    "description": "raised back of hand",
    "names": [
      "raised_back_of_hand"
    ],
    "tags": []
  },
  "🖐": {
    "category": "people",
    "description": "raised hand with fingers splayed",
    "names": [
      "raised_hand_with_fingers_splayed"
    ],
    "tags": []
  },
  "🖖": {
    "category": "people",
    "description": "vulcan salute",
    "names": [
      "vulcan_salute"
    ],
    "tags": [
      "prosper",
      "spock"
    ]
  },
  "👋": {
    "category": "people",
    "description": "waving hand",
    "names": [
      "wave"
    ],
    "tags": [
      "goodbye"
    ]
  },
  "🤙": {
    "category": "people",
    "description": "call me hand",
    "names": [
      "call_me_hand"
    ],
    "tags": []
  },
  "💪": {
    "category": "people",
    "description": "flexed biceps",
    "names": [
      "muscle"
    ],
    "tags": [
      "flex",
      "bicep",
      "strong",
      "workout"
    ]
  },
  "🖕": {
    "category": "people",
    "description": "middle finger",
    "names": [
      "middle_finger",
      "fu"
    ],
    "tags": []
  },
  "✍️": {
    "category": "people",
    "description": "writing hand",
    "names": [
      "writing_hand"
    ],
    "tags": []
  },
  "🤳": {
    "category": "people",
    "description": "selfie",
    "names": [
      "selfie"
    ],
    "tags": []
  },
  "💅": {
    "category": "people",
    "description": "nail polish",
    "names": [
      "nail_care"
    ],
    "tags": [
      "beauty",
      "manicure"
    ]
  },
  "💍": {
    "category": "people",
    "description": "ring",
    "names": [
      "ring"
    ],
    "tags": [
      "wedding",
      "marriage",
      "engaged"
    ]
  },
  "💄": {
    "category": "people",
    "description": "lipstick",
    "names": [
      "lipstick"
    ],
    "tags": [
      "makeup"
    ]
  },
  "💋": {
    "category": "people",
    "description": "kiss mark",
    "names": [
      "kiss"
    ],
    "tags": [
      "lipstick"
    ]
  },
  "👄": {
    "category": "people",
    "description": "mouth",
    "names": [
      "lips"
    ],
    "tags": [
      "kiss"
    ]
  },
  "👅": {
    "category": "people",
    "description": "tongue",
    "names": [
      "tongue"
    ],
    "tags": [
      "taste"
    ]
  },
  "👂": {
    "category": "people",
    "description": "ear",
    "names": [
      "ear"
    ],
    "tags": [
      "hear",
      "sound",
      "listen"
    ]
  },
  "👃": {
    "category": "people",
    "description": "nose",
    "names": [
      "nose"
    ],
    "tags": [
      "smell"
    ]
  },
  "👣": {
    "category": "people",
    "description": "footprints",
    "names": [
      "footprints"
    ],
    "tags": [
      "feet",
      "tracks"
    ]
  },
  "👁": {
    "category": "people",
    "description": "eye",
    "names": [
      "eye"
    ],
    "tags": []
  },
  "👀": {
    "category": "people",
    "description": "eyes",
    "names": [
      "eyes"
    ],
    "tags": [
      "look",
      "see",
      "watch"
    ]
  },
  "🗣": {
    "category": "people",
    "description": "speaking head",
    "names": [
      "speaking_head"
    ],
    "tags": []
  },
  "👤": {
    "category": "people",
    "description": "bust in silhouette",
    "names": [
      "bust_in_silhouette"
    ],
    "tags": [
      "user"
    ]
  },
  "👥": {
    "category": "people",
    "description": "busts in silhouette",
    "names": [
      "busts_in_silhouette"
    ],
    "tags": [
      "users",
      "group",
      "team"
    ]
  },
  "👶": {
    "category": "people",
    "description": "baby",
    "names": [
      "baby"
    ],
    "tags": [
      "child",
      "newborn"
    ]
  },
  "👦": {
    "category": "people",
    "description": "boy",
    "names": [
      "boy"
    ],
    "tags": [
      "child"
    ]
  },
  "👧": {
    "category": "people",
    "description": "girl",
    "names": [
      "girl"
    ],
    "tags": [
      "child"
    ]
  },
  "👨": {
    "category": "people",
    "description": "man",
    "names": [
      "man"
    ],
    "tags": [
      "mustache",
      "father",
      "dad"
    ]
  },
  "👩": {
    "category": "people",
    "description": "woman",
    "names": [
      "woman"
    ],
    "tags": [
      "girls"
    ]
  },
  "👱‍♀": {
    "category": "people",
    "description": "blond-haired woman",
    "names": [
      "blonde_woman"
    ],
    "tags": []
  },
  "👱": {
    "category": "people",
    "description": "blond-haired person",
    "names": [
      "blonde_man",
      "person_with_blond_hair"
    ],
    "tags": [
      "boy"
    ]
  },
  "👴": {
    "category": "people",
    "description": "old man",
    "names": [
      "older_man"
    ],
    "tags": []
  },
  "👵": {
    "category": "people",
    "description": "old woman",
    "names": [
      "older_woman"
    ],
    "tags": []
  },
  "👲": {
    "category": "people",
    "description": "man with Chinese cap",
    "names": [
      "man_with_gua_pi_mao"
    ],
    "tags": []
  },
  "👳‍♀": {
    "category": "people",
    "description": "woman wearing turban",
    "names": [
      "woman_with_turban"
    ],
    "tags": []
  },
  "👳": {
    "category": "people",
    "description": "person wearing turban",
    "names": [
      "man_with_turban"
    ],
    "tags": []
  },
  "👮‍♀": {
    "category": "people",
    "description": "woman police officer",
    "names": [
      "policewoman"
    ],
    "tags": []
  },
  "👮": {
    "category": "people",
    "description": "police officer",
    "names": [
      "policeman",
      "cop"
    ],
    "tags": [
      "police",
      "law"
    ]
  },
  "👷‍♀": {
    "category": "people",
    "description": "woman construction worker",
    "names": [
      "construction_worker_woman"
    ],
    "tags": []
  },
  "👷": {
    "category": "people",
    "description": "construction worker",
    "names": [
      "construction_worker_man",
      "construction_worker"
    ],
    "tags": [
      "helmet"
    ]
  },
  "💂‍♀": {
    "category": "people",
    "description": "woman guard",
    "names": [
      "guardswoman"
    ],
    "tags": []
  },
  "💂": {
    "category": "people",
    "description": "guard",
    "names": [
      "guardsman"
    ],
    "tags": []
  },
  "🕵️‍♀️": {
    "category": "people",
    "description": "woman detective",
    "names": [
      "female_detective"
    ],
    "tags": [
      "sleuth"
    ]
  },
  "🕵": {
    "category": "people",
    "description": "detective",
    "names": [
      "male_detective",
      "detective"
    ],
    "tags": [
      "sleuth"
    ]
  },
  "👩‍⚕": {
    "category": "people",
    "description": "woman health worker",
    "names": [
      "woman_health_worker"
    ],
    "tags": [
      "doctor",
      "nurse"
    ]
  },
  "👨‍⚕": {
    "category": "people",
    "description": "man health worker",
    "names": [
      "man_health_worker"
    ],
    "tags": [
      "doctor",
      "nurse"
    ]
  },
  "👩‍🌾": {
    "category": "people",
    "description": "woman farmer",
    "names": [
      "woman_farmer"
    ],
    "tags": []
  },
  "👨‍🌾": {
    "category": "people",
    "description": "man farmer",
    "names": [
      "man_farmer"
    ],
    "tags": []
  },
  "👩‍🍳": {
    "category": "people",
    "description": "woman cook",
    "names": [
      "woman_cook"
    ],
    "tags": [
      "chef"
    ]
  },
  "👨‍🍳": {
    "category": "people",
    "description": "man cook",
    "names": [
      "man_cook"
    ],
    "tags": [
      "chef"
    ]
  },
  "👩‍🎓": {
    "category": "people",
    "description": "woman student",
    "names": [
      "woman_student"
    ],
    "tags": [
      "graduation"
    ]
  },
  "👨‍🎓": {
    "category": "people",
    "description": "man student",
    "names": [
      "man_student"
    ],
    "tags": [
      "graduation"
    ]
  },
  "👩‍🎤": {
    "category": "people",
    "description": "woman singer",
    "names": [
      "woman_singer"
    ],
    "tags": [
      "rockstar"
    ]
  },
  "👨‍🎤": {
    "category": "people",
    "description": "man singer",
    "names": [
      "man_singer"
    ],
    "tags": [
      "rockstar"
    ]
  },
  "👩‍🏫": {
    "category": "people",
    "description": "woman teacher",
    "names": [
      "woman_teacher"
    ],
    "tags": [
      "school",
      "professor"
    ]
  },
  "👨‍🏫": {
    "category": "people",
    "description": "man teacher",
    "names": [
      "man_teacher"
    ],
    "tags": [
      "school",
      "professor"
    ]
  },
  "👩‍🏭": {
    "category": "people",
    "description": "woman factory worker",
    "names": [
      "woman_factory_worker"
    ],
    "tags": []
  },
  "👨‍🏭": {
    "category": "people",
    "description": "man factory worker",
    "names": [
      "man_factory_worker"
    ],
    "tags": []
  },
  "👩‍💻": {
    "category": "people",
    "description": "woman technologist",
    "names": [
      "woman_technologist"
    ],
    "tags": [
      "coder"
    ]
  },
  "👨‍💻": {
    "category": "people",
    "description": "man technologist",
    "names": [
      "man_technologist"
    ],
    "tags": [
      "coder"
    ]
  },
  "👩‍💼": {
    "category": "people",
    "description": "woman office worker",
    "names": [
      "woman_office_worker"
    ],
    "tags": [
      "business"
    ]
  },
  "👨‍💼": {
    "category": "people",
    "description": "man office worker",
    "names": [
      "man_office_worker"
    ],
    "tags": [
      "business"
    ]
  },
  "👩‍🔧": {
    "category": "people",
    "description": "woman mechanic",
    "names": [
      "woman_mechanic"
    ],
    "tags": []
  },
  "👨‍🔧": {
    "category": "people",
    "description": "man mechanic",
    "names": [
      "man_mechanic"
    ],
    "tags": []
  },
  "👩‍🔬": {
    "category": "people",
    "description": "woman scientist",
    "names": [
      "woman_scientist"
    ],
    "tags": [
      "research"
    ]
  },
  "👨‍🔬": {
    "category": "people",
    "description": "man scientist",
    "names": [
      "man_scientist"
    ],
    "tags": [
      "research"
    ]
  },
  "👩‍🎨": {
    "category": "people",
    "description": "woman artist",
    "names": [
      "woman_artist"
    ],
    "tags": [
      "painter"
    ]
  },
  "👨‍🎨": {
    "category": "people",
    "description": "man artist",
    "names": [
      "man_artist"
    ],
    "tags": [
      "painter"
    ]
  },
  "👩‍🚒": {
    "category": "people",
    "description": "woman firefighter",
    "names": [
      "woman_firefighter"
    ],
    "tags": []
  },
  "👨‍🚒": {
    "category": "people",
    "description": "man firefighter",
    "names": [
      "man_firefighter"
    ],
    "tags": []
  },
  "👩‍✈": {
    "category": "people",
    "description": "woman pilot",
    "names": [
      "woman_pilot"
    ],
    "tags": []
  },
  "👨‍✈": {
    "category": "people",
    "description": "man pilot",
    "names": [
      "man_pilot"
    ],
    "tags": []
  },
  "👩‍🚀": {
    "category": "people",
    "description": "woman astronaut",
    "names": [
      "woman_astronaut"
    ],
    "tags": [
      "space"
    ]
  },
  "👨‍🚀": {
    "category": "people",
    "description": "man astronaut",
    "names": [
      "man_astronaut"
    ],
    "tags": [
      "space"
    ]
  },
  "👩‍⚖": {
    "category": "people",
    "description": "woman judge",
    "names": [
      "woman_judge"
    ],
    "tags": [
      "justice"
    ]
  },
  "👨‍⚖": {
    "category": "people",
    "description": "man judge",
    "names": [
      "man_judge"
    ],
    "tags": [
      "justice"
    ]
  },
  "🤶": {
    "category": "people",
    "description": "Mrs. Claus",
    "names": [
      "mrs_claus"
    ],
    "tags": [
      "santa"
    ]
  },
  "🎅": {
    "category": "people",
    "description": "Santa Claus",
    "names": [
      "santa"
    ],
    "tags": [
      "christmas"
    ]
  },
  "👸": {
    "category": "people",
    "description": "princess",
    "names": [
      "princess"
    ],
    "tags": [
      "blonde",
      "crown",
      "royal"
    ]
  },
  "🤴": {
    "category": "people",
    "description": "prince",
    "names": [
      "prince"
    ],
    "tags": [
      "crown",
      "royal"
    ]
  },
  "👰": {
    "category": "people",
    "description": "bride with veil",
    "names": [
      "bride_with_veil"
    ],
    "tags": [
      "marriage",
      "wedding"
    ]
  },
  "🤵": {
    "category": "people",
    "description": "man in tuxedo",
    "names": [
      "man_in_tuxedo"
    ],
    "tags": [
      "groom",
      "marriage",
      "wedding"
    ]
  },
  "👼": {
    "category": "people",
    "description": "baby angel",
    "names": [
      "angel"
    ],
    "tags": []
  },
  "🤰": {
    "category": "people",
    "description": "pregnant woman",
    "names": [
      "pregnant_woman"
    ],
    "tags": []
  },
  "🙇‍♀": {
    "category": "people",
    "description": "woman bowing",
    "names": [
      "bowing_woman"
    ],
    "tags": [
      "respect",
      "thanks"
    ]
  },
  "🙇": {
    "category": "people",
    "description": "person bowing",
    "names": [
      "bowing_man",
      "bow"
    ],
    "tags": [
      "respect",
      "thanks"
    ]
  },
  "💁": {
    "category": "people",
    "description": "person tipping hand",
    "names": [
      "tipping_hand_woman",
      "information_desk_person",
      "sassy_woman"
    ],
    "tags": []
  },
  "💁‍♂": {
    "category": "people",
    "description": "man tipping hand",
    "names": [
      "tipping_hand_man",
      "sassy_man"
    ],
    "tags": [
      "information"
    ]
  },
  "🙅": {
    "category": "people",
    "description": "person gesturing NO",
    "names": [
      "no_good_woman",
      "no_good",
      "ng_woman"
    ],
    "tags": [
      "stop",
      "halt"
    ]
  },
  "🙅‍♂": {
    "category": "people",
    "description": "man gesturing NO",
    "names": [
      "no_good_man",
      "ng_man"
    ],
    "tags": [
      "stop",
      "halt"
    ]
  },
  "🙆": {
    "category": "people",
    "description": "person gesturing OK",
    "names": [
      "ok_woman"
    ],
    "tags": []
  },
  "🙆‍♂": {
    "category": "people",
    "description": "man gesturing OK",
    "names": [
      "ok_man"
    ],
    "tags": []
  },
  "🙋": {
    "category": "people",
    "description": "person raising hand",
    "names": [
      "raising_hand_woman",
      "raising_hand"
    ],
    "tags": []
  },
  "🙋‍♂": {
    "category": "people",
    "description": "man raising hand",
    "names": [
      "raising_hand_man"
    ],
    "tags": []
  },
  "🤦‍♀": {
    "category": "people",
    "description": "woman facepalming",
    "names": [
      "woman_facepalming"
    ],
    "tags": []
  },
  "🤦‍♂": {
    "category": "people",
    "description": "man facepalming",
    "names": [
      "man_facepalming"
    ],
    "tags": []
  },
  "🤷‍♀": {
    "category": "people",
    "description": "woman shrugging",
    "names": [
      "woman_shrugging"
    ],
    "tags": []
  },
  "🤷‍♂": {
    "category": "people",
    "description": "man shrugging",
    "names": [
      "man_shrugging"
    ],
    "tags": []
  },
  "🙎": {
    "category": "people",
    "description": "person pouting",
    "names": [
      "pouting_woman",
      "person_with_pouting_face"
    ],
    "tags": []
  },
  "🙎‍♂": {
    "category": "people",
    "description": "man pouting",
    "names": [
      "pouting_man"
    ],
    "tags": []
  },
  "🙍": {
    "category": "people",
    "description": "person frowning",
    "names": [
      "frowning_woman",
      "person_frowning"
    ],
    "tags": [
      "sad"
    ]
  },
  "🙍‍♂": {
    "category": "people",
    "description": "man frowning",
    "names": [
      "frowning_man"
    ],
    "tags": []
  },
  "💇": {
    "category": "people",
    "description": "person getting haircut",
    "names": [
      "haircut_woman",
      "haircut"
    ],
    "tags": [
      "beauty"
    ]
  },
  "💇‍♂": {
    "category": "people",
    "description": "man getting haircut",
    "names": [
      "haircut_man"
    ],
    "tags": []
  },
  "💆": {
    "category": "people",
    "description": "person getting massage",
    "names": [
      "massage_woman",
      "massage"
    ],
    "tags": [
      "spa"
    ]
  },
  "💆‍♂": {
    "category": "people",
    "description": "man getting massage",
    "names": [
      "massage_man"
    ],
    "tags": [
      "spa"
    ]
  },
  "🕴": {
    "category": "people",
    "description": "man in business suit levitating",
    "names": [
      "business_suit_levitating"
    ],
    "tags": []
  },
  "💃": {
    "category": "people",
    "description": "woman dancing",
    "names": [
      "dancer"
    ],
    "tags": [
      "dress"
    ]
  },
  "🕺": {
    "category": "people",
    "description": "man dancing",
    "names": [
      "man_dancing"
    ],
    "tags": [
      "dancer"
    ]
  },
  "👯": {
    "category": "people",
    "description": "people with bunny ears partying",
    "names": [
      "dancing_women",
      "dancers"
    ],
    "tags": [
      "bunny"
    ]
  },
  "👯‍♂": {
    "category": "people",
    "description": "men with bunny ears partying",
    "names": [
      "dancing_men"
    ],
    "tags": [
      "bunny"
    ]
  },
  "🚶‍♀": {
    "category": "people",
    "description": "woman walking",
    "names": [
      "walking_woman"
    ],
    "tags": []
  },
  "🚶": {
    "category": "people",
    "description": "person walking",
    "names": [
      "walking_man",
      "walking"
    ],
    "tags": []
  },
  "🏃‍♀": {
    "category": "people",
    "description": "woman running",
    "names": [
      "running_woman"
    ],
    "tags": [
      "exercise",
      "workout",
      "marathon"
    ]
  },
  "🏃": {
    "category": "people",
    "description": "person running",
    "names": [
      "running_man",
      "runner",
      "running"
    ],
    "tags": [
      "exercise",
      "workout",
      "marathon"
    ]
  },
  "👫": {
    "category": "people",
    "description": "man and woman holding hands",
    "names": [
      "couple"
    ],
    "tags": [
      "date"
    ]
  },
  "👭": {
    "category": "people",
    "description": "two women holding hands",
    "names": [
      "two_women_holding_hands"
    ],
    "tags": [
      "couple",
      "date"
    ]
  },
  "👬": {
    "category": "people",
    "description": "two men holding hands",
    "names": [
      "two_men_holding_hands"
    ],
    "tags": [
      "couple",
      "date"
    ]
  },
  "💑": {
    "category": "people",
    "description": "couple with heart",
    "names": [
      "couple_with_heart_woman_man",
      "couple_with_heart"
    ],
    "tags": []
  },
  "👩‍❤️‍👩": {
    "category": "people",
    "description": "couple with heart: woman, woman",
    "names": [
      "couple_with_heart_woman_woman"
    ],
    "tags": []
  },
  "👨‍❤️‍👨": {
    "category": "people",
    "description": "couple with heart: man, man",
    "names": [
      "couple_with_heart_man_man"
    ],
    "tags": []
  },
  "💏": {
    "category": "people",
    "description": "kiss",
    "names": [
      "couplekiss_man_woman"
    ],
    "tags": []
  },
  "👩‍❤️‍💋‍👩": {
    "category": "people",
    "description": "kiss: woman, woman",
    "names": [
      "couplekiss_woman_woman"
    ],
    "tags": []
  },
  "👨‍❤️‍💋‍👨": {
    "category": "people",
    "description": "kiss: man, man",
    "names": [
      "couplekiss_man_man"
    ],
    "tags": []
  },
  "👪": {
    "category": "people",
    "description": "family",
    "names": [
      "family_man_woman_boy",
      "family"
    ],
    "tags": [
      "home",
      "parents",
      "child"
    ]
  },
  "👨‍👩‍👧": {
    "category": "people",
    "description": "family: man, woman, girl",
    "names": [
      "family_man_woman_girl"
    ],
    "tags": []
  },
  "👨‍👩‍👧‍👦": {
    "category": "people",
    "description": "family: man, woman, girl, boy",
    "names": [
      "family_man_woman_girl_boy"
    ],
    "tags": []
  },
  "👨‍👩‍👦‍👦": {
    "category": "people",
    "description": "family: man, woman, boy, boy",
    "names": [
      "family_man_woman_boy_boy"
    ],
    "tags": []
  },
  "👨‍👩‍👧‍👧": {
    "category": "people",
    "description": "family: man, woman, girl, girl",
    "names": [
      "family_man_woman_girl_girl"
    ],
    "tags": []
  },
  "👩‍👩‍👦": {
    "category": "people",
    "description": "family: woman, woman, boy",
    "names": [
      "family_woman_woman_boy"
    ],
    "tags": []
  },
  "👩‍👩‍👧": {
    "category": "people",
    "description": "family: woman, woman, girl",
    "names": [
      "family_woman_woman_girl"
    ],
    "tags": []
  },
  "👩‍👩‍👧‍👦": {
    "category": "people",
    "description": "family: woman, woman, girl, boy",
    "names": [
      "family_woman_woman_girl_boy"
    ],
    "tags": []
  },
  "👩‍👩‍👦‍👦": {
    "category": "people",
    "description": "family: woman, woman, boy, boy",
    "names": [
      "family_woman_woman_boy_boy"
    ],
    "tags": []
  },
  "👩‍👩‍👧‍👧": {
    "category": "people",
    "description": "family: woman, woman, girl, girl",
    "names": [
      "family_woman_woman_girl_girl"
    ],
    "tags": []
  },
  "👨‍👨‍👦": {
    "category": "people",
    "description": "family: man, man, boy",
    "names": [
      "family_man_man_boy"
    ],
    "tags": []
  },
  "👨‍👨‍👧": {
    "category": "people",
    "description": "family: man, man, girl",
    "names": [
      "family_man_man_girl"
    ],
    "tags": []
  },
  "👨‍👨‍👧‍👦": {
    "category": "people",
    "description": "family: man, man, girl, boy",
    "names": [
      "family_man_man_girl_boy"
    ],
    "tags": []
  },
  "👨‍👨‍👦‍👦": {
    "category": "people",
    "description": "family: man, man, boy, boy",
    "names": [
      "family_man_man_boy_boy"
    ],
    "tags": []
  },
  "👨‍👨‍👧‍👧": {
    "category": "people",
    "description": "family: man, man, girl, girl",
    "names": [
      "family_man_man_girl_girl"
    ],
    "tags": []
  },
  "👩‍👦": {
    "category": "people",
    "description": "family: woman, boy",
    "names": [
      "family_woman_boy"
    ],
    "tags": []
  },
  "👩‍👧": {
    "category": "people",
    "description": "family: woman, girl",
    "names": [
      "family_woman_girl"
    ],
    "tags": []
  },
  "👩‍👧‍👦": {
    "category": "people",
    "description": "family: woman, girl, boy",
    "names": [
      "family_woman_girl_boy"
    ],
    "tags": []
  },
  "👩‍👦‍👦": {
    "category": "people",
    "description": "family: woman, boy, boy",
    "names": [
      "family_woman_boy_boy"
    ],
    "tags": []
  },
  "👩‍👧‍👧": {
    "category": "people",
    "description": "family: woman, girl, girl",
    "names": [
      "family_woman_girl_girl"
    ],
    "tags": []
  },
  "👨‍👦": {
    "category": "people",
    "description": "family: man, boy",
    "names": [
      "family_man_boy"
    ],
    "tags": []
  },
  "👨‍👧": {
    "category": "people",
    "description": "family: man, girl",
    "names": [
      "family_man_girl"
    ],
    "tags": []
  },
  "👨‍👧‍👦": {
    "category": "people",
    "description": "family: man, girl, boy",
    "names": [
      "family_man_girl_boy"
    ],
    "tags": []
  },
  "👨‍👦‍👦": {
    "category": "people",
    "description": "family: man, boy, boy",
    "names": [
      "family_man_boy_boy"
    ],
    "tags": []
  },
  "👨‍👧‍👧": {
    "category": "people",
    "description": "family: man, girl, girl",
    "names": [
      "family_man_girl_girl"
    ],
    "tags": []
  },
  "👚": {
    "category": "people",
    "description": "woman’s clothes",
    "names": [
      "womans_clothes"
    ],
    "tags": []
  },
  "👕": {
    "category": "people",
    "description": "t-shirt",
    "names": [
      "shirt",
      "tshirt"
    ],
    "tags": []
  },
  "👖": {
    "category": "people",
    "description": "jeans",
    "names": [
      "jeans"
    ],
    "tags": [
      "pants"
    ]
  },
  "👔": {
    "category": "people",
    "description": "necktie",
    "names": [
      "necktie"
    ],
    "tags": [
      "shirt",
      "formal"
    ]
  },
  "👗": {
    "category": "people",
    "description": "dress",
    "names": [
      "dress"
    ],
    "tags": []
  },
  "👙": {
    "category": "people",
    "description": "bikini",
    "names": [
      "bikini"
    ],
    "tags": [
      "beach"
    ]
  },
  "👘": {
    "category": "people",
    "description": "kimono",
    "names": [
      "kimono"
    ],
    "tags": []
  },
  "👠": {
    "category": "people",
    "description": "high-heeled shoe",
    "names": [
      "high_heel"
    ],
    "tags": [
      "shoe"
    ]
  },
  "👡": {
    "category": "people",
    "description": "woman’s sandal",
    "names": [
      "sandal"
    ],
    "tags": [
      "shoe"
    ]
  },
  "👢": {
    "category": "people",
    "description": "woman’s boot",
    "names": [
      "boot"
    ],
    "tags": []
  },
  "👞": {
    "category": "people",
    "description": "man’s shoe",
    "names": [
      "mans_shoe",
      "shoe"
    ],
    "tags": []
  },
  "👟": {
    "category": "people",
    "description": "running shoe",
    "names": [
      "athletic_shoe"
    ],
    "tags": [
      "sneaker",
      "sport",
      "running"
    ]
  },
  "👒": {
    "category": "people",
    "description": "woman’s hat",
    "names": [
      "womans_hat"
    ],
    "tags": []
  },
  "🎩": {
    "category": "people",
    "description": "top hat",
    "names": [
      "tophat"
    ],
    "tags": [
      "hat",
      "classy"
    ]
  },
  "🎓": {
    "category": "people",
    "description": "graduation cap",
    "names": [
      "mortar_board"
    ],
    "tags": [
      "education",
      "college",
      "university",
      "graduation"
    ]
  },
  "👑": {
    "category": "people",
    "description": "crown",
    "names": [
      "crown"
    ],
    "tags": [
      "king",
      "queen",
      "royal"
    ]
  },
  "⛑": {
    "category": "people",
    "description": "rescue worker’s helmet",
    "names": [
      "rescue_worker_helmet"
    ],
    "tags": []
  },
  "🎒": {
    "category": "people",
    "description": "school backpack",
    "names": [
      "school_satchel"
    ],
    "tags": []
  },
  "👝": {
    "category": "people",
    "description": "clutch bag",
    "names": [
      "pouch"
    ],
    "tags": [
      "bag"
    ]
  },
  "👛": {
    "category": "people",
    "description": "purse",
    "names": [
      "purse"
    ],
    "tags": []
  },
  "👜": {
    "category": "people",
    "description": "handbag",
    "names": [
      "handbag"
    ],
    "tags": [
      "bag"
    ]
  },
  "💼": {
    "category": "people",
    "description": "briefcase",
    "names": [
      "briefcase"
    ],
    "tags": [
      "business"
    ]
  },
  "👓": {
    "category": "people",
    "description": "glasses",
    "names": [
      "eyeglasses"
    ],
    "tags": [
      "glasses"
    ]
  },
  "🕶": {
    "category": "people",
    "description": "sunglasses",
    "names": [
      "dark_sunglasses"
    ],
    "tags": []
  },
  "🌂": {
    "category": "people",
    "description": "closed umbrella",
    "names": [
      "closed_umbrella"
    ],
    "tags": [
      "weather",
      "rain"
    ]
  },
  "☂️": {
    "category": "people",
    "description": "umbrella",
    "names": [
      "open_umbrella"
    ],
    "tags": []
  },
  "🐶": {
    "category": "nature",
    "description": "dog face",
    "names": [
      "dog"
    ],
    "tags": [
      "pet"
    ]
  },
  "🐱": {
    "category": "nature",
    "description": "cat face",
    "names": [
      "cat"
    ],
    "tags": [
      "pet"
    ]
  },
  "🐭": {
    "category": "nature",
    "description": "mouse face",
    "names": [
      "mouse"
    ],
    "tags": []
  },
  "🐹": {
    "category": "nature",
    "description": "hamster face",
    "names": [
      "hamster"
    ],
    "tags": [
      "pet"
    ]
  },
  "🐰": {
    "category": "nature",
    "description": "rabbit face",
    "names": [
      "rabbit"
    ],
    "tags": [
      "bunny"
    ]
  },
  "🦊": {
    "category": "nature",
    "description": "fox face",
    "names": [
      "fox_face"
    ],
    "tags": []
  },
  "🐻": {
    "category": "nature",
    "description": "bear face",
    "names": [
      "bear"
    ],
    "tags": []
  },
  "🐼": {
    "category": "nature",
    "description": "panda face",
    "names": [
      "panda_face"
    ],
    "tags": []
  },
  "🐨": {
    "category": "nature",
    "description": "koala",
    "names": [
      "koala"
    ],
    "tags": []
  },
  "🐯": {
    "category": "nature",
    "description": "tiger face",
    "names": [
      "tiger"
    ],
    "tags": []
  },
  "🦁": {
    "category": "nature",
    "description": "lion face",
    "names": [
      "lion"
    ],
    "tags": []
  },
  "🐮": {
    "category": "nature",
    "description": "cow face",
    "names": [
      "cow"
    ],
    "tags": []
  },
  "🐷": {
    "category": "nature",
    "description": "pig face",
    "names": [
      "pig"
    ],
    "tags": []
  },
  "🐽": {
    "category": "nature",
    "description": "pig nose",
    "names": [
      "pig_nose"
    ],
    "tags": []
  },
  "🐸": {
    "category": "nature",
    "description": "frog face",
    "names": [
      "frog"
    ],
    "tags": []
  },
  "🐵": {
    "category": "nature",
    "description": "monkey face",
    "names": [
      "monkey_face"
    ],
    "tags": []
  },
  "🙈": {
    "category": "nature",
    "description": "see-no-evil monkey",
    "names": [
      "see_no_evil"
    ],
    "tags": [
      "monkey",
      "blind",
      "ignore"
    ]
  },
  "🙉": {
    "category": "nature",
    "description": "hear-no-evil monkey",
    "names": [
      "hear_no_evil"
    ],
    "tags": [
      "monkey",
      "deaf"
    ]
  },
  "🙊": {
    "category": "nature",
    "description": "speak-no-evil monkey",
    "names": [
      "speak_no_evil"
    ],
    "tags": [
      "monkey",
      "mute",
      "hush"
    ]
  },
  "🐒": {
    "category": "nature",
    "description": "monkey",
    "names": [
      "monkey"
    ],
    "tags": []
  },
  "🐔": {
    "category": "nature",
    "description": "chicken",
    "names": [
      "chicken"
    ],
    "tags": []
  },
  "🐧": {
    "category": "nature",
    "description": "penguin",
    "names": [
      "penguin"
    ],
    "tags": []
  },
  "🐦": {
    "category": "nature",
    "description": "bird",
    "names": [
      "bird"
    ],
    "tags": []
  },
  "🐤": {
    "category": "nature",
    "description": "baby chick",
    "names": [
      "baby_chick"
    ],
    "tags": []
  },
  "🐣": {
    "category": "nature",
    "description": "hatching chick",
    "names": [
      "hatching_chick"
    ],
    "tags": []
  },
  "🐥": {
    "category": "nature",
    "description": "front-facing baby chick",
    "names": [
      "hatched_chick"
    ],
    "tags": []
  },
  "🦆": {
    "category": "nature",
    "description": "duck",
    "names": [
      "duck"
    ],
    "tags": []
  },
  "🦅": {
    "category": "nature",
    "description": "eagle",
    "names": [
      "eagle"
    ],
    "tags": []
  },
  "🦉": {
    "category": "nature",
    "description": "owl",
    "names": [
      "owl"
    ],
    "tags": []
  },
  "🦇": {
    "category": "nature",
    "description": "bat",
    "names": [
      "bat"
    ],
    "tags": []
  },
  "🐺": {
    "category": "nature",
    "description": "wolf face",
    "names": [
      "wolf"
    ],
    "tags": []
  },
  "🐗": {
    "category": "nature",
    "description": "boar",
    "names": [
      "boar"
    ],
    "tags": []
  },
  "🐴": {
    "category": "nature",
    "description": "horse face",
    "names": [
      "horse"
    ],
    "tags": []
  },
  "🦄": {
    "category": "nature",
    "description": "unicorn face",
    "names": [
      "unicorn"
    ],
    "tags": []
  },
  "🐝": {
    "category": "nature",
    "description": "honeybee",
    "names": [
      "bee",
      "honeybee"
    ],
    "tags": []
  },
  "🐛": {
    "category": "nature",
    "description": "bug",
    "names": [
      "bug"
    ],
    "tags": []
  },
  "🦋": {
    "category": "nature",
    "description": "butterfly",
    "names": [
      "butterfly"
    ],
    "tags": []
  },
  "🐌": {
    "category": "nature",
    "description": "snail",
    "names": [
      "snail"
    ],
    "tags": [
      "slow"
    ]
  },
  "🐚": {
    "category": "nature",
    "description": "spiral shell",
    "names": [
      "shell"
    ],
    "tags": [
      "sea",
      "beach"
    ]
  },
  "🐞": {
    "category": "nature",
    "description": "lady beetle",
    "names": [
      "beetle"
    ],
    "tags": [
      "bug"
    ]
  },
  "🐜": {
    "category": "nature",
    "description": "ant",
    "names": [
      "ant"
    ],
    "tags": []
  },
  "🕷": {
    "category": "nature",
    "description": "spider",
    "names": [
      "spider"
    ],
    "tags": []
  },
  "🕸": {
    "category": "nature",
    "description": "spider web",
    "names": [
      "spider_web"
    ],
    "tags": []
  },
  "🐢": {
    "category": "nature",
    "description": "turtle",
    "names": [
      "turtle"
    ],
    "tags": [
      "slow"
    ]
  },
  "🐍": {
    "category": "nature",
    "description": "snake",
    "names": [
      "snake"
    ],
    "tags": []
  },
  "🦎": {
    "category": "nature",
    "description": "lizard",
    "names": [
      "lizard"
    ],
    "tags": []
  },
  "🦂": {
    "category": "nature",
    "description": "scorpion",
    "names": [
      "scorpion"
    ],
    "tags": []
  },
  "🦀": {
    "category": "nature",
    "description": "crab",
    "names": [
      "crab"
    ],
    "tags": []
  },
  "🦑": {
    "category": "nature",
    "description": "squid",
    "names": [
      "squid"
    ],
    "tags": []
  },
  "🐙": {
    "category": "nature",
    "description": "octopus",
    "names": [
      "octopus"
    ],
    "tags": []
  },
  "🦐": {
    "category": "nature",
    "description": "shrimp",
    "names": [
      "shrimp"
    ],
    "tags": []
  },
  "🐠": {
    "category": "nature",
    "description": "tropical fish",
    "names": [
      "tropical_fish"
    ],
    "tags": []
  },
  "🐟": {
    "category": "nature",
    "description": "fish",
    "names": [
      "fish"
    ],
    "tags": []
  },
  "🐡": {
    "category": "nature",
    "description": "blowfish",
    "names": [
      "blowfish"
    ],
    "tags": []
  },
  "🐬": {
    "category": "nature",
    "description": "dolphin",
    "names": [
      "dolphin",
      "flipper"
    ],
    "tags": []
  },
  "🦈": {
    "category": "nature",
    "description": "shark",
    "names": [
      "shark"
    ],
    "tags": []
  },
  "🐳": {
    "category": "nature",
    "description": "spouting whale",
    "names": [
      "whale"
    ],
    "tags": [
      "sea"
    ]
  },
  "🐋": {
    "category": "nature",
    "description": "whale",
    "names": [
      "whale2"
    ],
    "tags": []
  },
  "🐊": {
    "category": "nature",
    "description": "crocodile",
    "names": [
      "crocodile"
    ],
    "tags": []
  },
  "🐆": {
    "category": "nature",
    "description": "leopard",
    "names": [
      "leopard"
    ],
    "tags": []
  },
  "🐅": {
    "category": "nature",
    "description": "tiger",
    "names": [
      "tiger2"
    ],
    "tags": []
  },
  "🐃": {
    "category": "nature",
    "description": "water buffalo",
    "names": [
      "water_buffalo"
    ],
    "tags": []
  },
  "🐂": {
    "category": "nature",
    "description": "ox",
    "names": [
      "ox"
    ],
    "tags": []
  },
  "🐄": {
    "category": "nature",
    "description": "cow",
    "names": [
      "cow2"
    ],
    "tags": []
  },
  "🦌": {
    "category": "nature",
    "description": "deer",
    "names": [
      "deer"
    ],
    "tags": []
  },
  "🐪": {
    "category": "nature",
    "description": "camel",
    "names": [
      "dromedary_camel"
    ],
    "tags": [
      "desert"
    ]
  },
  "🐫": {
    "category": "nature",
    "description": "two-hump camel",
    "names": [
      "camel"
    ],
    "tags": []
  },
  "🐘": {
    "category": "nature",
    "description": "elephant",
    "names": [
      "elephant"
    ],
    "tags": []
  },
  "🦏": {
    "category": "nature",
    "description": "rhinoceros",
    "names": [
      "rhinoceros"
    ],
    "tags": []
  },
  "🦍": {
    "category": "nature",
    "description": "gorilla",
    "names": [
      "gorilla"
    ],
    "tags": []
  },
  "🐎": {
    "category": "nature",
    "description": "horse",
    "names": [
      "racehorse"
    ],
    "tags": [
      "speed"
    ]
  },
  "🐖": {
    "category": "nature",
    "description": "pig",
    "names": [
      "pig2"
    ],
    "tags": []
  },
  "🐐": {
    "category": "nature",
    "description": "goat",
    "names": [
      "goat"
    ],
    "tags": []
  },
  "🐏": {
    "category": "nature",
    "description": "ram",
    "names": [
      "ram"
    ],
    "tags": []
  },
  "🐑": {
    "category": "nature",
    "description": "sheep",
    "names": [
      "sheep"
    ],
    "tags": []
  },
  "🐕": {
    "category": "nature",
    "description": "dog",
    "names": [
      "dog2"
    ],
    "tags": []
  },
  "🐩": {
    "category": "nature",
    "description": "poodle",
    "names": [
      "poodle"
    ],
    "tags": [
      "dog"
    ]
  },
  "🐈": {
    "category": "nature",
    "description": "cat",
    "names": [
      "cat2"
    ],
    "tags": []
  },
  "🐓": {
    "category": "nature",
    "description": "rooster",
    "names": [
      "rooster"
    ],
    "tags": []
  },
  "🦃": {
    "category": "nature",
    "description": "turkey",
    "names": [
      "turkey"
    ],
    "tags": [
      "thanksgiving"
    ]
  },
  "🕊": {
    "category": "nature",
    "description": "dove",
    "names": [
      "dove"
    ],
    "tags": [
      "peace"
    ]
  },
  "🐇": {
    "category": "nature",
    "description": "rabbit",
    "names": [
      "rabbit2"
    ],
    "tags": []
  },
  "🐁": {
    "category": "nature",
    "description": "mouse",
    "names": [
      "mouse2"
    ],
    "tags": []
  },
  "🐀": {
    "category": "nature",
    "description": "rat",
    "names": [
      "rat"
    ],
    "tags": []
  },
  "🐿": {
    "category": "nature",
    "description": "chipmunk",
    "names": [
      "chipmunk"
    ],
    "tags": []
  },
  "🐾": {
    "category": "nature",
    "description": "paw prints",
    "names": [
      "feet",
      "paw_prints"
    ],
    "tags": []
  },
  "🐉": {
    "category": "nature",
    "description": "dragon",
    "names": [
      "dragon"
    ],
    "tags": []
  },
  "🐲": {
    "category": "nature",
    "description": "dragon face",
    "names": [
      "dragon_face"
    ],
    "tags": []
  },
  "🌵": {
    "category": "nature",
    "description": "cactus",
    "names": [
      "cactus"
    ],
    "tags": []
  },
  "🎄": {
    "category": "nature",
    "description": "Christmas tree",
    "names": [
      "christmas_tree"
    ],
    "tags": []
  },
  "🌲": {
    "category": "nature",
    "description": "evergreen tree",
    "names": [
      "evergreen_tree"
    ],
    "tags": [
      "wood"
    ]
  },
  "🌳": {
    "category": "nature",
    "description": "deciduous tree",
    "names": [
      "deciduous_tree"
    ],
    "tags": [
      "wood"
    ]
  },
  "🌴": {
    "category": "nature",
    "description": "palm tree",
    "names": [
      "palm_tree"
    ],
    "tags": []
  },
  "🌱": {
    "category": "nature",
    "description": "seedling",
    "names": [
      "seedling"
    ],
    "tags": [
      "plant"
    ]
  },
  "🌿": {
    "category": "nature",
    "description": "herb",
    "names": [
      "herb"
    ],
    "tags": []
  },
  "☘️": {
    "category": "nature",
    "description": "shamrock",
    "names": [
      "shamrock"
    ],
    "tags": []
  },
  "🍀": {
    "category": "nature",
    "description": "four leaf clover",
    "names": [
      "four_leaf_clover"
    ],
    "tags": [
      "luck"
    ]
  },
  "🎍": {
    "category": "nature",
    "description": "pine decoration",
    "names": [
      "bamboo"
    ],
    "tags": []
  },
  "🎋": {
    "category": "nature",
    "description": "tanabata tree",
    "names": [
      "tanabata_tree"
    ],
    "tags": []
  },
  "🍃": {
    "category": "nature",
    "description": "leaf fluttering in wind",
    "names": [
      "leaves"
    ],
    "tags": [
      "leaf"
    ]
  },
  "🍂": {
    "category": "nature",
    "description": "fallen leaf",
    "names": [
      "fallen_leaf"
    ],
    "tags": [
      "autumn"
    ]
  },
  "🍁": {
    "category": "nature",
    "description": "maple leaf",
    "names": [
      "maple_leaf"
    ],
    "tags": [
      "canada"
    ]
  },
  "🍄": {
    "category": "nature",
    "description": "mushroom",
    "names": [
      "mushroom"
    ],
    "tags": []
  },
  "🌾": {
    "category": "nature",
    "description": "sheaf of rice",
    "names": [
      "ear_of_rice"
    ],
    "tags": []
  },
  "💐": {
    "category": "nature",
    "description": "bouquet",
    "names": [
      "bouquet"
    ],
    "tags": [
      "flowers"
    ]
  },
  "🌷": {
    "category": "nature",
    "description": "tulip",
    "names": [
      "tulip"
    ],
    "tags": [
      "flower"
    ]
  },
  "🌹": {
    "category": "nature",
    "description": "rose",
    "names": [
      "rose"
    ],
    "tags": [
      "flower"
    ]
  },
  "🥀": {
    "category": "nature",
    "description": "wilted flower",
    "names": [
      "wilted_flower"
    ],
    "tags": []
  },
  "🌻": {
    "category": "nature",
    "description": "sunflower",
    "names": [
      "sunflower"
    ],
    "tags": []
  },
  "🌼": {
    "category": "nature",
    "description": "blossom",
    "names": [
      "blossom"
    ],
    "tags": []
  },
  "🌸": {
    "category": "nature",
    "description": "cherry blossom",
    "names": [
      "cherry_blossom"
    ],
    "tags": [
      "flower",
      "spring"
    ]
  },
  "🌺": {
    "category": "nature",
    "description": "hibiscus",
    "names": [
      "hibiscus"
    ],
    "tags": []
  },
  "🌎": {
    "category": "nature",
    "description": "globe showing Americas",
    "names": [
      "earth_americas"
    ],
    "tags": [
      "globe",
      "world",
      "international"
    ]
  },
  "🌍": {
    "category": "nature",
    "description": "globe showing Europe-Africa",
    "names": [
      "earth_africa"
    ],
    "tags": [
      "globe",
      "world",
      "international"
    ]
  },
  "🌏": {
    "category": "nature",
    "description": "globe showing Asia-Australia",
    "names": [
      "earth_asia"
    ],
    "tags": [
      "globe",
      "world",
      "international"
    ]
  },
  "🌕": {
    "category": "nature",
    "description": "full moon",
    "names": [
      "full_moon"
    ],
    "tags": []
  },
  "🌖": {
    "category": "nature",
    "description": "waning gibbous moon",
    "names": [
      "waning_gibbous_moon"
    ],
    "tags": []
  },
  "🌗": {
    "category": "nature",
    "description": "last quarter moon",
    "names": [
      "last_quarter_moon"
    ],
    "tags": []
  },
  "🌘": {
    "category": "nature",
    "description": "waning crescent moon",
    "names": [
      "waning_crescent_moon"
    ],
    "tags": []
  },
  "🌑": {
    "category": "nature",
    "description": "new moon",
    "names": [
      "new_moon"
    ],
    "tags": []
  },
  "🌒": {
    "category": "nature",
    "description": "waxing crescent moon",
    "names": [
      "waxing_crescent_moon"
    ],
    "tags": []
  },
  "🌓": {
    "category": "nature",
    "description": "first quarter moon",
    "names": [
      "first_quarter_moon"
    ],
    "tags": []
  },
  "🌔": {
    "category": "nature",
    "description": "waxing gibbous moon",
    "names": [
      "moon",
      "waxing_gibbous_moon"
    ],
    "tags": []
  },
  "🌚": {
    "category": "nature",
    "description": "new moon face",
    "names": [
      "new_moon_with_face"
    ],
    "tags": []
  },
  "🌝": {
    "category": "nature",
    "description": "full moon with face",
    "names": [
      "full_moon_with_face"
    ],
    "tags": []
  },
  "🌞": {
    "category": "nature",
    "description": "sun with face",
    "names": [
      "sun_with_face"
    ],
    "tags": [
      "summer"
    ]
  },
  "🌛": {
    "category": "nature",
    "description": "first quarter moon with face",
    "names": [
      "first_quarter_moon_with_face"
    ],
    "tags": []
  },
  "🌜": {
    "category": "nature",
    "description": "last quarter moon with face",
    "names": [
      "last_quarter_moon_with_face"
    ],
    "tags": []
  },
  "🌙": {
    "category": "nature",
    "description": "crescent moon",
    "names": [
      "crescent_moon"
    ],
    "tags": [
      "night"
    ]
  },
  "💫": {
    "category": "nature",
    "description": "dizzy",
    "names": [
      "dizzy"
    ],
    "tags": [
      "star"
    ]
  },
  "⭐️": {
    "category": "nature",
    "description": "white medium star",
    "names": [
      "star"
    ],
    "tags": []
  },
  "🌟": {
    "category": "nature",
    "description": "glowing star",
    "names": [
      "star2"
    ],
    "tags": []
  },
  "✨": {
    "category": "nature",
    "description": "sparkles",
    "names": [
      "sparkles"
    ],
    "tags": [
      "shiny"
    ]
  },
  "⚡️": {
    "category": "nature",
    "description": "high voltage",
    "names": [
      "zap"
    ],
    "tags": [
      "lightning",
      "thunder"
    ]
  },
  "🔥": {
    "category": "nature",
    "description": "fire",
    "names": [
      "fire"
    ],
    "tags": [
      "burn"
    ]
  },
  "💥": {
    "category": "nature",
    "description": "collision",
    "names": [
      "boom",
      "collision"
    ],
    "tags": [
      "explode"
    ]
  },
  "☄": {
    "category": "nature",
    "description": "comet",
    "names": [
      "comet"
    ],
    "tags": []
  },
  "☀️": {
    "category": "nature",
    "description": "sun",
    "names": [
      "sunny"
    ],
    "tags": [
      "weather"
    ]
  },
  "🌤": {
    "category": "nature",
    "description": "sun behind small cloud",
    "names": [
      "sun_behind_small_cloud"
    ],
    "tags": []
  },
  "⛅️": {
    "category": "nature",
    "description": "sun behind cloud",
    "names": [
      "partly_sunny"
    ],
    "tags": [
      "weather",
      "cloud"
    ]
  },
  "🌥": {
    "category": "nature",
    "description": "sun behind large cloud",
    "names": [
      "sun_behind_large_cloud"
    ],
    "tags": []
  },
  "🌦": {
    "category": "nature",
    "description": "sun behind rain cloud",
    "names": [
      "sun_behind_rain_cloud"
    ],
    "tags": []
  },
  "🌈": {
    "category": "nature",
    "description": "rainbow",
    "names": [
      "rainbow"
    ],
    "tags": []
  },
  "☁️": {
    "category": "nature",
    "description": "cloud",
    "names": [
      "cloud"
    ],
    "tags": []
  },
  "🌧": {
    "category": "nature",
    "description": "cloud with rain",
    "names": [
      "cloud_with_rain"
    ],
    "tags": []
  },
  "⛈": {
    "category": "nature",
    "description": "cloud with lightning and rain",
    "names": [
      "cloud_with_lightning_and_rain"
    ],
    "tags": []
  },
  "🌩": {
    "category": "nature",
    "description": "cloud with lightning",
    "names": [
      "cloud_with_lightning"
    ],
    "tags": []
  },
  "🌨": {
    "category": "nature",
    "description": "cloud with snow",
    "names": [
      "cloud_with_snow"
    ],
    "tags": []
  },
  "☃️": {
    "category": "nature",
    "description": "snowman",
    "names": [
      "snowman_with_snow"
    ],
    "tags": [
      "winter",
      "christmas"
    ]
  },
  "⛄️": {
    "category": "nature",
    "description": "snowman without snow",
    "names": [
      "snowman"
    ],
    "tags": [
      "winter"
    ]
  },
  "❄️": {
    "category": "nature",
    "description": "snowflake",
    "names": [
      "snowflake"
    ],
    "tags": [
      "winter",
      "cold",
      "weather"
    ]
  },
  "🌬": {
    "category": "nature",
    "description": "wind face",
    "names": [
      "wind_face"
    ],
    "tags": []
  },
  "💨": {
    "category": "nature",
    "description": "dashing away",
    "names": [
      "dash"
    ],
    "tags": [
      "wind",
      "blow",
      "fast"
    ]
  },
  "🌪": {
    "category": "nature",
    "description": "tornado",
    "names": [
      "tornado"
    ],
    "tags": []
  },
  "🌫": {
    "category": "nature",
    "description": "fog",
    "names": [
      "fog"
    ],
    "tags": []
  },
  "🌊": {
    "category": "nature",
    "description": "water wave",
    "names": [
      "ocean"
    ],
    "tags": [
      "sea"
    ]
  },
  "💧": {
    "category": "nature",
    "description": "droplet",
    "names": [
      "droplet"
    ],
    "tags": [
      "water"
    ]
  },
  "💦": {
    "category": "nature",
    "description": "sweat droplets",
    "names": [
      "sweat_drops"
    ],
    "tags": [
      "water",
      "workout"
    ]
  },
  "☔️": {
    "category": "nature",
    "description": "umbrella with rain drops",
    "names": [
      "umbrella"
    ],
    "tags": [
      "rain",
      "weather"
    ]
  },
  "🍏": {
    "category": "foods",
    "description": "green apple",
    "names": [
      "green_apple"
    ],
    "tags": [
      "fruit"
    ]
  },
  "🍎": {
    "category": "foods",
    "description": "red apple",
    "names": [
      "apple"
    ],
    "tags": []
  },
  "🍐": {
    "category": "foods",
    "description": "pear",
    "names": [
      "pear"
    ],
    "tags": []
  },
  "🍊": {
    "category": "foods",
    "description": "tangerine",
    "names": [
      "tangerine",
      "orange",
      "mandarin"
    ],
    "tags": []
  },
  "🍋": {
    "category": "foods",
    "description": "lemon",
    "names": [
      "lemon"
    ],
    "tags": []
  },
  "🍌": {
    "category": "foods",
    "description": "banana",
    "names": [
      "banana"
    ],
    "tags": [
      "fruit"
    ]
  },
  "🍉": {
    "category": "foods",
    "description": "watermelon",
    "names": [
      "watermelon"
    ],
    "tags": []
  },
  "🍇": {
    "category": "foods",
    "description": "grapes",
    "names": [
      "grapes"
    ],
    "tags": []
  },
  "🍓": {
    "category": "foods",
    "description": "strawberry",
    "names": [
      "strawberry"
    ],
    "tags": [
      "fruit"
    ]
  },
  "🍈": {
    "category": "foods",
    "description": "melon",
    "names": [
      "melon"
    ],
    "tags": []
  },
  "🍒": {
    "category": "foods",
    "description": "cherries",
    "names": [
      "cherries"
    ],
    "tags": [
      "fruit"
    ]
  },
  "🍑": {
    "category": "foods",
    "description": "peach",
    "names": [
      "peach"
    ],
    "tags": []
  },
  "🍍": {
    "category": "foods",
    "description": "pineapple",
    "names": [
      "pineapple"
    ],
    "tags": []
  },
  "🥝": {
    "category": "foods",
    "description": "kiwi fruit",
    "names": [
      "kiwi_fruit"
    ],
    "tags": []
  },
  "🥑": {
    "category": "foods",
    "description": "avocado",
    "names": [
      "avocado"
    ],
    "tags": []
  },
  "🍅": {
    "category": "foods",
    "description": "tomato",
    "names": [
      "tomato"
    ],
    "tags": []
  },
  "🍆": {
    "category": "foods",
    "description": "eggplant",
    "names": [
      "eggplant"
    ],
    "tags": [
      "aubergine"
    ]
  },
  "🥒": {
    "category": "foods",
    "description": "cucumber",
    "names": [
      "cucumber"
    ],
    "tags": []
  },
  "🥕": {
    "category": "foods",
    "description": "carrot",
    "names": [
      "carrot"
    ],
    "tags": []
  },
  "🌽": {
    "category": "foods",
    "description": "ear of corn",
    "names": [
      "corn"
    ],
    "tags": []
  },
  "🌶": {
    "category": "foods",
    "description": "hot pepper",
    "names": [
      "hot_pepper"
    ],
    "tags": [
      "spicy"
    ]
  },
  "🥔": {
    "category": "foods",
    "description": "potato",
    "names": [
      "potato"
    ],
    "tags": []
  },
  "🍠": {
    "category": "foods",
    "description": "roasted sweet potato",
    "names": [
      "sweet_potato"
    ],
    "tags": []
  },
  "🌰": {
    "category": "foods",
    "description": "chestnut",
    "names": [
      "chestnut"
    ],
    "tags": []
  },
  "🥜": {
    "category": "foods",
    "description": "peanuts",
    "names": [
      "peanuts"
    ],
    "tags": []
  },
  "🍯": {
    "category": "foods",
    "description": "honey pot",
    "names": [
      "honey_pot"
    ],
    "tags": []
  },
  "🥐": {
    "category": "foods",
    "description": "croissant",
    "names": [
      "croissant"
    ],
    "tags": []
  },
  "🍞": {
    "category": "foods",
    "description": "bread",
    "names": [
      "bread"
    ],
    "tags": [
      "toast"
    ]
  },
  "🥖": {
    "category": "foods",
    "description": "baguette bread",
    "names": [
      "baguette_bread"
    ],
    "tags": []
  },
  "🧀": {
    "category": "foods",
    "description": "cheese wedge",
    "names": [
      "cheese"
    ],
    "tags": []
  },
  "🥚": {
    "category": "foods",
    "description": "egg",
    "names": [
      "egg"
    ],
    "tags": []
  },
  "🍳": {
    "category": "foods",
    "description": "cooking",
    "names": [
      "fried_egg"
    ],
    "tags": [
      "breakfast"
    ]
  },
  "🥓": {
    "category": "foods",
    "description": "bacon",
    "names": [
      "bacon"
    ],
    "tags": []
  },
  "🥞": {
    "category": "foods",
    "description": "pancakes",
    "names": [
      "pancakes"
    ],
    "tags": []
  },
  "🍤": {
    "category": "foods",
    "description": "fried shrimp",
    "names": [
      "fried_shrimp"
    ],
    "tags": [
      "tempura"
    ]
  },
  "🍗": {
    "category": "foods",
    "description": "poultry leg",
    "names": [
      "poultry_leg"
    ],
    "tags": [
      "meat",
      "chicken"
    ]
  },
  "🍖": {
    "category": "foods",
    "description": "meat on bone",
    "names": [
      "meat_on_bone"
    ],
    "tags": []
  },
  "🍕": {
    "category": "foods",
    "description": "pizza",
    "names": [
      "pizza"
    ],
    "tags": []
  },
  "🌭": {
    "category": "foods",
    "description": "hot dog",
    "names": [
      "hotdog"
    ],
    "tags": []
  },
  "🍔": {
    "category": "foods",
    "description": "hamburger",
    "names": [
      "hamburger"
    ],
    "tags": [
      "burger"
    ]
  },
  "🍟": {
    "category": "foods",
    "description": "french fries",
    "names": [
      "fries"
    ],
    "tags": []
  },
  "🥙": {
    "category": "foods",
    "description": "stuffed flatbread",
    "names": [
      "stuffed_flatbread"
    ],
    "tags": []
  },
  "🌮": {
    "category": "foods",
    "description": "taco",
    "names": [
      "taco"
    ],
    "tags": []
  },
  "🌯": {
    "category": "foods",
    "description": "burrito",
    "names": [
      "burrito"
    ],
    "tags": []
  },
  "🥗": {
    "category": "foods",
    "description": "green salad",
    "names": [
      "green_salad"
    ],
    "tags": []
  },
  "🥘": {
    "category": "foods",
    "description": "shallow pan of food",
    "names": [
      "shallow_pan_of_food"
    ],
    "tags": [
      "paella",
      "curry"
    ]
  },
  "🍝": {
    "category": "foods",
    "description": "spaghetti",
    "names": [
      "spaghetti"
    ],
    "tags": [
      "pasta"
    ]
  },
  "🍜": {
    "category": "foods",
    "description": "steaming bowl",
    "names": [
      "ramen"
    ],
    "tags": [
      "noodle"
    ]
  },
  "🍲": {
    "category": "foods",
    "description": "pot of food",
    "names": [
      "stew"
    ],
    "tags": []
  },
  "🍥": {
    "category": "foods",
    "description": "fish cake with swirl",
    "names": [
      "fish_cake"
    ],
    "tags": []
  },
  "🍣": {
    "category": "foods",
    "description": "sushi",
    "names": [
      "sushi"
    ],
    "tags": []
  },
  "🍱": {
    "category": "foods",
    "description": "bento box",
    "names": [
      "bento"
    ],
    "tags": []
  },
  "🍛": {
    "category": "foods",
    "description": "curry rice",
    "names": [
      "curry"
    ],
    "tags": []
  },
  "🍚": {
    "category": "foods",
    "description": "cooked rice",
    "names": [
      "rice"
    ],
    "tags": []
  },
  "🍙": {
    "category": "foods",
    "description": "rice ball",
    "names": [
      "rice_ball"
    ],
    "tags": []
  },
  "🍘": {
    "category": "foods",
    "description": "rice cracker",
    "names": [
      "rice_cracker"
    ],
    "tags": []
  },
  "🍢": {
    "category": "foods",
    "description": "oden",
    "names": [
      "oden"
    ],
    "tags": []
  },
  "🍡": {
    "category": "foods",
    "description": "dango",
    "names": [
      "dango"
    ],
    "tags": []
  },
  "🍧": {
    "category": "foods",
    "description": "shaved ice",
    "names": [
      "shaved_ice"
    ],
    "tags": []
  },
  "🍨": {
    "category": "foods",
    "description": "ice cream",
    "names": [
      "ice_cream"
    ],
    "tags": []
  },
  "🍦": {
    "category": "foods",
    "description": "soft ice cream",
    "names": [
      "icecream"
    ],
    "tags": []
  },
  "🍰": {
    "category": "foods",
    "description": "shortcake",
    "names": [
      "cake"
    ],
    "tags": [
      "dessert"
    ]
  },
  "🎂": {
    "category": "foods",
    "description": "birthday cake",
    "names": [
      "birthday"
    ],
    "tags": [
      "party"
    ]
  },
  "🍮": {
    "category": "foods",
    "description": "custard",
    "names": [
      "custard"
    ],
    "tags": []
  },
  "🍭": {
    "category": "foods",
    "description": "lollipop",
    "names": [
      "lollipop"
    ],
    "tags": []
  },
  "🍬": {
    "category": "foods",
    "description": "candy",
    "names": [
      "candy"
    ],
    "tags": [
      "sweet"
    ]
  },
  "🍫": {
    "category": "foods",
    "description": "chocolate bar",
    "names": [
      "chocolate_bar"
    ],
    "tags": []
  },
  "🍿": {
    "category": "foods",
    "description": "popcorn",
    "names": [
      "popcorn"
    ],
    "tags": []
  },
  "🍩": {
    "category": "foods",
    "description": "doughnut",
    "names": [
      "doughnut"
    ],
    "tags": []
  },
  "🍪": {
    "category": "foods",
    "description": "cookie",
    "names": [
      "cookie"
    ],
    "tags": []
  },
  "🥛": {
    "category": "foods",
    "description": "glass of milk",
    "names": [
      "milk_glass"
    ],
    "tags": []
  },
  "🍼": {
    "category": "foods",
    "description": "baby bottle",
    "names": [
      "baby_bottle"
    ],
    "tags": [
      "milk"
    ]
  },
  "☕️": {
    "category": "foods",
    "description": "hot beverage",
    "names": [
      "coffee"
    ],
    "tags": [
      "cafe",
      "espresso"
    ]
  },
  "🍵": {
    "category": "foods",
    "description": "teacup without handle",
    "names": [
      "tea"
    ],
    "tags": [
      "green",
      "breakfast"
    ]
  },
  "🍶": {
    "category": "foods",
    "description": "sake",
    "names": [
      "sake"
    ],
    "tags": []
  },
  "🍺": {
    "category": "foods",
    "description": "beer mug",
    "names": [
      "beer"
    ],
    "tags": [
      "drink"
    ]
  },
  "🍻": {
    "category": "foods",
    "description": "clinking beer mugs",
    "names": [
      "beers"
    ],
    "tags": [
      "drinks"
    ]
  },
  "🥂": {
    "category": "foods",
    "description": "clinking glasses",
    "names": [
      "clinking_glasses"
    ],
    "tags": [
      "cheers",
      "toast"
    ]
  },
  "🍷": {
    "category": "foods",
    "description": "wine glass",
    "names": [
      "wine_glass"
    ],
    "tags": []
  },
  "🥃": {
    "category": "foods",
    "description": "tumbler glass",
    "names": [
      "tumbler_glass"
    ],
    "tags": [
      "whisky"
    ]
  },
  "🍸": {
    "category": "foods",
    "description": "cocktail glass",
    "names": [
      "cocktail"
    ],
    "tags": [
      "drink"
    ]
  },
  "🍹": {
    "category": "foods",
    "description": "tropical drink",
    "names": [
      "tropical_drink"
    ],
    "tags": [
      "summer",
      "vacation"
    ]
  },
  "🍾": {
    "category": "foods",
    "description": "bottle with popping cork",
    "names": [
      "champagne"
    ],
    "tags": [
      "bottle",
      "bubbly",
      "celebration"
    ]
  },
  "🥄": {
    "category": "foods",
    "description": "spoon",
    "names": [
      "spoon"
    ],
    "tags": []
  },
  "🍴": {
    "category": "foods",
    "description": "fork and knife",
    "names": [
      "fork_and_knife"
    ],
    "tags": [
      "cutlery"
    ]
  },
  "🍽": {
    "category": "foods",
    "description": "fork and knife with plate",
    "names": [
      "plate_with_cutlery"
    ],
    "tags": [
      "dining",
      "dinner"
    ]
  },
  "⚽️": {
    "category": "activity",
    "description": "soccer ball",
    "names": [
      "soccer"
    ],
    "tags": [
      "sports"
    ]
  },
  "🏀": {
    "category": "activity",
    "description": "basketball",
    "names": [
      "basketball"
    ],
    "tags": [
      "sports"
    ]
  },
  "🏈": {
    "category": "activity",
    "description": "american football",
    "names": [
      "football"
    ],
    "tags": [
      "sports"
    ]
  },
  "⚾️": {
    "category": "activity",
    "description": "baseball",
    "names": [
      "baseball"
    ],
    "tags": [
      "sports"
    ]
  },
  "🎾": {
    "category": "activity",
    "description": "tennis",
    "names": [
      "tennis"
    ],
    "tags": [
      "sports"
    ]
  },
  "🏐": {
    "category": "activity",
    "description": "volleyball",
    "names": [
      "volleyball"
    ],
    "tags": []
  },
  "🏉": {
    "category": "activity",
    "description": "rugby football",
    "names": [
      "rugby_football"
    ],
    "tags": []
  },
  "🎱": {
    "category": "activity",
    "description": "pool 8 ball",
    "names": [
      "8ball"
    ],
    "tags": [
      "pool",
      "billiards"
    ]
  },
  "🏓": {
    "category": "activity",
    "description": "ping pong",
    "names": [
      "ping_pong"
    ],
    "tags": []
  },
  "🏸": {
    "category": "activity",
    "description": "badminton",
    "names": [
      "badminton"
    ],
    "tags": []
  },
  "🥅": {
    "category": "activity",
    "description": "goal net",
    "names": [
      "goal_net"
    ],
    "tags": []
  },
  "🏒": {
    "category": "activity",
    "description": "ice hockey",
    "names": [
      "ice_hockey"
    ],
    "tags": []
  },
  "🏑": {
    "category": "activity",
    "description": "field hockey",
    "names": [
      "field_hockey"
    ],
    "tags": []
  },
  "🏏": {
    "category": "activity",
    "description": "cricket",
    "names": [
      "cricket"
    ],
    "tags": []
  },
  "⛳️": {
    "category": "activity",
    "description": "flag in hole",
    "names": [
      "golf"
    ],
    "tags": []
  },
  "🏹": {
    "category": "activity",
    "description": "bow and arrow",
    "names": [
      "bow_and_arrow"
    ],
    "tags": [
      "archery"
    ]
  },
  "🎣": {
    "category": "activity",
    "description": "fishing pole",
    "names": [
      "fishing_pole_and_fish"
    ],
    "tags": []
  },
  "🥊": {
    "category": "activity",
    "description": "boxing glove",
    "names": [
      "boxing_glove"
    ],
    "tags": []
  },
  "🥋": {
    "category": "activity",
    "description": "martial arts uniform",
    "names": [
      "martial_arts_uniform"
    ],
    "tags": []
  },
  "⛸": {
    "category": "activity",
    "description": "ice skate",
    "names": [
      "ice_skate"
    ],
    "tags": [
      "skating"
    ]
  },
  "🎿": {
    "category": "activity",
    "description": "skis",
    "names": [
      "ski"
    ],
    "tags": []
  },
  "⛷": {
    "category": "activity",
    "description": "skier",
    "names": [
      "skier"
    ],
    "tags": []
  },
  "🏂": {
    "category": "activity",
    "description": "snowboarder",
    "names": [
      "snowboarder"
    ],
    "tags": []
  },
  "🏋️‍♀️": {
    "category": "activity",
    "description": "woman lifting weights",
    "names": [
      "weight_lifting_woman"
    ],
    "tags": [
      "gym",
      "workout"
    ]
  },
  "🏋": {
    "category": "activity",
    "description": "person lifting weights",
    "names": [
      "weight_lifting_man"
    ],
    "tags": [
      "gym",
      "workout"
    ]
  },
  "🤺": {
    "category": "activity",
    "description": "person fencing",
    "names": [
      "person_fencing"
    ],
    "tags": []
  },
  "🤼‍♀": {
    "category": "activity",
    "description": "women wrestling",
    "names": [
      "women_wrestling"
    ],
    "tags": []
  },
  "🤼‍♂": {
    "category": "activity",
    "description": "men wrestling",
    "names": [
      "men_wrestling"
    ],
    "tags": []
  },
  "🤸‍♀": {
    "category": "activity",
    "description": "woman cartwheeling",
    "names": [
      "woman_cartwheeling"
    ],
    "tags": []
  },
  "🤸‍♂": {
    "category": "activity",
    "description": "man cartwheeling",
    "names": [
      "man_cartwheeling"
    ],
    "tags": []
  },
  "⛹️‍♀️": {
    "category": "activity",
    "description": "woman bouncing ball",
    "names": [
      "basketball_woman"
    ],
    "tags": []
  },
  "⛹": {
    "category": "activity",
    "description": "person bouncing ball",
    "names": [
      "basketball_man"
    ],
    "tags": []
  },
  "🤾‍♀": {
    "category": "activity",
    "description": "woman playing handball",
    "names": [
      "woman_playing_handball"
    ],
    "tags": []
  },
  "🤾‍♂": {
    "category": "activity",
    "description": "man playing handball",
    "names": [
      "man_playing_handball"
    ],
    "tags": []
  },
  "🏌️‍♀️": {
    "category": "activity",
    "description": "woman golfing",
    "names": [
      "golfing_woman"
    ],
    "tags": []
  },
  "🏌": {
    "category": "activity",
    "description": "person golfing",
    "names": [
      "golfing_man"
    ],
    "tags": []
  },
  "🏄‍♀": {
    "category": "activity",
    "description": "woman surfing",
    "names": [
      "surfing_woman"
    ],
    "tags": []
  },
  "🏄": {
    "category": "activity",
    "description": "person surfing",
    "names": [
      "surfing_man",
      "surfer"
    ],
    "tags": []
  },
  "🏊‍♀": {
    "category": "activity",
    "description": "woman swimming",
    "names": [
      "swimming_woman"
    ],
    "tags": []
  },
  "🏊": {
    "category": "activity",
    "description": "person swimming",
    "names": [
      "swimming_man",
      "swimmer"
    ],
    "tags": []
  },
  "🤽‍♀": {
    "category": "activity",
    "description": "woman playing water polo",
    "names": [
      "woman_playing_water_polo"
    ],
    "tags": []
  },
  "🤽‍♂": {
    "category": "activity",
    "description": "man playing water polo",
    "names": [
      "man_playing_water_polo"
    ],
    "tags": []
  },
  "🚣‍♀": {
    "category": "activity",
    "description": "woman rowing boat",
    "names": [
      "rowing_woman"
    ],
    "tags": []
  },
  "🚣": {
    "category": "activity",
    "description": "person rowing boat",
    "names": [
      "rowing_man",
      "rowboat"
    ],
    "tags": []
  },
  "🏇": {
    "category": "activity",
    "description": "horse racing",
    "names": [
      "horse_racing"
    ],
    "tags": []
  },
  "🚴‍♀": {
    "category": "activity",
    "description": "woman biking",
    "names": [
      "biking_woman"
    ],
    "tags": []
  },
  "🚴": {
    "category": "activity",
    "description": "person biking",
    "names": [
      "biking_man",
      "bicyclist"
    ],
    "tags": []
  },
  "🚵‍♀": {
    "category": "activity",
    "description": "woman mountain biking",
    "names": [
      "mountain_biking_woman"
    ],
    "tags": []
  },
  "🚵": {
    "category": "activity",
    "description": "person mountain biking",
    "names": [
      "mountain_biking_man",
      "mountain_bicyclist"
    ],
    "tags": []
  },
  "🎽": {
    "category": "activity",
    "description": "running shirt",
    "names": [
      "running_shirt_with_sash"
    ],
    "tags": [
      "marathon"
    ]
  },
  "🏅": {
    "category": "activity",
    "description": "sports medal",
    "names": [
      "medal_sports"
    ],
    "tags": [
      "gold",
      "winner"
    ]
  },
  "🎖": {
    "category": "activity",
    "description": "military medal",
    "names": [
      "medal_military"
    ],
    "tags": []
  },
  "🥇": {
    "category": "activity",
    "description": "1st place medal",
    "names": [
      "1st_place_medal"
    ],
    "tags": [
      "gold"
    ]
  },
  "🥈": {
    "category": "activity",
    "description": "2nd place medal",
    "names": [
      "2nd_place_medal"
    ],
    "tags": [
      "silver"
    ]
  },
  "🥉": {
    "category": "activity",
    "description": "3rd place medal",
    "names": [
      "3rd_place_medal"
    ],
    "tags": [
      "bronze"
    ]
  },
  "🏆": {
    "category": "activity",
    "description": "trophy",
    "names": [
      "trophy"
    ],
    "tags": [
      "award",
      "contest",
      "winner"
    ]
  },
  "🏵": {
    "category": "activity",
    "description": "rosette",
    "names": [
      "rosette"
    ],
    "tags": []
  },
  "🎗": {
    "category": "activity",
    "description": "reminder ribbon",
    "names": [
      "reminder_ribbon"
    ],
    "tags": []
  },
  "🎫": {
    "category": "activity",
    "description": "ticket",
    "names": [
      "ticket"
    ],
    "tags": []
  },
  "🎟": {
    "category": "activity",
    "description": "admission tickets",
    "names": [
      "tickets"
    ],
    "tags": []
  },
  "🎪": {
    "category": "activity",
    "description": "circus tent",
    "names": [
      "circus_tent"
    ],
    "tags": []
  },
  "🤹‍♀": {
    "category": "activity",
    "description": "woman juggling",
    "names": [
      "woman_juggling"
    ],
    "tags": []
  },
  "🤹‍♂": {
    "category": "activity",
    "description": "man juggling",
    "names": [
      "man_juggling"
    ],
    "tags": []
  },
  "🎭": {
    "category": "activity",
    "description": "performing arts",
    "names": [
      "performing_arts"
    ],
    "tags": [
      "theater",
      "drama"
    ]
  },
  "🎨": {
    "category": "activity",
    "description": "artist palette",
    "names": [
      "art"
    ],
    "tags": [
      "design",
      "paint"
    ]
  },
  "🎬": {
    "category": "activity",
    "description": "clapper board",
    "names": [
      "clapper"
    ],
    "tags": [
      "film"
    ]
  },
  "🎤": {
    "category": "activity",
    "description": "microphone",
    "names": [
      "microphone"
    ],
    "tags": [
      "sing"
    ]
  },
  "🎧": {
    "category": "activity",
    "description": "headphone",
    "names": [
      "headphones"
    ],
    "tags": [
      "music",
      "earphones"
    ]
  },
  "🎼": {
    "category": "activity",
    "description": "musical score",
    "names": [
      "musical_score"
    ],
    "tags": []
  },
  "🎹": {
    "category": "activity",
    "description": "musical keyboard",
    "names": [
      "musical_keyboard"
    ],
    "tags": [
      "piano"
    ]
  },
  "🥁": {
    "category": "activity",
    "description": "drum",
    "names": [
      "drum"
    ],
    "tags": []
  },
  "🎷": {
    "category": "activity",
    "description": "saxophone",
    "names": [
      "saxophone"
    ],
    "tags": []
  },
  "🎺": {
    "category": "activity",
    "description": "trumpet",
    "names": [
      "trumpet"
    ],
    "tags": []
  },
  "🎸": {
    "category": "activity",
    "description": "guitar",
    "names": [
      "guitar"
    ],
    "tags": [
      "rock"
    ]
  },
  "🎻": {
    "category": "activity",
    "description": "violin",
    "names": [
      "violin"
    ],
    "tags": []
  },
  "🎲": {
    "category": "activity",
    "description": "game die",
    "names": [
      "game_die"
    ],
    "tags": [
      "dice",
      "gambling"
    ]
  },
  "🎯": {
    "category": "activity",
    "description": "direct hit",
    "names": [
      "dart"
    ],
    "tags": [
      "target"
    ]
  },
  "🎳": {
    "category": "activity",
    "description": "bowling",
    "names": [
      "bowling"
    ],
    "tags": []
  },
  "🎮": {
    "category": "activity",
    "description": "video game",
    "names": [
      "video_game"
    ],
    "tags": [
      "play",
      "controller",
      "console"
    ]
  },
  "🎰": {
    "category": "activity",
    "description": "slot machine",
    "names": [
      "slot_machine"
    ],
    "tags": []
  },
  "🚗": {
    "category": "places",
    "description": "automobile",
    "names": [
      "car",
      "red_car"
    ],
    "tags": []
  },
  "🚕": {
    "category": "places",
    "description": "taxi",
    "names": [
      "taxi"
    ],
    "tags": []
  },
  "🚙": {
    "category": "places",
    "description": "sport utility vehicle",
    "names": [
      "blue_car"
    ],
    "tags": []
  },
  "🚌": {
    "category": "places",
    "description": "bus",
    "names": [
      "bus"
    ],
    "tags": []
  },
  "🚎": {
    "category": "places",
    "description": "trolleybus",
    "names": [
      "trolleybus"
    ],
    "tags": []
  },
  "🏎": {
    "category": "places",
    "description": "racing car",
    "names": [
      "racing_car"
    ],
    "tags": []
  },
  "🚓": {
    "category": "places",
    "description": "police car",
    "names": [
      "police_car"
    ],
    "tags": []
  },
  "🚑": {
    "category": "places",
    "description": "ambulance",
    "names": [
      "ambulance"
    ],
    "tags": []
  },
  "🚒": {
    "category": "places",
    "description": "fire engine",
    "names": [
      "fire_engine"
    ],
    "tags": []
  },
  "🚐": {
    "category": "places",
    "description": "minibus",
    "names": [
      "minibus"
    ],
    "tags": []
  },
  "🚚": {
    "category": "places",
    "description": "delivery truck",
    "names": [
      "truck"
    ],
    "tags": []
  },
  "🚛": {
    "category": "places",
    "description": "articulated lorry",
    "names": [
      "articulated_lorry"
    ],
    "tags": []
  },
  "🚜": {
    "category": "places",
    "description": "tractor",
    "names": [
      "tractor"
    ],
    "tags": []
  },
  "🛴": {
    "category": "places",
    "description": "kick scooter",
    "names": [
      "kick_scooter"
    ],
    "tags": []
  },
  "🚲": {
    "category": "places",
    "description": "bicycle",
    "names": [
      "bike"
    ],
    "tags": [
      "bicycle"
    ]
  },
  "🛵": {
    "category": "places",
    "description": "motor scooter",
    "names": [
      "motor_scooter"
    ],
    "tags": []
  },
  "🏍": {
    "category": "places",
    "description": "motorcycle",
    "names": [
      "motorcycle"
    ],
    "tags": []
  },
  "🚨": {
    "category": "places",
    "description": "police car light",
    "names": [
      "rotating_light"
    ],
    "tags": [
      "911",
      "emergency"
    ]
  },
  "🚔": {
    "category": "places",
    "description": "oncoming police car",
    "names": [
      "oncoming_police_car"
    ],
    "tags": []
  },
  "🚍": {
    "category": "places",
    "description": "oncoming bus",
    "names": [
      "oncoming_bus"
    ],
    "tags": []
  },
  "🚘": {
    "category": "places",
    "description": "oncoming automobile",
    "names": [
      "oncoming_automobile"
    ],
    "tags": []
  },
  "🚖": {
    "category": "places",
    "description": "oncoming taxi",
    "names": [
      "oncoming_taxi"
    ],
    "tags": []
  },
  "🚡": {
    "category": "places",
    "description": "aerial tramway",
    "names": [
      "aerial_tramway"
    ],
    "tags": []
  },
  "🚠": {
    "category": "places",
    "description": "mountain cableway",
    "names": [
      "mountain_cableway"
    ],
    "tags": []
  },
  "🚟": {
    "category": "places",
    "description": "suspension railway",
    "names": [
      "suspension_railway"
    ],
    "tags": []
  },
  "🚃": {
    "category": "places",
    "description": "railway car",
    "names": [
      "railway_car"
    ],
    "tags": []
  },
  "🚋": {
    "category": "places",
    "description": "tram car",
    "names": [
      "train"
    ],
    "tags": []
  },
  "🚞": {
    "category": "places",
    "description": "mountain railway",
    "names": [
      "mountain_railway"
    ],
    "tags": []
  },
  "🚝": {
    "category": "places",
    "description": "monorail",
    "names": [
      "monorail"
    ],
    "tags": []
  },
  "🚄": {
    "category": "places",
    "description": "high-speed train",
    "names": [
      "bullettrain_side"
    ],
    "tags": [
      "train"
    ]
  },
  "🚅": {
    "category": "places",
    "description": "high-speed train with bullet nose",
    "names": [
      "bullettrain_front"
    ],
    "tags": [
      "train"
    ]
  },
  "🚈": {
    "category": "places",
    "description": "light rail",
    "names": [
      "light_rail"
    ],
    "tags": []
  },
  "🚂": {
    "category": "places",
    "description": "locomotive",
    "names": [
      "steam_locomotive"
    ],
    "tags": [
      "train"
    ]
  },
  "🚆": {
    "category": "places",
    "description": "train",
    "names": [
      "train2"
    ],
    "tags": []
  },
  "🚇": {
    "category": "places",
    "description": "metro",
    "names": [
      "metro"
    ],
    "tags": []
  },
  "🚊": {
    "category": "places",
    "description": "tram",
    "names": [
      "tram"
    ],
    "tags": []
  },
  "🚉": {
    "category": "places",
    "description": "station",
    "names": [
      "station"
    ],
    "tags": []
  },
  "🚁": {
    "category": "places",
    "description": "helicopter",
    "names": [
      "helicopter"
    ],
    "tags": []
  },
  "🛩": {
    "category": "places",
    "description": "small airplane",
    "names": [
      "small_airplane"
    ],
    "tags": [
      "flight"
    ]
  },
  "✈️": {
    "category": "places",
    "description": "airplane",
    "names": [
      "airplane"
    ],
    "tags": [
      "flight"
    ]
  },
  "🛫": {
    "category": "places",
    "description": "airplane departure",
    "names": [
      "flight_departure"
    ],
    "tags": []
  },
  "🛬": {
    "category": "places",
    "description": "airplane arrival",
    "names": [
      "flight_arrival"
    ],
    "tags": []
  },
  "🚀": {
    "category": "places",
    "description": "rocket",
    "names": [
      "rocket"
    ],
    "tags": [
      "ship",
      "launch"
    ]
  },
  "🛰": {
    "category": "places",
    "description": "satellite",
    "names": [
      "artificial_satellite"
    ],
    "tags": [
      "orbit",
      "space"
    ]
  },
  "💺": {
    "category": "places",
    "description": "seat",
    "names": [
      "seat"
    ],
    "tags": []
  },
  "🛶": {
    "category": "places",
    "description": "canoe",
    "names": [
      "canoe"
    ],
    "tags": []
  },
  "⛵️": {
    "category": "places",
    "description": "sailboat",
    "names": [
      "boat",
      "sailboat"
    ],
    "tags": []
  },
  "🛥": {
    "category": "places",
    "description": "motor boat",
    "names": [
      "motor_boat"
    ],
    "tags": []
  },
  "🚤": {
    "category": "places",
    "description": "speedboat",
    "names": [
      "speedboat"
    ],
    "tags": [
      "ship"
    ]
  },
  "🛳": {
    "category": "places",
    "description": "passenger ship",
    "names": [
      "passenger_ship"
    ],
    "tags": [
      "cruise"
    ]
  },
  "⛴": {
    "category": "places",
    "description": "ferry",
    "names": [
      "ferry"
    ],
    "tags": []
  },
  "🚢": {
    "category": "places",
    "description": "ship",
    "names": [
      "ship"
    ],
    "tags": []
  },
  "⚓️": {
    "category": "places",
    "description": "anchor",
    "names": [
      "anchor"
    ],
    "tags": [
      "ship"
    ]
  },
  "🚧": {
    "category": "places",
    "description": "construction",
    "names": [
      "construction"
    ],
    "tags": [
      "wip"
    ]
  },
  "⛽️": {
    "category": "places",
    "description": "fuel pump",
    "names": [
      "fuelpump"
    ],
    "tags": []
  },
  "🚏": {
    "category": "places",
    "description": "bus stop",
    "names": [
      "busstop"
    ],
    "tags": []
  },
  "🚦": {
    "category": "places",
    "description": "vertical traffic light",
    "names": [
      "vertical_traffic_light"
    ],
    "tags": [
      "semaphore"
    ]
  },
  "🚥": {
    "category": "places",
    "description": "horizontal traffic light",
    "names": [
      "traffic_light"
    ],
    "tags": []
  },
  "🗺": {
    "category": "places",
    "description": "world map",
    "names": [
      "world_map"
    ],
    "tags": [
      "travel"
    ]
  },
  "🗿": {
    "category": "places",
    "description": "moai",
    "names": [
      "moyai"
    ],
    "tags": [
      "stone"
    ]
  },
  "🗽": {
    "category": "places",
    "description": "Statue of Liberty",
    "names": [
      "statue_of_liberty"
    ],
    "tags": []
  },
  "⛲️": {
    "category": "places",
    "description": "fountain",
    "names": [
      "fountain"
    ],
    "tags": []
  },
  "🗼": {
    "category": "places",
    "description": "Tokyo tower",
    "names": [
      "tokyo_tower"
    ],
    "tags": []
  },
  "🏰": {
    "category": "places",
    "description": "castle",
    "names": [
      "european_castle"
    ],
    "tags": []
  },
  "🏯": {
    "category": "places",
    "description": "Japanese castle",
    "names": [
      "japanese_castle"
    ],
    "tags": []
  },
  "🏟": {
    "category": "places",
    "description": "stadium",
    "names": [
      "stadium"
    ],
    "tags": []
  },
  "🎡": {
    "category": "places",
    "description": "ferris wheel",
    "names": [
      "ferris_wheel"
    ],
    "tags": []
  },
  "🎢": {
    "category": "places",
    "description": "roller coaster",
    "names": [
      "roller_coaster"
    ],
    "tags": []
  },
  "🎠": {
    "category": "places",
    "description": "carousel horse",
    "names": [
      "carousel_horse"
    ],
    "tags": []
  },
  "⛱": {
    "category": "places",
    "description": "umbrella on ground",
    "names": [
      "parasol_on_ground"
    ],
    "tags": [
      "beach_umbrella"
    ]
  },
  "🏖": {
    "category": "places",
    "description": "beach with umbrella",
    "names": [
      "beach_umbrella"
    ],
    "tags": []
  },
  "🏝": {
    "category": "places",
    "description": "desert island",
    "names": [
      "desert_island"
    ],
    "tags": []
  },
  "⛰": {
    "category": "places",
    "description": "mountain",
    "names": [
      "mountain"
    ],
    "tags": []
  },
  "🏔": {
    "category": "places",
    "description": "snow-capped mountain",
    "names": [
      "mountain_snow"
    ],
    "tags": []
  },
  "🗻": {
    "category": "places",
    "description": "mount fuji",
    "names": [
      "mount_fuji"
    ],
    "tags": []
  },
  "🌋": {
    "category": "places",
    "description": "volcano",
    "names": [
      "volcano"
    ],
    "tags": []
  },
  "🏜": {
    "category": "places",
    "description": "desert",
    "names": [
      "desert"
    ],
    "tags": []
  },
  "🏕": {
    "category": "places",
    "description": "camping",
    "names": [
      "camping"
    ],
    "tags": []
  },
  "⛺️": {
    "category": "places",
    "description": "tent",
    "names": [
      "tent"
    ],
    "tags": [
      "camping"
    ]
  },
  "🛤": {
    "category": "places",
    "description": "railway track",
    "names": [
      "railway_track"
    ],
    "tags": []
  },
  "🛣": {
    "category": "places",
    "description": "motorway",
    "names": [
      "motorway"
    ],
    "tags": []
  },
  "🏗": {
    "category": "places",
    "description": "building construction",
    "names": [
      "building_construction"
    ],
    "tags": []
  },
  "🏭": {
    "category": "places",
    "description": "factory",
    "names": [
      "factory"
    ],
    "tags": []
  },
  "🏠": {
    "category": "places",
    "description": "house",
    "names": [
      "house"
    ],
    "tags": []
  },
  "🏡": {
    "category": "places",
    "description": "house with garden",
    "names": [
      "house_with_garden"
    ],
    "tags": []
  },
  "🏘": {
    "category": "places",
    "description": "house",
    "names": [
      "houses"
    ],
    "tags": []
  },
  "🏚": {
    "category": "places",
    "description": "derelict house",
    "names": [
      "derelict_house"
    ],
    "tags": []
  },
  "🏢": {
    "category": "places",
    "description": "office building",
    "names": [
      "office"
    ],
    "tags": []
  },
  "🏬": {
    "category": "places",
    "description": "department store",
    "names": [
      "department_store"
    ],
    "tags": []
  },
  "🏣": {
    "category": "places",
    "description": "Japanese post office",
    "names": [
      "post_office"
    ],
    "tags": []
  },
  "🏤": {
    "category": "places",
    "description": "post office",
    "names": [
      "european_post_office"
    ],
    "tags": []
  },
  "🏥": {
    "category": "places",
    "description": "hospital",
    "names": [
      "hospital"
    ],
    "tags": []
  },
  "🏦": {
    "category": "places",
    "description": "bank",
    "names": [
      "bank"
    ],
    "tags": []
  },
  "🏨": {
    "category": "places",
    "description": "hotel",
    "names": [
      "hotel"
    ],
    "tags": []
  },
  "🏪": {
    "category": "places",
    "description": "convenience store",
    "names": [
      "convenience_store"
    ],
    "tags": []
  },
  "🏫": {
    "category": "places",
    "description": "school",
    "names": [
      "school"
    ],
    "tags": []
  },
  "🏩": {
    "category": "places",
    "description": "love hotel",
    "names": [
      "love_hotel"
    ],
    "tags": []
  },
  "💒": {
    "category": "places",
    "description": "wedding",
    "names": [
      "wedding"
    ],
    "tags": [
      "marriage"
    ]
  },
  "🏛": {
    "category": "places",
    "description": "classical building",
    "names": [
      "classical_building"
    ],
    "tags": []
  },
  "⛪️": {
    "category": "places",
    "description": "church",
    "names": [
      "church"
    ],
    "tags": []
  },
  "🕌": {
    "category": "places",
    "description": "mosque",
    "names": [
      "mosque"
    ],
    "tags": []
  },
  "🕍": {
    "category": "places",
    "description": "synagogue",
    "names": [
      "synagogue"
    ],
    "tags": []
  },
  "🕋": {
    "category": "places",
    "description": "kaaba",
    "names": [
      "kaaba"
    ],
    "tags": []
  },
  "⛩": {
    "category": "places",
    "description": "shinto shrine",
    "names": [
      "shinto_shrine"
    ],
    "tags": []
  },
  "🗾": {
    "category": "places",
    "description": "map of Japan",
    "names": [
      "japan"
    ],
    "tags": []
  },
  "🎑": {
    "category": "places",
    "description": "moon viewing ceremony",
    "names": [
      "rice_scene"
    ],
    "tags": []
  },
  "🏞": {
    "category": "places",
    "description": "national park",
    "names": [
      "national_park"
    ],
    "tags": []
  },
  "🌅": {
    "category": "places",
    "description": "sunrise",
    "names": [
      "sunrise"
    ],
    "tags": []
  },
  "🌄": {
    "category": "places",
    "description": "sunrise over mountains",
    "names": [
      "sunrise_over_mountains"
    ],
    "tags": []
  },
  "🌠": {
    "category": "places",
    "description": "shooting star",
    "names": [
      "stars"
    ],
    "tags": []
  },
  "🎇": {
    "category": "places",
    "description": "sparkler",
    "names": [
      "sparkler"
    ],
    "tags": []
  },
  "🎆": {
    "category": "places",
    "description": "fireworks",
    "names": [
      "fireworks"
    ],
    "tags": [
      "festival",
      "celebration"
    ]
  },
  "🌇": {
    "category": "places",
    "description": "sunset",
    "names": [
      "city_sunrise"
    ],
    "tags": []
  },
  "🌆": {
    "category": "places",
    "description": "cityscape at dusk",
    "names": [
      "city_sunset"
    ],
    "tags": []
  },
  "🏙": {
    "category": "places",
    "description": "cityscape",
    "names": [
      "cityscape"
    ],
    "tags": [
      "skyline"
    ]
  },
  "🌃": {
    "category": "places",
    "description": "night with stars",
    "names": [
      "night_with_stars"
    ],
    "tags": []
  },
  "🌌": {
    "category": "places",
    "description": "milky way",
    "names": [
      "milky_way"
    ],
    "tags": []
  },
  "🌉": {
    "category": "places",
    "description": "bridge at night",
    "names": [
      "bridge_at_night"
    ],
    "tags": []
  },
  "🌁": {
    "category": "places",
    "description": "foggy",
    "names": [
      "foggy"
    ],
    "tags": [
      "karl"
    ]
  },
  "⌚️": {
    "category": "objects",
    "description": "watch",
    "names": [
      "watch"
    ],
    "tags": [
      "time"
    ]
  },
  "📱": {
    "category": "objects",
    "description": "mobile phone",
    "names": [
      "iphone"
    ],
    "tags": [
      "smartphone",
      "mobile"
    ]
  },
  "📲": {
    "category": "objects",
    "description": "mobile phone with arrow",
    "names": [
      "calling"
    ],
    "tags": [
      "call",
      "incoming"
    ]
  },
  "💻": {
    "category": "objects",
    "description": "laptop computer",
    "names": [
      "computer"
    ],
    "tags": [
      "desktop",
      "screen"
    ]
  },
  "⌨️": {
    "category": "objects",
    "description": "keyboard",
    "names": [
      "keyboard"
    ],
    "tags": []
  },
  "🖥": {
    "category": "objects",
    "description": "desktop computer",
    "names": [
      "desktop_computer"
    ],
    "tags": []
  },
  "🖨": {
    "category": "objects",
    "description": "printer",
    "names": [
      "printer"
    ],
    "tags": []
  },
  "🖱": {
    "category": "objects",
    "description": "computer mouse",
    "names": [
      "computer_mouse"
    ],
    "tags": []
  },
  "🖲": {
    "category": "objects",
    "description": "trackball",
    "names": [
      "trackball"
    ],
    "tags": []
  },
  "🕹": {
    "category": "objects",
    "description": "joystick",
    "names": [
      "joystick"
    ],
    "tags": []
  },
  "🗜": {
    "category": "objects",
    "description": "clamp",
    "names": [
      "clamp"
    ],
    "tags": []
  },
  "💽": {
    "category": "objects",
    "description": "computer disk",
    "names": [
      "minidisc"
    ],
    "tags": []
  },
  "💾": {
    "category": "objects",
    "description": "floppy disk",
    "names": [
      "floppy_disk"
    ],
    "tags": [
      "save"
    ]
  },
  "💿": {
    "category": "objects",
    "description": "optical disk",
    "names": [
      "cd"
    ],
    "tags": []
  },
  "📀": {
    "category": "objects",
    "description": "dvd",
    "names": [
      "dvd"
    ],
    "tags": []
  },
  "📼": {
    "category": "objects",
    "description": "videocassette",
    "names": [
      "vhs"
    ],
    "tags": []
  },
  "📷": {
    "category": "objects",
    "description": "camera",
    "names": [
      "camera"
    ],
    "tags": [
      "photo"
    ]
  },
  "📸": {
    "category": "objects",
    "description": "camera with flash",
    "names": [
      "camera_flash"
    ],
    "tags": [
      "photo"
    ]
  },
  "📹": {
    "category": "objects",
    "description": "video camera",
    "names": [
      "video_camera"
    ],
    "tags": []
  },
  "🎥": {
    "category": "objects",
    "description": "movie camera",
    "names": [
      "movie_camera"
    ],
    "tags": [
      "film",
      "video"
    ]
  },
  "📽": {
    "category": "objects",
    "description": "film projector",
    "names": [
      "film_projector"
    ],
    "tags": []
  },
  "🎞": {
    "category": "objects",
    "description": "film frames",
    "names": [
      "film_strip"
    ],
    "tags": []
  },
  "📞": {
    "category": "objects",
    "description": "telephone receiver",
    "names": [
      "telephone_receiver"
    ],
    "tags": [
      "phone",
      "call"
    ]
  },
  "☎️": {
    "category": "objects",
    "description": "telephone",
    "names": [
      "phone",
      "telephone"
    ],
    "tags": []
  },
  "📟": {
    "category": "objects",
    "description": "pager",
    "names": [
      "pager"
    ],
    "tags": []
  },
  "📠": {
    "category": "objects",
    "description": "fax machine",
    "names": [
      "fax"
    ],
    "tags": []
  },
  "📺": {
    "category": "objects",
    "description": "television",
    "names": [
      "tv"
    ],
    "tags": []
  },
  "📻": {
    "category": "objects",
    "description": "radio",
    "names": [
      "radio"
    ],
    "tags": [
      "podcast"
    ]
  },
  "🎙": {
    "category": "objects",
    "description": "studio microphone",
    "names": [
      "studio_microphone"
    ],
    "tags": [
      "podcast"
    ]
  },
  "🎚": {
    "category": "objects",
    "description": "level slider",
    "names": [
      "level_slider"
    ],
    "tags": []
  },
  "🎛": {
    "category": "objects",
    "description": "control knobs",
    "names": [
      "control_knobs"
    ],
    "tags": []
  },
  "⏱": {
    "category": "objects",
    "description": "stopwatch",
    "names": [
      "stopwatch"
    ],
    "tags": []
  },
  "⏲": {
    "category": "objects",
    "description": "timer clock",
    "names": [
      "timer_clock"
    ],
    "tags": []
  },
  "⏰": {
    "category": "objects",
    "description": "alarm clock",
    "names": [
      "alarm_clock"
    ],
    "tags": [
      "morning"
    ]
  },
  "🕰": {
    "category": "objects",
    "description": "mantelpiece clock",
    "names": [
      "mantelpiece_clock"
    ],
    "tags": []
  },
  "⌛️": {
    "category": "objects",
    "description": "hourglass",
    "names": [
      "hourglass"
    ],
    "tags": [
      "time"
    ]
  },
  "⏳": {
    "category": "objects",
    "description": "hourglass with flowing sand",
    "names": [
      "hourglass_flowing_sand"
    ],
    "tags": [
      "time"
    ]
  },
  "📡": {
    "category": "objects",
    "description": "satellite antenna",
    "names": [
      "satellite"
    ],
    "tags": [
      "signal"
    ]
  },
  "🔋": {
    "category": "objects",
    "description": "battery",
    "names": [
      "battery"
    ],
    "tags": [
      "power"
    ]
  },
  "🔌": {
    "category": "objects",
    "description": "electric plug",
    "names": [
      "electric_plug"
    ],
    "tags": []
  },
  "💡": {
    "category": "objects",
    "description": "light bulb",
    "names": [
      "bulb"
    ],
    "tags": [
      "idea",
      "light"
    ]
  },
  "🔦": {
    "category": "objects",
    "description": "flashlight",
    "names": [
      "flashlight"
    ],
    "tags": []
  },
  "🕯": {
    "category": "objects",
    "description": "candle",
    "names": [
      "candle"
    ],
    "tags": []
  },
  "🗑": {
    "category": "objects",
    "description": "wastebasket",
    "names": [
      "wastebasket"
    ],
    "tags": [
      "trash"
    ]
  },
  "🛢": {
    "category": "objects",
    "description": "oil drum",
    "names": [
      "oil_drum"
    ],
    "tags": []
  },
  "💸": {
    "category": "objects",
    "description": "money with wings",
    "names": [
      "money_with_wings"
    ],
    "tags": [
      "dollar"
    ]
  },
  "💵": {
    "category": "objects",
    "description": "dollar banknote",
    "names": [
      "dollar"
    ],
    "tags": [
      "money"
    ]
  },
  "💴": {
    "category": "objects",
    "description": "yen banknote",
    "names": [
      "yen"
    ],
    "tags": []
  },
  "💶": {
    "category": "objects",
    "description": "euro banknote",
    "names": [
      "euro"
    ],
    "tags": []
  },
  "💷": {
    "category": "objects",
    "description": "pound banknote",
    "names": [
      "pound"
    ],
    "tags": []
  },
  "💰": {
    "category": "objects",
    "description": "money bag",
    "names": [
      "moneybag"
    ],
    "tags": [
      "dollar",
      "cream"
    ]
  },
  "💳": {
    "category": "objects",
    "description": "credit card",
    "names": [
      "credit_card"
    ],
    "tags": [
      "subscription"
    ]
  },
  "💎": {
    "category": "objects",
    "description": "gem stone",
    "names": [
      "gem"
    ],
    "tags": [
      "diamond"
    ]
  },
  "⚖️": {
    "category": "objects",
    "description": "balance scale",
    "names": [
      "balance_scale"
    ],
    "tags": []
  },
  "🔧": {
    "category": "objects",
    "description": "wrench",
    "names": [
      "wrench"
    ],
    "tags": [
      "tool"
    ]
  },
  "🔨": {
    "category": "objects",
    "description": "hammer",
    "names": [
      "hammer"
    ],
    "tags": [
      "tool"
    ]
  },
  "⚒": {
    "category": "objects",
    "description": "hammer and pick",
    "names": [
      "hammer_and_pick"
    ],
    "tags": []
  },
  "🛠": {
    "category": "objects",
    "description": "hammer and wrench",
    "names": [
      "hammer_and_wrench"
    ],
    "tags": []
  },
  "⛏": {
    "category": "objects",
    "description": "pick",
    "names": [
      "pick"
    ],
    "tags": []
  },
  "🔩": {
    "category": "objects",
    "description": "nut and bolt",
    "names": [
      "nut_and_bolt"
    ],
    "tags": []
  },
  "⚙️": {
    "category": "objects",
    "description": "gear",
    "names": [
      "gear"
    ],
    "tags": []
  },
  "⛓": {
    "category": "objects",
    "description": "chains",
    "names": [
      "chains"
    ],
    "tags": []
  },
  "🔫": {
    "category": "objects",
    "description": "pistol",
    "names": [
      "gun"
    ],
    "tags": [
      "shoot",
      "weapon"
    ]
  },
  "💣": {
    "category": "objects",
    "description": "bomb",
    "names": [
      "bomb"
    ],
    "tags": [
      "boom"
    ]
  },
  "🔪": {
    "category": "objects",
    "description": "kitchen knife",
    "names": [
      "hocho",
      "knife"
    ],
    "tags": [
      "cut",
      "chop"
    ]
  },
  "🗡": {
    "category": "objects",
    "description": "dagger",
    "names": [
      "dagger"
    ],
    "tags": []
  },
  "⚔️": {
    "category": "objects",
    "description": "crossed swords",
    "names": [
      "crossed_swords"
    ],
    "tags": []
  },
  "🛡": {
    "category": "objects",
    "description": "shield",
    "names": [
      "shield"
    ],
    "tags": []
  },
  "🚬": {
    "category": "objects",
    "description": "cigarette",
    "names": [
      "smoking"
    ],
    "tags": [
      "cigarette"
    ]
  },
  "⚰️": {
    "category": "objects",
    "description": "coffin",
    "names": [
      "coffin"
    ],
    "tags": [
      "funeral"
    ]
  },
  "⚱️": {
    "category": "objects",
    "description": "funeral urn",
    "names": [
      "funeral_urn"
    ],
    "tags": []
  },
  "🏺": {
    "category": "objects",
    "description": "amphora",
    "names": [
      "amphora"
    ],
    "tags": []
  },
  "🔮": {
    "category": "objects",
    "description": "crystal ball",
    "names": [
      "crystal_ball"
    ],
    "tags": [
      "fortune"
    ]
  },
  "📿": {
    "category": "objects",
    "description": "prayer beads",
    "names": [
      "prayer_beads"
    ],
    "tags": []
  },
  "💈": {
    "category": "objects",
    "description": "barber pole",
    "names": [
      "barber"
    ],
    "tags": []
  },
  "⚗️": {
    "category": "objects",
    "description": "alembic",
    "names": [
      "alembic"
    ],
    "tags": []
  },
  "🔭": {
    "category": "objects",
    "description": "telescope",
    "names": [
      "telescope"
    ],
    "tags": []
  },
  "🔬": {
    "category": "objects",
    "description": "microscope",
    "names": [
      "microscope"
    ],
    "tags": [
      "science",
      "laboratory",
      "investigate"
    ]
  },
  "🕳": {
    "category": "objects",
    "description": "hole",
    "names": [
      "hole"
    ],
    "tags": []
  },
  "💊": {
    "category": "objects",
    "description": "pill",
    "names": [
      "pill"
    ],
    "tags": [
      "health",
      "medicine"
    ]
  },
  "💉": {
    "category": "objects",
    "description": "syringe",
    "names": [
      "syringe"
    ],
    "tags": [
      "health",
      "hospital",
      "needle"
    ]
  },
  "🌡": {
    "category": "objects",
    "description": "thermometer",
    "names": [
      "thermometer"
    ],
    "tags": []
  },
  "🚽": {
    "category": "objects",
    "description": "toilet",
    "names": [
      "toilet"
    ],
    "tags": [
      "wc"
    ]
  },
  "🚰": {
    "category": "objects",
    "description": "potable water",
    "names": [
      "potable_water"
    ],
    "tags": []
  },
  "🚿": {
    "category": "objects",
    "description": "shower",
    "names": [
      "shower"
    ],
    "tags": [
      "bath"
    ]
  },
  "🛁": {
    "category": "objects",
    "description": "bathtub",
    "names": [
      "bathtub"
    ],
    "tags": []
  },
  "🛀": {
    "category": "objects",
    "description": "person taking bath",
    "names": [
      "bath"
    ],
    "tags": [
      "shower"
    ]
  },
  "🛎": {
    "category": "objects",
    "description": "bellhop bell",
    "names": [
      "bellhop_bell"
    ],
    "tags": []
  },
  "🔑": {
    "category": "objects",
    "description": "key",
    "names": [
      "key"
    ],
    "tags": [
      "lock",
      "password"
    ]
  },
  "🗝": {
    "category": "objects",
    "description": "old key",
    "names": [
      "old_key"
    ],
    "tags": []
  },
  "🚪": {
    "category": "objects",
    "description": "door",
    "names": [
      "door"
    ],
    "tags": []
  },
  "🛋": {
    "category": "objects",
    "description": "couch and lamp",
    "names": [
      "couch_and_lamp"
    ],
    "tags": []
  },
  "🛏": {
    "category": "objects",
    "description": "bed",
    "names": [
      "bed"
    ],
    "tags": []
  },
  "🛌": {
    "category": "objects",
    "description": "person in bed",
    "names": [
      "sleeping_bed"
    ],
    "tags": []
  },
  "🖼": {
    "category": "objects",
    "description": "framed picture",
    "names": [
      "framed_picture"
    ],
    "tags": []
  },
  "🛍": {
    "category": "objects",
    "description": "shopping bags",
    "names": [
      "shopping"
    ],
    "tags": [
      "bags"
    ]
  },
  "🛒": {
    "category": "objects",
    "description": "shopping cart",
    "names": [
      "shopping_cart"
    ],
    "tags": []
  },
  "🎁": {
    "category": "objects",
    "description": "wrapped gift",
    "names": [
      "gift"
    ],
    "tags": [
      "present",
      "birthday",
      "christmas"
    ]
  },
  "🎈": {
    "category": "objects",
    "description": "balloon",
    "names": [
      "balloon"
    ],
    "tags": [
      "party",
      "birthday"
    ]
  },
  "🎏": {
    "category": "objects",
    "description": "carp streamer",
    "names": [
      "flags"
    ],
    "tags": []
  },
  "🎀": {
    "category": "objects",
    "description": "ribbon",
    "names": [
      "ribbon"
    ],
    "tags": []
  },
  "🎊": {
    "category": "objects",
    "description": "confetti ball",
    "names": [
      "confetti_ball"
    ],
    "tags": []
  },
  "🎉": {
    "category": "objects",
    "description": "party popper",
    "names": [
      "tada"
    ],
    "tags": [
      "hooray",
      "party"
    ]
  },
  "🎎": {
    "category": "objects",
    "description": "Japanese dolls",
    "names": [
      "dolls"
    ],
    "tags": []
  },
  "🏮": {
    "category": "objects",
    "description": "red paper lantern",
    "names": [
      "izakaya_lantern",
      "lantern"
    ],
    "tags": []
  },
  "🎐": {
    "category": "objects",
    "description": "wind chime",
    "names": [
      "wind_chime"
    ],
    "tags": []
  },
  "✉️": {
    "category": "objects",
    "description": "envelope",
    "names": [
      "email",
      "envelope"
    ],
    "tags": [
      "letter"
    ]
  },
  "📩": {
    "category": "objects",
    "description": "envelope with arrow",
    "names": [
      "envelope_with_arrow"
    ],
    "tags": []
  },
  "📨": {
    "category": "objects",
    "description": "incoming envelope",
    "names": [
      "incoming_envelope"
    ],
    "tags": []
  },
  "📧": {
    "category": "objects",
    "description": "e-mail",
    "names": [
      "e-mail"
    ],
    "tags": []
  },
  "💌": {
    "category": "objects",
    "description": "love letter",
    "names": [
      "love_letter"
    ],
    "tags": [
      "email",
      "envelope"
    ]
  },
  "📥": {
    "category": "objects",
    "description": "inbox tray",
    "names": [
      "inbox_tray"
    ],
    "tags": []
  },
  "📤": {
    "category": "objects",
    "description": "outbox tray",
    "names": [
      "outbox_tray"
    ],
    "tags": []
  },
  "📦": {
    "category": "objects",
    "description": "package",
    "names": [
      "package"
    ],
    "tags": [
      "shipping"
    ]
  },
  "🏷": {
    "category": "objects",
    "description": "label",
    "names": [
      "label"
    ],
    "tags": [
      "tag"
    ]
  },
  "📪": {
    "category": "objects",
    "description": "closed mailbox with lowered flag",
    "names": [
      "mailbox_closed"
    ],
    "tags": []
  },
  "📫": {
    "category": "objects",
    "description": "closed mailbox with raised flag",
    "names": [
      "mailbox"
    ],
    "tags": []
  },
  "📬": {
    "category": "objects",
    "description": "open mailbox with raised flag",
    "names": [
      "mailbox_with_mail"
    ],
    "tags": []
  },
  "📭": {
    "category": "objects",
    "description": "open mailbox with lowered flag",
    "names": [
      "mailbox_with_no_mail"
    ],
    "tags": []
  },
  "📮": {
    "category": "objects",
    "description": "postbox",
    "names": [
      "postbox"
    ],
    "tags": []
  },
  "📯": {
    "category": "objects",
    "description": "postal horn",
    "names": [
      "postal_horn"
    ],
    "tags": []
  },
  "📜": {
    "category": "objects",
    "description": "scroll",
    "names": [
      "scroll"
    ],
    "tags": [
      "document"
    ]
  },
  "📃": {
    "category": "objects",
    "description": "page with curl",
    "names": [
      "page_with_curl"
    ],
    "tags": []
  },
  "📄": {
    "category": "objects",
    "description": "page facing up",
    "names": [
      "page_facing_up"
    ],
    "tags": [
      "document"
    ]
  },
  "📑": {
    "category": "objects",
    "description": "bookmark tabs",
    "names": [
      "bookmark_tabs"
    ],
    "tags": []
  },
  "📊": {
    "category": "objects",
    "description": "bar chart",
    "names": [
      "bar_chart"
    ],
    "tags": [
      "stats",
      "metrics"
    ]
  },
  "📈": {
    "category": "objects",
    "description": "chart increasing",
    "names": [
      "chart_with_upwards_trend"
    ],
    "tags": [
      "graph",
      "metrics"
    ]
  },
  "📉": {
    "category": "objects",
    "description": "chart decreasing",
    "names": [
      "chart_with_downwards_trend"
    ],
    "tags": [
      "graph",
      "metrics"
    ]
  },
  "🗒": {
    "category": "objects",
    "description": "spiral notepad",
    "names": [
      "spiral_notepad"
    ],
    "tags": []
  },
  "🗓": {
    "category": "objects",
    "description": "spiral calendar",
    "names": [
      "spiral_calendar"
    ],
    "tags": []
  },
  "📆": {
    "category": "objects",
    "description": "tear-off calendar",
    "names": [
      "calendar"
    ],
    "tags": [
      "schedule"
    ]
  },
  "📅": {
    "category": "objects",
    "description": "calendar",
    "names": [
      "date"
    ],
    "tags": [
      "calendar",
      "schedule"
    ]
  },
  "📇": {
    "category": "objects",
    "description": "card index",
    "names": [
      "card_index"
    ],
    "tags": []
  },
  "🗃": {
    "category": "objects",
    "description": "card file box",
    "names": [
      "card_file_box"
    ],
    "tags": []
  },
  "🗳": {
    "category": "objects",
    "description": "ballot box with ballot",
    "names": [
      "ballot_box"
    ],
    "tags": []
  },
  "🗄": {
    "category": "objects",
    "description": "file cabinet",
    "names": [
      "file_cabinet"
    ],
    "tags": []
  },
  "📋": {
    "category": "objects",
    "description": "clipboard",
    "names": [
      "clipboard"
    ],
    "tags": []
  },
  "📁": {
    "category": "objects",
    "description": "file folder",
    "names": [
      "file_folder"
    ],
    "tags": [
      "directory"
    ]
  },
  "📂": {
    "category": "objects",
    "description": "open file folder",
    "names": [
      "open_file_folder"
    ],
    "tags": []
  },
  "🗂": {
    "category": "objects",
    "description": "card index dividers",
    "names": [
      "card_index_dividers"
    ],
    "tags": []
  },
  "🗞": {
    "category": "objects",
    "description": "rolled-up newspaper",
    "names": [
      "newspaper_roll"
    ],
    "tags": [
      "press"
    ]
  },
  "📰": {
    "category": "objects",
    "description": "newspaper",
    "names": [
      "newspaper"
    ],
    "tags": [
      "press"
    ]
  },
  "📓": {
    "category": "objects",
    "description": "notebook",
    "names": [
      "notebook"
    ],
    "tags": []
  },
  "📔": {
    "category": "objects",
    "description": "notebook with decorative cover",
    "names": [
      "notebook_with_decorative_cover"
    ],
    "tags": []
  },
  "📒": {
    "category": "objects",
    "description": "ledger",
    "names": [
      "ledger"
    ],
    "tags": []
  },
  "📕": {
    "category": "objects",
    "description": "closed book",
    "names": [
      "closed_book"
    ],
    "tags": []
  },
  "📗": {
    "category": "objects",
    "description": "green book",
    "names": [
      "green_book"
    ],
    "tags": []
  },
  "📘": {
    "category": "objects",
    "description": "blue book",
    "names": [
      "blue_book"
    ],
    "tags": []
  },
  "📙": {
    "category": "objects",
    "description": "orange book",
    "names": [
      "orange_book"
    ],
    "tags": []
  },
  "📚": {
    "category": "objects",
    "description": "books",
    "names": [
      "books"
    ],
    "tags": [
      "library"
    ]
  },
  "📖": {
    "category": "objects",
    "description": "open book",
    "names": [
      "book",
      "open_book"
    ],
    "tags": []
  },
  "🔖": {
    "category": "objects",
    "description": "bookmark",
    "names": [
      "bookmark"
    ],
    "tags": []
  },
  "🔗": {
    "category": "objects",
    "description": "link",
    "names": [
      "link"
    ],
    "tags": []
  },
  "📎": {
    "category": "objects",
    "description": "paperclip",
    "names": [
      "paperclip"
    ],
    "tags": []
  },
  "🖇": {
    "category": "objects",
    "description": "linked paperclips",
    "names": [
      "paperclips"
    ],
    "tags": []
  },
  "📐": {
    "category": "objects",
    "description": "triangular ruler",
    "names": [
      "triangular_ruler"
    ],
    "tags": []
  },
  "📏": {
    "category": "objects",
    "description": "straight ruler",
    "names": [
      "straight_ruler"
    ],
    "tags": []
  },
  "📌": {
    "category": "objects",
    "description": "pushpin",
    "names": [
      "pushpin"
    ],
    "tags": [
      "location"
    ]
  },
  "📍": {
    "category": "objects",
    "description": "round pushpin",
    "names": [
      "round_pushpin"
    ],
    "tags": [
      "location"
    ]
  },
  "✂️": {
    "category": "objects",
    "description": "scissors",
    "names": [
      "scissors"
    ],
    "tags": [
      "cut"
    ]
  },
  "🖊": {
    "category": "objects",
    "description": "pen",
    "names": [
      "pen"
    ],
    "tags": []
  },
  "🖋": {
    "category": "objects",
    "description": "fountain pen",
    "names": [
      "fountain_pen"
    ],
    "tags": []
  },
  "✒️": {
    "category": "objects",
    "description": "black nib",
    "names": [
      "black_nib"
    ],
    "tags": []
  },
  "🖌": {
    "category": "objects",
    "description": "paintbrush",
    "names": [
      "paintbrush"
    ],
    "tags": []
  },
  "🖍": {
    "category": "objects",
    "description": "crayon",
    "names": [
      "crayon"
    ],
    "tags": []
  },
  "📝": {
    "category": "objects",
    "description": "memo",
    "names": [
      "memo",
      "pencil"
    ],
    "tags": [
      "document",
      "note"
    ]
  },
  "✏️": {
    "category": "objects",
    "description": "pencil",
    "names": [
      "pencil2"
    ],
    "tags": []
  },
  "🔍": {
    "category": "objects",
    "description": "left-pointing magnifying glass",
    "names": [
      "mag"
    ],
    "tags": [
      "search",
      "zoom"
    ]
  },
  "🔎": {
    "category": "objects",
    "description": "right-pointing magnifying glass",
    "names": [
      "mag_right"
    ],
    "tags": []
  },
  "🔏": {
    "category": "objects",
    "description": "locked with pen",
    "names": [
      "lock_with_ink_pen"
    ],
    "tags": []
  },
  "🔐": {
    "category": "objects",
    "description": "locked with key",
    "names": [
      "closed_lock_with_key"
    ],
    "tags": [
      "security"
    ]
  },
  "🔒": {
    "category": "objects",
    "description": "locked",
    "names": [
      "lock"
    ],
    "tags": [
      "security",
      "private"
    ]
  },
  "🔓": {
    "category": "objects",
    "description": "unlocked",
    "names": [
      "unlock"
    ],
    "tags": [
      "security"
    ]
  },
  "❤️": {
    "category": "symbols",
    "description": "red heart",
    "names": [
      "heart"
    ],
    "tags": [
      "love"
    ]
  },
  "💛": {
    "category": "symbols",
    "description": "yellow heart",
    "names": [
      "yellow_heart"
    ],
    "tags": []
  },
  "💚": {
    "category": "symbols",
    "description": "green heart",
    "names": [
      "green_heart"
    ],
    "tags": []
  },
  "💙": {
    "category": "symbols",
    "description": "blue heart",
    "names": [
      "blue_heart"
    ],
    "tags": []
  },
  "💜": {
    "category": "symbols",
    "description": "purple heart",
    "names": [
      "purple_heart"
    ],
    "tags": []
  },
  "🖤": {
    "category": "symbols",
    "description": "black heart",
    "names": [
      "black_heart"
    ],
    "tags": []
  },
  "💔": {
    "category": "symbols",
    "description": "broken heart",
    "names": [
      "broken_heart"
    ],
    "tags": []
  },
  "❣️": {
    "category": "symbols",
    "description": "heavy heart exclamation",
    "names": [
      "heavy_heart_exclamation"
    ],
    "tags": []
  },
  "💕": {
    "category": "symbols",
    "description": "two hearts",
    "names": [
      "two_hearts"
    ],
    "tags": []
  },
  "💞": {
    "category": "symbols",
    "description": "revolving hearts",
    "names": [
      "revolving_hearts"
    ],
    "tags": []
  },
  "💓": {
    "category": "symbols",
    "description": "beating heart",
    "names": [
      "heartbeat"
    ],
    "tags": []
  },
  "💗": {
    "category": "symbols",
    "description": "growing heart",
    "names": [
      "heartpulse"
    ],
    "tags": []
  },
  "💖": {
    "category": "symbols",
    "description": "sparkling heart",
    "names": [
      "sparkling_heart"
    ],
    "tags": []
  },
  "💘": {
    "category": "symbols",
    "description": "heart with arrow",
    "names": [
      "cupid"
    ],
    "tags": [
      "love",
      "heart"
    ]
  },
  "💝": {
    "category": "symbols",
    "description": "heart with ribbon",
    "names": [
      "gift_heart"
    ],
    "tags": [
      "chocolates"
    ]
  },
  "💟": {
    "category": "symbols",
    "description": "heart decoration",
    "names": [
      "heart_decoration"
    ],
    "tags": []
  },
  "☮️": {
    "category": "symbols",
    "description": "peace symbol",
    "names": [
      "peace_symbol"
    ],
    "tags": []
  },
  "✝️": {
    "category": "symbols",
    "description": "latin cross",
    "names": [
      "latin_cross"
    ],
    "tags": []
  },
  "☪️": {
    "category": "symbols",
    "description": "star and crescent",
    "names": [
      "star_and_crescent"
    ],
    "tags": []
  },
  "🕉": {
    "category": "symbols",
    "description": "om",
    "names": [
      "om"
    ],
    "tags": []
  },
  "☸️": {
    "category": "symbols",
    "description": "wheel of dharma",
    "names": [
      "wheel_of_dharma"
    ],
    "tags": []
  },
  "✡️": {
    "category": "symbols",
    "description": "star of David",
    "names": [
      "star_of_david"
    ],
    "tags": []
  },
  "🔯": {
    "category": "symbols",
    "description": "dotted six-pointed star",
    "names": [
      "six_pointed_star"
    ],
    "tags": []
  },
  "🕎": {
    "category": "symbols",
    "description": "menorah",
    "names": [
      "menorah"
    ],
    "tags": []
  },
  "☯️": {
    "category": "symbols",
    "description": "yin yang",
    "names": [
      "yin_yang"
    ],
    "tags": []
  },
  "☦️": {
    "category": "symbols",
    "description": "orthodox cross",
    "names": [
      "orthodox_cross"
    ],
    "tags": []
  },
  "🛐": {
    "category": "symbols",
    "description": "place of worship",
    "names": [
      "place_of_worship"
    ],
    "tags": []
  },
  "⛎": {
    "category": "symbols",
    "description": "Ophiuchus",
    "names": [
      "ophiuchus"
    ],
    "tags": []
  },
  "♈️": {
    "category": "symbols",
    "description": "Aries",
    "names": [
      "aries"
    ],
    "tags": []
  },
  "♉️": {
    "category": "symbols",
    "description": "Taurus",
    "names": [
      "taurus"
    ],
    "tags": []
  },
  "♊️": {
    "category": "symbols",
    "description": "Gemini",
    "names": [
      "gemini"
    ],
    "tags": []
  },
  "♋️": {
    "category": "symbols",
    "description": "Cancer",
    "names": [
      "cancer"
    ],
    "tags": []
  },
  "♌️": {
    "category": "symbols",
    "description": "Leo",
    "names": [
      "leo"
    ],
    "tags": []
  },
  "♍️": {
    "category": "symbols",
    "description": "Virgo",
    "names": [
      "virgo"
    ],
    "tags": []
  },
  "♎️": {
    "category": "symbols",
    "description": "Libra",
    "names": [
      "libra"
    ],
    "tags": []
  },
  "♏️": {
    "category": "symbols",
    "description": "Scorpius",
    "names": [
      "scorpius"
    ],
    "tags": []
  },
  "♐️": {
    "category": "symbols",
    "description": "Sagittarius",
    "names": [
      "sagittarius"
    ],
    "tags": []
  },
  "♑️": {
    "category": "symbols",
    "description": "Capricorn",
    "names": [
      "capricorn"
    ],
    "tags": []
  },
  "♒️": {
    "category": "symbols",
    "description": "Aquarius",
    "names": [
      "aquarius"
    ],
    "tags": []
  },
  "♓️": {
    "category": "symbols",
    "description": "Pisces",
    "names": [
      "pisces"
    ],
    "tags": []
  },
  "🆔": {
    "category": "symbols",
    "description": "ID button",
    "names": [
      "id"
    ],
    "tags": []
  },
  "⚛️": {
    "category": "symbols",
    "description": "atom symbol",
    "names": [
      "atom_symbol"
    ],
    "tags": []
  },
  "🉑": {
    "category": "symbols",
    "description": "Japanese “acceptable” button",
    "names": [
      "accept"
    ],
    "tags": []
  },
  "☢️": {
    "category": "symbols",
    "description": "radioactive",
    "names": [
      "radioactive"
    ],
    "tags": []
  },
  "☣️": {
    "category": "symbols",
    "description": "biohazard",
    "names": [
      "biohazard"
    ],
    "tags": []
  },
  "📴": {
    "category": "symbols",
    "description": "mobile phone off",
    "names": [
      "mobile_phone_off"
    ],
    "tags": [
      "mute",
      "off"
    ]
  },
  "📳": {
    "category": "symbols",
    "description": "vibration mode",
    "names": [
      "vibration_mode"
    ],
    "tags": []
  },
  "🈶": {
    "category": "symbols",
    "description": "Japanese “not free of charge” button",
    "names": [
      "u6709"
    ],
    "tags": []
  },
  "🈚️": {
    "category": "symbols",
    "description": "Japanese “free of charge” button",
    "names": [
      "u7121"
    ],
    "tags": []
  },
  "🈸": {
    "category": "symbols",
    "description": "Japanese “application” button",
    "names": [
      "u7533"
    ],
    "tags": []
  },
  "🈺": {
    "category": "symbols",
    "description": "Japanese “open for business” button",
    "names": [
      "u55b6"
    ],
    "tags": []
  },
  "🈷️": {
    "category": "symbols",
    "description": "Japanese “monthly amount” button",
    "names": [
      "u6708"
    ],
    "tags": []
  },
  "✴️": {
    "category": "symbols",
    "description": "eight-pointed star",
    "names": [
      "eight_pointed_black_star"
    ],
    "tags": []
  },
  "🆚": {
    "category": "symbols",
    "description": "VS button",
    "names": [
      "vs"
    ],
    "tags": []
  },
  "💮": {
    "category": "symbols",
    "description": "white flower",
    "names": [
      "white_flower"
    ],
    "tags": []
  },
  "🉐": {
    "category": "symbols",
    "description": "Japanese “bargain” button",
    "names": [
      "ideograph_advantage"
    ],
    "tags": []
  },
  "㊙️": {
    "category": "symbols",
    "description": "Japanese “secret” button",
    "names": [
      "secret"
    ],
    "tags": []
  },
  "㊗️": {
    "category": "symbols",
    "description": "Japanese “congratulations” button",
    "names": [
      "congratulations"
    ],
    "tags": []
  },
  "🈴": {
    "category": "symbols",
    "description": "Japanese “passing grade” button",
    "names": [
      "u5408"
    ],
    "tags": []
  },
  "🈵": {
    "category": "symbols",
    "description": "Japanese “no vacancy” button",
    "names": [
      "u6e80"
    ],
    "tags": []
  },
  "🈹": {
    "category": "symbols",
    "description": "Japanese “discount” button",
    "names": [
      "u5272"
    ],
    "tags": []
  },
  "🈲": {
    "category": "symbols",
    "description": "Japanese “prohibited” button",
    "names": [
      "u7981"
    ],
    "tags": []
  },
  "🅰️": {
    "category": "symbols",
    "description": "A button (blood type)",
    "names": [
      "a"
    ],
    "tags": []
  },
  "🅱️": {
    "category": "symbols",
    "description": "B button (blood type)",
    "names": [
      "b"
    ],
    "tags": []
  },
  "🆎": {
    "category": "symbols",
    "description": "AB button (blood type)",
    "names": [
      "ab"
    ],
    "tags": []
  },
  "🆑": {
    "category": "symbols",
    "description": "CL button",
    "names": [
      "cl"
    ],
    "tags": []
  },
  "🅾️": {
    "category": "symbols",
    "description": "O button (blood type)",
    "names": [
      "o2"
    ],
    "tags": []
  },
  "🆘": {
    "category": "symbols",
    "description": "SOS button",
    "names": [
      "sos"
    ],
    "tags": [
      "help",
      "emergency"
    ]
  },
  "❌": {
    "category": "symbols",
    "description": "cross mark",
    "names": [
      "x"
    ],
    "tags": []
  },
  "⭕️": {
    "category": "symbols",
    "description": "heavy large circle",
    "names": [
      "o"
    ],
    "tags": []
  },
  "🛑": {
    "category": "symbols",
    "description": "stop sign",
    "names": [
      "stop_sign"
    ],
    "tags": []
  },
  "⛔️": {
    "category": "symbols",
    "description": "no entry",
    "names": [
      "no_entry"
    ],
    "tags": [
      "limit"
    ]
  },
  "📛": {
    "category": "symbols",
    "description": "name badge",
    "names": [
      "name_badge"
    ],
    "tags": []
  },
  "🚫": {
    "category": "symbols",
    "description": "prohibited",
    "names": [
      "no_entry_sign"
    ],
    "tags": [
      "block",
      "forbidden"
    ]
  },
  "💯": {
    "category": "symbols",
    "description": "hundred points",
    "names": [
      "100"
    ],
    "tags": [
      "score",
      "perfect"
    ]
  },
  "💢": {
    "category": "symbols",
    "description": "anger symbol",
    "names": [
      "anger"
    ],
    "tags": [
      "angry"
    ]
  },
  "♨️": {
    "category": "symbols",
    "description": "hot springs",
    "names": [
      "hotsprings"
    ],
    "tags": []
  },
  "🚷": {
    "category": "symbols",
    "description": "no pedestrians",
    "names": [
      "no_pedestrians"
    ],
    "tags": []
  },
  "🚯": {
    "category": "symbols",
    "description": "no littering",
    "names": [
      "do_not_litter"
    ],
    "tags": []
  },
  "🚳": {
    "category": "symbols",
    "description": "no bicycles",
    "names": [
      "no_bicycles"
    ],
    "tags": []
  },
  "🚱": {
    "category": "symbols",
    "description": "non-potable water",
    "names": [
      "non-potable_water"
    ],
    "tags": []
  },
  "🔞": {
    "category": "symbols",
    "description": "no one under eighteen",
    "names": [
      "underage"
    ],
    "tags": []
  },
  "📵": {
    "category": "symbols",
    "description": "no mobile phones",
    "names": [
      "no_mobile_phones"
    ],
    "tags": []
  },
  "🚭": {
    "category": "symbols",
    "description": "no smoking",
    "names": [
      "no_smoking"
    ],
    "tags": []
  },
  "❗️": {
    "category": "symbols",
    "description": "exclamation mark",
    "names": [
      "exclamation",
      "heavy_exclamation_mark"
    ],
    "tags": [
      "bang"
    ]
  },
  "❕": {
    "category": "symbols",
    "description": "white exclamation mark",
    "names": [
      "grey_exclamation"
    ],
    "tags": []
  },
  "❓": {
    "category": "symbols",
    "description": "question mark",
    "names": [
      "question"
    ],
    "tags": [
      "confused"
    ]
  },
  "❔": {
    "category": "symbols",
    "description": "white question mark",
    "names": [
      "grey_question"
    ],
    "tags": []
  },
  "‼️": {
    "category": "symbols",
    "description": "double exclamation mark",
    "names": [
      "bangbang"
    ],
    "tags": []
  },
  "⁉️": {
    "category": "symbols",
    "description": "exclamation question mark",
    "names": [
      "interrobang"
    ],
    "tags": []
  },
  "🔅": {
    "category": "symbols",
    "description": "dim button",
    "names": [
      "low_brightness"
    ],
    "tags": []
  },
  "🔆": {
    "category": "symbols",
    "description": "bright button",
    "names": [
      "high_brightness"
    ],
    "tags": []
  },
  "〽️": {
    "category": "symbols",
    "description": "part alternation mark",
    "names": [
      "part_alternation_mark"
    ],
    "tags": []
  },
  "⚠️": {
    "category": "symbols",
    "description": "warning",
    "names": [
      "warning"
    ],
    "tags": [
      "wip"
    ]
  },
  "🚸": {
    "category": "symbols",
    "description": "children crossing",
    "names": [
      "children_crossing"
    ],
    "tags": []
  },
  "🔱": {
    "category": "symbols",
    "description": "trident emblem",
    "names": [
      "trident"
    ],
    "tags": []
  },
  "⚜️": {
    "category": "symbols",
    "description": "fleur-de-lis",
    "names": [
      "fleur_de_lis"
    ],
    "tags": []
  },
  "🔰": {
    "category": "symbols",
    "description": "Japanese symbol for beginner",
    "names": [
      "beginner"
    ],
    "tags": []
  },
  "♻️": {
    "category": "symbols",
    "description": "recycling symbol",
    "names": [
      "recycle"
    ],
    "tags": [
      "environment",
      "green"
    ]
  },
  "✅": {
    "category": "symbols",
    "description": "white heavy check mark",
    "names": [
      "white_check_mark"
    ],
    "tags": []
  },
  "🈯️": {
    "category": "symbols",
    "description": "Japanese “reserved” button",
    "names": [
      "u6307"
    ],
    "tags": []
  },
  "💹": {
    "category": "symbols",
    "description": "chart increasing with yen",
    "names": [
      "chart"
    ],
    "tags": []
  },
  "❇️": {
    "category": "symbols",
    "description": "sparkle",
    "names": [
      "sparkle"
    ],
    "tags": []
  },
  "✳️": {
    "category": "symbols",
    "description": "eight-spoked asterisk",
    "names": [
      "eight_spoked_asterisk"
    ],
    "tags": []
  },
  "❎": {
    "category": "symbols",
    "description": "cross mark button",
    "names": [
      "negative_squared_cross_mark"
    ],
    "tags": []
  },
  "🌐": {
    "category": "symbols",
    "description": "globe with meridians",
    "names": [
      "globe_with_meridians"
    ],
    "tags": [
      "world",
      "global",
      "international"
    ]
  },
  "💠": {
    "category": "symbols",
    "description": "diamond with a dot",
    "names": [
      "diamond_shape_with_a_dot_inside"
    ],
    "tags": []
  },
  "Ⓜ️": {
    "category": "symbols",
    "description": "circled M",
    "names": [
      "m"
    ],
    "tags": []
  },
  "🌀": {
    "category": "symbols",
    "description": "cyclone",
    "names": [
      "cyclone"
    ],
    "tags": [
      "swirl"
    ]
  },
  "💤": {
    "category": "symbols",
    "description": "zzz",
    "names": [
      "zzz"
    ],
    "tags": [
      "sleeping"
    ]
  },
  "🏧": {
    "category": "symbols",
    "description": "ATM sign",
    "names": [
      "atm"
    ],
    "tags": []
  },
  "🚾": {
    "category": "symbols",
    "description": "water closet",
    "names": [
      "wc"
    ],
    "tags": [
      "toilet",
      "restroom"
    ]
  },
  "♿️": {
    "category": "symbols",
    "description": "wheelchair symbol",
    "names": [
      "wheelchair"
    ],
    "tags": [
      "accessibility"
    ]
  },
  "🅿️": {
    "category": "symbols",
    "description": "P button",
    "names": [
      "parking"
    ],
    "tags": []
  },
  "🈳": {
    "category": "symbols",
    "description": "Japanese “vacancy” button",
    "names": [
      "u7a7a"
    ],
    "tags": []
  },
  "🈂️": {
    "category": "symbols",
    "description": "Japanese “service charge” button",
    "names": [
      "sa"
    ],
    "tags": []
  },
  "🛂": {
    "category": "symbols",
    "description": "passport control",
    "names": [
      "passport_control"
    ],
    "tags": []
  },
  "🛃": {
    "category": "symbols",
    "description": "customs",
    "names": [
      "customs"
    ],
    "tags": []
  },
  "🛄": {
    "category": "symbols",
    "description": "baggage claim",
    "names": [
      "baggage_claim"
    ],
    "tags": [
      "airport"
    ]
  },
  "🛅": {
    "category": "symbols",
    "description": "left luggage",
    "names": [
      "left_luggage"
    ],
    "tags": []
  },
  "🚹": {
    "category": "symbols",
    "description": "men’s room",
    "names": [
      "mens"
    ],
    "tags": []
  },
  "🚺": {
    "category": "symbols",
    "description": "women’s room",
    "names": [
      "womens"
    ],
    "tags": []
  },
  "🚼": {
    "category": "symbols",
    "description": "baby symbol",
    "names": [
      "baby_symbol"
    ],
    "tags": []
  },
  "🚻": {
    "category": "symbols",
    "description": "restroom",
    "names": [
      "restroom"
    ],
    "tags": [
      "toilet"
    ]
  },
  "🚮": {
    "category": "symbols",
    "description": "litter in bin sign",
    "names": [
      "put_litter_in_its_place"
    ],
    "tags": []
  },
  "🎦": {
    "category": "symbols",
    "description": "cinema",
    "names": [
      "cinema"
    ],
    "tags": [
      "film",
      "movie"
    ]
  },
  "📶": {
    "category": "symbols",
    "description": "antenna bars",
    "names": [
      "signal_strength"
    ],
    "tags": [
      "wifi"
    ]
  },
  "🈁": {
    "category": "symbols",
    "description": "Japanese “here” button",
    "names": [
      "koko"
    ],
    "tags": []
  },
  "🔣": {
    "category": "symbols",
    "description": "input symbols",
    "names": [
      "symbols"
    ],
    "tags": []
  },
  "ℹ️": {
    "category": "symbols",
    "description": "information",
    "names": [
      "information_source"
    ],
    "tags": []
  },
  "🔤": {
    "category": "symbols",
    "description": "input latin letters",
    "names": [
      "abc"
    ],
    "tags": [
      "alphabet"
    ]
  },
  "🔡": {
    "category": "symbols",
    "description": "input latin lowercase",
    "names": [
      "abcd"
    ],
    "tags": []
  },
  "🔠": {
    "category": "symbols",
    "description": "input latin uppercase",
    "names": [
      "capital_abcd"
    ],
    "tags": [
      "letters"
    ]
  },
  "🆖": {
    "category": "symbols",
    "description": "NG button",
    "names": [
      "ng"
    ],
    "tags": []
  },
  "🆗": {
    "category": "symbols",
    "description": "OK button",
    "names": [
      "ok"
    ],
    "tags": [
      "yes"
    ]
  },
  "🆙": {
    "category": "symbols",
    "description": "UP! button",
    "names": [
      "up"
    ],
    "tags": []
  },
  "🆒": {
    "category": "symbols",
    "description": "COOL button",
    "names": [
      "cool"
    ],
    "tags": []
  },
  "🆕": {
    "category": "symbols",
    "description": "NEW button",
    "names": [
      "new"
    ],
    "tags": [
      "fresh"
    ]
  },
  "🆓": {
    "category": "symbols",
    "description": "FREE button",
    "names": [
      "free"
    ],
    "tags": []
  },
  "0️⃣": {
    "category": "symbols",
    "description": "keycap: 0",
    "names": [
      "zero"
    ],
    "tags": []
  },
  "1️⃣": {
    "category": "symbols",
    "description": "keycap: 1",
    "names": [
      "one"
    ],
    "tags": []
  },
  "2️⃣": {
    "category": "symbols",
    "description": "keycap: 2",
    "names": [
      "two"
    ],
    "tags": []
  },
  "3️⃣": {
    "category": "symbols",
    "description": "keycap: 3",
    "names": [
      "three"
    ],
    "tags": []
  },
  "4️⃣": {
    "category": "symbols",
    "description": "keycap: 4",
    "names": [
      "four"
    ],
    "tags": []
  },
  "5️⃣": {
    "category": "symbols",
    "description": "keycap: 5",
    "names": [
      "five"
    ],
    "tags": []
  },
  "6️⃣": {
    "category": "symbols",
    "description": "keycap: 6",
    "names": [
      "six"
    ],
    "tags": []
  },
  "7️⃣": {
    "category": "symbols",
    "description": "keycap: 7",
    "names": [
      "seven"
    ],
    "tags": []
  },
  "8️⃣": {
    "category": "symbols",
    "description": "keycap: 8",
    "names": [
      "eight"
    ],
    "tags": []
  },
  "9️⃣": {
    "category": "symbols",
    "description": "keycap: 9",
    "names": [
      "nine"
    ],
    "tags": []
  },
  "🔟": {
    "category": "symbols",
    "description": "keycap 10",
    "names": [
      "keycap_ten"
    ],
    "tags": []
  },
  "🔢": {
    "category": "symbols",
    "description": "input numbers",
    "names": [
      "1234"
    ],
    "tags": [
      "numbers"
    ]
  },
  "#️⃣": {
    "category": "symbols",
    "description": "keycap: #",
    "names": [
      "hash"
    ],
    "tags": [
      "number"
    ]
  },
  "*️⃣": {
    "category": "symbols",
    "description": "keycap: *",
    "names": [
      "asterisk"
    ],
    "tags": []
  },
  "▶️": {
    "category": "symbols",
    "description": "play button",
    "names": [
      "arrow_forward"
    ],
    "tags": []
  },
  "⏸": {
    "category": "symbols",
    "description": "pause button",
    "names": [
      "pause_button"
    ],
    "tags": []
  },
  "⏯": {
    "category": "symbols",
    "description": "play or pause button",
    "names": [
      "play_or_pause_button"
    ],
    "tags": []
  },
  "⏹": {
    "category": "symbols",
    "description": "stop button",
    "names": [
      "stop_button"
    ],
    "tags": []
  },
  "⏺": {
    "category": "symbols",
    "description": "record button",
    "names": [
      "record_button"
    ],
    "tags": []
  },
  "⏭": {
    "category": "symbols",
    "description": "next track button",
    "names": [
      "next_track_button"
    ],
    "tags": []
  },
  "⏮": {
    "category": "symbols",
    "description": "last track button",
    "names": [
      "previous_track_button"
    ],
    "tags": []
  },
  "⏩": {
    "category": "symbols",
    "description": "fast-forward button",
    "names": [
      "fast_forward"
    ],
    "tags": []
  },
  "⏪": {
    "category": "symbols",
    "description": "fast reverse button",
    "names": [
      "rewind"
    ],
    "tags": []
  },
  "⏫": {
    "category": "symbols",
    "description": "fast up button",
    "names": [
      "arrow_double_up"
    ],
    "tags": []
  },
  "⏬": {
    "category": "symbols",
    "description": "fast down button",
    "names": [
      "arrow_double_down"
    ],
    "tags": []
  },
  "◀️": {
    "category": "symbols",
    "description": "reverse button",
    "names": [
      "arrow_backward"
    ],
    "tags": []
  },
  "🔼": {
    "category": "symbols",
    "description": "up button",
    "names": [
      "arrow_up_small"
    ],
    "tags": []
  },
  "🔽": {
    "category": "symbols",
    "description": "down button",
    "names": [
      "arrow_down_small"
    ],
    "tags": []
  },
  "➡️": {
    "category": "symbols",
    "description": "right arrow",
    "names": [
      "arrow_right"
    ],
    "tags": []
  },
  "⬅️": {
    "category": "symbols",
    "description": "left arrow",
    "names": [
      "arrow_left"
    ],
    "tags": []
  },
  "⬆️": {
    "category": "symbols",
    "description": "up arrow",
    "names": [
      "arrow_up"
    ],
    "tags": []
  },
  "⬇️": {
    "category": "symbols",
    "description": "down arrow",
    "names": [
      "arrow_down"
    ],
    "tags": []
  },
  "↗️": {
    "category": "symbols",
    "description": "up-right arrow",
    "names": [
      "arrow_upper_right"
    ],
    "tags": []
  },
  "↘️": {
    "category": "symbols",
    "description": "down-right arrow",
    "names": [
      "arrow_lower_right"
    ],
    "tags": []
  },
  "↙️": {
    "category": "symbols",
    "description": "down-left arrow",
    "names": [
      "arrow_lower_left"
    ],
    "tags": []
  },
  "↖️": {
    "category": "symbols",
    "description": "up-left arrow",
    "names": [
      "arrow_upper_left"
    ],
    "tags": []
  },
  "↕️": {
    "category": "symbols",
    "description": "up-down arrow",
    "names": [
      "arrow_up_down"
    ],
    "tags": []
  },
  "↔️": {
    "category": "symbols",
    "description": "left-right arrow",
    "names": [
      "left_right_arrow"
    ],
    "tags": []
  },
  "↪️": {
    "category": "symbols",
    "description": "left arrow curving right",
    "names": [
      "arrow_right_hook"
    ],
    "tags": []
  },
  "↩️": {
    "category": "symbols",
    "description": "right arrow curving left",
    "names": [
      "leftwards_arrow_with_hook"
    ],
    "tags": [
      "return"
    ]
  },
  "⤴️": {
    "category": "symbols",
    "description": "right arrow curving up",
    "names": [
      "arrow_heading_up"
    ],
    "tags": []
  },
  "⤵️": {
    "category": "symbols",
    "description": "right arrow curving down",
    "names": [
      "arrow_heading_down"
    ],
    "tags": []
  },
  "🔀": {
    "category": "symbols",
    "description": "shuffle tracks button",
    "names": [
      "twisted_rightwards_arrows"
    ],
    "tags": [
      "shuffle"
    ]
  },
  "🔁": {
    "category": "symbols",
    "description": "repeat button",
    "names": [
      "repeat"
    ],
    "tags": [
      "loop"
    ]
  },
  "🔂": {
    "category": "symbols",
    "description": "repeat single button",
    "names": [
      "repeat_one"
    ],
    "tags": []
  },
  "🔄": {
    "category": "symbols",
    "description": "anticlockwise arrows button",
    "names": [
      "arrows_counterclockwise"
    ],
    "tags": [
      "sync"
    ]
  },
  "🔃": {
    "category": "symbols",
    "description": "clockwise vertical arrows",
    "names": [
      "arrows_clockwise"
    ],
    "tags": []
  },
  "🎵": {
    "category": "symbols",
    "description": "musical note",
    "names": [
      "musical_note"
    ],
    "tags": []
  },
  "🎶": {
    "category": "symbols",
    "description": "musical notes",
    "names": [
      "notes"
    ],
    "tags": [
      "music"
    ]
  },
  "➕": {
    "category": "symbols",
    "description": "heavy plus sign",
    "names": [
      "heavy_plus_sign"
    ],
    "tags": []
  },
  "➖": {
    "category": "symbols",
    "description": "heavy minus sign",
    "names": [
      "heavy_minus_sign"
    ],
    "tags": []
  },
  "➗": {
    "category": "symbols",
    "description": "heavy division sign",
    "names": [
      "heavy_division_sign"
    ],
    "tags": []
  },
  "✖️": {
    "category": "symbols",
    "description": "heavy multiplication x",
    "names": [
      "heavy_multiplication_x"
    ],
    "tags": []
  },
  "💲": {
    "category": "symbols",
    "description": "heavy dollar sign",
    "names": [
      "heavy_dollar_sign"
    ],
    "tags": []
  },
  "💱": {
    "category": "symbols",
    "description": "currency exchange",
    "names": [
      "currency_exchange"
    ],
    "tags": []
  },
  "™️": {
    "category": "symbols",
    "description": "trade mark",
    "names": [
      "tm"
    ],
    "tags": [
      "trademark"
    ]
  },
  "©️": {
    "category": "symbols",
    "description": "copyright",
    "names": [
      "copyright"
    ],
    "tags": []
  },
  "®️": {
    "category": "symbols",
    "description": "registered",
    "names": [
      "registered"
    ],
    "tags": []
  },
  "〰️": {
    "category": "symbols",
    "description": "wavy dash",
    "names": [
      "wavy_dash"
    ],
    "tags": []
  },
  "➰": {
    "category": "symbols",
    "description": "curly loop",
    "names": [
      "curly_loop"
    ],
    "tags": []
  },
  "➿": {
    "category": "symbols",
    "description": "double curly loop",
    "names": [
      "loop"
    ],
    "tags": []
  },
  "🔚": {
    "category": "symbols",
    "description": "END arrow",
    "names": [
      "end"
    ],
    "tags": []
  },
  "🔙": {
    "category": "symbols",
    "description": "BACK arrow",
    "names": [
      "back"
    ],
    "tags": []
  },
  "🔛": {
    "category": "symbols",
    "description": "ON! arrow",
    "names": [
      "on"
    ],
    "tags": []
  },
  "🔝": {
    "category": "symbols",
    "description": "TOP arrow",
    "names": [
      "top"
    ],
    "tags": []
  },
  "🔜": {
    "category": "symbols",
    "description": "SOON arrow",
    "names": [
      "soon"
    ],
    "tags": []
  },
  "✔️": {
    "category": "symbols",
    "description": "heavy check mark",
    "names": [
      "heavy_check_mark"
    ],
    "tags": []
  },
  "☑️": {
    "category": "symbols",
    "description": "ballot box with check",
    "names": [
      "ballot_box_with_check"
    ],
    "tags": []
  },
  "🔘": {
    "category": "symbols",
    "description": "radio button",
    "names": [
      "radio_button"
    ],
    "tags": []
  },
  "⚪️": {
    "category": "symbols",
    "description": "white circle",
    "names": [
      "white_circle"
    ],
    "tags": []
  },
  "⚫️": {
    "category": "symbols",
    "description": "black circle",
    "names": [
      "black_circle"
    ],
    "tags": []
  },
  "🔴": {
    "category": "symbols",
    "description": "red circle",
    "names": [
      "red_circle"
    ],
    "tags": []
  },
  "🔵": {
    "category": "symbols",
    "description": "blue circle",
    "names": [
      "large_blue_circle"
    ],
    "tags": []
  },
  "🔺": {
    "category": "symbols",
    "description": "red triangle pointed up",
    "names": [
      "small_red_triangle"
    ],
    "tags": []
  },
  "🔻": {
    "category": "symbols",
    "description": "red triangle pointed down",
    "names": [
      "small_red_triangle_down"
    ],
    "tags": []
  },
  "🔸": {
    "category": "symbols",
    "description": "small orange diamond",
    "names": [
      "small_orange_diamond"
    ],
    "tags": []
  },
  "🔹": {
    "category": "symbols",
    "description": "small blue diamond",
    "names": [
      "small_blue_diamond"
    ],
    "tags": []
  },
  "🔶": {
    "category": "symbols",
    "description": "large orange diamond",
    "names": [
      "large_orange_diamond"
    ],
    "tags": []
  },
  "🔷": {
    "category": "symbols",
    "description": "large blue diamond",
    "names": [
      "large_blue_diamond"
    ],
    "tags": []
  },
  "🔳": {
    "category": "symbols",
    "description": "white square button",
    "names": [
      "white_square_button"
    ],
    "tags": []
  },
  "🔲": {
    "category": "symbols",
    "description": "black square button",
    "names": [
      "black_square_button"
    ],
    "tags": []
  },
  "▪️": {
    "category": "symbols",
    "description": "black small square",
    "names": [
      "black_small_square"
    ],
    "tags": []
  },
  "▫️": {
    "category": "symbols",
    "description": "white small square",
    "names": [
      "white_small_square"
    ],
    "tags": []
  },
  "◾️": {
    "category": "symbols",
    "description": "black medium-small square",
    "names": [
      "black_medium_small_square"
    ],
    "tags": []
  },
  "◽️": {
    "category": "symbols",
    "description": "white medium-small square",
    "names": [
      "white_medium_small_square"
    ],
    "tags": []
  },
  "◼️": {
    "category": "symbols",
    "description": "black medium square",
    "names": [
      "black_medium_square"
    ],
    "tags": []
  },
  "◻️": {
    "category": "symbols",
    "description": "white medium square",
    "names": [
      "white_medium_square"
    ],
    "tags": []
  },
  "⬛️": {
    "category": "symbols",
    "description": "black large square",
    "names": [
      "black_large_square"
    ],
    "tags": []
  },
  "⬜️": {
    "category": "symbols",
    "description": "white large square",
    "names": [
      "white_large_square"
    ],
    "tags": []
  },
  "🔈": {
    "category": "symbols",
    "description": "speaker low volume",
    "names": [
      "speaker"
    ],
    "tags": []
  },
  "🔇": {
    "category": "symbols",
    "description": "muted speaker",
    "names": [
      "mute"
    ],
    "tags": [
      "sound",
      "volume"
    ]
  },
  "🔉": {
    "category": "symbols",
    "description": "speaker medium volume",
    "names": [
      "sound"
    ],
    "tags": [
      "volume"
    ]
  },
  "🔊": {
    "category": "symbols",
    "description": "speaker high volume",
    "names": [
      "loud_sound"
    ],
    "tags": [
      "volume"
    ]
  },
  "🔔": {
    "category": "symbols",
    "description": "bell",
    "names": [
      "bell"
    ],
    "tags": [
      "sound",
      "notification"
    ]
  },
  "🔕": {
    "category": "symbols",
    "description": "bell with slash",
    "names": [
      "no_bell"
    ],
    "tags": [
      "volume",
      "off"
    ]
  },
  "📣": {
    "category": "symbols",
    "description": "megaphone",
    "names": [
      "mega"
    ],
    "tags": []
  },
  "📢": {
    "category": "symbols",
    "description": "loudspeaker",
    "names": [
      "loudspeaker"
    ],
    "tags": [
      "announcement"
    ]
  },
  "👁‍🗨": {
    "category": "symbols",
    "description": "eye in speech bubble",
    "names": [
      "eye_speech_bubble"
    ],
    "tags": []
  },
  "💬": {
    "category": "symbols",
    "description": "speech balloon",
    "names": [
      "speech_balloon"
    ],
    "tags": [
      "comment"
    ]
  },
  "💭": {
    "category": "symbols",
    "description": "thought balloon",
    "names": [
      "thought_balloon"
    ],
    "tags": [
      "thinking"
    ]
  },
  "🗯": {
    "category": "symbols",
    "description": "right anger bubble",
    "names": [
      "right_anger_bubble"
    ],
    "tags": []
  },
  "♠️": {
    "category": "symbols",
    "description": "spade suit",
    "names": [
      "spades"
    ],
    "tags": []
  },
  "♣️": {
    "category": "symbols",
    "description": "club suit",
    "names": [
      "clubs"
    ],
    "tags": []
  },
  "♥️": {
    "category": "symbols",
    "description": "heart suit",
    "names": [
      "hearts"
    ],
    "tags": []
  },
  "♦️": {
    "category": "symbols",
    "description": "diamond suit",
    "names": [
      "diamonds"
    ],
    "tags": []
  },
  "🃏": {
    "category": "symbols",
    "description": "joker",
    "names": [
      "black_joker"
    ],
    "tags": []
  },
  "🎴": {
    "category": "symbols",
    "description": "flower playing cards",
    "names": [
      "flower_playing_cards"
    ],
    "tags": []
  },
  "🀄️": {
    "category": "symbols",
    "description": "mahjong red dragon",
    "names": [
      "mahjong"
    ],
    "tags": []
  },
  "🕐": {
    "category": "symbols",
    "description": "one o’clock",
    "names": [
      "clock1"
    ],
    "tags": []
  },
  "🕑": {
    "category": "symbols",
    "description": "two o’clock",
    "names": [
      "clock2"
    ],
    "tags": []
  },
  "🕒": {
    "category": "symbols",
    "description": "three o’clock",
    "names": [
      "clock3"
    ],
    "tags": []
  },
  "🕓": {
    "category": "symbols",
    "description": "four o’clock",
    "names": [
      "clock4"
    ],
    "tags": []
  },
  "🕔": {
    "category": "symbols",
    "description": "five o’clock",
    "names": [
      "clock5"
    ],
    "tags": []
  },
  "🕕": {
    "category": "symbols",
    "description": "six o’clock",
    "names": [
      "clock6"
    ],
    "tags": []
  },
  "🕖": {
    "category": "symbols",
    "description": "seven o’clock",
    "names": [
      "clock7"
    ],
    "tags": []
  },
  "🕗": {
    "category": "symbols",
    "description": "eight o’clock",
    "names": [
      "clock8"
    ],
    "tags": []
  },
  "🕘": {
    "category": "symbols",
    "description": "nine o’clock",
    "names": [
      "clock9"
    ],
    "tags": []
  },
  "🕙": {
    "category": "symbols",
    "description": "ten o’clock",
    "names": [
      "clock10"
    ],
    "tags": []
  },
  "🕚": {
    "category": "symbols",
    "description": "eleven o’clock",
    "names": [
      "clock11"
    ],
    "tags": []
  },
  "🕛": {
    "category": "symbols",
    "description": "twelve o’clock",
    "names": [
      "clock12"
    ],
    "tags": []
  },
  "🕜": {
    "category": "symbols",
    "description": "one-thirty",
    "names": [
      "clock130"
    ],
    "tags": []
  },
  "🕝": {
    "category": "symbols",
    "description": "two-thirty",
    "names": [
      "clock230"
    ],
    "tags": []
  },
  "🕞": {
    "category": "symbols",
    "description": "three-thirty",
    "names": [
      "clock330"
    ],
    "tags": []
  },
  "🕟": {
    "category": "symbols",
    "description": "four-thirty",
    "names": [
      "clock430"
    ],
    "tags": []
  },
  "🕠": {
    "category": "symbols",
    "description": "five-thirty",
    "names": [
      "clock530"
    ],
    "tags": []
  },
  "🕡": {
    "category": "symbols",
    "description": "six-thirty",
    "names": [
      "clock630"
    ],
    "tags": []
  },
  "🕢": {
    "category": "symbols",
    "description": "seven-thirty",
    "names": [
      "clock730"
    ],
    "tags": []
  },
  "🕣": {
    "category": "symbols",
    "description": "eight-thirty",
    "names": [
      "clock830"
    ],
    "tags": []
  },
  "🕤": {
    "category": "symbols",
    "description": "nine-thirty",
    "names": [
      "clock930"
    ],
    "tags": []
  },
  "🕥": {
    "category": "symbols",
    "description": "ten-thirty",
    "names": [
      "clock1030"
    ],
    "tags": []
  },
  "🕦": {
    "category": "symbols",
    "description": "eleven-thirty",
    "names": [
      "clock1130"
    ],
    "tags": []
  },
  "🕧": {
    "category": "symbols",
    "description": "twelve-thirty",
    "names": [
      "clock1230"
    ],
    "tags": []
  },
  "🏳️": {
    "category": "flags",
    "description": "white flag",
    "names": [
      "white_flag"
    ],
    "tags": []
  },
  "🏴": {
    "category": "flags",
    "description": "black flag",
    "names": [
      "black_flag"
    ],
    "tags": []
  },
  "🏁": {
    "category": "flags",
    "description": "chequered flag",
    "names": [
      "checkered_flag"
    ],
    "tags": [
      "milestone",
      "finish"
    ]
  },
  "🚩": {
    "category": "flags",
    "description": "triangular flag",
    "names": [
      "triangular_flag_on_post"
    ],
    "tags": []
  },
  "🏳️‍🌈": {
    "category": "flags",
    "description": "rainbow flag",
    "names": [
      "rainbow_flag"
    ],
    "tags": [
      "pride"
    ]
  },
  "🇦🇫": {
    "category": "flags",
    "description": "Afghanistan",
    "names": [
      "afghanistan"
    ],
    "tags": []
  },
  "🇦🇽": {
    "category": "flags",
    "description": "Åland Islands",
    "names": [
      "aland_islands"
    ],
    "tags": []
  },
  "🇦🇱": {
    "category": "flags",
    "description": "Albania",
    "names": [
      "albania"
    ],
    "tags": []
  },
  "🇩🇿": {
    "category": "flags",
    "description": "Algeria",
    "names": [
      "algeria"
    ],
    "tags": []
  },
  "🇦🇸": {
    "category": "flags",
    "description": "American Samoa",
    "names": [
      "american_samoa"
    ],
    "tags": []
  },
  "🇦🇩": {
    "category": "flags",
    "description": "Andorra",
    "names": [
      "andorra"
    ],
    "tags": []
  },
  "🇦🇴": {
    "category": "flags",
    "description": "Angola",
    "names": [
      "angola"
    ],
    "tags": []
  },
  "🇦🇮": {
    "category": "flags",
    "description": "Anguilla",
    "names": [
      "anguilla"
    ],
    "tags": []
  },
  "🇦🇶": {
    "category": "flags",
    "description": "Antarctica",
    "names": [
      "antarctica"
    ],
    "tags": []
  },
  "🇦🇬": {
    "category": "flags",
    "description": "Antigua & Barbuda",
    "names": [
      "antigua_barbuda"
    ],
    "tags": []
  },
  "🇦🇷": {
    "category": "flags",
    "description": "Argentina",
    "names": [
      "argentina"
    ],
    "tags": []
  },
  "🇦🇲": {
    "category": "flags",
    "description": "Armenia",
    "names": [
      "armenia"
    ],
    "tags": []
  },
  "🇦🇼": {
    "category": "flags",
    "description": "Aruba",
    "names": [
      "aruba"
    ],
    "tags": []
  },
  "🇦🇺": {
    "category": "flags",
    "description": "Australia",
    "names": [
      "australia"
    ],
    "tags": []
  },
  "🇦🇹": {
    "category": "flags",
    "description": "Austria",
    "names": [
      "austria"
    ],
    "tags": []
  },
  "🇦🇿": {
    "category": "flags",
    "description": "Azerbaijan",
    "names": [
      "azerbaijan"
    ],
    "tags": []
  },
  "🇧🇸": {
    "category": "flags",
    "description": "Bahamas",
    "names": [
      "bahamas"
    ],
    "tags": []
  },
  "🇧🇭": {
    "category": "flags",
    "description": "Bahrain",
    "names": [
      "bahrain"
    ],
    "tags": []
  },
  "🇧🇩": {
    "category": "flags",
    "description": "Bangladesh",
    "names": [
      "bangladesh"
    ],
    "tags": []
  },
  "🇧🇧": {
    "category": "flags",
    "description": "Barbados",
    "names": [
      "barbados"
    ],
    "tags": []
  },
  "🇧🇾": {
    "category": "flags",
    "description": "Belarus",
    "names": [
      "belarus"
    ],
    "tags": []
  },
  "🇧🇪": {
    "category": "flags",
    "description": "Belgium",
    "names": [
      "belgium"
    ],
    "tags": []
  },
  "🇧🇿": {
    "category": "flags",
    "description": "Belize",
    "names": [
      "belize"
    ],
    "tags": []
  },
  "🇧🇯": {
    "category": "flags",
    "description": "Benin",
    "names": [
      "benin"
    ],
    "tags": []
  },
  "🇧🇲": {
    "category": "flags",
    "description": "Bermuda",
    "names": [
      "bermuda"
    ],
    "tags": []
  },
  "🇧🇹": {
    "category": "flags",
    "description": "Bhutan",
    "names": [
      "bhutan"
    ],
    "tags": []
  },
  "🇧🇴": {
    "category": "flags",
    "description": "Bolivia",
    "names": [
      "bolivia"
    ],
    "tags": []
  },
  "🇧🇶": {
    "category": "flags",
    "description": "Caribbean Netherlands",
    "names": [
      "caribbean_netherlands"
    ],
    "tags": []
  },
  "🇧🇦": {
    "category": "flags",
    "description": "Bosnia & Herzegovina",
    "names": [
      "bosnia_herzegovina"
    ],
    "tags": []
  },
  "🇧🇼": {
    "category": "flags",
    "description": "Botswana",
    "names": [
      "botswana"
    ],
    "tags": []
  },
  "🇧🇷": {
    "category": "flags",
    "description": "Brazil",
    "names": [
      "brazil"
    ],
    "tags": []
  },
  "🇮🇴": {
    "category": "flags",
    "description": "British Indian Ocean Territory",
    "names": [
      "british_indian_ocean_territory"
    ],
    "tags": []
  },
  "🇻🇬": {
    "category": "flags",
    "description": "British Virgin Islands",
    "names": [
      "british_virgin_islands"
    ],
    "tags": []
  },
  "🇧🇳": {
    "category": "flags",
    "description": "Brunei",
    "names": [
      "brunei"
    ],
    "tags": []
  },
  "🇧🇬": {
    "category": "flags",
    "description": "Bulgaria",
    "names": [
      "bulgaria"
    ],
    "tags": []
  },
  "🇧🇫": {
    "category": "flags",
    "description": "Burkina Faso",
    "names": [
      "burkina_faso"
    ],
    "tags": []
  },
  "🇧🇮": {
    "category": "flags",
    "description": "Burundi",
    "names": [
      "burundi"
    ],
    "tags": []
  },
  "🇨🇻": {
    "category": "flags",
    "description": "Cape Verde",
    "names": [
      "cape_verde"
    ],
    "tags": []
  },
  "🇰🇭": {
    "category": "flags",
    "description": "Cambodia",
    "names": [
      "cambodia"
    ],
    "tags": []
  },
  "🇨🇲": {
    "category": "flags",
    "description": "Cameroon",
    "names": [
      "cameroon"
    ],
    "tags": []
  },
  "🇨🇦": {
    "category": "flags",
    "description": "Canada",
    "names": [
      "canada"
    ],
    "tags": []
  },
  "🇮🇨": {
    "category": "flags",
    "description": "Canary Islands",
    "names": [
      "canary_islands"
    ],
    "tags": []
  },
  "🇰🇾": {
    "category": "flags",
    "description": "Cayman Islands",
    "names": [
      "cayman_islands"
    ],
    "tags": []
  },
  "🇨🇫": {
    "category": "flags",
    "description": "Central African Republic",
    "names": [
      "central_african_republic"
    ],
    "tags": []
  },
  "🇹🇩": {
    "category": "flags",
    "description": "Chad",
    "names": [
      "chad"
    ],
    "tags": []
  },
  "🇨🇱": {
    "category": "flags",
    "description": "Chile",
    "names": [
      "chile"
    ],
    "tags": []
  },
  "🇨🇳": {
    "category": "flags",
    "description": "China",
    "names": [
      "cn"
    ],
    "tags": [
      "china"
    ]
  },
  "🇨🇽": {
    "category": "flags",
    "description": "Christmas Island",
    "names": [
      "christmas_island"
    ],
    "tags": []
  },
  "🇨🇨": {
    "category": "flags",
    "description": "Cocos (Keeling) Islands",
    "names": [
      "cocos_islands"
    ],
    "tags": [
      "keeling"
    ]
  },
  "🇨🇴": {
    "category": "flags",
    "description": "Colombia",
    "names": [
      "colombia"
    ],
    "tags": []
  },
  "🇰🇲": {
    "category": "flags",
    "description": "Comoros",
    "names": [
      "comoros"
    ],
    "tags": []
  },
  "🇨🇬": {
    "category": "flags",
    "description": "Congo - Brazzaville",
    "names": [
      "congo_brazzaville"
    ],
    "tags": []
  },
  "🇨🇩": {
    "category": "flags",
    "description": "Congo - Kinshasa",
    "names": [
      "congo_kinshasa"
    ],
    "tags": []
  },
  "🇨🇰": {
    "category": "flags",
    "description": "Cook Islands",
    "names": [
      "cook_islands"
    ],
    "tags": []
  },
  "🇨🇷": {
    "category": "flags",
    "description": "Costa Rica",
    "names": [
      "costa_rica"
    ],
    "tags": []
  },
  "🇨🇮": {
    "category": "flags",
    "description": "Côte d’Ivoire",
    "names": [
      "cote_divoire"
    ],
    "tags": [
      "ivory"
    ]
  },
  "🇭🇷": {
    "category": "flags",
    "description": "Croatia",
    "names": [
      "croatia"
    ],
    "tags": []
  },
  "🇨🇺": {
    "category": "flags",
    "description": "Cuba",
    "names": [
      "cuba"
    ],
    "tags": []
  },
  "🇨🇼": {
    "category": "flags",
    "description": "Curaçao",
    "names": [
      "curacao"
    ],
    "tags": []
  },
  "🇨🇾": {
    "category": "flags",
    "description": "Cyprus",
    "names": [
      "cyprus"
    ],
    "tags": []
  },
  "🇨🇿": {
    "category": "flags",
    "description": "Czech Republic",
    "names": [
      "czech_republic"
    ],
    "tags": []
  },
  "🇩🇰": {
    "category": "flags",
    "description": "Denmark",
    "names": [
      "denmark"
    ],
    "tags": []
  },
  "🇩🇯": {
    "category": "flags",
    "description": "Djibouti",
    "names": [
      "djibouti"
    ],
    "tags": []
  },
  "🇩🇲": {
    "category": "flags",
    "description": "Dominica",
    "names": [
      "dominica"
    ],
    "tags": []
  },
  "🇩🇴": {
    "category": "flags",
    "description": "Dominican Republic",
    "names": [
      "dominican_republic"
    ],
    "tags": []
  },
  "🇪🇨": {
    "category": "flags",
    "description": "Ecuador",
    "names": [
      "ecuador"
    ],
    "tags": []
  },
  "🇪🇬": {
    "category": "flags",
    "description": "Egypt",
    "names": [
      "egypt"
    ],
    "tags": []
  },
  "🇸🇻": {
    "category": "flags",
    "description": "El Salvador",
    "names": [
      "el_salvador"
    ],
    "tags": []
  },
  "🇬🇶": {
    "category": "flags",
    "description": "Equatorial Guinea",
    "names": [
      "equatorial_guinea"
    ],
    "tags": []
  },
  "🇪🇷": {
    "category": "flags",
    "description": "Eritrea",
    "names": [
      "eritrea"
    ],
    "tags": []
  },
  "🇪🇪": {
    "category": "flags",
    "description": "Estonia",
    "names": [
      "estonia"
    ],
    "tags": []
  },
  "🇪🇹": {
    "category": "flags",
    "description": "Ethiopia",
    "names": [
      "ethiopia"
    ],
    "tags": []
  },
  "🇪🇺": {
    "category": "flags",
    "description": "European Union",
    "names": [
      "eu",
      "european_union"
    ],
    "tags": []
  },
  "🇫🇰": {
    "category": "flags",
    "description": "Falkland Islands",
    "names": [
      "falkland_islands"
    ],
    "tags": []
  },
  "🇫🇴": {
    "category": "flags",
    "description": "Faroe Islands",
    "names": [
      "faroe_islands"
    ],
    "tags": []
  },
  "🇫🇯": {
    "category": "flags",
    "description": "Fiji",
    "names": [
      "fiji"
    ],
    "tags": []
  },
  "🇫🇮": {
    "category": "flags",
    "description": "Finland",
    "names": [
      "finland"
    ],
    "tags": []
  },
  "🇫🇷": {
    "category": "flags",
    "description": "France",
    "names": [
      "fr"
    ],
    "tags": [
      "france",
      "french"
    ]
  },
  "🇬🇫": {
    "category": "flags",
    "description": "French Guiana",
    "names": [
      "french_guiana"
    ],
    "tags": []
  },
  "🇵🇫": {
    "category": "flags",
    "description": "French Polynesia",
    "names": [
      "french_polynesia"
    ],
    "tags": []
  },
  "🇹🇫": {
    "category": "flags",
    "description": "French Southern Territories",
    "names": [
      "french_southern_territories"
    ],
    "tags": []
  },
  "🇬🇦": {
    "category": "flags",
    "description": "Gabon",
    "names": [
      "gabon"
    ],
    "tags": []
  },
  "🇬🇲": {
    "category": "flags",
    "description": "Gambia",
    "names": [
      "gambia"
    ],
    "tags": []
  },
  "🇬🇪": {
    "category": "flags",
    "description": "Georgia",
    "names": [
      "georgia"
    ],
    "tags": []
  },
  "🇩🇪": {
    "category": "flags",
    "description": "Germany",
    "names": [
      "de"
    ],
    "tags": [
      "flag",
      "germany"
    ]
  },
  "🇬🇭": {
    "category": "flags",
    "description": "Ghana",
    "names": [
      "ghana"
    ],
    "tags": []
  },
  "🇬🇮": {
    "category": "flags",
    "description": "Gibraltar",
    "names": [
      "gibraltar"
    ],
    "tags": []
  },
  "🇬🇷": {
    "category": "flags",
    "description": "Greece",
    "names": [
      "greece"
    ],
    "tags": []
  },
  "🇬🇱": {
    "category": "flags",
    "description": "Greenland",
    "names": [
      "greenland"
    ],
    "tags": []
  },
  "🇬🇩": {
    "category": "flags",
    "description": "Grenada",
    "names": [
      "grenada"
    ],
    "tags": []
  },
  "🇬🇵": {
    "category": "flags",
    "description": "Guadeloupe",
    "names": [
      "guadeloupe"
    ],
    "tags": []
  },
  "🇬🇺": {
    "category": "flags",
    "description": "Guam",
    "names": [
      "guam"
    ],
    "tags": []
  },
  "🇬🇹": {
    "category": "flags",
    "description": "Guatemala",
    "names": [
      "guatemala"
    ],
    "tags": []
  },
  "🇬🇬": {
    "category": "flags",
    "description": "Guernsey",
    "names": [
      "guernsey"
    ],
    "tags": []
  },
  "🇬🇳": {
    "category": "flags",
    "description": "Guinea",
    "names": [
      "guinea"
    ],
    "tags": []
  },
  "🇬🇼": {
    "category": "flags",
    "description": "Guinea-Bissau",
    "names": [
      "guinea_bissau"
    ],
    "tags": []
  },
  "🇬🇾": {
    "category": "flags",
    "description": "Guyana",
    "names": [
      "guyana"
    ],
    "tags": []
  },
  "🇭🇹": {
    "category": "flags",
    "description": "Haiti",
    "names": [
      "haiti"
    ],
    "tags": []
  },
  "🇭🇳": {
    "category": "flags",
    "description": "Honduras",
    "names": [
      "honduras"
    ],
    "tags": []
  },
  "🇭🇰": {
    "category": "flags",
    "description": "Hong Kong SAR China",
    "names": [
      "hong_kong"
    ],
    "tags": []
  },
  "🇭🇺": {
    "category": "flags",
    "description": "Hungary",
    "names": [
      "hungary"
    ],
    "tags": []
  },
  "🇮🇸": {
    "category": "flags",
    "description": "Iceland",
    "names": [
      "iceland"
    ],
    "tags": []
  },
  "🇮🇳": {
    "category": "flags",
    "description": "India",
    "names": [
      "india"
    ],
    "tags": []
  },
  "🇮🇩": {
    "category": "flags",
    "description": "Indonesia",
    "names": [
      "indonesia"
    ],
    "tags": []
  },
  "🇮🇷": {
    "category": "flags",
    "description": "Iran",
    "names": [
      "iran"
    ],
    "tags": []
  },
  "🇮🇶": {
    "category": "flags",
    "description": "Iraq",
    "names": [
      "iraq"
    ],
    "tags": []
  },
  "🇮🇪": {
    "category": "flags",
    "description": "Ireland",
    "names": [
      "ireland"
    ],
    "tags": []
  },
  "🇮🇲": {
    "category": "flags",
    "description": "Isle of Man",
    "names": [
      "isle_of_man"
    ],
    "tags": []
  },
  "🇮🇱": {
    "category": "flags",
    "description": "Israel",
    "names": [
      "israel"
    ],
    "tags": []
  },
  "🇮🇹": {
    "category": "flags",
    "description": "Italy",
    "names": [
      "it"
    ],
    "tags": [
      "italy"
    ]
  },
  "🇯🇲": {
    "category": "flags",
    "description": "Jamaica",
    "names": [
      "jamaica"
    ],
    "tags": []
  },
  "🇯🇵": {
    "category": "flags",
    "description": "Japan",
    "names": [
      "jp"
    ],
    "tags": [
      "japan"
    ]
  },
  "🎌": {
    "category": "flags",
    "description": "crossed flags",
    "names": [
      "crossed_flags"
    ],
    "tags": []
  },
  "🇯🇪": {
    "category": "flags",
    "description": "Jersey",
    "names": [
      "jersey"
    ],
    "tags": []
  },
  "🇯🇴": {
    "category": "flags",
    "description": "Jordan",
    "names": [
      "jordan"
    ],
    "tags": []
  },
  "🇰🇿": {
    "category": "flags",
    "description": "Kazakhstan",
    "names": [
      "kazakhstan"
    ],
    "tags": []
  },
  "🇰🇪": {
    "category": "flags",
    "description": "Kenya",
    "names": [
      "kenya"
    ],
    "tags": []
  },
  "🇰🇮": {
    "category": "flags",
    "description": "Kiribati",
    "names": [
      "kiribati"
    ],
    "tags": []
  },
  "🇽🇰": {
    "category": "flags",
    "description": "Kosovo",
    "names": [
      "kosovo"
    ],
    "tags": []
  },
  "🇰🇼": {
    "category": "flags",
    "description": "Kuwait",
    "names": [
      "kuwait"
    ],
    "tags": []
  },
  "🇰🇬": {
    "category": "flags",
    "description": "Kyrgyzstan",
    "names": [
      "kyrgyzstan"
    ],
    "tags": []
  },
  "🇱🇦": {
    "category": "flags",
    "description": "Laos",
    "names": [
      "laos"
    ],
    "tags": []
  },
  "🇱🇻": {
    "category": "flags",
    "description": "Latvia",
    "names": [
      "latvia"
    ],
    "tags": []
  },
  "🇱🇧": {
    "category": "flags",
    "description": "Lebanon",
    "names": [
      "lebanon"
    ],
    "tags": []
  },
  "🇱🇸": {
    "category": "flags",
    "description": "Lesotho",
    "names": [
      "lesotho"
    ],
    "tags": []
  },
  "🇱🇷": {
    "category": "flags",
    "description": "Liberia",
    "names": [
      "liberia"
    ],
    "tags": []
  },
  "🇱🇾": {
    "category": "flags",
    "description": "Libya",
    "names": [
      "libya"
    ],
    "tags": []
  },
  "🇱🇮": {
    "category": "flags",
    "description": "Liechtenstein",
    "names": [
      "liechtenstein"
    ],
    "tags": []
  },
  "🇱🇹": {
    "category": "flags",
    "description": "Lithuania",
    "names": [
      "lithuania"
    ],
    "tags": []
  },
  "🇱🇺": {
    "category": "flags",
    "description": "Luxembourg",
    "names": [
      "luxembourg"
    ],
    "tags": []
  },
  "🇲🇴": {
    "category": "flags",
    "description": "Macau SAR China",
    "names": [
      "macau"
    ],
    "tags": []
  },
  "🇲🇰": {
    "category": "flags",
    "description": "Macedonia",
    "names": [
      "macedonia"
    ],
    "tags": []
  },
  "🇲🇬": {
    "category": "flags",
    "description": "Madagascar",
    "names": [
      "madagascar"
    ],
    "tags": []
  },
  "🇲🇼": {
    "category": "flags",
    "description": "Malawi",
    "names": [
      "malawi"
    ],
    "tags": []
  },
  "🇲🇾": {
    "category": "flags",
    "description": "Malaysia",
    "names": [
      "malaysia"
    ],
    "tags": []
  },
  "🇲🇻": {
    "category": "flags",
    "description": "Maldives",
    "names": [
      "maldives"
    ],
    "tags": []
  },
  "🇲🇱": {
    "category": "flags",
    "description": "Mali",
    "names": [
      "mali"
    ],
    "tags": []
  },
  "🇲🇹": {
    "category": "flags",
    "description": "Malta",
    "names": [
      "malta"
    ],
    "tags": []
  },
  "🇲🇭": {
    "category": "flags",
    "description": "Marshall Islands",
    "names": [
      "marshall_islands"
    ],
    "tags": []
  },
  "🇲🇶": {
    "category": "flags",
    "description": "Martinique",
    "names": [
      "martinique"
    ],
    "tags": []
  },
  "🇲🇷": {
    "category": "flags",
    "description": "Mauritania",
    "names": [
      "mauritania"
    ],
    "tags": []
  },
  "🇲🇺": {
    "category": "flags",
    "description": "Mauritius",
    "names": [
      "mauritius"
    ],
    "tags": []
  },
  "🇾🇹": {
    "category": "flags",
    "description": "Mayotte",
    "names": [
      "mayotte"
    ],
    "tags": []
  },
  "🇲🇽": {
    "category": "flags",
    "description": "Mexico",
    "names": [
      "mexico"
    ],
    "tags": []
  },
  "🇫🇲": {
    "category": "flags",
    "description": "Micronesia",
    "names": [
      "micronesia"
    ],
    "tags": []
  },
  "🇲🇩": {
    "category": "flags",
    "description": "Moldova",
    "names": [
      "moldova"
    ],
    "tags": []
  },
  "🇲🇨": {
    "category": "flags",
    "description": "Monaco",
    "names": [
      "monaco"
    ],
    "tags": []
  },
  "🇲🇳": {
    "category": "flags",
    "description": "Mongolia",
    "names": [
      "mongolia"
    ],
    "tags": []
  },
  "🇲🇪": {
    "category": "flags",
    "description": "Montenegro",
    "names": [
      "montenegro"
    ],
    "tags": []
  },
  "🇲🇸": {
    "category": "flags",
    "description": "Montserrat",
    "names": [
      "montserrat"
    ],
    "tags": []
  },
  "🇲🇦": {
    "category": "flags",
    "description": "Morocco",
    "names": [
      "morocco"
    ],
    "tags": []
  },
  "🇲🇿": {
    "category": "flags",
    "description": "Mozambique",
    "names": [
      "mozambique"
    ],
    "tags": []
  },
  "🇲🇲": {
    "category": "flags",
    "description": "Myanmar (Burma)",
    "names": [
      "myanmar"
    ],
    "tags": [
      "burma"
    ]
  },
  "🇳🇦": {
    "category": "flags",
    "description": "Namibia",
    "names": [
      "namibia"
    ],
    "tags": []
  },
  "🇳🇷": {
    "category": "flags",
    "description": "Nauru",
    "names": [
      "nauru"
    ],
    "tags": []
  },
  "🇳🇵": {
    "category": "flags",
    "description": "Nepal",
    "names": [
      "nepal"
    ],
    "tags": []
  },
  "🇳🇱": {
    "category": "flags",
    "description": "Netherlands",
    "names": [
      "netherlands"
    ],
    "tags": []
  },
  "🇳🇨": {
    "category": "flags",
    "description": "New Caledonia",
    "names": [
      "new_caledonia"
    ],
    "tags": []
  },
  "🇳🇿": {
    "category": "flags",
    "description": "New Zealand",
    "names": [
      "new_zealand"
    ],
    "tags": []
  },
  "🇳🇮": {
    "category": "flags",
    "description": "Nicaragua",
    "names": [
      "nicaragua"
    ],
    "tags": []
  },
  "🇳🇪": {
    "category": "flags",
    "description": "Niger",
    "names": [
      "niger"
    ],
    "tags": []
  },
  "🇳🇬": {
    "category": "flags",
    "description": "Nigeria",
    "names": [
      "nigeria"
    ],
    "tags": []
  },
  "🇳🇺": {
    "category": "flags",
    "description": "Niue",
    "names": [
      "niue"
    ],
    "tags": []
  },
  "🇳🇫": {
    "category": "flags",
    "description": "Norfolk Island",
    "names": [
      "norfolk_island"
    ],
    "tags": []
  },
  "🇲🇵": {
    "category": "flags",
    "description": "Northern Mariana Islands",
    "names": [
      "northern_mariana_islands"
    ],
    "tags": []
  },
  "🇰🇵": {
    "category": "flags",
    "description": "North Korea",
    "names": [
      "north_korea"
    ],
    "tags": []
  },
  "🇳🇴": {
    "category": "flags",
    "description": "Norway",
    "names": [
      "norway"
    ],
    "tags": []
  },
  "🇴🇲": {
    "category": "flags",
    "description": "Oman",
    "names": [
      "oman"
    ],
    "tags": []
  },
  "🇵🇰": {
    "category": "flags",
    "description": "Pakistan",
    "names": [
      "pakistan"
    ],
    "tags": []
  },
  "🇵🇼": {
    "category": "flags",
    "description": "Palau",
    "names": [
      "palau"
    ],
    "tags": []
  },
  "🇵🇸": {
    "category": "flags",
    "description": "Palestinian Territories",
    "names": [
      "palestinian_territories"
    ],
    "tags": []
  },
  "🇵🇦": {
    "category": "flags",
    "description": "Panama",
    "names": [
      "panama"
    ],
    "tags": []
  },
  "🇵🇬": {
    "category": "flags",
    "description": "Papua New Guinea",
    "names": [
      "papua_new_guinea"
    ],
    "tags": []
  },
  "🇵🇾": {
    "category": "flags",
    "description": "Paraguay",
    "names": [
      "paraguay"
    ],
    "tags": []
  },
  "🇵🇪": {
    "category": "flags",
    "description": "Peru",
    "names": [
      "peru"
    ],
    "tags": []
  },
  "🇵🇭": {
    "category": "flags",
    "description": "Philippines",
    "names": [
      "philippines"
    ],
    "tags": []
  },
  "🇵🇳": {
    "category": "flags",
    "description": "Pitcairn Islands",
    "names": [
      "pitcairn_islands"
    ],
    "tags": []
  },
  "🇵🇱": {
    "category": "flags",
    "description": "Poland",
    "names": [
      "poland"
    ],
    "tags": []
  },
  "🇵🇹": {
    "category": "flags",
    "description": "Portugal",
    "names": [
      "portugal"
    ],
    "tags": []
  },
  "🇵🇷": {
    "category": "flags",
    "description": "Puerto Rico",
    "names": [
      "puerto_rico"
    ],
    "tags": []
  },
  "🇶🇦": {
    "category": "flags",
    "description": "Qatar",
    "names": [
      "qatar"
    ],
    "tags": []
  },
  "🇷🇪": {
    "category": "flags",
    "description": "Réunion",
    "names": [
      "reunion"
    ],
    "tags": []
  },
  "🇷🇴": {
    "category": "flags",
    "description": "Romania",
    "names": [
      "romania"
    ],
    "tags": []
  },
  "🇷🇺": {
    "category": "flags",
    "description": "Russia",
    "names": [
      "ru"
    ],
    "tags": [
      "russia"
    ]
  },
  "🇷🇼": {
    "category": "flags",
    "description": "Rwanda",
    "names": [
      "rwanda"
    ],
    "tags": []
  },
  "🇧🇱": {
    "category": "flags",
    "description": "St. Barthélemy",
    "names": [
      "st_barthelemy"
    ],
    "tags": []
  },
  "🇸🇭": {
    "category": "flags",
    "description": "St. Helena",
    "names": [
      "st_helena"
    ],
    "tags": []
  },
  "🇰🇳": {
    "category": "flags",
    "description": "St. Kitts & Nevis",
    "names": [
      "st_kitts_nevis"
    ],
    "tags": []
  },
  "🇱🇨": {
    "category": "flags",
    "description": "St. Lucia",
    "names": [
      "st_lucia"
    ],
    "tags": []
  },
  "🇵🇲": {
    "category": "flags",
    "description": "St. Pierre & Miquelon",
    "names": [
      "st_pierre_miquelon"
    ],
    "tags": []
  },
  "🇻🇨": {
    "category": "flags",
    "description": "St. Vincent & Grenadines",
    "names": [
      "st_vincent_grenadines"
    ],
    "tags": []
  },
  "🇼🇸": {
    "category": "flags",
    "description": "Samoa",
    "names": [
      "samoa"
    ],
    "tags": []
  },
  "🇸🇲": {
    "category": "flags",
    "description": "San Marino",
    "names": [
      "san_marino"
    ],
    "tags": []
  },
  "🇸🇹": {
    "category": "flags",
    "description": "São Tomé & Príncipe",
    "names": [
      "sao_tome_principe"
    ],
    "tags": []
  },
  "🇸🇦": {
    "category": "flags",
    "description": "Saudi Arabia",
    "names": [
      "saudi_arabia"
    ],
    "tags": []
  },
  "🇸🇳": {
    "category": "flags",
    "description": "Senegal",
    "names": [
      "senegal"
    ],
    "tags": []
  },
  "🇷🇸": {
    "category": "flags",
    "description": "Serbia",
    "names": [
      "serbia"
    ],
    "tags": []
  },
  "🇸🇨": {
    "category": "flags",
    "description": "Seychelles",
    "names": [
      "seychelles"
    ],
    "tags": []
  },
  "🇸🇱": {
    "category": "flags",
    "description": "Sierra Leone",
    "names": [
      "sierra_leone"
    ],
    "tags": []
  },
  "🇸🇬": {
    "category": "flags",
    "description": "Singapore",
    "names": [
      "singapore"
    ],
    "tags": []
  },
  "🇸🇽": {
    "category": "flags",
    "description": "Sint Maarten",
    "names": [
      "sint_maarten"
    ],
    "tags": []
  },
  "🇸🇰": {
    "category": "flags",
    "description": "Slovakia",
    "names": [
      "slovakia"
    ],
    "tags": []
  },
  "🇸🇮": {
    "category": "flags",
    "description": "Slovenia",
    "names": [
      "slovenia"
    ],
    "tags": []
  },
  "🇸🇧": {
    "category": "flags",
    "description": "Solomon Islands",
    "names": [
      "solomon_islands"
    ],
    "tags": []
  },
  "🇸🇴": {
    "category": "flags",
    "description": "Somalia",
    "names": [
      "somalia"
    ],
    "tags": []
  },
  "🇿🇦": {
    "category": "flags",
    "description": "South Africa",
    "names": [
      "south_africa"
    ],
    "tags": []
  },
  "🇬🇸": {
    "category": "flags",
    "description": "South Georgia & South Sandwich Islands",
    "names": [
      "south_georgia_south_sandwich_islands"
    ],
    "tags": []
  },
  "🇰🇷": {
    "category": "flags",
    "description": "South Korea",
    "names": [
      "kr"
    ],
    "tags": [
      "korea"
    ]
  },
  "🇸🇸": {
    "category": "flags",
    "description": "South Sudan",
    "names": [
      "south_sudan"
    ],
    "tags": []
  },
  "🇪🇸": {
    "category": "flags",
    "description": "Spain",
    "names": [
      "es"
    ],
    "tags": [
      "spain"
    ]
  },
  "🇱🇰": {
    "category": "flags",
    "description": "Sri Lanka",
    "names": [
      "sri_lanka"
    ],
    "tags": []
  },
  "🇸🇩": {
    "category": "flags",
    "description": "Sudan",
    "names": [
      "sudan"
    ],
    "tags": []
  },
  "🇸🇷": {
    "category": "flags",
    "description": "Suriname",
    "names": [
      "suriname"
    ],
    "tags": []
  },
  "🇸🇿": {
    "category": "flags",
    "description": "Swaziland",
    "names": [
      "swaziland"
    ],
    "tags": []
  },
  "🇸🇪": {
    "category": "flags",
    "description": "Sweden",
    "names": [
      "sweden"
    ],
    "tags": []
  },
  "🇨🇭": {
    "category": "flags",
    "description": "Switzerland",
    "names": [
      "switzerland"
    ],
    "tags": []
  },
  "🇸🇾": {
    "category": "flags",
    "description": "Syria",
    "names": [
      "syria"
    ],
    "tags": []
  },
  "🇹🇼": {
    "category": "flags",
    "description": "Taiwan",
    "names": [
      "taiwan"
    ],
    "tags": []
  },
  "🇹🇯": {
    "category": "flags",
    "description": "Tajikistan",
    "names": [
      "tajikistan"
    ],
    "tags": []
  },
  "🇹🇿": {
    "category": "flags",
    "description": "Tanzania",
    "names": [
      "tanzania"
    ],
    "tags": []
  },
  "🇹🇭": {
    "category": "flags",
    "description": "Thailand",
    "names": [
      "thailand"
    ],
    "tags": []
  },
  "🇹🇱": {
    "category": "flags",
    "description": "Timor-Leste",
    "names": [
      "timor_leste"
    ],
    "tags": []
  },
  "🇹🇬": {
    "category": "flags",
    "description": "Togo",
    "names": [
      "togo"
    ],
    "tags": []
  },
  "🇹🇰": {
    "category": "flags",
    "description": "Tokelau",
    "names": [
      "tokelau"
    ],
    "tags": []
  },
  "🇹🇴": {
    "category": "flags",
    "description": "Tonga",
    "names": [
      "tonga"
    ],
    "tags": []
  },
  "🇹🇹": {
    "category": "flags",
    "description": "Trinidad & Tobago",
    "names": [
      "trinidad_tobago"
    ],
    "tags": []
  },
  "🇹🇳": {
    "category": "flags",
    "description": "Tunisia",
    "names": [
      "tunisia"
    ],
    "tags": []
  },
  "🇹🇷": {
    "category": "flags",
    "description": "Turkey",
    "names": [
      "tr"
    ],
    "tags": [
      "turkey"
    ]
  },
  "🇹🇲": {
    "category": "flags",
    "description": "Turkmenistan",
    "names": [
      "turkmenistan"
    ],
    "tags": []
  },
  "🇹🇨": {
    "category": "flags",
    "description": "Turks & Caicos Islands",
    "names": [
      "turks_caicos_islands"
    ],
    "tags": []
  },
  "🇹🇻": {
    "category": "flags",
    "description": "Tuvalu",
    "names": [
      "tuvalu"
    ],
    "tags": []
  },
  "🇺🇬": {
    "category": "flags",
    "description": "Uganda",
    "names": [
      "uganda"
    ],
    "tags": []
  },
  "🇺🇦": {
    "category": "flags",
    "description": "Ukraine",
    "names": [
      "ukraine"
    ],
    "tags": []
  },
  "🇦🇪": {
    "category": "flags",
    "description": "United Arab Emirates",
    "names": [
      "united_arab_emirates"
    ],
    "tags": []
  },
  "🇬🇧": {
    "category": "flags",
    "description": "United Kingdom",
    "names": [
      "gb",
      "uk"
    ],
    "tags": [
      "flag",
      "british"
    ]
  },
  "🇺🇸": {
    "category": "flags",
    "description": "United States",
    "names": [
      "us"
    ],
    "tags": [
      "flag",
      "united",
      "america"
    ]
  },
  "🇻🇮": {
    "category": "flags",
    "description": "U.S. Virgin Islands",
    "names": [
      "us_virgin_islands"
    ],
    "tags": []
  },
  "🇺🇾": {
    "category": "flags",
    "description": "Uruguay",
    "names": [
      "uruguay"
    ],
    "tags": []
  },
  "🇺🇿": {
    "category": "flags",
    "description": "Uzbekistan",
    "names": [
      "uzbekistan"
    ],
    "tags": []
  },
  "🇻🇺": {
    "category": "flags",
    "description": "Vanuatu",
    "names": [
      "vanuatu"
    ],
    "tags": []
  },
  "🇻🇦": {
    "category": "flags",
    "description": "Vatican City",
    "names": [
      "vatican_city"
    ],
    "tags": []
  },
  "🇻🇪": {
    "category": "flags",
    "description": "Venezuela",
    "names": [
      "venezuela"
    ],
    "tags": []
  },
  "🇻🇳": {
    "category": "flags",
    "description": "Vietnam",
    "names": [
      "vietnam"
    ],
    "tags": []
  },
  "🇼🇫": {
    "category": "flags",
    "description": "Wallis & Futuna",
    "names": [
      "wallis_futuna"
    ],
    "tags": []
  },
  "🇪🇭": {
    "category": "flags",
    "description": "Western Sahara",
    "names": [
      "western_sahara"
    ],
    "tags": []
  },
  "🇾🇪": {
    "category": "flags",
    "description": "Yemen",
    "names": [
      "yemen"
    ],
    "tags": []
  },
  "🇿🇲": {
    "category": "flags",
    "description": "Zambia",
    "names": [
      "zambia"
    ],
    "tags": []
  },
  "🇿🇼": {
    "category": "flags",
    "description": "Zimbabwe",
    "names": [
      "zimbabwe"
    ],
    "tags": []
  }
}

},{}],7:[function(require,module,exports){
'use strict'

var data = require('./index.json')

exports.unicode = data
exports.name = {}

var emoji

for (emoji in data) {
  enhance(emoji)
}

/* Transform an emoji. */
function enhance(character) {
  var information = data[character]
  var names = information.names
  var length = names.length
  var index = 0 /* First must be skipped. */

  /* Add the main `name` and the emoji. */
  information.name = names[0]
  information.emoji = character

  /* Add names. */
  exports.name[names[0]] = information

  while (++index < length) {
    exports.name[names[index]] = information
  }
}

},{"./index.json":6}],8:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],9:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

},{}],10:[function(require,module,exports){
'use strict';
var toString = Object.prototype.toString;

module.exports = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};

},{}],11:[function(require,module,exports){
'use strict'

var modifier = require('unist-util-modify-children')

module.exports = modifier(mergeAffixEmoticon)

var EMOTICON_NODE = 'EmoticonNode'

/* Merge emoticons into an `EmoticonNode`. */
function mergeAffixEmoticon(child, index, parent) {
  var children = child.children
  var position
  var node
  var prev

  if (children && children.length !== 0 && index !== 0) {
    position = -1

    while (children[++position]) {
      node = children[position]

      if (node.type === EMOTICON_NODE) {
        prev = parent.children[index - 1]

        prev.children = prev.children.concat(children.slice(0, position + 1))
        child.children = children.slice(position + 1)

        if (node.position && child.position && prev.position) {
          prev.position.end = node.position.end
          child.position.start = node.position.end
        }

        /* Next, iterate over the node again. */
        return index
      }

      if (node.type !== 'WhiteSpaceNode') {
        break
      }
    }
  }
}

},{"unist-util-modify-children":50}],12:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifier = require('unist-util-modify-children')
var gemoji = require('gemoji')

module.exports = modifier(mergeEmoji)

var own = {}.hasOwnProperty

var EMOTICON_NODE = 'EmoticonNode'

/* Magic numbers.
 *
 * Gemoji's are treated by a parser as multiple nodes.
 * Because this modifier walks backwards, the first colon
 * never matches a gemoji it would normaly walk back to
 * the beginning (the first node). However, because the
 * longest gemoji is tokenized as `Punctuation` (`:`),
 * `Punctuation` (`+`), `Word` (`1`), and `Punctuation`
 * (`:`), we can safely break when the modifier walked
 * back more than 4 times. */
var MAX_GEMOJI_PART_COUNT = 12

var shortcodes = []
var unicodes = gemoji.unicode
var byName = gemoji.name
var key

for (key in byName) {
  shortcodes.push(':' + key + ':')
}

/* Merge emoji and github-emoji (punctuation marks,
 * symbols, and words) into an `EmoticonNode`. */
function mergeEmoji(child, index, parent) {
  var siblings = parent.children
  var value = toString(child)
  var siblingIndex
  var node
  var nodes
  var subvalue
  var left
  var right
  var leftMatch
  var rightMatch
  var start
  var pos
  var end
  var replace
  var startIndex
  var nextSibling
  var nextNextSibling
  var possibleEmoji
  var maxSiblingIndex
  var loopIndex
  var lastSibling
  var lastSiblingIndex

  if (child.type === 'WordNode') {
    /* 1️⃣ — sometimes a unicode emoji is marked as a word. Mark it as
     * an `EmoticonNode`. */
    if (own.call(unicodes, value)) {
      node = {type: EMOTICON_NODE, value: value}

      if (child.position) {
        node.position = child.position
      }

      siblings[index] = node
    } else {
      /* ❤️ — Sometimes a unicode emoji is split in two.  Remove the last
       * and add its value to the first. */
      node = siblings[index - 1]

      if (node && own.call(unicodes, toString(node) + value)) {
        node.type = EMOTICON_NODE
        node.value = toString(node) + value

        if (child.position && node.position) {
          node.position.end = child.position.end
        }

        siblings.splice(index, 1)

        return index
      }
    }
  } else if (own.call(unicodes, value)) {
    child.type = EMOTICON_NODE
    startIndex = index + 1
    nextSibling = siblings[startIndex]
    if (!nextSibling) {
      return
    }

    if (nextSibling.type === 'WordNode') {
      /* 🏌 — Normal emoji. */
      if (!isVarianceSelector(nextSibling)) {
        return
      }

      possibleEmoji = value + toString(nextSibling)
      maxSiblingIndex = siblings.length
      loopIndex = startIndex + 1

      while (
        loopIndex < maxSiblingIndex &&
        loopIndex - startIndex < 5 &&
        siblings[loopIndex].type !== 'WordNode'
      ) {
        possibleEmoji += toString(siblings[loopIndex])
        loopIndex++
      }

      lastSibling = siblings[loopIndex]

      if (lastSibling && lastSibling.type === 'WordNode') {
        possibleEmoji += toString(lastSibling)
      }

      /* 🏌️‍♀️ — Emoji with variance selector. */
      if (own.call(unicodes, possibleEmoji)) {
        child.value = possibleEmoji

        if (child.position && lastSibling.position) {
          child.position.end = lastSibling.position.end
        }

        siblings.splice(index + 1, loopIndex - index)

        return index + 1
      }
      /* 👨‍❤️‍💋‍👨 — combined emoji. */
    } else if (nextSibling.type === 'SymbolNode') {
      possibleEmoji = value + toString(nextSibling)
      maxSiblingIndex = siblings.length
      loopIndex = startIndex + 1

      while (
        loopIndex < maxSiblingIndex &&
        loopIndex - startIndex < 5 &&
        (siblings[loopIndex].type === 'SymbolNode' ||
          (siblings[loopIndex].type === 'WordNode' &&
            isVarianceSelector(siblings[loopIndex])))
      ) {
        possibleEmoji += toString(siblings[loopIndex])
        loopIndex++
      }

      if (own.call(unicodes, possibleEmoji)) {
        child.value = possibleEmoji
        lastSiblingIndex = loopIndex - 1
        lastSibling = siblings[lastSiblingIndex]

        if (child.position && lastSibling.position) {
          child.position.end = lastSibling.position.end
        }

        siblings.splice(index + 1, lastSiblingIndex - index)

        return index + 1
      }
    }
    /* 🤽‍♀ — Combined emoji starting in a symbol. */
  } else if (child.type === 'SymbolNode') {
    nextSibling = siblings[index + 1]
    nextNextSibling = siblings[index + 2]
    if (!nextSibling || !nextNextSibling) {
      return
    }

    if (
      (nextSibling.type === 'SymbolNode' || nextSibling.type === 'WordNode') &&
      nextNextSibling &&
      nextNextSibling.type === 'SymbolNode'
    ) {
      possibleEmoji = value + toString(nextSibling) + toString(nextNextSibling)

      if (own.call(unicodes, possibleEmoji)) {
        child.type = EMOTICON_NODE
        child.value = possibleEmoji

        if (child.position && nextNextSibling.position) {
          child.position.end = nextNextSibling.position.end
        }

        siblings.splice(index + 1, 2)

        return index + 1
      }
    }
    /* :+1: — Gemoji shortcodes. */
  } else if (value.charAt(0) === ':') {
    nodes = []
    siblingIndex = index
    subvalue = value
    left = null
    right = null
    leftMatch = null
    rightMatch = null

    if (subvalue.length === 1) {
      rightMatch = child
    } else {
      end = child.position && child.position.end
      start = end && child.position.start
      pos = end && {
        line: start.line,
        column: start.column + 1,
        offset: start.offset + 1
      }

      rightMatch = {
        type: 'PunctuationNode',
        value: ':'
      }

      right = {
        type: 'PunctuationNode',
        value: subvalue.slice(1)
      }

      if (end) {
        rightMatch.position = {start: start, end: pos}
        right.position = {start: pos, end: end}
      }
    }

    while (siblingIndex--) {
      if (index - siblingIndex > MAX_GEMOJI_PART_COUNT) {
        return
      }

      node = siblings[siblingIndex]

      subvalue = toString(node)

      if (subvalue.charAt(subvalue.length - 1) === ':') {
        leftMatch = node
        break
      }

      if (node.children) {
        nodes = nodes.concat(node.children.concat().reverse())
      } else {
        nodes.push(node)
      }

      if (siblingIndex === 0) {
        return
      }
    }

    if (!leftMatch) {
      return
    }

    subvalue = toString(leftMatch)

    if (subvalue.length !== 1) {
      end = leftMatch.position && leftMatch.position.end
      start = end && leftMatch.position.start
      pos = end && {
        line: end.line,
        column: end.column - 1,
        offset: end.offset - 1
      }

      left = {
        type: 'PunctuationNode',
        value: subvalue.slice(0, -1)
      }

      leftMatch = {
        type: 'PunctuationNode',
        value: ':'
      }

      if (end) {
        left.position = {start: start, end: pos}
        leftMatch.position = {start: pos, end: end}
      }
    }

    nodes.push(leftMatch)
    nodes.reverse().push(rightMatch)

    value = toString(nodes)

    if (shortcodes.indexOf(value) === -1) {
      return
    }

    replace = [siblingIndex, index - siblingIndex + 1]

    if (left) {
      replace.push(left)
    }

    child.type = EMOTICON_NODE
    child.value = value

    if (child.position && leftMatch.position) {
      child.position.start = leftMatch.position.start
    }

    if (child.position && rightMatch.position) {
      child.position.end = rightMatch.position.end
    }

    replace.push(child)

    if (right) {
      replace.push(right)
    }

    ;[].splice.apply(siblings, replace)

    return siblingIndex + 3
  }
}

function isVarianceSelector(node) {
  var code = toString(node).charCodeAt(0)
  return code > 65023 && code < 65040
}

},{"gemoji":7,"nlcst-to-string":14,"unist-util-modify-children":50}],13:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifier = require('unist-util-modify-children')
var raw = require('emoticon')

module.exports = modifier(mergeEmoticons)

var EMOTICON_NODE = 'EmoticonNode'

/* Magic numbers.
 *
 * Emoticons are treated by a parser as multiple nodes.
 * Because this modifier walks forwards, when a non-
 * emoticon matches it would normaly walk to the end
 * (the last node). However, because the longest emoticon
 * is tokenized as `Punctuation` (eyes), `Punctuation`
 * (a tear), `Punctuation` (another tear), `Punctuation`
 * (a nose), and `Punctuation` (a frowning mouth), we can
 * safely break when the modifier has walked 5 characters. */
var MAX_EMOTICON_LENGTH = 5

/* Unpack. */
var emoticons = []
var start = []
var end = []

unpack()

/* Merge emoticons into an `EmoticonNode`. */
function mergeEmoticons(child, index, parent) {
  var siblings
  var value
  var siblingIndex
  var node
  var emoticon
  var subvalue

  /* Check if `child`s first character could be used
   * to start an emoticon. */
  if (start.indexOf(toString(child).charAt(0)) !== -1) {
    siblings = parent.children
    siblingIndex = index
    node = child
    value = ''

    while (node) {
      if (value.length >= MAX_EMOTICON_LENGTH) {
        return
      }

      subvalue = toString(node)

      value += subvalue

      /* The second test, if the last character of
       * the current node is superfluous but
       * improves performance by 30%. */
      if (
        node.type !== EMOTICON_NODE &&
        end.indexOf(subvalue.charAt(subvalue.length - 1)) !== -1 &&
        emoticons.indexOf(value) !== -1
      ) {
        emoticon = {type: EMOTICON_NODE, value: value}

        if (child.position && node.position) {
          emoticon.position = {
            start: child.position.start,
            end: node.position.end
          }
        }

        siblings.splice(index, siblingIndex - index + 1, emoticon)

        /* Some emoticons, like `:-`, can be followed by
         * more characters to form other emoticons. */
        return index - 1
      }

      node = siblings[++siblingIndex]
    }
  }
}

function unpack() {
  var length = raw.length
  var index = -1
  var subset
  var offset
  var count
  var subvalue
  var char

  while (++index < length) {
    subset = raw[index].emoticons
    count = subset.length
    offset = -1

    while (++offset < count) {
      subvalue = subset[offset]

      emoticons.push(subvalue)

      char = subvalue.charAt(0)
      if (start.indexOf(char) === -1) {
        start.push(char)
      }

      char = subvalue.charAt(subvalue.length - 1)
      if (end.indexOf(char) === -1) {
        end.push(char)
      }
    }
  }
}

},{"emoticon":4,"nlcst-to-string":14,"unist-util-modify-children":50}],14:[function(require,module,exports){
'use strict'

module.exports = nlcstToString

/* Stringify a NLCST node or list of nodes. */
function nlcstToString(node, separator) {
  var sep = separator || ''
  var values
  var length
  var children

  if (!node || (!('length' in node) && !node.type)) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (typeof node.value === 'string') {
    return node.value
  }

  children = 'length' in node ? node : node.children
  length = children.length

  /* Shortcut: This is pretty common, and a small performance win. */
  if (length === 1 && 'value' in children[0]) {
    return children[0].value
  }

  values = []

  while (length--) {
    values[length] = nlcstToString(children[length], sep)
  }

  return values.join(sep)
}

},{}],15:[function(require,module,exports){
'use strict'
module.exports = require('./lib')

},{"./lib":17}],16:[function(require,module,exports){
/* This module is generated by `script/build-expressions.js` */
'use strict'

module.exports = {
  affixSymbol: /^([\)\]\}\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3E\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63]|["'\xBB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21]|[!\.\?\u2026\u203D])\1*$/,
  newLine: /^[ \t]*((\r?\n|\r)[\t ]*)+$/,
  newLineMulti: /^[ \t]*((\r?\n|\r)[\t ]*){2,}$/,
  terminalMarker: /^((?:[!\.\?\u2026\u203D])+)$/,
  wordSymbolInner: /^((?:[&'\-\.:=\?@\xAD\xB7\u2010\u2011\u2019\u2027])|(?:_)+)$/,
  numerical: /^(?:[0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF]|\uD83C[\uDD00-\uDD0C])+$/,
  digitStart: /^\d/,
  lowerInitial: /^(?:[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB])/,
  surrogates: /[\uD800-\uDFFF]/,
  punctuation: /[!"'-\),-\/:;\?\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u201F\u2022-\u2027\u2032-\u203A\u203C-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/,
  word: /[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09F4-\u09F9\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BF2\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7E\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D75\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F33\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u17F0-\u17F9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABE\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u20D0-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u3192-\u3195\u31A0-\u31BA\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA672\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA830-\uA835\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0-\uDEFB\uDF00-\uDF23\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F-\uDE47\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE6\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC00-\uDC46\uDC52-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF3B]|\uD806[\uDCA0-\uDCF2\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44\uDF60-\uDF71]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/,
  whiteSpace: /[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/
}

},{}],17:[function(require,module,exports){
'use strict'

var createParser = require('./parser')
var expressions = require('./expressions')

module.exports = ParseLatin

/* == PARSE LATIN ================================================== */

/* Transform Latin-script natural language into
 * an NLCST-tree. */
function ParseLatin(doc, file) {
  var value = file || doc

  if (!(this instanceof ParseLatin)) {
    return new ParseLatin(doc, file)
  }

  this.doc = value ? String(value) : null
}

/* Quick access to the prototype. */
var proto = ParseLatin.prototype

/* Default position. */
proto.position = true

/* Create text nodes. */
proto.tokenizeSymbol = createTextFactory('Symbol')
proto.tokenizeWhiteSpace = createTextFactory('WhiteSpace')
proto.tokenizePunctuation = createTextFactory('Punctuation')
proto.tokenizeSource = createTextFactory('Source')
proto.tokenizeText = createTextFactory('Text')

/* Expose `run`. */
proto.run = run

/* Inject `plugins` to modifiy the result of the method
 * at `key` on the operated on context. */
proto.use = useFactory(function(context, key, plugins) {
  context[key] = context[key].concat(plugins)
})

/* Inject `plugins` to modifiy the result of the method
 * at `key` on the operated on context, before any other. */
proto.useFirst = useFactory(function(context, key, plugins) {
  context[key] = plugins.concat(context[key])
})

/* Easy access to the document parser. This additionally
 * supports retext-style invocation: where an instance is
 * created for each file, and the file is given on
 * construction. */
proto.parse = function(value) {
  return this.tokenizeRoot(value || this.doc)
}

/* Transform a `value` into a list of `NLCSTNode`s. */
proto.tokenize = function(value) {
  return tokenize(this, value)
}

/* == PARENT NODES =================================================
 *
 * All these nodes are `pluggable`: they come with a
 * `use` method which accepts a plugin
 * (`function(NLCSTNode)`). Every time one of these
 * methods are called, the plugin is invoked with the
 * node, allowing for easy modification.
 *
 * In fact, the internal transformation from `tokenize`
 * (a list of words, white space, punctuation, and
 * symbols) to `tokenizeRoot` (an NLCST tree), is also
 * implemented through this mechanism. */

/* Create a `WordNode` with its children set to a single
 * `TextNode`, its value set to the given `value`. */
pluggable(ParseLatin, 'tokenizeWord', function(value, eat) {
  var add = (eat || noopEat)('')
  var parent = {type: 'WordNode', children: []}

  this.tokenizeText(value, eat, parent)

  return add(parent)
})

/* Create a `SentenceNode` with its children set to
 * `Node`s, their values set to the tokenized given
 * `value`.
 *
 * Unless plugins add new nodes, the sentence is
 * populated by `WordNode`s, `SymbolNode`s,
 * `PunctuationNode`s, and `WhiteSpaceNode`s. */
pluggable(
  ParseLatin,
  'tokenizeSentence',
  createParser({
    type: 'SentenceNode',
    tokenizer: 'tokenize'
  })
)

/* Create a `ParagraphNode` with its children set to
 * `Node`s, their values set to the tokenized given
 * `value`.
 *
 * Unless plugins add new nodes, the paragraph is
 * populated by `SentenceNode`s and `WhiteSpaceNode`s. */
pluggable(
  ParseLatin,
  'tokenizeParagraph',
  createParser({
    type: 'ParagraphNode',
    delimiter: expressions.terminalMarker,
    delimiterType: 'PunctuationNode',
    tokenizer: 'tokenizeSentence'
  })
)

/* Create a `RootNode` with its children set to `Node`s,
 * their values set to the tokenized given `value`. */
pluggable(
  ParseLatin,
  'tokenizeRoot',
  createParser({
    type: 'RootNode',
    delimiter: expressions.newLine,
    delimiterType: 'WhiteSpaceNode',
    tokenizer: 'tokenizeParagraph'
  })
)

/* == PLUGINS ====================================================== */

proto.use('tokenizeSentence', [
  require('./plugin/merge-initial-word-symbol'),
  require('./plugin/merge-final-word-symbol'),
  require('./plugin/merge-inner-word-symbol'),
  require('./plugin/merge-inner-word-slash'),
  require('./plugin/merge-initialisms'),
  require('./plugin/merge-words'),
  require('./plugin/patch-position')
])

proto.use('tokenizeParagraph', [
  require('./plugin/merge-non-word-sentences'),
  require('./plugin/merge-affix-symbol'),
  require('./plugin/merge-initial-lower-case-letter-sentences'),
  require('./plugin/merge-initial-digit-sentences'),
  require('./plugin/merge-prefix-exceptions'),
  require('./plugin/merge-affix-exceptions'),
  require('./plugin/merge-remaining-full-stops'),
  require('./plugin/make-initial-white-space-siblings'),
  require('./plugin/make-final-white-space-siblings'),
  require('./plugin/break-implicit-sentences'),
  require('./plugin/remove-empty-nodes'),
  require('./plugin/patch-position')
])

proto.use('tokenizeRoot', [
  require('./plugin/make-initial-white-space-siblings'),
  require('./plugin/make-final-white-space-siblings'),
  require('./plugin/remove-empty-nodes'),
  require('./plugin/patch-position')
])

/* == TEXT NODES =================================================== */

/* Factory to create a `Text`. */
function createTextFactory(type) {
  type += 'Node'

  return createText

  /* Construct a `Text` from a bound `type` */
  function createText(value, eat, parent) {
    if (value === null || value === undefined) {
      value = ''
    }

    return (eat || noopEat)(value)(
      {
        type: type,
        value: String(value)
      },
      parent
    )
  }
}

/* Run transform plug-ins for `key` on `nodes`. */
function run(key, nodes) {
  var wareKey = key + 'Plugins'
  var plugins = this[wareKey]
  var index = -1

  if (plugins) {
    while (plugins[++index]) {
      plugins[index](nodes)
    }
  }

  return nodes
}

/* Make a method “pluggable”. */
function pluggable(Constructor, key, callback) {
  /* Set a pluggable version of `callback`
   * on `Constructor`. */
  Constructor.prototype[key] = function() {
    return this.run(key, callback.apply(this, arguments))
  }
}

/* Factory to inject `plugins`. Takes `callback` for
 * the actual inserting. */
function useFactory(callback) {
  return use

  /* Validate if `plugins` can be inserted. Invokes
   * the bound `callback` to do the actual inserting. */
  function use(key, plugins) {
    var self = this
    var wareKey

    /* Throw if the method is not pluggable. */
    if (!(key in self)) {
      throw new Error(
        'Illegal Invocation: Unsupported `key` for ' +
          '`use(key, plugins)`. Make sure `key` is a ' +
          'supported function'
      )
    }

    /* Fail silently when no plugins are given. */
    if (!plugins) {
      return
    }

    wareKey = key + 'Plugins'

    /* Make sure `plugins` is a list. */
    if (typeof plugins === 'function') {
      plugins = [plugins]
    } else {
      plugins = plugins.concat()
    }

    /* Make sure `wareKey` exists. */
    if (!self[wareKey]) {
      self[wareKey] = []
    }

    /* Invoke callback with the ware key and plugins. */
    callback(self, wareKey, plugins)
  }
}

/* == CLASSIFY ===================================================== */

/* Match a word character. */
var WORD = expressions.word

/* Match a surrogate character. */
var SURROGATES = expressions.surrogates

/* Match a punctuation character. */
var PUNCTUATION = expressions.punctuation

/* Match a white space character. */
var WHITE_SPACE = expressions.whiteSpace

/* Transform a `value` into a list of `NLCSTNode`s. */
function tokenize(parser, value) {
  var tokens
  var offset
  var line
  var column
  var index
  var length
  var character
  var queue
  var prev
  var left
  var right
  var eater

  if (value === null || value === undefined) {
    value = ''
  } else if (value instanceof String) {
    value = value.toString()
  }

  if (typeof value !== 'string') {
    /* Return the given nodes if this is either an
     * empty array, or an array with a node as a first
     * child. */
    if ('length' in value && (!value[0] || value[0].type)) {
      return value
    }

    throw new Error(
      "Illegal invocation: '" +
        value +
        "' is not a valid argument for 'ParseLatin'"
    )
  }

  tokens = []

  if (!value) {
    return tokens
  }

  index = 0
  offset = 0
  line = 1
  column = 1

  /* Eat mechanism to use. */
  eater = parser.position ? eat : noPositionEat

  length = value.length
  prev = ''
  queue = ''

  while (index < length) {
    character = value.charAt(index)

    if (WHITE_SPACE.test(character)) {
      right = 'WhiteSpace'
    } else if (PUNCTUATION.test(character)) {
      right = 'Punctuation'
    } else if (WORD.test(character)) {
      right = 'Word'
    } else {
      right = 'Symbol'
    }

    tick()

    prev = character
    character = ''
    left = right
    right = null

    index++
  }

  tick()

  return tokens

  /* Check one character. */
  function tick() {
    if (
      left === right &&
      (left === 'Word' ||
        left === 'WhiteSpace' ||
        character === prev ||
        SURROGATES.test(character))
    ) {
      queue += character
    } else {
      /* Flush the previous queue. */
      if (queue) {
        parser['tokenize' + left](queue, eater)
      }

      queue = character
    }
  }

  /* Remove `subvalue` from `value`.
   * Expects `subvalue` to be at the start from
   * `value`, and applies no validation. */
  function eat(subvalue) {
    var pos = position()

    update(subvalue)

    return apply

    /* Add the given arguments, add `position` to
     * the returned node, and return the node. */
    function apply() {
      return pos(add.apply(null, arguments))
    }
  }

  /* Remove `subvalue` from `value`. Does not patch
   * positional information. */
  function noPositionEat() {
    return apply

    /* Add the given arguments and return the node. */
    function apply() {
      return add.apply(null, arguments)
    }
  }

  /* Add mechanism. */
  function add(node, parent) {
    if (parent) {
      parent.children.push(node)
    } else {
      tokens.push(node)
    }

    return node
  }

  /* Mark position and patch `node.position`. */
  function position() {
    var before = now()

    /* Add the position to a node. */
    function patch(node) {
      node.position = new Position(before)

      return node
    }

    return patch
  }

  /* Update line and column based on `value`. */
  function update(subvalue) {
    var subvalueLength = subvalue.length
    var character = -1
    var lastIndex = -1

    offset += subvalueLength

    while (++character < subvalueLength) {
      if (subvalue.charAt(character) === '\n') {
        lastIndex = character
        line++
      }
    }

    if (lastIndex === -1) {
      column += subvalueLength
    } else {
      column = subvalueLength - lastIndex
    }
  }

  /* Store position information for a node. */
  function Position(start) {
    this.start = start
    this.end = now()
  }

  /* Get the current position. */
  function now() {
    return {
      line: line,
      column: column,
      offset: offset
    }
  }
}

/* Add mechanism used when text-tokenisers are called
 * directly outside of the `tokenize` function. */
function noopAdd(node, parent) {
  if (parent) {
    parent.children.push(node)
  }

  return node
}

/* Eat and add mechanism without adding positional
 * information, used when text-tokenisers are called
 * directly outside of the `tokenize` function. */
function noopEat() {
  return noopAdd
}

},{"./expressions":16,"./parser":18,"./plugin/break-implicit-sentences":19,"./plugin/make-final-white-space-siblings":20,"./plugin/make-initial-white-space-siblings":21,"./plugin/merge-affix-exceptions":22,"./plugin/merge-affix-symbol":23,"./plugin/merge-final-word-symbol":24,"./plugin/merge-initial-digit-sentences":25,"./plugin/merge-initial-lower-case-letter-sentences":26,"./plugin/merge-initial-word-symbol":27,"./plugin/merge-initialisms":28,"./plugin/merge-inner-word-slash":29,"./plugin/merge-inner-word-symbol":30,"./plugin/merge-non-word-sentences":31,"./plugin/merge-prefix-exceptions":32,"./plugin/merge-remaining-full-stops":33,"./plugin/merge-words":34,"./plugin/patch-position":35,"./plugin/remove-empty-nodes":36}],18:[function(require,module,exports){
'use strict'

var tokenizer = require('./tokenizer')

module.exports = parserFactory

/* Construct a parser based on `options`. */
function parserFactory(options) {
  var type = options.type
  var tokenizerProperty = options.tokenizer
  var delimiter = options.delimiter
  var tokenize = delimiter && tokenizer(options.delimiterType, delimiter)

  return parser

  function parser(value) {
    var children = this[tokenizerProperty](value)

    return {
      type: type,
      children: tokenize ? tokenize(children) : children
    }
  }
}

},{"./tokenizer":37}],19:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')
var expressions = require('../expressions')

module.exports = modifyChildren(breakImplicitSentences)

/* Two or more new line characters. */
var MULTI_NEW_LINE = expressions.newLineMulti

/* Break a sentence if a white space with more
 * than one new-line is found. */
function breakImplicitSentences(child, index, parent) {
  var children
  var position
  var length
  var tail
  var head
  var end
  var insertion
  var node

  if (child.type !== 'SentenceNode') {
    return
  }

  children = child.children

  /* Ignore first and last child. */
  length = children.length - 1
  position = 0

  while (++position < length) {
    node = children[position]

    if (
      node.type !== 'WhiteSpaceNode' ||
      !MULTI_NEW_LINE.test(toString(node))
    ) {
      continue
    }

    child.children = children.slice(0, position)

    insertion = {
      type: 'SentenceNode',
      children: children.slice(position + 1)
    }

    tail = children[position - 1]
    head = children[position + 1]

    parent.children.splice(index + 1, 0, node, insertion)

    if (child.position && tail.position && head.position) {
      end = child.position.end

      child.position.end = tail.position.end

      insertion.position = {
        start: head.position.start,
        end: end
      }
    }

    return index + 1
  }
}

},{"../expressions":16,"nlcst-to-string":14,"unist-util-modify-children":50}],20:[function(require,module,exports){
'use strict'

var modifyChildren = require('unist-util-modify-children')

module.exports = modifyChildren(makeFinalWhiteSpaceSiblings)

/* Move white space ending a paragraph up, so they are
 * the siblings of paragraphs. */
function makeFinalWhiteSpaceSiblings(child, index, parent) {
  var children = child.children
  var prev

  if (
    children &&
    children.length !== 0 &&
    children[children.length - 1].type === 'WhiteSpaceNode'
  ) {
    parent.children.splice(index + 1, 0, child.children.pop())
    prev = children[children.length - 1]

    if (prev && prev.position && child.position) {
      child.position.end = prev.position.end
    }

    /* Next, iterate over the current node again. */
    return index
  }
}

},{"unist-util-modify-children":50}],21:[function(require,module,exports){
'use strict'

var visitChildren = require('unist-util-visit-children')

module.exports = visitChildren(makeInitialWhiteSpaceSiblings)

/* Move white space starting a sentence up, so they are
 * the siblings of sentences. */
function makeInitialWhiteSpaceSiblings(child, index, parent) {
  var children = child.children
  var next

  if (
    children &&
    children.length !== 0 &&
    children[0].type === 'WhiteSpaceNode'
  ) {
    parent.children.splice(index, 0, children.shift())
    next = children[0]

    if (next && next.position && child.position) {
      child.position.start = next.position.start
    }
  }
}

},{"unist-util-visit-children":52}],22:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')

module.exports = modifyChildren(mergeAffixExceptions)

/* Merge a sentence into its previous sentence, when
 * the sentence starts with a comma. */
function mergeAffixExceptions(child, index, parent) {
  var children = child.children
  var node
  var position
  var value
  var previousChild

  if (!children || children.length === 0 || index === 0) {
    return
  }

  position = -1

  while (children[++position]) {
    node = children[position]

    if (node.type === 'WordNode') {
      return
    }

    if (node.type === 'SymbolNode' || node.type === 'PunctuationNode') {
      value = toString(node)

      if (value !== ',' && value !== ';') {
        return
      }

      previousChild = parent.children[index - 1]

      previousChild.children = previousChild.children.concat(children)

      /* Update position. */
      if (previousChild.position && child.position) {
        previousChild.position.end = child.position.end
      }

      parent.children.splice(index, 1)

      /* Next, iterate over the node *now* at the current
       * position. */
      return index
    }
  }
}

},{"nlcst-to-string":14,"unist-util-modify-children":50}],23:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')
var expressions = require('../expressions')

module.exports = modifyChildren(mergeAffixSymbol)

/* Closing or final punctuation, or terminal markers
 * that should still be included in the previous
 * sentence, even though they follow the sentence's
 * terminal marker. */
var AFFIX_SYMBOL = expressions.affixSymbol

/* Move certain punctuation following a terminal
 * marker (thus in the next sentence) to the
 * previous sentence. */
function mergeAffixSymbol(child, index, parent) {
  var children = child.children
  var first
  var second
  var prev

  if (children && children.length !== 0 && index !== 0) {
    first = children[0]
    second = children[1]
    prev = parent.children[index - 1]

    if (
      (first.type === 'SymbolNode' || first.type === 'PunctuationNode') &&
      AFFIX_SYMBOL.test(toString(first))
    ) {
      prev.children.push(children.shift())

      /* Update position. */
      if (first.position && prev.position) {
        prev.position.end = first.position.end
      }

      if (second && second.position && child.position) {
        child.position.start = second.position.start
      }

      /* Next, iterate over the previous node again. */
      return index - 1
    }
  }
}

},{"../expressions":16,"nlcst-to-string":14,"unist-util-modify-children":50}],24:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')

module.exports = modifyChildren(mergeFinalWordSymbol)

/* Merge certain punctuation marks into their
 * preceding words. */
function mergeFinalWordSymbol(child, index, parent) {
  var children
  var prev
  var next

  if (
    index !== 0 &&
    (child.type === 'SymbolNode' || child.type === 'PunctuationNode') &&
    toString(child) === '-'
  ) {
    children = parent.children

    prev = children[index - 1]
    next = children[index + 1]

    if (
      (!next || next.type !== 'WordNode') &&
      (prev && prev.type === 'WordNode')
    ) {
      /* Remove `child` from parent. */
      children.splice(index, 1)

      /* Add the punctuation mark at the end of the
       * previous node. */
      prev.children.push(child)

      /* Update position. */
      if (prev.position && child.position) {
        prev.position.end = child.position.end
      }

      /* Next, iterate over the node *now* at the
       * current position (which was the next node). */
      return index
    }
  }
}

},{"nlcst-to-string":14,"unist-util-modify-children":50}],25:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')
var expressions = require('../expressions')

module.exports = modifyChildren(mergeInitialDigitSentences)

/* Initial lowercase letter. */
var DIGIT = expressions.digitStart

/* Merge a sentence into its previous sentence, when
 * the sentence starts with a lower case letter. */
function mergeInitialDigitSentences(child, index, parent) {
  var children = child.children
  var siblings = parent.children
  var prev = siblings[index - 1]
  var head = children[0]

  if (prev && head && head.type === 'WordNode' && DIGIT.test(toString(head))) {
    prev.children = prev.children.concat(children)
    siblings.splice(index, 1)

    /* Update position. */
    if (prev.position && child.position) {
      prev.position.end = child.position.end
    }

    /* Next, iterate over the node *now* at
     * the current position. */
    return index
  }
}

},{"../expressions":16,"nlcst-to-string":14,"unist-util-modify-children":50}],26:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')
var expressions = require('../expressions')

module.exports = modifyChildren(mergeInitialLowerCaseLetterSentences)

/* Initial lowercase letter. */
var LOWER_INITIAL = expressions.lowerInitial

/* Merge a sentence into its previous sentence, when
 * the sentence starts with a lower case letter. */
function mergeInitialLowerCaseLetterSentences(child, index, parent) {
  var children = child.children
  var position
  var node
  var siblings
  var prev

  if (children && children.length !== 0 && index !== 0) {
    position = -1

    while (children[++position]) {
      node = children[position]

      if (node.type === 'WordNode') {
        if (!LOWER_INITIAL.test(toString(node))) {
          return
        }

        siblings = parent.children

        prev = siblings[index - 1]

        prev.children = prev.children.concat(children)

        siblings.splice(index, 1)

        /* Update position. */
        if (prev.position && child.position) {
          prev.position.end = child.position.end
        }

        /* Next, iterate over the node *now* at
         * the current position. */
        return index
      }

      if (node.type === 'SymbolNode' || node.type === 'PunctuationNode') {
        return
      }
    }
  }
}

},{"../expressions":16,"nlcst-to-string":14,"unist-util-modify-children":50}],27:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')

module.exports = modifyChildren(mergeInitialWordSymbol)

/* Merge certain punctuation marks into their
 * following words. */
function mergeInitialWordSymbol(child, index, parent) {
  var children
  var next

  if (
    (child.type !== 'SymbolNode' && child.type !== 'PunctuationNode') ||
    toString(child) !== '&'
  ) {
    return
  }

  children = parent.children

  next = children[index + 1]

  /* If either a previous word, or no following word,
   * exists, exit early. */
  if (
    (index !== 0 && children[index - 1].type === 'WordNode') ||
    !(next && next.type === 'WordNode')
  ) {
    return
  }

  /* Remove `child` from parent. */
  children.splice(index, 1)

  /* Add the punctuation mark at the start of the
   * next node. */
  next.children.unshift(child)

  /* Update position. */
  if (next.position && child.position) {
    next.position.start = child.position.start
  }

  /* Next, iterate over the node at the previous
   * position, as it's now adjacent to a following
   * word. */
  return index - 1
}

},{"nlcst-to-string":14,"unist-util-modify-children":50}],28:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')
var expressions = require('../expressions')

module.exports = modifyChildren(mergeInitialisms)

var NUMERICAL = expressions.numerical

/* Merge initialisms. */
function mergeInitialisms(child, index, parent) {
  var siblings
  var prev
  var children
  var length
  var position
  var otherChild
  var isAllDigits
  var value

  if (index !== 0 && toString(child) === '.') {
    siblings = parent.children

    prev = siblings[index - 1]
    children = prev.children

    length = children && children.length

    if (prev.type === 'WordNode' && length !== 1 && length % 2 !== 0) {
      position = length

      isAllDigits = true

      while (children[--position]) {
        otherChild = children[position]

        value = toString(otherChild)

        if (position % 2 === 0) {
          /* Initialisms consist of one
           * character values. */
          if (value.length > 1) {
            return
          }

          if (!NUMERICAL.test(value)) {
            isAllDigits = false
          }
        } else if (value !== '.') {
          if (position < length - 2) {
            break
          } else {
            return
          }
        }
      }

      if (!isAllDigits) {
        /* Remove `child` from parent. */
        siblings.splice(index, 1)

        /* Add child to the previous children. */
        children.push(child)

        /* Update position. */
        if (prev.position && child.position) {
          prev.position.end = child.position.end
        }

        /* Next, iterate over the node *now* at the current
         * position. */
        return index
      }
    }
  }
}

},{"../expressions":16,"nlcst-to-string":14,"unist-util-modify-children":50}],29:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')

module.exports = modifyChildren(mergeInnerWordSlash)

var C_SLASH = '/'

/* Merge words joined by certain punctuation marks. */
function mergeInnerWordSlash(child, index, parent) {
  var siblings = parent.children
  var prev
  var next
  var prevValue
  var nextValue
  var queue
  var tail
  var count

  prev = siblings[index - 1]
  next = siblings[index + 1]

  if (
    prev &&
    prev.type === 'WordNode' &&
    (child.type === 'SymbolNode' || child.type === 'PunctuationNode') &&
    toString(child) === C_SLASH
  ) {
    prevValue = toString(prev)
    tail = child
    queue = [child]
    count = 1

    if (next && next.type === 'WordNode') {
      nextValue = toString(next)
      tail = next
      queue = queue.concat(next.children)
      count++
    }

    if (prevValue.length < 3 && (!nextValue || nextValue.length < 3)) {
      /* Add all found tokens to `prev`s children. */
      prev.children = prev.children.concat(queue)

      siblings.splice(index, count)

      /* Update position. */
      if (prev.position && tail.position) {
        prev.position.end = tail.position.end
      }

      /* Next, iterate over the node *now* at the current
       * position. */
      return index
    }
  }
}

},{"nlcst-to-string":14,"unist-util-modify-children":50}],30:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')
var expressions = require('../expressions')

module.exports = modifyChildren(mergeInnerWordSymbol)

/* Symbols part of surrounding words. */
var INNER_WORD_SYMBOL = expressions.wordSymbolInner

/* Merge words joined by certain punctuation marks. */
function mergeInnerWordSymbol(child, index, parent) {
  var siblings
  var sibling
  var prev
  var last
  var position
  var tokens
  var queue

  if (
    index !== 0 &&
    (child.type === 'SymbolNode' || child.type === 'PunctuationNode')
  ) {
    siblings = parent.children
    prev = siblings[index - 1]

    if (prev && prev.type === 'WordNode') {
      position = index - 1

      tokens = []
      queue = []

      /* - If a token which is neither word nor
       *   inner word symbol is found, the loop
       *   is broken.
       * - If an inner word symbol is found,
       *   it's queued.
       * - If a word is found, it's queued (and
       *   the queue stored and emptied). */
      while (siblings[++position]) {
        sibling = siblings[position]

        if (sibling.type === 'WordNode') {
          tokens = tokens.concat(queue, sibling.children)

          queue = []
        } else if (
          (sibling.type === 'SymbolNode' ||
            sibling.type === 'PunctuationNode') &&
          INNER_WORD_SYMBOL.test(toString(sibling))
        ) {
          queue.push(sibling)
        } else {
          break
        }
      }

      if (tokens.length !== 0) {
        /* If there is a queue, remove its length
         * from `position`. */
        if (queue.length !== 0) {
          position -= queue.length
        }

        /* Remove every (one or more) inner-word punctuation
         * marks and children of words. */
        siblings.splice(index, position - index)

        /* Add all found tokens to `prev`s children. */
        prev.children = prev.children.concat(tokens)

        last = tokens[tokens.length - 1]

        /* Update position. */
        if (prev.position && last.position) {
          prev.position.end = last.position.end
        }

        /* Next, iterate over the node *now* at the current
         * position. */
        return index
      }
    }
  }
}

},{"../expressions":16,"nlcst-to-string":14,"unist-util-modify-children":50}],31:[function(require,module,exports){
'use strict'

var modifyChildren = require('unist-util-modify-children')

module.exports = modifyChildren(mergeNonWordSentences)

/* Merge a sentence into the following sentence, when
 * the sentence does not contain word tokens. */
function mergeNonWordSentences(child, index, parent) {
  var children = child.children
  var position = -1
  var prev
  var next

  while (children[++position]) {
    if (children[position].type === 'WordNode') {
      return
    }
  }

  prev = parent.children[index - 1]

  if (prev) {
    prev.children = prev.children.concat(children)

    /* Remove the child. */
    parent.children.splice(index, 1)

    /* Patch position. */
    if (prev.position && child.position) {
      prev.position.end = child.position.end
    }

    /* Next, iterate over the node *now* at
     * the current position (which was the
     * next node). */
    return index
  }

  next = parent.children[index + 1]

  if (next) {
    next.children = children.concat(next.children)

    /* Patch position. */
    if (next.position && child.position) {
      next.position.start = child.position.start
    }

    /* Remove the child. */
    parent.children.splice(index, 1)
  }
}

},{"unist-util-modify-children":50}],32:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')

module.exports = modifyChildren(mergePrefixExceptions)

/* Blacklist of full stop characters that should not
 * be treated as terminal sentence markers: A case-insensitive
 * abbreviation. */
var ABBREVIATION_PREFIX = new RegExp(
  '^(' +
    '[0-9]{1,3}|' +
    '[a-z]|' +
    /* Common Latin Abbreviations:
     * Based on: http://en.wikipedia.org/wiki/List_of_Latin_abbreviations
     * Where only the abbreviations written without joining full stops,
     * but with a final full stop, were extracted.
     *
     * circa, capitulus, confer, compare, centum weight, eadem, (et) alii,
     * et cetera, floruit, foliis, ibidem, idem, nemine && contradicente,
     * opere && citato, (per) cent, (per) procurationem, (pro) tempore,
     * sic erat scriptum, (et) sequentia, statim, videlicet. */
    'al|ca|cap|cca|cent|cf|cit|con|cp|cwt|ead|etc|ff|' +
    'fl|ibid|id|nem|op|pro|seq|sic|stat|tem|viz' +
    ')$'
)

/* Merge a sentence into its next sentence, when the
 * sentence ends with a certain word. */
function mergePrefixExceptions(child, index, parent) {
  var children = child.children
  var period
  var node
  var next

  if (children && children.length > 1) {
    period = children[children.length - 1]

    if (period && toString(period) === '.') {
      node = children[children.length - 2]

      if (
        node &&
        node.type === 'WordNode' &&
        ABBREVIATION_PREFIX.test(toString(node).toLowerCase())
      ) {
        /* Merge period into abbreviation. */
        node.children.push(period)
        children.pop()

        /* Update position. */
        if (period.position && node.position) {
          node.position.end = period.position.end
        }

        /* Merge sentences. */
        next = parent.children[index + 1]

        if (next) {
          child.children = children.concat(next.children)

          parent.children.splice(index + 1, 1)

          /* Update position. */
          if (next.position && child.position) {
            child.position.end = next.position.end
          }

          /* Next, iterate over the current node again. */
          return index - 1
        }
      }
    }
  }
}

},{"nlcst-to-string":14,"unist-util-modify-children":50}],33:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')
var visitChildren = require('unist-util-visit-children')
var expressions = require('../expressions')

module.exports = visitChildren(mergeRemainingFullStops)

/* Blacklist of full stop characters that should not
 * be treated as terminal sentence markers: A
 * case-insensitive abbreviation. */
var TERMINAL_MARKER = expressions.terminalMarker

/* Merge non-terminal-marker full stops into
 * the previous word (if available), or the next
 * word (if available). */
function mergeRemainingFullStops(child) {
  var children = child.children
  var position = children.length
  var hasFoundDelimiter = false
  var grandchild
  var prev
  var next
  var nextNext

  while (children[--position]) {
    grandchild = children[position]

    if (
      grandchild.type !== 'SymbolNode' &&
      grandchild.type !== 'PunctuationNode'
    ) {
      /* This is a sentence without terminal marker,
       * so we 'fool' the code to make it think we
       * have found one. */
      if (grandchild.type === 'WordNode') {
        hasFoundDelimiter = true
      }

      continue
    }

    /* Exit when this token is not a terminal marker. */
    if (!TERMINAL_MARKER.test(toString(grandchild))) {
      continue
    }

    /* Ignore the first terminal marker found
     * (starting at the end), as it should not
     * be merged. */
    if (!hasFoundDelimiter) {
      hasFoundDelimiter = true

      continue
    }

    /* Only merge a single full stop. */
    if (toString(grandchild) !== '.') {
      continue
    }

    prev = children[position - 1]
    next = children[position + 1]

    if (prev && prev.type === 'WordNode') {
      nextNext = children[position + 2]

      /* Continue when the full stop is followed by
       * a space and another full stop, such as:
       * `{.} .` */
      if (
        next &&
        nextNext &&
        next.type === 'WhiteSpaceNode' &&
        toString(nextNext) === '.'
      ) {
        continue
      }

      /* Remove `child` from parent. */
      children.splice(position, 1)

      /* Add the punctuation mark at the end of the
       * previous node. */
      prev.children.push(grandchild)

      /* Update position. */
      if (grandchild.position && prev.position) {
        prev.position.end = grandchild.position.end
      }

      position--
    } else if (next && next.type === 'WordNode') {
      /* Remove `child` from parent. */
      children.splice(position, 1)

      /* Add the punctuation mark at the start of
       * the next node. */
      next.children.unshift(grandchild)

      if (grandchild.position && next.position) {
        next.position.start = grandchild.position.start
      }
    }
  }
}

},{"../expressions":16,"nlcst-to-string":14,"unist-util-visit-children":52}],34:[function(require,module,exports){
'use strict'

var modifyChildren = require('unist-util-modify-children')

module.exports = modifyChildren(mergeFinalWordSymbol)

/* Merge multiple words. This merges the children of
 * adjacent words, something which should not occur
 * naturally by parse-latin, but might happen when
 * custom tokens were passed in. */
function mergeFinalWordSymbol(child, index, parent) {
  var siblings = parent.children
  var next

  if (child.type === 'WordNode') {
    next = siblings[index + 1]

    if (next && next.type === 'WordNode') {
      /* Remove `next` from parent. */
      siblings.splice(index + 1, 1)

      /* Add the punctuation mark at the end of the
       * previous node. */
      child.children = child.children.concat(next.children)

      /* Update position. */
      if (next.position && child.position) {
        child.position.end = next.position.end
      }

      /* Next, re-iterate the current node. */
      return index
    }
  }
}

},{"unist-util-modify-children":50}],35:[function(require,module,exports){
'use strict'

var visitChildren = require('unist-util-visit-children')

module.exports = visitChildren(patchPosition)

/* Patch the position on a parent node based on its first
 * and last child. */
function patchPosition(child, index, node) {
  var siblings = node.children

  if (!child.position) {
    return
  }

  if (
    index === 0 &&
    (!node.position || /* istanbul ignore next */ !node.position.start)
  ) {
    patch(node)
    node.position.start = child.position.start
  }

  if (index === siblings.length - 1 && (!node.position || !node.position.end)) {
    patch(node)
    node.position.end = child.position.end
  }
}

/* Add a `position` object when it does not yet exist
 * on `node`. */
function patch(node) {
  if (!node.position) {
    node.position = {}
  }
}

},{"unist-util-visit-children":52}],36:[function(require,module,exports){
'use strict'

var modifyChildren = require('unist-util-modify-children')

module.exports = modifyChildren(removeEmptyNodes)

/* Remove empty children. */
function removeEmptyNodes(child, index, parent) {
  if ('children' in child && child.children.length === 0) {
    parent.children.splice(index, 1)

    /* Next, iterate over the node *now* at
     * the current position (which was the
     * next node). */
    return index
  }
}

},{"unist-util-modify-children":50}],37:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')

module.exports = tokenizerFactory

/* Factory to create a tokenizer based on a given
 * `expression`. */
function tokenizerFactory(childType, expression) {
  return tokenizer

  /* A function that splits. */
  function tokenizer(node) {
    var children = []
    var tokens = node.children
    var type = node.type
    var length = tokens.length
    var index = -1
    var lastIndex = length - 1
    var start = 0
    var first
    var last
    var parent

    while (++index < length) {
      if (
        index === lastIndex ||
        (tokens[index].type === childType &&
          expression.test(toString(tokens[index])))
      ) {
        first = tokens[start]
        last = tokens[index]

        parent = {
          type: type,
          children: tokens.slice(start, index + 1)
        }

        if (first.position && last.position) {
          parent.position = {
            start: first.position.start,
            end: last.position.end
          }
        }

        children.push(parent)

        start = index + 1
      }
    }

    return children
  }
}

},{"nlcst-to-string":14}],38:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":39}],39:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],40:[function(require,module,exports){
'use strict';

var path = require('path');

function replaceExt(npath, ext) {
  if (typeof npath !== 'string') {
    return npath;
  }

  if (npath.length === 0) {
    return npath;
  }

  var nFileName = path.basename(npath, path.extname(npath)) + ext;
  return path.join(path.dirname(npath), nFileName);
}

module.exports = replaceExt;

},{"path":38}],41:[function(require,module,exports){
'use strict'

var affixEmoticonModifier = require('nlcst-affix-emoticon-modifier')
var emoticonModifier = require('nlcst-emoticon-modifier')
var emojiModifier = require('nlcst-emoji-modifier')
var emoticons = require('emoticon')
var toString = require('nlcst-to-string')
var gemoji = require('gemoji')
var visit = require('unist-util-visit')

module.exports = emoji

var type = 'EmoticonNode'

// Map of visitors.
var fns = {
  encode: toEmoji,
  decode: toGemoji
}

var unicodes = gemoji.unicode
var names = gemoji.name

var shortcodes = {}

init()

function emoji(options) {
  var Parser = this.Parser
  var proto = Parser.prototype
  var convert = (options || {}).convert
  var fn

  proto.useFirst('tokenizeSentence', emoticonModifier)
  proto.useFirst('tokenizeSentence', emojiModifier)
  proto.useFirst('tokenizeParagraph', affixEmoticonModifier)

  if (convert !== null && convert !== undefined) {
    fn = fns[convert]

    if (!fn) {
      throw new TypeError(
        'Illegal invocation: `' +
          convert +
          '` is not a valid value for ' +
          '`options.convert` in `retext#use(emoji, options)`'
      )
    }
  }

  return transformer

  function transformer(node) {
    visit(node, type, visitor)
  }

  function visitor(node) {
    var data = node.data
    var value = toString(node)
    var info

    if (fn) {
      fn(node)
    }

    info = unicodes[value] || shortcodes[value] || emoticons[value]

    if (!data) {
      data = {}
      node.data = data
    }

    data.names = info.names.concat()
    data.description = info.description
    data.tags = info.tags.concat()
  }
}

// Replace a unicode emoji with a short-code.
function toGemoji(node) {
  var value = toString(node)
  var info = (unicodes[value] || emoticons[value] || {}).shortcode

  if (info) {
    node.value = info
  }
}

// Replace a short-code with a unicode emoji.
function toEmoji(node) {
  var value = toString(node)
  var info = (shortcodes[value] || emoticons[value] || {}).emoji

  if (info) {
    node.value = info
  }
}

function init() {
  var key
  var shortcode
  var result = {}
  var length = emoticons.length
  var index = -1
  var count
  var offset
  var subset
  var name

  for (key in names) {
    shortcode = ':' + key + ':'
    shortcodes[shortcode] = names[key]
    shortcodes[shortcode].shortcode = shortcode
  }

  while (++index < length) {
    name = emoticons[index].name
    subset = emoticons[index].emoticons
    count = subset.length
    offset = -1

    while (++offset < count) {
      result[subset[offset]] = names[name]
    }
  }

  emoticons = result
}

},{"emoticon":4,"gemoji":7,"nlcst-affix-emoticon-modifier":11,"nlcst-emoji-modifier":12,"nlcst-emoticon-modifier":13,"nlcst-to-string":14,"unist-util-visit":54}],42:[function(require,module,exports){
'use strict'

var unherit = require('unherit')
var Latin = require('parse-latin')

module.exports = parse
parse.Parser = Latin

function parse() {
  this.Parser = unherit(Latin)
}

},{"parse-latin":15,"unherit":47}],43:[function(require,module,exports){
'use strict'

var toString = require('nlcst-to-string')

module.exports = stringify

function stringify() {
  this.Compiler = compiler
}

function compiler(tree) {
  return toString(tree)
}

},{"nlcst-to-string":14}],44:[function(require,module,exports){
'use strict'

var unified = require('unified')
var latin = require('retext-latin')
var stringify = require('retext-stringify')

module.exports = unified()
  .use(latin)
  .use(stringify)
  .freeze()

},{"retext-latin":42,"retext-stringify":43,"unified":48}],45:[function(require,module,exports){
'use strict'

var wrap = require('./wrap.js')

module.exports = trough

trough.wrap = wrap

var slice = [].slice

/* Create new middleware. */
function trough() {
  var fns = []
  var middleware = {}

  middleware.run = run
  middleware.use = use

  return middleware

  /* Run `fns`.  Last argument must be
   * a completion handler. */
  function run() {
    var index = -1
    var input = slice.call(arguments, 0, -1)
    var done = arguments[arguments.length - 1]

    if (typeof done !== 'function') {
      throw new Error('Expected function as last argument, not ' + done)
    }

    next.apply(null, [null].concat(input))

    /* Run the next `fn`, if any. */
    function next(err) {
      var fn = fns[++index]
      var params = slice.call(arguments, 0)
      var values = params.slice(1)
      var length = input.length
      var pos = -1

      if (err) {
        done(err)
        return
      }

      /* Copy non-nully input into values. */
      while (++pos < length) {
        if (values[pos] === null || values[pos] === undefined) {
          values[pos] = input[pos]
        }
      }

      input = values

      /* Next or done. */
      if (fn) {
        wrap(fn, next).apply(null, input)
      } else {
        done.apply(null, [null].concat(input))
      }
    }
  }

  /* Add `fn` to the list. */
  function use(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Expected `fn` to be a function, not ' + fn)
    }

    fns.push(fn)

    return middleware
  }
}

},{"./wrap.js":46}],46:[function(require,module,exports){
'use strict'

var slice = [].slice

module.exports = wrap

/* Wrap `fn`.  Can be sync or async; return a promise,
 * receive a completion handler, return new values and
 * errors. */
function wrap(fn, callback) {
  var invoked

  return wrapped

  function wrapped() {
    var params = slice.call(arguments, 0)
    var callback = fn.length > params.length
    var result

    if (callback) {
      params.push(done)
    }

    try {
      result = fn.apply(null, params)
    } catch (err) {
      /* Well, this is quite the pickle.  `fn` received
       * a callback and invoked it (thus continuing the
       * pipeline), but later also threw an error.
       * We’re not about to restart the pipeline again,
       * so the only thing left to do is to throw the
       * thing instea. */
      if (callback && invoked) {
        throw err
      }

      return done(err)
    }

    if (!callback) {
      if (result && typeof result.then === 'function') {
        result.then(then, done)
      } else if (result instanceof Error) {
        done(result)
      } else {
        then(result)
      }
    }
  }

  /* Invoke `next`, only once. */
  function done() {
    if (!invoked) {
      invoked = true

      callback.apply(null, arguments)
    }
  }

  /* Invoke `done` with one value.
   * Tracks if an error is passed, too. */
  function then(value) {
    done(null, value)
  }
}

},{}],47:[function(require,module,exports){
'use strict'

var xtend = require('xtend')
var inherits = require('inherits')

module.exports = unherit

/* Create a custom constructor which can be modified
 * without affecting the original class. */
function unherit(Super) {
  var result
  var key
  var value

  inherits(Of, Super)
  inherits(From, Of)

  /* Clone values. */
  result = Of.prototype

  for (key in result) {
    value = result[key]

    if (value && typeof value === 'object') {
      result[key] = 'concat' in value ? value.concat() : xtend(value)
    }
  }

  return Of

  /* Constructor accepting a single argument,
   * which itself is an `arguments` object. */
  function From(parameters) {
    return Super.apply(this, parameters)
  }

  /* Constructor accepting variadic arguments. */
  function Of() {
    if (!(this instanceof Of)) {
      return new From(arguments)
    }

    return Super.apply(this, arguments)
  }
}

},{"inherits":8,"xtend":59}],48:[function(require,module,exports){
'use strict'

var extend = require('extend')
var bail = require('bail')
var vfile = require('vfile')
var trough = require('trough')
var string = require('x-is-string')
var plain = require('is-plain-obj')

// Expose a frozen processor.
module.exports = unified().freeze()

var slice = [].slice
var own = {}.hasOwnProperty

// Process pipeline.
var pipeline = trough()
  .use(pipelineParse)
  .use(pipelineRun)
  .use(pipelineStringify)

function pipelineParse(p, ctx) {
  ctx.tree = p.parse(ctx.file)
}

function pipelineRun(p, ctx, next) {
  p.run(ctx.tree, ctx.file, done)

  function done(err, tree, file) {
    if (err) {
      next(err)
    } else {
      ctx.tree = tree
      ctx.file = file
      next()
    }
  }
}

function pipelineStringify(p, ctx) {
  ctx.file.contents = p.stringify(ctx.tree, ctx.file)
}

// Function to create the first processor.
function unified() {
  var attachers = []
  var transformers = trough()
  var namespace = {}
  var frozen = false
  var freezeIndex = -1

  // Data management.
  processor.data = data

  // Lock.
  processor.freeze = freeze

  // Plugins.
  processor.attachers = attachers
  processor.use = use

  // API.
  processor.parse = parse
  processor.stringify = stringify
  processor.run = run
  processor.runSync = runSync
  processor.process = process
  processor.processSync = processSync

  // Expose.
  return processor

  // Create a new processor based on the processor in the current scope.
  function processor() {
    var destination = unified()
    var length = attachers.length
    var index = -1

    while (++index < length) {
      destination.use.apply(null, attachers[index])
    }

    destination.data(extend(true, {}, namespace))

    return destination
  }

  // Freeze: used to signal a processor that has finished configuration.
  //
  // For example, take unified itself.  It’s frozen.  Plugins should not be
  // added to it.  Rather, it should be extended, by invoking it, before
  // modifying it.
  //
  // In essence, always invoke this when exporting a processor.
  function freeze() {
    var values
    var plugin
    var options
    var transformer

    if (frozen) {
      return processor
    }

    while (++freezeIndex < attachers.length) {
      values = attachers[freezeIndex]
      plugin = values[0]
      options = values[1]
      transformer = null

      if (options === false) {
        continue
      }

      if (options === true) {
        values[1] = undefined
      }

      transformer = plugin.apply(processor, values.slice(1))

      if (typeof transformer === 'function') {
        transformers.use(transformer)
      }
    }

    frozen = true
    freezeIndex = Infinity

    return processor
  }

  // Data management.  Getter / setter for processor-specific informtion.
  function data(key, value) {
    if (string(key)) {
      // Set `key`.
      if (arguments.length === 2) {
        assertUnfrozen('data', frozen)

        namespace[key] = value

        return processor
      }

      // Get `key`.
      return (own.call(namespace, key) && namespace[key]) || null
    }

    // Set space.
    if (key) {
      assertUnfrozen('data', frozen)
      namespace = key
      return processor
    }

    // Get space.
    return namespace
  }

  // Plugin management.
  //
  // Pass it:
  // *   an attacher and options,
  // *   a preset,
  // *   a list of presets, attachers, and arguments (list of attachers and
  //     options).
  function use(value) {
    var settings

    assertUnfrozen('use', frozen)

    if (value === null || value === undefined) {
      // Empty.
    } else if (typeof value === 'function') {
      addPlugin.apply(null, arguments)
    } else if (typeof value === 'object') {
      if ('length' in value) {
        addList(value)
      } else {
        addPreset(value)
      }
    } else {
      throw new Error('Expected usable value, not `' + value + '`')
    }

    if (settings) {
      namespace.settings = extend(namespace.settings || {}, settings)
    }

    return processor

    function addPreset(result) {
      addList(result.plugins)

      if (result.settings) {
        settings = extend(settings || {}, result.settings)
      }
    }

    function add(value) {
      if (typeof value === 'function') {
        addPlugin(value)
      } else if (typeof value === 'object') {
        if ('length' in value) {
          addPlugin.apply(null, value)
        } else {
          addPreset(value)
        }
      } else {
        throw new Error('Expected usable value, not `' + value + '`')
      }
    }

    function addList(plugins) {
      var length
      var index

      if (plugins === null || plugins === undefined) {
        // Empty.
      } else if (typeof plugins === 'object' && 'length' in plugins) {
        length = plugins.length
        index = -1

        while (++index < length) {
          add(plugins[index])
        }
      } else {
        throw new Error('Expected a list of plugins, not `' + plugins + '`')
      }
    }

    function addPlugin(plugin, value) {
      var entry = find(plugin)

      if (entry) {
        if (plain(entry[1]) && plain(value)) {
          value = extend(entry[1], value)
        }

        entry[1] = value
      } else {
        attachers.push(slice.call(arguments))
      }
    }
  }

  function find(plugin) {
    var length = attachers.length
    var index = -1
    var entry

    while (++index < length) {
      entry = attachers[index]

      if (entry[0] === plugin) {
        return entry
      }
    }
  }

  // Parse a file (in string or vfile representation) into a unist node using
  // the `Parser` on the processor.
  function parse(doc) {
    var file = vfile(doc)
    var Parser

    freeze()
    Parser = processor.Parser
    assertParser('parse', Parser)

    if (newable(Parser)) {
      return new Parser(String(file), file).parse()
    }

    return Parser(String(file), file) // eslint-disable-line new-cap
  }

  // Run transforms on a unist node representation of a file (in string or
  // vfile representation), async.
  function run(node, file, cb) {
    assertNode(node)
    freeze()

    if (!cb && typeof file === 'function') {
      cb = file
      file = null
    }

    if (!cb) {
      return new Promise(executor)
    }

    executor(null, cb)

    function executor(resolve, reject) {
      transformers.run(node, vfile(file), done)

      function done(err, tree, file) {
        tree = tree || node
        if (err) {
          reject(err)
        } else if (resolve) {
          resolve(tree)
        } else {
          cb(null, tree, file)
        }
      }
    }
  }

  // Run transforms on a unist node representation of a file (in string or
  // vfile representation), sync.
  function runSync(node, file) {
    var complete = false
    var result

    run(node, file, done)

    assertDone('runSync', 'run', complete)

    return result

    function done(err, tree) {
      complete = true
      bail(err)
      result = tree
    }
  }

  // Stringify a unist node representation of a file (in string or vfile
  // representation) into a string using the `Compiler` on the processor.
  function stringify(node, doc) {
    var file = vfile(doc)
    var Compiler

    freeze()
    Compiler = processor.Compiler
    assertCompiler('stringify', Compiler)
    assertNode(node)

    if (newable(Compiler)) {
      return new Compiler(node, file).compile()
    }

    return Compiler(node, file) // eslint-disable-line new-cap
  }

  // Parse a file (in string or vfile representation) into a unist node using
  // the `Parser` on the processor, then run transforms on that node, and
  // compile the resulting node using the `Compiler` on the processor, and
  // store that result on the vfile.
  function process(doc, cb) {
    freeze()
    assertParser('process', processor.Parser)
    assertCompiler('process', processor.Compiler)

    if (!cb) {
      return new Promise(executor)
    }

    executor(null, cb)

    function executor(resolve, reject) {
      var file = vfile(doc)

      pipeline.run(processor, {file: file}, done)

      function done(err) {
        if (err) {
          reject(err)
        } else if (resolve) {
          resolve(file)
        } else {
          cb(null, file)
        }
      }
    }
  }

  // Process the given document (in string or vfile representation), sync.
  function processSync(doc) {
    var complete = false
    var file

    freeze()
    assertParser('processSync', processor.Parser)
    assertCompiler('processSync', processor.Compiler)
    file = vfile(doc)

    process(file, done)

    assertDone('processSync', 'process', complete)

    return file

    function done(err) {
      complete = true
      bail(err)
    }
  }
}

// Check if `func` is a constructor.
function newable(value) {
  return typeof value === 'function' && keys(value.prototype)
}

// Check if `value` is an object with keys.
function keys(value) {
  var key
  for (key in value) {
    return true
  }
  return false
}

// Assert a parser is available.
function assertParser(name, Parser) {
  if (typeof Parser !== 'function') {
    throw new Error('Cannot `' + name + '` without `Parser`')
  }
}

// Assert a compiler is available.
function assertCompiler(name, Compiler) {
  if (typeof Compiler !== 'function') {
    throw new Error('Cannot `' + name + '` without `Compiler`')
  }
}

// Assert the processor is not frozen.
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      'Cannot invoke `' +
        name +
        '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.'
    )
  }
}

// Assert `node` is a unist node.
function assertNode(node) {
  if (!node || !string(node.type)) {
    throw new Error('Expected node, got `' + node + '`')
  }
}

// Assert that `complete` is `true`.
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      '`' + name + '` finished async. Use `' + asyncName + '` instead'
    )
  }
}

},{"bail":3,"extend":5,"is-plain-obj":10,"trough":45,"vfile":57,"x-is-string":58}],49:[function(require,module,exports){
'use strict'

/* eslint-disable max-params */

/* Expose. */
module.exports = is

/* Assert if `test` passes for `node`.
 * When a `parent` node is known the `index` of node */
function is(test, node, index, parent, context) {
  var hasParent = parent !== null && parent !== undefined
  var hasIndex = index !== null && index !== undefined
  var check = convert(test)

  if (
    hasIndex &&
    (typeof index !== 'number' || index < 0 || index === Infinity)
  ) {
    throw new Error('Expected positive finite index or child node')
  }

  if (hasParent && (!is(null, parent) || !parent.children)) {
    throw new Error('Expected parent node')
  }

  if (!node || !node.type || typeof node.type !== 'string') {
    return false
  }

  if (hasParent !== hasIndex) {
    throw new Error('Expected both parent and index')
  }

  return Boolean(check.call(context, node, index, parent))
}

function convert(test) {
  if (typeof test === 'string') {
    return typeFactory(test)
  }

  if (test === null || test === undefined) {
    return ok
  }

  if (typeof test === 'object') {
    return ('length' in test ? anyFactory : matchesFactory)(test)
  }

  if (typeof test === 'function') {
    return test
  }

  throw new Error('Expected function, string, or object as test')
}

function convertAll(tests) {
  var results = []
  var length = tests.length
  var index = -1

  while (++index < length) {
    results[index] = convert(tests[index])
  }

  return results
}

/* Utility assert each property in `test` is represented
 * in `node`, and each values are strictly equal. */
function matchesFactory(test) {
  return matches

  function matches(node) {
    var key

    for (key in test) {
      if (node[key] !== test[key]) {
        return false
      }
    }

    return true
  }
}

function anyFactory(tests) {
  var checks = convertAll(tests)
  var length = checks.length

  return matches

  function matches() {
    var index = -1

    while (++index < length) {
      if (checks[index].apply(this, arguments)) {
        return true
      }
    }

    return false
  }
}

/* Utility to convert a string into a function which checks
 * a given node’s type for said string. */
function typeFactory(test) {
  return type

  function type(node) {
    return Boolean(node && node.type === test)
  }
}

/* Utility to return true. */
function ok() {
  return true
}

},{}],50:[function(require,module,exports){
'use strict'

var iterate = require('array-iterate')

module.exports = modifierFactory

// Turn `callback` into a child-modifier accepting a parent.  See
// `array-iterate` for more info.
function modifierFactory(callback) {
  return iteratorFactory(wrapperFactory(callback))
}

// Turn `callback` into a `iterator' accepting a parent.
function iteratorFactory(callback) {
  return iterator

  function iterator(parent) {
    var children = parent && parent.children

    if (!children) {
      throw new Error('Missing children in `parent` for `modifier`')
    }

    return iterate(children, callback, parent)
  }
}

// Pass the context as the third argument to `callback`.
function wrapperFactory(callback) {
  return wrapper

  function wrapper(value, index) {
    return callback(value, index, this)
  }
}

},{"array-iterate":2}],51:[function(require,module,exports){
'use strict'

var own = {}.hasOwnProperty

module.exports = stringify

function stringify(value) {
  /* Nothing. */
  if (!value || typeof value !== 'object') {
    return null
  }

  /* Node. */
  if (own.call(value, 'position') || own.call(value, 'type')) {
    return position(value.position)
  }

  /* Position. */
  if (own.call(value, 'start') || own.call(value, 'end')) {
    return position(value)
  }

  /* Point. */
  if (own.call(value, 'line') || own.call(value, 'column')) {
    return point(value)
  }

  /* ? */
  return null
}

function point(point) {
  if (!point || typeof point !== 'object') {
    point = {}
  }

  return index(point.line) + ':' + index(point.column)
}

function position(pos) {
  if (!pos || typeof pos !== 'object') {
    pos = {}
  }

  return point(pos.start) + '-' + point(pos.end)
}

function index(value) {
  return value && typeof value === 'number' ? value : 1
}

},{}],52:[function(require,module,exports){
'use strict'

/* Expose. */
module.exports = visitorFactory

/* Turns `callback` into a child-visitor accepting a parent. */
function visitorFactory(callback) {
  return visitor

  /* Visit `parent`, invoking `callback` for each child. */
  function visitor(parent) {
    var index = -1
    var children = parent && parent.children

    if (!children) {
      throw new Error('Missing children in `parent` for `visitor`')
    }

    while (++index in children) {
      callback(children[index], index, parent)
    }
  }
}

},{}],53:[function(require,module,exports){
'use strict'

module.exports = visitParents

var is = require('unist-util-is')

var CONTINUE = true
var SKIP = 'skip'
var EXIT = false

visitParents.CONTINUE = CONTINUE
visitParents.SKIP = SKIP
visitParents.EXIT = EXIT

function visitParents(tree, test, visitor, reverse) {
  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor
    visitor = test
    test = null
  }

  one(tree, null, [])

  // Visit a single node.
  function one(node, index, parents) {
    var result

    if (!test || is(test, node, index, parents[parents.length - 1] || null)) {
      result = visitor(node, parents)

      if (result === EXIT) {
        return result
      }
    }

    if (node.children && result !== SKIP) {
      return all(node.children, parents.concat(node)) === EXIT ? EXIT : result
    }

    return result
  }

  // Visit children in `parent`.
  function all(children, parents) {
    var min = -1
    var step = reverse ? -1 : 1
    var index = (reverse ? children.length : min) + step
    var child
    var result

    while (index > min && index < children.length) {
      child = children[index]
      result = child && one(child, index, parents)

      if (result === EXIT) {
        return result
      }

      index = typeof result === 'number' ? result : index + step
    }
  }
}

},{"unist-util-is":49}],54:[function(require,module,exports){
'use strict'

module.exports = visit

var visitParents = require('unist-util-visit-parents')

var CONTINUE = visitParents.CONTINUE
var SKIP = visitParents.SKIP
var EXIT = visitParents.EXIT

visit.CONTINUE = CONTINUE
visit.SKIP = SKIP
visit.EXIT = EXIT

function visit(tree, test, visitor, reverse) {
  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor
    visitor = test
    test = null
  }

  visitParents(tree, test, overload, reverse)

  function overload(node, parents) {
    var parent = parents[parents.length - 1]
    var index = parent ? parent.children.indexOf(node) : null
    return visitor(node, index, parent)
  }
}

},{"unist-util-visit-parents":53}],55:[function(require,module,exports){
'use strict'

var stringify = require('unist-util-stringify-position')

module.exports = VMessage

// Inherit from `Error#`.
function VMessagePrototype() {}
VMessagePrototype.prototype = Error.prototype
VMessage.prototype = new VMessagePrototype()

// Message properties.
var proto = VMessage.prototype

proto.file = ''
proto.name = ''
proto.reason = ''
proto.message = ''
proto.stack = ''
proto.fatal = null
proto.column = null
proto.line = null

// Construct a new VMessage.
//
// Note: We cannot invoke `Error` on the created context, as that adds readonly
// `line` and `column` attributes on Safari 9, thus throwing and failing the
// data.
function VMessage(reason, position, origin) {
  var parts
  var range
  var location

  if (typeof position === 'string') {
    origin = position
    position = null
  }

  parts = parseOrigin(origin)
  range = stringify(position) || '1:1'

  location = {
    start: {line: null, column: null},
    end: {line: null, column: null}
  }

  // Node.
  if (position && position.position) {
    position = position.position
  }

  if (position) {
    // Position.
    if (position.start) {
      location = position
      position = position.start
    } else {
      // Point.
      location.start = position
    }
  }

  if (reason.stack) {
    this.stack = reason.stack
    reason = reason.message
  }

  this.message = reason
  this.name = range
  this.reason = reason
  this.line = position ? position.line : null
  this.column = position ? position.column : null
  this.location = location
  this.source = parts[0]
  this.ruleId = parts[1]
}

function parseOrigin(origin) {
  var result = [null, null]
  var index

  if (typeof origin === 'string') {
    index = origin.indexOf(':')

    if (index === -1) {
      result[1] = origin
    } else {
      result[0] = origin.slice(0, index)
      result[1] = origin.slice(index + 1)
    }
  }

  return result
}

},{"unist-util-stringify-position":51}],56:[function(require,module,exports){
(function (process){
'use strict'

var path = require('path')
var replace = require('replace-ext')
var buffer = require('is-buffer')

module.exports = VFile

var own = {}.hasOwnProperty
var proto = VFile.prototype

proto.toString = toString

// Order of setting (least specific to most), we need this because otherwise
// `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
// stem can be set.
var order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname']

// Construct a new file.
function VFile(options) {
  var prop
  var index
  var length

  if (!options) {
    options = {}
  } else if (typeof options === 'string' || buffer(options)) {
    options = {contents: options}
  } else if ('message' in options && 'messages' in options) {
    return options
  }

  if (!(this instanceof VFile)) {
    return new VFile(options)
  }

  this.data = {}
  this.messages = []
  this.history = []
  this.cwd = process.cwd()

  // Set path related properties in the correct order.
  index = -1
  length = order.length

  while (++index < length) {
    prop = order[index]

    if (own.call(options, prop)) {
      this[prop] = options[prop]
    }
  }

  // Set non-path related properties.
  for (prop in options) {
    if (order.indexOf(prop) === -1) {
      this[prop] = options[prop]
    }
  }
}

// Access full path (`~/index.min.js`).
Object.defineProperty(proto, 'path', {
  get: function() {
    return this.history[this.history.length - 1]
  },
  set: function(path) {
    assertNonEmpty(path, 'path')

    if (path !== this.path) {
      this.history.push(path)
    }
  }
})

// Access parent path (`~`).
Object.defineProperty(proto, 'dirname', {
  get: function() {
    return typeof this.path === 'string' ? path.dirname(this.path) : undefined
  },
  set: function(dirname) {
    assertPath(this.path, 'dirname')
    this.path = path.join(dirname || '', this.basename)
  }
})

// Access basename (`index.min.js`).
Object.defineProperty(proto, 'basename', {
  get: function() {
    return typeof this.path === 'string' ? path.basename(this.path) : undefined
  },
  set: function(basename) {
    assertNonEmpty(basename, 'basename')
    assertPart(basename, 'basename')
    this.path = path.join(this.dirname || '', basename)
  }
})

// Access extname (`.js`).
Object.defineProperty(proto, 'extname', {
  get: function() {
    return typeof this.path === 'string' ? path.extname(this.path) : undefined
  },
  set: function(extname) {
    var ext = extname || ''

    assertPart(ext, 'extname')
    assertPath(this.path, 'extname')

    if (ext) {
      if (ext.charAt(0) !== '.') {
        throw new Error('`extname` must start with `.`')
      }

      if (ext.indexOf('.', 1) !== -1) {
        throw new Error('`extname` cannot contain multiple dots')
      }
    }

    this.path = replace(this.path, ext)
  }
})

// Access stem (`index.min`).
Object.defineProperty(proto, 'stem', {
  get: function() {
    return typeof this.path === 'string'
      ? path.basename(this.path, this.extname)
      : undefined
  },
  set: function(stem) {
    assertNonEmpty(stem, 'stem')
    assertPart(stem, 'stem')
    this.path = path.join(this.dirname || '', stem + (this.extname || ''))
  }
})

// Get the value of the file.
function toString(encoding) {
  var value = this.contents || ''
  return buffer(value) ? value.toString(encoding) : String(value)
}

// Assert that `part` is not a path (i.e., does not contain `path.sep`).
function assertPart(part, name) {
  if (part.indexOf(path.sep) !== -1) {
    throw new Error(
      '`' + name + '` cannot be a path: did not expect `' + path.sep + '`'
    )
  }
}

// Assert that `part` is not empty.
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error('`' + name + '` cannot be empty')
  }
}

// Assert `path` exists.
function assertPath(path, name) {
  if (!path) {
    throw new Error('Setting `' + name + '` requires `path` to be set too')
  }
}

}).call(this,require('_process'))
},{"_process":39,"is-buffer":9,"path":38,"replace-ext":40}],57:[function(require,module,exports){
'use strict'

var VMessage = require('vfile-message')
var VFile = require('./core.js')

module.exports = VFile

var proto = VFile.prototype

proto.message = message
proto.info = info
proto.fail = fail

// Slight backwards compatibility.  Remove in the future.
proto.warn = message

// Create a message with `reason` at `position`.  When an error is passed in as
// `reason`, copies the stack.
function message(reason, position, origin) {
  var filePath = this.path
  var message = new VMessage(reason, position, origin)

  if (filePath) {
    message.name = filePath + ':' + message.name
    message.file = filePath
  }

  message.fatal = false

  this.messages.push(message)

  return message
}

// Fail.  Creates a vmessage, associates it with the file, and throws it.
function fail() {
  var message = this.message.apply(this, arguments)

  message.fatal = true

  throw message
}

// Info.  Creates a vmessage, associates it with the file, and marks the
// fatality as null.
function info() {
  var message = this.message.apply(this, arguments)

  message.fatal = null

  return message
}

},{"./core.js":56,"vfile-message":55}],58:[function(require,module,exports){
var toString = Object.prototype.toString

module.exports = isString

function isString(obj) {
    return toString.call(obj) === "[object String]"
}

},{}],59:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}]},{},[1]);
