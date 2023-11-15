"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var MfotlSignatureHighlightRules = function() {

  this.$rules = {
    "start" : [ {
      token : "text",
      regex : /\w+/,
      next : "terms"
    }],

    "terms" : [ {
      token : ["constant.character", "text", "keyword.operator"],
      regex : /([\w]+)(:)([\w]+)/,
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
    } ]
  };

};

oop.inherits(MfotlSignatureHighlightRules, TextHighlightRules);

exports.MfotlSignatureHighlightRules = MfotlSignatureHighlightRules;
