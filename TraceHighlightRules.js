define(function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var MyNewHighlightRules = function() {

    this.$rules = {
      "start" : [ {
        token : ["constant.character", "keyword.operator"],
        regex : /(@)(\d+)/,
        next : "events"
      }],

      "events" : [ {
        token : ["text", "text", "text"],
        regex : /(\s+)(\w+)(\s*)/,
        next : "terms"
      }, {
        token : "text",
        regex : /(;)/,
        next : "start"
      }, {
        token : "text",
        regex : /(\s+)/,
        next : "events"
      }, {
        token : "empty",
        regex : "",
        next : "terms"
      } ],

      "terms" : [ {
        token : "string",
        regex : /[\w\[\]]+/,
        next : "terms"
      }, {
        token : "text",
        regex : /(,)(\s*)/,
        next : "terms"
      }, {
        token : "text",
        regex : /\(/,
        next : "terms"
      }, {
        token : "text",
        regex : /\s*\)/,
        next : "events"
      }, {
        token : "empty",
        regex : "",
        next : "start"
      } ]
    };

  };

  oop.inherits(MyNewHighlightRules, TextHighlightRules);

  exports.MyNewHighlightRules = MyNewHighlightRules;

});
