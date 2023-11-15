"use strict";

var oop = require("../lib/oop");

var TextMode = require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var MfotlFormulaHighlightRules = require("./mfotl_formula_highlight_rules").MfotlFormulaHighlightRules;

var Mode = function() {
  this.HighlightRules = MfotlFormulaHighlightRules;
  this.$outdent = new MatchingBraceOutdent();
};
oop.inherits(Mode, TextMode);

(function() {
  this.lineCommentStart = "#";

  this.getNextLineIndent = function(state, line, tab) {
    var indent = this.$getIndent(line);
    return indent;
  };

  this.checkOutdent = function(state, line, input) {
    return this.$outdent.checkOutdent(line, input);
  };

  this.autoOutdent = function(state, doc, row) {
    this.$outdent.autoOutdent(doc, row);
  };

  this.createWorker = function(session) {
    return null;
  };

}).call(Mode.prototype);

exports.Mode = Mode;
