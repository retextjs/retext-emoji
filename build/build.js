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
require.register("wooorm~gemoji@0.1.0", function (exports, module) {
'use strict';

var gemoji, namedGemoji, unicodeGemoji, shortcode, unicode, iterator;

module.exports.unicode = unicodeGemoji = {};
module.exports.name = namedGemoji = {};

gemoji = (
    'sunny|\u2600|' +
    'umbrella|\u2614|' +
    'cloud|\u2601|' +
    'snowflake|\u2744|' +
    'snowman|\u26C4|' +
    'zap|\u26A1|' +
    'cyclone|\uD83C\uDF00|' +
    'foggy|\uD83C\uDF01|' +
    'ocean|\uD83C\uDF0A|' +
    'cat|\uD83D\uDC31|' +
    'dog|\uD83D\uDC36|' +
    'mouse|\uD83D\uDC2D|' +
    'hamster|\uD83D\uDC39|' +
    'rabbit|\uD83D\uDC30|' +
    'wolf|\uD83D\uDC3A|' +
    'frog|\uD83D\uDC38|' +
    'tiger|\uD83D\uDC2F|' +
    'koala|\uD83D\uDC28|' +
    'bear|\uD83D\uDC3B|' +
    'pig|\uD83D\uDC37|' +
    'pig_nose|\uD83D\uDC3D|' +
    'cow|\uD83D\uDC2E|' +
    'boar|\uD83D\uDC17|' +
    'monkey_face|\uD83D\uDC35|' +
    'monkey|\uD83D\uDC12|' +
    'horse|\uD83D\uDC34|' +
    'racehorse|\uD83D\uDC0E|' +
    'camel|\uD83D\uDC2B|' +
    'sheep|\uD83D\uDC11|' +
    'elephant|\uD83D\uDC18|' +
    'panda_face|\uD83D\uDC3C|' +
    'snake|\uD83D\uDC0D|' +
    'bird|\uD83D\uDC26|' +
    'baby_chick|\uD83D\uDC24|' +
    'hatched_chick|\uD83D\uDC25|' +
    'hatching_chick|\uD83D\uDC23|' +
    'chicken|\uD83D\uDC14|' +
    'penguin|\uD83D\uDC27|' +
    'turtle|\uD83D\uDC22|' +
    'bug|\uD83D\uDC1B|' +
    'honeybee|\uD83D\uDC1D|' +
    'ant|\uD83D\uDC1C|' +
    'beetle|\uD83D\uDC1E|' +
    'snail|\uD83D\uDC0C|' +
    'octopus|\uD83D\uDC19|' +
    'tropical_fish|\uD83D\uDC20|' +
    'fish|\uD83D\uDC1F|' +
    'whale|\uD83D\uDC33|' +
    'whale2|\uD83D\uDC0B|' +
    'dolphin|\uD83D\uDC2C|' +
    'cow2|\uD83D\uDC04|' +
    'ram|\uD83D\uDC0F|' +
    'rat|\uD83D\uDC00|' +
    'water_buffalo|\uD83D\uDC03|' +
    'tiger2|\uD83D\uDC05|' +
    'rabbit2|\uD83D\uDC07|' +
    'dragon|\uD83D\uDC09|' +
    'goat|\uD83D\uDC10|' +
    'rooster|\uD83D\uDC13|' +
    'dog2|\uD83D\uDC15|' +
    'pig2|\uD83D\uDC16|' +
    'mouse2|\uD83D\uDC01|' +
    'ox|\uD83D\uDC02|' +
    'dragon_face|\uD83D\uDC32|' +
    'blowfish|\uD83D\uDC21|' +
    'crocodile|\uD83D\uDC0A|' +
    'dromedary_camel|\uD83D\uDC2A|' +
    'leopard|\uD83D\uDC06|' +
    'cat2|\uD83D\uDC08|' +
    'poodle|\uD83D\uDC29|' +
    'paw_prints|\uD83D\uDC3E|' +
    'bouquet|\uD83D\uDC90|' +
    'cherry_blossom|\uD83C\uDF38|' +
    'tulip|\uD83C\uDF37|' +
    'four_leaf_clover|\uD83C\uDF40|' +
    'rose|\uD83C\uDF39|' +
    'sunflower|\uD83C\uDF3B|' +
    'hibiscus|\uD83C\uDF3A|' +
    'maple_leaf|\uD83C\uDF41|' +
    'leaves|\uD83C\uDF43|' +
    'fallen_leaf|\uD83C\uDF42|' +
    'herb|\uD83C\uDF3F|' +
    'mushroom|\uD83C\uDF44|' +
    'cactus|\uD83C\uDF35|' +
    'palm_tree|\uD83C\uDF34|' +
    'evergreen_tree|\uD83C\uDF32|' +
    'deciduous_tree|\uD83C\uDF33|' +
    'chestnut|\uD83C\uDF30|' +
    'seedling|\uD83C\uDF31|' +
    'blossom|\uD83C\uDF3C|' +
    'ear_of_rice|\uD83C\uDF3E|' +
    'shell|\uD83D\uDC1A|' +
    'globe_with_meridians|\uD83C\uDF10|' +
    'sun_with_face|\uD83C\uDF1E|' +
    'full_moon_with_face|\uD83C\uDF1D|' +
    'new_moon_with_face|\uD83C\uDF1A|' +
    'new_moon|\uD83C\uDF11|' +
    'waxing_crescent_moon|\uD83C\uDF12|' +
    'first_quarter_moon|\uD83C\uDF13|' +
    'waxing_gibbous_moon|\uD83C\uDF14|' +
    'full_moon|\uD83C\uDF15|' +
    'waning_gibbous_moon|\uD83C\uDF16|' +
    'last_quarter_moon|\uD83C\uDF17|' +
    'waning_crescent_moon|\uD83C\uDF18|' +
    'last_quarter_moon_with_face|\uD83C\uDF1C|' +
    'first_quarter_moon_with_face|\uD83C\uDF1B|' +
    'moon|\uD83C\uDF19|' +
    'earth_africa|\uD83C\uDF0D|' +
    'earth_americas|\uD83C\uDF0E|' +
    'earth_asia|\uD83C\uDF0F|' +
    'volcano|\uD83C\uDF0B|' +
    'milky_way|\uD83C\uDF0C|' +
    'partly_sunny|\u26C5|' +
    'bamboo|\uD83C\uDF8D|' +
    'gift_heart|\uD83D\uDC9D|' +
    'dolls|\uD83C\uDF8E|' +
    'gift_heart|\uD83D\uDC9D|' +
    'school_satchel|\uD83C\uDF92|' +
    'mortar_board|\uD83C\uDF93|' +
    'flags|\uD83C\uDF8F|' +
    'fireworks|\uD83C\uDF86|' +
    'sparkler|\uD83C\uDF87|' +
    'wind_chime|\uD83C\uDF90|' +
    'rice_scene|\uD83C\uDF91|' +
    'jack_o_lantern|\uD83C\uDF83|' +
    'ghost|\uD83D\uDC7B|' +
    'santa|\uD83C\uDF85|' +
    '8ball|\uD83C\uDFB1|' +
    'alarm_clock|\u23F0|' +
    'apple|\uD83C\uDF4E|' +
    'art|\uD83C\uDFA8|' +
    'baby_bottle|\uD83C\uDF7C|' +
    'balloon|\uD83C\uDF88|' +
    'banana|\uD83C\uDF4C|' +
    'bar_chart|\uD83D\uDCCA|' +
    'baseball|\u26BE|' +
    'basketball|\uD83C\uDFC0|' +
    'bath|\uD83D\uDEC0|' +
    'bathtub|\uD83D\uDEC1|' +
    'battery|\uD83D\uDD0B|' +
    'beer|\uD83C\uDF7A|' +
    'beers|\uD83C\uDF7B|' +
    'bell|\uD83D\uDD14|' +
    'bento|\uD83C\uDF71|' +
    'bicyclist|\uD83D\uDEB4|' +
    'bikini|\uD83D\uDC59|' +
    'birthday|\uD83C\uDF82|' +
    'black_joker|\uD83C\uDCCF|' +
    'black_nib|\u2712|' +
    'blue_book|\uD83D\uDCD8|' +
    'bomb|\uD83D\uDCA3|' +
    'bookmark|\uD83D\uDD16|' +
    'bookmark_tabs|\uD83D\uDCD1|' +
    'books|\uD83D\uDCDA|' +
    'boot|\uD83D\uDC62|' +
    'bowling|\uD83C\uDFB3|' +
    'bread|\uD83C\uDF5E|' +
    'briefcase|\uD83D\uDCBC|' +
    'bulb|\uD83D\uDCA1|' +
    'cake|\uD83C\uDF70|' +
    'calendar|\uD83D\uDCC6|' +
    'calling|\uD83D\uDCF2|' +
    'camera|\uD83D\uDCF7|' +
    'candy|\uD83C\uDF6C|' +
    'card_index|\uD83D\uDCC7|' +
    'cd|\uD83D\uDCBF|' +
    'chart_with_downwards_trend|\uD83D\uDCC9|' +
    'chart_with_upwards_trend|\uD83D\uDCC8|' +
    'cherries|\uD83C\uDF52|' +
    'chocolate_bar|\uD83C\uDF6B|' +
    'christmas_tree|\uD83C\uDF84|' +
    'clapper|\uD83C\uDFAC|' +
    'clipboard|\uD83D\uDCCB|' +
    'closed_book|\uD83D\uDCD5|' +
    'closed_lock_with_key|\uD83D\uDD10|' +
    'closed_umbrella|\uD83C\uDF02|' +
    'clubs|\u2663|' +
    'cocktail|\uD83C\uDF78|' +
    'coffee|\u2615|' +
    'computer|\uD83D\uDCBB|' +
    'confetti_ball|\uD83C\uDF8A|' +
    'cookie|\uD83C\uDF6A|' +
    'corn|\uD83C\uDF3D|' +
    'credit_card|\uD83D\uDCB3|' +
    'crown|\uD83D\uDC51|' +
    'crystal_ball|\uD83D\uDD2E|' +
    'curry|\uD83C\uDF5B|' +
    'custard|\uD83C\uDF6E|' +
    'dango|\uD83C\uDF61|' +
    'dart|\uD83C\uDFAF|' +
    'date|\uD83D\uDCC5|' +
    'diamonds|\u2666|' +
    'dollar|\uD83D\uDCB5|' +
    'door|\uD83D\uDEAA|' +
    'doughnut|\uD83C\uDF69|' +
    'dress|\uD83D\uDC57|' +
    'dvd|\uD83D\uDCC0|' +
    'e-mail|\uD83D\uDCE7|' +
    'egg|\uD83C\uDF73|' +
    'eggplant|\uD83C\uDF46|' +
    'electric_plug|\uD83D\uDD0C|' +
    'email|\u2709|' +
    'euro|\uD83D\uDCB6|' +
    'eyeglasses|\uD83D\uDC53|' +
    'fax|\uD83D\uDCE0|' +
    'file_folder|\uD83D\uDCC1|' +
    'fish_cake|\uD83C\uDF65|' +
    'fishing_pole_and_fish|\uD83C\uDFA3|' +
    'flashlight|\uD83D\uDD26|' +
    'floppy_disk|\uD83D\uDCBE|' +
    'flower_playing_cards|\uD83C\uDFB4|' +
    'football|\uD83C\uDFC8|' +
    'fork_and_knife|\uD83C\uDF74|' +
    'fried_shrimp|\uD83C\uDF64|' +
    'fries|\uD83C\uDF5F|' +
    'game_die|\uD83C\uDFB2|' +
    'gem|\uD83D\uDC8E|' +
    'gift|\uD83C\uDF81|' +
    'golf|\u26F3|' +
    'grapes|\uD83C\uDF47|' +
    'green_apple|\uD83C\uDF4F|' +
    'green_book|\uD83D\uDCD7|' +
    'guitar|\uD83C\uDFB8|' +
    'gun|\uD83D\uDD2B|' +
    'hamburger|\uD83C\uDF54|' +
    'hammer|\uD83D\uDD28|' +
    'handbag|\uD83D\uDC5C|' +
    'headphones|\uD83C\uDFA7|' +
    'hearts|\u2665|' +
    'high_brightness|\uD83D\uDD06|' +
    'high_heel|\uD83D\uDC60|' +
    'hocho|\uD83D\uDD2A|' +
    'honey_pot|\uD83C\uDF6F|' +
    'horse_racing|\uD83C\uDFC7|' +
    'hourglass|\u231B|' +
    'hourglass_flowing_sand|\u23F3|' +
    'ice_cream|\uD83C\uDF68|' +
    'icecream|\uD83C\uDF66|' +
    'inbox_tray|\uD83D\uDCE5|' +
    'incoming_envelope|\uD83D\uDCE8|' +
    'information_source|\u2139\uFE0F|' +
    'iphone|\uD83D\uDCF1|' +
    'jeans|\uD83D\uDC56|' +
    'key|\uD83D\uDD11|' +
    'kimono|\uD83D\uDC58|' +
    'ledger|\uD83D\uDCD2|' +
    'lemon|\uD83C\uDF4B|' +
    'lipstick|\uD83D\uDC84|' +
    'lock|\uD83D\uDD12|' +
    'lock_with_ink_pen|\uD83D\uDD0F|' +
    'lollipop|\uD83C\uDF6D|' +
    'loop|\u27BF|' +
    'loudspeaker|\uD83D\uDCE2|' +
    'low_brightness|\uD83D\uDD05|' +
    'm|\u24C2\uFE0F|' +
    'mag|\uD83D\uDD0D|' +
    'mag_right|\uD83D\uDD0E|' +
    'mahjong|\uD83C\uDC04|' +
    'mailbox|\uD83D\uDCEB|' +
    'mailbox_closed|\uD83D\uDCEA|' +
    'mailbox_with_mail|\uD83D\uDCEC|' +
    'mailbox_with_no_mail|\uD83D\uDCED|' +
    'mans_shoe|\uD83D\uDC5E|' +
    'meat_on_bone|\uD83C\uDF56|' +
    'mega|\uD83D\uDCE3|' +
    'melon|\uD83C\uDF48|' +
    'memo|\uD83D\uDCDD|' +
    'microphone|\uD83C\uDFA4|' +
    'microscope|\uD83D\uDD2C|' +
    'minidisc|\uD83D\uDCBD|' +
    'money_with_wings|\uD83D\uDCB8|' +
    'moneybag|\uD83D\uDCB0|' +
    'mountain_bicyclist|\uD83D\uDEB5|' +
    'movie_camera|\uD83C\uDFA5|' +
    'musical_keyboard|\uD83C\uDFB9|' +
    'musical_score|\uD83C\uDFBC|' +
    'mute|\uD83D\uDD07|' +
    'name_badge|\uD83D\uDCDB|' +
    'necktie|\uD83D\uDC54|' +
    'newspaper|\uD83D\uDCF0|' +
    'no_bell|\uD83D\uDD15|' +
    'notebook|\uD83D\uDCD3|' +
    'notebook_with_decorative_cover|\uD83D\uDCD4|' +
    'nut_and_bolt|\uD83D\uDD29|' +
    'oden|\uD83C\uDF62|' +
    'open_file_folder|\uD83D\uDCC2|' +
    'orange_book|\uD83D\uDCD9|' +
    'outbox_tray|\uD83D\uDCE4|' +
    'page_facing_up|\uD83D\uDCC4|' +
    'page_with_curl|\uD83D\uDCC3|' +
    'pager|\uD83D\uDCDF|' +
    'paperclip|\uD83D\uDCCE|' +
    'peach|\uD83C\uDF51|' +
    'pear|\uD83C\uDF50|' +
    'pencil2|\u270F|' +
    'phone|\u260E|' +
    'pill|\uD83D\uDC8A|' +
    'pineapple|\uD83C\uDF4D|' +
    'pizza|\uD83C\uDF55|' +
    'postal_horn|\uD83D\uDCEF|' +
    'postbox|\uD83D\uDCEE|' +
    'pouch|\uD83D\uDC5D|' +
    'poultry_leg|\uD83C\uDF57|' +
    'pound|\uD83D\uDCB7|' +
    'purse|\uD83D\uDC5B|' +
    'pushpin|\uD83D\uDCCC|' +
    'radio|\uD83D\uDCFB|' +
    'ramen|\uD83C\uDF5C|' +
    'ribbon|\uD83C\uDF80|' +
    'rice|\uD83C\uDF5A|' +
    'rice_ball|\uD83C\uDF59|' +
    'rice_cracker|\uD83C\uDF58|' +
    'ring|\uD83D\uDC8D|' +
    'rugby_football|\uD83C\uDFC9|' +
    'running_shirt_with_sash|\uD83C\uDFBD|' +
    'sake|\uD83C\uDF76|' +
    'sandal|\uD83D\uDC61|' +
    'satellite|\uD83D\uDCE1|' +
    'saxophone|\uD83C\uDFB7|' +
    'scissors|\u2702|' +
    'scroll|\uD83D\uDCDC|' +
    'seat|\uD83D\uDCBA|' +
    'shaved_ice|\uD83C\uDF67|' +
    'shirt|\uD83D\uDC55|' +
    'shower|\uD83D\uDEBF|' +
    'ski|\uD83C\uDFBF|' +
    'smoking|\uD83D\uDEAC|' +
    'snowboarder|\uD83C\uDFC2|' +
    'soccer|\u26BD|' +
    'sound|\uD83D\uDD09|' +
    'space_invader|\uD83D\uDC7E|' +
    'spades|\u2660|' +
    'spaghetti|\uD83C\uDF5D|' +
    'speaker|\uD83D\uDD0A|' +
    'stew|\uD83C\uDF72|' +
    'straight_ruler|\uD83D\uDCCF|' +
    'strawberry|\uD83C\uDF53|' +
    'surfer|\uD83C\uDFC4|' +
    'sushi|\uD83C\uDF63|' +
    'sweet_potato|\uD83C\uDF60|' +
    'swimmer|\uD83C\uDFCA|' +
    'syringe|\uD83D\uDC89|' +
    'tada|\uD83C\uDF89|' +
    'tanabata_tree|\uD83C\uDF8B|' +
    'tangerine|\uD83C\uDF4A|' +
    'tea|\uD83C\uDF75|' +
    'telephone_receiver|\uD83D\uDCDE|' +
    'telescope|\uD83D\uDD2D|' +
    'tennis|\uD83C\uDFBE|' +
    'toilet|\uD83D\uDEBD|' +
    'tomato|\uD83C\uDF45|' +
    'tophat|\uD83C\uDFA9|' +
    'triangular_ruler|\uD83D\uDCD0|' +
    'trophy|\uD83C\uDFC6|' +
    'tropical_drink|\uD83C\uDF79|' +
    'trumpet|\uD83C\uDFBA|' +
    'tv|\uD83D\uDCFA|' +
    'unlock|\uD83D\uDD13|' +
    'vhs|\uD83D\uDCFC|' +
    'video_camera|\uD83D\uDCF9|' +
    'video_game|\uD83C\uDFAE|' +
    'violin|\uD83C\uDFBB|' +
    'watch|\u231A|' +
    'watermelon|\uD83C\uDF49|' +
    'wine_glass|\uD83C\uDF77|' +
    'womans_clothes|\uD83D\uDC5A|' +
    'womans_hat|\uD83D\uDC52|' +
    'wrench|\uD83D\uDD27|' +
    'yen|\uD83D\uDCB4|' +
    'smile|\uD83D\uDE04|' +
    'laughing|\uD83D\uDE06|' +
    'blush|\uD83D\uDE0A|' +
    'smiley|\uD83D\uDE03|' +
    'relaxed|\u263A|' +
    'smirk|\uD83D\uDE0F|' +
    'heart_eyes|\uD83D\uDE0D|' +
    'kissing_heart|\uD83D\uDE18|' +
    'kissing_closed_eyes|\uD83D\uDE1A|' +
    'flushed|\uD83D\uDE33|' +
    'relieved|\uD83D\uDE25|' +
    'satisfied|\uD83D\uDE0C|' +
    'grin|\uD83D\uDE01|' +
    'wink|\uD83D\uDE09|' +
    'stuck_out_tongue_winking_eye|\uD83D\uDE1C|' +
    'stuck_out_tongue_closed_eyes|\uD83D\uDE1D|' +
    'grinning|\uD83D\uDE00|' +
    'kissing|\uD83D\uDE17|' +
    'kissing_smiling_eyes|\uD83D\uDE19|' +
    'stuck_out_tongue|\uD83D\uDE1B|' +
    'sleeping|\uD83D\uDE34|' +
    'worried|\uD83D\uDE1F|' +
    'frowning|\uD83D\uDE26|' +
    'anguished|\uD83D\uDE27|' +
    'open_mouth|\uD83D\uDE2E|' +
    'grimacing|\uD83D\uDE2C|' +
    'confused|\uD83D\uDE15|' +
    'hushed|\uD83D\uDE2F|' +
    'expressionless|\uD83D\uDE11|' +
    'unamused|\uD83D\uDE12|' +
    'sweat_smile|\uD83D\uDE05|' +
    'sweat|\uD83D\uDE13|' +
    'weary|\uD83D\uDE29|' +
    'pensive|\uD83D\uDE14|' +
    'disappointed|\uD83D\uDE1E|' +
    'confounded|\uD83D\uDE16|' +
    'fearful|\uD83D\uDE28|' +
    'cold_sweat|\uD83D\uDE30|' +
    'persevere|\uD83D\uDE23|' +
    'cry|\uD83D\uDE22|' +
    'sob|\uD83D\uDE2D|' +
    'joy|\uD83D\uDE02|' +
    'astonished|\uD83D\uDE32|' +
    'scream|\uD83D\uDE31|' +
    'tired_face|\uD83D\uDE2B|' +
    'angry|\uD83D\uDE20|' +
    'rage|\uD83D\uDE21|' +
    'triumph|\uD83D\uDE24|' +
    'sleepy|\uD83D\uDE2A|' +
    'yum|\uD83D\uDE0B|' +
    'mask|\uD83D\uDE37|' +
    'sunglasses|\uD83D\uDE0E|' +
    'dizzy_face|\uD83D\uDE35|' +
    'imp|\uD83D\uDC7F|' +
    'smiling_imp|\uD83D\uDE08|' +
    'neutral_face|\uD83D\uDE10|' +
    'no_mouth|\uD83D\uDE36|' +
    'innocent|\uD83D\uDE07|' +
    'alien|\uD83D\uDC7D|' +
    'yellow_heart|\uD83D\uDC9B|' +
    'blue_heart|\uD83D\uDC99|' +
    'purple_heart|\uD83D\uDC9C|' +
    'heart|\u2764|' +
    'green_heart|\uD83D\uDC9A|' +
    'broken_heart|\uD83D\uDC94|' +
    'heartbeat|\uD83D\uDC93|' +
    'heartpulse|\uD83D\uDC97|' +
    'two_hearts|\uD83D\uDC95|' +
    'revolving_hearts|\uD83D\uDC9E|' +
    'cupid|\uD83D\uDC98|' +
    'sparkling_heart|\uD83D\uDC96|' +
    'sparkles|\u2728|' +
    'star|\u2B50|' +
    'star2|\uD83C\uDF1F|' +
    'dizzy|\uD83D\uDCAB|' +
    'boom|\uD83D\uDCA5|' +
    'anger|\uD83D\uDCA2|' +
    'exclamation|\u2757|' +
    'question|\u2753|' +
    'grey_exclamation|\u2755|' +
    'grey_question|\u2754|' +
    'zzz|\uD83D\uDCA4|' +
    'dash|\uD83D\uDCA8|' +
    'sweat_drops|\uD83D\uDCA6|' +
    'notes|\uD83C\uDFB6|' +
    'musical_note|\uD83C\uDFB5|' +
    'fire|\uD83D\uDD25|' +
    'poop|\uD83D\uDCA9|' +
    'thumbsup|\uD83D\uDC4D|' +
    'thumbsdown|\uD83D\uDC4E|' +
    'ok_hand|\uD83D\uDC4C|' +
    'punch|\uD83D\uDC4A|' +
    'fist|\u270A|' +
    'v|\u270C|' +
    'wave|\uD83D\uDC4B|' +
    'hand|\u270B|' +
    'open_hands|\uD83D\uDC50|' +
    'point_up|\u261D|' +
    'point_down|\uD83D\uDC47|' +
    'point_left|\uD83D\uDC48|' +
    'point_right|\uD83D\uDC49|' +
    'raised_hands|\uD83D\uDE4C|' +
    'pray|\uD83D\uDE4F|' +
    'point_up_2|\uD83D\uDC46|' +
    'clap|\uD83D\uDC4F|' +
    'muscle|\uD83D\uDCAA|' +
    'walking|\uD83D\uDEB6|' +
    'runner|\uD83C\uDFC3|' +
    'couple|\uD83D\uDC6B|' +
    'family|\uD83D\uDC6A|' +
    'two_men_holding_hands|\uD83D\uDC6C|' +
    'two_women_holding_hands|\uD83D\uDC6D|' +
    'dancer|\uD83D\uDC83|' +
    'dancers|\uD83D\uDC6F|' +
    'ok_woman|\uD83D\uDE46|' +
    'no_good|\uD83D\uDE45|' +
    'information_desk_person|\uD83D\uDC81|' +
    'raised_hand|\uD83D\uDE4B|' +
    'bride_with_veil|\uD83D\uDC70|' +
    'person_with_pouting_face|\uD83D\uDE4E|' +
    'person_frowning|\uD83D\uDE4D|' +
    'bow|\uD83D\uDE47|' +
    'couplekiss|\uD83D\uDC8F|' +
    'couple_with_heart|\uD83D\uDC91|' +
    'massage|\uD83D\uDC86|' +
    'haircut|\uD83D\uDC87|' +
    'nail_care|\uD83D\uDC85|' +
    'boy|\uD83D\uDC66|' +
    'girl|\uD83D\uDC67|' +
    'woman|\uD83D\uDC69|' +
    'man|\uD83D\uDC68|' +
    'baby|\uD83D\uDC76|' +
    'older_woman|\uD83D\uDC75|' +
    'older_man|\uD83D\uDC74|' +
    'person_with_blond_hair|\uD83D\uDC71|' +
    'man_with_gua_pi_mao|\uD83D\uDC72|' +
    'man_with_turban|\uD83D\uDC73|' +
    'construction_worker|\uD83D\uDC77|' +
    'cop|\uD83D\uDC6E|' +
    'angel|\uD83D\uDC7C|' +
    'princess|\uD83D\uDC78|' +
    'smiley_cat|\uD83D\uDE3A|' +
    'smile_cat|\uD83D\uDE38|' +
    'heart_eyes_cat|\uD83D\uDE3B|' +
    'kissing_cat|\uD83D\uDE3D|' +
    'smirk_cat|\uD83D\uDE3C|' +
    'scream_cat|\uD83D\uDE40|' +
    'crying_cat_face|\uD83D\uDE3F|' +
    'joy_cat|\uD83D\uDE39|' +
    'pouting_cat|\uD83D\uDE3E|' +
    'japanese_ogre|\uD83D\uDC79|' +
    'japanese_goblin|\uD83D\uDC7A|' +
    'see_no_evil|\uD83D\uDE48|' +
    'hear_no_evil|\uD83D\uDE49|' +
    'speak_no_evil|\uD83D\uDE4A|' +
    'guardsman|\uD83D\uDC82|' +
    'skull|\uD83D\uDC80|' +
    'feet|\uD83D\uDC63|' +
    'lips|\uD83D\uDC44|' +
    'kiss|\uD83D\uDC8B|' +
    'droplet|\uD83D\uDCA7|' +
    'ear|\uD83D\uDC42|' +
    'eyes|\uD83D\uDC40|' +
    'nose|\uD83D\uDC43|' +
    'tongue|\uD83D\uDC45|' +
    'love_letter|\uD83D\uDC8C|' +
    'bust_in_silhouette|\uD83D\uDC64|' +
    'busts_in_silhouette|\uD83D\uDC65|' +
    'speech_balloon|\uD83D\uDCAC|' +
    'thought_balloon|\uD83D\uDCAD|' +
    'aerial_tramway|\uD83D\uDEA1|' +
    'airplane|\u2708|' +
    'ambulance|\uD83D\uDE91|' +
    'anchor|\u2693|' +
    'articulated_lorry|\uD83D\uDE9B|' +
    'atm|\uD83C\uDFE7|' +
    'bank|\uD83C\uDFE6|' +
    'barber|\uD83D\uDC88|' +
    'beginner|\uD83D\uDD30|' +
    'bike|\uD83D\uDEB2|' +
    'blue_car|\uD83D\uDE99|' +
    'boat|\u26F5|' +
    'bridge_at_night|\uD83C\uDF09|' +
    'bullettrain_front|\uD83D\uDE85|' +
    'bullettrain_side|\uD83D\uDE84|' +
    'bus|\uD83D\uDE8C|' +
    'busstop|\uD83D\uDE8F|' +
    'car|\uD83D\uDE97|' +
    'carousel_horse|\uD83C\uDFA0|' +
    'checkered_flag|\uD83C\uDFC1|' +
    'church|\u26EA|' +
    'circus_tent|\uD83C\uDFAA|' +
    'city_sunrise|\uD83C\uDF07|' +
    'city_sunset|\uD83C\uDF06|' +
    'construction|\uD83D\uDEA7|' +
    'convenience_store|\uD83C\uDFEA|' +
    'crossed_flags|\uD83C\uDF8C|' +
    'department_store|\uD83C\uDFEC|' +
    'european_castle|\uD83C\uDFF0|' +
    'european_post_office|\uD83C\uDFE4|' +
    'factory|\uD83C\uDFED|' +
    'ferris_wheel|\uD83C\uDFA1|' +
    'fire_engine|\uD83D\uDE92|' +
    'fountain|\u26F2|' +
    'fuelpump|\u26FD|' +
    'helicopter|\uD83D\uDE81|' +
    'hospital|\uD83C\uDFE5|' +
    'hotel|\uD83C\uDFE8|' +
    'hotsprings|\u2668|' +
    'house|\uD83C\uDFE0|' +
    'house_with_garden|\uD83C\uDFE1|' +
    'japan|\uD83D\uDDFE|' +
    'japanese_castle|\uD83C\uDFEF|' +
    'light_rail|\uD83D\uDE88|' +
    'love_hotel|\uD83C\uDFE9|' +
    'minibus|\uD83D\uDE90|' +
    'monorail|\uD83D\uDE9D|' +
    'mount_fuji|\uD83D\uDDFB|' +
    'mountain_cableway|\uD83D\uDEA0|' +
    'mountain_railway|\uD83D\uDE9E|' +
    'moyai|\uD83D\uDDFF|' +
    'office|\uD83C\uDFE2|' +
    'oncoming_automobile|\uD83D\uDE98|' +
    'oncoming_bus|\uD83D\uDE8D|' +
    'oncoming_police_car|\uD83D\uDE94|' +
    'oncoming_taxi|\uD83D\uDE96|' +
    'performing_arts|\uD83C\uDFAD|' +
    'police_car|\uD83D\uDE93|' +
    'post_office|\uD83C\uDFE3|' +
    'railway_car|\uD83D\uDE83|' +
    'rainbow|\uD83C\uDF08|' +
    'rocket|\uD83D\uDE80|' +
    'roller_coaster|\uD83C\uDFA2|' +
    'rotating_light|\uD83D\uDEA8|' +
    'round_pushpin|\uD83D\uDCCD|' +
    'rowboat|\uD83D\uDEA3|' +
    'school|\uD83C\uDFEB|' +
    'ship|\uD83D\uDEA2|' +
    'slot_machine|\uD83C\uDFB0|' +
    'speedboat|\uD83D\uDEA4|' +
    'stars|\uD83C\uDF03|' +
    'station|\uD83D\uDE89|' +
    'statue_of_liberty|\uD83D\uDDFD|' +
    'steam_locomotive|\uD83D\uDE82|' +
    'sunrise|\uD83C\uDF05|' +
    'sunrise_over_mountains|\uD83C\uDF04|' +
    'suspension_railway|\uD83D\uDE9F|' +
    'taxi|\uD83D\uDE95|' +
    'tent|\u26FA|' +
    'ticket|\uD83C\uDFAB|' +
    'tokyo_tower|\uD83D\uDDFC|' +
    'tractor|\uD83D\uDE9C|' +
    'traffic_light|\uD83D\uDEA5|' +
    'train2|\uD83D\uDE86|' +
    'tram|\uD83D\uDE8A|' +
    'triangular_flag_on_post|\uD83D\uDEA9|' +
    'trolleybus|\uD83D\uDE8E|' +
    'truck|\uD83D\uDE9A|' +
    'vertical_traffic_light|\uD83D\uDEA6|' +
    'warning|\u26A0|' +
    'wedding|\uD83D\uDC92|' +
    'jp|\uD83C\uDDEF\uD83C\uDDF5|' +
    'kr|\uD83C\uDDF0\uD83C\uDDF7|' +
    'cn|\uD83C\uDDE8\uD83C\uDDF3|' +
    'us|\uD83C\uDDFA\uD83C\uDDF8|' +
    'fr|\uD83C\uDDEB\uD83C\uDDF7|' +
    'es|\uD83C\uDDEA\uD83C\uDDF8|' +
    'it|\uD83C\uDDEE\uD83C\uDDF9|' +
    'ru|\uD83C\uDDF7\uD83C\uDDFA|' +
    'gb|\uD83C\uDDEC\uD83C\uDDE7|' +
    'de|\uD83C\uDDE9\uD83C\uDDEA|' +
    '100|\uD83D\uDCAF|' +
    '1234|\uD83D\uDD22|' +
    'a|\uD83C\uDD70|' +
    'ab|\uD83C\uDD8E|' +
    'abc|\uD83D\uDD24|' +
    'abcd|\uD83D\uDD21|' +
    'accept|\uD83C\uDE51|' +
    'aquarius|\u2652|' +
    'aries|\u2648|' +
    'arrow_backward|\u25C0|' +
    'arrow_double_down|\u23EC|' +
    'arrow_double_up|\u23EB|' +
    'arrow_down|\u2B07|' +
    'arrow_down_small|\uD83D\uDD3D|' +
    'arrow_forward|\u25B6|' +
    'arrow_heading_down|\u2935|' +
    'arrow_heading_up|\u2934|' +
    'arrow_left|\u2B05|' +
    'arrow_lower_left|\u2199|' +
    'arrow_lower_right|\u2198|' +
    'arrow_right|\u27A1|' +
    'arrow_right_hook|\u21AA|' +
    'arrow_up|\u2B06|' +
    'arrow_up_down|\u2195|' +
    'arrow_up_small|\uD83D\uDD3C|' +
    'arrow_upper_left|\u2196|' +
    'arrow_upper_right|\u2197|' +
    'arrows_clockwise|\uD83D\uDD03|' +
    'arrows_counterclockwise|\uD83D\uDD04|' +
    'b|\uD83C\uDD71|' +
    'baby_symbol|\uD83D\uDEBC|' +
    'baggage_claim|\uD83D\uDEC4|' +
    'ballot_box_with_check|\u2611|' +
    'bangbang|\u203C|' +
    'black_circle|\u26AB|' +
    'black_square_button|\uD83D\uDD32|' +
    'cancer|\u264B|' +
    'capital_abcd|\uD83D\uDD20|' +
    'capricorn|\u2651|' +
    'chart|\uD83D\uDCB9|' +
    'children_crossing|\uD83D\uDEB8|' +
    'cinema|\uD83C\uDFA6|' +
    'cl|\uD83C\uDD91|' +
    'clock1|\uD83D\uDD50|' +
    'clock10|\uD83D\uDD59|' +
    'clock1030|\uD83D\uDD65|' +
    'clock11|\uD83D\uDD5A|' +
    'clock1130|\uD83D\uDD66|' +
    'clock12|\uD83D\uDD5B|' +
    'clock1230|\uD83D\uDD67|' +
    'clock130|\uD83D\uDD5C|' +
    'clock2|\uD83D\uDD51|' +
    'clock230|\uD83D\uDD5D|' +
    'clock3|\uD83D\uDD52|' +
    'clock330|\uD83D\uDD5E|' +
    'clock4|\uD83D\uDD53|' +
    'clock430|\uD83D\uDD5F|' +
    'clock5|\uD83D\uDD54|' +
    'clock530|\uD83D\uDD60|' +
    'clock6|\uD83D\uDD55|' +
    'clock630|\uD83D\uDD61|' +
    'clock7|\uD83D\uDD56|' +
    'clock730|\uD83D\uDD62|' +
    'clock8|\uD83D\uDD57|' +
    'clock830|\uD83D\uDD63|' +
    'clock9|\uD83D\uDD58|' +
    'clock930|\uD83D\uDD64|' +
    'congratulations|\u3297|' +
    'cool|\uD83C\uDD92|' +
    'copyright|\u00A9|' +
    'curly_loop|\u27B0|' +
    'currency_exchange|\uD83D\uDCB1|' +
    'customs|\uD83D\uDEC3|' +
    'diamond_shape_with_a_dot_inside|\uD83D\uDCA0|' +
    'do_not_litter|\uD83D\uDEAF|' +
    'eight|\u0038\uFE0F\u20E3|' +
    'eight_pointed_black_star|\u2734|' +
    'eight_spoked_asterisk|\u2733|' +
    'end|\uD83D\uDD1A|' +
    'fast_forward|\u23E9|' +
    'five|\u0035\uFE0F\u20E3|' +
    'four|\u0034\uFE0F\u20E3|' +
    'free|\uD83C\uDD93|' +
    'gemini|\u264A|' +
    'hash|\u0023\uFE0F\u20E3|' +
    'heart_decoration|\uD83D\uDC9F|' +
    'heavy_check_mark|\u2714|' +
    'heavy_division_sign|\u2797|' +
    'heavy_dollar_sign|\uD83D\uDCB2|' +
    'heavy_minus_sign|\u2796|' +
    'heavy_multiplication_x|\u2716|' +
    'heavy_plus_sign|\u2795|' +
    'id|\uD83C\uDD94|' +
    'ideograph_advantage|\uD83C\uDE50|' +
    'interrobang|\u2049|' +
    'keycap_ten|\uD83D\uDD1F|' +
    'koko|\uD83C\uDE01|' +
    'large_blue_circle|\uD83D\uDD35|' +
    'large_blue_diamond|\uD83D\uDD37|' +
    'large_orange_diamond|\uD83D\uDD36|' +
    'left_luggage|\uD83D\uDEC5|' +
    'left_right_arrow|\u2194|' +
    'leftwards_arrow_with_hook|\u21A9|' +
    'leo|\u264C|' +
    'libra|\u264E|' +
    'link|\uD83D\uDD17|' +
    'mens|\uD83D\uDEB9|' +
    'metro|\uD83D\uDE87|' +
    'mobile_phone_off|\uD83D\uDCF4|' +
    'negative_squared_cross_mark|\u274E|' +
    'new|\uD83C\uDD95|' +
    'ng|\uD83C\uDD96|' +
    'nine|\u0039\uFE0F\u20E3|' +
    'no_bicycles|\uD83D\uDEB3|' +
    'no_entry|\u26D4|' +
    'no_entry_sign|\uD83D\uDEAB|' +
    'no_mobile_phones|\uD83D\uDCF5|' +
    'no_pedestrians|\uD83D\uDEB7|' +
    'no_smoking|\uD83D\uDEAD|' +
    'non-potable_water|\uD83D\uDEB1|' +
    'o|\u2B55|' +
    'o2|\uD83C\uDD7E|' +
    'ok|\uD83C\uDD97|' +
    'on|\uD83D\uDD1B|' +
    'one|\u0031\uFE0F\u20E3|' +
    'ophiuchus|\u26CE|' +
    'parking|\uD83C\uDD7F|' +
    'part_alternation_mark|\u303D|' +
    'passport_control|\uD83D\uDEC2|' +
    'pisces|\u2653|' +
    'potable_water|\uD83D\uDEB0|' +
    'put_litter_in_its_place|\uD83D\uDEAE|' +
    'radio_button|\uD83D\uDD18|' +
    'recycle|\u267B|' +
    'red_circle|\uD83D\uDD34|' +
    'registered|\u00AE|' +
    'repeat|\uD83D\uDD01|' +
    'repeat_one|\uD83D\uDD02|' +
    'restroom|\uD83D\uDEBB|' +
    'rewind|\u23EA|' +
    'sa|\uD83C\uDE02|' +
    'sagittarius|\u2650|' +
    'scorpius|\u264F|' +
    'secret|\u3299|' +
    'seven|\u0037\uFE0F\u20E3|' +
    'signal_strength|\uD83D\uDCF6|' +
    'six|\u0036\uFE0F\u20E3|' +
    'six_pointed_star|\uD83D\uDD2F|' +
    'small_blue_diamond|\uD83D\uDD39|' +
    'small_orange_diamond|\uD83D\uDD38|' +
    'small_red_triangle|\uD83D\uDD3A|' +
    'small_red_triangle_down|\uD83D\uDD3B|' +
    'soon|\uD83D\uDD1C|' +
    'sos|\uD83C\uDD98|' +
    'symbols|\uD83D\uDD23|' +
    'taurus|\u2649|' +
    'three|\u0033\uFE0F\u20E3|' +
    'tm|\u2122|' +
    'top|\uD83D\uDD1D|' +
    'trident|\uD83D\uDD31|' +
    'twisted_rightwards_arrows|\uD83D\uDD00|' +
    'two|\u0032\uFE0F\u20E3|' +
    'u5272|\uD83C\uDE39|' +
    'u5408|\uD83C\uDE34|' +
    'u55b6|\uD83C\uDE3A|' +
    'u6307|\uD83C\uDE2F|' +
    'u6708|\uD83C\uDE37|' +
    'u6709|\uD83C\uDE36|' +
    'u6e80|\uD83C\uDE35|' +
    'u7121|\uD83C\uDE1A|' +
    'u7533|\uD83C\uDE38|' +
    'u7981|\uD83C\uDE32|' +
    'u7a7a|\uD83C\uDE33|' +
    'underage|\uD83D\uDD1E|' +
    'up|\uD83C\uDD99|' +
    'vibration_mode|\uD83D\uDCF3|' +
    'virgo|\u264D|' +
    'vs|\uD83C\uDD9A|' +
    'wavy_dash|\u3030|' +
    'wc|\uD83D\uDEBE|' +
    'wheelchair|\u267F|' +
    'white_check_mark|\u2705|' +
    'white_circle|\u26AA|' +
    'white_flower|\uD83D\uDCAE|' +
    'white_square_button|\uD83D\uDD33|' +
    'womens|\uD83D\uDEBA|' +
    'x|\u274C|' +
    'zero|\u0030\uFE0F\u20E3'
).split('|');

iterator = -1;

while (gemoji[++iterator]) {
    shortcode = gemoji[iterator];
    unicode = gemoji[++iterator];
    namedGemoji[shortcode] = unicode;
    unicodeGemoji[unicode] = shortcode;
}

});

require.register("wooorm~retext-emoji@0.1.0", function (exports, module) {
'use strict';

var gemoji, shortcode, shortcodes, names, unicode;

gemoji = require("wooorm~gemoji@0.1.0");

names = gemoji.name;
unicode = gemoji.unicode;
shortcodes = gemoji.shortcode = {};

for (shortcode in names) {
    shortcodes[':' + shortcode + ':'] = names[shortcode];
}

function mergeEmojiExceptions(child, index, parent) {
    var siblings = parent.children,
        children = child.children,
        iterator = index,
        childIterator, node, nodes, value, length;

    if (
        child.type === 'WordNode' &&
        0 in children &&
        children[0].value in unicode
    ) {
        parent.children[index] = {
            'type' : 'PunctuationNode',
            'children' : children
        };

        return index - 1;
    }

    if (
        child.type !== 'PunctuationNode' ||
        !(0 in children) ||
        children[0].value !== ':') {
            return;
    }

    nodes = [];

    while (siblings[--iterator]) {
        node = siblings[iterator];
        nodes = nodes.concat(node.children.reverse());

        if (
            node.type === 'PunctuationNode' &&
            node.children[0].value === ':'
        ) {
            break;
        }
    }

    if (iterator === -1) {
        return;
    }

    nodes = nodes.reverse().concat(children);

    childIterator = -1;
    length = nodes.length;
    value = '';

    while (++childIterator < length) {
        value += nodes[childIterator].value;
    }

    if (!(value in shortcodes)) {
        return;
    }

    siblings.splice(iterator, index - iterator);
    child.children = nodes;

    return iterator;
}

function encode() {
    var self = this,
        value = shortcodes[self.toString()];

    if (value) {
        self.tail.remove();
        self.head.remove();
        self.head.fromString(value);
    }
}

function decode() {
    var self = this,
        value = unicode[self.toString()];

    if (value) {
        self.head.fromString(value);
        self.prepend(new self.TextOM.TextNode(':'));
        self.append(new self.TextOM.TextNode(':'));
    }
}

function attachFactory(type) {
    return function (retext) {
        var parser = retext.parser,
            TextOM = parser.TextOM,
            onchange = type === 'encode' ? encode : decode;

        parser.tokenizeSentenceModifiers = [
                mergeEmojiExceptions
            ].concat(parser.tokenizeSentenceModifiers);

        TextOM.PunctuationNode.on('changetextinside', onchange);
        TextOM.PunctuationNode.on('insertinside', onchange);
        TextOM.PunctuationNode.on('removeinside', onchange);
    };
}

function emoji(options) {
    if (arguments.length > 1) {
        throw new TypeError('Illegal invocation: smartypants was' +
            ' called by Retext, but should be called by the user');
    }

    if (!options || !('convert' in options)) {
        throw new TypeError('Illegal invocation: \'' + options +
            '\' is not a valid arguments for \'emoji\'');
    }

    var convert = options.convert;

    if (convert !== 'decode' && convert !== 'encode') {
        throw new TypeError('Illegal invocation: \'' + convert +
            '\' is not a valid option for `convert` in ' +
            '\'emoji\'');
    }

    function method () {}

    method.attach = attachFactory(convert);

    return method;
}

exports = module.exports = emoji;

});

require.register("wooorm~parse-latin@0.1.0-rc.11", function (exports, module) {
/**!
 * parse-latin
 *
 * Licensed under MIT.
 * Copyright (c) 2014 Titus Wormer <tituswormer@gmail.com>
 */
'use strict';

var EXPRESSION_ABBREVIATION_PREFIX, EXPRESSION_NEW_LINE,
    EXPRESSION_AFFIX_PUNCTUATION, EXPRESSION_INNER_WORD_PUNCTUATION,
    EXPRESSION_LOWER_INITIAL_EXCEPTION,
    GROUP_ALPHABETIC, GROUP_ASTRAL, GROUP_CLOSING_PUNCTUATION,
    GROUP_COMBINING_DIACRITICAL_MARK, GROUP_COMBINING_NONSPACING_MARK,
    GROUP_FINAL_PUNCTUATION, GROUP_LETTER_LOWER, GROUP_NUMERICAL,
    GROUP_TERMINAL_MARKER, GROUP_WHITE_SPACE, GROUP_WORD,
    parseLatinPrototype;

/**
 * Expands a list of Unicode code points and ranges to be usable in an
 * expression.
 *
 * "Borrowed" from XRegexp.
 *
 * @param {string} value
 * @return {string}
 * @api private
 */
function expand(value) {
    return value.replace(/\w{4}/g, '\\u$&');
}

/**
 * Expose Unicode Number Range (Nd, Nl, and No).
 *
 * "Borrowed" from XRegexp.
 *
 * @global
 * @api private
 * @constant
 */
GROUP_NUMERICAL = expand(
    /*
     * Nd: Number, Decimal Digit
     */
    '0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F' +
    '09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0B72-0B770BE6-0BF' +
    '20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F33' +
    '1040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-1819' +
    '1946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C49' +
    '1C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-' +
    '24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293248-324F' +
    '3251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9' +
    'A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19' +

    /*
     * Nl: Number, Letter
     */
    '16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF' +

    /*
     * No: Number, Other
     */
    '00B200B300B900BC-00BE09F4-09F90B72-0B770BF0-0BF20C78-0C7E0D70-0D75' +
    '0F2A-0F331369-137C17F0-17F919DA20702074-20792080-20892150-215F' +
    '21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293248-324F' +
    '3251-325F3280-328932B1-32BFA830-A835'
);

/**
 * Expose Unicode Alphabetic category Ll (Letter, lowercase).
 *
 * "Borrowed" from XRegexp.
 *
 * @global
 * @api private
 * @constant
 */
GROUP_LETTER_LOWER = expand('0061-007A00B500DF-00F600F8-00FF010101030105' +
    '01070109010B010D010F01110113011501170119011B011D011F0121012301250127' +
    '0129012B012D012F01310133013501370138013A013C013E01400142014401460148' +
    '0149014B014D014F01510153015501570159015B015D015F01610163016501670169' +
    '016B016D016F0171017301750177017A017C017E-0180018301850188018C018D0192' +
    '01950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-' +
    '01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E5' +
    '01E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209' +
    '020B020D020F02110213021502170219021B021D021F02210223022502270229022B' +
    '022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-' +
    '02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD' +
    '03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F0461' +
    '0463046504670469046B046D046F04710473047504770479047B047D047F0481048B' +
    '048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD' +
    '04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF' +
    '04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F1' +
    '04F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513' +
    '051505170519051B051D051F05210523052505270561-05871D00-1D2B1D6B-1D77' +
    '1D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D' +
    '1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F' +
    '1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E61' +
    '1E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E83' +
    '1E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB' +
    '1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD' +
    '1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF' +
    '1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-' +
    '1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB4' +
    '1FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF6' +
    '1FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C61' +
    '2C652C662C682C6A2C6C2C712C732C742C76-2C7B2C812C832C852C872C892C8B2C8D' +
    '2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF' +
    '2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD1' +
    '2CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2CF32D00-2D252D272D2D' +
    'A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA661' +
    'A663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695' +
    'A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741' +
    'A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763' +
    'A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CA78E' +
    'A791A793A7A1A7A3A7A5A7A7A7A9A7FAFB00-FB06FB13-FB17FF41-FF5A'
);

/**
 * Expose Unicode Alphabetic Range: Contains Lu (Letter, uppercase),
 * Ll (Letter, lowercase), and Lo (Letter, other).
 *
 * "Borrowed" from XRegexp.
 *
 * @global
 * @api private
 * @constant
 */
GROUP_ALPHABETIC = expand('0041-005A0061-007A00AA00B500BA00C0-00D6' +
    '00D8-00F600F8-02C102C6-02D102E0-02E402EC02EE03450370-037403760377' +
    '037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-0527' +
    '0531-055605590561-058705B0-05BD05BF05C105C205C405C505C705D0-05EA' +
    '05F0-05F20610-061A0620-06570659-065F066E-06D306D5-06DC06E1-06E8' +
    '06ED-06EF06FA-06FC06FF0710-073F074D-07B107CA-07EA07F407F507FA0800-' +
    '0817081A-082C0840-085808A008A2-08AC08E4-08E908F0-08FE0900-093B' +
    '093D-094C094E-09500955-09630971-09770979-097F0981-09830985-098C' +
    '098F09900993-09A809AA-09B009B209B6-09B909BD-09C409C709C809CB09CC' +
    '09CE09D709DC09DD09DF-09E309F009F10A01-0A030A05-0A0A0A0F0A100A13-' +
    '0A280A2A-0A300A320A330A350A360A380A390A3E-0A420A470A480A4B0A4C0A51' +
    '0A59-0A5C0A5E0A70-0A750A81-0A830A85-0A8D0A8F-0A910A93-0AA80AAA-' +
    '0AB00AB20AB30AB5-0AB90ABD-0AC50AC7-0AC90ACB0ACC0AD00AE0-0AE30B01-' +
    '0B030B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D-0B44' +
    '0B470B480B4B0B4C0B560B570B5C0B5D0B5F-0B630B710B820B830B85-0B8A0B8E' +
    '-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BBE-' +
    '0BC20BC6-0BC80BCA-0BCC0BD00BD70C01-0C030C05-0C0C0C0E-0C100C12-0C28' +
    '0C2A-0C330C35-0C390C3D-0C440C46-0C480C4A-0C4C0C550C560C580C590C60-' +
    '0C630C820C830C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD-0CC4' +
    '0CC6-0CC80CCA-0CCC0CD50CD60CDE0CE0-0CE30CF10CF20D020D030D05-0D0C' +
    '0D0E-0D100D12-0D3A0D3D-0D440D46-0D480D4A-0D4C0D4E0D570D60-0D63' +
    '0D7A-0D7F0D820D830D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60DCF-0DD4' +
    '0DD60DD8-0DDF0DF20DF30E01-0E3A0E40-0E460E4D0E810E820E840E870E88' +
    '0E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB90EBB-' +
    '0EBD0EC0-0EC40EC60ECD0EDC-0EDF0F000F40-0F470F49-0F6C0F71-0F810F88-' +
    '0F970F99-0FBC1000-10361038103B-103F1050-10621065-1068106E-1086108E' +
    '109C109D10A0-10C510C710CD10D0-10FA10FC-1248124A-124D1250-12561258' +
    '125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-' +
    '12C512C8-12D612D8-13101312-13151318-135A135F1380-138F13A0-13F4' +
    '1401-166C166F-167F1681-169A16A0-16EA16EE-16F01700-170C170E-1713' +
    '1720-17331740-17531760-176C176E-1770177217731780-17B317B6-17C817D' +
    '717DC1820-18771880-18AA18B0-18F51900-191C1920-192B1930-19381950-' +
    '196D1970-19741980-19AB19B0-19C91A00-1A1B1A20-1A5E1A61-1A741AA71B00' +
    '-1B331B35-1B431B45-1B4B1B80-1BA91BAC-1BAF1BBA-1BE51BE7-1BF11C00-' +
    '1C351C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF31CF51CF61D00-1DBF1E00-1F15' +
    '1F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB4' +
    '1FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-' +
    '1FF41FF6-1FFC2071207F2090-209C21022107210A-211321152119-211D2124' +
    '21262128212A-212D212F-2139213C-213F2145-2149214E2160-218824B6-' +
    '24E92C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2CF22CF32D00-2D252D272D2D' +
    '2D30-2D672D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-' +
    '2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2DE0-2DFF2E2F3005-30073021-30293031' +
    '-30353038-303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-' +
    '318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A48CA4D0-A4FDA500-' +
    'A60CA610-A61FA62AA62BA640-A66EA674-A67BA67F-A697A69F-A6EFA717-A71F' +
    'A722-A788A78B-A78EA790-A793A7A0-A7AAA7F8-A801A803-A805A807-A80A' +
    'A80C-A827A840-A873A880-A8C3A8F2-A8F7A8FBA90A-A92AA930-A952A960-' +
    'A97CA980-A9B2A9B4-A9BFA9CFAA00-AA36AA40-AA4DAA60-AA76AA7AAA80-' +
    'AABEAAC0AAC2AADB-AADDAAE0-AAEFAAF2-AAF5AB01-AB06AB09-AB0EAB11-' +
    'AB16AB20-AB26AB28-AB2EABC0-ABEAAC00-D7A3D7B0-D7C6D7CB-D7FBF900-' +
    'FA6DFA70-FAD9FB00-FB06FB13-FB17FB1D-FB28FB2A-FB36FB38-FB3CFB3EFB40' +
    'FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74' +
    'FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7' +
    'FFDA-FFDC'
);

/**
 * Expose Unicode White Space Range.
 *
 * "Borrowed" from XRegexp.
 *
 * @global
 * @api private
 * @constant
 */
GROUP_WHITE_SPACE = expand(
    '0009-000D0020008500A01680180E2000-200A20282029202F205F3000'
);

/**
 * Expose Unicode Combining Diacritical Marks, and Combining Diacritical
 * Marks for Symbols, Blocks.
 *
 * @global
 * @api private
 * @constant
 */
GROUP_COMBINING_DIACRITICAL_MARK = expand('20D0-20FF0300-036F');

/**
 * Expose Unicode Mark, Nonspacing Block.
 *
 * @global
 * @api private
 * @constant
 */
GROUP_COMBINING_NONSPACING_MARK = expand('0300-036F0483-04870591-05BD' +
    '05BF05C105C205C405C505C70610-061A064B-065F067006D6-06DC06DF-06E4' +
    '06E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-0823' +
    '0825-08270829-082D0859-085B08E4-08FE0900-0902093A093C0941-0948094D' +
    '0951-095709620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A42' +
    '0A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD' +
    '0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C40' +
    '0C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41' +
    '-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-' +
    '0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F86' +
    '0F870F8D-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E1058' +
    '1059105E-10601071-1074108210851086108D109D135D-135F1712-17141732-' +
    '1734175217531772177317B417B517B7-17BD17C617C9-17D317DD180B-180D' +
    '18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A62' +
    '1A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B80' +
    '1B811BA2-1BA51BA81BA91BAB1BE61BE81BE91BED1BEF-1BF11C2C-1C331C36' +
    '1C371CD0-1CD21CD4-1CE01CE2-1CE81CED1CF41DC0-1DE61DFC-1DFF20D0-20DC' +
    '20E120E5-20F02CEF-2CF12D7F2DE0-2DFF302A-302D3099309AA66FA674-A67D' +
    'A69FA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951' +
    'A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0' +
    'AAB2-AAB4AAB7AAB8AABEAABFAAC1AAECAAEDAAF6ABE5ABE8ABEDFB1EFE00-FE0F' +
    'FE20-FE26'
);

/**
 * Expose word characters. Includes Unicode:
 *
 * - Number Range (Nd, Nl, and No);
 * - Alphabetic Range (Lu, Ll, and Lo);
 * - Combining Diacritical Marks block;
 * - Combining Diacritical Marks for Symbols block;
 *
 * @global
 * @api private
 * @constant
 */
GROUP_WORD = GROUP_NUMERICAL + GROUP_ALPHABETIC +
    GROUP_COMBINING_DIACRITICAL_MARK + GROUP_COMBINING_NONSPACING_MARK;

/**
 * Expose Unicode Cs (Other, Surrogate) category.
 *
 * @global
 * @api private
 * @constant
 */
GROUP_ASTRAL = expand('D800-DBFFDC00-DFFF');

/**
 * Expose interrobang, question-, and exclamation mark.
 *
 * @global
 * @api private
 * @constant
 */
GROUP_TERMINAL_MARKER = '\\.\\u203D?!';

/**
 * Expose Unicode Pe (Punctuation, Close) category.
 *
 * "Borrowed" from XRegexp.
 *
 * @global
 * @api private
 * @constant
 */
GROUP_CLOSING_PUNCTUATION = expand('0029005D007D0F3B0F3D169C2046' +
    '207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF' +
    '298429862988298A298C298E2990299229942996299829D929DB29FD2E232E25' +
    '2E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36' +
    'FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63'
);

/**
 * Expose Unicode Pf (Punctuation, Final) category.
 *
 * "Borrowed" from XRegexp.
 *
 * @global
 * @api private
 * @constant
 */
GROUP_FINAL_PUNCTUATION = expand('00BB2019201D203A2E032E052E0A2E0D2E1D2E21');

/**
 * A blacklist of full stop characters that should not be treated as
 * terminal sentence markers:
 *
 * - A "word" boundry,
 * - followed by a case-insensitive abbreviation,
 * - followed by full stop.
 *
 * @global
 * @api private
 * @constant
 */
EXPRESSION_ABBREVIATION_PREFIX = new RegExp(
    '^(' +
        '[0-9]+|' +
        '[a-z]|' +
        /*
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
        'ca|cap|cca|cf|cp|cwt|ead|al|etc|fl|ff|ibid|id|nem|con|op|cit|cent|' +
        'pro|tem|sic|seq|stat|viz' +
    ')$'
);

/**
 * Matches closing or final punctuation, or terminal markers that should
 * still be included in the previous sentence, even though they follow
 * the sentence's terminal marker.
 *
 * @global
 * @api private
 * @constant
 */
EXPRESSION_AFFIX_PUNCTUATION = new RegExp(
    '^([' +
        GROUP_CLOSING_PUNCTUATION +
        GROUP_FINAL_PUNCTUATION +
        GROUP_TERMINAL_MARKER +
    '])\\1*$'
);

/**
 * Matches a string consisting of one or more new line characters.
 *
 * @global
 * @api private
 * @constant
 */
EXPRESSION_NEW_LINE = /^(\r?\n|\r)+$/;

/**
 * Matches punctuation which can be used to join two (sub?) words together.
 *
 * Includes:
 * - Hyphen-minus;
 * - full-stop;
 * - colon;
 * - Dumb single quote;
 * - Right single quote;
 * - Soft hyphen;
 * - Hyphen;
 * - Non-breaking hyphen;
 * - Hyphenation point;
 * - Middle dot
 *
 * @global
 * @api private
 * @constant
 */
EXPRESSION_INNER_WORD_PUNCTUATION =
    /^[-.:'\/\u2019\u00AD\u00B7\u2010\2011\u2027]$/;

/**
 * Matches an initial lower case letter.
 *
 * @global
 * @api private
 * @constant
 */
EXPRESSION_LOWER_INITIAL_EXCEPTION = new RegExp(
    '^[' +
        GROUP_LETTER_LOWER +
    ']'
);

/**
 * Apply modifiers on a token.
 *
 * @param {Function[]} modifiers
 * @param {Object} parent
 * @global
 * @api private
 */
function modify(modifiers, parent) {
    var length = modifiers.length,
        iterator = -1,
        modifier, pointer, result, children;

    /* Iterate over all modifiers... */
    while (++iterator < length) {
        modifier = modifiers[iterator];
        pointer = -1;

        /*
         * We allow conditional assignment here, because the length of the
         * parent's children will probably change.
         */
        children = parent.children;

        /* Iterate over all children... */
        while (children[++pointer]) {
            result = modifier(children[pointer], pointer, parent);

            /*
             * If the modifier returns a number, move the pointer over to
             * that child.
             */
            if (typeof result === 'number') {
                pointer = result - 1;
            }
        }
    }
}

/**
 * Returns the value of all `TextNode` tokens inside a given token.
 *
 * @param {Object} token
 * @return {string} - The stringified token.
 * @global
 * @api private
 */
function tokenToString(token) {
    var value = '',
        iterator, children;

    if (token.value) {
        return token.value;
    }

    iterator = -1;
    children = token.children;

    /* Shortcut: This is pretty common, and a small performance win. */
    if (children.length === 1 && children[0].type === 'TextNode') {
        return children[0].value;
    }

    while (children[++iterator]) {
        value += tokenToString(children[iterator]);
    }

    return value;
}

/**
 * Creates a (modifiable) tokenizer.
 *
 * @param {Object} context               - The class to attach to.
 * @param {Object} options               - The settings to use.
 * @param {string} options.name          - The name of the method.
 * @param {string} options.type          - The type of parent node to create.
 * @param {string} options.tokenizer     - The property where the child
 *                                         tokenizer lives
 * @param {Function[]} options.modifiers - The initial modifiers to apply on
 *                                         each parse.
 * @param {RegExp} options.delimiter     - The delimiter to break children at.
 * @return {Function} - The tokenizer.
 * @global
 * @api private
 */
function tokenizerFactory(context, options) {
    var name = options.name;

    context.prototype[name + 'Modifiers'] = options.modifiers;
    context.prototype[name + 'Delimiter'] = options.delimiter;

    return function (value) {
        var delimiter = this[name + 'Delimiter'],
            lastIndex, children, iterator, length, root, start, stem, tokens;

        root = {
            'type' : options.type,
            'children' : []
        };

        children = root.children;

        stem = this[options.tokenizer](value);
        tokens = stem.children;

        length = tokens.length;
        lastIndex = length - 1;
        iterator = -1;
        start = 0;

        while (++iterator < length) {
            if (
                iterator !== lastIndex &&
                !delimiter.test(tokenToString(tokens[iterator]))
            ) {
                continue;
            }

            children.push({
                'type' : stem.type,
                'children' : tokens.slice(start, iterator + 1)
            });

            start = iterator + 1;
        }

        modify(this[name + 'Modifiers'], root);

        return root;
    };
}

/**
 * Merges two words surrounding certain punctuation marks.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function mergeInnerWordPunctuation(child, index, parent) {
    var children, prev, next;

    if (index === 0 || child.type !== 'PunctuationNode') {
        return;
    }

    children = parent.children;
    prev = children[index - 1];
    next = children[index + 1];

    if (
        prev.type !== 'WordNode' || !next ||
        (
            next.type !== 'WordNode' &&
            next.type !== 'PunctuationNode'
        )
    ) {
        return;
    }

    if (!EXPRESSION_INNER_WORD_PUNCTUATION.test(child.children[0].value)) {
        return;
    }

    /* e.g., C.I.A{.}\'s, where in curly brackets the child is depicted. */
    if (next.type === 'PunctuationNode') {
        if (
            child.children[0].value !== '.' ||
            !EXPRESSION_INNER_WORD_PUNCTUATION.test(next.children[0].value)
        ) {
            return;
        }

        /* Remove `child` from parent. */
        children.splice(index, 1);

        /* Add `child` to the previous children. */
        prev.children.push(child);

        return index - 1;
    }

    /* Remove `child` and `next` from parent. */
    children.splice(index, 2);

    prev.children = prev.children.concat(child, next.children);

    return index - 1;
}

/**
 * Merges initialisms.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function mergeInitialisms(child, index, parent) {
    var prev, children, length, iterator;

    if (
        index === 0 || child.type !== 'PunctuationNode' ||
        child.children[0].value !== '.'
    ) {
        return;
    }

    prev = parent.children[index - 1];
    children = prev.children;

    /* istanbul ignore else: TOSPEC: Currently not spec-able, but
     * future-friendly */
    if (children) {
        length = children.length;
    } else {
        length = 0;
    }

    if (prev.type !== 'WordNode' || length < 2 || length % 2 === 0) {
        return;
    }

    iterator = length;

    while (children[--iterator]) {
        if (iterator % 2 === 0) {
            /* istanbul ignore if: TOSPEC: Currently not spec-able, but
             * future-friendly */
            if (children[iterator].type !== 'TextNode') {
                return;
            }

            if (children[iterator].value.length > 1) {
                return;
            }
        } else if (
            children[iterator].type !== 'PunctuationNode' ||
            children[iterator].children[0].value !== '.'
        ) {
            /* istanbul ignore else: TOSPEC */
            if (iterator < length - 2) {
                break;
            } else {
                return;
            }
        }
    }

    /* Remove `child` from parent. */
    parent.children.splice(index, 1);

    /* Add child to the previous children. */
    children.push(child);
}

/**
 * Merges a sentence into its next sentence, when the sentence ends with
 * a certain word.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function mergePrefixExceptions(child, index, parent) {
    var children = child.children,
        node;

    if (
        !children ||
        !children.length ||
        index === parent.children.length - 1
    ) {
        return;
    }

    node = children[children.length - 1];

    if (
        !node || node.type !== 'PunctuationNode' ||
        node.children[0].value !== '.'
    ) {
        return;
    }

    node = children[children.length - 2];

    if (!node ||
        node.type !== 'WordNode' ||
        !EXPRESSION_ABBREVIATION_PREFIX.test(
            node.children[0].value.toLowerCase()
        )
    ) {
        return;
    }

    child.children = children.concat(
        parent.children[index + 1].children
    );

    parent.children.splice(index + 1, 1);

    return index - 1;
}

/**
 * Merges a sentence into its previous sentence, when the sentence starts
 * with a comma.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function mergeAffixExceptions(child, index, parent) {
    var children = child.children,
        node, iterator, previousChild;

    if (!children || !children.length || index === 0) {
        return;
    }

    iterator = -1;

    while (children[++iterator]) {
        node = children[iterator];

        if (node.type === 'WordNode') {
            return;
        }

        if (node.type === 'PunctuationNode') {
            break;
        }
    }

    if (
        !node ||
        node.type !== 'PunctuationNode' ||
        node.children[0].value !== ','
    ) {
        return;
    }

    previousChild = parent.children[index - 1];

    previousChild.children = previousChild.children.concat(
        children
    );

    parent.children.splice(index, 1);

    return index - 1;
}

/**
 * Moves white space starting a sentence up, so they are the siblings
 * of sentences.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function makeInitialWhiteSpaceAndSourceSiblings(child, index, parent) {
    var children = child.children;

    if (
        !children ||
        !children.length ||
        (
            children[0].type !== 'WhiteSpaceNode' &&
            children[0].type !== 'SourceNode'
        )
    ) {
        return;
    }

    parent.children.splice(index, 0, children.shift());
}

/**
 * Moves white space ending a paragraph up, so they are the siblings
 * of paragraphs.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function makeFinalWhiteSpaceAndSourceSiblings(child, index, parent) {
    var children = child.children;

    if (
        !children ||
        children.length < 1 ||
        (
            children[children.length - 1].type !== 'WhiteSpaceNode' &&
            children[children.length - 1].type !== 'SourceNode'
        )
    ) {
        return;
    }

    parent.children.splice(index + 1, 0, child.children.pop());
}

/**
 * Merges a sentence into its previous sentence, when the sentence starts
 * with a lower case letter.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function mergeInitialLowerCaseLetterSentences(child, index, parent) {
    var node, children, iterator, previousChild;

    children = child.children;

    if (!children || !children.length || index === 0) {
        return;
    }

    iterator = -1;

    while (children[++iterator]) {
        node = children[iterator];

        if (node.type === 'PunctuationNode') {
            return;
        } else if (node.type === 'WordNode') {
            if (
                !EXPRESSION_LOWER_INITIAL_EXCEPTION.test(
                    node.children[0].value
                )
            ) {
                return;
            }

            previousChild = parent.children[index - 1];

            previousChild.children = previousChild.children.concat(
                children
            );

            parent.children.splice(index, 1);

            return index - 1;
        }
    }
}

/**
 * Merges a sentence into the following sentence, when the sentence does
 * not contain word tokens.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function mergeNonWordSentences(child, index, parent) {
    var children, iterator, otherChild;

    children = child.children;
    iterator = -1;

    while (children[++iterator]) {
        if (children[iterator].type === 'WordNode') {
            return;
        }
    }

    otherChild = parent.children[index - 1];

    if (otherChild) {
        otherChild.children = otherChild.children.concat(children);

        /* Remove the child. */
        parent.children.splice(index, 1);

        return index - 1;
    }

    otherChild = parent.children[index + 1];

    if (otherChild) {
        otherChild.children = children.concat(otherChild.children);

        /* Remove the child. */
        parent.children.splice(index, 1);

        return 0;
    }
}

/**
 * Merges punctuation- and whitespace-only between two line breaks into a
 * source node.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function mergeSourceLines(child, index, parent) {
    var iterator, siblings, sibling, value;

    if (
        !child ||
        child.type !== 'WhiteSpaceNode' ||
        !EXPRESSION_NEW_LINE.test(child.children[0].value)
    ) {
        return;
    }

    siblings = parent.children;
    iterator = index;
    value = '';

    while (siblings[--iterator]) {
        sibling = siblings[iterator];

        if (sibling.type === 'WordNode') {
            return;
        }

        if (
            sibling.type === 'WhiteSpaceNode' &&
            EXPRESSION_NEW_LINE.test(sibling.children[0].value)
        ) {
            break;
        }

        value = sibling.children[0].value + value;
    }

    if (!value) {
        return;
    }

    siblings.splice(iterator + 1, index - iterator - 1, {
        'type' : 'SourceNode',
        'value' : value
    });

    return iterator + 3;
}

/**
 * Moves certain punctuation following a terminal marker (thus in the
 * next sentence) to the previous sentence.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function mergeAffixPunctuation(child, index, parent) {
    var children = child.children;

    if (!children || !children.length || index === 0) {
        return;
    }

    if (
        children[0].type !== 'PunctuationNode' ||
        !EXPRESSION_AFFIX_PUNCTUATION.test(children[0].children[0].value)
    ) {
        return;
    }

    parent.children[index - 1].children.push(children.shift());

    return index - 1;
}

/**
 * Removes empty children.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {number?} - Either void, or the next index to iterate over.
 *
 * @global
 * @api private
 */
function removeEmptyNodes(child, index, parent) {
    if ('children' in child && !child.children.length) {
        parent.children.splice(index, 1);
        return index > 0 ? index - 1 : 0;
    }
}

/**
 * `ParseLatin` contains the functions needed to tokenize natural Latin-script
 * language into a syntax tree.
 *
 * @constructor
 * @api public
 */
function ParseLatin() {
    /*
     * TODO: This should later be removed (when this change bubbles
     * through to dependants)
     */
    if (!(this instanceof ParseLatin)) {
        return new ParseLatin();
    }
}

parseLatinPrototype = ParseLatin.prototype;

/**
 * Matches all tokens:
 * - One or more number, alphabetic, or combining characters;
 * - One or more white space characters;
 * - One or more astral plane characters;
 * - One or more of the same character;
 *
 * @api private
 * @memberof ParseLatin#
 */
parseLatinPrototype.EXPRESSION_TOKEN = new RegExp(
    '[' + GROUP_WORD + ']+|' +
    '[' + GROUP_WHITE_SPACE + ']+|' +
    '[' + GROUP_ASTRAL + ']+|' +
    '([\\s\\S])\\1*',
    'g'
);

/**
 * Matches a word.
 *
 * @api private
 * @memberof ParseLatin#
 */
parseLatinPrototype.EXPRESSION_WORD = new RegExp(
    '^[' + GROUP_WORD + ']+$'
);

/**
 * Matches a string containing ONLY white space.
 *
 * @api private
 * @memberof ParseLatin#
 */
parseLatinPrototype.EXPRESSION_WHITE_SPACE = new RegExp(
    '^[' + GROUP_WHITE_SPACE + ']+$'
);

/**
 * Tokenize natural Latin-script language into letter and numbers (words),
 * white space, and everything else (punctuation).
 *
 * @param {string?} value
 * @return {Object[]} - An array of tokens.
 *
 * @api public
 * @memberof ParseLatin#
 */
parseLatinPrototype.tokenize = function (value) {
    var self, tokens, delimiter, start, end, match;

    if (value === null || value === undefined) {
        value = '';
    } else if (value instanceof String) {
        value = value.toString();
    }

    if (typeof value !== 'string') {
        throw new TypeError('Illegal invocation: \'' + value +
            '\' is not a valid argument for \'ParseLatin\'');
    }

    self = this;

    tokens = [];

    if (!value) {
        return tokens;
    }

    delimiter = self.EXPRESSION_TOKEN;

    delimiter.lastIndex = 0;
    start = 0;
    match = delimiter.exec(value);

    /* for every match of the token delimiter expression... */
    while (match) {
        /*
         * Move the pointer over to after its last character.
         */
        end = match.index + match[0].length;

        /*
         * Slice the found content, from (including) start to (not including)
         * end, classify it, and add the result to tokens.
         */
        tokens.push(self.classifier(value.substring(start, end)));

        match = delimiter.exec(value);
        start = end;
    }

    return tokens;
};

/*eslint-enable no-cond-assign */

/**
 * Classify a token.
 *
 * @param {string?} value
 * @return {Object} - A classified token.
 *
 * @api private
 * @memberof ParseLatin#
 */
parseLatinPrototype.classifier = function (value) {
    var type;

    /*
     * If the token consists solely of white space, classify it as white
     * space.
     */
    if (this.EXPRESSION_WHITE_SPACE.test(value)) {
        type = 'WhiteSpaceNode';
    /*
     * Otherwise, if the token contains just word characters, classify it as
     * a word.
     */
    } else if (this.EXPRESSION_WORD.test(value)) {
        type = 'WordNode';
    /*
     * Otherwise, classify it as punctuation.
     */
    } else {
        type = 'PunctuationNode';
    }

    /* Return a token. */
    return {
        'type' : type,
        'children' : [
            {
                'type' : 'TextNode',
                'value' : value
            }
        ]
    };
};

/**
 * Tokenize natural Latin-script language into a sentence token.
 *
 * @param {string?} value
 * @return {Object[]} - A sentence token.
 *
 * @api private
 * @memberof ParseLatin#
 */
parseLatinPrototype.tokenizeSentence = function (value) {
    var root = {
        'type' : 'SentenceNode',
        'children' : this.tokenize(value)
    };

    modify(this.tokenizeSentenceModifiers, root);

    /*
     * Return a sentence token, with its children set to the result of
     * tokenizing the given value.
     */
    return root;
};

parseLatinPrototype.tokenizeSentenceModifiers = [
    mergeInnerWordPunctuation,
    mergeSourceLines,
    mergeInitialisms
];

/**
 * Tokenize natural Latin-script language into a paragraph token.
 *
 * @param {string?} value
 * @return {Object[]} - A paragraph token.
 *
 * @api private
 * @memberof ParseLatin#
 */
parseLatinPrototype.tokenizeParagraph = tokenizerFactory(ParseLatin, {
    'name' : 'tokenizeParagraph',
    'tokenizer' : 'tokenizeSentence',
    'type' : 'ParagraphNode',
    'delimiter' : new RegExp('^([' + GROUP_TERMINAL_MARKER + ']+)$'),
    'modifiers' : [
        mergePrefixExceptions,
        mergeAffixExceptions,
        mergeNonWordSentences,
        mergeAffixPunctuation,
        mergeInitialLowerCaseLetterSentences,
        makeInitialWhiteSpaceAndSourceSiblings,
        makeFinalWhiteSpaceAndSourceSiblings,
        removeEmptyNodes
    ]
});

/**
 * Tokenize natural Latin-script language into a root token.
 *
 * @param {string?} value
 * @return {Object[]} - A root token.
 *
 * @api private
 * @memberof ParseLatin#
 */
parseLatinPrototype.tokenizeRoot = tokenizerFactory(ParseLatin, {
    'name' : 'tokenizeRoot',
    'tokenizer' : 'tokenizeParagraph',
    'type' : 'RootNode',
    'delimiter' : EXPRESSION_NEW_LINE,
    'modifiers' : [makeFinalWhiteSpaceAndSourceSiblings, removeEmptyNodes]
});

/**
 * Tokenize natural Latin-script language into a syntax tree.
 *
 * @param {string?} value
 * @return {Object[]} - The tokenized document.
 *
 * @api public
 * @memberof ParseLatin#
 */
parseLatinPrototype.parse = function (value) {
    return this.tokenizeRoot(value);
};

/**
 * Export ParseLatin.
 */
module.exports = ParseLatin;

});

require.register("wooorm~textom@0.1.0-rc.4", function (exports, module) {
'use strict';

/**
 * Utilities.
 */
var arrayPrototype = Array.prototype,
    arrayUnshift = arrayPrototype.unshift,
    arrayPush = arrayPrototype.push,
    arraySlice = arrayPrototype.slice,
    arrayIndexOf = arrayPrototype.indexOf,
    arraySplice = arrayPrototype.splice;

/* istanbul ignore if: User forgot a polyfill much? */
if (!arrayIndexOf) {
    throw new Error('Missing Array#indexOf() method for TextOM');
}

var ROOT_NODE = 'RootNode',
    PARAGRAPH_NODE = 'ParagraphNode',
    SENTENCE_NODE = 'SentenceNode',
    WORD_NODE = 'WordNode',
    PUNCTUATION_NODE = 'PunctuationNode',
    WHITE_SPACE_NODE = 'WhiteSpaceNode',
    SOURCE_NODE = 'SourceNode',
    TEXT_NODE = 'TextNode';

function fire(context, callbacks, args) {
    var iterator = -1;

    if (!callbacks || !callbacks.length) {
        return;
    }

    callbacks = callbacks.concat();

    while (callbacks[++iterator]) {
        callbacks[iterator].apply(context, args);
    }

    return;
}

function canInsertIntoParent(parent, child) {
    var allowed = parent.allowedChildTypes;

    if (!allowed || !allowed.length || !child.type) {
        return true;
    }

    return allowed.indexOf(child.type) > -1;
}

function validateInsert(parent, item, child) {
    if (!parent) {
        throw new TypeError('Illegal invocation: \'' + parent +
            ' is not a valid argument for \'insert\'');
    }

    if (!child) {
        throw new TypeError('\'' + child +
            ' is not a valid argument for \'insert\'');
    }

    if (parent === child || parent === item) {
        throw new Error('HierarchyError: Cannot insert a node into itself');
    }

    if (!canInsertIntoParent(parent, child)) {
        throw new Error('HierarchyError: The operation would ' +
            'yield an incorrect node tree');
    }

    if (typeof child.remove !== 'function') {
        throw new Error('The operated on node did not have a ' +
            '`remove` method');
    }

    /* Insert after... */
    if (item) {
        /* istanbul ignore if: Wrong-usage */
        if (item.parent !== parent) {
            throw new Error('The operated on node (the "pointer") ' +
                'was detached from the parent');
        }

        /* istanbul ignore if: Wrong-usage */
        if (arrayIndexOf.call(parent, item) === -1) {
            throw new Error('The operated on node (the "pointer") ' +
                'was attached to its parent, but the parent has no ' +
                'indice corresponding to the item');
        }
    }
}

/**
 * Inserts the given `child` after (when given), the `item`, and otherwise as
 * the first item of the given parents.
 *
 * @param {Object} parent
 * @param {Object} item
 * @param {Object} child
 * @api private
 */
function insert(parent, item, child) {
    var next;

    validateInsert(parent, item, child);

    /* Detach the child. */
    child.remove();

    /* Set the child's parent to items parent. */
    child.parent = parent;

    if (item) {
        next = item.next;

        /* If item has a next node... */
        if (next) {
            /* ...link the child's next node, to items next node. */
            child.next = next;

            /* ...link the next nodes previous node, to the child. */
            next.prev = child;
        }

        /* Set the child's previous node to item. */
        child.prev = item;

        /* Set the next node of item to the child. */
        item.next = child;

        /* If the parent has no last node or if item is the parent last node,
         * link the parents last node to the child. */
        if (item === parent.tail || !parent.tail) {
            parent.tail = child;
            arrayPush.call(parent, child);
        /* Else, insert the child into the parent after the items index. */
        } else {
            arraySplice.call(
                parent, arrayIndexOf.call(parent, item) + 1, 0, child
            );
        }
    /* If parent has a first node... */
    } else if (parent.head) {
        next = parent.head;

        /* Set the child's next node to head. */
        child.next = next;

        /* Set the previous node of head to the child. */
        next.prev = child;

        /* Set the parents heads to the child. */
        parent.head = child;

        /* If the the parent has no last node, link the parents last node to
         * head. */
        if (!parent.tail) {
            parent.tail = next;
        }

        arrayUnshift.call(parent, child);
    /* Prepend. There is no `head` (or `tail`) node yet. */
    } else {
        /* Set parent's first node to the prependee and return the child. */
        parent.head = child;
        parent[0] = child;
        parent.length = 1;
    }

    next = child.next;

    child.emit('insert');

    if (item) {
        item.emit('changenext', child, next);
        child.emit('changeprev', item, null);
    }

    if (next) {
        next.emit('changeprev', child, item);
        child.emit('changenext', next, null);
    }

    parent.trigger('insertinside', child);

    return child;
}

/**
 * Detach a node from its (when applicable) parent, links its (when
 * existing) previous and next items to each other.
 *
 * @param {Object} node
 * @api private
 */
function remove(node) {
    /* istanbul ignore if: Wrong-usage */
    if (!node) {
        return false;
    }

    /* Cache self, the parent list, and the previous and next items. */
    var parent = node.parent,
        prev = node.prev,
        next = node.next,
        indice;

    /* If the item is already detached, return node. */
    if (!parent) {
        return node;
    }

    /* If node is the last item in the parent, link the parents last
     * item to the previous item. */
    if (parent.tail === node) {
        parent.tail = prev;
    }

    /* If node is the first item in the parent, link the parents first
     * item to the next item. */
    if (parent.head === node) {
        parent.head = next;
    }

    /* If both the last and first items in the parent are the same,
     * remove the link to the last item. */
    if (parent.tail === parent.head) {
        parent.tail = null;
    }

    /* If a previous item exists, link its next item to nodes next
     * item. */
    if (prev) {
        prev.next = next;
    }

    /* If a next item exists, link its previous item to nodes previous
     * item. */
    if (next) {
        next.prev = prev;
    }

    /* istanbul ignore else: Wrong-usage */
    if ((indice = arrayIndexOf.call(parent, node)) !== -1) {
        arraySplice.call(parent, indice, 1);
    }

    /* Remove links from node to both the next and previous items,
     * and to the parent. */
    node.prev = node.next = node.parent = null;

    node.emit('remove', parent);

    if (next) {
        next.emit('changeprev', prev || null, node);
        node.emit('changenext', null, next);
    }

    if (prev) {
        node.emit('changeprev', null, prev);
        prev.emit('changenext', next || null, node);
    }

    parent.trigger('removeinside', node, parent);

    /* Return node. */
    return node;
}

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
        throw new TypeError('\'' + position + ' is not a valid ' +
            'argument for \'#split\'');
    } else if (position < 0) {
        position = Math.abs((length + position) % length);
    }

    return position;
}

function TextOMConstructor() {
    /**
     * Expose `Node`. Initialises a new `Node` object.
     *
     * @api public
     * @constructor
     */
    function Node() {
        if (!this.data) {
            /** @member {Object} */
            this.data = {};
        }
    }

    var prototype = Node.prototype;

    prototype.on = Node.on = function (name, callback) {
        var self = this,
            callbacks;

        if (typeof name !== 'string') {
            if (name === null || name === undefined) {
                return self;
            }

            throw new TypeError('Illegal invocation: \'' + name +
                ' is not a valid argument for \'listen\'');
        }

        if (typeof callback !== 'function') {
            if (callback === null || callback === undefined) {
                return self;
            }

            throw new TypeError('Illegal invocation: \'' + callback +
                ' is not a valid argument for \'listen\'');
        }

        callbacks = self.callbacks || (self.callbacks = {});
        callbacks = callbacks[name] || (callbacks[name] = []);
        callbacks.unshift(callback);

        return self;
    };

    prototype.off = Node.off = function (name, callback) {
        var self = this,
            callbacks, indice;

        if ((name === null || name === undefined) &&
            (callback === null || callback === undefined)) {
            self.callbacks = {};
            return self;
        }

        if (typeof name !== 'string') {
            if (name === null || name === undefined) {
                return self;
            }

            throw new TypeError('Illegal invocation: \'' + name +
                ' is not a valid argument for \'listen\'');
        }

        if (!(callbacks = self.callbacks)) {
            return self;
        }

        if (!(callbacks = callbacks[name])) {
            return self;
        }

        if (typeof callback !== 'function') {
            if (callback === null || callback === undefined) {
                callbacks.length = 0;
                return self;
            }

            throw new TypeError('Illegal invocation: \'' + callback +
                ' is not a valid argument for \'listen\'');
        }

        if ((indice = callbacks.indexOf(callback)) !== -1) {
            callbacks.splice(indice, 1);
        }

        return self;
    };

    prototype.emit = function (name) {
        var self = this,
            args = arraySlice.call(arguments, 1),
            constructors = self.constructor.constructors,
            iterator = -1,
            callbacks = self.callbacks;

        if (callbacks) {
            fire(self, callbacks[name], args);
        }

        /* istanbul ignore if: Wrong-usage */
        if (!constructors) {
            return;
        }

        while (constructors[++iterator]) {
            callbacks = constructors[iterator].callbacks;

            if (callbacks) {
                fire(self, callbacks[name], args);
            }
        }
    };

    prototype.trigger = function (name) {
        var self = this,
            args = arraySlice.call(arguments, 1),
            callbacks;

        while (self) {
            callbacks = self.callbacks;
            if (callbacks) {
                fire(self, callbacks[name], args);
            }

            callbacks = self.constructor.callbacks;
            if (callbacks) {
                fire(self, callbacks[name], args);
            }

            self = self.parent;
        }
    };

    /**
     * Inherit the contexts' (Super) prototype into a given Constructor. E.g.,
     * Node is implemented by Parent, Parent is implemented by RootNode, &c.
     *
     * @param {function} Constructor
     * @api public
     */
    Node.isImplementedBy = function (Constructor) {
        var self = this,
            constructors = self.constructors || [self],
            constructorPrototype, key, newPrototype;

        constructors = [Constructor].concat(constructors);

        constructorPrototype = Constructor.prototype;

        function AltConstructor () {}
        AltConstructor.prototype = self.prototype;
        newPrototype = new AltConstructor();

        for (key in constructorPrototype) {
            /* Note: Code climate, and probably other linters, will fail
             * here. Thats okay, their wrong. */
            newPrototype[key] = constructorPrototype[key];
        }

        if (constructorPrototype.toString !== {}.toString) {
            newPrototype.toString = constructorPrototype.toString;
        }

        for (key in self) {
            /* istanbul ignore else */
            if (self.hasOwnProperty(key)) {
                Constructor[key] = self[key];
            }
        }

        newPrototype.constructor = Constructor;
        Constructor.constructors = constructors;
        Constructor.prototype = newPrototype;
    };

    /**
     * Expose Parent. Constructs a new Parent node;
     *
     * @api public
     * @constructor
     */
    function Parent() {
        Node.apply(this, arguments);
    }

    prototype = Parent.prototype;

    /**
     * The first child of a parent, null otherwise.
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.head = null;

    /**
     * The last child of a parent (unless the last child is also the first
     * child), null otherwise.
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.tail = null;

    /**
     * The number of children in a parent.
     *
     * @api public
     * @type {number}
     * @readonly
     */
    prototype.length = 0;

    /**
     * Insert a child at the beginning of the list (like Array#unshift).
     *
     * @param {Child} child - the child to insert as the (new) FIRST child
     * @return {Child} - the given child.
     * @api public
     */
    prototype.prepend = function (child) {
        return insert(this, null, child);
    };

    /**
     * Insert a child at the end of the list (like Array#push).
     *
     * @param {Child} child - the child to insert as the (new) LAST child
     * @return {Child} - the given child.
     * @api public
     */
    prototype.append = function (child) {
        return insert(this, this.tail || this.head, child);
    };

    /**
     * Return a child at given position in parent, and null otherwise. (like
     * NodeList#item).
     *
     * @param {?number} [index=0] - the position to find a child at.
     * @return {Child?} - the found child, or null.
     * @api public
     */
    prototype.item = function (index) {
        if (index === null || index === undefined) {
            index = 0;
        } else if (typeof index !== 'number' || index !== index) {
            throw new TypeError('\'' + index + ' is not a valid argument ' +
                'for \'Parent.prototype.item\'');
        }

        return this[index] || null;
    };

    /**
     * Split the Parent into two, dividing the children from 0-position (NOT
     * including the character at `position`), and position-length (including
     * the character at `position`).
     *
     * @param {?number} [position=0] - the position to split at.
     * @return {Parent} - the prepended parent.
     * @api public
     */
    prototype.split = function (position) {
        var self = this,
            clone, cloneNode, iterator;

        position = validateSplitPosition(position, self.length);

        /* This throws if we're not attached, thus preventing appending. */
        /*eslint-disable new-cap */
        cloneNode = insert(self.parent, self.prev, new self.constructor());
        /*eslint-enable new-cap */

        clone = arraySlice.call(self);
        iterator = -1;

        while (++iterator < position && clone[iterator]) {
            cloneNode.append(clone[iterator]);
        }

        return cloneNode;
    };

    /**
     * Return the result of calling `toString` on each of `Parent`s children.
     *
     * NOTE The `toString` method is intentionally generic; It can be
     * transferred to other kinds of (linked-list-like) objects for use as a
     * method.
     *
     * @return {String}
     * @api public
     */
    prototype.toString = function () {
        var value, node;

        value = '';
        node = this.head;

        while (node) {
            value += node;
            node = node.next;
        }

        return value;
    };

    /**
     * Inherit from `Node.prototype`.
     */
    Node.isImplementedBy(Parent);

    /**
     * Expose Child. Constructs a new Child node;
     *
     * @api public
     * @constructor
     */
    function Child() {
        Node.apply(this, arguments);
    }

    prototype = Child.prototype;

    /**
     * The parent node, null otherwise (when the child is detached).
     *
     * @api public
     * @type {?Parent}
     * @readonly
     */
    prototype.parent = null;

    /**
     * The next node, null otherwise (when `child` is the parents last child
     * or detached).
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.next = null;

    /**
     * The previous node, null otherwise (when `child` is the parents first
     * child or detached).
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.prev = null;

    /**
     * Insert a given child before the operated on child in the parent.
     *
     * @param {Child} child - the child to insert before the operated on
     *                        child.
     * @return {Child} - the given child.
     * @api public
     */
    prototype.before = function (child) {
        return insert(this.parent, this.prev, child);
    };

    /**
     * Insert a given child after the operated on child in the parent.
     *
     * @param {Child} child - the child to insert after the operated on child.
     * @return {Child} - the given child.
     * @api public
     */
    prototype.after = function (child) {
        return insert(this.parent, this, child);
    };

    /**
     * Remove the operated on child, and insert a given child at its previous
     * position in the parent.
     *
     * @param {Child} child - the child to replace the operated on child with.
     * @return {Child} - the given child.
     * @api public
     */
    prototype.replace = function (child) {
        var result = insert(this.parent, this, child);

        remove(this);

        return result;
    };

    /**
     * Remove the operated on child.
     *
     * @return {Child} - the operated on child.
     * @api public
     */
    prototype.remove = function () {
        return remove(this);
    };

    /**
     * Inherit from `Node.prototype`.
     */
    Node.isImplementedBy(Child);

    /**
     * Expose Element. Constructs a new Element node;
     *
     * @api public
     * @constructor
     */
    function Element() {
        Parent.apply(this, arguments);
        Child.apply(this, arguments);
    }

    /**
     * Inherit from `Parent.prototype` and `Child.prototype`.
     */
    Parent.isImplementedBy(Element);
    Child.isImplementedBy(Element);

    /* Add Parent as a constructor (which it is) */
    Element.constructors.splice(2, 0, Parent);

    /**
     * Expose Text. Constructs a new Text node;
     *
     * @api public
     * @constructor
     */
    function Text(value) {
        Child.apply(this, arguments);

        this.fromString(value);
    }

    prototype = Text.prototype;

    /**
     * The internal value.
     *
     * @api private
     */
    prototype.internalValue = '';

    /**
     * Return the internal value of a Text;
     *
     * @return {String}
     * @api public
     */
    prototype.toString = function () {
        return this.internalValue;
    };

    /**
     * (Re)sets and returns the internal value of a Text with the stringified
     * version of the given value.
     *
     * @param {?String} [value=''] - the value to set
     * @return {String}
     * @api public
     */
    prototype.fromString = function (value) {
        var self = this,
            previousValue = self.toString(),
            parent;

        if (value === null || value === undefined) {
            value = '';
        } else {
            value = value.toString();
        }

        if (value !== previousValue) {
            self.internalValue = value;

            self.emit('changetext', value, previousValue);

            parent = self.parent;
            if (parent) {
                parent.trigger(
                    'changetextinside', self, value, previousValue
                );
            }
        }

        return value;
    };

    /**
     * Split the Text into two, dividing the internal value from 0-position
     * (NOT including the character at `position`), and position-length
     * (including the character at `position`).
     *
     * @param {?number} [position=0] - the position to split at.
     * @return {Child} - the prepended child.
     * @api public
     */
    prototype.split = function (position) {
        var self = this,
            value = self.internalValue,
            cloneNode;

        position = validateSplitPosition(position, value.length);

        /* This throws if we're not attached, thus preventing substringing. */
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
     * Expose RootNode. Constructs a new RootNode (inheriting from Parent);
     *
     * @api public
     * @constructor
     */
    function RootNode() {
        Parent.apply(this, arguments);
    }

    /**
     * The type of an instance of RootNode.
     *
     * @api public
     * @readonly
     * @static
     */
    RootNode.prototype.type = ROOT_NODE;

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
     * Expose ParagraphNode. Constructs a new ParagraphNode (inheriting from
     * both Parent and Child);
     *
     * @api public
     * @constructor
     */
    function ParagraphNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of ParagraphNode.
     *
     * @api public
     * @readonly
     * @static
     */
    ParagraphNode.prototype.type = PARAGRAPH_NODE;

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
     * Expose SentenceNode. Constructs a new SentenceNode (inheriting from
     * both Parent and Child);
     *
     * @api public
     * @constructor
     */
    function SentenceNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of SentenceNode.
     *
     * @api public
     * @readonly
     * @static
     */
    SentenceNode.prototype.type = SENTENCE_NODE;

    SentenceNode.prototype.allowedChildTypes = [
        WORD_NODE, PUNCTUATION_NODE, WHITE_SPACE_NODE, SOURCE_NODE
    ];

    /**
     * Inherit from `Parent.prototype` and `Child.prototype`.
     */
    Element.isImplementedBy(SentenceNode);

    /**
     * Expose WordNode.
     */
    function WordNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of WordNode.
     *
     * @api public
     * @readonly
     * @static
     */
    WordNode.prototype.type = WORD_NODE;

    WordNode.prototype.allowedChildTypes = [TEXT_NODE, PUNCTUATION_NODE];

    /**
     * Inherit from `Text.prototype`.
     */
    Element.isImplementedBy(WordNode);

    /**
     * Expose PunctuationNode.
     */
    function PunctuationNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of PunctuationNode.
     *
     * @api public
     * @readonly
     * @static
     */
    PunctuationNode.prototype.type = PUNCTUATION_NODE;

    PunctuationNode.prototype.allowedChildTypes = [TEXT_NODE];

    /**
     * Inherit from `Text.prototype`.
     */
    Element.isImplementedBy(PunctuationNode);

    /**
     * Expose WhiteSpaceNode.
     */
    function WhiteSpaceNode() {
        PunctuationNode.apply(this, arguments);
    }

    /**
     * The type of an instance of WhiteSpaceNode.
     *
     * @api public
     * @readonly
     * @static
     */
    WhiteSpaceNode.prototype.type = WHITE_SPACE_NODE;

    WhiteSpaceNode.prototype.allowedChildTypes = [TEXT_NODE];

    /**
     * Inherit from `Text.prototype`.
     */
    PunctuationNode.isImplementedBy(WhiteSpaceNode);

    /**
     * Expose SourceNode.
     */
    function SourceNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of SourceNode.
     *
     * @api public
     * @readonly
     * @static
     */
    SourceNode.prototype.type = SOURCE_NODE;

    /**
     * Inherit from `Text.prototype`.
     */
    Text.isImplementedBy(SourceNode);

    /**
     * Expose TextNode.
     */
    function TextNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of TextNode.
     *
     * @api public
     * @readonly
     * @static
     */
    TextNode.prototype.type = TEXT_NODE;

    /**
     * Inherit from `Text.prototype`.
     */
    Text.isImplementedBy(TextNode);

    var nodePrototype = Node.prototype,
        TextOM;

    /**
     * Define the `TextOM` object.
     * Expose `TextOM` on every instance of Node.
     *
     * @api public
     */
    nodePrototype.TextOM = TextOM = {};

    /**
     * Export all node types to `TextOM` and `Node#`.
     */
    TextOM.ROOT_NODE = nodePrototype.ROOT_NODE = ROOT_NODE;
    TextOM.PARAGRAPH_NODE = nodePrototype.PARAGRAPH_NODE = PARAGRAPH_NODE;
    TextOM.SENTENCE_NODE = nodePrototype.SENTENCE_NODE = SENTENCE_NODE;
    TextOM.WORD_NODE = nodePrototype.WORD_NODE = WORD_NODE;
    TextOM.PUNCTUATION_NODE = nodePrototype.PUNCTUATION_NODE =
        PUNCTUATION_NODE;
    TextOM.WHITE_SPACE_NODE = nodePrototype.WHITE_SPACE_NODE =
        WHITE_SPACE_NODE;
    TextOM.SOURCE_NODE = nodePrototype.SOURCE_NODE = SOURCE_NODE;
    TextOM.TEXT_NODE = nodePrototype.TEXT_NODE = TEXT_NODE;

    /**
     * Export all `Node`s to `TextOM`.
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
    TextOM.PunctuationNode = PunctuationNode;
    TextOM.WhiteSpaceNode = WhiteSpaceNode;
    TextOM.SourceNode = SourceNode;
    TextOM.TextNode = TextNode;

    /**
     * Expose `TextOM`. Used to instantiate a new `RootNode`.
     */
    return TextOM;
}

module.exports = TextOMConstructor;

});

require.register("wooorm~retext@0.1.0-rc.6", function (exports, module) {
'use strict';

var TextOMConstructor = require("wooorm~textom@0.1.0-rc.4"),
    ParseLatin = require("wooorm~parse-latin@0.1.0-rc.11");

function fromAST(TextOM, ast) {
    var iterator = -1,
        children, node, data, attribute;

    node = new TextOM[ast.type]();

    if ('children' in ast) {
        iterator = -1;
        children = ast.children;

        while (children[++iterator]) {
            node.append(fromAST(TextOM, children[iterator]));
        }
    } else {
        node.fromString(ast.value);
    }

    /* istanbul ignore if: TODO, Untestable, will change soon. */
    if ('data' in ast) {
        data = ast.data;

        for (attribute in data) {
            if (data.hasOwnProperty(attribute)) {
                node.data[attribute] = data[attribute];
            }
        }
    }

    return node;
}

function useImmediately(rootNode, use) {
    return function (plugin) {
        var self = this,
            length = self.plugins.length;

        use.apply(self, arguments);

        if (length !== self.plugins.length) {
            plugin(rootNode, self);
        }

        return self;
    };
}

/**
 * Define `Retext`. Exported above, and used to instantiate a new
 * `Retext`.
 *
 * @param {Function?} parser - the parser to use. Defaults to parse-latin.
 * @api public
 * @constructor
 */
function Retext(parser) {
    var self = this;

    if (!parser) {
        parser = new ParseLatin();
    }

    self.parser = parser;
    self.TextOM = parser.TextOM = new TextOMConstructor();
    self.TextOM.parser = parser;
    self.plugins = [];
}

/**
 * `Retext#use` takes a plugin-a humble function-and when the parse
 * method of the Retext instance is called, the plugin will be called
 * with the parsed tree, and the retext instance as arguments.
 *
 * Note that, during the parsing stage, when the `use` method is called
 * by a plugin, the nested plugin is immediately called, before continuing
 * on with its parent plugin.
 *
 * @param {Function} plugin - the plugin to call when parsing.
 * @param {Function?} plugin.attach - called only once with a Retext
 *                                    instance. If you're planning on
 *                                    modifying TextOM or a parser, do it
 *                                    in this method.
 * @return this
 * @api public
 */
Retext.prototype.use = function (plugin) {
    if (typeof plugin !== 'function') {
        throw new TypeError('Illegal invocation: \'' + plugin +
            '\' is not a valid argument for \'Retext.prototype.use\'');
    }

    var self = this,
        plugins = self.plugins;

    if (plugins.indexOf(plugin) === -1) {
        if (plugin.attach) {
            plugin.attach(self);
        }

        plugins.push(plugin);
    }

    return self;
};

/**
 * `Retext#parse` takes a source to be given (and parsed) by the parser.
 * Then, `parse` iterates over all plugins, and allows them to modify the
 * TextOM tree created by the parser.
 *
 * @param {String?} source - The source to convert.
 * @return {Node} - A RootNode containing the tokenised source.
 * @api public
 */
Retext.prototype.parse = function (source) {
    var self = this,
        rootNode = fromAST(self.TextOM, self.parser.tokenizeRoot(source));

    self.applyPlugins(rootNode);

    return rootNode;
};

/**
 * `Retext#applyPlugins` applies the plugins bound to the retext instance to a
 * given tree.
 *
 * Note that, during the parsing stage, when the `use` plugin is called
 * by a plugin, the nested plugin is immediately called, before continuing
 * on with its parent plugin.
 *
 * @param {Node} tree - The tree to apply plugins to.
 * @api public
 */
Retext.prototype.applyPlugins = function (tree) {
    var self = this,
        plugins = self.plugins.concat(),
        iterator = -1,
        use = self.use;

    self.use = useImmediately(tree, use);

    while (plugins[++iterator]) {
        plugins[iterator](tree, this);
    }

    self.use = use;
};

/**
 * Expose `Retext`. Used to instantiate a new Retext object.
 */
exports = module.exports = Retext;

});

require.register("retext-emoji-gh-pages", function (exports, module) {
var emoji = require("wooorm~retext-emoji@0.1.0"),
    Retext = require("wooorm~retext@0.1.0-rc.6"),
    inputElement = document.getElementsByTagName('textarea')[0],
    outputElement = document.getElementsByTagName('textarea')[1],
    convertElement = document.getElementsByName('convert')[0],
    retext;

function makeSmarter() {
    outputElement.value = retext.parse(inputElement.value).toString();
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

require("retext-emoji-gh-pages")
