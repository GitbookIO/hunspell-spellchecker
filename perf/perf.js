var Spellcheck = require("../lib");
var fs = require('fs');
var path = require('path');

var start = new Date().getTime();

var sp = new Spellcheck();

sp.parse({
    dic: fs.readFileSync(path.resolve(__dirname, "en_US/en_US.dic")),
    aff: fs.readFileSync(path.resolve(__dirname, "en_US/en_US.aff"))
});


var words = ["'Twas", "brillig,", "and", "the", "slithy", "toves",
    "Did", "gyre", "and", "gimble", "in", "the", "wabe;",
    "All", "mimsy", "were", "the", "borogoves,",
    "And", "the", "mome", "raths", "outgrabe.",
    "Beware", "the", "Jabberwock,", "my", "son!",
    "The", "jaws", "that", "bite,", "the", "claws", "that", "catch!",
    "Beware", "the", "Jubjub", "bird,", "and", "shun",
    "The", "frumious", "Bandersnatch!",
    "He", "took", "his", "vorpal", "sword", "in", "hand:",
    "Long", "time", "the", "manxome", "foe", "he", "sought",
    "So", "rested", "he", "by", "the", "Tumtum", "tree,",
    "And", "stood", "awhile", "in", "thought.",
    "And", "as", "in", "uffish", "thought", "he", "stood,",
    "The", "Jabberwock,", "with", "eyes", "of", "flame,",
    "Came", "whiffling", "through", "the", "tulgey", "wood,",
    "And", "burbled", "as", "it", "came!",
    "One,", "two!", "One,", "two!", "and", "through", "and", "through",
    "The", "vorpal", "blade", "went", "snicker-snack!",
    "He", "left", "it", "dead,", "and", "with", "its", "head",
    "He", "went", "galumphing", "back.",
    "And", "hast", "thou", "slain", "the", "Jabberwock?",
    "Come", "to", "my", "arms,", "my", "beamish", "boy!",
    "O", "frabjous", "day!", "Callooh!", "Callay!",
    "He", "chortled", "in", "his", "joy.",
    "'Twas", "brillig,", "and", "the", "slithy", "toves",
    "Did", "gyre", "and", "gimble", "in", "the", "wabe;",
    "All", "mimsy", "were", "the", "borogoves,",
    "And", "the", "mome", "raths", "outgrabe."
];

var total = 0;
words.forEach(function (word) {
    var suggestions = sp.suggest(word);
    total += suggestions.length;
});

var end = new Date().getTime();

console.log(total + " suggestions in " + (end - start) + " ms");

