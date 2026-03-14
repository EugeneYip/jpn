import React, { useState } from "react";

/* ═══════════════════════════════════════════
   ICON PATH DICTIONARY
   ═══════════════════════════════════════════ */
const ICON_PATHS = {
  bookOpen: [
    "M3 5.5h5.5c2.2 0 4 1.8 4 4V20c-.7-1.1-1.8-1.8-3.2-1.8H3z",
    "M21 5.5h-5.5c-2.2 0-4 1.8-4 4V20c.7-1.1 1.8-1.8 3.2-1.8H21z",
  ],
  layers: [
    "M12 3 3 7.5 12 12l9-4.5L12 3Z",
    "M4.5 11.5 12 15l7.5-3.5",
    "M4.5 15.5 12 19l7.5-3.5",
  ],
  globe: [
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    "M3.5 9h17",
    "M3.5 15h17",
    "M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9Z",
  ],
  message: [
    "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-5 4v-4.5A2.5 2.5 0 0 1 4 13z",
  ],
  mic: [
    "M12 15a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z",
    "M6.5 11.5a5.5 5.5 0 0 0 11 0",
    "M12 17v4",
    "M9 21h6",
  ],
  pen: [
    "m4 20 4.5-1 9.3-9.3a1.8 1.8 0 0 0 0-2.5l-1-1a1.8 1.8 0 0 0-2.5 0L5 15.5 4 20Z",
    "m13.5 6.5 4 4",
  ],
  chart: ["M5 19V9", "M12 19V5", "M19 19v-7", "M3 19h18"],
  spark: [
    "M12 3l1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3L12 3Z",
    "m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z",
  ],
  check: ["M5 12.5 9.2 17 19 7.5"],
  alert: [
    "M12 8v5",
    "M12 17h.01",
    "M10.2 4.7 3.8 16a2 2 0 0 0 1.7 3h13a2 2 0 0 0 1.7-3L13.8 4.7a2 2 0 0 0-3.5 0Z",
  ],
  text: ["M4 6h16", "M4 10h10", "M4 14h16", "M4 18h9"],
  clock: [
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    "M12 7v5l3 2",
  ],
  target: [
    "M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    "M12 3v2", "M12 19v2", "M3 12h2", "M19 12h2",
  ],
  route: [
    "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    "M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    "M7.8 16.4c1.6-4.8 6.8-1.2 8.4-6.1",
  ],
  eye: [
    "M2.4 12C3.7 7.6 7.5 4.5 12 4.5s8.3 3.1 9.6 7.5c-1.3 4.4-5.1 7.5-9.6 7.5S3.7 16.4 2.4 12Z",
    "M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  ],
  hash: ["M4 9h16", "M4 15h16", "M10 3v18", "M14 3v18"],
  music: ["M9 18V5l12-2v13", "M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z", "M21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"],
  compass: [
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    "m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3 6.3-2.1Z",
  ],
  users: [
    "M18 20c0-3.3-2.7-6-6-6s-6 2.7-6 6",
    "M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  ],
  star: ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"],
  zap: ["M13 2 3 14h9l-1 8 10-12h-9l1-8Z"],
  food: ["M18 8h1a4 4 0 0 1 0 8h-1", "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z", "M6 1v3", "M10 1v3", "M14 1v3"],
  map: ["M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z", "M9 3v15", "M15 6v15"],
  chevDown: ["M6 9l6 6 6-6"],
  chevRight: ["M9 18l6-6-6-6"],
  sun: [
    "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    "M12 2v2", "M12 20v2", "M4.93 4.93l1.41 1.41", "M17.66 17.66l1.41 1.41",
    "M2 12h2", "M20 12h2", "M4.93 19.07l1.41-1.41", "M17.66 6.34l1.41-1.41",
  ],
  brain: [
    "M12 2a5 5 0 0 1 4.6 7 5 5 0 0 1-.8 9.8A4 4 0 0 1 12 22a4 4 0 0 1-3.8-3.2A5 5 0 0 1 7.4 9 5 5 0 0 1 12 2Z",
    "M12 2v20",
  ],
  arrowRight: ["M5 12h14", "M12 5l7 7-7 7"],
};

/* ═══════════════════════════════════════════
   HIRAGANA DATA
   ═══════════════════════════════════════════ */
const HIRAGANA_ROWS = [
  { row: "a", cells: [{ kana: "あ", romaji: "a" }, { kana: "い", romaji: "i" }, { kana: "う", romaji: "u" }, { kana: "え", romaji: "e" }, { kana: "お", romaji: "o" }] },
  { row: "k", cells: [{ kana: "か", romaji: "ka" }, { kana: "き", romaji: "ki" }, { kana: "く", romaji: "ku" }, { kana: "け", romaji: "ke" }, { kana: "こ", romaji: "ko" }] },
  { row: "s", cells: [{ kana: "さ", romaji: "sa" }, { kana: "し", romaji: "shi" }, { kana: "す", romaji: "su" }, { kana: "せ", romaji: "se" }, { kana: "そ", romaji: "so" }] },
  { row: "t", cells: [{ kana: "た", romaji: "ta" }, { kana: "ち", romaji: "chi" }, { kana: "つ", romaji: "tsu" }, { kana: "て", romaji: "te" }, { kana: "と", romaji: "to" }] },
  { row: "n", cells: [{ kana: "な", romaji: "na" }, { kana: "に", romaji: "ni" }, { kana: "ぬ", romaji: "nu" }, { kana: "ね", romaji: "ne" }, { kana: "の", romaji: "no" }] },
  { row: "h", cells: [{ kana: "は", romaji: "ha" }, { kana: "ひ", romaji: "hi" }, { kana: "ふ", romaji: "fu" }, { kana: "へ", romaji: "he" }, { kana: "ほ", romaji: "ho" }] },
  { row: "m", cells: [{ kana: "ま", romaji: "ma" }, { kana: "み", romaji: "mi" }, { kana: "む", romaji: "mu" }, { kana: "め", romaji: "me" }, { kana: "も", romaji: "mo" }] },
  { row: "y", cells: [{ kana: "や", romaji: "ya" }, { kana: "", romaji: "" }, { kana: "ゆ", romaji: "yu" }, { kana: "", romaji: "" }, { kana: "よ", romaji: "yo" }] },
  { row: "r", cells: [{ kana: "ら", romaji: "ra" }, { kana: "り", romaji: "ri" }, { kana: "る", romaji: "ru" }, { kana: "れ", romaji: "re" }, { kana: "ろ", romaji: "ro" }] },
  { row: "w", cells: [{ kana: "わ", romaji: "wa" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "を", romaji: "wo" }] },
  { row: "ん", cells: [{ kana: "ん", romaji: "n" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }] },
];

const KATAKANA_ROWS = [
  { row: "a", cells: [{ kana: "ア", romaji: "a" }, { kana: "イ", romaji: "i" }, { kana: "ウ", romaji: "u" }, { kana: "エ", romaji: "e" }, { kana: "オ", romaji: "o" }] },
  { row: "k", cells: [{ kana: "カ", romaji: "ka" }, { kana: "キ", romaji: "ki" }, { kana: "ク", romaji: "ku" }, { kana: "ケ", romaji: "ke" }, { kana: "コ", romaji: "ko" }] },
  { row: "s", cells: [{ kana: "サ", romaji: "sa" }, { kana: "シ", romaji: "shi" }, { kana: "ス", romaji: "su" }, { kana: "セ", romaji: "se" }, { kana: "ソ", romaji: "so" }] },
  { row: "t", cells: [{ kana: "タ", romaji: "ta" }, { kana: "チ", romaji: "chi" }, { kana: "ツ", romaji: "tsu" }, { kana: "テ", romaji: "te" }, { kana: "ト", romaji: "to" }] },
  { row: "n", cells: [{ kana: "ナ", romaji: "na" }, { kana: "ニ", romaji: "ni" }, { kana: "ヌ", romaji: "nu" }, { kana: "ネ", romaji: "ne" }, { kana: "ノ", romaji: "no" }] },
  { row: "h", cells: [{ kana: "ハ", romaji: "ha" }, { kana: "ヒ", romaji: "hi" }, { kana: "フ", romaji: "fu" }, { kana: "ヘ", romaji: "he" }, { kana: "ホ", romaji: "ho" }] },
  { row: "m", cells: [{ kana: "マ", romaji: "ma" }, { kana: "ミ", romaji: "mi" }, { kana: "ム", romaji: "mu" }, { kana: "メ", romaji: "me" }, { kana: "モ", romaji: "mo" }] },
  { row: "y", cells: [{ kana: "ヤ", romaji: "ya" }, { kana: "", romaji: "" }, { kana: "ユ", romaji: "yu" }, { kana: "", romaji: "" }, { kana: "ヨ", romaji: "yo" }] },
  { row: "r", cells: [{ kana: "ラ", romaji: "ra" }, { kana: "リ", romaji: "ri" }, { kana: "ル", romaji: "ru" }, { kana: "レ", romaji: "re" }, { kana: "ロ", romaji: "ro" }] },
  { row: "w", cells: [{ kana: "ワ", romaji: "wa" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "ヲ", romaji: "wo" }] },
  { row: "ン", cells: [{ kana: "ン", romaji: "n" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }, { kana: "", romaji: "" }] },
];

const DAKUTEN_HIRAGANA = [
  { row: "g", cells: ["が ga", "ぎ gi", "ぐ gu", "げ ge", "ご go"] },
  { row: "z", cells: ["ざ za", "じ ji", "ず zu", "ぜ ze", "ぞ zo"] },
  { row: "d", cells: ["だ da", "ぢ di*", "づ du*", "で de", "ど do"] },
  { row: "b", cells: ["ば ba", "び bi", "ぶ bu", "べ be", "ぼ bo"] },
  { row: "p", cells: ["ぱ pa", "ぴ pi", "ぷ pu", "ぺ pe", "ぽ po"] },
];

const DAKUTEN_KATAKANA = [
  { row: "g", cells: ["ガ ga", "ギ gi", "グ gu", "ゲ ge", "ゴ go"] },
  { row: "z", cells: ["ザ za", "ジ ji", "ズ zu", "ゼ ze", "ゾ zo"] },
  { row: "d", cells: ["ダ da", "ヂ di*", "ヅ du*", "デ de", "ド do"] },
  { row: "b", cells: ["バ ba", "ビ bi", "ブ bu", "ベ be", "ボ bo"] },
  { row: "p", cells: ["パ pa", "ピ pi", "プ pu", "ペ pe", "ポ po"] },
];

const YOON_DATA = [
  { base: "k", h: ["きゃ", "きゅ", "きょ"], k: ["キャ", "キュ", "キョ"], r: ["kya", "kyu", "kyo"] },
  { base: "s", h: ["しゃ", "しゅ", "しょ"], k: ["シャ", "シュ", "ショ"], r: ["sha", "shu", "sho"] },
  { base: "t", h: ["ちゃ", "ちゅ", "ちょ"], k: ["チャ", "チュ", "チョ"], r: ["cha", "chu", "cho"] },
  { base: "n", h: ["にゃ", "にゅ", "にょ"], k: ["ニャ", "ニュ", "ニョ"], r: ["nya", "nyu", "nyo"] },
  { base: "h", h: ["ひゃ", "ひゅ", "ひょ"], k: ["ヒャ", "ヒュ", "ヒョ"], r: ["hya", "hyu", "hyo"] },
  { base: "m", h: ["みゃ", "みゅ", "みょ"], k: ["ミャ", "ミュ", "ミョ"], r: ["mya", "myu", "myo"] },
  { base: "r", h: ["りゃ", "りゅ", "りょ"], k: ["リャ", "リュ", "リョ"], r: ["rya", "ryu", "ryo"] },
  { base: "g", h: ["ぎゃ", "ぎゅ", "ぎょ"], k: ["ギャ", "ギュ", "ギョ"], r: ["gya", "gyu", "gyo"] },
  { base: "j", h: ["じゃ", "じゅ", "じょ"], k: ["ジャ", "ジュ", "ジョ"], r: ["ja", "ju", "jo"] },
  { base: "b", h: ["びゃ", "びゅ", "びょ"], k: ["ビャ", "ビュ", "ビョ"], r: ["bya", "byu", "byo"] },
  { base: "p", h: ["ぴゃ", "ぴゅ", "ぴょ"], k: ["ピャ", "ピュ", "ピョ"], r: ["pya", "pyu", "pyo"] },
];

/* ═══════════════════════════════════════════
   PRONUNCIATION GUIDE
   ═══════════════════════════════════════════ */
const PRONUNCIATION_TIPS = [
  { sound: "r-row (ら行)", tip: "Tap the tongue lightly behind the top teeth. Closer to a light \"d\" or Spanish \"r\" than an English \"r.\" Never curl the tongue back.", example: "らく (raku) = easy" },
  { sound: "ふ (fu)", tip: "Not a true English \"f\" with teeth on the lip. Blow air gently through both lips, like blowing out a candle softly.", example: "ふね (fune) = ship" },
  { sound: "Long vowels", tip: "Hold the vowel sound for exactly twice the normal length. おばさん (aunt) vs おばあさん (grandmother) — length changes meaning.", example: "おおきい (ookii) = big" },
  { sound: "っ (small tsu)", tip: "A brief pause — hold the following consonant for one extra beat. Like the double \"t\" in \"bookkeeper.\"", example: "きって (kitte) = stamp" },
  { sound: "ん (n)", tip: "Changes depending on what follows: \"m\" before b/p/m, \"ng\" before k/g, \"n\" elsewhere. Always one full beat.", example: "さんぽ (sampo) = walk" },
  { sound: "Pitch accent", tip: "Japanese uses pitch (high/low) rather than stress. The pattern varies by word and dialect. Listen and imitate native speakers.", example: "はし: chopsticks (HL) vs bridge (LH)" },
];

/* ═══════════════════════════════════════════
   CORE PHRASES
   ═══════════════════════════════════════════ */
const CORE_PHRASES = [
  { jp: "おはようございます", romaji: "ohayou gozaimasu", en: "Good morning", note: "Casual: おはよう" },
  { jp: "こんにちは", romaji: "konnichiwa", en: "Hello / Good afternoon", note: "Used roughly 10 AM – 6 PM" },
  { jp: "こんばんは", romaji: "konbanwa", en: "Good evening", note: "Used after sunset" },
  { jp: "おやすみなさい", romaji: "oyasumi nasai", en: "Good night", note: "Casual: おやすみ" },
  { jp: "ありがとうございます", romaji: "arigatou gozaimasu", en: "Thank you", note: "Casual: ありがとう" },
  { jp: "すみません", romaji: "sumimasen", en: "Excuse me / Sorry", note: "Used to get attention or apologize lightly" },
  { jp: "ごめんなさい", romaji: "gomen nasai", en: "I am sorry", note: "Stronger apology than すみません" },
  { jp: "お願いします", romaji: "onegai shimasu", en: "Please", note: "Used when asking someone to do something" },
  { jp: "はい", romaji: "hai", en: "Yes", note: "Also means \"I understand\" / \"Go ahead\"" },
  { jp: "いいえ", romaji: "iie", en: "No", note: "Often softened with indirect expressions" },
  { jp: "わかりました", romaji: "wakarimashita", en: "I understood", note: "Past tense = confirms understanding" },
  { jp: "わかりません", romaji: "wakarimasen", en: "I do not understand", note: "Present negative = ongoing state" },
  { jp: "もう一度お願いします", romaji: "mou ichido onegai shimasu", en: "One more time, please", note: "" },
  { jp: "ゆっくりお願いします", romaji: "yukkuri onegai shimasu", en: "Slowly, please", note: "" },
  { jp: "英語を話せますか", romaji: "eigo o hanasemasu ka", en: "Can you speak English?", note: "" },
  { jp: "大丈夫です", romaji: "daijoubu desu", en: "It is okay / I am fine", note: "Extremely versatile expression" },
  { jp: "いただきます", romaji: "itadakimasu", en: "Thank you for the meal (before eating)", note: "Said before every meal" },
  { jp: "ごちそうさまでした", romaji: "gochisousama deshita", en: "Thank you for the meal (after eating)", note: "Said after every meal" },
];

const SELF_INTRO = [
  { jp: "はじめまして", romaji: "hajimemashite", en: "Nice to meet you (first time)" },
  { jp: "わたしは ___ です", romaji: "watashi wa ___ desu", en: "I am ___" },
  { jp: "___から来ました", romaji: "___ kara kimashita", en: "I came from ___" },
  { jp: "___で働いています", romaji: "___ de hataraiteimasu", en: "I work at ___" },
  { jp: "日本語を勉強しています", romaji: "nihongo o benkyou shiteimasu", en: "I am studying Japanese" },
  { jp: "どうぞよろしくお願いします", romaji: "douzo yoroshiku onegai shimasu", en: "Please treat me kindly" },
];

/* ═══════════════════════════════════════════
   NUMBERS & COUNTING
   ═══════════════════════════════════════════ */
const NUMBERS_BASIC = [
  { n: "0", jp: "ゼロ / れい", romaji: "zero / rei" },
  { n: "1", jp: "いち", romaji: "ichi" },
  { n: "2", jp: "に", romaji: "ni" },
  { n: "3", jp: "さん", romaji: "san" },
  { n: "4", jp: "よん / し", romaji: "yon / shi" },
  { n: "5", jp: "ご", romaji: "go" },
  { n: "6", jp: "ろく", romaji: "roku" },
  { n: "7", jp: "なな / しち", romaji: "nana / shichi" },
  { n: "8", jp: "はち", romaji: "hachi" },
  { n: "9", jp: "きゅう / く", romaji: "kyuu / ku" },
  { n: "10", jp: "じゅう", romaji: "juu" },
];

const NUMBERS_EXTENDED = [
  { n: "20", jp: "にじゅう", romaji: "ni-juu" },
  { n: "100", jp: "ひゃく", romaji: "hyaku" },
  { n: "300", jp: "さんびゃく", romaji: "san-byaku" },
  { n: "600", jp: "ろっぴゃく", romaji: "roppyaku" },
  { n: "800", jp: "はっぴゃく", romaji: "happyaku" },
  { n: "1,000", jp: "せん", romaji: "sen" },
  { n: "3,000", jp: "さんぜん", romaji: "san-zen" },
  { n: "8,000", jp: "はっせん", romaji: "hassen" },
  { n: "10,000", jp: "いちまん", romaji: "ichi-man" },
  { n: "100,000", jp: "じゅうまん", romaji: "juu-man" },
];

const COUNTERS = [
  { counter: "〜つ", use: "General objects", examples: "ひとつ (1), ふたつ (2), みっつ (3), よっつ (4), いつつ (5)" },
  { counter: "〜人 (にん)", use: "People", examples: "ひとり (1), ふたり (2), さんにん (3)" },
  { counter: "〜個 (こ)", use: "Small objects", examples: "いっこ, にこ, さんこ" },
  { counter: "〜枚 (まい)", use: "Flat objects (paper, tickets)", examples: "いちまい, にまい, さんまい" },
  { counter: "〜本 (ほん)", use: "Long objects (pens, bottles)", examples: "いっぽん, にほん, さんぼん" },
  { counter: "〜杯 (はい)", use: "Cups / glasses / bowls", examples: "いっぱい, にはい, さんばい" },
  { counter: "〜冊 (さつ)", use: "Books", examples: "いっさつ, にさつ, さんさつ" },
  { counter: "〜台 (だい)", use: "Machines / vehicles", examples: "いちだい, にだい, さんだい" },
  { counter: "〜匹 (ひき)", use: "Small animals", examples: "いっぴき, にひき, さんびき" },
  { counter: "〜階 (かい)", use: "Floor / story", examples: "いっかい, にかい, さんがい" },
];

/* ═══════════════════════════════════════════
   TIME & CALENDAR
   ═══════════════════════════════════════════ */
const TIME_HOURS = [
  "いちじ (1:00)", "にじ (2:00)", "さんじ (3:00)", "よじ (4:00)",
  "ごじ (5:00)", "ろくじ (6:00)", "しちじ (7:00)", "はちじ (8:00)",
  "くじ (9:00)", "じゅうじ (10:00)", "じゅういちじ (11:00)", "じゅうにじ (12:00)",
];

const DAYS_OF_WEEK = [
  { jp: "月曜日", reading: "げつようび", en: "Monday" },
  { jp: "火曜日", reading: "かようび", en: "Tuesday" },
  { jp: "水曜日", reading: "すいようび", en: "Wednesday" },
  { jp: "木曜日", reading: "もくようび", en: "Thursday" },
  { jp: "金曜日", reading: "きんようび", en: "Friday" },
  { jp: "土曜日", reading: "どようび", en: "Saturday" },
  { jp: "日曜日", reading: "にちようび", en: "Sunday" },
];

const MONTHS = [
  "一月 いちがつ January", "二月 にがつ February", "三月 さんがつ March",
  "四月 しがつ April", "五月 ごがつ May", "六月 ろくがつ June",
  "七月 しちがつ July", "八月 はちがつ August", "九月 くがつ September",
  "十月 じゅうがつ October", "十一月 じゅういちがつ November", "十二月 じゅうにがつ December",
];

const RELATIVE_TIME = [
  { jp: "きのう", en: "yesterday" }, { jp: "きょう", en: "today" }, { jp: "あした", en: "tomorrow" },
  { jp: "せんしゅう", en: "last week" }, { jp: "こんしゅう", en: "this week" }, { jp: "らいしゅう", en: "next week" },
  { jp: "せんげつ", en: "last month" }, { jp: "こんげつ", en: "this month" }, { jp: "らいげつ", en: "next month" },
  { jp: "きょねん", en: "last year" }, { jp: "ことし", en: "this year" }, { jp: "らいねん", en: "next year" },
  { jp: "まいにち", en: "every day" }, { jp: "まいしゅう", en: "every week" }, { jp: "まいつき", en: "every month" },
];

/* ═══════════════════════════════════════════
   QUESTION WORDS
   ═══════════════════════════════════════════ */
const QUESTION_WORDS = [
  { jp: "何（なに/なん）", en: "what", example: "これは何ですか。" },
  { jp: "どこ", en: "where", example: "トイレはどこですか。" },
  { jp: "だれ", en: "who", example: "だれが来ますか。" },
  { jp: "いつ", en: "when", example: "いつ行きますか。" },
  { jp: "なぜ / どうして", en: "why", example: "どうして遅れましたか。" },
  { jp: "どう / いかが", en: "how", example: "日本語はどうですか。" },
  { jp: "いくら", en: "how much (price)", example: "これはいくらですか。" },
  { jp: "いくつ", en: "how many / how old", example: "りんごはいくつですか。" },
  { jp: "どれ", en: "which one (of 3+)", example: "どれがいいですか。" },
  { jp: "どの + noun", en: "which (adjective)", example: "どの本ですか。" },
  { jp: "どちら", en: "which one (of 2) / where (polite)", example: "どちらがいいですか。" },
];

/* ═══════════════════════════════════════════
   PARTICLES
   ═══════════════════════════════════════════ */
const PARTICLES = [
  { p: "は", role: "Topic marker", example: "わたしは学生です。", meaning: "As for me, I am a student.", notes: "Marks what the sentence is about. Pronounced \"wa.\"" },
  { p: "が", role: "Subject marker", example: "猫がいます。", meaning: "There is a cat.", notes: "Marks the grammatical subject, especially new information or emphasis." },
  { p: "を", role: "Object marker", example: "水を飲みます。", meaning: "I drink water.", notes: "Marks the direct object of an action. Pronounced \"o.\"" },
  { p: "に", role: "Time / Target / Location", example: "七時に起きます。", meaning: "I wake up at 7.", notes: "Time point, destination, location of existence, indirect object." },
  { p: "で", role: "Place of action / Means", example: "学校で勉強します。", meaning: "I study at school.", notes: "Also: method (バスで = by bus), reason, scope." },
  { p: "へ", role: "Direction (toward)", example: "日本へ行きます。", meaning: "I go toward Japan.", notes: "Pronounced \"e.\" Emphasizes direction, に emphasizes arrival." },
  { p: "の", role: "Possession / Linking", example: "日本語の本", meaning: "A Japanese-language book", notes: "Connects nouns. Also used for nominalization." },
  { p: "も", role: "Also / Too", example: "わたしも行きます。", meaning: "I will go too.", notes: "Replaces は, が, or を." },
  { p: "と", role: "And / With", example: "友だちと話します。", meaning: "I speak with a friend.", notes: "Exhaustive list (A and B). Also: quotation marker." },
  { p: "か", role: "Question", example: "行きますか。", meaning: "Will you go?", notes: "Turns a statement into a yes/no question." },
  { p: "から", role: "From / Because", example: "九時から始めます。", meaning: "We start from 9.", notes: "Spatial/temporal starting point. Also: reason (casual)." },
  { p: "まで", role: "Until / Up to", example: "五時まで働きます。", meaning: "I work until 5.", notes: "Often paired with から...まで (from...to)." },
  { p: "よ", role: "Emphasis (new info)", example: "おいしいですよ。", meaning: "It is delicious, you know.", notes: "Adds assertion. Sentence-ending particle." },
  { p: "ね", role: "Confirmation / Agreement", example: "いい天気ですね。", meaning: "Nice weather, isn't it?", notes: "Seeks agreement. Sentence-ending particle." },
];

/* ═══════════════════════════════════════════
   SENTENCE PATTERNS
   ═══════════════════════════════════════════ */
const PATTERNS = [
  { pattern: "A は B です", en: "A is B", example: "わたしは学生です。", exEn: "I am a student.", level: "N5" },
  { pattern: "A は B じゃありません", en: "A is not B", example: "わたしは先生じゃありません。", exEn: "I am not a teacher.", level: "N5" },
  { pattern: "A は B でした", en: "A was B", example: "きのうは日曜日でした。", exEn: "Yesterday was Sunday.", level: "N5" },
  { pattern: "これ / それ / あれ は X です", en: "This / That / That (far) is X", example: "これは本です。", exEn: "This is a book.", level: "N5" },
  { pattern: "X があります / います", en: "There is X (objects / living)", example: "猫がいます。机があります。", exEn: "There is a cat. There is a desk.", level: "N5" },
  { pattern: "X を V ます", en: "I do X", example: "日本語を勉強します。", exEn: "I study Japanese.", level: "N5" },
  { pattern: "X に/へ 行きます", en: "I go to X", example: "学校に行きます。", exEn: "I go to school.", level: "N5" },
  { pattern: "V たいです", en: "I want to do V", example: "食べたいです。", exEn: "I want to eat.", level: "N5" },
  { pattern: "X をください", en: "Please give me X", example: "水をください。", exEn: "Water, please.", level: "N5" },
  { pattern: "V てもいいですか", en: "May I do V?", example: "入ってもいいですか。", exEn: "May I come in?", level: "N4" },
  { pattern: "V てはいけません", en: "You must not do V", example: "ここで写真を撮ってはいけません。", exEn: "You must not take photos here.", level: "N4" },
  { pattern: "V ないでください", en: "Please do not do V", example: "触らないでください。", exEn: "Please do not touch.", level: "N4" },
  { pattern: "V たことがあります", en: "I have done V (experience)", example: "日本に行ったことがあります。", exEn: "I have been to Japan.", level: "N4" },
  { pattern: "V ながら", en: "While doing V", example: "音楽を聞きながら勉強します。", exEn: "I study while listening to music.", level: "N4" },
  { pattern: "V た方がいい", en: "It is better to do V", example: "早く寝た方がいいです。", exEn: "You should go to bed early.", level: "N4" },
  { pattern: "V ように なる", en: "To come to be able to V", example: "日本語が話せるようになりました。", exEn: "I became able to speak Japanese.", level: "N3" },
];

/* ═══════════════════════════════════════════
   VERB CONJUGATION
   ═══════════════════════════════════════════ */
const VERB_GROUPS_EXPLANATION = [
  { group: "Group 1 (u-verbs / godan)", rule: "Dictionary form ends in an u-sound consonant + u (く, す, つ, ぬ, ぶ, む, る, う, ぐ). The stem vowel changes for conjugation.", examples: "書く, 話す, 待つ, 飲む, 泳ぐ, 買う" },
  { group: "Group 2 (ru-verbs / ichidan)", rule: "Dictionary form ends in -いる or -える. Drop る and add the ending directly.", examples: "食べる, 見る, 起きる, 教える" },
  { group: "Group 3 (irregular)", rule: "Only two verbs: する (to do) and 来る (くる, to come). Both have unique conjugation patterns that must be memorized.", examples: "する, 来る (くる)" },
];

const VERB_FORMS = [
  { base: "食べる", type: "Gr.2", dict: "食べる", masu: "食べます", neg: "食べません", past: "食べました", te: "食べて", nai: "食べない", potential: "食べられる", volitional: "食べよう", en: "to eat" },
  { base: "飲む", type: "Gr.1", dict: "飲む", masu: "飲みます", neg: "飲みません", past: "飲みました", te: "飲んで", nai: "飲まない", potential: "飲める", volitional: "飲もう", en: "to drink" },
  { base: "書く", type: "Gr.1", dict: "書く", masu: "書きます", neg: "書きません", past: "書きました", te: "書いて", nai: "書かない", potential: "書ける", volitional: "書こう", en: "to write" },
  { base: "話す", type: "Gr.1", dict: "話す", masu: "話します", neg: "話しません", past: "話しました", te: "話して", nai: "話さない", potential: "話せる", volitional: "話そう", en: "to speak" },
  { base: "行く", type: "Gr.1*", dict: "行く", masu: "行きます", neg: "行きません", past: "行きました", te: "行って", nai: "行かない", potential: "行ける", volitional: "行こう", en: "to go" },
  { base: "見る", type: "Gr.2", dict: "見る", masu: "見ます", neg: "見ません", past: "見ました", te: "見て", nai: "見ない", potential: "見られる", volitional: "見よう", en: "to see" },
  { base: "する", type: "Gr.3", dict: "する", masu: "します", neg: "しません", past: "しました", te: "して", nai: "しない", potential: "できる", volitional: "しよう", en: "to do" },
  { base: "来る", type: "Gr.3", dict: "来る", masu: "来ます", neg: "来ません", past: "来ました", te: "来て", nai: "来ない", potential: "来られる", volitional: "来よう", en: "to come" },
  { base: "買う", type: "Gr.1", dict: "買う", masu: "買います", neg: "買いません", past: "買いました", te: "買って", nai: "買わない", potential: "買える", volitional: "買おう", en: "to buy" },
  { base: "待つ", type: "Gr.1", dict: "待つ", masu: "待ちます", neg: "待ちません", past: "待ちました", te: "待って", nai: "待たない", potential: "待てる", volitional: "待とう", en: "to wait" },
];

const TE_FORM_RULES = [
  { ending: "う / つ / る", change: "→ って", example: "買う → 買って, 待つ → 待って, 帰る → 帰って" },
  { ending: "む / ぶ / ぬ", change: "→ んで", example: "飲む → 飲んで, 遊ぶ → 遊んで, 死ぬ → 死んで" },
  { ending: "く", change: "→ いて", example: "書く → 書いて (exception: 行く → 行って)" },
  { ending: "ぐ", change: "→ いで", example: "泳ぐ → 泳いで" },
  { ending: "す", change: "→ して", example: "話す → 話して" },
  { ending: "ru-verb", change: "→ drop る + て", example: "食べる → 食べて, 見る → 見て" },
  { ending: "する", change: "→ して", example: "勉強する → 勉強して" },
  { ending: "来る", change: "→ 来て (きて)", example: "来る → 来て" },
];

const TE_FORM_USES = [
  { use: "V ています", meaning: "Ongoing action / state", example: "食べています = I am eating" },
  { use: "V てください", meaning: "Please do V", example: "座ってください = Please sit down" },
  { use: "V てもいいですか", meaning: "May I?", example: "写真を撮ってもいいですか = May I take a photo?" },
  { use: "V てはいけません", meaning: "Must not", example: "走ってはいけません = You must not run" },
  { use: "V てから", meaning: "After doing V", example: "手を洗ってから食べます = I eat after washing my hands" },
  { use: "V1 て V2", meaning: "Do V1 then V2 (sequence)", example: "起きて朝ごはんを食べます = I wake up and eat breakfast" },
];

/* ═══════════════════════════════════════════
   ADJECTIVES
   ═══════════════════════════════════════════ */
const ADJECTIVES = [
  { type: "い-adj", word: "大きい", en: "big", present: "大きいです", neg: "大きくないです", past: "大きかったです", pastNeg: "大きくなかったです" },
  { type: "い-adj", word: "小さい", en: "small", present: "小さいです", neg: "小さくないです", past: "小さかったです", pastNeg: "小さくなかったです" },
  { type: "い-adj", word: "高い", en: "tall / expensive", present: "高いです", neg: "高くないです", past: "高かったです", pastNeg: "高くなかったです" },
  { type: "い-adj", word: "安い", en: "cheap", present: "安いです", neg: "安くないです", past: "安かったです", pastNeg: "安くなかったです" },
  { type: "い-adj", word: "おいしい", en: "delicious", present: "おいしいです", neg: "おいしくないです", past: "おいしかったです", pastNeg: "おいしくなかったです" },
  { type: "な-adj", word: "静か(な)", en: "quiet", present: "静かです", neg: "静かじゃないです", past: "静かでした", pastNeg: "静かじゃなかったです" },
  { type: "な-adj", word: "元気(な)", en: "energetic / well", present: "元気です", neg: "元気じゃないです", past: "元気でした", pastNeg: "元気じゃなかったです" },
  { type: "な-adj", word: "好き(な)", en: "liked / favorite", present: "好きです", neg: "好きじゃないです", past: "好きでした", pastNeg: "好きじゃなかったです" },
  { type: "な-adj", word: "きれい(な)", en: "pretty / clean", present: "きれいです", neg: "きれいじゃないです", past: "きれいでした", pastNeg: "きれいじゃなかったです" },
];

/* ═══════════════════════════════════════════
   VOCABULARY BY CATEGORY
   ═══════════════════════════════════════════ */
const VOCAB_CATEGORIES = [
  {
    title: "Family", icon: "users",
    words: [
      { jp: "家族", reading: "かぞく", en: "family" },
      { jp: "父 / お父さん", reading: "ちち / おとうさん", en: "father (own / someone's)" },
      { jp: "母 / お母さん", reading: "はは / おかあさん", en: "mother (own / someone's)" },
      { jp: "兄 / お兄さん", reading: "あに / おにいさん", en: "older brother" },
      { jp: "姉 / お姉さん", reading: "あね / おねえさん", en: "older sister" },
      { jp: "弟", reading: "おとうと", en: "younger brother" },
      { jp: "妹", reading: "いもうと", en: "younger sister" },
    ],
  },
  {
    title: "Food & Drink", icon: "food",
    words: [
      { jp: "ごはん", reading: "", en: "rice / meal" },
      { jp: "パン", reading: "", en: "bread" },
      { jp: "水", reading: "みず", en: "water" },
      { jp: "お茶", reading: "おちゃ", en: "tea" },
      { jp: "コーヒー", reading: "", en: "coffee" },
      { jp: "肉", reading: "にく", en: "meat" },
      { jp: "魚", reading: "さかな", en: "fish" },
      { jp: "野菜", reading: "やさい", en: "vegetables" },
      { jp: "果物", reading: "くだもの", en: "fruit" },
    ],
  },
  {
    title: "Places", icon: "map",
    words: [
      { jp: "駅", reading: "えき", en: "station" },
      { jp: "学校", reading: "がっこう", en: "school" },
      { jp: "病院", reading: "びょういん", en: "hospital" },
      { jp: "銀行", reading: "ぎんこう", en: "bank" },
      { jp: "スーパー", reading: "", en: "supermarket" },
      { jp: "コンビニ", reading: "", en: "convenience store" },
      { jp: "ホテル", reading: "", en: "hotel" },
      { jp: "空港", reading: "くうこう", en: "airport" },
    ],
  },
  {
    title: "Directions", icon: "compass",
    words: [
      { jp: "右", reading: "みぎ", en: "right" },
      { jp: "左", reading: "ひだり", en: "left" },
      { jp: "まっすぐ", reading: "", en: "straight" },
      { jp: "前", reading: "まえ", en: "front" },
      { jp: "後ろ", reading: "うしろ", en: "behind" },
      { jp: "上", reading: "うえ", en: "above / on top" },
      { jp: "下", reading: "した", en: "below / under" },
      { jp: "中", reading: "なか", en: "inside" },
      { jp: "隣", reading: "となり", en: "next to" },
    ],
  },
];

/* ═══════════════════════════════════════════
   COMMON KANJI (N5)
   ═══════════════════════════════════════════ */
const BASIC_KANJI = [
  { kanji: "一", on: "イチ", kun: "ひと(つ)", en: "one", strokes: 1 },
  { kanji: "二", on: "ニ", kun: "ふた(つ)", en: "two", strokes: 2 },
  { kanji: "三", on: "サン", kun: "み(つ)", en: "three", strokes: 3 },
  { kanji: "人", on: "ジン・ニン", kun: "ひと", en: "person", strokes: 2 },
  { kanji: "大", on: "ダイ・タイ", kun: "おお(きい)", en: "big", strokes: 3 },
  { kanji: "小", on: "ショウ", kun: "ちい(さい)", en: "small", strokes: 3 },
  { kanji: "日", on: "ニチ・ジツ", kun: "ひ", en: "day / sun", strokes: 4 },
  { kanji: "月", on: "ゲツ・ガツ", kun: "つき", en: "month / moon", strokes: 4 },
  { kanji: "水", on: "スイ", kun: "みず", en: "water", strokes: 4 },
  { kanji: "火", on: "カ", kun: "ひ", en: "fire", strokes: 4 },
  { kanji: "木", on: "モク・ボク", kun: "き", en: "tree", strokes: 4 },
  { kanji: "金", on: "キン・コン", kun: "かね", en: "gold / money", strokes: 8 },
  { kanji: "土", on: "ド・ト", kun: "つち", en: "earth", strokes: 3 },
  { kanji: "山", on: "サン", kun: "やま", en: "mountain", strokes: 3 },
  { kanji: "川", on: "セン", kun: "かわ", en: "river", strokes: 3 },
  { kanji: "学", on: "ガク", kun: "まな(ぶ)", en: "to learn", strokes: 8 },
  { kanji: "生", on: "セイ・ショウ", kun: "い(きる)", en: "life / birth", strokes: 5 },
  { kanji: "食", on: "ショク", kun: "た(べる)", en: "to eat", strokes: 9 },
  { kanji: "語", on: "ゴ", kun: "かた(る)", en: "language", strokes: 14 },
  { kanji: "本", on: "ホン", kun: "もと", en: "book / origin", strokes: 5 },
];

/* ═══════════════════════════════════════════
   DIALOGUES (expanded)
   ═══════════════════════════════════════════ */
const DIALOGUES = [
  {
    title: "Self-introduction",
    setting: "Meeting someone for the first time",
    lines: [
      { a: "A", jp: "はじめまして。わたしは Alex です。", en: "Nice to meet you. I am Alex." },
      { a: "A", jp: "アメリカから来ました。", en: "I came from America." },
      { a: "A", jp: "日本語を勉強しています。", en: "I am studying Japanese." },
      { a: "B", jp: "はじめまして。田中です。", en: "Nice to meet you. I am Tanaka." },
      { a: "B", jp: "どうぞよろしくお願いします。", en: "Pleased to meet you." },
      { a: "A", jp: "こちらこそ、よろしくお願いします。", en: "Likewise, pleased to meet you." },
    ],
  },
  {
    title: "Restaurant",
    setting: "Ordering food at a casual restaurant",
    lines: [
      { a: "Staff", jp: "いらっしゃいませ。何名様ですか。", en: "Welcome. How many guests?" },
      { a: "You", jp: "二人です。", en: "Two people." },
      { a: "Staff", jp: "こちらへどうぞ。メニューです。", en: "This way please. Here is the menu." },
      { a: "You", jp: "すみません。ラーメンをお願いします。", en: "Excuse me. Ramen, please." },
      { a: "Staff", jp: "飲み物はどうなさいますか。", en: "What would you like for a drink?" },
      { a: "You", jp: "水をお願いします。", en: "Water, please." },
      { a: "Staff", jp: "かしこまりました。少々お待ちください。", en: "Understood. Please wait a moment." },
      { a: "You", jp: "お会計をお願いします。", en: "The check, please." },
    ],
  },
  {
    title: "Asking directions",
    setting: "On the street, looking for a train station",
    lines: [
      { a: "You", jp: "すみません。東京駅はどこですか。", en: "Excuse me. Where is Tokyo Station?" },
      { a: "Person", jp: "まっすぐ行って、二つ目の信号を右に曲がってください。", en: "Go straight, turn right at the second traffic light." },
      { a: "You", jp: "右ですね。遠いですか。", en: "Right, correct? Is it far?" },
      { a: "Person", jp: "いいえ、歩いて五分くらいです。", en: "No, it is about a 5-minute walk." },
      { a: "You", jp: "ありがとうございます。", en: "Thank you." },
      { a: "Person", jp: "どういたしまして。", en: "You are welcome." },
    ],
  },
  {
    title: "Shopping",
    setting: "At a clothing store",
    lines: [
      { a: "Staff", jp: "いらっしゃいませ。", en: "Welcome." },
      { a: "You", jp: "これはいくらですか。", en: "How much is this?" },
      { a: "Staff", jp: "三千円です。", en: "It is 3,000 yen." },
      { a: "You", jp: "もう少し安いのはありますか。", en: "Do you have something a bit cheaper?" },
      { a: "Staff", jp: "こちらは二千円です。", en: "This one is 2,000 yen." },
      { a: "You", jp: "じゃ、これをください。", en: "Then, I will take this one please." },
      { a: "Staff", jp: "二千円です。ありがとうございます。", en: "That is 2,000 yen. Thank you." },
    ],
  },
  {
    title: "Hotel check-in",
    setting: "Arriving at a hotel",
    lines: [
      { a: "You", jp: "予約した Alex です。チェックインをお願いします。", en: "I am Alex. I have a reservation. Check-in, please." },
      { a: "Staff", jp: "Alex様ですね。パスポートをお願いします。", en: "Mr./Ms. Alex. Passport, please." },
      { a: "You", jp: "はい、どうぞ。", en: "Here you go." },
      { a: "Staff", jp: "お部屋は五階の502号室です。", en: "Your room is #502 on the 5th floor." },
      { a: "You", jp: "朝ごはんは何時からですか。", en: "What time does breakfast start?" },
      { a: "Staff", jp: "七時から九時までです。", en: "From 7 to 9 o'clock." },
    ],
  },
  {
    title: "Feeling unwell",
    setting: "At a pharmacy / doctor",
    lines: [
      { a: "You", jp: "すみません。頭が痛いです。", en: "Excuse me. I have a headache." },
      { a: "Staff", jp: "いつからですか。", en: "Since when?" },
      { a: "You", jp: "きのうからです。", en: "Since yesterday." },
      { a: "Staff", jp: "この薬を飲んでください。一日三回です。", en: "Please take this medicine. Three times a day." },
      { a: "You", jp: "ありがとうございます。いくらですか。", en: "Thank you. How much?" },
    ],
  },
];

/* ═══════════════════════════════════════════
   SURVIVAL JAPANESE
   ═══════════════════════════════════════════ */
const SURVIVAL = [
  { cat: "Emergency", jp: "助けてください！", romaji: "tasukete kudasai!", en: "Please help me!" },
  { cat: "Emergency", jp: "警察を呼んでください", romaji: "keisatsu o yonde kudasai", en: "Please call the police" },
  { cat: "Emergency", jp: "救急車をお願いします", romaji: "kyuukyuusha o onegai shimasu", en: "An ambulance, please" },
  { cat: "Communication", jp: "日本語がわかりません", romaji: "nihongo ga wakarimasen", en: "I do not understand Japanese" },
  { cat: "Communication", jp: "ゆっくり話してください", romaji: "yukkuri hanashite kudasai", en: "Please speak slowly" },
  { cat: "Communication", jp: "書いてください", romaji: "kaite kudasai", en: "Please write it down" },
  { cat: "Navigation", jp: "トイレはどこですか", romaji: "toire wa doko desu ka", en: "Where is the bathroom?" },
  { cat: "Navigation", jp: "Wi-Fiはありますか", romaji: "waifai wa arimasu ka", en: "Is there Wi-Fi?" },
  { cat: "Navigation", jp: "ここはどこですか", romaji: "koko wa doko desu ka", en: "Where is this place?" },
  { cat: "Shopping", jp: "これはいくらですか", romaji: "kore wa ikura desu ka", en: "How much is this?" },
  { cat: "Shopping", jp: "カードで払えますか", romaji: "kaado de haraemasu ka", en: "Can I pay by card?" },
  { cat: "Dining", jp: "ベジタリアンです", romaji: "bejitarian desu", en: "I am vegetarian" },
  { cat: "Dining", jp: "アレルギーがあります", romaji: "arerugii ga arimasu", en: "I have allergies" },
  { cat: "Dining", jp: "おすすめは何ですか", romaji: "osusume wa nan desu ka", en: "What do you recommend?" },
  { cat: "Transport", jp: "___行きの切符をください", romaji: "___ iki no kippu o kudasai", en: "A ticket to ___, please" },
  { cat: "Transport", jp: "次の電車は何時ですか", romaji: "tsugi no densha wa nanji desu ka", en: "What time is the next train?" },
];

/* ═══════════════════════════════════════════
   CULTURAL NOTES
   ═══════════════════════════════════════════ */
const CULTURE_NOTES = [
  { title: "Bowing (お辞儀)", text: "A light bow of about 15 degrees accompanies greetings, thanks, and apologies. Deeper bows (30–45 degrees) show greater respect or sincerity. In most casual situations, a slight nod is sufficient." },
  { title: "Shoes off (靴を脱ぐ)", text: "Remove shoes when entering homes, many restaurants, temples, and traditional accommodations. Look for a step up (上がり框) or a shoe rack as indicators." },
  { title: "Politeness levels (敬語)", text: "Japanese has three main speech levels: casual (タメ口), polite (丁寧語, ます/です), and honorific/humble (尊敬語/謙譲語). Start with polite forms. Using casual speech with strangers or superiors is a significant social error." },
  { title: "いただきます / ごちそうさま", text: "Always say いただきます before eating and ごちそうさまでした after. These are not religious prayers but expressions of gratitude for the food and those who prepared it." },
  { title: "Business cards (名刺)", text: "In business settings, present and receive cards with both hands. Read the card carefully before putting it down. Never write on someone's card in front of them." },
  { title: "Quiet on public transport", text: "Keep phone calls and loud conversations to a minimum on trains and buses. Set your phone to silent mode (マナーモード)." },
];

/* ═══════════════════════════════════════════
   COMMON MISTAKES
   ═══════════════════════════════════════════ */
const COMMON_MISTAKES = [
  { wrong: "Using は and が interchangeably", right: "は marks topic (known info), が marks subject (new info or emphasis). わたしは学生です (I am a student) vs だれが学生ですか (who is the student?)." },
  { wrong: "Saying わたしは... for every sentence", right: "Japanese drops the subject when context is clear. After establishing \"I\" once, simply say 食べます instead of わたしは食べます." },
  { wrong: "Translating word-for-word from English", right: "Japanese word order is SOV (Subject–Object–Verb). \"I eat sushi\" = すしを食べます, not 食べます すしを." },
  { wrong: "Confusing いる and ある", right: "いる = living things (people, animals). ある = non-living things (objects, plants, places)." },
  { wrong: "Using casual speech with strangers", right: "Always default to polite (ます/です) forms until invited to be casual. Using タメ口 too early is perceived as disrespectful." },
  { wrong: "Pronouncing し as \"see\"", right: "し is between English \"she\" and \"see.\" Listen carefully to native pronunciation." },
  { wrong: "Ignoring long vs short vowels", right: "おばさん (aunt) vs おばあさん (grandmother) — vowel length changes meaning entirely." },
  { wrong: "Using きれい as an い-adjective", right: "きれい looks like it ends in い but it is a な-adjective. Negative: きれいじゃない (not きれくない)." },
];

/* ═══════════════════════════════════════════
   PRACTICE DRILLS
   ═══════════════════════════════════════════ */
const PRACTICE_SETS = {
  kana: [
    "Read each hiragana row aloud twice, then cover the romaji and test yourself.",
    "Write each kana five times on paper while saying the sound aloud.",
    "Practice confusing pairs side by side: あ/お, き/さ, ぬ/め, は/ほ, わ/れ.",
    "For katakana, drill: シ/ツ, ソ/ン, ア/マ until instant recognition.",
    "Set a timer: identify 20 random kana in under 60 seconds. Repeat daily.",
  ],
  phrases: [
    "Say each core phrase once slowly, then once at natural speed. Record yourself.",
    "Swap nouns inside patterns: 水/お茶/コーヒー をください. Practice 10 variations.",
    "Record a 30-second self-introduction. Listen back and repeat until smooth.",
    "Practice greetings at appropriate times: おはよう (morning), こんにちは (afternoon), こんばんは (evening).",
    "Memorize one full dialogue per day. Rehearse both roles.",
  ],
  grammar: [
    "Build five original sentences with は, five with を, and five with に or で.",
    "Conjugate five verbs into all forms: ます, ません, ました, て-form, ない-form.",
    "Translate five simple English sentences into Japanese using the core patterns.",
    "Combine two sentences using て-form: 起きます + 朝ごはんを食べます → 起きて朝ごはんを食べます.",
    "Practice asking questions: add か to five statements and read aloud.",
  ],
  listening: [
    "Watch a Japanese video with subtitles. Pause after each line and repeat.",
    "Listen to NHK World Easy Japanese. Identify particles you hear.",
    "Shadowing: play audio and speak simultaneously, matching rhythm and pitch.",
    "Dictation: listen to a short clip 3 times. Write what you hear in kana.",
  ],
};

/* ═══════════════════════════════════════════
   STUDY ROADMAP
   ═══════════════════════════════════════════ */
const ROADMAP = [
  { phase: "Weeks 1–2", title: "Kana Foundation", tasks: "Memorize all 46 hiragana + dakuten/yoon. Begin katakana. Learn 10 core phrases. Practice greeting people.", color: "#c2410c" },
  { phase: "Weeks 3–4", title: "First Sentences", tasks: "Complete katakana. Learn particles は, を, に, で. Build simple sentences with です/ます. Numbers 1–100. Self-introduction.", color: "#b45309" },
  { phase: "Month 2", title: "Conversation Basics", tasks: "All core patterns. Verb conjugation (polite forms). Adjectives. Question words. 20 kanji. Practice dialogues daily.", color: "#a16207" },
  { phase: "Month 3", title: "Expanding Ability", tasks: "て-form and all its uses. Past tense. Counters. Time expressions. 50 kanji. Start reading simple texts.", color: "#4d7c0f" },
  { phase: "Months 4–6", title: "Intermediate Bridge", tasks: "Casual speech forms. Potential verbs. たい/ほしい. Conditional. 100+ kanji. JLPT N5 level. Listen to native content daily.", color: "#0e7490" },
  { phase: "Months 7–12", title: "Functional Fluency", tasks: "Complex sentences. Giving/receiving. Passive. Keigo basics. 300+ kanji. JLPT N4 level. Read manga/news with dictionary.", color: "#7c3aed" },
];


/* ═══════════════════════════════════════════
   NAVIGATION SECTIONS
   ═══════════════════════════════════════════ */
const NAV_SECTIONS = [
  { id: "start", label: "Start", icon: "spark" },
  { id: "pronunciation", label: "Sound", icon: "music" },
  { id: "hiragana", label: "Hiragana", icon: "pen" },
  { id: "katakana", label: "Katakana", icon: "pen" },
  { id: "phrases", label: "Phrases", icon: "message" },
  { id: "numbers", label: "Numbers", icon: "hash" },
  { id: "time", label: "Time", icon: "clock" },
  { id: "particles", label: "Particles", icon: "layers" },
  { id: "patterns", label: "Patterns", icon: "route" },
  { id: "verbs", label: "Verbs", icon: "zap" },
  { id: "adjectives", label: "Adjectives", icon: "sun" },
  { id: "vocab", label: "Vocab", icon: "bookOpen" },
  { id: "kanji", label: "Kanji", icon: "eye" },
  { id: "dialogues", label: "Dialogues", icon: "mic" },
  { id: "survival", label: "Survival", icon: "globe" },
  { id: "culture", label: "Culture", icon: "users" },
  { id: "mistakes", label: "Mistakes", icon: "alert" },
  { id: "practice", label: "Practice", icon: "target" },
  { id: "roadmap", label: "Roadmap", icon: "map" },
];


/* ═══════════════════════════════════════════
   REUSABLE COMPONENTS
   ═══════════════════════════════════════════ */

function Icon({ name, className = "h-5 w-5" }) {
  const paths = ICON_PATHS[name] || ICON_PATHS.spark;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl border border-stone-200/80 bg-white/95 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ id, icon, badge, title, subtitle }) {
  return (
    <div id={id} className="scroll-mt-20">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 shadow-sm">
          <Icon name={icon} className="h-5 w-5" />
        </div>
        <div>
          {badge && <span className="mb-1 inline-block rounded-md bg-stone-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-stone-500">{badge}</span>}
          <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-500 sm:text-base">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function LevelBadge({ level }) {
  const colors = {
    N5: "bg-emerald-100 text-emerald-800",
    N4: "bg-sky-100 text-sky-800",
    N3: "bg-violet-100 text-violet-800",
    N2: "bg-amber-100 text-amber-800",
    N1: "bg-rose-100 text-rose-800",
  };
  return <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${colors[level] || "bg-stone-100 text-stone-600"}`}>{level}</span>;
}

function TabGroup({ tabs, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tabs.map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-all ${
            active === key
              ? "bg-stone-900 text-white shadow-sm"
              : "bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}


/* ═══════════════════════════════════════════
   KANA TABLE COMPONENT
   ═══════════════════════════════════════════ */
function KanaTable({ title, subtitle, rows, accent }) {
  const accentColors = {
    warm: { header: "bg-orange-50 border-orange-100", headerText: "text-orange-900", kana: "text-orange-950", romaji: "text-orange-600" },
    cool: { header: "bg-sky-50 border-sky-100", headerText: "text-sky-900", kana: "text-sky-950", romaji: "text-sky-600" },
  };
  const c = accentColors[accent] || accentColors.warm;

  return (
    <Card className="overflow-hidden">
      <div className={`border-b ${c.header} px-5 py-4`}>
        <h3 className={`text-xl font-bold ${c.headerText}`}>{title}</h3>
        <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-[56px_repeat(5,1fr)] bg-stone-50 px-2 py-2.5 text-center text-[11px] font-bold uppercase tracking-widest text-stone-400">
            <div></div><div>a</div><div>i</div><div>u</div><div>e</div><div>o</div>
          </div>
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-[56px_repeat(5,1fr)] border-t border-stone-100 px-2 py-2 text-center">
              <div className="flex items-center justify-center text-xs font-bold uppercase tracking-widest text-stone-300">{row.row}</div>
              {row.cells.map((cell, ci) => (
                <div key={ci} className="py-1.5">
                  {cell.kana ? (
                    <>
                      <div className={`text-2xl font-bold sm:text-3xl ${c.kana}`}>{cell.kana}</div>
                      <div className={`mt-0.5 text-xs font-medium ${c.romaji}`}>{cell.romaji}</div>
                    </>
                  ) : (
                    <div className="text-stone-200">·</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}


/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function JapaneseGuide() {
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [practiceTab, setPracticeTab] = useState("kana");
  const [vocabCat, setVocabCat] = useState(0);
  const [verbView, setVerbView] = useState("table");
  const [survivalCat, setSurvivalCat] = useState("all");

  const activeDialogue = DIALOGUES[dialogueIdx];
  const activePractice = PRACTICE_SETS[practiceTab];
  const activeVocab = VOCAB_CATEGORIES[vocabCat];

  const survivalFiltered = survivalCat === "all" ? SURVIVAL : SURVIVAL.filter(s => s.cat === survivalCat);
  const survivalCats = ["all", ...new Set(SURVIVAL.map(s => s.cat))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-orange-50/20 to-stone-50 text-stone-900" style={{ fontFamily: "'Noto Sans JP', 'Noto Sans', system-ui, sans-serif", scrollBehavior: "smooth" }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap');`}</style>

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 lg:px-8">

        {/* ─── NAVIGATION ─── */}
        <nav className="sticky top-3 z-40 mb-8">
          <div className="overflow-x-auto rounded-xl border border-stone-200/80 bg-white/90 px-2 py-2 shadow-lg shadow-stone-200/40 backdrop-blur-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-center gap-0.5">
              {NAV_SECTIONS.map(({ id, label }) => (
                <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-[13px] font-semibold text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 active:bg-stone-200">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ═══════════════ START ═══════════════ */}
        <section id="start" className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="overflow-hidden">
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-br from-orange-100/60 via-amber-50/40 to-transparent" />
              <div className="relative">
                <div className="inline-flex rounded-md bg-stone-900 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">Complete Study Guide</div>
                <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Learn Japanese
                  <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">from Zero to Fluency</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-500 sm:text-lg">
                  A comprehensive, practical guide to Japanese. Full kana charts, grammar, vocabulary, dialogues, kanji, cultural notes, and daily practice drills. Open the page and study.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Kana", "Grammar", "Vocabulary", "Kanji", "Dialogues", "Culture", "Practice"].map(t => (
                    <span key={t} className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                <Icon name="route" className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold">How to use this guide</h2>
            </div>
            <div className="mt-5 space-y-2.5">
              {[
                "Memorize hiragana first, then katakana. Do not skip kana.",
                "Say every phrase aloud. Reading silently is not enough.",
                "Learn particles and sentence patterns before vocabulary lists.",
                "Always use polite (ます/です) forms until instructed otherwise.",
                "Practice with the dialogues until each one feels automatic.",
                "Add 2–3 new kanji daily. Review previous ones every session.",
              ].map((line, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3">
                  <div className="mt-0.5 shrink-0 text-emerald-600"><Icon name="check" className="h-4 w-4" /></div>
                  <div className="text-sm leading-relaxed text-stone-700">{line}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-amber-700"><Icon name="clock" className="h-4 w-4" /></div>
                <span className="font-semibold text-stone-900">Minimum daily session: 30 minutes</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {[["10 min", "Kana review"], ["10 min", "Phrases & patterns"], ["10 min", "Grammar & verbs"]].map(([t, l]) => (
                  <div key={l} className="rounded-lg bg-white p-3 text-center">
                    <div className="text-lg font-bold text-stone-900">{t}</div>
                    <div className="mt-0.5 text-xs text-stone-500">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* ═══════════ WRITING SYSTEM OVERVIEW ═══════════ */}
        <section className="mt-14">
          <SectionHeader icon="pen" badge="Foundation" title="The Japanese Writing System" subtitle="Japanese uses three scripts simultaneously. Understanding when each is used is essential before memorizing characters." />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { script: "ひらがな", name: "Hiragana", use: "Native Japanese words, grammar endings, particles, and furigana (readings above kanji).", examples: "たべる, きれい, は, を", color: "border-orange-200 bg-orange-50/70" },
              { script: "カタカナ", name: "Katakana", use: "Foreign loanwords, foreign names, emphasis, onomatopoeia, and technical/scientific terms.", examples: "コーヒー, アメリカ, パソコン", color: "border-sky-200 bg-sky-50/70" },
              { script: "漢字", name: "Kanji", use: "Chinese-origin characters representing meaning. Each has multiple readings. ~2,136 in daily use.", examples: "人, 日本, 食べる, 学校", color: "border-violet-200 bg-violet-50/70" },
            ].map(item => (
              <div key={item.name} className={`rounded-2xl border ${item.color} p-5 shadow-sm`}>
                <div className="text-3xl font-bold text-stone-800">{item.script}</div>
                <div className="mt-1 text-sm font-bold text-stone-900">{item.name}</div>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.use}</p>
                <div className="mt-3 rounded-lg bg-white/80 px-3 py-2 text-sm font-medium text-stone-700">{item.examples}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-stone-700 bg-stone-900 p-4 text-sm leading-relaxed text-stone-200 shadow-sm">
            A typical Japanese sentence mixes all three: <span className="font-bold text-white">私はコーヒーを飲みます。</span> (I drink coffee.) — 漢字 (私, 飲), ひらがな (は, を, みます), カタカナ (コーヒー).
          </div>
        </section>

        {/* ═══════════ PRONUNCIATION ═══════════ */}
        <section id="pronunciation" className="mt-14">
          <SectionHeader icon="music" badge="Sound" title="Pronunciation Essentials" subtitle="Japanese has only 5 vowel sounds and very consistent pronunciation. Master these points early to build a natural accent." />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">The 5 Vowels</h3>
              <p className="mt-2 text-sm text-stone-500">Japanese vowels are pure and short. They never shift or glide like English vowels.</p>
              <div className="mt-4 grid grid-cols-5 gap-2 text-center">
                {[
                  { v: "あ a", hint: "\"ah\" as in father" },
                  { v: "い i", hint: "\"ee\" as in see" },
                  { v: "う u", hint: "lips relaxed, not rounded" },
                  { v: "え e", hint: "\"eh\" as in red" },
                  { v: "お o", hint: "\"oh\" as in go" },
                ].map(item => (
                  <div key={item.v} className="rounded-lg bg-stone-50 p-3">
                    <div className="text-2xl font-bold text-orange-800">{item.v.split(" ")[0]}</div>
                    <div className="mt-0.5 text-xs font-semibold text-stone-700">{item.v.split(" ")[1]}</div>
                    <div className="mt-2 text-[11px] leading-snug text-stone-500">{item.hint}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">Consonants</h3>
              <p className="mt-2 text-sm text-stone-500">Most consonants are similar to English. Key differences:</p>
              <div className="mt-3 space-y-2">
                {PRONUNCIATION_TIPS.slice(0, 3).map(tip => (
                  <div key={tip.sound} className="rounded-lg bg-stone-50 px-4 py-3">
                    <div className="text-sm font-semibold text-stone-900">{tip.sound}</div>
                    <div className="mt-1 text-xs leading-relaxed text-stone-600">{tip.tip}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {PRONUNCIATION_TIPS.slice(3).map(tip => (
              <Card key={tip.sound} className="p-4">
                <div className="text-sm font-bold text-stone-900">{tip.sound}</div>
                <div className="mt-2 text-xs leading-relaxed text-stone-600">{tip.tip}</div>
                <div className="mt-2 rounded-md bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-800">{tip.example}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════ HIRAGANA ═══════════ */}
        <section id="hiragana" className="mt-14">
          <SectionHeader icon="pen" badge="Kana · Part 1" title="Hiragana (ひらがな)" subtitle="The first script to memorize. Used for native words, grammar, and particles. Master all 46 base characters before moving to katakana." />
          <div className="mt-6">
            <KanaTable title="Basic Hiragana — 46 Characters" subtitle="5 vowels × 10 consonant rows + ん. Learn row by row." rows={HIRAGANA_ROWS} accent="warm" />
          </div>
          <div className="mt-4">
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">Dakuten (゛) and Handakuten (゜)</h3>
              <p className="mt-1 text-sm text-stone-500">Adding two dots (゛) or a circle (゜) changes the consonant sound. 25 additional sounds.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-left text-[11px] font-bold uppercase tracking-widest text-stone-400">
                      <th className="pb-2 pr-3">Row</th>
                      <th className="pb-2" colSpan={5}>Characters + Romaji</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DAKUTEN_HIRAGANA.map(row => (
                      <tr key={row.row} className="border-b border-stone-100">
                        <td className="py-2.5 pr-3 font-bold uppercase text-stone-400">{row.row}</td>
                        {row.cells.map((cell, i) => (
                          <td key={i} className="py-2.5 text-center">
                            <span className="text-xl font-bold text-stone-800">{cell.split(" ")[0]}</span>
                            <span className="ml-1.5 text-xs text-stone-500">{cell.split(" ")[1]}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 rounded-lg bg-amber-50 px-4 py-2.5 text-xs leading-relaxed text-amber-800">
                * ぢ (di) and づ (du) are rarely used. In most cases じ (ji) and ず (zu) are used instead.
              </div>
            </Card>
          </div>
          <div className="mt-4">
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">Yoon (拗音) — Combination Sounds</h3>
              <p className="mt-1 text-sm text-stone-500">A consonant kana + small や/ゆ/よ creates a blended one-mora sound. 33 combinations.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-left text-[11px] font-bold uppercase tracking-widest text-stone-400">
                      <th className="pb-2">Base</th><th className="pb-2">〜ya</th><th className="pb-2">〜yu</th><th className="pb-2">〜yo</th><th className="pb-2">Romaji</th>
                    </tr>
                  </thead>
                  <tbody>
                    {YOON_DATA.map(row => (
                      <tr key={row.base} className="border-b border-stone-100">
                        <td className="py-2 font-bold uppercase text-stone-400">{row.base}</td>
                        {row.h.map((ch, i) => (
                          <td key={i} className="py-2 text-lg font-bold text-stone-800">{ch}</td>
                        ))}
                        <td className="py-2 text-xs text-stone-500">{row.r.join(" / ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { title: "Small っ (Sokuon)", desc: "Doubles the following consonant. Hold a brief pause before the next sound.", ex: "きって (kitte) = stamp, がっこう (gakkou) = school" },
              { title: "Long Vowels", desc: "Extend the vowel for two beats. Length changes meaning.", ex: "おばさん (aunt) vs おばあさん (grandmother)" },
              { title: "Confusing Pairs", desc: "Practice these pairs until instant recognition:", ex: "き/さ, ぬ/め, は/ほ, わ/ね, る/ろ" },
            ].map(item => (
              <Card key={item.title} className="p-4">
                <div className="font-semibold text-stone-900">{item.title}</div>
                <div className="mt-2 text-xs leading-relaxed text-stone-600">{item.desc}</div>
                <div className="mt-2 rounded-md bg-orange-50 px-2.5 py-1.5 text-xs font-medium text-orange-800">{item.ex}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════ KATAKANA ═══════════ */}
        <section id="katakana" className="mt-14">
          <SectionHeader icon="pen" badge="Kana · Part 2" title="Katakana (カタカナ)" subtitle="Used for loanwords, foreign names, emphasis, and onomatopoeia. Same sounds as hiragana, different shapes." />
          <div className="mt-6">
            <KanaTable title="Basic Katakana — 46 Characters" subtitle="Same 5×10+1 structure as hiragana. More angular strokes." rows={KATAKANA_ROWS} accent="cool" />
          </div>
          <div className="mt-4">
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">Katakana Dakuten & Yoon</h3>
              <p className="mt-1 text-sm text-stone-500">Same rules as hiragana: add ゛ or ゜ for voiced/semi-voiced, use small ャ/ュ/ョ for combinations.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm">
                  <tbody>
                    {DAKUTEN_KATAKANA.map(row => (
                      <tr key={row.row} className="border-b border-stone-100">
                        <td className="py-2.5 pr-3 font-bold uppercase text-stone-400">{row.row}</td>
                        {row.cells.map((cell, i) => (
                          <td key={i} className="py-2.5 text-center">
                            <span className="text-xl font-bold text-stone-800">{cell.split(" ")[0]}</span>
                            <span className="ml-1.5 text-xs text-stone-500">{cell.split(" ")[1]}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { title: "Long Vowels (ー)", desc: "Katakana uses a dash ー to extend vowels.", ex: "コーヒー (koohii) = coffee, ケーキ (keeki) = cake" },
              { title: "Confusing Pairs", desc: "Train these katakana pairs daily:", ex: "シ/ツ, ソ/ン, ア/マ, ク/タ, ヌ/ス" },
              { title: "Special Combinations", desc: "Modern katakana adds sounds not in traditional Japanese:", ex: "ティ (ti), ファ (fa), ヴァ (va), ウィ (wi)" },
            ].map(item => (
              <Card key={item.title} className="p-4">
                <div className="font-semibold text-stone-900">{item.title}</div>
                <div className="mt-2 text-xs leading-relaxed text-stone-600">{item.desc}</div>
                <div className="mt-2 rounded-md bg-sky-50 px-2.5 py-1.5 text-xs font-medium text-sky-800">{item.ex}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════ CORE PHRASES ═══════════ */}
        <section id="phrases" className="mt-14">
          <SectionHeader icon="message" badge="Speaking" title="Core Phrases" subtitle="These are the expressions you will use most often. Say each one aloud until it feels natural." />
          <div className="mt-6">
            <Card className="p-5 sm:p-6">
              <h3 className="text-lg font-bold text-stone-900">Essential Phrases</h3>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {CORE_PHRASES.map(item => (
                  <div key={item.jp} className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                    <div className="text-lg font-bold text-stone-900">{item.jp}</div>
                    <div className="mt-0.5 text-xs font-medium text-stone-400">{item.romaji}</div>
                    <div className="mt-2 text-sm text-stone-700">{item.en}</div>
                    {item.note && <div className="mt-1.5 text-[11px] text-stone-400">{item.note}</div>}
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="mt-4">
            <Card className="p-5 sm:p-6">
              <h3 className="text-lg font-bold text-stone-900">Self-Introduction Template</h3>
              <p className="mt-1 text-sm text-stone-500">Replace the blanks with your own information. Practice until you can deliver it smoothly in 15 seconds.</p>
              <div className="mt-4 space-y-2">
                {SELF_INTRO.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1 rounded-lg border border-stone-100 bg-stone-50 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex items-center gap-3 sm:flex-1">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">{i + 1}</div>
                      <div className="min-w-0">
                        <div className="font-semibold text-stone-900">{item.jp}</div>
                        <div className="text-xs text-stone-500">{item.romaji}</div>
                      </div>
                    </div>
                    <div className="pl-10 text-sm text-stone-500 sm:pl-0 sm:text-right">{item.en}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ═══════════ NUMBERS ═══════════ */}
        <section id="numbers" className="mt-14">
          <SectionHeader icon="hash" badge="Numbers" title="Numbers & Counting" subtitle="The number system is highly regular, but counters (classifiers) are required when counting specific objects." />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">Numbers 0–10</h3>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {NUMBERS_BASIC.map(item => (
                  <div key={item.n} className="rounded-lg bg-stone-50 p-3 text-center">
                    <div className="text-[11px] font-bold text-stone-400">{item.n}</div>
                    <div className="mt-1 text-xl font-bold text-stone-900">{item.jp}</div>
                    <div className="mt-0.5 text-xs text-stone-500">{item.romaji}</div>
                  </div>
                ))}
              </div>
              <h4 className="mt-5 text-sm font-bold text-stone-700">Larger Numbers</h4>
              <p className="mt-1 text-xs text-stone-500">Note: some numbers have irregular sound changes (highlighted).</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {NUMBERS_EXTENDED.map(item => (
                  <div key={item.n} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 rounded-lg bg-stone-50 px-3 py-2.5">
                    <span className="w-12 text-right text-sm font-bold text-stone-400">{item.n}</span>
                    <span className="text-base font-bold text-stone-900">{item.jp}</span>
                    <span className="text-xs text-stone-500">{item.romaji}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">Common Counters</h3>
              <p className="mt-1 text-sm text-stone-500">Japanese requires a counter word after the number. The counter depends on the type of object.</p>
              <div className="mt-4 space-y-2">
                {COUNTERS.map(item => (
                  <div key={item.counter} className="rounded-lg border border-stone-100 bg-stone-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-orange-700">{item.counter}</span>
                      <span className="text-sm font-semibold text-stone-700">{item.use}</span>
                    </div>
                    <div className="mt-1.5 text-xs text-stone-500">{item.examples}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ═══════════ TIME & CALENDAR ═══════════ */}
        <section id="time" className="mt-14">
          <SectionHeader icon="clock" badge="Time" title="Time & Calendar" subtitle="Essential for daily life: telling time, scheduling, and understanding dates." />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">Hours (〜時)</h3>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {TIME_HOURS.map((h, i) => (
                  <div key={i} className="rounded-lg bg-stone-50 px-2 py-2 text-center text-xs font-medium text-stone-800 sm:text-sm">{h}</div>
                ))}
              </div>
              <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                Note: 4 o'clock = <b>よじ</b> (not よんじ), 7 o'clock = <b>しちじ</b>, 9 o'clock = <b>くじ</b>. Minutes use 〜分 (ふん/ぷん).
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">Days of the Week</h3>
              <div className="mt-3 space-y-1.5">
                {DAYS_OF_WEEK.map(d => (
                  <div key={d.en} className="flex items-center gap-3 rounded-lg bg-stone-50 px-4 py-2">
                    <span className="w-20 text-lg font-bold text-stone-800">{d.jp}</span>
                    <span className="text-sm text-stone-600">{d.reading}</span>
                    <span className="ml-auto text-sm text-stone-400">{d.en}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">Months (〜月)</h3>
              <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                {MONTHS.map((m, i) => {
                  const parts = m.split(" ");
                  return (
                    <div key={i} className="rounded-lg bg-stone-50 px-3 py-2 text-center">
                      <div className="text-base font-bold text-stone-800">{parts[0]}</div>
                      <div className="text-xs text-stone-500">{parts[1]}</div>
                      <div className="text-[11px] text-stone-400">{parts[2]}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="text-lg font-bold text-stone-900">Relative Time</h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {RELATIVE_TIME.map(item => (
                  <div key={item.jp} className="rounded-lg bg-stone-50 px-3 py-2 text-center">
                    <div className="text-base font-bold text-stone-800">{item.jp}</div>
                    <div className="text-xs text-stone-500">{item.en}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ═══════════ PARTICLES ═══════════ */}
        <section id="particles" className="mt-14">
          <SectionHeader icon="layers" badge="Grammar" title="Particles (助詞)" subtitle="Particles are the connectors that give a sentence its meaning. They mark the role of each word. This is the single most important grammar topic." />
          <div className="mt-6">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm">
                  <thead>
                    <tr className="bg-stone-50 text-left text-[11px] font-bold uppercase tracking-widest text-stone-400">
                      <th className="w-14 px-4 py-3">Part.</th>
                      <th className="w-28 px-4 py-3">Role</th>
                      <th className="w-40 px-4 py-3">Example</th>
                      <th className="w-44 px-4 py-3">Meaning</th>
                      <th className="px-4 py-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PARTICLES.map(row => (
                      <tr key={row.p + row.role} className="border-t border-stone-100">
                        <td className="px-4 py-3 text-2xl font-bold text-orange-700">{row.p}</td>
                        <td className="px-4 py-3 font-semibold text-stone-800">{row.role}</td>
                        <td className="px-4 py-3 font-medium text-stone-700">{row.example}</td>
                        <td className="px-4 py-3 text-stone-600">{row.meaning}</td>
                        <td className="px-4 py-3 text-xs text-stone-500">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* ═══════════ SENTENCE PATTERNS ═══════════ */}
        <section id="patterns" className="mt-14">
          <SectionHeader icon="route" badge="Grammar" title="Sentence Patterns" subtitle="Learn these templates and you can build hundreds of sentences by swapping in different nouns and verbs." />
          <div className="mt-6">
            <Card className="p-5">
              <h3 className="text-sm font-bold text-stone-900 mb-1">Basic Sentence Order</h3>
              <div className="mt-3 overflow-x-auto">
                <div className="flex min-w-max items-center gap-2">
                {["Topic (は)", "Time", "Place (で)", "Object (を)", "Verb"].map((part, i) => (
                  <React.Fragment key={part}>
                    <div className="rounded-lg bg-stone-900 px-3 py-2 text-xs font-bold text-white">{part}</div>
                    {i < 4 && <Icon name="arrowRight" className="h-3.5 w-3.5 text-stone-300" />}
                  </React.Fragment>
                ))}
                </div>
              </div>
              <div className="mt-3 text-xs text-stone-500">Example: わたしは きょう 学校で 日本語を 勉強します。(I study Japanese at school today.)</div>
            </Card>
          </div>
          <div className="mt-4 space-y-2">
            {PATTERNS.map(item => (
              <Card key={item.pattern} className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-3">
                  <LevelBadge level={item.level} />
                  <span className="text-lg font-bold text-stone-900">{item.pattern}</span>
                  <span className="text-sm text-stone-500">{item.en}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                  <span className="font-medium text-stone-700">{item.example}</span>
                  <span className="text-stone-400">{item.exEn}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════ VERBS ═══════════ */}
        <section id="verbs" className="mt-14">
          <SectionHeader icon="zap" badge="Grammar" title="Verb System" subtitle="Japanese verbs do not change for person or number. They conjugate for tense, politeness, and mood." />

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {VERB_GROUPS_EXPLANATION.map(item => (
              <Card key={item.group} className="p-4">
                <div className="text-sm font-bold text-stone-900">{item.group}</div>
                <div className="mt-2 text-xs leading-relaxed text-stone-600">{item.rule}</div>
                <div className="mt-2 rounded-md bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-700">{item.examples}</div>
              </Card>
            ))}
          </div>

          <div className="mt-5">
            <TabGroup tabs={[["table", "Conjugation Table"], ["te", "Te-form Rules"], ["uses", "Te-form Uses"]]} active={verbView} onChange={setVerbView} />
          </div>

          {verbView === "table" && (
            <Card className="mt-4 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[960px] text-sm">
                  <thead>
                    <tr className="bg-stone-50 text-left text-[11px] font-bold uppercase tracking-widest text-stone-400">
                      <th className="px-3 py-3 whitespace-nowrap">Verb</th>
                      <th className="px-3 py-3 whitespace-nowrap">Gr.</th>
                      <th className="px-3 py-3 whitespace-nowrap">Polite</th>
                      <th className="px-3 py-3 whitespace-nowrap">Negative</th>
                      <th className="px-3 py-3 whitespace-nowrap">Past</th>
                      <th className="px-3 py-3 whitespace-nowrap">Te</th>
                      <th className="px-3 py-3 whitespace-nowrap">Plain Neg.</th>
                      <th className="px-3 py-3 whitespace-nowrap">Potential</th>
                      <th className="px-3 py-3 whitespace-nowrap">Volitional</th>
                      <th className="px-3 py-3 whitespace-nowrap">English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VERB_FORMS.map(row => (
                      <tr key={row.base} className="border-t border-stone-100">
                        <td className="px-3 py-2.5 font-bold text-stone-900 whitespace-nowrap">{row.base}</td>
                        <td className="px-3 py-2.5 text-xs text-stone-500 whitespace-nowrap">{row.type}</td>
                        <td className="px-3 py-2.5 text-stone-700 whitespace-nowrap">{row.masu}</td>
                        <td className="px-3 py-2.5 text-stone-700 whitespace-nowrap">{row.neg}</td>
                        <td className="px-3 py-2.5 text-stone-700 whitespace-nowrap">{row.past}</td>
                        <td className="px-3 py-2.5 font-medium text-orange-700 whitespace-nowrap">{row.te}</td>
                        <td className="px-3 py-2.5 text-stone-700 whitespace-nowrap">{row.nai}</td>
                        <td className="px-3 py-2.5 text-stone-700 whitespace-nowrap">{row.potential}</td>
                        <td className="px-3 py-2.5 text-stone-700 whitespace-nowrap">{row.volitional}</td>
                        <td className="px-3 py-2.5 text-xs text-stone-400 whitespace-nowrap">{row.en}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {verbView === "te" && (
            <Card className="mt-4 p-5">
              <h3 className="text-lg font-bold text-stone-900">Te-form Conjugation Rules</h3>
              <p className="mt-1 text-sm text-stone-500">The て-form is the most important form to master. It is used in many grammar patterns.</p>
              <div className="mt-4 space-y-2">
                {TE_FORM_RULES.map(item => (
                  <div key={item.ending} className="flex flex-wrap items-center gap-3 rounded-lg bg-stone-50 px-4 py-3">
                    <span className="rounded-md bg-orange-100 px-2.5 py-1 text-sm font-bold text-orange-800">{item.ending}</span>
                    <span className="text-sm font-semibold text-stone-800">{item.change}</span>
                    <span className="text-xs text-stone-500">{item.example}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {verbView === "uses" && (
            <Card className="mt-4 p-5">
              <h3 className="text-lg font-bold text-stone-900">What You Can Do with Te-form</h3>
              <div className="mt-4 space-y-2.5">
                {TE_FORM_USES.map(item => (
                  <div key={item.use} className="rounded-lg border border-stone-100 bg-stone-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-stone-900">{item.use}</span>
                      <span className="text-sm text-stone-500">{item.meaning}</span>
                    </div>
                    <div className="mt-1.5 text-xs text-stone-600">{item.example}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </section>

        {/* ═══════════ ADJECTIVES ═══════════ */}
        <section id="adjectives" className="mt-14">
          <SectionHeader icon="sun" badge="Grammar" title="Adjectives" subtitle="Two types: い-adjectives and な-adjectives. They conjugate differently." />
          <div className="mt-6">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] text-sm">
                  <thead>
                    <tr className="bg-stone-50 text-left text-[11px] font-bold uppercase tracking-widest text-stone-400">
                      <th className="px-3 py-3 whitespace-nowrap">Type</th>
                      <th className="px-3 py-3 whitespace-nowrap">Word</th>
                      <th className="px-3 py-3 whitespace-nowrap">English</th>
                      <th className="px-3 py-3 whitespace-nowrap">Present (+)</th>
                      <th className="px-3 py-3 whitespace-nowrap">Present (−)</th>
                      <th className="px-3 py-3 whitespace-nowrap">Past (+)</th>
                      <th className="px-3 py-3 whitespace-nowrap">Past (−)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ADJECTIVES.map(row => (
                      <tr key={row.word} className="border-t border-stone-100">
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${row.type === "い-adj" ? "bg-orange-100 text-orange-800" : "bg-sky-100 text-sky-800"}`}>{row.type}</span>
                        </td>
                        <td className="px-3 py-2.5 font-bold text-stone-900 whitespace-nowrap">{row.word}</td>
                        <td className="px-3 py-2.5 text-stone-500 whitespace-nowrap">{row.en}</td>
                        <td className="px-3 py-2.5 text-stone-700 whitespace-nowrap">{row.present}</td>
                        <td className="px-3 py-2.5 text-stone-700 whitespace-nowrap">{row.neg}</td>
                        <td className="px-3 py-2.5 text-stone-700 whitespace-nowrap">{row.past}</td>
                        <td className="px-3 py-2.5 text-stone-700 whitespace-nowrap">{row.pastNeg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Icon name="alert" className="h-5 w-5 text-amber-700" />
              <span className="font-semibold text-stone-900">Watch out for fake い-adjectives</span>
            </div>
            <p className="mt-2 text-sm text-stone-700">
              きれい (pretty) and 有名 (famous) look like い-adjectives but are actually な-adjectives. Negative = きれいじゃない (not きれくない).
            </p>
          </div>
        </section>

        {/* ═══════════ QUESTION WORDS ═══════════ */}
        <section className="mt-14">
          <SectionHeader icon="message" badge="Grammar" title="Question Words" subtitle="Add か to the end of a statement to make it a question. Use these words to ask specific questions." />
          <div className="mt-6">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm">
                  <thead>
                    <tr className="bg-stone-50 text-left text-[11px] font-bold uppercase tracking-widest text-stone-400">
                      <th className="px-4 py-3">Word</th>
                      <th className="px-4 py-3">Meaning</th>
                      <th className="px-4 py-3">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QUESTION_WORDS.map(row => (
                      <tr key={row.jp} className="border-t border-stone-100">
                        <td className="px-4 py-3 text-base font-bold text-stone-900">{row.jp}</td>
                        <td className="px-4 py-3 font-medium text-stone-700">{row.en}</td>
                        <td className="px-4 py-3 text-stone-600">{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* ═══════════ VOCABULARY ═══════════ */}
        <section id="vocab" className="mt-14">
          <SectionHeader icon="bookOpen" badge="Vocabulary" title="Essential Vocabulary by Category" subtitle="Organized by topic for practical use. Focus on the categories most relevant to your situation." />
          <div className="mt-6">
            <TabGroup tabs={VOCAB_CATEGORIES.map((c, i) => [String(i), c.title])} active={String(vocabCat)} onChange={(v) => setVocabCat(Number(v))} />
          </div>
          <Card className="mt-4 p-5">
            <div className="flex items-center gap-3 mb-4">
              <Icon name={activeVocab.icon} className="h-5 w-5 text-orange-700" />
              <h3 className="text-lg font-bold text-stone-900">{activeVocab.title}</h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {activeVocab.words.map(w => (
                <div key={w.jp} className="flex items-center gap-3 rounded-lg bg-stone-50 px-4 py-3">
                  <div>
                    <div className="font-bold text-stone-900">{w.jp}</div>
                    {w.reading && <div className="text-xs text-stone-400">{w.reading}</div>}
                  </div>
                  <div className="ml-auto text-sm text-stone-500">{w.en}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ═══════════ KANJI ═══════════ */}
        <section id="kanji" className="mt-14">
          <SectionHeader icon="eye" badge="Kanji" title="First 20 Kanji" subtitle="Start with these high-frequency characters. Each kanji has at least two readings: on'yomi (Chinese-derived) and kun'yomi (native Japanese)." />
          <div className="mt-6">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <div className="grid min-w-[640px] grid-cols-[72px_120px_120px_1fr_56px] bg-stone-50 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-stone-400">
                  <div>Kanji</div><div>On'yomi</div><div>Kun'yomi</div><div>Meaning</div><div>Strokes</div>
                </div>
                {BASIC_KANJI.map(k => (
                  <div key={k.kanji} className="grid min-w-[640px] grid-cols-[72px_120px_120px_1fr_56px] items-center border-t border-stone-100 px-4 py-3 text-sm">
                    <div className="text-3xl font-bold text-stone-900">{k.kanji}</div>
                    <div className="text-stone-600">{k.on}</div>
                    <div className="text-stone-600">{k.kun}</div>
                    <div className="text-stone-700">{k.en}</div>
                    <div className="text-center text-xs text-stone-400">{k.strokes}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ═══════════ DIALOGUES ═══════════ */}
        <section id="dialogues" className="mt-14">
          <SectionHeader icon="mic" badge="Conversation" title="Practice Dialogues" subtitle="Memorize these and use them as templates. Replace nouns, places, and names with your own content." />
          <div className="mt-6">
            <TabGroup tabs={DIALOGUES.map((d, i) => [String(i), d.title])} active={String(dialogueIdx)} onChange={(v) => setDialogueIdx(Number(v))} />
          </div>
          <Card className="mt-4 p-5 sm:p-6">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-stone-400">{activeDialogue.setting}</div>
            <h3 className="text-xl font-bold text-stone-900">{activeDialogue.title}</h3>
            <div className="mt-5 space-y-2.5">
              {activeDialogue.lines.map((line, i) => (
                <div key={i} className={`flex gap-4 rounded-xl px-4 py-3 ${line.a === "You" || line.a === "A" ? "border border-orange-100 bg-orange-50/50" : "border border-stone-100 bg-stone-50"}`}>
                  <span className={`w-12 shrink-0 text-sm font-bold ${line.a === "You" || line.a === "A" ? "text-orange-700" : "text-stone-500"}`}>{line.a}</span>
                  <div className="flex-1">
                    <div className="text-base font-medium text-stone-900">{line.jp}</div>
                    <div className="mt-0.5 text-sm text-stone-500">{line.en}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ═══════════ SURVIVAL ═══════════ */}
        <section id="survival" className="mt-14">
          <SectionHeader icon="globe" badge="Practical" title="Survival Japanese" subtitle="High-priority lines for real situations when you need to communicate quickly." />
          <div className="mt-6">
            <TabGroup tabs={survivalCats.map(c => [c, c === "all" ? "All" : c])} active={survivalCat} onChange={setSurvivalCat} />
          </div>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {survivalFiltered.map(item => (
              <Card key={item.jp} className="p-4">
                <div className="text-[11px] font-bold uppercase tracking-widest text-stone-400">{item.cat}</div>
                <div className="mt-2 text-xl font-bold text-stone-900">{item.jp}</div>
                <div className="mt-0.5 text-xs text-stone-500">{item.romaji}</div>
                <div className="mt-2 text-sm text-stone-600">{item.en}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════ CULTURE ═══════════ */}
        <section id="culture" className="mt-14">
          <SectionHeader icon="users" badge="Culture" title="Cultural Notes" subtitle="Language and culture are inseparable. Understanding these points will prevent social mistakes." />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {CULTURE_NOTES.map(note => (
              <Card key={note.title} className="p-5">
                <h3 className="text-base font-bold text-stone-900">{note.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{note.text}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════ COMMON MISTAKES ═══════════ */}
        <section id="mistakes" className="mt-14">
          <SectionHeader icon="alert" badge="Warnings" title="Common Mistakes" subtitle="Avoid these errors that almost every beginner makes." />
          <div className="mt-6 space-y-2.5">
            {COMMON_MISTAKES.map(item => (
              <Card key={item.wrong} className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </div>
                  <div>
                    <div className="font-semibold text-red-800">{item.wrong}</div>
                    <div className="mt-1.5 text-sm leading-relaxed text-stone-600">{item.right}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════ PRACTICE ═══════════ */}
        <section id="practice" className="mt-14">
          <SectionHeader icon="target" badge="Training" title="Daily Practice Drills" subtitle="Passive reading produces recognition but not recall. Use these drills to convert knowledge into active ability." />
          <div className="mt-6">
            <TabGroup
              tabs={[["kana", "Kana"], ["phrases", "Phrases"], ["grammar", "Grammar"], ["listening", "Listening"]]}
              active={practiceTab}
              onChange={setPracticeTab}
            />
          </div>
          <Card className="mt-4 p-5">
            <div className="space-y-2.5">
              {activePractice.map((line, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3">
                  <div className="mt-0.5 shrink-0 text-emerald-600"><Icon name="check" className="h-4 w-4" /></div>
                  <div className="text-sm leading-relaxed text-stone-700">{line}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ═══════════ ROADMAP ═══════════ */}
        <section id="roadmap" className="mt-14">
          <SectionHeader icon="map" badge="Plan" title="Study Roadmap" subtitle="A realistic timeline from absolute beginner to intermediate. Adjust based on your available daily study time." />
          <div className="mt-6 space-y-3">
            {ROADMAP.map((phase, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="flex">
                  <div className="w-2 shrink-0" style={{ backgroundColor: phase.color }} />
                  <div className="flex-1 p-5">
                    <div className="flex items-center gap-3">
                      <span className="rounded-md px-2.5 py-1 text-xs font-bold text-white" style={{ backgroundColor: phase.color }}>{phase.phase}</span>
                      <span className="text-lg font-bold text-stone-900">{phase.title}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{phase.tasks}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ═══════════ FOOTER ═══════════ */}
        <div className="mt-20 border-t border-stone-200 pt-8 text-center text-sm text-stone-400">
          <p>Japanese Learning Guide<br />
              © 2026 EugeneYip.com All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
