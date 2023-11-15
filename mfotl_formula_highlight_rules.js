"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var eqOperator1 = /(\w+)(\s)+(EQCONST|=)(\s+)([\w"\[\]]+)/;

var eqOperator2 = /([\w"\[\]]+)(\s)+(EQCONST|=)(\s+)(\w+)/;

var logicalOperators =
    "TRUE|⊤|" +
    "FALSE|⊥|" +
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

var MfotlFormulaHighlightRules = function() {

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
      token : "text",
      regex : /(\(+)|(\)+)/,
      next : "start"
    }, {
      token : ["variable.parameter", "text", "keyword.operator", "text", "string"],
      regex : eqOperator1,
      next : "start"
    }, {
      token : ["string", "text", "keyword.operator", "text", "variable.parameter"],
      regex : eqOperator2,
      next : "start"
    }, {
      token : "text",
      regex : /\w+/,
      next : "terms"
    }],

    "terms" : [ {
      token : "constant.character",
      regex : /[\w]+/,
      next : "terms"
    }, {
      token : "string",
      regex : /[\w"\[\]]+/,
      next : "terms"
    }, {
      token : "text",
      regex : /,/,
      next : "terms"
    }, {
      token : "text",
      regex : /\(/,
      next : "terms"
    }, {
      token : "text",
      regex : /\s*\)/,
      next : "start"
    } ],

    "boundedvariable" : [ {
      token : ["keyword.other.unit", "text"],
      regex : /([\w-!])+(.)/,
      next : "start"
    } ],

    "interval" : [ {
      token : ["text", "storage", "text", "storage", "text"],
      regex : /(\[|\()(\d+)(,)(\d+|∞)(\]|\))/,
      next : "start"
    }, {
      token : "empty",
      regex : "",
      next : "start"
    } ]
  };

};

oop.inherits(MfotlFormulaHighlightRules, TextHighlightRules);

exports.MfotlFormulaHighlightRules = MfotlFormulaHighlightRules;
