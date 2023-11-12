define(function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var logicalOperators =
      "TRUE|⊤|" +
      "FALSE|⊥|" +
      "EQCONST|=|" +
      "NOT|¬|" +
      "AND|∧|" +
      "OR|∨|" +
      "IMPLIES|→|" +
      "IFF|↔";

  var temporalOperators =
      "SINCE|" +
      "UNTIL|" +
      "RELEASE|" +
      "TRIGGER|" +
      "NEXT|○|" +
      "PREV|PREVIOUS|●|" +
      "GLOBALLY|ALWAYS|□|" +
      "EVENTUALLY|◊|" +
      "GLOBALLY_PAST|HISTORICALLY|■|" +
      "ONCE|⧫|" +
      "S|U|R|T|X|Y|G|F";

  var quantifierOperators =
      "EXISTS|∃|" +
      "FORALL|∀";

  var MyNewHighlightRules = function() {

    this.$rules = {
      "start" : [ {
        token : "keyword.operator",
        regex : quantifierOperators,
        next : "boundedvariable"
      }, {
        token : "keyword.operator",
        regex : temporalOperators,
        next : "interval"
      }, {
        token : "keyword.operator",
        regex : logicalOperators,
        next : "start"
      }, {
        defaultToken : "text"
      } ],

      "leftparen" : [ {
        token : "text",
        regex : /[(]/,
        next : "variableorconst"
      } ],

      "variableorconst" : [ {
        token : "constant.character",
        regex : /[\w]+|"[\w]+"/,
        next : "comma"
      } ],

      "rightparen" : [ {
        token : "text",
        regex : /[)]/,
        next : "start"
      } ],

      "boundedvariable" : [ {
        token : "keyword.other.unit",
        regex : /[\w-!]+/,
        next : "dot"
      } ],

      "dot" : [ {
        token : "text",
        regex : /[.]/,
        next : "start"
      } ],

      "interval" : [ {
        token : ["text", "constant.numeric", "text", "constant.numeric", "text"],
        regex : /\[|\(\d+,\d+\]|\)/,
        next : "start"
      } ]
    };

  };

  oop.inherits(MyNewHighlightRules, TextHighlightRules);

  exports.MyNewHighlightRules = MyNewHighlightRules;

});
