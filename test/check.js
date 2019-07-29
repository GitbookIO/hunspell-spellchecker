var fs = require("fs");
var path = require("path");
var assert = require("assert");

var Spellcheck = require("../lib");

describe("Dictionary", function() {
    var sp = new Spellcheck();

    sp.parse({
        dic: fs.readFileSync(path.resolve(__dirname, "fixtures/test.dic")),
        aff: fs.readFileSync(path.resolve(__dirname, "fixtures/test.aff"))
    });

    it("should return suggestions", function() {
        function uniq(array) {
            return Array.from(new Set(array));
        }

        // character replaced
        assert.deepEqual(uniq(sp.dict.findSimilarWords("hellp", 1)), ["hello"]);
        // character added
        assert.deepEqual(uniq(sp.dict.findSimilarWords("hellos", 1)), ["hello"]);
        // character removed
        assert.deepEqual(uniq(sp.dict.findSimilarWords("helo", 1)), ["hello"]);
        // characters transposed
        assert.deepEqual(uniq(sp.dict.findSimilarWords("hlelo", 1)), ["hello"]);
    });

    it("should correctly signal a correct word", function() {
        assert(sp.check("hello"));
    });

    it("should correctly signal a correct word (UPPERCASE)", function() {
        assert(sp.check("HELLO"));
    });

    it("should correctly signal an invalid word", function() {
        assert(!sp.check("helo"));
    });
});
