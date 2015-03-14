var fs = require("fs");
var path = require("path");

var Spellchecker = require("../lib");

describe("Parse", function() {
    it("should parse correctly an hunspell dictionary", function() {
        var sp = new Spellchecker();

        var DICT = sp.parse({
            dic: fs.readFileSync(path.resolve(__dirname, "fixtures/test.dic")),
            aff: fs.readFileSync(path.resolve(__dirname, "fixtures/test.aff"))
        });
        console.log(DICT);
    });
});
