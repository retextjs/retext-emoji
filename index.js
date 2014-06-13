'use strict';

var data = '\u2600|sunny|\u2614|umbrella|\u2601|cloud|\u2744|snowflake|\u26C4|snowman|\u26A1|zap|\uD83C\uDF00|cyclone|\uD83C\uDF01|foggy|\uD83C\uDF0A|ocean|\uD83D\uDC31|cat|\uD83D\uDC36|dog|\uD83D\uDC2D|mouse|\uD83D\uDC39|hamster|\uD83D\uDC30|rabbit|\uD83D\uDC3A|wolf|\uD83D\uDC38|frog|\uD83D\uDC2F|tiger|\uD83D\uDC28|koala|\uD83D\uDC3B|bear|\uD83D\uDC37|pig|\uD83D\uDC3D|pig_nose|\uD83D\uDC2E|cow|\uD83D\uDC17|boar|\uD83D\uDC35|monkey_face|\uD83D\uDC12|monkey|\uD83D\uDC34|horse|\uD83D\uDC0E|racehorse|\uD83D\uDC2B|camel|\uD83D\uDC11|sheep|\uD83D\uDC18|elephant|\uD83D\uDC3C|panda_face|\uD83D\uDC0D|snake|\uD83D\uDC26|bird|\uD83D\uDC24|baby_chick|\uD83D\uDC25|hatched_chick|\uD83D\uDC23|hatching_chick|\uD83D\uDC14|chicken|\uD83D\uDC27|penguin|\uD83D\uDC22|turtle|\uD83D\uDC1B|bug|\uD83D\uDC1D|honeybee|\uD83D\uDC1C|ant|\uD83D\uDC1E|beetle|\uD83D\uDC0C|snail|\uD83D\uDC19|octopus|\uD83D\uDC20|tropical_fish|\uD83D\uDC1F|fish|\uD83D\uDC33|whale|\uD83D\uDC0B|whale2|\uD83D\uDC2C|dolphin|\uD83D\uDC04|cow2|\uD83D\uDC0F|ram|\uD83D\uDC00|rat|\uD83D\uDC03|water_buffalo|\uD83D\uDC05|tiger2|\uD83D\uDC07|rabbit2|\uD83D\uDC09|dragon|\uD83D\uDC10|goat|\uD83D\uDC13|rooster|\uD83D\uDC15|dog2|\uD83D\uDC16|pig2|\uD83D\uDC01|mouse2|\uD83D\uDC02|ox|\uD83D\uDC32|dragon_face|\uD83D\uDC21|blowfish|\uD83D\uDC0A|crocodile|\uD83D\uDC2A|dromedary_camel|\uD83D\uDC06|leopard|\uD83D\uDC08|cat2|\uD83D\uDC29|poodle|\uD83D\uDC3E|paw_prints|\uD83D\uDC90|bouquet|\uD83C\uDF38|cherry_blossom|\uD83C\uDF37|tulip|\uD83C\uDF40|four_leaf_clover|\uD83C\uDF39|rose|\uD83C\uDF3B|sunflower|\uD83C\uDF3A|hibiscus|\uD83C\uDF41|maple_leaf|\uD83C\uDF43|leaves|\uD83C\uDF42|fallen_leaf|\uD83C\uDF3F|herb|\uD83C\uDF44|mushroom|\uD83C\uDF35|cactus|\uD83C\uDF34|palm_tree|\uD83C\uDF32|evergreen_tree|\uD83C\uDF33|deciduous_tree|\uD83C\uDF30|chestnut|\uD83C\uDF31|seedling|\uD83C\uDF3C|blossom|\uD83C\uDF3E|ear_of_rice|\uD83D\uDC1A|shell|\uD83C\uDF10|globe_with_meridians|\uD83C\uDF1E|sun_with_face|\uD83C\uDF1D|full_moon_with_face|\uD83C\uDF1A|new_moon_with_face|\uD83C\uDF11|new_moon|\uD83C\uDF12|waxing_crescent_moon|\uD83C\uDF13|first_quarter_moon|\uD83C\uDF14|waxing_gibbous_moon|\uD83C\uDF15|full_moon|\uD83C\uDF16|waning_gibbous_moon|\uD83C\uDF17|last_quarter_moon|\uD83C\uDF18|waning_crescent_moon|\uD83C\uDF1C|last_quarter_moon_with_face|\uD83C\uDF1B|first_quarter_moon_with_face|\uD83C\uDF19|moon|\uD83C\uDF0D|earth_africa|\uD83C\uDF0E|earth_americas|\uD83C\uDF0F|earth_asia|\uD83C\uDF0B|volcano|\uD83C\uDF0C|milky_way|\u26C5|partly_sunny|\uD83C\uDF8D|bamboo|\uD83D\uDC9D|gift_heart|\uD83C\uDF8E|dolls|\uD83D\uDC9D|gift_heart|\uD83C\uDF92|school_satchel|\uD83C\uDF93|mortar_board|\uD83C\uDF8F|flags|\uD83C\uDF86|fireworks|\uD83C\uDF87|sparkler|\uD83C\uDF90|wind_chime|\uD83C\uDF91|rice_scene|\uD83C\uDF83|jack_o_lantern|\uD83D\uDC7B|ghost|\uD83C\uDF85|santa|\uD83C\uDFB1|8ball|\u23F0|alarm_clock|\uD83C\uDF4E|apple|\uD83C\uDFA8|art|\uD83C\uDF7C|baby_bottle|\uD83C\uDF88|balloon|\uD83C\uDF4C|banana|\uD83D\uDCCA|bar_chart|\u26BE|baseball|\uD83C\uDFC0|basketball|\uD83D\uDEC0|bath|\uD83D\uDEC1|bathtub|\uD83D\uDD0B|battery|\uD83C\uDF7A|beer|\uD83C\uDF7B|beers|\uD83D\uDD14|bell|\uD83C\uDF71|bento|\uD83D\uDEB4|bicyclist|\uD83D\uDC59|bikini|\uD83C\uDF82|birthday|\uD83C\uDCCF|black_joker|\u2712|black_nib|\uD83D\uDCD8|blue_book|\uD83D\uDCA3|bomb|\uD83D\uDD16|bookmark|\uD83D\uDCD1|bookmark_tabs|\uD83D\uDCDA|books|\uD83D\uDC62|boot|\uD83C\uDFB3|bowling|\uD83C\uDF5E|bread|\uD83D\uDCBC|briefcase|\uD83D\uDCA1|bulb|\uD83C\uDF70|cake|\uD83D\uDCC6|calendar|\uD83D\uDCF2|calling|\uD83D\uDCF7|camera|\uD83C\uDF6C|candy|\uD83D\uDCC7|card_index|\uD83D\uDCBF|cd|\uD83D\uDCC9|chart_with_downwards_trend|\uD83D\uDCC8|chart_with_upwards_trend|\uD83C\uDF52|cherries|\uD83C\uDF6B|chocolate_bar|\uD83C\uDF84|christmas_tree|\uD83C\uDFAC|clapper|\uD83D\uDCCB|clipboard|\uD83D\uDCD5|closed_book|\uD83D\uDD10|closed_lock_with_key|\uD83C\uDF02|closed_umbrella|\u2663|clubs|\uD83C\uDF78|cocktail|\u2615|coffee|\uD83D\uDCBB|computer|\uD83C\uDF8A|confetti_ball|\uD83C\uDF6A|cookie|\uD83C\uDF3D|corn|\uD83D\uDCB3|credit_card|\uD83D\uDC51|crown|\uD83D\uDD2E|crystal_ball|\uD83C\uDF5B|curry|\uD83C\uDF6E|custard|\uD83C\uDF61|dango|\uD83C\uDFAF|dart|\uD83D\uDCC5|date|\u2666|diamonds|\uD83D\uDCB5|dollar|\uD83D\uDEAA|door|\uD83C\uDF69|doughnut|\uD83D\uDC57|dress|\uD83D\uDCC0|dvd|\uD83D\uDCE7|e-mail|\uD83C\uDF73|egg|\uD83C\uDF46|eggplant|\uD83D\uDD0C|electric_plug|\u2709|email|\uD83D\uDCB6|euro|\uD83D\uDC53|eyeglasses|\uD83D\uDCE0|fax|\uD83D\uDCC1|file_folder|\uD83C\uDF65|fish_cake|\uD83C\uDFA3|fishing_pole_and_fish|\uD83D\uDD26|flashlight|\uD83D\uDCBE|floppy_disk|\uD83C\uDFB4|flower_playing_cards|\uD83C\uDFC8|football|\uD83C\uDF74|fork_and_knife|\uD83C\uDF64|fried_shrimp|\uD83C\uDF5F|fries|\uD83C\uDFB2|game_die|\uD83D\uDC8E|gem|\uD83C\uDF81|gift|\u26F3|golf|\uD83C\uDF47|grapes|\uD83C\uDF4F|green_apple|\uD83D\uDCD7|green_book|\uD83C\uDFB8|guitar|\uD83D\uDD2B|gun|\uD83C\uDF54|hamburger|\uD83D\uDD28|hammer|\uD83D\uDC5C|handbag|\uD83C\uDFA7|headphones|\u2665|hearts|\uD83D\uDD06|high_brightness|\uD83D\uDC60|high_heel|\uD83D\uDD2A|hocho|\uD83C\uDF6F|honey_pot|\uD83C\uDFC7|horse_racing|\u231B|hourglass|\u23F3|hourglass_flowing_sand|\uD83C\uDF68|ice_cream|\uD83C\uDF66|icecream|\uD83D\uDCE5|inbox_tray|\uD83D\uDCE8|incoming_envelope|\uD83D\uDCF1|iphone|\uD83D\uDC56|jeans|\uD83D\uDD11|key|\uD83D\uDC58|kimono|\uD83D\uDCD2|ledger|\uD83C\uDF4B|lemon|\uD83D\uDC84|lipstick|\uD83D\uDD12|lock|\uD83D\uDD0F|lock_with_ink_pen|\uD83C\uDF6D|lollipop|\u27BF|loop|\uD83D\uDCE2|loudspeaker|\uD83D\uDD05|low_brightness|\uD83D\uDD0D|mag|\uD83D\uDD0E|mag_right|\uD83C\uDC04|mahjong|\uD83D\uDCEB|mailbox|\uD83D\uDCEA|mailbox_closed|\uD83D\uDCEC|mailbox_with_mail|\uD83D\uDCED|mailbox_with_no_mail|\uD83D\uDC5E|mans_shoe|\uD83C\uDF56|meat_on_bone|\uD83D\uDCE3|mega|\uD83C\uDF48|melon|\uD83D\uDCDD|memo|\uD83C\uDFA4|microphone|\uD83D\uDD2C|microscope|\uD83D\uDCBD|minidisc|\uD83D\uDCB8|money_with_wings|\uD83D\uDCB0|moneybag|\uD83D\uDEB5|mountain_bicyclist|\uD83C\uDFA5|movie_camera|\uD83C\uDFB9|musical_keyboard|\uD83C\uDFBC|musical_score|\uD83D\uDD07|mute|\uD83D\uDCDB|name_badge|\uD83D\uDC54|necktie|\uD83D\uDCF0|newspaper|\uD83D\uDD15|no_bell|\uD83D\uDCD3|notebook|\uD83D\uDCD4|notebook_with_decorative_cover|\uD83D\uDD29|nut_and_bolt|\uD83C\uDF62|oden|\uD83D\uDCC2|open_file_folder|\uD83D\uDCD9|orange_book|\uD83D\uDCE4|outbox_tray|\uD83D\uDCC4|page_facing_up|\uD83D\uDCC3|page_with_curl|\uD83D\uDCDF|pager|\uD83D\uDCCE|paperclip|\uD83C\uDF51|peach|\uD83C\uDF50|pear|\u270F|pencil2|\u260E|phone|\uD83D\uDC8A|pill|\uD83C\uDF4D|pineapple|\uD83C\uDF55|pizza|\uD83D\uDCEF|postal_horn|\uD83D\uDCEE|postbox|\uD83D\uDC5D|pouch|\uD83C\uDF57|poultry_leg|\uD83D\uDCB7|pound|\uD83D\uDC5B|purse|\uD83D\uDCCC|pushpin|\uD83D\uDCFB|radio|\uD83C\uDF5C|ramen|\uD83C\uDF80|ribbon|\uD83C\uDF5A|rice|\uD83C\uDF59|rice_ball|\uD83C\uDF58|rice_cracker|\uD83D\uDC8D|ring|\uD83C\uDFC9|rugby_football|\uD83C\uDFBD|running_shirt_with_sash|\uD83C\uDF76|sake|\uD83D\uDC61|sandal|\uD83D\uDCE1|satellite|\uD83C\uDFB7|saxophone|\u2702|scissors|\uD83D\uDCDC|scroll|\uD83D\uDCBA|seat|\uD83C\uDF67|shaved_ice|\uD83D\uDC55|shirt|\uD83D\uDEBF|shower|\uD83C\uDFBF|ski|\uD83D\uDEAC|smoking|\uD83C\uDFC2|snowboarder|\u26BD|soccer|\uD83D\uDD09|sound|\uD83D\uDC7E|space_invader|\u2660|spades|\uD83C\uDF5D|spaghetti|\uD83D\uDD0A|speaker|\uD83C\uDF72|stew|\uD83D\uDCCF|straight_ruler|\uD83C\uDF53|strawberry|\uD83C\uDFC4|surfer|\uD83C\uDF63|sushi|\uD83C\uDF60|sweet_potato|\uD83C\uDFCA|swimmer|\uD83D\uDC89|syringe|\uD83C\uDF89|tada|\uD83C\uDF8B|tanabata_tree|\uD83C\uDF4A|tangerine|\uD83C\uDF75|tea|\uD83D\uDCDE|telephone_receiver|\uD83D\uDD2D|telescope|\uD83C\uDFBE|tennis|\uD83D\uDEBD|toilet|\uD83C\uDF45|tomato|\uD83C\uDFA9|tophat|\uD83D\uDCD0|triangular_ruler|\uD83C\uDFC6|trophy|\uD83C\uDF79|tropical_drink|\uD83C\uDFBA|trumpet|\uD83D\uDCFA|tv|\uD83D\uDD13|unlock|\uD83D\uDCFC|vhs|\uD83D\uDCF9|video_camera|\uD83C\uDFAE|video_game|\uD83C\uDFBB|violin|\u231A|watch|\uD83C\uDF49|watermelon|\uD83C\uDF77|wine_glass|\uD83D\uDC5A|womans_clothes|\uD83D\uDC52|womans_hat|\uD83D\uDD27|wrench|\uD83D\uDCB4|yen|\uD83D\uDE04|smile|\uD83D\uDE06|laughing|\uD83D\uDE0A|blush|\uD83D\uDE03|smiley|\u263A|relaxed|\uD83D\uDE0F|smirk|\uD83D\uDE0D|heart_eyes|\uD83D\uDE18|kissing_heart|\uD83D\uDE1A|kissing_closed_eyes|\uD83D\uDE33|flushed|\uD83D\uDE25|relieved|\uD83D\uDE0C|satisfied|\uD83D\uDE01|grin|\uD83D\uDE09|wink|\uD83D\uDE1C|stuck_out_tongue_winking_eye|\uD83D\uDE1D|stuck_out_tongue_closed_eyes|\uD83D\uDE00|grinning|\uD83D\uDE17|kissing|\uD83D\uDE19|kissing_smiling_eyes|\uD83D\uDE1B|stuck_out_tongue|\uD83D\uDE34|sleeping|\uD83D\uDE1F|worried|\uD83D\uDE26|frowning|\uD83D\uDE27|anguished|\uD83D\uDE2E|open_mouth|\uD83D\uDE2C|grimacing|\uD83D\uDE15|confused|\uD83D\uDE2F|hushed|\uD83D\uDE11|expressionless|\uD83D\uDE12|unamused|\uD83D\uDE05|sweat_smile|\uD83D\uDE13|sweat|\uD83D\uDE29|weary|\uD83D\uDE14|pensive|\uD83D\uDE1E|disappointed|\uD83D\uDE16|confounded|\uD83D\uDE28|fearful|\uD83D\uDE30|cold_sweat|\uD83D\uDE23|persevere|\uD83D\uDE22|cry|\uD83D\uDE2D|sob|\uD83D\uDE02|joy|\uD83D\uDE32|astonished|\uD83D\uDE31|scream|\uD83D\uDE2B|tired_face|\uD83D\uDE20|angry|\uD83D\uDE21|rage|\uD83D\uDE24|triumph|\uD83D\uDE2A|sleepy|\uD83D\uDE0B|yum|\uD83D\uDE37|mask|\uD83D\uDE0E|sunglasses|\uD83D\uDE35|dizzy_face|\uD83D\uDC7F|imp|\uD83D\uDE08|smiling_imp|\uD83D\uDE10|neutral_face|\uD83D\uDE36|no_mouth|\uD83D\uDE07|innocent|\uD83D\uDC7D|alien|\uD83D\uDC9B|yellow_heart|\uD83D\uDC99|blue_heart|\uD83D\uDC9C|purple_heart|\u2764|heart|\uD83D\uDC9A|green_heart|\uD83D\uDC94|broken_heart|\uD83D\uDC93|heartbeat|\uD83D\uDC97|heartpulse|\uD83D\uDC95|two_hearts|\uD83D\uDC9E|revolving_hearts|\uD83D\uDC98|cupid|\uD83D\uDC96|sparkling_heart|\u2728|sparkles|\u2B50|star|\uD83C\uDF1F|star2|\uD83D\uDCAB|dizzy|\uD83D\uDCA5|boom|\uD83D\uDCA2|anger|\u2757|exclamation|\u2753|question|\u2755|grey_exclamation|\u2754|grey_question|\uD83D\uDCA4|zzz|\uD83D\uDCA8|dash|\uD83D\uDCA6|sweat_drops|\uD83C\uDFB6|notes|\uD83C\uDFB5|musical_note|\uD83D\uDD25|fire|\uD83D\uDCA9|poop|\uD83D\uDC4D|thumbsup|\uD83D\uDC4E|thumbsdown|\uD83D\uDC4C|ok_hand|\uD83D\uDC4A|punch|\u270A|fist|\u270C|v|\uD83D\uDC4B|wave|\u270B|hand|\uD83D\uDC50|open_hands|\u261D|point_up|\uD83D\uDC47|point_down|\uD83D\uDC48|point_left|\uD83D\uDC49|point_right|\uD83D\uDE4C|raised_hands|\uD83D\uDE4F|pray|\uD83D\uDC46|point_up_2|\uD83D\uDC4F|clap|\uD83D\uDCAA|muscle|\uD83D\uDEB6|walking|\uD83C\uDFC3|runner|\uD83D\uDC6B|couple|\uD83D\uDC6A|family|\uD83D\uDC6C|two_men_holding_hands|\uD83D\uDC6D|two_women_holding_hands|\uD83D\uDC83|dancer|\uD83D\uDC6F|dancers|\uD83D\uDE46|ok_woman|\uD83D\uDE45|no_good|\uD83D\uDC81|information_desk_person|\uD83D\uDE4B|raised_hand|\uD83D\uDC70|bride_with_veil|\uD83D\uDE4E|person_with_pouting_face|\uD83D\uDE4D|person_frowning|\uD83D\uDE47|bow|\uD83D\uDC8F|couplekiss|\uD83D\uDC91|couple_with_heart|\uD83D\uDC86|massage|\uD83D\uDC87|haircut|\uD83D\uDC85|nail_care|\uD83D\uDC66|boy|\uD83D\uDC67|girl|\uD83D\uDC69|woman|\uD83D\uDC68|man|\uD83D\uDC76|baby|\uD83D\uDC75|older_woman|\uD83D\uDC74|older_man|\uD83D\uDC71|person_with_blond_hair|\uD83D\uDC72|man_with_gua_pi_mao|\uD83D\uDC73|man_with_turban|\uD83D\uDC77|construction_worker|\uD83D\uDC6E|cop|\uD83D\uDC7C|angel|\uD83D\uDC78|princess|\uD83D\uDE3A|smiley_cat|\uD83D\uDE38|smile_cat|\uD83D\uDE3B|heart_eyes_cat|\uD83D\uDE3D|kissing_cat|\uD83D\uDE3C|smirk_cat|\uD83D\uDE40|scream_cat|\uD83D\uDE3F|crying_cat_face|\uD83D\uDE39|joy_cat|\uD83D\uDE3E|pouting_cat|\uD83D\uDC79|japanese_ogre|\uD83D\uDC7A|japanese_goblin|\uD83D\uDE48|see_no_evil|\uD83D\uDE49|hear_no_evil|\uD83D\uDE4A|speak_no_evil|\uD83D\uDC82|guardsman|\uD83D\uDC80|skull|\uD83D\uDC63|feet|\uD83D\uDC44|lips|\uD83D\uDC8B|kiss|\uD83D\uDCA7|droplet|\uD83D\uDC42|ear|\uD83D\uDC40|eyes|\uD83D\uDC43|nose|\uD83D\uDC45|tongue|\uD83D\uDC8C|love_letter|\uD83D\uDC64|bust_in_silhouette|\uD83D\uDC65|busts_in_silhouette|\uD83D\uDCAC|speech_balloon|\uD83D\uDCAD|thought_balloon|\uD83D\uDEA1|aerial_tramway|\u2708|airplane|\uD83D\uDE91|ambulance|\u2693|anchor|\uD83D\uDE9B|articulated_lorry|\uD83C\uDFE7|atm|\uD83C\uDFE6|bank|\uD83D\uDC88|barber|\uD83D\uDD30|beginner|\uD83D\uDEB2|bike|\uD83D\uDE99|blue_car|\u26F5|boat|\uD83C\uDF09|bridge_at_night|\uD83D\uDE85|bullettrain_front|\uD83D\uDE84|bullettrain_side|\uD83D\uDE8C|bus|\uD83D\uDE8F|busstop|\uD83D\uDE97|car|\uD83C\uDFA0|carousel_horse|\uD83C\uDFC1|checkered_flag|\u26EA|church|\uD83C\uDFAA|circus_tent|\uD83C\uDF07|city_sunrise|\uD83C\uDF06|city_sunset|\uD83D\uDEA7|construction|\uD83C\uDFEA|convenience_store|\uD83C\uDF8C|crossed_flags|\uD83C\uDFEC|department_store|\uD83C\uDFF0|european_castle|\uD83C\uDFE4|european_post_office|\uD83C\uDFED|factory|\uD83C\uDFA1|ferris_wheel|\uD83D\uDE92|fire_engine|\u26F2|fountain|\u26FD|fuelpump|\uD83D\uDE81|helicopter|\uD83C\uDFE5|hospital|\uD83C\uDFE8|hotel|\u2668|hotsprings|\uD83C\uDFE0|house|\uD83C\uDFE1|house_with_garden|\uD83D\uDDFE|japan|\uD83C\uDFEF|japanese_castle|\uD83D\uDE88|light_rail|\uD83C\uDFE9|love_hotel|\uD83D\uDE90|minibus|\uD83D\uDE9D|monorail|\uD83D\uDDFB|mount_fuji|\uD83D\uDEA0|mountain_cableway|\uD83D\uDE9E|mountain_railway|\uD83D\uDDFF|moyai|\uD83C\uDFE2|office|\uD83D\uDE98|oncoming_automobile|\uD83D\uDE8D|oncoming_bus|\uD83D\uDE94|oncoming_police_car|\uD83D\uDE96|oncoming_taxi|\uD83C\uDFAD|performing_arts|\uD83D\uDE93|police_car|\uD83C\uDFE3|post_office|\uD83D\uDE83|railway_car|\uD83C\uDF08|rainbow|\uD83D\uDE80|rocket|\uD83C\uDFA2|roller_coaster|\uD83D\uDEA8|rotating_light|\uD83D\uDCCD|round_pushpin|\uD83D\uDEA3|rowboat|\uD83C\uDFEB|school|\uD83D\uDEA2|ship|\uD83C\uDFB0|slot_machine|\uD83D\uDEA4|speedboat|\uD83C\uDF03|stars|\uD83D\uDE89|station|\uD83D\uDDFD|statue_of_liberty|\uD83D\uDE82|steam_locomotive|\uD83C\uDF05|sunrise|\uD83C\uDF04|sunrise_over_mountains|\uD83D\uDE9F|suspension_railway|\uD83D\uDE95|taxi|\u26FA|tent|\uD83C\uDFAB|ticket|\uD83D\uDDFC|tokyo_tower|\uD83D\uDE9C|tractor|\uD83D\uDEA5|traffic_light|\uD83D\uDE86|train2|\uD83D\uDE8A|tram|\uD83D\uDEA9|triangular_flag_on_post|\uD83D\uDE8E|trolleybus|\uD83D\uDE9A|truck|\uD83D\uDEA6|vertical_traffic_light|\u26A0|warning|\uD83D\uDC92|wedding|\uD83C\uDDEF\uD83C\uDDF5|jp|\uD83C\uDDF0\uD83C\uDDF7|kr|\uD83C\uDDE8\uD83C\uDDF3|cn|\uD83C\uDDFA\uD83C\uDDF8|us|\uD83C\uDDEB\uD83C\uDDF7|fr|\uD83C\uDDEA\uD83C\uDDF8|es|\uD83C\uDDEE\uD83C\uDDF9|it|\uD83C\uDDF7\uD83C\uDDFA|ru|\uD83C\uDDEC\uD83C\uDDE7|gb|\uD83C\uDDE9\uD83C\uDDEA|de|\uD83D\uDCAF|100|\uD83D\uDD22|1234|\uD83C\uDD70|a|\uD83C\uDD8E|ab|\uD83D\uDD24|abc|\uD83D\uDD21|abcd|\uD83C\uDE51|accept|\u2652|aquarius|\u2648|aries|\u25C0|arrow_backward|\u23EC|arrow_double_down|\u23EB|arrow_double_up|\u2B07|arrow_down|\uD83D\uDD3D|arrow_down_small|\u25B6|arrow_forward|\u2935|arrow_heading_down|\u2934|arrow_heading_up|\u2B05|arrow_left|\u2199|arrow_lower_left|\u2198|arrow_lower_right|\u27A1|arrow_right|\u21AA|arrow_right_hook|\u2B06|arrow_up|\u2195|arrow_up_down|\uD83D\uDD3C|arrow_up_small|\u2196|arrow_upper_left|\u2197|arrow_upper_right|\uD83D\uDD03|arrows_clockwise|\uD83D\uDD04|arrows_counterclockwise|\uD83C\uDD71|b|\uD83D\uDEBC|baby_symbol|\uD83D\uDEC4|baggage_claim|\u2611|ballot_box_with_check|\u203C|bangbang|\u26AB|black_circle|\uD83D\uDD32|black_square_button|\u264B|cancer|\uD83D\uDD20|capital_abcd|\u2651|capricorn|\uD83D\uDCB9|chart|\uD83D\uDEB8|children_crossing|\uD83C\uDFA6|cinema|\uD83C\uDD91|cl|\uD83D\uDD50|clock1|\uD83D\uDD59|clock10|\uD83D\uDD65|clock1030|\uD83D\uDD5A|clock11|\uD83D\uDD66|clock1130|\uD83D\uDD5B|clock12|\uD83D\uDD67|clock1230|\uD83D\uDD5C|clock130|\uD83D\uDD51|clock2|\uD83D\uDD5D|clock230|\uD83D\uDD52|clock3|\uD83D\uDD5E|clock330|\uD83D\uDD53|clock4|\uD83D\uDD5F|clock430|\uD83D\uDD54|clock5|\uD83D\uDD60|clock530|\uD83D\uDD55|clock6|\uD83D\uDD61|clock630|\uD83D\uDD56|clock7|\uD83D\uDD62|clock730|\uD83D\uDD57|clock8|\uD83D\uDD63|clock830|\uD83D\uDD58|clock9|\uD83D\uDD64|clock930|\u3297|congratulations|\uD83C\uDD92|cool|\u00A9|copyright|\u27B0|curly_loop|\uD83D\uDCB1|currency_exchange|\uD83D\uDEC3|customs|\uD83D\uDCA0|diamond_shape_with_a_dot_inside|\uD83D\uDEAF|do_not_litter|\u0038\uFE0F\u20E3|eight|\u2734|eight_pointed_black_star|\u2733|eight_spoked_asterisk|\uD83D\uDD1A|end|\u23E9|fast_forward|\u0035\uFE0F\u20E3|five|\u0034\uFE0F\u20E3|four|\uD83C\uDD93|free|\u264A|gemini|\u0023\uFE0F\u20E3|hash|\uD83D\uDC9F|heart_decoration|\u2714|heavy_check_mark|\u2797|heavy_division_sign|\uD83D\uDCB2|heavy_dollar_sign|\u2796|heavy_minus_sign|\u2716|heavy_multiplication_x|\u2795|heavy_plus_sign|\uD83C\uDD94|id|\uD83C\uDE50|ideograph_advantage|\u2049|interrobang|\uD83D\uDD1F|keycap_ten|\uD83C\uDE01|koko|\uD83D\uDD35|large_blue_circle|\uD83D\uDD37|large_blue_diamond|\uD83D\uDD36|large_orange_diamond|\uD83D\uDEC5|left_luggage|\u2194|left_right_arrow|\u21A9|leftwards_arrow_with_hook|\u264C|leo|\u264E|libra|\uD83D\uDD17|link|\uD83D\uDEB9|mens|\uD83D\uDE87|metro|\uD83D\uDCF4|mobile_phone_off|\u274E|negative_squared_cross_mark|\uD83C\uDD95|new|\uD83C\uDD96|ng|\u0039\uFE0F\u20E3|nine|\uD83D\uDEB3|no_bicycles|\u26D4|no_entry|\uD83D\uDEAB|no_entry_sign|\uD83D\uDCF5|no_mobile_phones|\uD83D\uDEB7|no_pedestrians|\uD83D\uDEAD|no_smoking|\uD83D\uDEB1|non-potable_water|\u2B55|o|\uD83C\uDD7E|o2|\uD83C\uDD97|ok|\uD83D\uDD1B|on|\u0031\uFE0F\u20E3|one|\u26CE|ophiuchus|\uD83C\uDD7F|parking|\u303D|part_alternation_mark|\uD83D\uDEC2|passport_control|\u2653|pisces|\uD83D\uDEB0|potable_water|\uD83D\uDEAE|put_litter_in_its_place|\uD83D\uDD18|radio_button|\u267B|recycle|\uD83D\uDD34|red_circle|\u00AE|registered|\uD83D\uDD01|repeat|\uD83D\uDD02|repeat_one|\uD83D\uDEBB|restroom|\u23EA|rewind|\uD83C\uDE02|sa|\u2650|sagittarius|\u264F|scorpius|\u3299|secret|\u0037\uFE0F\u20E3|seven|\uD83D\uDCF6|signal_strength|\u0036\uFE0F\u20E3|six|\uD83D\uDD2F|six_pointed_star|\uD83D\uDD39|small_blue_diamond|\uD83D\uDD38|small_orange_diamond|\uD83D\uDD3A|small_red_triangle|\uD83D\uDD3B|small_red_triangle_down|\uD83D\uDD1C|soon|\uD83C\uDD98|sos|\uD83D\uDD23|symbols|\u2649|taurus|\u0033\uFE0F\u20E3|three|\u2122|tm|\uD83D\uDD1D|top|\uD83D\uDD31|trident|\uD83D\uDD00|twisted_rightwards_arrows|\u0032\uFE0F\u20E3|two|\uD83C\uDE39|u5272|\uD83C\uDE34|u5408|\uD83C\uDE3A|u55b6|\uD83C\uDE2F|u6307|\uD83C\uDE37|u6708|\uD83C\uDE36|u6709|\uD83C\uDE35|u6e80|\uD83C\uDE1A|u7121|\uD83C\uDE38|u7533|\uD83C\uDE32|u7981|\uD83C\uDE33|u7a7a|\uD83D\uDD1E|underage|\uD83C\uDD99|up|\uD83D\uDCF3|vibration_mode|\u264D|virgo|\uD83C\uDD9A|vs|\u3030|wavy_dash|\uD83D\uDEBE|wc|\u267F|wheelchair|\u2705|white_check_mark|\u26AA|white_circle|\uD83D\uDCAE|white_flower|\uD83D\uDD33|white_square_button|\uD83D\uDEBA|womens|\u274C|x|\u0030\uFE0F\u20E3|zero',
    decodedEmoticons = {},
    encodedEmoticons = {},
    iterator = -1,
    emoticon, gemoticon;

data = data.split('|');

while (data[++iterator]) {
    emoticon = data[iterator];
    gemoticon = ':' + data[++iterator] + ':';
    decodedEmoticons[gemoticon] = emoticon;
    encodedEmoticons[emoticon] = gemoticon;
}

function onchangeFactory(method) {
    return function () {
        var self = this,
            value = self.toString(),
            startNode, nodes, iterator, emoticon;

        if (value !== ':') {
            method(self, value);
            return;
        }

        startNode = self.prev;
        nodes = [];
        iterator = -1;

        while (startNode) {
            if (startNode.type === startNode.PUNCTUATION_NODE) {
                value = startNode.toString();

                if (value === ':') {
                    emoticon = startNode + nodes.reverse().join('') +
                        self;

                    if (decodedEmoticons[emoticon]) {
                        startNode.remove();

                        while (nodes[++iterator]) {
                            nodes[iterator].remove();
                        }

                        self.fromString(emoticon);
                    }

                    return;
                }

                // Many gemojis contain underscores, and two contain
                // dashes (`:e-mail:` and `:non-potable_water:`).
                if (value !== '_' && value !== '-') {
                    return;
                }
            }
            nodes.push(startNode);
            startNode = startNode.prev;
        }
    };
}

function encode(node, value) {
    if (decodedEmoticons[value]) {
        node.fromString(decodedEmoticons[value]);
    }
}

function decode(node, value) {
    if (encodedEmoticons[value]) {
        node.fromString(encodedEmoticons[value]);
    }
}

function attachFactory(type) {
    return function (retext) {
        var TextOM = retext.parser.TextOM,
            onchange = onchangeFactory(
                type === 'encode' ? encode : decode
            );

        TextOM.PunctuationNode.on('changetext', onchange);
        TextOM.PunctuationNode.on('changeprev', onchange);
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
