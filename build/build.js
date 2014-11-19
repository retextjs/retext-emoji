/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("wooorm~gemoji@0.2.0", function (exports, module) {
'use strict';

/**
 * Data.
 */

var gemoji;

gemoji = require('wooorm~gemoji@0.2.0/data/gemoji.json');

/**
 * Cached methods.
 */

var has;

has = Object.prototype.hasOwnProperty;

/**
 * Create a dictionary to hold the emoji by name.
 */

var named;

named = {};

/**
 * Transform an emoji.
 *
 * @param {string} emoji - Unicode emoji to extend.
 */

function enhanceEmoji(emoji) {
    var information,
        names,
        index,
        length;

    information = gemoji[emoji];
    names = information.names;

    /**
     * Add the main `name`.
     */

    information.name = names[0];

    /**
     * Add the emoji to the object too.
     */

    information.emoji = emoji;

    /**
     * Add the main `name` to `named`.
     */

    named[names[0]] = information;

    /**
     * If the emoji is known by other names,
     * add those too to the map.
     */

    index = 0;
    length = names.length;

    while (++index < length) {
        named[names[index]] = information;
    }
}

/**
 * Transform all emoji.
 */

var emoji;

for (emoji in gemoji) {
    /* istanbul ignore else */
    if (has.call(gemoji, emoji)) {
        enhanceEmoji(emoji);
    }
}

/**
 * Expose the extended data (`gemoji`) as `unicode`.
 */

exports.unicode = gemoji;

/**
 * Expose the name-to-unicode dictionary (`named`) as `name`.
 */

exports.name = named;

});

require.define("wooorm~gemoji@0.2.0/data/gemoji.json", {
  "😄": {
    "description": "smiling face with open mouth and smiling eyes",
    "names": [
      "smile"
    ],
    "tags": [
      "happy",
      "joy",
      "pleased"
    ]
  },
  "😃": {
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
  "😀": {
    "description": "grinning face",
    "names": [
      "grinning"
    ],
    "tags": [
      "smile",
      "happy"
    ]
  },
  "😊": {
    "description": "smiling face with smiling eyes",
    "names": [
      "blush"
    ],
    "tags": [
      "proud"
    ]
  },
  "☺️": {
    "description": "white smiling face",
    "names": [
      "relaxed"
    ],
    "tags": [
      "blush",
      "pleased"
    ]
  },
  "😉": {
    "description": "winking face",
    "names": [
      "wink"
    ],
    "tags": [
      "flirt"
    ]
  },
  "😍": {
    "description": "smiling face with heart-shaped eyes",
    "names": [
      "heart_eyes"
    ],
    "tags": [
      "love",
      "crush"
    ]
  },
  "😘": {
    "description": "face throwing a kiss",
    "names": [
      "kissing_heart"
    ],
    "tags": [
      "flirt"
    ]
  },
  "😚": {
    "description": "kissing face with closed eyes",
    "names": [
      "kissing_closed_eyes"
    ],
    "tags": []
  },
  "😗": {
    "description": "kissing face",
    "names": [
      "kissing"
    ],
    "tags": []
  },
  "😙": {
    "description": "kissing face with smiling eyes",
    "names": [
      "kissing_smiling_eyes"
    ],
    "tags": []
  },
  "😜": {
    "description": "face with stuck-out tongue and winking eye",
    "names": [
      "stuck_out_tongue_winking_eye"
    ],
    "tags": [
      "prank",
      "silly"
    ]
  },
  "😝": {
    "description": "face with stuck-out tongue and tightly-closed eyes",
    "names": [
      "stuck_out_tongue_closed_eyes"
    ],
    "tags": [
      "prank"
    ]
  },
  "😛": {
    "description": "face with stuck-out tongue",
    "names": [
      "stuck_out_tongue"
    ],
    "tags": []
  },
  "😳": {
    "description": "flushed face",
    "names": [
      "flushed"
    ],
    "tags": []
  },
  "😁": {
    "description": "grinning face with smiling eyes",
    "names": [
      "grin"
    ],
    "tags": []
  },
  "😔": {
    "description": "pensive face",
    "names": [
      "pensive"
    ],
    "tags": []
  },
  "😌": {
    "description": "relieved face",
    "names": [
      "relieved"
    ],
    "tags": [
      "whew"
    ]
  },
  "😒": {
    "description": "unamused face",
    "names": [
      "unamused"
    ],
    "tags": [
      "meh"
    ]
  },
  "😞": {
    "description": "disappointed face",
    "names": [
      "disappointed"
    ],
    "tags": [
      "sad"
    ]
  },
  "😣": {
    "description": "persevering face",
    "names": [
      "persevere"
    ],
    "tags": [
      "struggling"
    ]
  },
  "😢": {
    "description": "crying face",
    "names": [
      "cry"
    ],
    "tags": [
      "sad",
      "tear"
    ]
  },
  "😂": {
    "description": "face with tears of joy",
    "names": [
      "joy"
    ],
    "tags": [
      "tears"
    ]
  },
  "😭": {
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
  "😪": {
    "description": "sleepy face",
    "names": [
      "sleepy"
    ],
    "tags": [
      "tired"
    ]
  },
  "😥": {
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
  "😰": {
    "description": "face with open mouth and cold sweat",
    "names": [
      "cold_sweat"
    ],
    "tags": [
      "nervous"
    ]
  },
  "😅": {
    "description": "smiling face with open mouth and cold sweat",
    "names": [
      "sweat_smile"
    ],
    "tags": [
      "hot"
    ]
  },
  "😓": {
    "description": "face with cold sweat",
    "names": [
      "sweat"
    ],
    "tags": []
  },
  "😩": {
    "description": "weary face",
    "names": [
      "weary"
    ],
    "tags": [
      "tired"
    ]
  },
  "😫": {
    "description": "tired face",
    "names": [
      "tired_face"
    ],
    "tags": [
      "upset",
      "whine"
    ]
  },
  "😨": {
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
  "😱": {
    "description": "face screaming in fear",
    "names": [
      "scream"
    ],
    "tags": [
      "horror",
      "shocked"
    ]
  },
  "😠": {
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
    "description": "pouting face",
    "names": [
      "rage"
    ],
    "tags": [
      "angry"
    ]
  },
  "😤": {
    "description": "face with look of triumph",
    "names": [
      "triumph"
    ],
    "tags": [
      "smug"
    ]
  },
  "😖": {
    "description": "confounded face",
    "names": [
      "confounded"
    ],
    "tags": []
  },
  "😆": {
    "description": "smiling face with open mouth and tightly-closed eyes",
    "names": [
      "laughing",
      "satisfied"
    ],
    "tags": [
      "happy",
      "haha"
    ]
  },
  "😋": {
    "description": "face savouring delicious food",
    "names": [
      "yum"
    ],
    "tags": [
      "tongue",
      "lick"
    ]
  },
  "😷": {
    "description": "face with medical mask",
    "names": [
      "mask"
    ],
    "tags": [
      "sick",
      "ill"
    ]
  },
  "😎": {
    "description": "smiling face with sunglasses",
    "names": [
      "sunglasses"
    ],
    "tags": [
      "cool"
    ]
  },
  "😴": {
    "description": "sleeping face",
    "names": [
      "sleeping"
    ],
    "tags": [
      "zzz"
    ]
  },
  "😵": {
    "description": "dizzy face",
    "names": [
      "dizzy_face"
    ],
    "tags": []
  },
  "😲": {
    "description": "astonished face",
    "names": [
      "astonished"
    ],
    "tags": [
      "amazed",
      "gasp"
    ]
  },
  "😟": {
    "description": "worried face",
    "names": [
      "worried"
    ],
    "tags": [
      "nervous"
    ]
  },
  "😦": {
    "description": "frowning face with open mouth",
    "names": [
      "frowning"
    ],
    "tags": []
  },
  "😧": {
    "description": "anguished face",
    "names": [
      "anguished"
    ],
    "tags": [
      "stunned"
    ]
  },
  "😈": {
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
    "description": "imp",
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
  "😮": {
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
  "😬": {
    "description": "grimacing face",
    "names": [
      "grimacing"
    ],
    "tags": []
  },
  "😐": {
    "description": "neutral face",
    "names": [
      "neutral_face"
    ],
    "tags": [
      "meh"
    ]
  },
  "😕": {
    "description": "confused face",
    "names": [
      "confused"
    ],
    "tags": []
  },
  "😯": {
    "description": "hushed face",
    "names": [
      "hushed"
    ],
    "tags": [
      "silence",
      "speechless"
    ]
  },
  "😶": {
    "description": "face without mouth",
    "names": [
      "no_mouth"
    ],
    "tags": [
      "mute",
      "silence"
    ]
  },
  "😇": {
    "description": "smiling face with halo",
    "names": [
      "innocent"
    ],
    "tags": [
      "angel"
    ]
  },
  "😏": {
    "description": "smirking face",
    "names": [
      "smirk"
    ],
    "tags": [
      "smug"
    ]
  },
  "😑": {
    "description": "expressionless face",
    "names": [
      "expressionless"
    ],
    "tags": []
  },
  "👲": {
    "description": "man with gua pi mao",
    "names": [
      "man_with_gua_pi_mao"
    ],
    "tags": []
  },
  "👳": {
    "description": "man with turban",
    "names": [
      "man_with_turban"
    ],
    "tags": []
  },
  "👮": {
    "description": "police officer",
    "names": [
      "cop"
    ],
    "tags": [
      "police",
      "law"
    ]
  },
  "👷": {
    "description": "construction worker",
    "names": [
      "construction_worker"
    ],
    "tags": [
      "helmet"
    ]
  },
  "💂": {
    "description": "guardsman",
    "names": [
      "guardsman"
    ],
    "tags": []
  },
  "👶": {
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
    "description": "boy",
    "names": [
      "boy"
    ],
    "tags": [
      "child"
    ]
  },
  "👧": {
    "description": "girl",
    "names": [
      "girl"
    ],
    "tags": [
      "child"
    ]
  },
  "👨": {
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
    "description": "woman",
    "names": [
      "woman"
    ],
    "tags": [
      "girls"
    ]
  },
  "👴": {
    "description": "older man",
    "names": [
      "older_man"
    ],
    "tags": []
  },
  "👵": {
    "description": "older woman",
    "names": [
      "older_woman"
    ],
    "tags": []
  },
  "👱": {
    "description": "person with blond hair",
    "names": [
      "person_with_blond_hair"
    ],
    "tags": [
      "boy"
    ]
  },
  "👼": {
    "description": "baby angel",
    "names": [
      "angel"
    ],
    "tags": []
  },
  "👸": {
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
  "😺": {
    "description": "smiling cat face with open mouth",
    "names": [
      "smiley_cat"
    ],
    "tags": []
  },
  "😸": {
    "description": "grinning cat face with smiling eyes",
    "names": [
      "smile_cat"
    ],
    "tags": []
  },
  "😻": {
    "description": "smiling cat face with heart-shaped eyes",
    "names": [
      "heart_eyes_cat"
    ],
    "tags": []
  },
  "😽": {
    "description": "kissing cat face with closed eyes",
    "names": [
      "kissing_cat"
    ],
    "tags": []
  },
  "😼": {
    "description": "cat face with wry smile",
    "names": [
      "smirk_cat"
    ],
    "tags": []
  },
  "🙀": {
    "description": "weary cat face",
    "names": [
      "scream_cat"
    ],
    "tags": [
      "horror"
    ]
  },
  "😿": {
    "description": "crying cat face",
    "names": [
      "crying_cat_face"
    ],
    "tags": [
      "sad",
      "tear"
    ]
  },
  "😹": {
    "description": "cat face with tears of joy",
    "names": [
      "joy_cat"
    ],
    "tags": []
  },
  "😾": {
    "description": "pouting cat face",
    "names": [
      "pouting_cat"
    ],
    "tags": []
  },
  "👹": {
    "description": "japanese ogre",
    "names": [
      "japanese_ogre"
    ],
    "tags": [
      "monster"
    ]
  },
  "👺": {
    "description": "japanese goblin",
    "names": [
      "japanese_goblin"
    ],
    "tags": []
  },
  "🙈": {
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
  "💀": {
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
  "👽": {
    "description": "extraterrestrial alien",
    "names": [
      "alien"
    ],
    "tags": [
      "ufo"
    ]
  },
  "💩": {
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
  "🔥": {
    "description": "fire",
    "names": [
      "fire"
    ],
    "tags": [
      "burn"
    ]
  },
  "✨": {
    "description": "sparkles",
    "names": [
      "sparkles"
    ],
    "tags": [
      "shiny"
    ]
  },
  "🌟": {
    "description": "glowing star",
    "names": [
      "star2"
    ],
    "tags": []
  },
  "💫": {
    "description": "dizzy symbol",
    "names": [
      "dizzy"
    ],
    "tags": [
      "star"
    ]
  },
  "💥": {
    "description": "collision symbol",
    "names": [
      "boom",
      "collision"
    ],
    "tags": [
      "explode"
    ]
  },
  "💢": {
    "description": "anger symbol",
    "names": [
      "anger"
    ],
    "tags": [
      "angry"
    ]
  },
  "💦": {
    "description": "splashing sweat symbol",
    "names": [
      "sweat_drops"
    ],
    "tags": [
      "water",
      "workout"
    ]
  },
  "💧": {
    "description": "droplet",
    "names": [
      "droplet"
    ],
    "tags": [
      "water"
    ]
  },
  "💤": {
    "description": "sleeping symbol",
    "names": [
      "zzz"
    ],
    "tags": [
      "sleeping"
    ]
  },
  "💨": {
    "description": "dash symbol",
    "names": [
      "dash"
    ],
    "tags": [
      "wind",
      "blow",
      "fast"
    ]
  },
  "👂": {
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
  "👀": {
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
  "👃": {
    "description": "nose",
    "names": [
      "nose"
    ],
    "tags": [
      "smell"
    ]
  },
  "👅": {
    "description": "tongue",
    "names": [
      "tongue"
    ],
    "tags": [
      "taste"
    ]
  },
  "👄": {
    "description": "mouth",
    "names": [
      "lips"
    ],
    "tags": [
      "kiss"
    ]
  },
  "👍": {
    "description": "thumbs up sign",
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
    "description": "thumbs down sign",
    "names": [
      "-1",
      "thumbsdown"
    ],
    "tags": [
      "disapprove",
      "bury"
    ]
  },
  "👌": {
    "description": "ok hand sign",
    "names": [
      "ok_hand"
    ],
    "tags": []
  },
  "👊": {
    "description": "fisted hand sign",
    "names": [
      "facepunch",
      "punch"
    ],
    "tags": [
      "attack"
    ]
  },
  "✊": {
    "description": "raised fist",
    "names": [
      "fist"
    ],
    "tags": [
      "power"
    ]
  },
  "✌️": {
    "description": "victory hand",
    "names": [
      "v"
    ],
    "tags": [
      "victory",
      "peace"
    ]
  },
  "👋": {
    "description": "waving hand sign",
    "names": [
      "wave"
    ],
    "tags": [
      "goodbye"
    ]
  },
  "✋": {
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
  "👐": {
    "description": "open hands sign",
    "names": [
      "open_hands"
    ],
    "tags": []
  },
  "👆": {
    "description": "white up pointing backhand index",
    "names": [
      "point_up_2"
    ],
    "tags": []
  },
  "👇": {
    "description": "white down pointing backhand index",
    "names": [
      "point_down"
    ],
    "tags": []
  },
  "👉": {
    "description": "white right pointing backhand index",
    "names": [
      "point_right"
    ],
    "tags": []
  },
  "👈": {
    "description": "white left pointing backhand index",
    "names": [
      "point_left"
    ],
    "tags": []
  },
  "🙌": {
    "description": "person raising both hands in celebration",
    "names": [
      "raised_hands"
    ],
    "tags": [
      "hooray"
    ]
  },
  "🙏": {
    "description": "person with folded hands",
    "names": [
      "pray"
    ],
    "tags": [
      "please",
      "hope",
      "wish"
    ]
  },
  "☝️": {
    "description": "white up pointing index",
    "names": [
      "point_up"
    ],
    "tags": []
  },
  "👏": {
    "description": "clapping hands sign",
    "names": [
      "clap"
    ],
    "tags": [
      "praise",
      "applause"
    ]
  },
  "💪": {
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
  "🚶": {
    "description": "pedestrian",
    "names": [
      "walking"
    ],
    "tags": []
  },
  "🏃": {
    "description": "runner",
    "names": [
      "runner",
      "running"
    ],
    "tags": [
      "exercise",
      "workout",
      "marathon"
    ]
  },
  "💃": {
    "description": "dancer",
    "names": [
      "dancer"
    ],
    "tags": [
      "dress"
    ]
  },
  "👫": {
    "description": "man and woman holding hands",
    "names": [
      "couple"
    ],
    "tags": [
      "date"
    ]
  },
  "👪": {
    "description": "family",
    "names": [
      "family"
    ],
    "tags": [
      "home",
      "parents",
      "child"
    ]
  },
  "👬": {
    "description": "two men holding hands",
    "names": [
      "two_men_holding_hands"
    ],
    "tags": [
      "couple",
      "date"
    ]
  },
  "👭": {
    "description": "two women holding hands",
    "names": [
      "two_women_holding_hands"
    ],
    "tags": [
      "couple",
      "date"
    ]
  },
  "💏": {
    "description": "kiss",
    "names": [
      "couplekiss"
    ],
    "tags": []
  },
  "💑": {
    "description": "couple with heart",
    "names": [
      "couple_with_heart"
    ],
    "tags": []
  },
  "👯": {
    "description": "woman with bunny ears",
    "names": [
      "dancers"
    ],
    "tags": [
      "bunny"
    ]
  },
  "🙆": {
    "description": "face with ok gesture",
    "names": [
      "ok_woman"
    ],
    "tags": []
  },
  "🙅": {
    "description": "face with no good gesture",
    "names": [
      "no_good"
    ],
    "tags": [
      "stop",
      "halt"
    ]
  },
  "💁": {
    "description": "information desk person",
    "names": [
      "information_desk_person"
    ],
    "tags": []
  },
  "🙋": {
    "description": "happy person raising one hand",
    "names": [
      "raising_hand"
    ],
    "tags": []
  },
  "💆": {
    "description": "face massage",
    "names": [
      "massage"
    ],
    "tags": [
      "spa"
    ]
  },
  "💇": {
    "description": "haircut",
    "names": [
      "haircut"
    ],
    "tags": [
      "beauty"
    ]
  },
  "💅": {
    "description": "nail polish",
    "names": [
      "nail_care"
    ],
    "tags": [
      "beauty",
      "manicure"
    ]
  },
  "👰": {
    "description": "bride with veil",
    "names": [
      "bride_with_veil"
    ],
    "tags": [
      "marriage",
      "wedding"
    ]
  },
  "🙎": {
    "description": "person with pouting face",
    "names": [
      "person_with_pouting_face"
    ],
    "tags": []
  },
  "🙍": {
    "description": "person frowning",
    "names": [
      "person_frowning"
    ],
    "tags": [
      "sad"
    ]
  },
  "🙇": {
    "description": "person bowing deeply",
    "names": [
      "bow"
    ],
    "tags": [
      "respect",
      "thanks"
    ]
  },
  "🎩": {
    "description": "top hat",
    "names": [
      "tophat"
    ],
    "tags": [
      "hat",
      "classy"
    ]
  },
  "👑": {
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
  "👒": {
    "description": "womans hat",
    "names": [
      "womans_hat"
    ],
    "tags": []
  },
  "👟": {
    "description": "athletic shoe",
    "names": [
      "athletic_shoe"
    ],
    "tags": [
      "sneaker",
      "sport",
      "running"
    ]
  },
  "👞": {
    "description": "mans shoe",
    "names": [
      "mans_shoe",
      "shoe"
    ],
    "tags": []
  },
  "👡": {
    "description": "womans sandal",
    "names": [
      "sandal"
    ],
    "tags": [
      "shoe"
    ]
  },
  "👠": {
    "description": "high-heeled shoe",
    "names": [
      "high_heel"
    ],
    "tags": [
      "shoe"
    ]
  },
  "👢": {
    "description": "womans boots",
    "names": [
      "boot"
    ],
    "tags": []
  },
  "👕": {
    "description": "t-shirt",
    "names": [
      "shirt",
      "tshirt"
    ],
    "tags": []
  },
  "👔": {
    "description": "necktie",
    "names": [
      "necktie"
    ],
    "tags": [
      "shirt",
      "formal"
    ]
  },
  "👚": {
    "description": "womans clothes",
    "names": [
      "womans_clothes"
    ],
    "tags": []
  },
  "👗": {
    "description": "dress",
    "names": [
      "dress"
    ],
    "tags": []
  },
  "🎽": {
    "description": "running shirt with sash",
    "names": [
      "running_shirt_with_sash"
    ],
    "tags": [
      "marathon"
    ]
  },
  "👖": {
    "description": "jeans",
    "names": [
      "jeans"
    ],
    "tags": [
      "pants"
    ]
  },
  "👘": {
    "description": "kimono",
    "names": [
      "kimono"
    ],
    "tags": []
  },
  "👙": {
    "description": "bikini",
    "names": [
      "bikini"
    ],
    "tags": [
      "beach"
    ]
  },
  "💼": {
    "description": "briefcase",
    "names": [
      "briefcase"
    ],
    "tags": [
      "business"
    ]
  },
  "👜": {
    "description": "handbag",
    "names": [
      "handbag"
    ],
    "tags": [
      "bag"
    ]
  },
  "👝": {
    "description": "pouch",
    "names": [
      "pouch"
    ],
    "tags": [
      "bag"
    ]
  },
  "👛": {
    "description": "purse",
    "names": [
      "purse"
    ],
    "tags": []
  },
  "👓": {
    "description": "eyeglasses",
    "names": [
      "eyeglasses"
    ],
    "tags": [
      "glasses"
    ]
  },
  "🎀": {
    "description": "ribbon",
    "names": [
      "ribbon"
    ],
    "tags": []
  },
  "🌂": {
    "description": "closed umbrella",
    "names": [
      "closed_umbrella"
    ],
    "tags": [
      "weather",
      "rain"
    ]
  },
  "💄": {
    "description": "lipstick",
    "names": [
      "lipstick"
    ],
    "tags": [
      "makeup"
    ]
  },
  "💛": {
    "description": "yellow heart",
    "names": [
      "yellow_heart"
    ],
    "tags": []
  },
  "💙": {
    "description": "blue heart",
    "names": [
      "blue_heart"
    ],
    "tags": []
  },
  "💜": {
    "description": "purple heart",
    "names": [
      "purple_heart"
    ],
    "tags": []
  },
  "💚": {
    "description": "green heart",
    "names": [
      "green_heart"
    ],
    "tags": []
  },
  "❤️": {
    "description": "heavy black heart",
    "names": [
      "heart"
    ],
    "tags": [
      "love"
    ]
  },
  "💔": {
    "description": "broken heart",
    "names": [
      "broken_heart"
    ],
    "tags": []
  },
  "💗": {
    "description": "growing heart",
    "names": [
      "heartpulse"
    ],
    "tags": []
  },
  "💓": {
    "description": "beating heart",
    "names": [
      "heartbeat"
    ],
    "tags": []
  },
  "💕": {
    "description": "two hearts",
    "names": [
      "two_hearts"
    ],
    "tags": []
  },
  "💖": {
    "description": "sparkling heart",
    "names": [
      "sparkling_heart"
    ],
    "tags": []
  },
  "💞": {
    "description": "revolving hearts",
    "names": [
      "revolving_hearts"
    ],
    "tags": []
  },
  "💘": {
    "description": "heart with arrow",
    "names": [
      "cupid"
    ],
    "tags": [
      "love",
      "heart"
    ]
  },
  "💌": {
    "description": "love letter",
    "names": [
      "love_letter"
    ],
    "tags": [
      "email",
      "envelope"
    ]
  },
  "💋": {
    "description": "kiss mark",
    "names": [
      "kiss"
    ],
    "tags": [
      "lipstick"
    ]
  },
  "💍": {
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
  "💎": {
    "description": "gem stone",
    "names": [
      "gem"
    ],
    "tags": [
      "diamond"
    ]
  },
  "👤": {
    "description": "bust in silhouette",
    "names": [
      "bust_in_silhouette"
    ],
    "tags": [
      "user"
    ]
  },
  "👥": {
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
  "💬": {
    "description": "speech balloon",
    "names": [
      "speech_balloon"
    ],
    "tags": [
      "comment"
    ]
  },
  "👣": {
    "description": "footprints",
    "names": [
      "footprints"
    ],
    "tags": [
      "feet",
      "tracks"
    ]
  },
  "💭": {
    "description": "thought balloon",
    "names": [
      "thought_balloon"
    ],
    "tags": [
      "thinking"
    ]
  },
  "🐶": {
    "description": "dog face",
    "names": [
      "dog"
    ],
    "tags": [
      "pet"
    ]
  },
  "🐺": {
    "description": "wolf face",
    "names": [
      "wolf"
    ],
    "tags": []
  },
  "🐱": {
    "description": "cat face",
    "names": [
      "cat"
    ],
    "tags": [
      "pet"
    ]
  },
  "🐭": {
    "description": "mouse face",
    "names": [
      "mouse"
    ],
    "tags": []
  },
  "🐹": {
    "description": "hamster face",
    "names": [
      "hamster"
    ],
    "tags": [
      "pet"
    ]
  },
  "🐰": {
    "description": "rabbit face",
    "names": [
      "rabbit"
    ],
    "tags": [
      "bunny"
    ]
  },
  "🐸": {
    "description": "frog face",
    "names": [
      "frog"
    ],
    "tags": []
  },
  "🐯": {
    "description": "tiger face",
    "names": [
      "tiger"
    ],
    "tags": []
  },
  "🐨": {
    "description": "koala",
    "names": [
      "koala"
    ],
    "tags": []
  },
  "🐻": {
    "description": "bear face",
    "names": [
      "bear"
    ],
    "tags": []
  },
  "🐷": {
    "description": "pig face",
    "names": [
      "pig"
    ],
    "tags": []
  },
  "🐽": {
    "description": "pig nose",
    "names": [
      "pig_nose"
    ],
    "tags": []
  },
  "🐮": {
    "description": "cow face",
    "names": [
      "cow"
    ],
    "tags": []
  },
  "🐗": {
    "description": "boar",
    "names": [
      "boar"
    ],
    "tags": []
  },
  "🐵": {
    "description": "monkey face",
    "names": [
      "monkey_face"
    ],
    "tags": []
  },
  "🐒": {
    "description": "monkey",
    "names": [
      "monkey"
    ],
    "tags": []
  },
  "🐴": {
    "description": "horse face",
    "names": [
      "horse"
    ],
    "tags": []
  },
  "🐑": {
    "description": "sheep",
    "names": [
      "sheep"
    ],
    "tags": []
  },
  "🐘": {
    "description": "elephant",
    "names": [
      "elephant"
    ],
    "tags": []
  },
  "🐼": {
    "description": "panda face",
    "names": [
      "panda_face"
    ],
    "tags": []
  },
  "🐧": {
    "description": "penguin",
    "names": [
      "penguin"
    ],
    "tags": []
  },
  "🐦": {
    "description": "bird",
    "names": [
      "bird"
    ],
    "tags": []
  },
  "🐤": {
    "description": "baby chick",
    "names": [
      "baby_chick"
    ],
    "tags": []
  },
  "🐥": {
    "description": "front-facing baby chick",
    "names": [
      "hatched_chick"
    ],
    "tags": []
  },
  "🐣": {
    "description": "hatching chick",
    "names": [
      "hatching_chick"
    ],
    "tags": []
  },
  "🐔": {
    "description": "chicken",
    "names": [
      "chicken"
    ],
    "tags": []
  },
  "🐍": {
    "description": "snake",
    "names": [
      "snake"
    ],
    "tags": []
  },
  "🐢": {
    "description": "turtle",
    "names": [
      "turtle"
    ],
    "tags": [
      "slow"
    ]
  },
  "🐛": {
    "description": "bug",
    "names": [
      "bug"
    ],
    "tags": []
  },
  "🐝": {
    "description": "honeybee",
    "names": [
      "bee",
      "honeybee"
    ],
    "tags": []
  },
  "🐜": {
    "description": "ant",
    "names": [
      "ant"
    ],
    "tags": []
  },
  "🐞": {
    "description": "lady beetle",
    "names": [
      "beetle"
    ],
    "tags": [
      "bug"
    ]
  },
  "🐌": {
    "description": "snail",
    "names": [
      "snail"
    ],
    "tags": [
      "slow"
    ]
  },
  "🐙": {
    "description": "octopus",
    "names": [
      "octopus"
    ],
    "tags": []
  },
  "🐚": {
    "description": "spiral shell",
    "names": [
      "shell"
    ],
    "tags": [
      "sea",
      "beach"
    ]
  },
  "🐠": {
    "description": "tropical fish",
    "names": [
      "tropical_fish"
    ],
    "tags": []
  },
  "🐟": {
    "description": "fish",
    "names": [
      "fish"
    ],
    "tags": []
  },
  "🐬": {
    "description": "dolphin",
    "names": [
      "dolphin",
      "flipper"
    ],
    "tags": []
  },
  "🐳": {
    "description": "spouting whale",
    "names": [
      "whale"
    ],
    "tags": [
      "sea"
    ]
  },
  "🐋": {
    "description": "whale",
    "names": [
      "whale2"
    ],
    "tags": []
  },
  "🐄": {
    "description": "cow",
    "names": [
      "cow2"
    ],
    "tags": []
  },
  "🐏": {
    "description": "ram",
    "names": [
      "ram"
    ],
    "tags": []
  },
  "🐀": {
    "description": "rat",
    "names": [
      "rat"
    ],
    "tags": []
  },
  "🐃": {
    "description": "water buffalo",
    "names": [
      "water_buffalo"
    ],
    "tags": []
  },
  "🐅": {
    "description": "tiger",
    "names": [
      "tiger2"
    ],
    "tags": []
  },
  "🐇": {
    "description": "rabbit",
    "names": [
      "rabbit2"
    ],
    "tags": []
  },
  "🐉": {
    "description": "dragon",
    "names": [
      "dragon"
    ],
    "tags": []
  },
  "🐎": {
    "description": "horse",
    "names": [
      "racehorse"
    ],
    "tags": [
      "speed"
    ]
  },
  "🐐": {
    "description": "goat",
    "names": [
      "goat"
    ],
    "tags": []
  },
  "🐓": {
    "description": "rooster",
    "names": [
      "rooster"
    ],
    "tags": []
  },
  "🐕": {
    "description": "dog",
    "names": [
      "dog2"
    ],
    "tags": []
  },
  "🐖": {
    "description": "pig",
    "names": [
      "pig2"
    ],
    "tags": []
  },
  "🐁": {
    "description": "mouse",
    "names": [
      "mouse2"
    ],
    "tags": []
  },
  "🐂": {
    "description": "ox",
    "names": [
      "ox"
    ],
    "tags": []
  },
  "🐲": {
    "description": "dragon face",
    "names": [
      "dragon_face"
    ],
    "tags": []
  },
  "🐡": {
    "description": "blowfish",
    "names": [
      "blowfish"
    ],
    "tags": []
  },
  "🐊": {
    "description": "crocodile",
    "names": [
      "crocodile"
    ],
    "tags": []
  },
  "🐫": {
    "description": "bactrian camel",
    "names": [
      "camel"
    ],
    "tags": []
  },
  "🐪": {
    "description": "dromedary camel",
    "names": [
      "dromedary_camel"
    ],
    "tags": [
      "desert"
    ]
  },
  "🐆": {
    "description": "leopard",
    "names": [
      "leopard"
    ],
    "tags": []
  },
  "🐈": {
    "description": "cat",
    "names": [
      "cat2"
    ],
    "tags": []
  },
  "🐩": {
    "description": "poodle",
    "names": [
      "poodle"
    ],
    "tags": [
      "dog"
    ]
  },
  "🐾": {
    "description": "paw prints",
    "names": [
      "feet",
      "paw_prints"
    ],
    "tags": []
  },
  "💐": {
    "description": "bouquet",
    "names": [
      "bouquet"
    ],
    "tags": [
      "flowers"
    ]
  },
  "🌸": {
    "description": "cherry blossom",
    "names": [
      "cherry_blossom"
    ],
    "tags": [
      "flower",
      "spring"
    ]
  },
  "🌷": {
    "description": "tulip",
    "names": [
      "tulip"
    ],
    "tags": [
      "flower"
    ]
  },
  "🍀": {
    "description": "four leaf clover",
    "names": [
      "four_leaf_clover"
    ],
    "tags": [
      "luck"
    ]
  },
  "🌹": {
    "description": "rose",
    "names": [
      "rose"
    ],
    "tags": [
      "flower"
    ]
  },
  "🌻": {
    "description": "sunflower",
    "names": [
      "sunflower"
    ],
    "tags": []
  },
  "🌺": {
    "description": "hibiscus",
    "names": [
      "hibiscus"
    ],
    "tags": []
  },
  "🍁": {
    "description": "maple leaf",
    "names": [
      "maple_leaf"
    ],
    "tags": [
      "canada"
    ]
  },
  "🍃": {
    "description": "leaf fluttering in wind",
    "names": [
      "leaves"
    ],
    "tags": [
      "leaf"
    ]
  },
  "🍂": {
    "description": "fallen leaf",
    "names": [
      "fallen_leaf"
    ],
    "tags": [
      "autumn"
    ]
  },
  "🌿": {
    "description": "herb",
    "names": [
      "herb"
    ],
    "tags": []
  },
  "🌾": {
    "description": "ear of rice",
    "names": [
      "ear_of_rice"
    ],
    "tags": []
  },
  "🍄": {
    "description": "mushroom",
    "names": [
      "mushroom"
    ],
    "tags": []
  },
  "🌵": {
    "description": "cactus",
    "names": [
      "cactus"
    ],
    "tags": []
  },
  "🌴": {
    "description": "palm tree",
    "names": [
      "palm_tree"
    ],
    "tags": []
  },
  "🌲": {
    "description": "evergreen tree",
    "names": [
      "evergreen_tree"
    ],
    "tags": [
      "wood"
    ]
  },
  "🌳": {
    "description": "deciduous tree",
    "names": [
      "deciduous_tree"
    ],
    "tags": [
      "wood"
    ]
  },
  "🌰": {
    "description": "chestnut",
    "names": [
      "chestnut"
    ],
    "tags": []
  },
  "🌱": {
    "description": "seedling",
    "names": [
      "seedling"
    ],
    "tags": [
      "plant"
    ]
  },
  "🌼": {
    "description": "blossom",
    "names": [
      "blossom"
    ],
    "tags": []
  },
  "🌐": {
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
  "🌞": {
    "description": "sun with face",
    "names": [
      "sun_with_face"
    ],
    "tags": [
      "summer"
    ]
  },
  "🌝": {
    "description": "full moon with face",
    "names": [
      "full_moon_with_face"
    ],
    "tags": []
  },
  "🌚": {
    "description": "new moon with face",
    "names": [
      "new_moon_with_face"
    ],
    "tags": []
  },
  "🌑": {
    "description": "new moon symbol",
    "names": [
      "new_moon"
    ],
    "tags": []
  },
  "🌒": {
    "description": "waxing crescent moon symbol",
    "names": [
      "waxing_crescent_moon"
    ],
    "tags": []
  },
  "🌓": {
    "description": "first quarter moon symbol",
    "names": [
      "first_quarter_moon"
    ],
    "tags": []
  },
  "🌔": {
    "description": "waxing gibbous moon symbol",
    "names": [
      "moon",
      "waxing_gibbous_moon"
    ],
    "tags": []
  },
  "🌕": {
    "description": "full moon symbol",
    "names": [
      "full_moon"
    ],
    "tags": []
  },
  "🌖": {
    "description": "waning gibbous moon symbol",
    "names": [
      "waning_gibbous_moon"
    ],
    "tags": []
  },
  "🌗": {
    "description": "last quarter moon symbol",
    "names": [
      "last_quarter_moon"
    ],
    "tags": []
  },
  "🌘": {
    "description": "waning crescent moon symbol",
    "names": [
      "waning_crescent_moon"
    ],
    "tags": []
  },
  "🌜": {
    "description": "last quarter moon with face",
    "names": [
      "last_quarter_moon_with_face"
    ],
    "tags": []
  },
  "🌛": {
    "description": "first quarter moon with face",
    "names": [
      "first_quarter_moon_with_face"
    ],
    "tags": []
  },
  "🌙": {
    "description": "crescent moon",
    "names": [
      "crescent_moon"
    ],
    "tags": [
      "night"
    ]
  },
  "🌍": {
    "description": "earth globe europe-africa",
    "names": [
      "earth_africa"
    ],
    "tags": [
      "globe",
      "world",
      "international"
    ]
  },
  "🌎": {
    "description": "earth globe americas",
    "names": [
      "earth_americas"
    ],
    "tags": [
      "globe",
      "world",
      "international"
    ]
  },
  "🌏": {
    "description": "earth globe asia-australia",
    "names": [
      "earth_asia"
    ],
    "tags": [
      "globe",
      "world",
      "international"
    ]
  },
  "🌋": {
    "description": "volcano",
    "names": [
      "volcano"
    ],
    "tags": []
  },
  "🌌": {
    "description": "milky way",
    "names": [
      "milky_way"
    ],
    "tags": []
  },
  "🌠": {
    "description": "shooting star",
    "names": [
      "stars"
    ],
    "tags": []
  },
  "⭐": {
    "description": "white medium star",
    "names": [
      "star"
    ],
    "tags": []
  },
  "☀️": {
    "description": "black sun with rays",
    "names": [
      "sunny"
    ],
    "tags": [
      "weather"
    ]
  },
  "⛅": {
    "description": "sun behind cloud",
    "names": [
      "partly_sunny"
    ],
    "tags": [
      "weather",
      "cloud"
    ]
  },
  "☁️": {
    "description": "cloud",
    "names": [
      "cloud"
    ],
    "tags": []
  },
  "⚡": {
    "description": "high voltage sign",
    "names": [
      "zap"
    ],
    "tags": [
      "lightning",
      "thunder"
    ]
  },
  "☔": {
    "description": "umbrella with rain drops",
    "names": [
      "umbrella"
    ],
    "tags": [
      "rain",
      "weather"
    ]
  },
  "❄️": {
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
  "⛄": {
    "description": "snowman without snow",
    "names": [
      "snowman"
    ],
    "tags": [
      "winter",
      "christmas"
    ]
  },
  "🌀": {
    "description": "cyclone",
    "names": [
      "cyclone"
    ],
    "tags": [
      "swirl"
    ]
  },
  "🌁": {
    "description": "foggy",
    "names": [
      "foggy"
    ],
    "tags": [
      "karl"
    ]
  },
  "🌈": {
    "description": "rainbow",
    "names": [
      "rainbow"
    ],
    "tags": [
      "pride"
    ]
  },
  "🌊": {
    "description": "water wave",
    "names": [
      "ocean"
    ],
    "tags": [
      "sea"
    ]
  },
  "🎍": {
    "description": "pine decoration",
    "names": [
      "bamboo"
    ],
    "tags": []
  },
  "💝": {
    "description": "heart with ribbon",
    "names": [
      "gift_heart"
    ],
    "tags": [
      "chocolates"
    ]
  },
  "🎎": {
    "description": "japanese dolls",
    "names": [
      "dolls"
    ],
    "tags": []
  },
  "🎒": {
    "description": "school satchel",
    "names": [
      "school_satchel"
    ],
    "tags": []
  },
  "🎓": {
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
  "🎏": {
    "description": "carp streamer",
    "names": [
      "flags"
    ],
    "tags": []
  },
  "🎆": {
    "description": "fireworks",
    "names": [
      "fireworks"
    ],
    "tags": [
      "festival",
      "celebration"
    ]
  },
  "🎇": {
    "description": "firework sparkler",
    "names": [
      "sparkler"
    ],
    "tags": []
  },
  "🎐": {
    "description": "wind chime",
    "names": [
      "wind_chime"
    ],
    "tags": []
  },
  "🎑": {
    "description": "moon viewing ceremony",
    "names": [
      "rice_scene"
    ],
    "tags": []
  },
  "🎃": {
    "description": "jack-o-lantern",
    "names": [
      "jack_o_lantern"
    ],
    "tags": [
      "halloween"
    ]
  },
  "👻": {
    "description": "ghost",
    "names": [
      "ghost"
    ],
    "tags": [
      "halloween"
    ]
  },
  "🎅": {
    "description": "father christmas",
    "names": [
      "santa"
    ],
    "tags": [
      "christmas"
    ]
  },
  "🎄": {
    "description": "christmas tree",
    "names": [
      "christmas_tree"
    ],
    "tags": []
  },
  "🎁": {
    "description": "wrapped present",
    "names": [
      "gift"
    ],
    "tags": [
      "present",
      "birthday",
      "christmas"
    ]
  },
  "🎋": {
    "description": "tanabata tree",
    "names": [
      "tanabata_tree"
    ],
    "tags": []
  },
  "🎉": {
    "description": "party popper",
    "names": [
      "tada"
    ],
    "tags": [
      "party"
    ]
  },
  "🎊": {
    "description": "confetti ball",
    "names": [
      "confetti_ball"
    ],
    "tags": []
  },
  "🎈": {
    "description": "balloon",
    "names": [
      "balloon"
    ],
    "tags": [
      "party",
      "birthday"
    ]
  },
  "🎌": {
    "description": "crossed flags",
    "names": [
      "crossed_flags"
    ],
    "tags": []
  },
  "🔮": {
    "description": "crystal ball",
    "names": [
      "crystal_ball"
    ],
    "tags": [
      "fortune"
    ]
  },
  "🎥": {
    "description": "movie camera",
    "names": [
      "movie_camera"
    ],
    "tags": [
      "film",
      "video"
    ]
  },
  "📷": {
    "description": "camera",
    "names": [
      "camera"
    ],
    "tags": [
      "photo"
    ]
  },
  "📹": {
    "description": "video camera",
    "names": [
      "video_camera"
    ],
    "tags": []
  },
  "📼": {
    "description": "videocassette",
    "names": [
      "vhs"
    ],
    "tags": []
  },
  "💿": {
    "description": "optical disc",
    "names": [
      "cd"
    ],
    "tags": []
  },
  "📀": {
    "description": "dvd",
    "names": [
      "dvd"
    ],
    "tags": []
  },
  "💽": {
    "description": "minidisc",
    "names": [
      "minidisc"
    ],
    "tags": []
  },
  "💾": {
    "description": "floppy disk",
    "names": [
      "floppy_disk"
    ],
    "tags": [
      "save"
    ]
  },
  "💻": {
    "description": "personal computer",
    "names": [
      "computer"
    ],
    "tags": [
      "desktop",
      "screen"
    ]
  },
  "📱": {
    "description": "mobile phone",
    "names": [
      "iphone"
    ],
    "tags": [
      "smartphone",
      "mobile"
    ]
  },
  "☎️": {
    "description": "black telephone",
    "names": [
      "phone",
      "telephone"
    ],
    "tags": []
  },
  "📞": {
    "description": "telephone receiver",
    "names": [
      "telephone_receiver"
    ],
    "tags": [
      "phone",
      "call"
    ]
  },
  "📟": {
    "description": "pager",
    "names": [
      "pager"
    ],
    "tags": []
  },
  "📠": {
    "description": "fax machine",
    "names": [
      "fax"
    ],
    "tags": []
  },
  "📡": {
    "description": "satellite antenna",
    "names": [
      "satellite"
    ],
    "tags": [
      "signal"
    ]
  },
  "📺": {
    "description": "television",
    "names": [
      "tv"
    ],
    "tags": []
  },
  "📻": {
    "description": "radio",
    "names": [
      "radio"
    ],
    "tags": [
      "podcast"
    ]
  },
  "🔊": {
    "description": "speaker with three sound waves",
    "names": [
      "loud_sound"
    ],
    "tags": [
      "volume"
    ]
  },
  "🔉": {
    "description": "speaker with one sound wave",
    "names": [
      "sound"
    ],
    "tags": [
      "volume"
    ]
  },
  "🔈": {
    "description": "speaker",
    "names": [
      "speaker"
    ],
    "tags": []
  },
  "🔇": {
    "description": "speaker with cancellation stroke",
    "names": [
      "mute"
    ],
    "tags": [
      "sound",
      "volume"
    ]
  },
  "🔔": {
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
    "description": "bell with cancellation stroke",
    "names": [
      "no_bell"
    ],
    "tags": [
      "volume",
      "off"
    ]
  },
  "📢": {
    "description": "public address loudspeaker",
    "names": [
      "loudspeaker"
    ],
    "tags": [
      "announcement"
    ]
  },
  "📣": {
    "description": "cheering megaphone",
    "names": [
      "mega"
    ],
    "tags": []
  },
  "⏳": {
    "description": "hourglass with flowing sand",
    "names": [
      "hourglass_flowing_sand"
    ],
    "tags": [
      "time"
    ]
  },
  "⌛": {
    "description": "hourglass",
    "names": [
      "hourglass"
    ],
    "tags": [
      "time"
    ]
  },
  "⏰": {
    "description": "alarm clock",
    "names": [
      "alarm_clock"
    ],
    "tags": [
      "morning"
    ]
  },
  "⌚": {
    "description": "watch",
    "names": [
      "watch"
    ],
    "tags": [
      "time"
    ]
  },
  "🔓": {
    "description": "open lock",
    "names": [
      "unlock"
    ],
    "tags": [
      "security"
    ]
  },
  "🔒": {
    "description": "lock",
    "names": [
      "lock"
    ],
    "tags": [
      "security",
      "private"
    ]
  },
  "🔏": {
    "description": "lock with ink pen",
    "names": [
      "lock_with_ink_pen"
    ],
    "tags": []
  },
  "🔐": {
    "description": "closed lock with key",
    "names": [
      "closed_lock_with_key"
    ],
    "tags": [
      "security"
    ]
  },
  "🔑": {
    "description": "key",
    "names": [
      "key"
    ],
    "tags": [
      "lock",
      "password"
    ]
  },
  "🔎": {
    "description": "right-pointing magnifying glass",
    "names": [
      "mag_right"
    ],
    "tags": []
  },
  "💡": {
    "description": "electric light bulb",
    "names": [
      "bulb"
    ],
    "tags": [
      "idea",
      "light"
    ]
  },
  "🔦": {
    "description": "electric torch",
    "names": [
      "flashlight"
    ],
    "tags": []
  },
  "🔆": {
    "description": "high brightness symbol",
    "names": [
      "high_brightness"
    ],
    "tags": []
  },
  "🔅": {
    "description": "low brightness symbol",
    "names": [
      "low_brightness"
    ],
    "tags": []
  },
  "🔌": {
    "description": "electric plug",
    "names": [
      "electric_plug"
    ],
    "tags": []
  },
  "🔋": {
    "description": "battery",
    "names": [
      "battery"
    ],
    "tags": [
      "power"
    ]
  },
  "🔍": {
    "description": "left-pointing magnifying glass",
    "names": [
      "mag"
    ],
    "tags": [
      "search",
      "zoom"
    ]
  },
  "🛁": {
    "description": "bathtub",
    "names": [
      "bathtub"
    ],
    "tags": []
  },
  "🛀": {
    "description": "bath",
    "names": [
      "bath"
    ],
    "tags": [
      "shower"
    ]
  },
  "🚿": {
    "description": "shower",
    "names": [
      "shower"
    ],
    "tags": [
      "bath"
    ]
  },
  "🚽": {
    "description": "toilet",
    "names": [
      "toilet"
    ],
    "tags": [
      "wc"
    ]
  },
  "🔧": {
    "description": "wrench",
    "names": [
      "wrench"
    ],
    "tags": [
      "tool"
    ]
  },
  "🔩": {
    "description": "nut and bolt",
    "names": [
      "nut_and_bolt"
    ],
    "tags": []
  },
  "🔨": {
    "description": "hammer",
    "names": [
      "hammer"
    ],
    "tags": [
      "tool"
    ]
  },
  "🚪": {
    "description": "door",
    "names": [
      "door"
    ],
    "tags": []
  },
  "🚬": {
    "description": "smoking symbol",
    "names": [
      "smoking"
    ],
    "tags": [
      "cigarette"
    ]
  },
  "💣": {
    "description": "bomb",
    "names": [
      "bomb"
    ],
    "tags": [
      "boom"
    ]
  },
  "🔫": {
    "description": "pistol",
    "names": [
      "gun"
    ],
    "tags": [
      "shoot",
      "weapon"
    ]
  },
  "🔪": {
    "description": "hocho",
    "names": [
      "hocho",
      "knife"
    ],
    "tags": [
      "cut",
      "chop"
    ]
  },
  "💊": {
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
  "💰": {
    "description": "money bag",
    "names": [
      "moneybag"
    ],
    "tags": [
      "dollar",
      "cream"
    ]
  },
  "💴": {
    "description": "banknote with yen sign",
    "names": [
      "yen"
    ],
    "tags": []
  },
  "💵": {
    "description": "banknote with dollar sign",
    "names": [
      "dollar"
    ],
    "tags": [
      "money"
    ]
  },
  "💷": {
    "description": "banknote with pound sign",
    "names": [
      "pound"
    ],
    "tags": []
  },
  "💶": {
    "description": "banknote with euro sign",
    "names": [
      "euro"
    ],
    "tags": []
  },
  "💳": {
    "description": "credit card",
    "names": [
      "credit_card"
    ],
    "tags": [
      "subscription"
    ]
  },
  "💸": {
    "description": "money with wings",
    "names": [
      "money_with_wings"
    ],
    "tags": [
      "dollar"
    ]
  },
  "📲": {
    "description": "mobile phone with rightwards arrow at left",
    "names": [
      "calling"
    ],
    "tags": [
      "call",
      "incoming"
    ]
  },
  "📧": {
    "description": "e-mail symbol",
    "names": [
      "e-mail"
    ],
    "tags": []
  },
  "📥": {
    "description": "inbox tray",
    "names": [
      "inbox_tray"
    ],
    "tags": []
  },
  "📤": {
    "description": "outbox tray",
    "names": [
      "outbox_tray"
    ],
    "tags": []
  },
  "✉️": {
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
    "description": "envelope with downwards arrow above",
    "names": [
      "envelope_with_arrow"
    ],
    "tags": []
  },
  "📨": {
    "description": "incoming envelope",
    "names": [
      "incoming_envelope"
    ],
    "tags": []
  },
  "📯": {
    "description": "postal horn",
    "names": [
      "postal_horn"
    ],
    "tags": []
  },
  "📫": {
    "description": "closed mailbox with raised flag",
    "names": [
      "mailbox"
    ],
    "tags": []
  },
  "📪": {
    "description": "closed mailbox with lowered flag",
    "names": [
      "mailbox_closed"
    ],
    "tags": []
  },
  "📬": {
    "description": "open mailbox with raised flag",
    "names": [
      "mailbox_with_mail"
    ],
    "tags": []
  },
  "📭": {
    "description": "open mailbox with lowered flag",
    "names": [
      "mailbox_with_no_mail"
    ],
    "tags": []
  },
  "📮": {
    "description": "postbox",
    "names": [
      "postbox"
    ],
    "tags": []
  },
  "📦": {
    "description": "package",
    "names": [
      "package"
    ],
    "tags": [
      "shipping"
    ]
  },
  "📝": {
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
  "📄": {
    "description": "page facing up",
    "names": [
      "page_facing_up"
    ],
    "tags": [
      "document"
    ]
  },
  "📃": {
    "description": "page with curl",
    "names": [
      "page_with_curl"
    ],
    "tags": []
  },
  "📑": {
    "description": "bookmark tabs",
    "names": [
      "bookmark_tabs"
    ],
    "tags": []
  },
  "📊": {
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
    "description": "chart with upwards trend",
    "names": [
      "chart_with_upwards_trend"
    ],
    "tags": [
      "graph",
      "metrics"
    ]
  },
  "📉": {
    "description": "chart with downwards trend",
    "names": [
      "chart_with_downwards_trend"
    ],
    "tags": [
      "graph",
      "metrics"
    ]
  },
  "📜": {
    "description": "scroll",
    "names": [
      "scroll"
    ],
    "tags": [
      "document"
    ]
  },
  "📋": {
    "description": "clipboard",
    "names": [
      "clipboard"
    ],
    "tags": []
  },
  "📅": {
    "description": "calendar",
    "names": [
      "date"
    ],
    "tags": [
      "calendar",
      "schedule"
    ]
  },
  "📆": {
    "description": "tear-off calendar",
    "names": [
      "calendar"
    ],
    "tags": [
      "schedule"
    ]
  },
  "📇": {
    "description": "card index",
    "names": [
      "card_index"
    ],
    "tags": []
  },
  "📁": {
    "description": "file folder",
    "names": [
      "file_folder"
    ],
    "tags": [
      "directory"
    ]
  },
  "📂": {
    "description": "open file folder",
    "names": [
      "open_file_folder"
    ],
    "tags": []
  },
  "✂️": {
    "description": "black scissors",
    "names": [
      "scissors"
    ],
    "tags": [
      "cut"
    ]
  },
  "📌": {
    "description": "pushpin",
    "names": [
      "pushpin"
    ],
    "tags": [
      "location"
    ]
  },
  "📎": {
    "description": "paperclip",
    "names": [
      "paperclip"
    ],
    "tags": []
  },
  "✒️": {
    "description": "black nib",
    "names": [
      "black_nib"
    ],
    "tags": []
  },
  "✏️": {
    "description": "pencil",
    "names": [
      "pencil2"
    ],
    "tags": []
  },
  "📏": {
    "description": "straight ruler",
    "names": [
      "straight_ruler"
    ],
    "tags": []
  },
  "📐": {
    "description": "triangular ruler",
    "names": [
      "triangular_ruler"
    ],
    "tags": []
  },
  "📕": {
    "description": "closed book",
    "names": [
      "closed_book"
    ],
    "tags": []
  },
  "📗": {
    "description": "green book",
    "names": [
      "green_book"
    ],
    "tags": []
  },
  "📘": {
    "description": "blue book",
    "names": [
      "blue_book"
    ],
    "tags": []
  },
  "📙": {
    "description": "orange book",
    "names": [
      "orange_book"
    ],
    "tags": []
  },
  "📓": {
    "description": "notebook",
    "names": [
      "notebook"
    ],
    "tags": []
  },
  "📔": {
    "description": "notebook with decorative cover",
    "names": [
      "notebook_with_decorative_cover"
    ],
    "tags": []
  },
  "📒": {
    "description": "ledger",
    "names": [
      "ledger"
    ],
    "tags": []
  },
  "📚": {
    "description": "books",
    "names": [
      "books"
    ],
    "tags": [
      "library"
    ]
  },
  "📖": {
    "description": "open book",
    "names": [
      "book",
      "open_book"
    ],
    "tags": []
  },
  "🔖": {
    "description": "bookmark",
    "names": [
      "bookmark"
    ],
    "tags": []
  },
  "📛": {
    "description": "name badge",
    "names": [
      "name_badge"
    ],
    "tags": []
  },
  "🔬": {
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
  "🔭": {
    "description": "telescope",
    "names": [
      "telescope"
    ],
    "tags": []
  },
  "📰": {
    "description": "newspaper",
    "names": [
      "newspaper"
    ],
    "tags": [
      "press"
    ]
  },
  "🎨": {
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
    "description": "clapper board",
    "names": [
      "clapper"
    ],
    "tags": [
      "film"
    ]
  },
  "🎤": {
    "description": "microphone",
    "names": [
      "microphone"
    ],
    "tags": [
      "sing"
    ]
  },
  "🎧": {
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
    "description": "musical score",
    "names": [
      "musical_score"
    ],
    "tags": []
  },
  "🎵": {
    "description": "musical note",
    "names": [
      "musical_note"
    ],
    "tags": []
  },
  "🎶": {
    "description": "multiple musical notes",
    "names": [
      "notes"
    ],
    "tags": [
      "music"
    ]
  },
  "🎹": {
    "description": "musical keyboard",
    "names": [
      "musical_keyboard"
    ],
    "tags": [
      "piano"
    ]
  },
  "🎻": {
    "description": "violin",
    "names": [
      "violin"
    ],
    "tags": []
  },
  "🎺": {
    "description": "trumpet",
    "names": [
      "trumpet"
    ],
    "tags": []
  },
  "🎷": {
    "description": "saxophone",
    "names": [
      "saxophone"
    ],
    "tags": []
  },
  "🎸": {
    "description": "guitar",
    "names": [
      "guitar"
    ],
    "tags": [
      "rock"
    ]
  },
  "👾": {
    "description": "alien monster",
    "names": [
      "space_invader"
    ],
    "tags": [
      "game",
      "retro"
    ]
  },
  "🎮": {
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
  "🃏": {
    "description": "playing card black joker",
    "names": [
      "black_joker"
    ],
    "tags": []
  },
  "🎴": {
    "description": "flower playing cards",
    "names": [
      "flower_playing_cards"
    ],
    "tags": []
  },
  "🀄": {
    "description": "mahjong tile red dragon",
    "names": [
      "mahjong"
    ],
    "tags": []
  },
  "🎲": {
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
    "description": "direct hit",
    "names": [
      "dart"
    ],
    "tags": [
      "target"
    ]
  },
  "🏈": {
    "description": "american football",
    "names": [
      "football"
    ],
    "tags": [
      "sports"
    ]
  },
  "🏀": {
    "description": "basketball and hoop",
    "names": [
      "basketball"
    ],
    "tags": [
      "sports"
    ]
  },
  "⚽": {
    "description": "soccer ball",
    "names": [
      "soccer"
    ],
    "tags": [
      "sports"
    ]
  },
  "⚾️": {
    "description": "baseball",
    "names": [
      "baseball"
    ],
    "tags": [
      "sports"
    ]
  },
  "🎾": {
    "description": "tennis racquet and ball",
    "names": [
      "tennis"
    ],
    "tags": [
      "sports"
    ]
  },
  "🎱": {
    "description": "billiards",
    "names": [
      "8ball"
    ],
    "tags": [
      "pool",
      "billiards"
    ]
  },
  "🏉": {
    "description": "rugby football",
    "names": [
      "rugby_football"
    ],
    "tags": []
  },
  "🎳": {
    "description": "bowling",
    "names": [
      "bowling"
    ],
    "tags": []
  },
  "⛳": {
    "description": "flag in hole",
    "names": [
      "golf"
    ],
    "tags": []
  },
  "🚵": {
    "description": "mountain bicyclist",
    "names": [
      "mountain_bicyclist"
    ],
    "tags": []
  },
  "🚴": {
    "description": "bicyclist",
    "names": [
      "bicyclist"
    ],
    "tags": []
  },
  "🏁": {
    "description": "chequered flag",
    "names": [
      "checkered_flag"
    ],
    "tags": [
      "milestone",
      "finish"
    ]
  },
  "🏇": {
    "description": "horse racing",
    "names": [
      "horse_racing"
    ],
    "tags": []
  },
  "🏆": {
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
  "🎿": {
    "description": "ski and ski boot",
    "names": [
      "ski"
    ],
    "tags": []
  },
  "🏂": {
    "description": "snowboarder",
    "names": [
      "snowboarder"
    ],
    "tags": []
  },
  "🏊": {
    "description": "swimmer",
    "names": [
      "swimmer"
    ],
    "tags": []
  },
  "🏄": {
    "description": "surfer",
    "names": [
      "surfer"
    ],
    "tags": []
  },
  "🎣": {
    "description": "fishing pole and fish",
    "names": [
      "fishing_pole_and_fish"
    ],
    "tags": []
  },
  "☕": {
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
    "description": "sake bottle and cup",
    "names": [
      "sake"
    ],
    "tags": []
  },
  "🍼": {
    "description": "baby bottle",
    "names": [
      "baby_bottle"
    ],
    "tags": [
      "milk"
    ]
  },
  "🍺": {
    "description": "beer mug",
    "names": [
      "beer"
    ],
    "tags": [
      "drink"
    ]
  },
  "🍻": {
    "description": "clinking beer mugs",
    "names": [
      "beers"
    ],
    "tags": [
      "drinks"
    ]
  },
  "🍸": {
    "description": "cocktail glass",
    "names": [
      "cocktail"
    ],
    "tags": [
      "drink"
    ]
  },
  "🍹": {
    "description": "tropical drink",
    "names": [
      "tropical_drink"
    ],
    "tags": [
      "summer",
      "vacation"
    ]
  },
  "🍷": {
    "description": "wine glass",
    "names": [
      "wine_glass"
    ],
    "tags": []
  },
  "🍴": {
    "description": "fork and knife",
    "names": [
      "fork_and_knife"
    ],
    "tags": [
      "cutlery"
    ]
  },
  "🍕": {
    "description": "slice of pizza",
    "names": [
      "pizza"
    ],
    "tags": []
  },
  "🍔": {
    "description": "hamburger",
    "names": [
      "hamburger"
    ],
    "tags": [
      "burger"
    ]
  },
  "🍟": {
    "description": "french fries",
    "names": [
      "fries"
    ],
    "tags": []
  },
  "🍗": {
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
    "description": "meat on bone",
    "names": [
      "meat_on_bone"
    ],
    "tags": []
  },
  "🍝": {
    "description": "spaghetti",
    "names": [
      "spaghetti"
    ],
    "tags": [
      "pasta"
    ]
  },
  "🍛": {
    "description": "curry and rice",
    "names": [
      "curry"
    ],
    "tags": []
  },
  "🍤": {
    "description": "fried shrimp",
    "names": [
      "fried_shrimp"
    ],
    "tags": [
      "tempura"
    ]
  },
  "🍱": {
    "description": "bento box",
    "names": [
      "bento"
    ],
    "tags": []
  },
  "🍣": {
    "description": "sushi",
    "names": [
      "sushi"
    ],
    "tags": []
  },
  "🍥": {
    "description": "fish cake with swirl design",
    "names": [
      "fish_cake"
    ],
    "tags": []
  },
  "🍙": {
    "description": "rice ball",
    "names": [
      "rice_ball"
    ],
    "tags": []
  },
  "🍘": {
    "description": "rice cracker",
    "names": [
      "rice_cracker"
    ],
    "tags": []
  },
  "🍚": {
    "description": "cooked rice",
    "names": [
      "rice"
    ],
    "tags": []
  },
  "🍜": {
    "description": "steaming bowl",
    "names": [
      "ramen"
    ],
    "tags": [
      "noodle"
    ]
  },
  "🍲": {
    "description": "pot of food",
    "names": [
      "stew"
    ],
    "tags": []
  },
  "🍢": {
    "description": "oden",
    "names": [
      "oden"
    ],
    "tags": []
  },
  "🍡": {
    "description": "dango",
    "names": [
      "dango"
    ],
    "tags": []
  },
  "🍳": {
    "description": "cooking",
    "names": [
      "egg"
    ],
    "tags": [
      "breakfast"
    ]
  },
  "🍞": {
    "description": "bread",
    "names": [
      "bread"
    ],
    "tags": [
      "toast"
    ]
  },
  "🍩": {
    "description": "doughnut",
    "names": [
      "doughnut"
    ],
    "tags": []
  },
  "🍮": {
    "description": "custard",
    "names": [
      "custard"
    ],
    "tags": []
  },
  "🍦": {
    "description": "soft ice cream",
    "names": [
      "icecream"
    ],
    "tags": []
  },
  "🍨": {
    "description": "ice cream",
    "names": [
      "ice_cream"
    ],
    "tags": []
  },
  "🍧": {
    "description": "shaved ice",
    "names": [
      "shaved_ice"
    ],
    "tags": []
  },
  "🎂": {
    "description": "birthday cake",
    "names": [
      "birthday"
    ],
    "tags": [
      "party"
    ]
  },
  "🍰": {
    "description": "shortcake",
    "names": [
      "cake"
    ],
    "tags": [
      "dessert"
    ]
  },
  "🍪": {
    "description": "cookie",
    "names": [
      "cookie"
    ],
    "tags": []
  },
  "🍫": {
    "description": "chocolate bar",
    "names": [
      "chocolate_bar"
    ],
    "tags": []
  },
  "🍬": {
    "description": "candy",
    "names": [
      "candy"
    ],
    "tags": [
      "sweet"
    ]
  },
  "🍭": {
    "description": "lollipop",
    "names": [
      "lollipop"
    ],
    "tags": []
  },
  "🍯": {
    "description": "honey pot",
    "names": [
      "honey_pot"
    ],
    "tags": []
  },
  "🍎": {
    "description": "red apple",
    "names": [
      "apple"
    ],
    "tags": []
  },
  "🍏": {
    "description": "green apple",
    "names": [
      "green_apple"
    ],
    "tags": [
      "fruit"
    ]
  },
  "🍊": {
    "description": "tangerine",
    "names": [
      "tangerine"
    ],
    "tags": []
  },
  "🍋": {
    "description": "lemon",
    "names": [
      "lemon"
    ],
    "tags": []
  },
  "🍒": {
    "description": "cherries",
    "names": [
      "cherries"
    ],
    "tags": [
      "fruit"
    ]
  },
  "🍇": {
    "description": "grapes",
    "names": [
      "grapes"
    ],
    "tags": []
  },
  "🍉": {
    "description": "watermelon",
    "names": [
      "watermelon"
    ],
    "tags": []
  },
  "🍓": {
    "description": "strawberry",
    "names": [
      "strawberry"
    ],
    "tags": [
      "fruit"
    ]
  },
  "🍑": {
    "description": "peach",
    "names": [
      "peach"
    ],
    "tags": []
  },
  "🍈": {
    "description": "melon",
    "names": [
      "melon"
    ],
    "tags": []
  },
  "🍌": {
    "description": "banana",
    "names": [
      "banana"
    ],
    "tags": [
      "fruit"
    ]
  },
  "🍐": {
    "description": "pear",
    "names": [
      "pear"
    ],
    "tags": []
  },
  "🍍": {
    "description": "pineapple",
    "names": [
      "pineapple"
    ],
    "tags": []
  },
  "🍠": {
    "description": "roasted sweet potato",
    "names": [
      "sweet_potato"
    ],
    "tags": []
  },
  "🍆": {
    "description": "aubergine",
    "names": [
      "eggplant"
    ],
    "tags": [
      "aubergine"
    ]
  },
  "🍅": {
    "description": "tomato",
    "names": [
      "tomato"
    ],
    "tags": []
  },
  "🌽": {
    "description": "ear of maize",
    "names": [
      "corn"
    ],
    "tags": []
  },
  "🏠": {
    "description": "house building",
    "names": [
      "house"
    ],
    "tags": []
  },
  "🏡": {
    "description": "house with garden",
    "names": [
      "house_with_garden"
    ],
    "tags": []
  },
  "🏫": {
    "description": "school",
    "names": [
      "school"
    ],
    "tags": []
  },
  "🏢": {
    "description": "office building",
    "names": [
      "office"
    ],
    "tags": []
  },
  "🏣": {
    "description": "japanese post office",
    "names": [
      "post_office"
    ],
    "tags": []
  },
  "🏥": {
    "description": "hospital",
    "names": [
      "hospital"
    ],
    "tags": []
  },
  "🏦": {
    "description": "bank",
    "names": [
      "bank"
    ],
    "tags": []
  },
  "🏪": {
    "description": "convenience store",
    "names": [
      "convenience_store"
    ],
    "tags": []
  },
  "🏩": {
    "description": "love hotel",
    "names": [
      "love_hotel"
    ],
    "tags": []
  },
  "🏨": {
    "description": "hotel",
    "names": [
      "hotel"
    ],
    "tags": []
  },
  "💒": {
    "description": "wedding",
    "names": [
      "wedding"
    ],
    "tags": [
      "marriage"
    ]
  },
  "⛪": {
    "description": "church",
    "names": [
      "church"
    ],
    "tags": []
  },
  "🏬": {
    "description": "department store",
    "names": [
      "department_store"
    ],
    "tags": []
  },
  "🏤": {
    "description": "european post office",
    "names": [
      "european_post_office"
    ],
    "tags": []
  },
  "🌇": {
    "description": "sunset over buildings",
    "names": [
      "city_sunrise"
    ],
    "tags": []
  },
  "🌆": {
    "description": "cityscape at dusk",
    "names": [
      "city_sunset"
    ],
    "tags": []
  },
  "🏯": {
    "description": "japanese castle",
    "names": [
      "japanese_castle"
    ],
    "tags": []
  },
  "🏰": {
    "description": "european castle",
    "names": [
      "european_castle"
    ],
    "tags": []
  },
  "⛺": {
    "description": "tent",
    "names": [
      "tent"
    ],
    "tags": [
      "camping"
    ]
  },
  "🏭": {
    "description": "factory",
    "names": [
      "factory"
    ],
    "tags": []
  },
  "🗼": {
    "description": "tokyo tower",
    "names": [
      "tokyo_tower"
    ],
    "tags": []
  },
  "🗾": {
    "description": "silhouette of japan",
    "names": [
      "japan"
    ],
    "tags": []
  },
  "🗻": {
    "description": "mount fuji",
    "names": [
      "mount_fuji"
    ],
    "tags": []
  },
  "🌄": {
    "description": "sunrise over mountains",
    "names": [
      "sunrise_over_mountains"
    ],
    "tags": []
  },
  "🌅": {
    "description": "sunrise",
    "names": [
      "sunrise"
    ],
    "tags": []
  },
  "🌃": {
    "description": "night with stars",
    "names": [
      "night_with_stars"
    ],
    "tags": []
  },
  "🗽": {
    "description": "statue of liberty",
    "names": [
      "statue_of_liberty"
    ],
    "tags": []
  },
  "🌉": {
    "description": "bridge at night",
    "names": [
      "bridge_at_night"
    ],
    "tags": []
  },
  "🎠": {
    "description": "carousel horse",
    "names": [
      "carousel_horse"
    ],
    "tags": []
  },
  "🎡": {
    "description": "ferris wheel",
    "names": [
      "ferris_wheel"
    ],
    "tags": []
  },
  "⛲": {
    "description": "fountain",
    "names": [
      "fountain"
    ],
    "tags": []
  },
  "🎢": {
    "description": "roller coaster",
    "names": [
      "roller_coaster"
    ],
    "tags": []
  },
  "🚢": {
    "description": "ship",
    "names": [
      "ship"
    ],
    "tags": []
  },
  "⛵": {
    "description": "sailboat",
    "names": [
      "boat",
      "sailboat"
    ],
    "tags": []
  },
  "🚤": {
    "description": "speedboat",
    "names": [
      "speedboat"
    ],
    "tags": [
      "ship"
    ]
  },
  "🚣": {
    "description": "rowboat",
    "names": [
      "rowboat"
    ],
    "tags": []
  },
  "⚓": {
    "description": "anchor",
    "names": [
      "anchor"
    ],
    "tags": [
      "ship"
    ]
  },
  "🚀": {
    "description": "rocket",
    "names": [
      "rocket"
    ],
    "tags": [
      "ship",
      "launch"
    ]
  },
  "✈️": {
    "description": "airplane",
    "names": [
      "airplane"
    ],
    "tags": [
      "flight"
    ]
  },
  "💺": {
    "description": "seat",
    "names": [
      "seat"
    ],
    "tags": []
  },
  "🚁": {
    "description": "helicopter",
    "names": [
      "helicopter"
    ],
    "tags": []
  },
  "🚂": {
    "description": "steam locomotive",
    "names": [
      "steam_locomotive"
    ],
    "tags": [
      "train"
    ]
  },
  "🚊": {
    "description": "tram",
    "names": [
      "tram"
    ],
    "tags": []
  },
  "🚉": {
    "description": "station",
    "names": [
      "station"
    ],
    "tags": []
  },
  "🚞": {
    "description": "mountain railway",
    "names": [
      "mountain_railway"
    ],
    "tags": []
  },
  "🚆": {
    "description": "train",
    "names": [
      "train2"
    ],
    "tags": []
  },
  "🚄": {
    "description": "high-speed train",
    "names": [
      "bullettrain_side"
    ],
    "tags": [
      "train"
    ]
  },
  "🚅": {
    "description": "high-speed train with bullet nose",
    "names": [
      "bullettrain_front"
    ],
    "tags": [
      "train"
    ]
  },
  "🚈": {
    "description": "light rail",
    "names": [
      "light_rail"
    ],
    "tags": []
  },
  "🚇": {
    "description": "metro",
    "names": [
      "metro"
    ],
    "tags": []
  },
  "🚝": {
    "description": "monorail",
    "names": [
      "monorail"
    ],
    "tags": []
  },
  "🚋": {
    "description": "tram car",
    "names": [
      "train"
    ],
    "tags": []
  },
  "🚃": {
    "description": "railway car",
    "names": [
      "railway_car"
    ],
    "tags": []
  },
  "🚎": {
    "description": "trolleybus",
    "names": [
      "trolleybus"
    ],
    "tags": []
  },
  "🚌": {
    "description": "bus",
    "names": [
      "bus"
    ],
    "tags": []
  },
  "🚍": {
    "description": "oncoming bus",
    "names": [
      "oncoming_bus"
    ],
    "tags": []
  },
  "🚙": {
    "description": "recreational vehicle",
    "names": [
      "blue_car"
    ],
    "tags": []
  },
  "🚘": {
    "description": "oncoming automobile",
    "names": [
      "oncoming_automobile"
    ],
    "tags": []
  },
  "🚗": {
    "description": "automobile",
    "names": [
      "car",
      "red_car"
    ],
    "tags": []
  },
  "🚕": {
    "description": "taxi",
    "names": [
      "taxi"
    ],
    "tags": []
  },
  "🚖": {
    "description": "oncoming taxi",
    "names": [
      "oncoming_taxi"
    ],
    "tags": []
  },
  "🚛": {
    "description": "articulated lorry",
    "names": [
      "articulated_lorry"
    ],
    "tags": []
  },
  "🚚": {
    "description": "delivery truck",
    "names": [
      "truck"
    ],
    "tags": []
  },
  "🚨": {
    "description": "police cars revolving light",
    "names": [
      "rotating_light"
    ],
    "tags": [
      "911",
      "emergency"
    ]
  },
  "🚓": {
    "description": "police car",
    "names": [
      "police_car"
    ],
    "tags": []
  },
  "🚔": {
    "description": "oncoming police car",
    "names": [
      "oncoming_police_car"
    ],
    "tags": []
  },
  "🚒": {
    "description": "fire engine",
    "names": [
      "fire_engine"
    ],
    "tags": []
  },
  "🚑": {
    "description": "ambulance",
    "names": [
      "ambulance"
    ],
    "tags": []
  },
  "🚐": {
    "description": "minibus",
    "names": [
      "minibus"
    ],
    "tags": []
  },
  "🚲": {
    "description": "bicycle",
    "names": [
      "bike"
    ],
    "tags": [
      "bicycle"
    ]
  },
  "🚡": {
    "description": "aerial tramway",
    "names": [
      "aerial_tramway"
    ],
    "tags": []
  },
  "🚟": {
    "description": "suspension railway",
    "names": [
      "suspension_railway"
    ],
    "tags": []
  },
  "🚠": {
    "description": "mountain cableway",
    "names": [
      "mountain_cableway"
    ],
    "tags": []
  },
  "🚜": {
    "description": "tractor",
    "names": [
      "tractor"
    ],
    "tags": []
  },
  "💈": {
    "description": "barber pole",
    "names": [
      "barber"
    ],
    "tags": []
  },
  "🚏": {
    "description": "bus stop",
    "names": [
      "busstop"
    ],
    "tags": []
  },
  "🎫": {
    "description": "ticket",
    "names": [
      "ticket"
    ],
    "tags": []
  },
  "🚦": {
    "description": "vertical traffic light",
    "names": [
      "vertical_traffic_light"
    ],
    "tags": [
      "semaphore"
    ]
  },
  "🚥": {
    "description": "horizontal traffic light",
    "names": [
      "traffic_light"
    ],
    "tags": []
  },
  "⚠️": {
    "description": "warning sign",
    "names": [
      "warning"
    ],
    "tags": [
      "wip"
    ]
  },
  "🚧": {
    "description": "construction sign",
    "names": [
      "construction"
    ],
    "tags": [
      "wip"
    ]
  },
  "🔰": {
    "description": "japanese symbol for beginner",
    "names": [
      "beginner"
    ],
    "tags": []
  },
  "⛽": {
    "description": "fuel pump",
    "names": [
      "fuelpump"
    ],
    "tags": []
  },
  "🏮": {
    "description": "izakaya lantern",
    "names": [
      "izakaya_lantern",
      "lantern"
    ],
    "tags": []
  },
  "🎰": {
    "description": "slot machine",
    "names": [
      "slot_machine"
    ],
    "tags": []
  },
  "♨️": {
    "description": "hot springs",
    "names": [
      "hotsprings"
    ],
    "tags": []
  },
  "🗿": {
    "description": "moyai",
    "names": [
      "moyai"
    ],
    "tags": [
      "stone"
    ]
  },
  "🎪": {
    "description": "circus tent",
    "names": [
      "circus_tent"
    ],
    "tags": []
  },
  "🎭": {
    "description": "performing arts",
    "names": [
      "performing_arts"
    ],
    "tags": [
      "theater",
      "drama"
    ]
  },
  "📍": {
    "description": "round pushpin",
    "names": [
      "round_pushpin"
    ],
    "tags": [
      "location"
    ]
  },
  "🚩": {
    "description": "triangular flag on post",
    "names": [
      "triangular_flag_on_post"
    ],
    "tags": []
  },
  "🇯🇵": {
    "description": "regional indicator symbol letter j + regional indicator symbol letter p",
    "names": [
      "jp"
    ],
    "tags": [
      "japan"
    ]
  },
  "🇰🇷": {
    "description": "regional indicator symbol letter k + regional indicator symbol letter r",
    "names": [
      "kr"
    ],
    "tags": [
      "korea"
    ]
  },
  "🇩🇪": {
    "description": "regional indicator symbol letter d + regional indicator symbol letter e",
    "names": [
      "de"
    ],
    "tags": [
      "flag",
      "germany"
    ]
  },
  "🇨🇳": {
    "description": "regional indicator symbol letter c + regional indicator symbol letter n",
    "names": [
      "cn"
    ],
    "tags": [
      "china"
    ]
  },
  "🇺🇸": {
    "description": "regional indicator symbol letter u + regional indicator symbol letter s",
    "names": [
      "us"
    ],
    "tags": [
      "flag",
      "united",
      "america"
    ]
  },
  "🇫🇷": {
    "description": "regional indicator symbol letter f + regional indicator symbol letter r",
    "names": [
      "fr"
    ],
    "tags": [
      "france",
      "french"
    ]
  },
  "🇪🇸": {
    "description": "regional indicator symbol letter e + regional indicator symbol letter s",
    "names": [
      "es"
    ],
    "tags": [
      "spain"
    ]
  },
  "🇮🇹": {
    "description": "regional indicator symbol letter i + regional indicator symbol letter t",
    "names": [
      "it"
    ],
    "tags": [
      "italy"
    ]
  },
  "🇷🇺": {
    "description": "regional indicator symbol letter r + regional indicator symbol letter u",
    "names": [
      "ru"
    ],
    "tags": [
      "russia"
    ]
  },
  "🇬🇧": {
    "description": "regional indicator symbol letter g + regional indicator symbol letter b",
    "names": [
      "gb",
      "uk"
    ],
    "tags": [
      "flag",
      "british"
    ]
  },
  "1️⃣": {
    "description": "digit one + combining enclosing keycap",
    "names": [
      "one"
    ],
    "tags": []
  },
  "2️⃣": {
    "description": "digit two + combining enclosing keycap",
    "names": [
      "two"
    ],
    "tags": []
  },
  "3️⃣": {
    "description": "digit three + combining enclosing keycap",
    "names": [
      "three"
    ],
    "tags": []
  },
  "4️⃣": {
    "description": "digit four + combining enclosing keycap",
    "names": [
      "four"
    ],
    "tags": []
  },
  "5️⃣": {
    "description": "digit five + combining enclosing keycap",
    "names": [
      "five"
    ],
    "tags": []
  },
  "6️⃣": {
    "description": "digit six + combining enclosing keycap",
    "names": [
      "six"
    ],
    "tags": []
  },
  "7️⃣": {
    "description": "digit seven + combining enclosing keycap",
    "names": [
      "seven"
    ],
    "tags": []
  },
  "8️⃣": {
    "description": "digit eight + combining enclosing keycap",
    "names": [
      "eight"
    ],
    "tags": []
  },
  "9️⃣": {
    "description": "digit nine + combining enclosing keycap",
    "names": [
      "nine"
    ],
    "tags": []
  },
  "0️⃣": {
    "description": "digit zero + combining enclosing keycap",
    "names": [
      "zero"
    ],
    "tags": []
  },
  "🔟": {
    "description": "keycap ten",
    "names": [
      "keycap_ten"
    ],
    "tags": []
  },
  "🔢": {
    "description": "input symbol for numbers",
    "names": [
      "1234"
    ],
    "tags": [
      "numbers"
    ]
  },
  "#️⃣": {
    "description": "number sign + combining enclosing keycap",
    "names": [
      "hash"
    ],
    "tags": [
      "number"
    ]
  },
  "🔣": {
    "description": "input symbol for symbols",
    "names": [
      "symbols"
    ],
    "tags": []
  },
  "⬆️": {
    "description": "upwards black arrow",
    "names": [
      "arrow_up"
    ],
    "tags": []
  },
  "⬇️": {
    "description": "downwards black arrow",
    "names": [
      "arrow_down"
    ],
    "tags": []
  },
  "⬅️": {
    "description": "leftwards black arrow",
    "names": [
      "arrow_left"
    ],
    "tags": []
  },
  "➡️": {
    "description": "black rightwards arrow",
    "names": [
      "arrow_right"
    ],
    "tags": []
  },
  "🔠": {
    "description": "input symbol for latin capital letters",
    "names": [
      "capital_abcd"
    ],
    "tags": [
      "letters"
    ]
  },
  "🔡": {
    "description": "input symbol for latin small letters",
    "names": [
      "abcd"
    ],
    "tags": []
  },
  "🔤": {
    "description": "input symbol for latin letters",
    "names": [
      "abc"
    ],
    "tags": [
      "alphabet"
    ]
  },
  "↗️": {
    "description": "north east arrow",
    "names": [
      "arrow_upper_right"
    ],
    "tags": []
  },
  "↖️": {
    "description": "north west arrow",
    "names": [
      "arrow_upper_left"
    ],
    "tags": []
  },
  "↘️": {
    "description": "south east arrow",
    "names": [
      "arrow_lower_right"
    ],
    "tags": []
  },
  "↙️": {
    "description": "south west arrow",
    "names": [
      "arrow_lower_left"
    ],
    "tags": []
  },
  "↔️": {
    "description": "left right arrow",
    "names": [
      "left_right_arrow"
    ],
    "tags": []
  },
  "↕️": {
    "description": "up down arrow",
    "names": [
      "arrow_up_down"
    ],
    "tags": []
  },
  "🔄": {
    "description": "anticlockwise downwards and upwards open circle arrows",
    "names": [
      "arrows_counterclockwise"
    ],
    "tags": [
      "sync"
    ]
  },
  "◀️": {
    "description": "black left-pointing triangle",
    "names": [
      "arrow_backward"
    ],
    "tags": []
  },
  "▶️": {
    "description": "black right-pointing triangle",
    "names": [
      "arrow_forward"
    ],
    "tags": []
  },
  "🔼": {
    "description": "up-pointing small red triangle",
    "names": [
      "arrow_up_small"
    ],
    "tags": []
  },
  "🔽": {
    "description": "down-pointing small red triangle",
    "names": [
      "arrow_down_small"
    ],
    "tags": []
  },
  "↩️": {
    "description": "leftwards arrow with hook",
    "names": [
      "leftwards_arrow_with_hook"
    ],
    "tags": [
      "return"
    ]
  },
  "↪️": {
    "description": "rightwards arrow with hook",
    "names": [
      "arrow_right_hook"
    ],
    "tags": []
  },
  "ℹ️": {
    "description": "information source",
    "names": [
      "information_source"
    ],
    "tags": []
  },
  "⏪": {
    "description": "black left-pointing double triangle",
    "names": [
      "rewind"
    ],
    "tags": []
  },
  "⏩": {
    "description": "black right-pointing double triangle",
    "names": [
      "fast_forward"
    ],
    "tags": []
  },
  "⏫": {
    "description": "black up-pointing double triangle",
    "names": [
      "arrow_double_up"
    ],
    "tags": []
  },
  "⏬": {
    "description": "black down-pointing double triangle",
    "names": [
      "arrow_double_down"
    ],
    "tags": []
  },
  "⤵️": {
    "description": "arrow pointing rightwards then curving downwards",
    "names": [
      "arrow_heading_down"
    ],
    "tags": []
  },
  "⤴️": {
    "description": "arrow pointing rightwards then curving upwards",
    "names": [
      "arrow_heading_up"
    ],
    "tags": []
  },
  "🆗": {
    "description": "squared ok",
    "names": [
      "ok"
    ],
    "tags": [
      "yes"
    ]
  },
  "🔀": {
    "description": "twisted rightwards arrows",
    "names": [
      "twisted_rightwards_arrows"
    ],
    "tags": [
      "shuffle"
    ]
  },
  "🔁": {
    "description": "clockwise rightwards and leftwards open circle arrows",
    "names": [
      "repeat"
    ],
    "tags": [
      "loop"
    ]
  },
  "🔂": {
    "description": "clockwise rightwards and leftwards open circle arrows with circled one overlay",
    "names": [
      "repeat_one"
    ],
    "tags": []
  },
  "🆕": {
    "description": "squared new",
    "names": [
      "new"
    ],
    "tags": [
      "fresh"
    ]
  },
  "🆙": {
    "description": "squared up with exclamation mark",
    "names": [
      "up"
    ],
    "tags": []
  },
  "🆒": {
    "description": "squared cool",
    "names": [
      "cool"
    ],
    "tags": []
  },
  "🆓": {
    "description": "squared free",
    "names": [
      "free"
    ],
    "tags": []
  },
  "🆖": {
    "description": "squared ng",
    "names": [
      "ng"
    ],
    "tags": []
  },
  "📶": {
    "description": "antenna with bars",
    "names": [
      "signal_strength"
    ],
    "tags": [
      "wifi"
    ]
  },
  "🎦": {
    "description": "cinema",
    "names": [
      "cinema"
    ],
    "tags": [
      "film",
      "movie"
    ]
  },
  "🈁": {
    "description": "squared katakana koko",
    "names": [
      "koko"
    ],
    "tags": []
  },
  "🈯": {
    "description": "squared cjk unified ideograph-6307",
    "names": [
      "u6307"
    ],
    "tags": []
  },
  "🈳": {
    "description": "squared cjk unified ideograph-7a7a",
    "names": [
      "u7a7a"
    ],
    "tags": []
  },
  "🈵": {
    "description": "squared cjk unified ideograph-6e80",
    "names": [
      "u6e80"
    ],
    "tags": []
  },
  "🈴": {
    "description": "squared cjk unified ideograph-5408",
    "names": [
      "u5408"
    ],
    "tags": []
  },
  "🈲": {
    "description": "squared cjk unified ideograph-7981",
    "names": [
      "u7981"
    ],
    "tags": []
  },
  "🉐": {
    "description": "circled ideograph advantage",
    "names": [
      "ideograph_advantage"
    ],
    "tags": []
  },
  "🈹": {
    "description": "squared cjk unified ideograph-5272",
    "names": [
      "u5272"
    ],
    "tags": []
  },
  "🈺": {
    "description": "squared cjk unified ideograph-55b6",
    "names": [
      "u55b6"
    ],
    "tags": []
  },
  "🈶": {
    "description": "squared cjk unified ideograph-6709",
    "names": [
      "u6709"
    ],
    "tags": []
  },
  "🈚": {
    "description": "squared cjk unified ideograph-7121",
    "names": [
      "u7121"
    ],
    "tags": []
  },
  "🚻": {
    "description": "restroom",
    "names": [
      "restroom"
    ],
    "tags": [
      "toilet"
    ]
  },
  "🚹": {
    "description": "mens symbol",
    "names": [
      "mens"
    ],
    "tags": []
  },
  "🚺": {
    "description": "womens symbol",
    "names": [
      "womens"
    ],
    "tags": []
  },
  "🚼": {
    "description": "baby symbol",
    "names": [
      "baby_symbol"
    ],
    "tags": []
  },
  "🚾": {
    "description": "water closet",
    "names": [
      "wc"
    ],
    "tags": [
      "toilet",
      "restroom"
    ]
  },
  "🚰": {
    "description": "potable water symbol",
    "names": [
      "potable_water"
    ],
    "tags": []
  },
  "🚮": {
    "description": "put litter in its place symbol",
    "names": [
      "put_litter_in_its_place"
    ],
    "tags": []
  },
  "🅿️": {
    "description": "negative squared latin capital letter p",
    "names": [
      "parking"
    ],
    "tags": []
  },
  "♿": {
    "description": "wheelchair symbol",
    "names": [
      "wheelchair"
    ],
    "tags": [
      "accessibility"
    ]
  },
  "🚭": {
    "description": "no smoking symbol",
    "names": [
      "no_smoking"
    ],
    "tags": []
  },
  "🈷️": {
    "description": "squared cjk unified ideograph-6708",
    "names": [
      "u6708"
    ],
    "tags": []
  },
  "🈸": {
    "description": "squared cjk unified ideograph-7533",
    "names": [
      "u7533"
    ],
    "tags": []
  },
  "🈂️": {
    "description": "squared katakana sa",
    "names": [
      "sa"
    ],
    "tags": []
  },
  "Ⓜ️": {
    "description": "circled latin capital letter m",
    "names": [
      "m"
    ],
    "tags": []
  },
  "🛂": {
    "description": "passport control",
    "names": [
      "passport_control"
    ],
    "tags": []
  },
  "🛄": {
    "description": "baggage claim",
    "names": [
      "baggage_claim"
    ],
    "tags": [
      "airport"
    ]
  },
  "🛅": {
    "description": "left luggage",
    "names": [
      "left_luggage"
    ],
    "tags": []
  },
  "🛃": {
    "description": "customs",
    "names": [
      "customs"
    ],
    "tags": []
  },
  "🉑": {
    "description": "circled ideograph accept",
    "names": [
      "accept"
    ],
    "tags": []
  },
  "㊙️": {
    "description": "circled ideograph secret",
    "names": [
      "secret"
    ],
    "tags": []
  },
  "㊗️": {
    "description": "circled ideograph congratulation",
    "names": [
      "congratulations"
    ],
    "tags": []
  },
  "🆑": {
    "description": "squared cl",
    "names": [
      "cl"
    ],
    "tags": []
  },
  "🆘": {
    "description": "squared sos",
    "names": [
      "sos"
    ],
    "tags": [
      "help",
      "emergency"
    ]
  },
  "🆔": {
    "description": "squared id",
    "names": [
      "id"
    ],
    "tags": []
  },
  "🚫": {
    "description": "no entry sign",
    "names": [
      "no_entry_sign"
    ],
    "tags": [
      "block",
      "forbidden"
    ]
  },
  "🔞": {
    "description": "no one under eighteen symbol",
    "names": [
      "underage"
    ],
    "tags": []
  },
  "📵": {
    "description": "no mobile phones",
    "names": [
      "no_mobile_phones"
    ],
    "tags": []
  },
  "🚯": {
    "description": "do not litter symbol",
    "names": [
      "do_not_litter"
    ],
    "tags": []
  },
  "🚱": {
    "description": "non-potable water symbol",
    "names": [
      "non-potable_water"
    ],
    "tags": []
  },
  "🚳": {
    "description": "no bicycles",
    "names": [
      "no_bicycles"
    ],
    "tags": []
  },
  "🚷": {
    "description": "no pedestrians",
    "names": [
      "no_pedestrians"
    ],
    "tags": []
  },
  "🚸": {
    "description": "children crossing",
    "names": [
      "children_crossing"
    ],
    "tags": []
  },
  "⛔": {
    "description": "no entry",
    "names": [
      "no_entry"
    ],
    "tags": [
      "limit"
    ]
  },
  "✳️": {
    "description": "eight spoked asterisk",
    "names": [
      "eight_spoked_asterisk"
    ],
    "tags": []
  },
  "❇️": {
    "description": "sparkle",
    "names": [
      "sparkle"
    ],
    "tags": []
  },
  "❎": {
    "description": "negative squared cross mark",
    "names": [
      "negative_squared_cross_mark"
    ],
    "tags": []
  },
  "✅": {
    "description": "white heavy check mark",
    "names": [
      "white_check_mark"
    ],
    "tags": []
  },
  "✴️": {
    "description": "eight pointed black star",
    "names": [
      "eight_pointed_black_star"
    ],
    "tags": []
  },
  "💟": {
    "description": "heart decoration",
    "names": [
      "heart_decoration"
    ],
    "tags": []
  },
  "🆚": {
    "description": "squared vs",
    "names": [
      "vs"
    ],
    "tags": []
  },
  "📳": {
    "description": "vibration mode",
    "names": [
      "vibration_mode"
    ],
    "tags": []
  },
  "📴": {
    "description": "mobile phone off",
    "names": [
      "mobile_phone_off"
    ],
    "tags": [
      "mute",
      "off"
    ]
  },
  "🅰️": {
    "description": "negative squared latin capital letter a",
    "names": [
      "a"
    ],
    "tags": []
  },
  "🅱️": {
    "description": "negative squared latin capital letter b",
    "names": [
      "b"
    ],
    "tags": []
  },
  "🆎": {
    "description": "negative squared ab",
    "names": [
      "ab"
    ],
    "tags": []
  },
  "🅾️": {
    "description": "negative squared latin capital letter o",
    "names": [
      "o2"
    ],
    "tags": []
  },
  "💠": {
    "description": "diamond shape with a dot inside",
    "names": [
      "diamond_shape_with_a_dot_inside"
    ],
    "tags": []
  },
  "➿": {
    "description": "double curly loop",
    "names": [
      "loop"
    ],
    "tags": []
  },
  "♻️": {
    "description": "black universal recycling symbol",
    "names": [
      "recycle"
    ],
    "tags": [
      "environment",
      "green"
    ]
  },
  "♈": {
    "description": "aries",
    "names": [
      "aries"
    ],
    "tags": []
  },
  "♉": {
    "description": "taurus",
    "names": [
      "taurus"
    ],
    "tags": []
  },
  "♊": {
    "description": "gemini",
    "names": [
      "gemini"
    ],
    "tags": []
  },
  "♋": {
    "description": "cancer",
    "names": [
      "cancer"
    ],
    "tags": []
  },
  "♌": {
    "description": "leo",
    "names": [
      "leo"
    ],
    "tags": []
  },
  "♍": {
    "description": "virgo",
    "names": [
      "virgo"
    ],
    "tags": []
  },
  "♎": {
    "description": "libra",
    "names": [
      "libra"
    ],
    "tags": []
  },
  "♏": {
    "description": "scorpius",
    "names": [
      "scorpius"
    ],
    "tags": []
  },
  "♐": {
    "description": "sagittarius",
    "names": [
      "sagittarius"
    ],
    "tags": []
  },
  "♑": {
    "description": "capricorn",
    "names": [
      "capricorn"
    ],
    "tags": []
  },
  "♒": {
    "description": "aquarius",
    "names": [
      "aquarius"
    ],
    "tags": []
  },
  "♓": {
    "description": "pisces",
    "names": [
      "pisces"
    ],
    "tags": []
  },
  "⛎": {
    "description": "ophiuchus",
    "names": [
      "ophiuchus"
    ],
    "tags": []
  },
  "🔯": {
    "description": "six pointed star with middle dot",
    "names": [
      "six_pointed_star"
    ],
    "tags": []
  },
  "🏧": {
    "description": "automated teller machine",
    "names": [
      "atm"
    ],
    "tags": []
  },
  "💹": {
    "description": "chart with upwards trend and yen sign",
    "names": [
      "chart"
    ],
    "tags": []
  },
  "💲": {
    "description": "heavy dollar sign",
    "names": [
      "heavy_dollar_sign"
    ],
    "tags": []
  },
  "💱": {
    "description": "currency exchange",
    "names": [
      "currency_exchange"
    ],
    "tags": []
  },
  "©️": {
    "description": "copyright sign",
    "names": [
      "copyright"
    ],
    "tags": []
  },
  "®️": {
    "description": "registered sign",
    "names": [
      "registered"
    ],
    "tags": []
  },
  "™️": {
    "description": "trade mark sign",
    "names": [
      "tm"
    ],
    "tags": [
      "trademark"
    ]
  },
  "❌": {
    "description": "cross mark",
    "names": [
      "x"
    ],
    "tags": []
  },
  "‼️": {
    "description": "double exclamation mark",
    "names": [
      "bangbang"
    ],
    "tags": []
  },
  "⁉️": {
    "description": "exclamation question mark",
    "names": [
      "interrobang"
    ],
    "tags": []
  },
  "❗": {
    "description": "heavy exclamation mark symbol",
    "names": [
      "exclamation",
      "heavy_exclamation_mark"
    ],
    "tags": [
      "bang"
    ]
  },
  "❓": {
    "description": "black question mark ornament",
    "names": [
      "question"
    ],
    "tags": [
      "confused"
    ]
  },
  "❕": {
    "description": "white exclamation mark ornament",
    "names": [
      "grey_exclamation"
    ],
    "tags": []
  },
  "❔": {
    "description": "white question mark ornament",
    "names": [
      "grey_question"
    ],
    "tags": []
  },
  "⭕": {
    "description": "heavy large circle",
    "names": [
      "o"
    ],
    "tags": []
  },
  "🔝": {
    "description": "top with upwards arrow above",
    "names": [
      "top"
    ],
    "tags": []
  },
  "🔚": {
    "description": "end with leftwards arrow above",
    "names": [
      "end"
    ],
    "tags": []
  },
  "🔙": {
    "description": "back with leftwards arrow above",
    "names": [
      "back"
    ],
    "tags": []
  },
  "🔛": {
    "description": "on with exclamation mark with left right arrow above",
    "names": [
      "on"
    ],
    "tags": []
  },
  "🔜": {
    "description": "soon with rightwards arrow above",
    "names": [
      "soon"
    ],
    "tags": []
  },
  "🔃": {
    "description": "clockwise downwards and upwards open circle arrows",
    "names": [
      "arrows_clockwise"
    ],
    "tags": []
  },
  "🕛": {
    "description": "clock face twelve oclock",
    "names": [
      "clock12"
    ],
    "tags": []
  },
  "🕧": {
    "description": "clock face twelve-thirty",
    "names": [
      "clock1230"
    ],
    "tags": []
  },
  "🕐": {
    "description": "clock face one oclock",
    "names": [
      "clock1"
    ],
    "tags": []
  },
  "🕜": {
    "description": "clock face one-thirty",
    "names": [
      "clock130"
    ],
    "tags": []
  },
  "🕑": {
    "description": "clock face two oclock",
    "names": [
      "clock2"
    ],
    "tags": []
  },
  "🕝": {
    "description": "clock face two-thirty",
    "names": [
      "clock230"
    ],
    "tags": []
  },
  "🕒": {
    "description": "clock face three oclock",
    "names": [
      "clock3"
    ],
    "tags": []
  },
  "🕞": {
    "description": "clock face three-thirty",
    "names": [
      "clock330"
    ],
    "tags": []
  },
  "🕓": {
    "description": "clock face four oclock",
    "names": [
      "clock4"
    ],
    "tags": []
  },
  "🕟": {
    "description": "clock face four-thirty",
    "names": [
      "clock430"
    ],
    "tags": []
  },
  "🕔": {
    "description": "clock face five oclock",
    "names": [
      "clock5"
    ],
    "tags": []
  },
  "🕠": {
    "description": "clock face five-thirty",
    "names": [
      "clock530"
    ],
    "tags": []
  },
  "🕕": {
    "description": "clock face six oclock",
    "names": [
      "clock6"
    ],
    "tags": []
  },
  "🕖": {
    "description": "clock face seven oclock",
    "names": [
      "clock7"
    ],
    "tags": []
  },
  "🕗": {
    "description": "clock face eight oclock",
    "names": [
      "clock8"
    ],
    "tags": []
  },
  "🕘": {
    "description": "clock face nine oclock",
    "names": [
      "clock9"
    ],
    "tags": []
  },
  "🕙": {
    "description": "clock face ten oclock",
    "names": [
      "clock10"
    ],
    "tags": []
  },
  "🕚": {
    "description": "clock face eleven oclock",
    "names": [
      "clock11"
    ],
    "tags": []
  },
  "🕡": {
    "description": "clock face six-thirty",
    "names": [
      "clock630"
    ],
    "tags": []
  },
  "🕢": {
    "description": "clock face seven-thirty",
    "names": [
      "clock730"
    ],
    "tags": []
  },
  "🕣": {
    "description": "clock face eight-thirty",
    "names": [
      "clock830"
    ],
    "tags": []
  },
  "🕤": {
    "description": "clock face nine-thirty",
    "names": [
      "clock930"
    ],
    "tags": []
  },
  "🕥": {
    "description": "clock face ten-thirty",
    "names": [
      "clock1030"
    ],
    "tags": []
  },
  "🕦": {
    "description": "clock face eleven-thirty",
    "names": [
      "clock1130"
    ],
    "tags": []
  },
  "✖️": {
    "description": "heavy multiplication x",
    "names": [
      "heavy_multiplication_x"
    ],
    "tags": []
  },
  "➕": {
    "description": "heavy plus sign",
    "names": [
      "heavy_plus_sign"
    ],
    "tags": []
  },
  "➖": {
    "description": "heavy minus sign",
    "names": [
      "heavy_minus_sign"
    ],
    "tags": []
  },
  "➗": {
    "description": "heavy division sign",
    "names": [
      "heavy_division_sign"
    ],
    "tags": []
  },
  "♠️": {
    "description": "black spade suit",
    "names": [
      "spades"
    ],
    "tags": []
  },
  "♥️": {
    "description": "black heart suit",
    "names": [
      "hearts"
    ],
    "tags": []
  },
  "♣️": {
    "description": "black club suit",
    "names": [
      "clubs"
    ],
    "tags": []
  },
  "♦️": {
    "description": "black diamond suit",
    "names": [
      "diamonds"
    ],
    "tags": []
  },
  "💮": {
    "description": "white flower",
    "names": [
      "white_flower"
    ],
    "tags": []
  },
  "💯": {
    "description": "hundred points symbol",
    "names": [
      "100"
    ],
    "tags": [
      "score",
      "perfect"
    ]
  },
  "✔️": {
    "description": "heavy check mark",
    "names": [
      "heavy_check_mark"
    ],
    "tags": []
  },
  "☑️": {
    "description": "ballot box with check",
    "names": [
      "ballot_box_with_check"
    ],
    "tags": []
  },
  "🔘": {
    "description": "radio button",
    "names": [
      "radio_button"
    ],
    "tags": []
  },
  "🔗": {
    "description": "link symbol",
    "names": [
      "link"
    ],
    "tags": []
  },
  "➰": {
    "description": "curly loop",
    "names": [
      "curly_loop"
    ],
    "tags": []
  },
  "〰️": {
    "description": "wavy dash",
    "names": [
      "wavy_dash"
    ],
    "tags": []
  },
  "〽️": {
    "description": "part alternation mark",
    "names": [
      "part_alternation_mark"
    ],
    "tags": []
  },
  "🔱": {
    "description": "trident emblem",
    "names": [
      "trident"
    ],
    "tags": []
  },
  "◼️": {
    "description": "black medium square",
    "names": [
      "black_medium_square"
    ],
    "tags": []
  },
  "◻️": {
    "description": "white medium square",
    "names": [
      "white_medium_square"
    ],
    "tags": []
  },
  "◾": {
    "description": "black medium small square",
    "names": [
      "black_medium_small_square"
    ],
    "tags": []
  },
  "◽": {
    "description": "white medium small square",
    "names": [
      "white_medium_small_square"
    ],
    "tags": []
  },
  "▪️": {
    "description": "black small square",
    "names": [
      "black_small_square"
    ],
    "tags": []
  },
  "▫️": {
    "description": "white small square",
    "names": [
      "white_small_square"
    ],
    "tags": []
  },
  "🔺": {
    "description": "up-pointing red triangle",
    "names": [
      "small_red_triangle"
    ],
    "tags": []
  },
  "🔲": {
    "description": "black square button",
    "names": [
      "black_square_button"
    ],
    "tags": []
  },
  "🔳": {
    "description": "white square button",
    "names": [
      "white_square_button"
    ],
    "tags": []
  },
  "⚫": {
    "description": "medium black circle",
    "names": [
      "black_circle"
    ],
    "tags": []
  },
  "⚪": {
    "description": "medium white circle",
    "names": [
      "white_circle"
    ],
    "tags": []
  },
  "🔴": {
    "description": "large red circle",
    "names": [
      "red_circle"
    ],
    "tags": []
  },
  "🔵": {
    "description": "large blue circle",
    "names": [
      "large_blue_circle"
    ],
    "tags": []
  },
  "🔻": {
    "description": "down-pointing red triangle",
    "names": [
      "small_red_triangle_down"
    ],
    "tags": []
  },
  "⬜": {
    "description": "white large square",
    "names": [
      "white_large_square"
    ],
    "tags": []
  },
  "⬛": {
    "description": "black large square",
    "names": [
      "black_large_square"
    ],
    "tags": []
  },
  "🔶": {
    "description": "large orange diamond",
    "names": [
      "large_orange_diamond"
    ],
    "tags": []
  },
  "🔷": {
    "description": "large blue diamond",
    "names": [
      "large_blue_diamond"
    ],
    "tags": []
  },
  "🔸": {
    "description": "small orange diamond",
    "names": [
      "small_orange_diamond"
    ],
    "tags": []
  },
  "🔹": {
    "description": "small blue diamond",
    "names": [
      "small_blue_diamond"
    ],
    "tags": []
  }
});

require.register("wooorm~nlcst-to-string@0.1.2", function (exports, module) {
'use strict';

/**
 * Stringify an NLCST node.
 *
 * @param {NLCSTNode} nlcst
 * @return {string}
 */

function nlcstToString(nlcst) {
    var values,
        length,
        children;

    if (nlcst.value) {
        return nlcst.value;
    }

    children = nlcst.children;
    length = children.length;

    /**
     * Shortcut: This is pretty common, and a small performance win.
     */

    if (length === 1 && 'value' in children[0]) {
        return children[0].value;
    }

    values = [];

    while (length--) {
        values[length] = nlcstToString(children[length]);
    }

    return values.join('');
}

module.exports = nlcstToString;

});

require.register("wooorm~nlcst-emoji-modifier@0.0.1", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var emoji,
    nlcstToString;

emoji = require('wooorm~nlcst-emoji-modifier@0.0.1/data/emoji.json');
nlcstToString = require('wooorm~nlcst-to-string@0.1.2');

/**
 * Cached methods.
 */

var has;

has = Object.prototype.hasOwnProperty;

/**
 * Constants: node types.
 */

var EMOTICON_NODE;

EMOTICON_NODE = 'EmoticonNode';

/**
 * Constants: magic numbers.
 *
 * Gemoji's are treated by a parser as multiple nodes.
 * Because this modifier walks backwards, the first colon
 * never matches a gemoji it would normaly walk back to
 * the beginning (the first node). However, because the
 * longest gemoji is tokenized as `Punctuation` (`:`),
 * `Punctuation` (`+`), `Word` (`1`), and `Punctuation`
 * (`:`), we can safely break when the modifier walked
 * back more than 4 times.
 */

var MAX_GEMOJI_PART_COUNT;

MAX_GEMOJI_PART_COUNT = 4;

/**
 * Constants for emoji.
 */

var index,
    names,
    shortcodes,
    unicodes,
    unicodeKeys;

names = emoji.names;
unicodeKeys = emoji.unicode;

/**
 * Quick access to short-codes.
 */

unicodes = {};

index = -1;

while (unicodeKeys[++index]) {
    unicodes[unicodeKeys[index]] = true;
}

shortcodes = {};

index = -1;

while (names[++index]) {
    shortcodes[':' + names[index] + ':'] = true;
}

/**
 * Merge emoji and github-emoji (punctuation marks,
 * symbols, and words) into an `EmoticonNode`.
 *
 * @param {CSTNode} child
 * @param {number} index
 * @param {CSTNode} parent
 * @return {undefined|number} - Either void, or the
 *   next index to iterate over.
 */

function mergeEmoji(child, index, parent) {
    var siblings,
        siblingIndex,
        node,
        nodes,
        value;

    siblings = parent.children;

    if (child.type === 'WordNode') {
        value = nlcstToString(child);

        /**
         * Sometimes a unicode emoji is marked as a
         * word. Mark it as an `EmoticonNode`.
         */

        if (has.call(unicodes, value)) {
            siblings[index] = {
                'type': EMOTICON_NODE,
                'value': value
            };
        } else {
            /**
             * Sometimes a unicode emoji is split in two.
             * Remove the last and add its value to
             * the first.
             */

            node = siblings[index - 1];

            if (
                node &&
                has.call(unicodes, nlcstToString(node) + value)
            ) {
                node.type = EMOTICON_NODE;
                node.value = nlcstToString(node) + value;

                siblings.splice(index, 1);

                return index;
            }
        }
    } else if (has.call(unicodes, nlcstToString(child))) {
        child.type = EMOTICON_NODE;
    } else if (nlcstToString(child) === ':') {
        nodes = [];
        siblingIndex = index;

        while (siblingIndex--) {
            if ((index - siblingIndex) >= MAX_GEMOJI_PART_COUNT) {
                return;
            }

            node = siblings[siblingIndex];

            if (node.children) {
                nodes = nodes.concat(node.children.concat().reverse());
            } else {
                nodes.push(node);
            }

            if (nlcstToString(node) === ':') {
                break;
            }

            if (siblingIndex === 0) {
                return;
            }
        }

        nodes.reverse().push(child);

        value = nlcstToString({
            'children': nodes
        });

        if (!has.call(shortcodes, value)) {
            return;
        }

        siblings.splice(siblingIndex, index - siblingIndex);

        child.type = EMOTICON_NODE;
        child.value = value;

        return siblingIndex + 1;
    }
}

/**
 * Move emoticons following a terminal marker (thus in
 * the next sentence) to the previous sentence.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function mergeAffixEmoji(child, index, parent) {
    var children,
        prev,
        position,
        node;

    children = child.children;

    if (
        children &&
        children.length &&
        index !== 0
    ) {
        position = -1;

        while (children[++position]) {
            node = children[position];

            if (node.type === EMOTICON_NODE) {
                prev = parent.children[index - 1];

                prev.children = prev.children.concat(
                    children.slice(0, position + 1)
                );

                child.children = children.slice(position + 1);

                /**
                 * Next, iterate over the node again.
                 */

                return index;
            } else if (node.type !== 'WhiteSpaceNode') {
                break;
            }
        }
    }
}

var emojiModifier,
    affixEmojiModifier;

function attach(parser) {
    var paragraphPlugins;

    if (!parser || !parser.parse) {
        throw new Error(
            '`parser` is not a valid parser for ' +
            '`attach(parser)`. Make sure something ' +
            'like `parse-latin` is passed.'
        );
    }

    /**
     * Make sure to not re-attach the modifiers.
     */

    if (!emojiModifier) {
        emojiModifier = parser.constructor.modifier(mergeEmoji);
        affixEmojiModifier = parser.constructor.modifier(mergeAffixEmoji);
    }

    parser.use('tokenizeSentence', emojiModifier);

    /**
     * Adding the paragraph modifier is a bit non-standard.
     * Reasoning is first of all, to not worry about white
     * space nodes between sentences: at this stage,
     * paragraph only consists of `SentenceNode`s.
     * Additionally, adding it before all other modifiers
     * makes sure that sentences starting with a lower case
     * letter still get matched correctly:
     *
     *     Alfred! :+1: bertrand
     *
     * ...is correctly classified as one sentence, and:
     *
     *     Alfred! :+1: Bertrand
     *
     * ...is correctly classified as `SentenceNode`
     * (`Alfred! :+1:`), `WhiteSpaceNode` and
     * `SentenceNode` (`Bertrand`).
     */

    paragraphPlugins = parser.tokenizeParagraphPlugins;

    if (paragraphPlugins.indexOf(affixEmojiModifier) === -1) {
        parser.tokenizeParagraphPlugins.unshift(affixEmojiModifier);
    }
}

/**
 * Expose `attach`.
 */

module.exports = attach;

});

require.define("wooorm~nlcst-emoji-modifier@0.0.1/data/emoji.json", {
  "unicode": [
    "😄",
    "😃",
    "😀",
    "😊",
    "☺️",
    "😉",
    "😍",
    "😘",
    "😚",
    "😗",
    "😙",
    "😜",
    "😝",
    "😛",
    "😳",
    "😁",
    "😔",
    "😌",
    "😒",
    "😞",
    "😣",
    "😢",
    "😂",
    "😭",
    "😪",
    "😥",
    "😰",
    "😅",
    "😓",
    "😩",
    "😫",
    "😨",
    "😱",
    "😠",
    "😡",
    "😤",
    "😖",
    "😆",
    "😋",
    "😷",
    "😎",
    "😴",
    "😵",
    "😲",
    "😟",
    "😦",
    "😧",
    "😈",
    "👿",
    "😮",
    "😬",
    "😐",
    "😕",
    "😯",
    "😶",
    "😇",
    "😏",
    "😑",
    "👲",
    "👳",
    "👮",
    "👷",
    "💂",
    "👶",
    "👦",
    "👧",
    "👨",
    "👩",
    "👴",
    "👵",
    "👱",
    "👼",
    "👸",
    "😺",
    "😸",
    "😻",
    "😽",
    "😼",
    "🙀",
    "😿",
    "😹",
    "😾",
    "👹",
    "👺",
    "🙈",
    "🙉",
    "🙊",
    "💀",
    "👽",
    "💩",
    "🔥",
    "✨",
    "🌟",
    "💫",
    "💥",
    "💢",
    "💦",
    "💧",
    "💤",
    "💨",
    "👂",
    "👀",
    "👃",
    "👅",
    "👄",
    "👍",
    "👎",
    "👌",
    "👊",
    "✊",
    "✌️",
    "👋",
    "✋",
    "👐",
    "👆",
    "👇",
    "👉",
    "👈",
    "🙌",
    "🙏",
    "☝️",
    "👏",
    "💪",
    "🚶",
    "🏃",
    "💃",
    "👫",
    "👪",
    "👬",
    "👭",
    "💏",
    "💑",
    "👯",
    "🙆",
    "🙅",
    "💁",
    "🙋",
    "💆",
    "💇",
    "💅",
    "👰",
    "🙎",
    "🙍",
    "🙇",
    "🎩",
    "👑",
    "👒",
    "👟",
    "👞",
    "👡",
    "👠",
    "👢",
    "👕",
    "👔",
    "👚",
    "👗",
    "🎽",
    "👖",
    "👘",
    "👙",
    "💼",
    "👜",
    "👝",
    "👛",
    "👓",
    "🎀",
    "🌂",
    "💄",
    "💛",
    "💙",
    "💜",
    "💚",
    "❤️",
    "💔",
    "💗",
    "💓",
    "💕",
    "💖",
    "💞",
    "💘",
    "💌",
    "💋",
    "💍",
    "💎",
    "👤",
    "👥",
    "💬",
    "👣",
    "💭",
    "🐶",
    "🐺",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🐸",
    "🐯",
    "🐨",
    "🐻",
    "🐷",
    "🐽",
    "🐮",
    "🐗",
    "🐵",
    "🐒",
    "🐴",
    "🐑",
    "🐘",
    "🐼",
    "🐧",
    "🐦",
    "🐤",
    "🐥",
    "🐣",
    "🐔",
    "🐍",
    "🐢",
    "🐛",
    "🐝",
    "🐜",
    "🐞",
    "🐌",
    "🐙",
    "🐚",
    "🐠",
    "🐟",
    "🐬",
    "🐳",
    "🐋",
    "🐄",
    "🐏",
    "🐀",
    "🐃",
    "🐅",
    "🐇",
    "🐉",
    "🐎",
    "🐐",
    "🐓",
    "🐕",
    "🐖",
    "🐁",
    "🐂",
    "🐲",
    "🐡",
    "🐊",
    "🐫",
    "🐪",
    "🐆",
    "🐈",
    "🐩",
    "🐾",
    "💐",
    "🌸",
    "🌷",
    "🍀",
    "🌹",
    "🌻",
    "🌺",
    "🍁",
    "🍃",
    "🍂",
    "🌿",
    "🌾",
    "🍄",
    "🌵",
    "🌴",
    "🌲",
    "🌳",
    "🌰",
    "🌱",
    "🌼",
    "🌐",
    "🌞",
    "🌝",
    "🌚",
    "🌑",
    "🌒",
    "🌓",
    "🌔",
    "🌕",
    "🌖",
    "🌗",
    "🌘",
    "🌜",
    "🌛",
    "🌙",
    "🌍",
    "🌎",
    "🌏",
    "🌋",
    "🌌",
    "🌠",
    "⭐",
    "☀️",
    "⛅",
    "☁️",
    "⚡",
    "☔",
    "❄️",
    "⛄",
    "🌀",
    "🌁",
    "🌈",
    "🌊",
    "🎍",
    "💝",
    "🎎",
    "🎒",
    "🎓",
    "🎏",
    "🎆",
    "🎇",
    "🎐",
    "🎑",
    "🎃",
    "👻",
    "🎅",
    "🎄",
    "🎁",
    "🎋",
    "🎉",
    "🎊",
    "🎈",
    "🎌",
    "🔮",
    "🎥",
    "📷",
    "📹",
    "📼",
    "💿",
    "📀",
    "💽",
    "💾",
    "💻",
    "📱",
    "☎️",
    "📞",
    "📟",
    "📠",
    "📡",
    "📺",
    "📻",
    "🔊",
    "🔉",
    "🔈",
    "🔇",
    "🔔",
    "🔕",
    "📢",
    "📣",
    "⏳",
    "⌛",
    "⏰",
    "⌚",
    "🔓",
    "🔒",
    "🔏",
    "🔐",
    "🔑",
    "🔎",
    "💡",
    "🔦",
    "🔆",
    "🔅",
    "🔌",
    "🔋",
    "🔍",
    "🛁",
    "🛀",
    "🚿",
    "🚽",
    "🔧",
    "🔩",
    "🔨",
    "🚪",
    "🚬",
    "💣",
    "🔫",
    "🔪",
    "💊",
    "💉",
    "💰",
    "💴",
    "💵",
    "💷",
    "💶",
    "💳",
    "💸",
    "📲",
    "📧",
    "📥",
    "📤",
    "✉️",
    "📩",
    "📨",
    "📯",
    "📫",
    "📪",
    "📬",
    "📭",
    "📮",
    "📦",
    "📝",
    "📄",
    "📃",
    "📑",
    "📊",
    "📈",
    "📉",
    "📜",
    "📋",
    "📅",
    "📆",
    "📇",
    "📁",
    "📂",
    "✂️",
    "📌",
    "📎",
    "✒️",
    "✏️",
    "📏",
    "📐",
    "📕",
    "📗",
    "📘",
    "📙",
    "📓",
    "📔",
    "📒",
    "📚",
    "📖",
    "🔖",
    "📛",
    "🔬",
    "🔭",
    "📰",
    "🎨",
    "🎬",
    "🎤",
    "🎧",
    "🎼",
    "🎵",
    "🎶",
    "🎹",
    "🎻",
    "🎺",
    "🎷",
    "🎸",
    "👾",
    "🎮",
    "🃏",
    "🎴",
    "🀄",
    "🎲",
    "🎯",
    "🏈",
    "🏀",
    "⚽",
    "⚾️",
    "🎾",
    "🎱",
    "🏉",
    "🎳",
    "⛳",
    "🚵",
    "🚴",
    "🏁",
    "🏇",
    "🏆",
    "🎿",
    "🏂",
    "🏊",
    "🏄",
    "🎣",
    "☕",
    "🍵",
    "🍶",
    "🍼",
    "🍺",
    "🍻",
    "🍸",
    "🍹",
    "🍷",
    "🍴",
    "🍕",
    "🍔",
    "🍟",
    "🍗",
    "🍖",
    "🍝",
    "🍛",
    "🍤",
    "🍱",
    "🍣",
    "🍥",
    "🍙",
    "🍘",
    "🍚",
    "🍜",
    "🍲",
    "🍢",
    "🍡",
    "🍳",
    "🍞",
    "🍩",
    "🍮",
    "🍦",
    "🍨",
    "🍧",
    "🎂",
    "🍰",
    "🍪",
    "🍫",
    "🍬",
    "🍭",
    "🍯",
    "🍎",
    "🍏",
    "🍊",
    "🍋",
    "🍒",
    "🍇",
    "🍉",
    "🍓",
    "🍑",
    "🍈",
    "🍌",
    "🍐",
    "🍍",
    "🍠",
    "🍆",
    "🍅",
    "🌽",
    "🏠",
    "🏡",
    "🏫",
    "🏢",
    "🏣",
    "🏥",
    "🏦",
    "🏪",
    "🏩",
    "🏨",
    "💒",
    "⛪",
    "🏬",
    "🏤",
    "🌇",
    "🌆",
    "🏯",
    "🏰",
    "⛺",
    "🏭",
    "🗼",
    "🗾",
    "🗻",
    "🌄",
    "🌅",
    "🌃",
    "🗽",
    "🌉",
    "🎠",
    "🎡",
    "⛲",
    "🎢",
    "🚢",
    "⛵",
    "🚤",
    "🚣",
    "⚓",
    "🚀",
    "✈️",
    "💺",
    "🚁",
    "🚂",
    "🚊",
    "🚉",
    "🚞",
    "🚆",
    "🚄",
    "🚅",
    "🚈",
    "🚇",
    "🚝",
    "🚋",
    "🚃",
    "🚎",
    "🚌",
    "🚍",
    "🚙",
    "🚘",
    "🚗",
    "🚕",
    "🚖",
    "🚛",
    "🚚",
    "🚨",
    "🚓",
    "🚔",
    "🚒",
    "🚑",
    "🚐",
    "🚲",
    "🚡",
    "🚟",
    "🚠",
    "🚜",
    "💈",
    "🚏",
    "🎫",
    "🚦",
    "🚥",
    "⚠️",
    "🚧",
    "🔰",
    "⛽",
    "🏮",
    "🎰",
    "♨️",
    "🗿",
    "🎪",
    "🎭",
    "📍",
    "🚩",
    "🇯🇵",
    "🇰🇷",
    "🇩🇪",
    "🇨🇳",
    "🇺🇸",
    "🇫🇷",
    "🇪🇸",
    "🇮🇹",
    "🇷🇺",
    "🇬🇧",
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "0️⃣",
    "🔟",
    "🔢",
    "#️⃣",
    "🔣",
    "⬆️",
    "⬇️",
    "⬅️",
    "➡️",
    "🔠",
    "🔡",
    "🔤",
    "↗️",
    "↖️",
    "↘️",
    "↙️",
    "↔️",
    "↕️",
    "🔄",
    "◀️",
    "▶️",
    "🔼",
    "🔽",
    "↩️",
    "↪️",
    "ℹ️",
    "⏪",
    "⏩",
    "⏫",
    "⏬",
    "⤵️",
    "⤴️",
    "🆗",
    "🔀",
    "🔁",
    "🔂",
    "🆕",
    "🆙",
    "🆒",
    "🆓",
    "🆖",
    "📶",
    "🎦",
    "🈁",
    "🈯",
    "🈳",
    "🈵",
    "🈴",
    "🈲",
    "🉐",
    "🈹",
    "🈺",
    "🈶",
    "🈚",
    "🚻",
    "🚹",
    "🚺",
    "🚼",
    "🚾",
    "🚰",
    "🚮",
    "🅿️",
    "♿",
    "🚭",
    "🈷️",
    "🈸",
    "🈂️",
    "Ⓜ️",
    "🛂",
    "🛄",
    "🛅",
    "🛃",
    "🉑",
    "㊙️",
    "㊗️",
    "🆑",
    "🆘",
    "🆔",
    "🚫",
    "🔞",
    "📵",
    "🚯",
    "🚱",
    "🚳",
    "🚷",
    "🚸",
    "⛔",
    "✳️",
    "❇️",
    "❎",
    "✅",
    "✴️",
    "💟",
    "🆚",
    "📳",
    "📴",
    "🅰️",
    "🅱️",
    "🆎",
    "🅾️",
    "💠",
    "➿",
    "♻️",
    "♈",
    "♉",
    "♊",
    "♋",
    "♌",
    "♍",
    "♎",
    "♏",
    "♐",
    "♑",
    "♒",
    "♓",
    "⛎",
    "🔯",
    "🏧",
    "💹",
    "💲",
    "💱",
    "©️",
    "®️",
    "™️",
    "❌",
    "‼️",
    "⁉️",
    "❗",
    "❓",
    "❕",
    "❔",
    "⭕",
    "🔝",
    "🔚",
    "🔙",
    "🔛",
    "🔜",
    "🔃",
    "🕛",
    "🕧",
    "🕐",
    "🕜",
    "🕑",
    "🕝",
    "🕒",
    "🕞",
    "🕓",
    "🕟",
    "🕔",
    "🕠",
    "🕕",
    "🕖",
    "🕗",
    "🕘",
    "🕙",
    "🕚",
    "🕡",
    "🕢",
    "🕣",
    "🕤",
    "🕥",
    "🕦",
    "✖️",
    "➕",
    "➖",
    "➗",
    "♠️",
    "♥️",
    "♣️",
    "♦️",
    "💮",
    "💯",
    "✔️",
    "☑️",
    "🔘",
    "🔗",
    "➰",
    "〰️",
    "〽️",
    "🔱",
    "◼️",
    "◻️",
    "◾",
    "◽",
    "▪️",
    "▫️",
    "🔺",
    "🔲",
    "🔳",
    "⚫",
    "⚪",
    "🔴",
    "🔵",
    "🔻",
    "⬜",
    "⬛",
    "🔶",
    "🔷",
    "🔸",
    "🔹"
  ],
  "names": [
    "100",
    "1234",
    "smile",
    "smiley",
    "grinning",
    "blush",
    "relaxed",
    "wink",
    "heart_eyes",
    "kissing_heart",
    "kissing_closed_eyes",
    "kissing",
    "kissing_smiling_eyes",
    "stuck_out_tongue_winking_eye",
    "stuck_out_tongue_closed_eyes",
    "stuck_out_tongue",
    "flushed",
    "grin",
    "pensive",
    "relieved",
    "unamused",
    "disappointed",
    "persevere",
    "cry",
    "joy",
    "sob",
    "sleepy",
    "disappointed_relieved",
    "cold_sweat",
    "sweat_smile",
    "sweat",
    "weary",
    "tired_face",
    "fearful",
    "scream",
    "angry",
    "rage",
    "triumph",
    "confounded",
    "laughing",
    "satisfied",
    "yum",
    "mask",
    "sunglasses",
    "sleeping",
    "dizzy_face",
    "astonished",
    "worried",
    "frowning",
    "anguished",
    "smiling_imp",
    "imp",
    "open_mouth",
    "grimacing",
    "neutral_face",
    "confused",
    "hushed",
    "no_mouth",
    "innocent",
    "smirk",
    "expressionless",
    "man_with_gua_pi_mao",
    "man_with_turban",
    "cop",
    "construction_worker",
    "guardsman",
    "baby",
    "boy",
    "girl",
    "man",
    "woman",
    "older_man",
    "older_woman",
    "person_with_blond_hair",
    "angel",
    "princess",
    "smiley_cat",
    "smile_cat",
    "heart_eyes_cat",
    "kissing_cat",
    "smirk_cat",
    "scream_cat",
    "crying_cat_face",
    "joy_cat",
    "pouting_cat",
    "japanese_ogre",
    "japanese_goblin",
    "see_no_evil",
    "hear_no_evil",
    "speak_no_evil",
    "skull",
    "alien",
    "hankey",
    "poop",
    "shit",
    "fire",
    "sparkles",
    "star2",
    "dizzy",
    "boom",
    "collision",
    "anger",
    "sweat_drops",
    "droplet",
    "zzz",
    "dash",
    "ear",
    "eyes",
    "nose",
    "tongue",
    "lips",
    "+1",
    "thumbsup",
    "-1",
    "thumbsdown",
    "ok_hand",
    "facepunch",
    "punch",
    "fist",
    "v",
    "wave",
    "hand",
    "raised_hand",
    "open_hands",
    "point_up_2",
    "point_down",
    "point_right",
    "point_left",
    "raised_hands",
    "pray",
    "point_up",
    "clap",
    "muscle",
    "walking",
    "runner",
    "running",
    "dancer",
    "couple",
    "family",
    "two_men_holding_hands",
    "two_women_holding_hands",
    "couplekiss",
    "couple_with_heart",
    "dancers",
    "ok_woman",
    "no_good",
    "information_desk_person",
    "raising_hand",
    "massage",
    "haircut",
    "nail_care",
    "bride_with_veil",
    "person_with_pouting_face",
    "person_frowning",
    "bow",
    "tophat",
    "crown",
    "womans_hat",
    "athletic_shoe",
    "mans_shoe",
    "shoe",
    "sandal",
    "high_heel",
    "boot",
    "shirt",
    "tshirt",
    "necktie",
    "womans_clothes",
    "dress",
    "running_shirt_with_sash",
    "jeans",
    "kimono",
    "bikini",
    "briefcase",
    "handbag",
    "pouch",
    "purse",
    "eyeglasses",
    "ribbon",
    "closed_umbrella",
    "lipstick",
    "yellow_heart",
    "blue_heart",
    "purple_heart",
    "green_heart",
    "heart",
    "broken_heart",
    "heartpulse",
    "heartbeat",
    "two_hearts",
    "sparkling_heart",
    "revolving_hearts",
    "cupid",
    "love_letter",
    "kiss",
    "ring",
    "gem",
    "bust_in_silhouette",
    "busts_in_silhouette",
    "speech_balloon",
    "footprints",
    "thought_balloon",
    "dog",
    "wolf",
    "cat",
    "mouse",
    "hamster",
    "rabbit",
    "frog",
    "tiger",
    "koala",
    "bear",
    "pig",
    "pig_nose",
    "cow",
    "boar",
    "monkey_face",
    "monkey",
    "horse",
    "sheep",
    "elephant",
    "panda_face",
    "penguin",
    "bird",
    "baby_chick",
    "hatched_chick",
    "hatching_chick",
    "chicken",
    "snake",
    "turtle",
    "bug",
    "bee",
    "honeybee",
    "ant",
    "beetle",
    "snail",
    "octopus",
    "shell",
    "tropical_fish",
    "fish",
    "dolphin",
    "flipper",
    "whale",
    "whale2",
    "cow2",
    "ram",
    "rat",
    "water_buffalo",
    "tiger2",
    "rabbit2",
    "dragon",
    "racehorse",
    "goat",
    "rooster",
    "dog2",
    "pig2",
    "mouse2",
    "ox",
    "dragon_face",
    "blowfish",
    "crocodile",
    "camel",
    "dromedary_camel",
    "leopard",
    "cat2",
    "poodle",
    "feet",
    "paw_prints",
    "bouquet",
    "cherry_blossom",
    "tulip",
    "four_leaf_clover",
    "rose",
    "sunflower",
    "hibiscus",
    "maple_leaf",
    "leaves",
    "fallen_leaf",
    "herb",
    "ear_of_rice",
    "mushroom",
    "cactus",
    "palm_tree",
    "evergreen_tree",
    "deciduous_tree",
    "chestnut",
    "seedling",
    "blossom",
    "globe_with_meridians",
    "sun_with_face",
    "full_moon_with_face",
    "new_moon_with_face",
    "new_moon",
    "waxing_crescent_moon",
    "first_quarter_moon",
    "moon",
    "waxing_gibbous_moon",
    "full_moon",
    "waning_gibbous_moon",
    "last_quarter_moon",
    "waning_crescent_moon",
    "last_quarter_moon_with_face",
    "first_quarter_moon_with_face",
    "crescent_moon",
    "earth_africa",
    "earth_americas",
    "earth_asia",
    "volcano",
    "milky_way",
    "stars",
    "star",
    "sunny",
    "partly_sunny",
    "cloud",
    "zap",
    "umbrella",
    "snowflake",
    "snowman",
    "cyclone",
    "foggy",
    "rainbow",
    "ocean",
    "bamboo",
    "gift_heart",
    "dolls",
    "school_satchel",
    "mortar_board",
    "flags",
    "fireworks",
    "sparkler",
    "wind_chime",
    "rice_scene",
    "jack_o_lantern",
    "ghost",
    "santa",
    "christmas_tree",
    "gift",
    "tanabata_tree",
    "tada",
    "confetti_ball",
    "balloon",
    "crossed_flags",
    "crystal_ball",
    "movie_camera",
    "camera",
    "video_camera",
    "vhs",
    "cd",
    "dvd",
    "minidisc",
    "floppy_disk",
    "computer",
    "iphone",
    "phone",
    "telephone",
    "telephone_receiver",
    "pager",
    "fax",
    "satellite",
    "tv",
    "radio",
    "loud_sound",
    "sound",
    "speaker",
    "mute",
    "bell",
    "no_bell",
    "loudspeaker",
    "mega",
    "hourglass_flowing_sand",
    "hourglass",
    "alarm_clock",
    "watch",
    "unlock",
    "lock",
    "lock_with_ink_pen",
    "closed_lock_with_key",
    "key",
    "mag_right",
    "bulb",
    "flashlight",
    "high_brightness",
    "low_brightness",
    "electric_plug",
    "battery",
    "mag",
    "bathtub",
    "bath",
    "shower",
    "toilet",
    "wrench",
    "nut_and_bolt",
    "hammer",
    "door",
    "smoking",
    "bomb",
    "gun",
    "hocho",
    "knife",
    "pill",
    "syringe",
    "moneybag",
    "yen",
    "dollar",
    "pound",
    "euro",
    "credit_card",
    "money_with_wings",
    "calling",
    "e-mail",
    "inbox_tray",
    "outbox_tray",
    "email",
    "envelope",
    "envelope_with_arrow",
    "incoming_envelope",
    "postal_horn",
    "mailbox",
    "mailbox_closed",
    "mailbox_with_mail",
    "mailbox_with_no_mail",
    "postbox",
    "package",
    "memo",
    "pencil",
    "page_facing_up",
    "page_with_curl",
    "bookmark_tabs",
    "bar_chart",
    "chart_with_upwards_trend",
    "chart_with_downwards_trend",
    "scroll",
    "clipboard",
    "date",
    "calendar",
    "card_index",
    "file_folder",
    "open_file_folder",
    "scissors",
    "pushpin",
    "paperclip",
    "black_nib",
    "pencil2",
    "straight_ruler",
    "triangular_ruler",
    "closed_book",
    "green_book",
    "blue_book",
    "orange_book",
    "notebook",
    "notebook_with_decorative_cover",
    "ledger",
    "books",
    "book",
    "open_book",
    "bookmark",
    "name_badge",
    "microscope",
    "telescope",
    "newspaper",
    "art",
    "clapper",
    "microphone",
    "headphones",
    "musical_score",
    "musical_note",
    "notes",
    "musical_keyboard",
    "violin",
    "trumpet",
    "saxophone",
    "guitar",
    "space_invader",
    "video_game",
    "black_joker",
    "flower_playing_cards",
    "mahjong",
    "game_die",
    "dart",
    "football",
    "basketball",
    "soccer",
    "baseball",
    "tennis",
    "8ball",
    "rugby_football",
    "bowling",
    "golf",
    "mountain_bicyclist",
    "bicyclist",
    "checkered_flag",
    "horse_racing",
    "trophy",
    "ski",
    "snowboarder",
    "swimmer",
    "surfer",
    "fishing_pole_and_fish",
    "coffee",
    "tea",
    "sake",
    "baby_bottle",
    "beer",
    "beers",
    "cocktail",
    "tropical_drink",
    "wine_glass",
    "fork_and_knife",
    "pizza",
    "hamburger",
    "fries",
    "poultry_leg",
    "meat_on_bone",
    "spaghetti",
    "curry",
    "fried_shrimp",
    "bento",
    "sushi",
    "fish_cake",
    "rice_ball",
    "rice_cracker",
    "rice",
    "ramen",
    "stew",
    "oden",
    "dango",
    "egg",
    "bread",
    "doughnut",
    "custard",
    "icecream",
    "ice_cream",
    "shaved_ice",
    "birthday",
    "cake",
    "cookie",
    "chocolate_bar",
    "candy",
    "lollipop",
    "honey_pot",
    "apple",
    "green_apple",
    "tangerine",
    "lemon",
    "cherries",
    "grapes",
    "watermelon",
    "strawberry",
    "peach",
    "melon",
    "banana",
    "pear",
    "pineapple",
    "sweet_potato",
    "eggplant",
    "tomato",
    "corn",
    "house",
    "house_with_garden",
    "school",
    "office",
    "post_office",
    "hospital",
    "bank",
    "convenience_store",
    "love_hotel",
    "hotel",
    "wedding",
    "church",
    "department_store",
    "european_post_office",
    "city_sunrise",
    "city_sunset",
    "japanese_castle",
    "european_castle",
    "tent",
    "factory",
    "tokyo_tower",
    "japan",
    "mount_fuji",
    "sunrise_over_mountains",
    "sunrise",
    "night_with_stars",
    "statue_of_liberty",
    "bridge_at_night",
    "carousel_horse",
    "ferris_wheel",
    "fountain",
    "roller_coaster",
    "ship",
    "boat",
    "sailboat",
    "speedboat",
    "rowboat",
    "anchor",
    "rocket",
    "airplane",
    "seat",
    "helicopter",
    "steam_locomotive",
    "tram",
    "station",
    "mountain_railway",
    "train2",
    "bullettrain_side",
    "bullettrain_front",
    "light_rail",
    "metro",
    "monorail",
    "train",
    "railway_car",
    "trolleybus",
    "bus",
    "oncoming_bus",
    "blue_car",
    "oncoming_automobile",
    "car",
    "red_car",
    "taxi",
    "oncoming_taxi",
    "articulated_lorry",
    "truck",
    "rotating_light",
    "police_car",
    "oncoming_police_car",
    "fire_engine",
    "ambulance",
    "minibus",
    "bike",
    "aerial_tramway",
    "suspension_railway",
    "mountain_cableway",
    "tractor",
    "barber",
    "busstop",
    "ticket",
    "vertical_traffic_light",
    "traffic_light",
    "warning",
    "construction",
    "beginner",
    "fuelpump",
    "izakaya_lantern",
    "lantern",
    "slot_machine",
    "hotsprings",
    "moyai",
    "circus_tent",
    "performing_arts",
    "round_pushpin",
    "triangular_flag_on_post",
    "jp",
    "kr",
    "de",
    "cn",
    "us",
    "fr",
    "es",
    "it",
    "ru",
    "gb",
    "uk",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "zero",
    "keycap_ten",
    "hash",
    "symbols",
    "arrow_up",
    "arrow_down",
    "arrow_left",
    "arrow_right",
    "capital_abcd",
    "abcd",
    "abc",
    "arrow_upper_right",
    "arrow_upper_left",
    "arrow_lower_right",
    "arrow_lower_left",
    "left_right_arrow",
    "arrow_up_down",
    "arrows_counterclockwise",
    "arrow_backward",
    "arrow_forward",
    "arrow_up_small",
    "arrow_down_small",
    "leftwards_arrow_with_hook",
    "arrow_right_hook",
    "information_source",
    "rewind",
    "fast_forward",
    "arrow_double_up",
    "arrow_double_down",
    "arrow_heading_down",
    "arrow_heading_up",
    "ok",
    "twisted_rightwards_arrows",
    "repeat",
    "repeat_one",
    "new",
    "up",
    "cool",
    "free",
    "ng",
    "signal_strength",
    "cinema",
    "koko",
    "u6307",
    "u7a7a",
    "u6e80",
    "u5408",
    "u7981",
    "ideograph_advantage",
    "u5272",
    "u55b6",
    "u6709",
    "u7121",
    "restroom",
    "mens",
    "womens",
    "baby_symbol",
    "wc",
    "potable_water",
    "put_litter_in_its_place",
    "parking",
    "wheelchair",
    "no_smoking",
    "u6708",
    "u7533",
    "sa",
    "m",
    "passport_control",
    "baggage_claim",
    "left_luggage",
    "customs",
    "accept",
    "secret",
    "congratulations",
    "cl",
    "sos",
    "id",
    "no_entry_sign",
    "underage",
    "no_mobile_phones",
    "do_not_litter",
    "non-potable_water",
    "no_bicycles",
    "no_pedestrians",
    "children_crossing",
    "no_entry",
    "eight_spoked_asterisk",
    "sparkle",
    "negative_squared_cross_mark",
    "white_check_mark",
    "eight_pointed_black_star",
    "heart_decoration",
    "vs",
    "vibration_mode",
    "mobile_phone_off",
    "a",
    "b",
    "ab",
    "o2",
    "diamond_shape_with_a_dot_inside",
    "loop",
    "recycle",
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpius",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces",
    "ophiuchus",
    "six_pointed_star",
    "atm",
    "chart",
    "heavy_dollar_sign",
    "currency_exchange",
    "copyright",
    "registered",
    "tm",
    "x",
    "bangbang",
    "interrobang",
    "exclamation",
    "heavy_exclamation_mark",
    "question",
    "grey_exclamation",
    "grey_question",
    "o",
    "top",
    "end",
    "back",
    "on",
    "soon",
    "arrows_clockwise",
    "clock12",
    "clock1230",
    "clock1",
    "clock130",
    "clock2",
    "clock230",
    "clock3",
    "clock330",
    "clock4",
    "clock430",
    "clock5",
    "clock530",
    "clock6",
    "clock7",
    "clock8",
    "clock9",
    "clock10",
    "clock11",
    "clock630",
    "clock730",
    "clock830",
    "clock930",
    "clock1030",
    "clock1130",
    "heavy_multiplication_x",
    "heavy_plus_sign",
    "heavy_minus_sign",
    "heavy_division_sign",
    "spades",
    "hearts",
    "clubs",
    "diamonds",
    "white_flower",
    "heavy_check_mark",
    "ballot_box_with_check",
    "radio_button",
    "link",
    "curly_loop",
    "wavy_dash",
    "part_alternation_mark",
    "trident",
    "black_medium_square",
    "white_medium_square",
    "black_medium_small_square",
    "white_medium_small_square",
    "black_small_square",
    "white_small_square",
    "small_red_triangle",
    "black_square_button",
    "white_square_button",
    "black_circle",
    "white_circle",
    "red_circle",
    "large_blue_circle",
    "small_red_triangle_down",
    "white_large_square",
    "black_large_square",
    "large_orange_diamond",
    "large_blue_diamond",
    "small_orange_diamond",
    "small_blue_diamond"
  ]
});

require.register("wooorm~retext-emoji@0.4.0-rc.1", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var unicodes,
    key,
    names,
    shortcodes,
    shortcode,
    gemoji,
    modifier;

gemoji = require('wooorm~gemoji@0.2.0');
modifier = require('wooorm~nlcst-emoji-modifier@0.0.1');

unicodes = gemoji.unicode;
names = gemoji.name;

shortcodes = {};

for (key in names) {
    shortcode = ':' + key + ':';
    shortcodes[shortcode] = names[key];
    shortcodes[shortcode].shortcode = shortcode;
}

/**
 * Replace a short-code with a unicode emoji.
 *
 * @this {EmoticonNode}
 */

function toEmoji() {
    var self,
        value;

    self = this;
    value = shortcodes[self.toString()];

    if (value) {
        self.fromString(value.emoji);
    }
}

/**
 * Replace a unicode emoji with a short-code.
 *
 * @this {EmoticonNode}
 */

function toGemoji() {
    var self,
        value;

    self = this;
    value = unicodes[self.toString()];

    if (value) {
        self.fromString(value.shortcode);
    }
}

/**
 * Change factory. Constructs a `changetext` listener.
 *
 * @param {string} onchange - which function to invoke
 *   when the internal value changes.
 * @return {function(this:EmoticonNode)}
 */

function changeFactory(onchange) {
   /**
    * Invoked when the internal value changes. If the
    * emoji is still valid, updates its data.
    *
    * @this {EmoticonNode}
    */

    return function () {
        var self,
            value,
            data,
            information;

        self = this;
        value = self.toString();

        information = unicodes[value] || shortcodes[value];

        data = self.data;

        if (information) {
            data.names = information.names.concat();
            data.description = information.description;
            data.tags = information.tags.concat();
        } else {
            data.names = [];
            data.description = null;
            data.tags = [];
        }

        if (onchange) {
            self[onchange]();
        }
    };
}

/**
 * Define `EMOTICON_NODE`.
 */

var EMOTICON_NODE;

EMOTICON_NODE = 'EmoticonNode';

/**
 * Define `emoji`.
 */

function emoji(retext, options) {
    var TextOM,
        SymbolNode,
        convert,
        onchange;

    if (arguments.length < 2) {
        throw new TypeError(
            'Illegal invocation: `emoji` was ' +
            'invoked by the user. This is no longer valid. ' +
            'This breaking change occurred in ' +
            'retext-emoji@0.3.0. See GitHub for more ' +
            'information'
        );
    }

    /**
     * Construct an `EmoticonNode`.
     */

    TextOM = retext.TextOM;

    SymbolNode = TextOM.SymbolNode;

    /**
     * Define `PunctuationNode`.
     *
     * @constructor
     */

    function EmoticonNode() {
        SymbolNode.apply(this, arguments);
    }

    /**
     * The type of an instance of `EmoticonNode`.
     *
     * @readonly
     * @static
     */

    EmoticonNode.prototype.type = EMOTICON_NODE;

    /**
     * Transform a gemoji into an emoji.
     *
     * @this {EmoticonNode}
     */

    EmoticonNode.prototype.toEmoji = toEmoji;

   /**
    * Transform an emoji into a gemoji.
    *
    * @this {EmoticonNode}
    */

   EmoticonNode.prototype.toGemoji = toGemoji;

    /**
     * Inherit from `SymbolNode.prototype`.
     */

    SymbolNode.isImplementedBy(EmoticonNode);

    /**
     * Expose `EmoticonNode` on `TextOM`.
     */

    TextOM.EmoticonNode = EmoticonNode;

    /**
     * Expose `EmoticonNode`s type on `TextOM`
     * and `Node.prototype`.
     */

    TextOM.EMOTICON_NODE = EMOTICON_NODE;
    TextOM.Node.prototype.EMOTICON_NODE = EMOTICON_NODE;

    /**
     * Enable `SentenceNode` to accept `EmoticonNode`s.
     */

    TextOM.SentenceNode.prototype.allowedChildTypes.push(EMOTICON_NODE);

    /**
     * Add automatic emoji de- and encoding.
     */

    convert = options.convert;

    if (
        convert !== 'decode' &&
        convert !== 'encode' &&
        convert !== null &&
        convert !== undefined
    ) {
        throw new TypeError(
            'Illegal invocation: `' + convert +
            '` is not a valid value for ' +
            '`options.convert` in `retext#use(emoji, options)`'
        );
    }

    if (convert === 'encode') {
        onchange = 'toEmoji';
    } else if (convert === 'decode') {
        onchange = 'toGemoji';
    }

    EmoticonNode.on('changetext', changeFactory(onchange));

    /**
     * Add the NLCST plugin.
     */

    modifier(retext.parser);
}

/**
 * Expose `emoji`.
 */

module.exports = emoji;

});

require.register("visionmedia~co@3.1.0", function (exports, module) {

/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co;

/**
 * Wrap the given generator `fn` and
 * return a thunk.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

function co(fn) {
  var isGenFun = isGeneratorFunction(fn);

  return function (done) {
    var ctx = this;

    // in toThunk() below we invoke co()
    // with a generator, so optimize for
    // this case
    var gen = fn;

    // we only need to parse the arguments
    // if gen is a generator function.
    if (isGenFun) {
      var args = slice.call(arguments), len = args.length;
      var hasCallback = len && 'function' == typeof args[len - 1];
      done = hasCallback ? args.pop() : error;
      gen = fn.apply(this, args);
    } else {
      done = done || error;
    }

    next();

    // #92
    // wrap the callback in a setImmediate
    // so that any of its errors aren't caught by `co`
    function exit(err, res) {
      setImmediate(function(){
        done.call(ctx, err, res);
      });
    }

    function next(err, res) {
      var ret;

      // multiple args
      if (arguments.length > 2) res = slice.call(arguments, 1);

      // error
      if (err) {
        try {
          ret = gen.throw(err);
        } catch (e) {
          return exit(e);
        }
      }

      // ok
      if (!err) {
        try {
          ret = gen.next(res);
        } catch (e) {
          return exit(e);
        }
      }

      // done
      if (ret.done) return exit(null, ret.value);

      // normalize
      ret.value = toThunk(ret.value, ctx);

      // run
      if ('function' == typeof ret.value) {
        var called = false;
        try {
          ret.value.call(ctx, function(){
            if (called) return;
            called = true;
            next.apply(ctx, arguments);
          });
        } catch (e) {
          setImmediate(function(){
            if (called) return;
            called = true;
            next(e);
          });
        }
        return;
      }

      // invalid
      next(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following was passed: "' + String(ret.value) + '"'));
    }
  }
}

/**
 * Convert `obj` into a normalized thunk.
 *
 * @param {Mixed} obj
 * @param {Mixed} ctx
 * @return {Function}
 * @api private
 */

function toThunk(obj, ctx) {

  if (isGeneratorFunction(obj)) {
    return co(obj.call(ctx));
  }

  if (isGenerator(obj)) {
    return co(obj);
  }

  if (isPromise(obj)) {
    return promiseToThunk(obj);
  }

  if ('function' == typeof obj) {
    return obj;
  }

  if (isObject(obj) || Array.isArray(obj)) {
    return objectToThunk.call(ctx, obj);
  }

  return obj;
}

/**
 * Convert an object of yieldables to a thunk.
 *
 * @param {Object} obj
 * @return {Function}
 * @api private
 */

function objectToThunk(obj){
  var ctx = this;
  var isArray = Array.isArray(obj);

  return function(done){
    var keys = Object.keys(obj);
    var pending = keys.length;
    var results = isArray
      ? new Array(pending) // predefine the array length
      : new obj.constructor();
    var finished;

    if (!pending) {
      setImmediate(function(){
        done(null, results)
      });
      return;
    }

    // prepopulate object keys to preserve key ordering
    if (!isArray) {
      for (var i = 0; i < pending; i++) {
        results[keys[i]] = undefined;
      }
    }

    for (var i = 0; i < keys.length; i++) {
      run(obj[keys[i]], keys[i]);
    }

    function run(fn, key) {
      if (finished) return;
      try {
        fn = toThunk(fn, ctx);

        if ('function' != typeof fn) {
          results[key] = fn;
          return --pending || done(null, results);
        }

        fn.call(ctx, function(err, res){
          if (finished) return;

          if (err) {
            finished = true;
            return done(err);
          }

          results[key] = res;
          --pending || done(null, results);
        });
      } catch (err) {
        finished = true;
        done(err);
      }
    }
  }
}

/**
 * Convert `promise` to a thunk.
 *
 * @param {Object} promise
 * @return {Function}
 * @api private
 */

function promiseToThunk(promise) {
  return function(fn){
    promise.then(function(res) {
      fn(null, res);
    }, fn);
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return obj && 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return obj && 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGeneratorFunction(obj) {
  return obj && obj.constructor && 'GeneratorFunction' == obj.constructor.name;
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return val && Object == val.constructor;
}

/**
 * Throw `err` in a new stack.
 *
 * This is used when co() is invoked
 * without supplying a callback, which
 * should only be for demonstrational
 * purposes.
 *
 * @param {Error} err
 * @api private
 */

function error(err) {
  if (!err) return;
  setImmediate(function(){
    throw err;
  });
}

});

require.register("matthewmueller~wrap-fn@0.1.1", function (exports, module) {
/**
 * Module Dependencies
 */

var slice = [].slice;
var co = require('visionmedia~co@3.1.0');
var noop = function(){};

/**
 * Export `wrap-fn`
 */

module.exports = wrap;

/**
 * Wrap a function to support
 * sync, async, and gen functions.
 *
 * @param {Function} fn
 * @param {Function} done
 * @return {Function}
 * @api public
 */

function wrap(fn, done) {
  done = done || noop;

  return function() {
    var args = slice.call(arguments);
    var ctx = this;

    // done
    if (!fn) {
      return done.apply(ctx, [null].concat(args));
    }

    // async
    if (fn.length > args.length) {
      return fn.apply(ctx, args.concat(done));
    }

    // generator
    if (generator(fn)) {
      return co(fn).apply(ctx, args.concat(done));
    }

    // sync
    return sync(fn, done).apply(ctx, args);
  }
}

/**
 * Wrap a synchronous function execution.
 *
 * @param {Function} fn
 * @param {Function} done
 * @return {Function}
 * @api private
 */

function sync(fn, done) {
  return function () {
    var ret;

    try {
      ret = fn.apply(this, arguments);
    } catch (err) {
      return done(err);
    }

    if (promise(ret)) {
      ret.then(function (value) { done(null, value); }, done);
    } else {
      ret instanceof Error ? done(ret) : done(null, ret);
    }
  }
}

/**
 * Is `value` a generator?
 *
 * @param {Mixed} value
 * @return {Boolean}
 * @api private
 */

function generator(value) {
  return value
    && value.constructor
    && 'GeneratorFunction' == value.constructor.name;
}


/**
 * Is `value` a promise?
 *
 * @param {Mixed} value
 * @return {Boolean}
 * @api private
 */

function promise(value) {
  return value && 'function' == typeof value.then;
}

});

require.register("segmentio~ware@1.2.0", function (exports, module) {
/**
 * Module Dependencies
 */

var slice = [].slice;
var wrap = require('matthewmueller~wrap-fn@0.1.1');

/**
 * Expose `Ware`.
 */

module.exports = Ware;

/**
 * Initialize a new `Ware` manager, with optional `fns`.
 *
 * @param {Function or Array or Ware} fn (optional)
 */

function Ware (fn) {
  if (!(this instanceof Ware)) return new Ware(fn);
  this.fns = [];
  if (fn) this.use(fn);
}

/**
 * Use a middleware `fn`.
 *
 * @param {Function or Array or Ware} fn
 * @return {Ware}
 */

Ware.prototype.use = function (fn) {
  if (fn instanceof Ware) {
    return this.use(fn.fns);
  }

  if (fn instanceof Array) {
    for (var i = 0, f; f = fn[i++];) this.use(f);
    return this;
  }

  this.fns.push(fn);
  return this;
};

/**
 * Run through the middleware with the given `args` and optional `callback`.
 *
 * @param {Mixed} args...
 * @param {Function} callback (optional)
 * @return {Ware}
 */

Ware.prototype.run = function () {
  var fns = this.fns;
  var ctx = this;
  var i = 0;
  var last = arguments[arguments.length - 1];
  var done = 'function' == typeof last && last;
  var args = done
    ? slice.call(arguments, 0, arguments.length - 1)
    : slice.call(arguments);

  // next step
  function next (err) {
    if (err) return done(err);
    var fn = fns[i++];
    var arr = slice.call(args);

    if (!fn) {
      return done && done.apply(null, [null].concat(args));
    }

    wrap(fn, next).apply(ctx, arr);
  }

  next();

  return this;
};

});

require.register("wooorm~array-iterate@0.0.1", function (exports, module) {
'use strict';

/**
 * Cache `hasOwnProperty`.
 */

var has;

has = Object.prototype.hasOwnProperty;

/**
 * `Array#forEach()` with the possibility to change
 * the next position.
 *
 * @param {{length: number}} values
 * @param {function(*, number, {length: number}): number|undefined} callback
 * @param {*} context
 */

function iterate(values, callback, context) {
    var index,
        result;

    if (!values) {
        throw new Error(
            'TypeError: Iterate requires that |this| ' +
            'not be ' + values
        );
    }

    if (!has.call(values, 'length')) {
        throw new Error(
            'TypeError: Iterate requires that |this| ' +
            'has a `length`'
        );
    }

    if (typeof callback !== 'function') {
        throw new Error(
            'TypeError: callback must be a function'
        );
    }

    index = -1;

    /**
     * The length might change, so we do not cache it.
     */

    while (++index < values.length) {
        /**
         * Skip missing values.
         */

        if (!(index in values)) {
            continue;
        }

        result = callback.call(context, values[index], index, values);

        /**
         * If `callback` returns a `number`, move `index` over to
         * `number`.
         */

        if (typeof result === 'number') {
            /**
             * Make sure that negative numbers do not
             * break the loop.
             */

            if (result < 0) {
                index = 0;
            }

            index = result - 1;
        }
    }
}

/**
 * Expose `iterate`.
 */

module.exports = iterate;

});

require.register("wooorm~parse-latin@0.4.0-rc.1", function (exports, module) {
'use strict';

module.exports = require('wooorm~parse-latin@0.4.0-rc.1/lib/parse-latin.js');

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/expressions.js", function (exports, module) {
module.exports = {
    'affixSymbol': /^([\)\]\}\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3E\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63]|["'\xBB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21]|[!\.\?\u2026\u203D])\1*$/,
    'newLine': /^(\r?\n|\r)+$/,
    'newLineMulti': /^(\r?\n|\r){2,}$/,
    'terminalMarker': /^((?:[!\.\?\u2026\u203D])+)$/,
    'wordSymbolInner': /^((?:[&'\-\.:=\?@\xAD\xB7\u2010\u2011\u2019\u2027])|(?:[/_])+)$/,
    'punctuation': /^(?:[!"'-\),-/:;\?\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u201F\u2022-\u2027\u2032-\u203A\u203C-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDE38-\uDE3D]|\uD805[\uDCC6\uDDC1-\uDDC9\uDE41-\uDE43]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F)+$/,
    'numerical': /^(?:[0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDD16-\uDD1B\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDE60-\uDE7E]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9]|\uD806[\uDCE0-\uDCF2]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF]|\uD83C[\uDD00-\uDD0C])+$/,
    'lowerInitial': /^(?:[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uAB30-\uAB5A\uAB64\uAB65\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB])/,
    'token': /(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09F4-\u09F9\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BF2\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7E\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D75\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F33\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u137C\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u17F0-\u17F9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABE\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u20D0-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u3192-\u3195\u31A0-\u31BA\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA672\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA830-\uA835\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0-\uDEFB\uDF00-\uDF23\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDD00-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F-\uDE47\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE6\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDE60-\uDE7E]|\uD804[\uDC00-\uDC46\uDC52-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDD0-\uDDDA\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE37\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF01-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9]|\uD806[\uDCA0-\uDCF2\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44\uDF60-\uDF71]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])+|(?:[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000])+|(?:[\uD800-\uDFFF])+|([\s\S])\1*/g,
    'word': /^(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09F4-\u09F9\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BF2\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7E\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D75\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F33\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u137C\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u17F0-\u17F9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABE\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u20D0-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u3192-\u3195\u31A0-\u31BA\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA672\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA830-\uA835\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0-\uDEFB\uDF00-\uDF23\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDD00-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F-\uDE47\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE6\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDE60-\uDE7E]|\uD804[\uDC00-\uDC46\uDC52-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDD0-\uDDDA\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE37\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF01-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9]|\uD806[\uDCA0-\uDCF2\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44\uDF60-\uDF71]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])+$/,
    'whiteSpace': /^(?:[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000])+$/
};

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var iterate;

iterate = require('wooorm~array-iterate@0.0.1');

/**
 * Pass the context as the third argument to `callback`.
 *
 * @param {function(Object, number, Object): number|undefined} callback
 * @return {function(Object, number)}
 */

function wrapperFactory(callback) {
    return function (value, index) {
        return callback(value, index, this);
    };
}

/**
 * Turns `callback` into a ``iterator'' accepting a parent.
 *
 * see ``array-iterate'' for more info.
 *
 * @param {function(Object, number, Object): number|undefined} callback
 * @return {function(NLCSTParent)}
 */

function iteratorFactory(callback) {
    return function (parent) {
        return iterate(parent.children, callback, parent);
    };
}

/**
 * Turns `callback` into a ``iterator'' accepting a parent.
 *
 * see ``array-iterate'' for more info.
 *
 * @param {function(Object, number, Object): number|undefined} callback
 * @return {function(Object)}
 */

function modifierFactory(callback) {
    return iteratorFactory(wrapperFactory(callback));
}

/**
 * Expose `modifierFactory`.
 */

module.exports = modifierFactory;

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/parse-latin.js", function (exports, module) {
/**!
 * parse-latin
 *
 * Licensed under MIT.
 * Copyright (c) 2014 Titus Wormer <tituswormer@gmail.com>
 */

'use strict';

/**
 * Dependencies.
 */

var parser,
    expressions,
    pluginFactory,
    modifierFactory;

parser = require('wooorm~parse-latin@0.4.0-rc.1/lib/parser.js');
expressions = require('wooorm~parse-latin@0.4.0-rc.1/lib/expressions.js');
pluginFactory = require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin.js');
modifierFactory = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');

/**
 * == CLASSIFY ===============================================================
 */

/**
 * Constants.
 */

var EXPRESSION_TOKEN,
    EXPRESSION_WORD,
    EXPRESSION_PUNCTUATION,
    EXPRESSION_WHITE_SPACE;

/**
 * Match all tokens:
 * - One or more number, alphabetic, or
 *   combining characters;
 * - One or more white space characters;
 * - One or more astral plane characters;
 * - One or more of the same character;
 */

EXPRESSION_TOKEN = expressions.token;

/**
 * Match a word.
 */

EXPRESSION_WORD = expressions.word;

/**
 * Match a string containing ONLY punctuation.
 */

EXPRESSION_PUNCTUATION = expressions.punctuation;

/**
 * Match a string containing ONLY white space.
 */

EXPRESSION_WHITE_SPACE = expressions.whiteSpace;

/**
 * Classify a token.
 *
 * @param {string?} value
 * @return {string} - value's type.
 */

function classify(value) {
    if (EXPRESSION_WHITE_SPACE.test(value)) {
        return 'WhiteSpace';
    }

    if (EXPRESSION_WORD.test(value)) {
        return 'Word';
    }

    if (EXPRESSION_PUNCTUATION.test(value)) {
        return 'Punctuation';
    }

    return 'Symbol';
}

/**
 * Transform a `value` into a list of `NLCSTNode`s.
 *
 * @param {ParseLatin} parser
 * @param {string?} value
 * @return {Array.<NLCSTNode>}
 */

function tokenize(parser, value) {
    var tokens,
        token,
        start,
        end,
        match;

    if (value === null || value === undefined) {
        value = '';
    } else if (value instanceof String) {
        value = value.toString();
    }

    if (typeof value !== 'string') {
        throw new Error(
            'Illegal invocation: \'' + value + '\'' +
            ' is not a valid argument for \'ParseLatin\''
        );
    }

    tokens = [];

    if (!value) {
        return tokens;
    }

    EXPRESSION_TOKEN.lastIndex = 0;
    start = 0;
    match = EXPRESSION_TOKEN.exec(value);

    while (match) {
        /**
         * Move the pointer over to after its last
         * character.
         */

        end = match.index + match[0].length;

        /**
         * Slice the found content, from (including)
         * start to (not including) end, classify it,
         * and add the result.
         */

        token = value.substring(start, end);

        tokens.push(parser['tokenize' + classify(token)](token));

        match = EXPRESSION_TOKEN.exec(value);

        start = end;
    }

    return tokens;
}

/**
 * == PARSE LATIN ============================================================
 */

/**
 * Transform Latin-script natural language into
 * an NLCST-tree.
 *
 * @constructor
 */

function ParseLatin() {
    /**
     * TODO: This should later be removed (when this
     * change bubbles through to dependants).
     */

    if (!(this instanceof ParseLatin)) {
        return new ParseLatin();
    }
}

/**
 * Quick access to the prototype.
 */

var parseLatinPrototype;

parseLatinPrototype = ParseLatin.prototype;

/**
 * == TOKENIZE ===============================================================
 */

/**
 * Transform a `value` into a list of `NLCSTNode`s.
 *
 * @see tokenize
 */

parseLatinPrototype.tokenize = function (value) {
    return tokenize(this, value);
};

/**
 * == TEXT NODES =============================================================
 */

/**
 * Factory to create a `Text`.
 *
 * @param {string?} type
 * @return {function(value): NLCSTText}
 */

function createTextFactory(type) {
    type += 'Node';

    /**
     * Construct a `Text` from a bound `type`
     *
     * @param {value} value
     * @return {NLCSTText}
     */

    return function (value) {
        if (value === null || value === undefined) {
            value = '';
        }

        return {
            'type': type,
            'value': String(value)
        };
    };
}

/**
 * Create a `SymbolNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTSymbolNode}
 */

parseLatinPrototype.tokenizeSymbol = createTextFactory('Symbol');

/**
 * Create a `WhiteSpaceNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTWhiteSpaceNode}
 */

parseLatinPrototype.tokenizeWhiteSpace = createTextFactory('WhiteSpace');

/**
 * Create a `PunctuationNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTPunctuationNode}
 */

parseLatinPrototype.tokenizePunctuation = createTextFactory('Punctuation');

/**
 * Create a `SourceNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTSourceNode}
 */

parseLatinPrototype.tokenizeSource = createTextFactory('Source');

/**
 * Create a `TextNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTTextNode}
 */

parseLatinPrototype.tokenizeText = createTextFactory('Text');

/**
 * == PARENT NODES ===========================================================
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
 * implemented through this mechanism.
 */

/**
 * @param {Function} Constructor
 * @param {string} key
 * @param {function(*): undefined} callback
 * @return {undefined}
 */

function pluggable(Constructor, key, callback) {
    var wareKey;

    wareKey = key + 'Plugins';

    Constructor.prototype[key] = function () {
        var self,
            result,
            plugins,
            index;

        self = this;

        result = callback.apply(self, arguments);

        plugins = self[wareKey];

        if (plugins) {
            index = -1;

            while (plugins[++index]) {
                plugins[index](result);
            }
        }

        return result;
    };
}

/**
 * @param {string} key
 * @param {Function|Array.<Function>} plugin
 * @this {ParseLatin|Object}
 */

parseLatinPrototype.use = function (key, plugin) {
    var self,
        wareKey;

    self = this;

    /**
     * Throw if the method is not pluggable.
     */

    if (!(key in self)) {
        throw new Error(
            'Illegal Invocation: Unsupported `key` for ' +
            '`use(key, plugin)`. Make sure `key` is a ' +
            'supported function'
        );
    }

    /**
     * Fail silently when no plugin is given.
     */

    if (!plugin) {
        return;
    }

    wareKey = key + 'Plugins';

    if (typeof plugin === 'function') {
        plugin = [plugin];
    } else {
        plugin = plugin.concat();
    }

    if (self[wareKey]) {
        self[wareKey] = self[wareKey].concat(plugin);
    } else {
        self[wareKey] = plugin;
    }
};

/**
 * Create a `WordNode` with its children set to a single
 * `TextNode`, its value set to the given `value`.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTWordNode}
 */

pluggable(ParseLatin, 'tokenizeWord', function (value) {
    return {
        'type': 'WordNode',
        'children': [
            this.tokenizeText(value)
        ]
    };
});

/**
 * Create a `SentenceNode` with its children set to
 * `Node`s, their values set to the tokenized given
 * `value`.
 *
 * Unless plugins add new nodes, the sentence is
 * populated by `WordNode`s, `SymbolNode`s,
 * `PunctuationNode`s, and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTSentenceNode}
 */

pluggable(ParseLatin, 'tokenizeSentence', parser({
    'type': 'SentenceNode',
    'tokenizer': 'tokenize'
}));

/**
 * Create a `ParagraphNode` with its children set to
 * `Node`s, their values set to the tokenized given
 * `value`.
 *
 * Unless plugins add new nodes, the paragraph is
 * populated by `SentenceNode`s and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTParagraphNode}
 */

pluggable(ParseLatin, 'tokenizeParagraph', parser({
    'type': 'ParagraphNode',
    'delimiter': expressions.terminalMarker,
    'delimiterType': 'PunctuationNode',
    'tokenizer': 'tokenizeSentence'
}));

/**
 * Create a `RootNode` with its children set to `Node`s,
 * their values set to the tokenized given `value`.
 *
 * Unless plugins add new nodes, the root is populated by
 * `ParagraphNode`s and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTRootNode}
 */

pluggable(ParseLatin, 'tokenizeRoot', parser({
    'type': 'RootNode',
    'delimiter': expressions.newLine,
    'delimiterType': 'WhiteSpaceNode',
    'tokenizer': 'tokenizeParagraph'
}));

/**
 * Easy access to the document parser.
 *
 * @see ParseLatin#tokenizeRoot
 */

parseLatinPrototype.parse = function (value) {
    return this.tokenizeRoot(value);
};

/**
 * == PLUGINS ================================================================
 */

parseLatinPrototype.use('tokenizeSentence', [
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-initial-word-symbol.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-final-word-symbol.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-inner-word-symbol.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-initialisms.js')
]);

parseLatinPrototype.use('tokenizeParagraph', [
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-non-word-sentences.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-affix-symbol.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-initial-lower-case-letter-sentences.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-prefix-exceptions.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-affix-exceptions.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-remaining-full-stops.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/make-initial-white-space-siblings.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/make-final-white-space-siblings.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/break-implicit-sentences.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/remove-empty-nodes.js')
]);

parseLatinPrototype.use('tokenizeRoot', [
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/make-initial-white-space-siblings.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/make-final-white-space-siblings.js'),
    require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin/remove-empty-nodes.js')
]);

/**
 * == EXPORT =================================================================
 */

/**
 * Expose `ParseLatin`.
 */

module.exports = ParseLatin;

/**
 * Expose `pluginFactory` on `ParseLatin` as `plugin`.
 */

ParseLatin.plugin = pluginFactory;

/**
 * Expose `modifierFactory` on `ParseLatin` as `modifier`.
 */

ParseLatin.modifier = modifierFactory;

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/parser.js", function (exports, module) {
'use strict';

var tokenizer;

tokenizer = require('wooorm~parse-latin@0.4.0-rc.1/lib/tokenizer.js');

function parserFactory(options) {
    var type,
        delimiter,
        tokenizerProperty;

    type = options.type;
    tokenizerProperty = options.tokenizer;
    delimiter = options.delimiter;

    if (delimiter) {
        delimiter = tokenizer(options.delimiterType, options.delimiter);
    }

    return function (value) {
        var children;

        children = this[tokenizerProperty](value);

        return {
            'type': type,
            'children': delimiter ? delimiter(children) : children
        };
    };
}

module.exports = parserFactory;

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin.js", function (exports, module) {
'use strict';

/**
 * Turns `callback` into a ``plugin'' accepting a parent.
 *
 * @param {function(Object, number, Object)} callback
 * @return {function(NLCSTParent)}
 */

function pluginFactory(callback) {
    return function (parent) {
        var index,
            children;

        index = -1;
        children = parent.children;

        while (children[++index]) {
            callback(children[index], index, parent);
        }
    };
}

/**
 * Expose `pluginFactory`.
 */

module.exports = pluginFactory;

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/break-implicit-sentences.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    plugin,
    expressions;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');
plugin = require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin.js');
expressions = require('wooorm~parse-latin@0.4.0-rc.1/lib/expressions.js');

/**
 * Constants.
 *
 * - Two or more new line characters.
 */

var EXPRESSION_MULTI_NEW_LINE;

EXPRESSION_MULTI_NEW_LINE = expressions.newLineMulti;

/**
 * Break a sentence if a white space with more
 * than one new-line is found.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined}
 */

function breakImplicitSentences(child, index, parent) {
    var children,
        position,
        length,
        node;

    if (child.type !== 'SentenceNode') {
        return;
    }

    children = child.children;

    length = children.length;

    position = -1;

    while (++position < length) {
        node = children[position];

        if (
            node.type !== 'WhiteSpaceNode' ||
            !EXPRESSION_MULTI_NEW_LINE.test(nlcstToString(node))
        ) {
            continue;
        }

        child.children = children.slice(0, position);

        parent.children.splice(index + 1, 0, node, {
            'type': 'SentenceNode',
            'children': children.slice(position + 1)
        });
    }
}

/**
 * Expose `breakImplicitSentences` as a plugin.
 */

module.exports = plugin(breakImplicitSentences);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/make-final-white-space-siblings.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var modifier;

modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');

/**
 * Move white space ending a paragraph up, so they are
 * the siblings of paragraphs.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParent} parent
 * @return {undefined|number}
 */

function makeFinalWhiteSpaceSiblings(child, index, parent) {
    var children;

    children = child.children;

    if (
        children &&
        children.length !== 0 &&
        children[children.length - 1].type === 'WhiteSpaceNode'
    ) {
        parent.children.splice(index + 1, 0, child.children.pop());

        /**
         * Next, iterate over the current node again.
         */

        return index;
    }
}

/**
 * Expose `makeFinalWhiteSpaceSiblings` as a modifier.
 */

module.exports = modifier(makeFinalWhiteSpaceSiblings);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/make-initial-white-space-siblings.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var plugin;

plugin = require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin.js');

/**
 * Move white space starting a sentence up, so they are
 * the siblings of sentences.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParent} parent
 * @return {undefined}
 */

function makeInitialWhiteSpaceSiblings(child, index, parent) {
    var children;

    children = child.children;

    if (
        children &&
        children.length !== 0 &&
        children[0].type === 'WhiteSpaceNode'
    ) {
        parent.children.splice(index, 0, children.shift());
    }
}

/**
 * Expose `makeInitialWhiteSpaceSiblings` as a plugin.
 */

module.exports = plugin(makeInitialWhiteSpaceSiblings);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-affix-exceptions.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');
modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');

/**
 * Merge a sentence into its previous sentence, when
 * the sentence starts with a comma.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function mergeAffixExceptions(child, index, parent) {
    var children,
        node,
        position,
        previousChild,
        value;

    children = child.children;

    if (!children || !children.length || index === 0) {
        return;
    }

    position = -1;

    while (children[++position]) {
        node = children[position];

        if (node.type === 'WordNode') {
            return;
        }

        if (
            node.type === 'SymbolNode' ||
            node.type === 'PunctuationNode'
        ) {
            value = nlcstToString(node);

            if (value !== ',' && value !== ';') {
                return;
            }

            previousChild = parent.children[index - 1];

            previousChild.children = previousChild.children.concat(
                children
            );

            parent.children.splice(index, 1);

            /**
             * Next, iterate over the node *now* at the current
             * position.
             */

            return index;
        }
    }
}

/**
 * Expose `mergeAffixExceptions` as a modifier.
 */

module.exports = modifier(mergeAffixExceptions);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-affix-symbol.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');
modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');
expressions = require('wooorm~parse-latin@0.4.0-rc.1/lib/expressions.js');

/**
 * Constants.
 *
 * - Closing or final punctuation, or terminal markers
 *   that should still be included in the previous
 *   sentence, even though they follow the sentence's
 *   terminal marker.
 */

var EXPRESSION_AFFIX_SYMBOL;

EXPRESSION_AFFIX_SYMBOL = expressions.affixSymbol;

/**
 * Move certain punctuation following a terminal
 * marker (thus in the next sentence) to the
 * previous sentence.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function mergeAffixSymbol(child, index, parent) {
    var children,
        firstChild;

    children = child.children;

    if (
        children &&
        children.length &&
        index !== 0
    ) {
        firstChild = children[0];

        if (
            (
                firstChild.type === 'SymbolNode' ||
                firstChild.type === 'PunctuationNode'
            ) &&
            EXPRESSION_AFFIX_SYMBOL.test(nlcstToString(firstChild))
        ) {
            parent.children[index - 1].children.push(children.shift());

            /**
             * Next, iterate over the previous node again.
             */

            return index - 1;
        }
    }
}

/**
 * Expose `mergeAffixSymbol` as a modifier.
 */

module.exports = modifier(mergeAffixSymbol);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-final-word-symbol.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');
modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');

/**
 * Merge certain punctuation marks into their
 * preceding words.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */

function mergeFinalWordSymbol(child, index, parent) {
    var children,
        prev,
        next;

    if (
        index !== 0 &&
        (
            child.type === 'SymbolNode' ||
            child.type === 'PunctuationNode'
        ) &&
        nlcstToString(child) === '-'
    ) {
        children = parent.children;

        prev = children[index - 1];
        next = children[index + 1];

        if (
            (
                !next ||
                next.type !== 'WordNode'
            ) &&
            (
                prev &&
                prev.type === 'WordNode'
            )
        ) {
            /**
             * Remove `child` from parent.
             */

            children.splice(index, 1);

            /**
             * Add the punctuation mark at the end of the
             * previous node.
             */

            prev.children.push(child);

            /**
             * Next, iterate over the node *now* at the
             * current position (which was the next node).
             */

            return index;
        }
    }
}

/**
 * Expose `mergeFinalWordSymbol` as a modifier.
 */

module.exports = modifier(mergeFinalWordSymbol);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-initial-lower-case-letter-sentences.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');
modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');
expressions = require('wooorm~parse-latin@0.4.0-rc.1/lib/expressions.js');

/**
 * Constants.
 *
 * - Initial lowercase letter.
 */

var EXPRESSION_LOWER_INITIAL;

EXPRESSION_LOWER_INITIAL = expressions.lowerInitial;

/**
 * Merge a sentence into its previous sentence, when
 * the sentence starts with a lower case letter.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function mergeInitialLowerCaseLetterSentences(child, index, parent) {
    var siblings,
        children,
        position,
        node,
        prev;

    children = child.children;

    if (
        children &&
        children.length &&
        index !== 0
    ) {
        position = -1;

        while (children[++position]) {
            node = children[position];

            if (node.type === 'WordNode') {
                if (!EXPRESSION_LOWER_INITIAL.test(nlcstToString(node))) {
                    return;
                }

                siblings = parent.children;

                prev = siblings[index - 1];

                prev.children = prev.children.concat(children);

                siblings.splice(index, 1);

                /**
                 * Next, iterate over the node *now* at
                 * the current position.
                 */

                return index;
            }

            if (
                node.type === 'SymbolNode' ||
                node.type === 'PunctuationNode'
            ) {
                return;
            }
        }
    }
}

/**
 * Expose `mergeInitialLowerCaseLetterSentences` as a modifier.
 */

module.exports = modifier(mergeInitialLowerCaseLetterSentences);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-initial-word-symbol.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');
modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');

/**
 * Merge certain punctuation marks into their
 * following words.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */

function mergeInitialWordSymbol(child, index, parent) {
    var children,
        next;

    if (
        (
            child.type !== 'SymbolNode' &&
            child.type !== 'PunctuationNode'
        ) ||
        nlcstToString(child) !== '&'
    ) {
        return;
    }

    children = parent.children;

    next = children[index + 1];

    /**
     * If either a previous word, or no following word,
     * exists, exit early.
     */

    if (
        (
            index !== 0 &&
            children[index - 1].type === 'WordNode'
        ) ||
        !(
            next &&
            next.type === 'WordNode'
        )
    ) {
        return;
    }

    /**
     * Remove `child` from parent.
     */

    children.splice(index, 1);

    /**
     * Add the punctuation mark at the start of the
     * next node.
     */

    next.children.unshift(child);

    /**
     * Next, iterate over the node at the previous
     * position, as it's now adjacent to a following
     * word.
     */

    return index - 1;
}

/**
 * Expose `mergeInitialWordSymbol` as a modifier.
 */

module.exports = modifier(mergeInitialWordSymbol);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-initialisms.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');
modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');
expressions = require('wooorm~parse-latin@0.4.0-rc.1/lib/expressions.js');

/**
 * Constants.
 *
 * - Numbers.
 */

var EXPRESSION_NUMERICAL;

EXPRESSION_NUMERICAL = expressions.numerical;

/**
 * Merge initialisms.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */

function mergeInitialisms(child, index, parent) {
    var siblings,
        prev,
        children,
        length,
        position,
        otherChild,
        isAllDigits,
        value;

    if (
        index !== 0 &&
        nlcstToString(child) === '.'
    ) {
        siblings = parent.children;

        prev = siblings[index - 1];
        children = prev.children;

        length = children && children.length;

        if (
            prev.type === 'WordNode' &&
            length !== 1 &&
            length % 2 !== 0
        ) {
            position = length;

            isAllDigits = true;

            while (children[--position]) {
                otherChild = children[position];

                value = nlcstToString(otherChild);

                if (position % 2 === 0) {
                    /**
                     * Initialisms consist of one
                     * character values.
                     */

                    if (value.length > 1) {
                        return;
                    }

                    if (!EXPRESSION_NUMERICAL.test(value)) {
                        isAllDigits = false;
                    }
                } else if (value !== '.') {
                    if (position < length - 2) {
                        break;
                    } else {
                        return;
                    }
                }
            }

            if (!isAllDigits) {
                /**
                 * Remove `child` from parent.
                 */

                siblings.splice(index, 1);

                /**
                 * Add child to the previous children.
                 */

                children.push(child);

                /**
                 * Next, iterate over the node *now* at the current
                 * position.
                 */

                return index;
            }
        }
    }
}

/**
 * Expose `mergeInitialisms` as a modifier.
 */

module.exports = modifier(mergeInitialisms);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-inner-word-symbol.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');
modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');
expressions = require('wooorm~parse-latin@0.4.0-rc.1/lib/expressions.js');

/**
 * Constants.
 *
 * - Symbols part of surrounding words.
 */

var EXPRESSION_INNER_WORD_SYMBOL;

EXPRESSION_INNER_WORD_SYMBOL = expressions.wordSymbolInner;

/**
 * Merge two words surrounding certain punctuation marks.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */

function mergeInnerWordSymbol(child, index, parent) {
    var siblings,
        sibling,
        prev,
        position,
        tokens,
        queue;

    if (
        index !== 0 &&
        (
            child.type === 'SymbolNode' ||
            child.type === 'PunctuationNode'
        )
    ) {
        siblings = parent.children;

        prev = siblings[index - 1];

        if (prev && prev.type === 'WordNode') {
            position = index - 1;

            tokens = [];
            queue = [];

            /**
             * - If a token which is neither word nor
             *   inner word symbol is found, the loop
             *   is broken.
             * - If an inner word symbol is found,
             *   it's queued.
             * - If a word is found, it's queued (and
             *   the queue stored and emptied).
             */

            while (siblings[++position]) {
                sibling = siblings[position];

                if (sibling.type === 'WordNode') {
                    tokens = tokens.concat(queue, sibling.children);

                    queue = [];
                } else if (
                    (
                        sibling.type === 'SymbolNode' ||
                        sibling.type === 'PunctuationNode'
                    ) &&
                    EXPRESSION_INNER_WORD_SYMBOL.test(nlcstToString(sibling))
                ) {
                    queue.push(sibling);
                } else {
                    break;
                }
            }

            if (tokens.length) {
                /**
                 * If there is a queue, remove its length
                 * from `position`.
                 */

                if (queue.length) {
                    position -= queue.length;
                }

                /**
                 * Remove every (one or more) inner-word punctuation
                 * marks and children of words.
                 */

                siblings.splice(index, position - index);

                /**
                 * Add all found tokens to `prev`s children.
                 */

                prev.children = prev.children.concat(tokens);

                /**
                 * Next, iterate over the node *now* at the current
                 * position.
                 */

                return index;
            }
        }
    }
}

/**
 * Expose `mergeInnerWordSymbol` as a modifier.
 */

module.exports = modifier(mergeInnerWordSymbol);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-non-word-sentences.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var modifier;

modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');

/**
 * Merge a sentence into the following sentence, when
 * the sentence does not contain word tokens.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function mergeNonWordSentences(child, index, parent) {
    var children,
        position,
        prev;

    children = child.children;
    position = -1;

    while (children[++position]) {
        if (children[position].type === 'WordNode') {
            return;
        }
    }

    prev = parent.children[index - 1];

    if (prev) {
        prev.children = prev.children.concat(children);

        /**
         * Remove the child.
         */

        parent.children.splice(index, 1);

        /**
         * Next, iterate over the node *now* at
         * the current position (which was the
         * next node).
         */

        return index;
    }

    prev = parent.children[index + 1];

    if (prev) {
        prev.children = children.concat(prev.children);

        /**
         * Remove the child.
         */

        parent.children.splice(index, 1);
    }
}

/**
 * Expose `mergeNonWordSentences` as a modifier.
 */

module.exports = modifier(mergeNonWordSentences);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-prefix-exceptions.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');
modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');

/**
 * Constants.
 *
 * - Blacklist of full stop characters that should not
 *   be treated as terminal sentence markers: A
 *   case-insensitive abbreviation.
 */

var EXPRESSION_ABBREVIATION_PREFIX;

EXPRESSION_ABBREVIATION_PREFIX = new RegExp(
    '^(' +
        '[0-9]+|' +
        '[a-z]|' +

        /**
         * Common Latin Abbreviations:
         * Based on: http://en.wikipedia.org/wiki/List_of_Latin_abbreviations
         * Where only the abbreviations written without joining full stops,
         * but with a final full stop, were extracted.
         *
         * circa, capitulus, confer, compare, centum weight, eadem, (et) alii,
         * et cetera, floruit, foliis, ibidem, idem, nemine && contradicente,
         * opere && citato, (per) cent, (per) procurationem, (pro) tempore,
         * sic erat scriptum, (et) sequentia, statim, videlicet.
         */

        'al|ca|cap|cca|cent|cf|cit|con|cp|cwt|ead|etc|ff|' +
        'fl|ibid|id|nem|op|pro|seq|sic|stat|tem|viz' +
    ')$'
);

/**
 * Merge a sentence into its next sentence, when the
 * sentence ends with a certain word.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function mergePrefixExceptions(child, index, parent) {
    var children,
        node;

    children = child.children;

    if (
        children &&
        children.length &&
        index !== parent.children.length - 1
    ) {
        node = children[children.length - 1];

        if (
            node &&
            nlcstToString(node) === '.'
        ) {
            node = children[children.length - 2];

            if (
                node &&
                node.type === 'WordNode' &&
                EXPRESSION_ABBREVIATION_PREFIX.test(
                    nlcstToString(node).toLowerCase()
                )
            ) {
                child.children = children.concat(
                    parent.children[index + 1].children
                );

                parent.children.splice(index + 1, 1);

                /**
                 * Next, iterate over the current node again.
                 */

                return index - 1;
            }
        }
    }
}

/**
 * Expose `mergePrefixExceptions` as a modifier.
 */

module.exports = modifier(mergePrefixExceptions);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/merge-remaining-full-stops.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    plugin,
    expressions;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');
plugin = require('wooorm~parse-latin@0.4.0-rc.1/lib/plugin.js');
expressions = require('wooorm~parse-latin@0.4.0-rc.1/lib/expressions.js');

/**
 * Constants.
 *
 * - Blacklist of full stop characters that should not
 *   be treated as terminal sentence markers: A
 *   case-insensitive abbreviation.
 */

var EXPRESSION_TERMINAL_MARKER;

EXPRESSION_TERMINAL_MARKER = expressions.terminalMarker;

/**
 * Merge non-terminal-marker full stops into
 * the previous word (if available), or the next
 * word (if available).
 *
 * @param {NLCSTNode} child
 * @return {undefined}
 */

function mergeRemainingFullStops(child) {
    var children,
        position,
        grandchild,
        prev,
        next,
        nextNext,
        hasFoundDelimiter;

    children = child.children;
    position = children.length;

    hasFoundDelimiter = false;

    while (children[--position]) {
        grandchild = children[position];

        if (
            grandchild.type !== 'SymbolNode' &&
            grandchild.type !== 'PunctuationNode'
        ) {
            /**
             * This is a sentence without terminal marker,
             * so we 'fool' the code to make it think we
             * have found one.
             */

            if (grandchild.type === 'WordNode') {
                hasFoundDelimiter = true;
            }

            continue;
        }

        /**
         * Exit when this token is not a terminal marker.
         */

        if (!EXPRESSION_TERMINAL_MARKER.test(nlcstToString(grandchild))) {
            continue;
        }

        /**
         * Ignore the first terminal marker found
         * (starting at the end), as it should not
         * be merged.
         */

        if (!hasFoundDelimiter) {
            hasFoundDelimiter = true;

            continue;
        }

        /**
         * Only merge a single full stop.
         */

        if (nlcstToString(grandchild) !== '.') {
            continue;
        }

        prev = children[position - 1];
        next = children[position + 1];

        if (prev && prev.type === 'WordNode') {
            nextNext = children[position + 2];

            /**
             * Continue when the full stop is followed by
             * a space and another full stop, such as:
             * `{.} .`
             */

            if (
                next &&
                nextNext &&
                next.type === 'WhiteSpaceNode' &&
                nlcstToString(nextNext) === '.'
            ) {
                continue;
            }

            /**
             * Remove `child` from parent.
             */

            children.splice(position, 1);

            /**
             * Add the punctuation mark at the end of the
             * previous node.
             */

            prev.children.push(grandchild);

            position--;
        } else if (next && next.type === 'WordNode') {
            /**
             * Remove `child` from parent.
             */

            children.splice(position, 1);

            /**
             * Add the punctuation mark at the start of
             * the next node.
             */

            next.children.unshift(grandchild);
        }
    }
}

/**
 * Expose `mergeRemainingFullStops` as a plugin.
 */

module.exports = plugin(mergeRemainingFullStops);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/plugin/remove-empty-nodes.js", function (exports, module) {
'use strict';

/**
 * Dependencies.
 */

var modifier;

modifier = require('wooorm~parse-latin@0.4.0-rc.1/lib/modifier.js');

/**
 * Remove empty children.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function removeEmptyNodes(child, index, parent) {
    if ('children' in child && !child.children.length) {
        parent.children.splice(index, 1);

        /**
         * Next, iterate over the node *now* at
         * the current position (which was the
         * next node).
         */

        return index;
    }
}

/**
 * Expose `removeEmptyNodes` as a modifier.
 */

module.exports = modifier(removeEmptyNodes);

});

require.register("wooorm~parse-latin@0.4.0-rc.1/lib/tokenizer.js", function (exports, module) {
'use strict';

var nlcstToString;

nlcstToString = require('wooorm~nlcst-to-string@0.1.2');

/**
 * Factory to create a tokenizer based on a given
 * `expression`.
 *
 * @param {RegExp} expression
 */

function tokenizerFactory(childType, expression) {
    /**
     * A function which splits
     *
     * @param {RegExp} expression
     */

    return function (child) {
        var children,
            tokens,
            type,
            length,
            index,
            lastIndex,
            start;

        children = [];

        tokens = child.children;
        type = child.type;

        length = tokens.length;

        index = -1;

        lastIndex = length - 1;

        start = 0;

        while (++index < length) {
            if (
                index === lastIndex ||
                (
                    tokens[index].type === childType &&
                    expression.test(nlcstToString(tokens[index]))
                )
            ) {
                children.push({
                    'type': type,
                    'children': tokens.slice(start, index + 1)
                });

                start = index + 1;
            }
        }

        return children;
    };
}

module.exports = tokenizerFactory;

});

require.register("wooorm~nlcst-to-textom@0.1.0", function (exports, module) {
'use strict';

/**
 * Constants.
 */

var has;

has = Object.prototype.hasOwnProperty;

/**
 * Transform a concrete syntax tree into a tree constructed
 * from a given object model.
 *
 * @param {Object} TextOM
 * @param {NLCSTNode} nlcst
 * @return {Node} From `nlcst` and `TextOM` constructed
 *   node.
 */

function nlcstToTextOM(TextOM, nlcst) {
    var index,
        node,
        children,
        data,
        attribute;

    node = new TextOM[nlcst.type]();

    if (has.call(nlcst, 'children')) {
        index = -1;
        children = nlcst.children;

        while (children[++index]) {
            node.append(nlcstToTextOM(TextOM, children[index]));
        }
    } else {
        node.fromString(nlcst.value);
    }

    if (has.call(nlcst, 'data')) {
        data = nlcst.data;

        for (attribute in data) {
            if (has.call(data, attribute)) {
                node.data[attribute] = data[attribute];
            }
        }
    }

    return node;
}

module.exports = nlcstToTextOM;

});

require.register("wooorm~textom@0.3.0", function (exports, module) {
'use strict';

/**
 * Cached methods.
 */

var has,
    arrayPrototype,
    arrayUnshift,
    arrayPush,
    arraySlice,
    arrayIndexOf,
    arraySplice;

has = Object.prototype.hasOwnProperty;

arrayPrototype = Array.prototype;

arrayUnshift = arrayPrototype.unshift;
arrayPush = arrayPrototype.push;
arraySlice = arrayPrototype.slice;
arrayIndexOf = arrayPrototype.indexOf;
arraySplice = arrayPrototype.splice;

/**
 * Warning message when `indexOf` is not available.
 */

/* istanbul ignore if */
if (!arrayIndexOf) {
    throw new Error(
        'Missing `Array#indexOf()` method for TextOM'
    );
}

/**
 * Static node types.
 */

var ROOT_NODE,
    PARAGRAPH_NODE,
    SENTENCE_NODE,
    WORD_NODE,
    SYMBOL_NODE,
    PUNCTUATION_NODE,
    WHITE_SPACE_NODE,
    SOURCE_NODE,
    TEXT_NODE;

ROOT_NODE = 'RootNode';
PARAGRAPH_NODE = 'ParagraphNode';
SENTENCE_NODE = 'SentenceNode';
WORD_NODE = 'WordNode';
SYMBOL_NODE = 'SymbolNode';
PUNCTUATION_NODE = 'PunctuationNode';
WHITE_SPACE_NODE = 'WhiteSpaceNode';
SOURCE_NODE = 'SourceNode';
TEXT_NODE = 'TextNode';

/**
 * Static node names.
 */

var NODE,
    PARENT,
    CHILD,
    ELEMENT,
    TEXT;

NODE = 'Node';
PARENT = 'Parent';
CHILD = 'Child';
ELEMENT = 'Element';
TEXT = 'Text';

/**
 * Invoke listeners while a condition returns true
 *
 * @param {function(this:Node, parameters...): function(): boolean} condition
 */

function invokeEvent(condition) {
    /**
     * Invoke every callback in `callbacks` with `parameters`
     * and `context` as its context object, while the condition
     * returns truthy.
     *
     * @param {Array.<Function>} callbacks
     * @param {Array.<*>} parameters
     * @param {Node} context
     */

    return function (handlers, name, parameters, context) {
        var index,
            length,
            test;

        if (!handlers) {
            return true;
        }

        handlers = handlers[name];

        if (!handlers || !handlers.length) {
            return true;
        }

        test = condition.apply(context, parameters);

        index = -1;
        length = handlers.length;

        handlers = handlers.concat();

        while (++index < length) {
            if (!test()) {
                return false;
            }

            handlers[index].apply(context, parameters);
        }

        return test();
    };
}

/**
 * `remove` event condition.
 */

invokeEvent.remove = invokeEvent(function (previousParent) {
    var self;

    self = this;

    /**
     * Return true if the current parent is not
     * the removed-from parent.
     *
     * @return {boolean}
     */

    return function () {
        return previousParent !== self.parent;
    };
});

/**
 * `insert` event condition.
 */

invokeEvent.insert = invokeEvent(function () {
    var self,
        parent;

    self = this;
    parent = self.parent;

    /**
     * Return true if the current parent is
     * the inserted-into parent.
     *
     * @return {boolean}
     */

    return function () {
        return parent === self.parent;
    };
});

/**
 * `insertinside` event condition.
 */

invokeEvent.insertinside = invokeEvent(function (node) {
    var parent;

    parent = node.parent;

    return function () {
        return node.parent === parent;
    };
});

/**
 * `removeinside` event condition.
 */

invokeEvent.removeinside = invokeEvent(function (node, previousParent) {
    return function () {
        return node.parent !== previousParent;
    };
});

/**
 * Default conditional (always returns `true`).
 */

var invokeAll;

invokeAll = invokeEvent(function () {
    return function () {
        return true;
    };
});

/**
 * Return whether or not `child` can be inserted
 * into `parent`.
 *
 * @param {Parent} parent
 * @param {Child} child
 * @return {boolean}
 */

function canInsertIntoParent(parent, child) {
    var allowed;

    allowed = parent.allowedChildTypes;

    if (!allowed || !allowed.length || !child.type) {
        return true;
    }

    return allowed.indexOf(child.type) > -1;
}

/**
 * Throw an error if an insertion is invalid.
 *
 * @param {Parent} parent
 * @param {Child} item
 * @param {Child} child
 */

function validateInsert(parent, item, child) {
    if (!parent) {
        throw new Error(
            'TypeError: `' + parent + '` is not a ' +
            'valid `parent` for `insert`'
        );
    }

    if (!child) {
        throw new Error(
            'TypeError: `' + child + '` is not a ' +
            'valid `child` for `insert`'
        );
    }

    if (parent === child || parent === item) {
        throw new Error(
            'HierarchyError: Cannot insert `node` into ' +
            '`node`'
        );
    }

    if (!canInsertIntoParent(parent, child)) {
        throw new Error(
            'HierarchyError: The operation would yield ' +
            'an incorrect node tree'
        );
    }

    if (typeof child.remove !== 'function') {
        throw new Error(
            'TypeError: The operated on node does not ' +
            'have a `remove` method'
        );
    }

    /**
     * Insert after...
     */

    if (item) {
        /* istanbul ignore if: Wrong-usage */
        if (item.parent !== parent) {
            throw new Error(
                'HierarchyError: The operated on node ' +
                'is detached from `parent`'
            );
        }

        /* istanbul ignore if: Wrong-usage */
        if (arrayIndexOf.call(parent, item) === -1) {
            throw new Error(
                'HierarchyError: The operated on node ' +
                'is attached to `parent`, but `parent` ' +
                'has no indice corresponding to the node'
            );
        }
    }
}

/**
 * Insert `child` after `item` in `parent`, or at
 * `parent`s head when `item` is not given.
 *
 * @param {Parent} parent
 * @param {Child} item
 * @param {Child} child
 * @return {Child} - `child`.
 */

function insert(parent, item, child) {
    var next;

    validateInsert(parent, item, child);

    /**
     * Detach `child`.
     */

    child.remove();

    /**
     * Set `child`s parent to parent.
     */

    child.parent = parent;

    if (item) {
        next = item.next;

        /**
         * If `item` has a next node, link `child`s next
         * node, to `item`s next node, and link the next
         * nodes previous node to `child`.
         */

        if (next) {
            child.next = next;
            next.prev = child;
        }

        /**
         * Set `child`s previous node to `item`, and set
         * the next node of `item` to `child`.
         */

        child.prev = item;
        item.next = child;

        /**
         * If the parent has no last node or if `item` is
         * `parent`s last node, link `parent`s last node
         * to `child`.
         *
         * Otherwise, insert `child` into `parent` after
         * `item`s.
         */

        if (item === parent.tail || !parent.tail) {
            parent.tail = child;
            arrayPush.call(parent, child);
        } else {
            arraySplice.call(
                parent, arrayIndexOf.call(parent, item) + 1, 0, child
            );
        }
    } else if (parent.head) {
        next = parent.head;

        /**
         * Set `child`s next node to head and set the
         * previous node of head to `child`.
         */

        child.next = next;
        next.prev = child;

        /**
         * Set the `parent`s head to `child`.
         */

        parent.head = child;

        /**
         * If the the parent has no last node, link the
         * parents last node to what used to be it's
         * head.
         */

        if (!parent.tail) {
            parent.tail = next;
        }

        arrayUnshift.call(parent, child);
    } else {
        /**
         * Prepend the node: There is no `head`, nor
         * `tail` node yet.
         *
         * Set `parent`s head to `child`.
         */

        parent.head = child;
        parent[0] = child;
        parent.length = 1;
    }

    /**
     * Emit events.
     */

    next = child.next;

    child.trigger('insert', parent);

    if (item) {
        item.emit('changenext', child, next);
        child.emit('changeprev', item, null);
    }

    if (next) {
        next.emit('changeprev', child, item);
        child.emit('changenext', next, null);
    }

    return child;
}

/**
 * Remove `node` from its parent.
 *
 * @param {Child} node
 * @return {Child} - `node`.
 */

function remove(node) {
    var parent,
        prev,
        next,
        indice;

    /* istanbul ignore if: Wrong-usage */
    if (!node) {
        return false;
    }

    /**
     * Exit early when the node is already detached.
     */

    parent = node.parent;

    if (!parent) {
        return node;
    }

    prev = node.prev;
    next = node.next;

    /**
     * If `node` is its parent's tail, link the
     * tail to `node`s previous item.
     */

    if (parent.tail === node) {
        parent.tail = prev;
    }

    /**
     * If `node` is its parent's head, link the
     * head to `node`s next item.
     */

    if (parent.head === node) {
        parent.head = next;
    }

    /**
     * If node was its parent's only child,
     * remove the `tail` we just added.
     */

    if (parent.tail === parent.head) {
        parent.tail = null;
    }

    /**
     * If a previous item exists, link its next item to
     * `node`s next item.
     */

    if (prev) {
        prev.next = next;
    }

    /**
     * If a next item exists, link its previous item to
     * `node`s previous item.
     */

    if (next) {
        next.prev = prev;
    }

    indice = arrayIndexOf.call(parent, node);

    /* istanbul ignore else: Wrong-usage */
    if (indice !== -1) {
        arraySplice.call(parent, indice, 1);
    }

    /**
     * Remove links from `node` to both its next and
     * previous items, and its parent.
     */

    node.prev = node.next = node.parent = null;

    /**
     * Emit events.
     */

    node.trigger('remove', parent, parent);

    if (next) {
        next.emit('changeprev', prev || null, node);
        node.emit('changenext', null, next);
    }

    if (prev) {
        node.emit('changeprev', null, prev);
        prev.emit('changenext', next || null, node);
    }

    return node;
}

/**
 * Throw an error if a split would be invalid.
 *
 * @param {number} position
 * @param {number} length
 * @param {number} position - Normalized position.
 */

function validateSplitPosition(position, length) {
    if (
        position === null ||
        position === undefined ||
        position !== position ||
        position === -Infinity
    ) {
        position = 0;
    } else if (position === Infinity) {
        position = length;
    } else if (typeof position !== 'number') {
        throw new TypeError(
            'TypeError: `' + position + '` is not a ' +
            'valid `position` for `#split()`'
        );
    } else if (position < 0) {
        position = Math.abs((length + position) % length);
    }

    return position;
}

function mergeData(node, nlcst) {
    var data,
        attribute;

    data = node.data;

    for (attribute in data) {
        /* istanbul ignore else */
        if (has.call(data, attribute)) {
            /**
             * This makes sure no empy data objects
             * are created.
             */

            if (!nlcst.data) {
                nlcst.data = {};
            }

            nlcst.data[attribute] = data[attribute];
        }
    }
}

function TextOMConstructor() {
    var nodePrototype,
        parentPrototype,
        childPrototype,
        textPrototype,
        TextOM;

    /**
     * Define `Node`.
     *
     * @constructor
     */

    function Node() {
        if (!this.data) {
            this.data = {};
        }
    }

    nodePrototype = Node.prototype;

    /**
     * Expose the node name of `Node`.
     *
     * @readonly
     * @static
     */

    nodePrototype.nodeName = NODE;

    /**
     * Listen to an event.
     *
     * @param {string} name
     * @param {function(...[*])} handler
     * @this {Node|Function}
     * @return self
     */

    nodePrototype.on = Node.on = function (name, handler) {
        var self,
            handlers;

        self = this;

        if (typeof name !== 'string') {
            if (name === null || name === undefined) {
                return self;
            }

            throw new Error(
                'Illegal invocation: `' + name + '` ' +
                'is not a valid `name` for ' +
                '`on(name, handler)`'
            );
        }

        if (typeof handler !== 'function') {
            if (handler === null || handler === undefined) {
                return self;
            }

            throw new TypeError(
                'Illegal invocation: `' + handler + '` ' +
                'is not a valid `handler` for ' +
                '`on(name, handler)`'
            );
        }

        handlers = self.callbacks || (self.callbacks = {});
        handlers = handlers[name] || (handlers[name] = []);
        handlers.unshift(handler);

        return self;
    };

    /**
     * Stop listening to an event.
     *
     * - When no arguments are given, stops listening;
     * - When `name` is given, stops listening to events
     *   of name `name`;
     * - When `name` and `handler` are given, stops
     *   invoking `handler` when events of name `name`
     *   are emitted.
     *
     * @param {string?} name
     * @param {function(...[*])?} handler
     * @this {Node|Function}
     * @return self
     */

    nodePrototype.off = Node.off = function (name, handler) {
        var self,
            handlers,
            indice;

        self = this;

        if (
            (name === null || name === undefined) &&
            (handler === null || handler === undefined)
        ) {
            self.callbacks = {};

            return self;
        }

        if (typeof name !== 'string') {
            if (name === null || name === undefined) {
                return self;
            }

            throw new Error(
                'Illegal invocation: `' + name + '` ' +
                'is not a valid `name` for ' +
                '`off(name, handler)`'
            );
        }

        handlers = self.callbacks;

        if (!handlers) {
            return self;
        }

        handlers = handlers[name];

        if (!handlers) {
            return self;
        }

        if (typeof handler !== 'function') {
            if (handler === null || handler === undefined) {
                handlers.length = 0;

                return self;
            }

            throw new Error(
                'Illegal invocation: `' + handler + '` ' +
                'is not a valid `handler` for ' +
                '`off(name, handler)`'
            );
        }

        indice = handlers.indexOf(handler);

        if (indice !== -1) {
            handlers.splice(indice, 1);
        }

        return self;
    };

    /**
     * Emit an event.
     *
     * @param {string} name
     * @param {...*} parameters
     * @this {Node}
     * @return self
     */

    nodePrototype.emit = function (name) {
        var self,
            parameters,
            constructors,
            constructor,
            index,
            length,
            invoke,
            handlers;

        self = this;
        handlers = self.callbacks;

        invoke = invokeEvent[name] || invokeAll;

        parameters = arraySlice.call(arguments, 1);

        if (!invoke(handlers, name, parameters, self)) {
            return false;
        }

        constructors = self.constructor.constructors;

        /* istanbul ignore if: Wrong-usage */
        if (!constructors) {
            return true;
        }

        length = constructors.length;
        index = -1;

        while (++index < length) {
            constructor = constructors[index];

            if (!invoke(constructor.callbacks, name, parameters, self)) {
                return false;
            }
        }

        return true;
    };

    /**
     * Emit an event, and trigger a bubbling event on context.
     *
     * @param {string} name
     * @param {Node} context
     * @param {...*} parameters
     * @this {Node}
     * @return self
     */

    nodePrototype.trigger = function (name, context) {
        var self,
            node,
            parameters,
            invoke;

        self = this;

        parameters = arraySlice.call(arguments, 2);

        /**
         * Emit the event, exit with an error if it's canceled.
         */

        if (!self.emit.apply(self, [name].concat(parameters))) {
            return false;
        }

        /**
         * Exit if no context exists.
         */

        if (!context) {
            return true;
        }

        /**
         * Start firing bubbling events.
         */

        name += 'inside';

        invoke = invokeEvent[name] || invokeAll;

        parameters = [self].concat(parameters);

        node = context;

        while (node) {
            if (!invoke(node.callbacks, name, parameters, node)) {
                return false;
            }

            if (!invoke(node.constructor.callbacks, name, parameters, node)) {
                return false;
            }

            node = node.parent;
        }

        return true;
    };

    /**
     * Inherit Super's prototype into a `Constructor`.
     *
     * Such as `Node` is implemented by `Parent`, `Parent`
     * is implemented by `RootNode`, etc.
     *
     * @param {Function} Constructor
     * @this {Function} - Super.
     */

    Node.isImplementedBy = function (Constructor) {
        var self,
            constructors,
            constructorPrototype,
            key,
            newPrototype;

        self = this;

        constructors = [Constructor].concat(self.constructors || [self]);

        constructorPrototype = Constructor.prototype;

        function AltConstructor () {}

        AltConstructor.prototype = self.prototype;

        newPrototype = new AltConstructor();

        for (key in constructorPrototype) {
            /**
             * Note: Code climate, and probably other
             * linters, will fail here. Thats okay,
             * they're wrong.
             */

            newPrototype[key] = constructorPrototype[key];
        }

        /**
         * Some browser do not enumerate custom
         * `toString` methods, `Node.isImplementedBy`
         * does cater for `toString`, but not others
         * (`valueOf` and such).
         */

        if (constructorPrototype.toString !== {}.toString) {
            newPrototype.toString = constructorPrototype.toString;
        }

        if (constructorPrototype.valueOf !== {}.valueOf) {
            newPrototype.valueOf = constructorPrototype.valueOf;
        }

        /**
         * Copy properties and methods on the Super (not
         * its prototype) over to the given `Constructor`.
         */

        for (key in self) {
            /* istanbul ignore else */
            if (has.call(self, key)) {
                Constructor[key] = self[key];
            }
        }

        /**
         * Enable nicely displayed `> Node` instead of
         * `> Object` in some browser consoles.
         */

        newPrototype.constructor = Constructor;

        /**
         * Store all constructor function.
         */

        Constructor.constructors = constructors;

        /**
         * Set the new prototype.
         */

        Constructor.prototype = newPrototype;
    };

    /**
     * Define `Parent`.
     *
     * @constructor
     */

    function Parent() {
        Node.apply(this, arguments);
    }

    parentPrototype = Parent.prototype;

    /**
     * Expose the node name of `Parent`.
     *
     * @readonly
     * @static
     */

    parentPrototype.nodeName = PARENT;

    /**
     * First child of a `parent`, null otherwise.
     *
     * @type {Child?}
     * @readonly
     */

    parentPrototype.head = null;

    /**
     * Last child of a `parent` (unless the last child
     * is also the first child), `null` otherwise.
     *
     * @type {Child?}
     * @readonly
     */

    parentPrototype.tail = null;

    /**
     * Number of children in `parent`.
     *
     * @type {number}
     * @readonly
     */

    parentPrototype.length = 0;

    /**
     * Insert a child at the beginning of the parent.
     *
     * @param {Child} child - Child to insert as the new
     *   head.
     * @return {self}
     */

    parentPrototype.prepend = function (child) {
        return insert(this, null, child);
    };

    /**
     * Insert a child at the end of the list (like Array#push).
     *
     * @param {Child} child - Child to insert as the new
     *   tail.
     * @return {self}
     */

    parentPrototype.append = function (child) {
        return insert(this, this.tail || this.head, child);
    };

    /**
     * Get child at `position` in `parent`.
     *
     * @param {number?} [index=0] - Position of `child`;
     * @return {Child?}
     */

    parentPrototype.item = function (index) {
        if (index === null || index === undefined) {
            index = 0;
        } else if (typeof index !== 'number' || index !== index) {
            throw new Error(
                'TypeError: `' + index + '` ' +
                'is not a valid `index` for ' +
                '`item(index)`'
            );
        }

        return this[index] || null;
    };

    /**
     * Return the result of calling `toString` on each of `Parent`s children.
     *
     * @this {Parent}
     * @return {string}
     */

    parentPrototype.toString = function () {
        var values,
            node;

        values = [];

        node = this.head;

        while (node) {
            values.push(node);

            node = node.next;
        }

        return values.join('');
    };

    /**
     * Return an NLCST node representing the context.
     *
     * @this {Parent}
     * @return {NLCSTNode}
     */

    parentPrototype.valueOf = function () {
        var self,
            children,
            nlcst,
            node;

        self = this;

        children = [];

        nlcst = {
            'type': self.type || '',
            'children': children
        };

        node = self.head;

        while (node) {
            children.push(node.valueOf());

            node = node.next;
        }

        mergeData(self, nlcst);

        return nlcst;
    };

    /**
     * Inherit from `Node.prototype`.
     */

    Node.isImplementedBy(Parent);

    /**
     * Define `Child`.
     *
     * @constructor
     */

    function Child() {
        Node.apply(this, arguments);
    }

    childPrototype = Child.prototype;

    /**
     * Expose the node name of `Child`.
     *
     * @readonly
     * @static
     */

    childPrototype.nodeName = CHILD;

    /**
     * Parent or `null`.
     *
     * @type {Parent?}
     * @readonly
     */

    childPrototype.parent = null;

    /**
     * The next node, `null` otherwise (when `child` is
     * its parent's tail or detached).
     *
     * @type {Child?}
     * @readonly
     */

    childPrototype.next = null;

    /**
     * The previous node, `null` otherwise (when `child` is
     * its parent's head or detached).
     *
     * @type {Child?}
     * @readonly
     */

    childPrototype.prev = null;

    /**
     * Insert `child` before the context in its parent.
     *
     * @param {Child} child - Child to insert.
     * @this {Child}
     * @return {self}
     */

    childPrototype.before = function (child) {
        return insert(this.parent, this.prev, child);
    };

    /**
     * Insert `child` after the context in its parent.
     *
     * @param {Child} child - Child to insert.
     * @this {Child}
     * @return {self}
     */

    childPrototype.after = function (child) {
        return insert(this.parent, this, child);
    };

    /**
     * Replace the context object with `child`.
     *
     * @param {Child} child - Child to insert.
     * @this {Child}
     * @return {self}
     */

    childPrototype.replace = function (child) {
        var result;

        result = insert(this.parent, this, child);

        remove(this);

        return result;
    };

    /**
     * Remove the context object.
     *
     * @this {Child}
     * @return {self}
     */

    childPrototype.remove = function () {
        return remove(this);
    };

    /**
     * Inherit from `Node.prototype`.
     */

    Node.isImplementedBy(Child);

    /**
     * Define `Element`.
     *
     * @constructor
     */

    function Element() {
        Parent.apply(this, arguments);
        Child.apply(this, arguments);
    }

    /**
     * Inherit from `Parent.prototype` and
     * `Child.prototype`.
     */

    Parent.isImplementedBy(Element);
    Child.isImplementedBy(Element);

    /**
     * Split the context in two, dividing the children
     * from 0-position (NOT INCLUDING the character at
     * `position`), and position-length (INCLUDING the
     * character at `position`).
     *
     * @param {number?} [position=0] - Position to split
     *   at.
     * @this {Parent}
     * @return {self}
     */

    Element.prototype.split = function (position) {
        var self,
            clone,
            cloneNode,
            index;

        self = this;

        position = validateSplitPosition(position, self.length);

        /*eslint-disable new-cap */
        cloneNode = insert(self.parent, self.prev, new self.constructor());
        /*eslint-enable new-cap */

        clone = arraySlice.call(self);

        index = -1;

        while (++index < position && clone[index]) {
            cloneNode.append(clone[index]);
        }

        return cloneNode;
    };

    /**
     * Add Parent as a constructor (which it is)
     */

    Element.constructors.splice(2, 0, Parent);

    /**
     * Expose the node name of `Element`.
     *
     * @readonly
     * @static
     */

    Element.prototype.nodeName = ELEMENT;

    /**
     * Define `Text`.
     *
     * @constructor
     */

    function Text(value) {
        Child.apply(this, arguments);

        this.fromString(value);
    }

    textPrototype = Text.prototype;

    /**
     * Expose the node name of `Text`.
     *
     * @readonly
     * @static
     */

    textPrototype.nodeName = TEXT;

    /**
     * Default value.
     */

    textPrototype.internalValue = '';

    /**
     * Get the internal value of a Text;
     *
     * @this {Text}
     * @return {string}
     */

    textPrototype.toString = function () {
        return this.internalValue;
    };

    /**
     * Return an NLCST node representing the text.
     *
     * @this {Text}
     * @return {NLCSTNode}
     */

    textPrototype.valueOf = function () {
        var self,
            nlcst;

        self = this;

        nlcst = {
            'type': self.type || '',
            'value': self.internalValue
        };

        mergeData(self, nlcst);

        return nlcst;
    };

    /**
     * Sets the internal value of the context with the
     * stringified `value`.
     *
     * @param {string?} [value='']
     * @this {Text}
     * @return {string}
     */

    textPrototype.fromString = function (value) {
        var self,
            current;

        self = this;

        if (value === null || value === undefined) {
            value = '';
        } else {
            value = String(value);
        }

        current = self.toString();

        if (value !== current) {
            self.internalValue = value;

            self.trigger('changetext', self.parent, value, current);
        }

        return value;
    };

    /**
     * Split the context in two, dividing the children
     * from 0-position (NOT INCLUDING the character at
     * `position`), and position-length (INCLUDING the
     * character at `position`).
     *
     * @param {number?} [position=0] - Position to split
     *   at.
     * @this {Text}
     * @return {self}
     */

    textPrototype.split = function (position) {
        var self,
            value,
            cloneNode;

        self = this;
        value = self.internalValue;

        position = validateSplitPosition(position, value.length);

        /*eslint-disable new-cap */
        cloneNode = insert(self.parent, self.prev, new self.constructor());
        /*eslint-enable new-cap */

        self.fromString(value.slice(position));
        cloneNode.fromString(value.slice(0, position));

        return cloneNode;
    };

    /**
     * Inherit from `Child.prototype`.
     */

    Child.isImplementedBy(Text);

    /**
     * Define `RootNode`.
     *
     * @constructor
     */

    function RootNode() {
        Parent.apply(this, arguments);
    }

    /**
     * The type of an instance of RootNode.
     *
     * @readonly
     * @static
     */

    RootNode.prototype.type = ROOT_NODE;

    /**
     * Define allowed children.
     *
     * @readonly
     */

    RootNode.prototype.allowedChildTypes = [
        PARAGRAPH_NODE,
        WHITE_SPACE_NODE,
        SOURCE_NODE
    ];

    /**
     * Inherit from `Parent.prototype`.
     */

    Parent.isImplementedBy(RootNode);

    /**
     * Define `ParagraphNode`.
     *
     * @constructor
     */

    function ParagraphNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of ParagraphNode.
     *
     * @readonly
     * @static
     */

    ParagraphNode.prototype.type = PARAGRAPH_NODE;

    /**
     * Define allowed children.
     *
     * @readonly
     */

    ParagraphNode.prototype.allowedChildTypes = [
        SENTENCE_NODE,
        WHITE_SPACE_NODE,
        SOURCE_NODE
    ];

    /**
     * Inherit from `Parent.prototype` and `Child.prototype`.
     */

    Element.isImplementedBy(ParagraphNode);

    /**
     * Define `SentenceNode`.
     *
     * @constructor
     */

    function SentenceNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of SentenceNode.
     *
     * @readonly
     * @static
     */

    SentenceNode.prototype.type = SENTENCE_NODE;

    /**
     * Define allowed children.
     *
     * @readonly
     */

    SentenceNode.prototype.allowedChildTypes = [
        WORD_NODE,
        SYMBOL_NODE,
        PUNCTUATION_NODE,
        WHITE_SPACE_NODE,
        SOURCE_NODE
    ];

    /**
     * Inherit from `Parent.prototype` and `Child.prototype`.
     */

    Element.isImplementedBy(SentenceNode);

    /**
     * Define `WordNode`.
     */

    function WordNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of WordNode.
     *
     * @readonly
     * @static
     */

    WordNode.prototype.type = WORD_NODE;

    /**
     * Define allowed children.
     *
     * @readonly
     */

    WordNode.prototype.allowedChildTypes = [
        TEXT_NODE,
        SYMBOL_NODE,
        PUNCTUATION_NODE
    ];

    /**
     * Inherit from `Text.prototype`.
     */

    Element.isImplementedBy(WordNode);

    /**
     * Define `SymbolNode`.
     */

    function SymbolNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of SymbolNode.
     *
     * @readonly
     * @static
     */

    SymbolNode.prototype.type = SYMBOL_NODE;

    /**
     * Inherit from `SymbolNode.prototype`.
     */

    Text.isImplementedBy(SymbolNode);

    /**
     * Define `PunctuationNode`.
     */

    function PunctuationNode() {
        SymbolNode.apply(this, arguments);
    }

    /**
     * The type of an instance of PunctuationNode.
     *
     * @readonly
     * @static
     */

    PunctuationNode.prototype.type = PUNCTUATION_NODE;

    /**
     * Inherit from `SymbolNode.prototype`.
     */

    SymbolNode.isImplementedBy(PunctuationNode);

    /**
     * Expose `WhiteSpaceNode`.
     */

    function WhiteSpaceNode() {
        SymbolNode.apply(this, arguments);
    }

    /**
     * The type of an instance of WhiteSpaceNode.
     *
     * @readonly
     * @static
     */

    WhiteSpaceNode.prototype.type = WHITE_SPACE_NODE;

    /**
     * Inherit from `SymbolNode.prototype`.
     */

    SymbolNode.isImplementedBy(WhiteSpaceNode);

    /**
     * Expose `SourceNode`.
     */

    function SourceNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of SourceNode.
     *
     * @readonly
     * @static
     */

    SourceNode.prototype.type = SOURCE_NODE;

    /**
     * Inherit from `Text.prototype`.
     */

    Text.isImplementedBy(SourceNode);

    /**
     * Expose `TextNode`.
     */

    function TextNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of TextNode.
     *
     * @readonly
     * @static
     */

    TextNode.prototype.type = TEXT_NODE;

    /**
     * Inherit from `Text.prototype`.
     */

    Text.isImplementedBy(TextNode);

    /**
     * Define the `TextOM` object.
     */

    TextOM = {};

    /**
     * Expose `TextOM` on every `Node`.
     */

    nodePrototype.TextOM = TextOM;

    /**
     * Expose all node names on `TextOM`.
     */

    TextOM.NODE = NODE;
    TextOM.PARENT = PARENT;
    TextOM.CHILD = CHILD;
    TextOM.ELEMENT = ELEMENT;
    TextOM.TEXT = TEXT;

    /**
     * Expose all node names on every `Node`.
     */

    nodePrototype.NODE = NODE;
    nodePrototype.PARENT = PARENT;
    nodePrototype.CHILD = CHILD;
    nodePrototype.ELEMENT = ELEMENT;
    nodePrototype.TEXT = TEXT;

    /**
     * Expose all node types on `TextOM`.
     */

    TextOM.ROOT_NODE = ROOT_NODE;
    TextOM.PARAGRAPH_NODE = PARAGRAPH_NODE;
    TextOM.SENTENCE_NODE = SENTENCE_NODE;
    TextOM.WORD_NODE = WORD_NODE;
    TextOM.SYMBOL_NODE = SYMBOL_NODE;
    TextOM.PUNCTUATION_NODE = PUNCTUATION_NODE;
    TextOM.WHITE_SPACE_NODE = WHITE_SPACE_NODE;
    TextOM.SOURCE_NODE = SOURCE_NODE;
    TextOM.TEXT_NODE = TEXT_NODE;

    /**
     * Expose all node types on every `Node`.
     */

    nodePrototype.ROOT_NODE = ROOT_NODE;
    nodePrototype.PARAGRAPH_NODE = PARAGRAPH_NODE;
    nodePrototype.SENTENCE_NODE = SENTENCE_NODE;
    nodePrototype.WORD_NODE = WORD_NODE;
    nodePrototype.SYMBOL_NODE = SYMBOL_NODE;
    nodePrototype.PUNCTUATION_NODE = PUNCTUATION_NODE;
    nodePrototype.WHITE_SPACE_NODE = WHITE_SPACE_NODE;
    nodePrototype.SOURCE_NODE = SOURCE_NODE;
    nodePrototype.TEXT_NODE = TEXT_NODE;

    /**
     * Expose all different `Node`s on `TextOM`.
     */

    TextOM.Node = Node;
    TextOM.Parent = Parent;
    TextOM.Child = Child;
    TextOM.Element = Element;
    TextOM.Text = Text;
    TextOM.RootNode = RootNode;
    TextOM.ParagraphNode = ParagraphNode;
    TextOM.SentenceNode = SentenceNode;
    TextOM.WordNode = WordNode;
    TextOM.SymbolNode = SymbolNode;
    TextOM.PunctuationNode = PunctuationNode;
    TextOM.WhiteSpaceNode = WhiteSpaceNode;
    TextOM.SourceNode = SourceNode;
    TextOM.TextNode = TextNode;

    /**
     * Expose `TextOM`.
     */

    return TextOM;
}

/**
 * Expose `TextOMConstructor`.
 */

module.exports = TextOMConstructor;

});

require.register("wooorm~retext@0.4.0-rc.1", function (exports, module) {
'use strict';

var nlcstToTextOM,
    TextOMConstructor,
    ParseLatin,
    Ware;

/**
 * Dependencies.
 */

nlcstToTextOM = require('wooorm~nlcst-to-textom@0.1.0');
TextOMConstructor = require('wooorm~textom@0.3.0');
ParseLatin = require('wooorm~parse-latin@0.4.0-rc.1');
Ware = require('segmentio~ware@1.2.0');

/**
 * Construct an instance of `Retext`.
 *
 * @param {Function?} parser - the parser to use. Defaults
 *   to a new instance of `parse-latin`.
 * @constructor
 */

function Retext(parser) {
    var self,
        TextOM;

    if (!parser) {
        parser = new ParseLatin();
    }

    self = this;
    TextOM = new TextOMConstructor();

    self.plugins = [];

    self.ware = new Ware();
    self.parser = parser;
    self.TextOM = TextOM;

    /**
     * Expose `TextOM` on `parser`, and vice versa.
     */

    parser.TextOM = TextOM;
    TextOM.parser = parser;
}

/**
 * Attaches `plugin`: a humble function.
 *
 * When `use` is called, the `plugin` is invoked with
 * the retext instance and an `options` object.
 * Code to initialize `plugin` should go here, such as
 * functionality to modify the object model (TextOM),
 * the parser (e.g., `parse-latin`), or the `retext`
 * instance itsekf.
 *
 * Optionally `plugin` can return a function which is
 * called every time the user invokes `parse` or `run`.
 * When that happends, that function is invoked with
 * a `Node` and an `options` object.
 * If `plugin` contains asynchronous functionality, it
 * should accept a third argument (`next`) and invoke
 * it on completion.
 *
 * @param {function(Retext, Object): function(Node, Object, Function?)} plugin
 * @return this
 */

Retext.prototype.use = function (plugin, options) {
    var self,
        onparse;

    if (typeof plugin !== 'function') {
        throw new TypeError(
            'Illegal invocation: `' + plugin + '` ' +
            'is not a valid argument for `Retext#use(plugin)`'
        );
    }

    if (typeof plugin.attach === 'function') {
        throw new TypeError(
            'Illegal invocation: `' + plugin + '` ' +
            'is not a valid argument for ' +
            '`Retext#use(plugin)`.\n' +
            'This breaking change, the removal of ' +
            '`attach`, occurred in 0.3.0-rc.2, see ' +
            'GitHub for more information.'
        );
    }

    self = this;

    /**
     * Ware does not know which plugins are attached,
     * only which `onrun` methods are. Thus, we have
     * a custom list of `plugins`, and here we check
     * against that.
     */

    if (self.plugins.indexOf(plugin) === -1) {
        self.plugins.push(plugin);

        onparse = plugin(self, options || {});

        if (typeof onparse === 'function') {
            self.ware.use(onparse);
        }
    }

    return self;
};

/**
 * Transform a given value into a node, applies attached
 * plugins to the node, and invokes `done` with either an
 * error (first argument) or the transformed node (second
 * argument).
 *
 * @param {string?} value - The value to transform.
 * @param {Object} [options={}] - Optional settings.
 * @param {function(Error, Node)} done - Callback to
 *   invoke when the transformations have completed.
 * @return this
 */

Retext.prototype.parse = function (value, options, done) {
    var self,
        nlcst;

    if (!done) {
        done = options;
        options = null;
    }

    if (typeof done !== 'function') {
        throw new TypeError(
            'Illegal invocation: `' + done + '` ' +
            'is not a valid argument for `Retext#parse(value, done)`.\n' +
            'This breaking change occurred in 0.2.0-rc.1, see GitHub for ' +
            'more information.'
        );
    }

    self = this;

    nlcst = self.parser.parse(value);

    self.run(nlcstToTextOM(self.TextOM, nlcst), options, done);

    return self;
};

/**
 * Applies attached plugins to `node` and invokes `done`
 * with either an error (first argument) or the transformed
 * `node` (second argument).
 *
 * @param {Node} node - The node to apply attached
 *   plugins to.
 * @param {Object} [options={}] - Optional settings.
 * @param {function(Error, Node)} done - Callback to
 *   invoke when the transformations have completed.
 * @return this
 */

Retext.prototype.run = function (node, options, done) {
    var self;

    if (!done) {
        done = options;
        options = null;
    }

    if (typeof done !== 'function') {
        throw new TypeError(
            'Illegal invocation: `' + done + '` ' +
            'is not a valid argument for ' +
            '`Retext#run(node, done)`.\n' +
            'This breaking change occurred in 0.2.0-rc.1, see GitHub for ' +
            'more information.'
        );
    }

    self = this;

    self.ware.run(node, options, done);

    return self;
};

/**
 * Expose `Retext`.
 */

module.exports = Retext;

});

require.register("retext-emoji-gh-pages", function (exports, module) {
var emoji = require('wooorm~retext-emoji@0.4.0-rc.1'),
    Retext = require('wooorm~retext@0.4.0-rc.1'),
    inputElement = document.getElementsByTagName('textarea')[0],
    outputElement = document.getElementsByTagName('textarea')[1],
    convertElement = document.getElementsByName('convert')[0],
    retext;

function makeSmarter() {
    retext.parse(inputElement.value, function (err, tree) {
        if (err) throw err;

        outputElement.value = tree;
    })
}

function onchange(event) {
    var value = event.target.selectedOptions[0];

    if (!value) {
        return;
    }

    value = value.value;

    retext = new Retext().use(emoji({'convert' : value}));
    makeSmarter();
}

convertElement.addEventListener('change', onchange);
inputElement.addEventListener('input', makeSmarter);

onchange({'target' : convertElement});
makeSmarter();

});

require("retext-emoji-gh-pages");
