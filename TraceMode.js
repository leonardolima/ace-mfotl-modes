define(function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");

  var TextMode = require("./text").Mode;
  var Tokenizer = require("../tokenizer").Tokenizer;
  var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;

  var HighlightRules = require("./TraceHighlightRules").HighlightRules;
  var BaseFoldMode = require("./folding/fold_mode").FoldMode;

  var Mode = function() {
    this.HighlightRules = HighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new BaseFoldMode();
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
      var worker = new WorkerClient(["ace"], "ace/mode/mfotl-trace", "MfotlTrace");
      worker.attachToDocument(session.getDocument());
      worker.on("errors", function(e) {
        session.setAnnotations(e.data);
      });
      return worker;
    };

  }).call(Mode.prototype);

  exports.Mode = Mode;
});
