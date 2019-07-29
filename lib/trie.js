var Trie = function(fragment, isWord, children) {
    this.fragment = fragment || "";
    this.isWord = isWord || false;
    this.children = children || null;
};

Trie.prototype.toJSON = function() {
    var childrenJSON = this.children.map(function(child) {
        return child.toJSON();
    });
    return {
        fragment: this.fragment,
        isWord: this.isWord,
        children: childrenJSON
    };
};

/**
    * foo, foobar, flop, fweeh
    * ("")
    * -> ("foo")
    * -> ("foo", [("bar")])
    * -> ("f", [("oo", [("bar")]), ("lop")])
    * -> ("f", [("oo", [("bar")]), ("lop"), ("weeh")])
    */
Trie.prototype.add = function (word) {
    if (this.fragment == word) {
        this.isWord = true;
        return;
    }
    if (!this.fragment.length && !this.children) {
        this.fragment = word;
        this.isWord = true;
        return;
    }
    var commonFragment = this.commonPrefix(this.fragment, word);

    if (commonFragment < this.fragment.length) {
        var leftFragment = this.fragment.substring(0, commonFragment);
        var rightFragment = this.fragment.substring(commonFragment);

        this.fragment = leftFragment;
        this.children = [new Trie(rightFragment, this.isWord, this.children)];
        this.isWord = false;
    }
    var rightWord = word.substring(commonFragment);

    if (this.children) {
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            if (this.commonPrefix(child.fragment, rightWord) > 0) {
                child.add(rightWord);
                return;
            }
        }
    }
    if (this.children) {
        this.children.push(new Trie(rightWord, true));
    }
    else {
        this.children = [new Trie(rightWord, true)];
    }
};

Trie.prototype.commonPrefix = function (left, right) {
    var min_len = Math.min(left.length, right.length);
    for (var i = 0; i < min_len; i++) {
        if (left[i] != right[i]) {
            return i;
        }
    }
    return min_len;
};

Trie.prototype.findChar = function (char) {
    if (this.fragment.length == 0) {
        // root
        if (this.children) {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                var res = child.findChar(char);
                if (res) return res;
            }
        }
        return null;
    }

    if (this.fragment[0] == char) {
        return new Trie(this.fragment.substring(1), this.isWord, this.children);
    }

    return null;
};

module.exports = Trie;
