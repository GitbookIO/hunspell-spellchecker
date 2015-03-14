
var Dictionary = require("./dictionary");

var Spellchecker = function(dictionary) {
    this.dict = null;

    if (dictionary) this.use(dictionary);
};

// Use a parsed dictionary
Spellchecker.prototype.use = function(dictionary) {
    this.dict = new Dictionary(dictionary);
};

// Parse a dicitonary
Spellchecker.prototype.parse = function(dictionary) {
    var dict = new Dictionary();
    dict.parse(dictionary);

    return dict.toJSON();
};

module.exports = Spellchecker;
