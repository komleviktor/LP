'use strict';

module.exports = {
  "rules": {
    "no-debugger": "error",
    // "no-alert": "error",
    // "no-console": "error",
    "no-console": "off",
    "no-caller": "error",
    "no-else-return": "error",
    //"curly": ["error", "multi-or-nest", "consistent"],
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "camelcase": ["error", { "properties": "never" }],
    "comma-dangle": ["error", "never"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    // "consistent-this": ["error", "self"],
    "eol-last": "error",
    "func-style": ["warn", "declaration"],
    "indent": ["error", 2],
    "key-spacing": ["error", {
      "beforeColon": false,
      "afterColon": true
    }],
    "keyword-spacing": ["error", {
      "before": true,
      "after": true,
    }],
    "linebreak-style": ["error", "unix"],
    "max-depth": ["error", 10],
    // "max-lines": ["error", {"max": 300, "skipBlankLines": true}],
    "max-nested-callbacks": ["error", 4],
    "max-params": ["warn", 4],
    "max-statements-per-line": ["warn", { "max": 1 }],
    "max-statements": ["warn", 30],
    "new-cap": ["error", { "newIsCap": true }],
    "new-parens": "error",
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 4 }],
    "no-array-constructor": "error",
    "no-continue": "warn",
    "no-lonely-if": "error",
    "no-mixed-operators": "warn",
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
    "no-nested-ternary": "error",
    "no-new-object": "error",
    "no-restricted-syntax": [
      "error",
      "LabeledStatement",
      "WithStatement"
    ],
    "no-spaced-func": "error",
    "no-trailing-spaces": "error",
    "no-underscore-dangle": "warn",
    "no-unneeded-ternary": "error",
    "no-whitespace-before-property": "error",
    "object-curly-newline": "off",
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": ["error", {
      "allowMultiplePropertiesPerLine": true,
    }],
    "one-var-declaration-per-line": ["error", "initializations"],
    "operator-assignment": ["error", "always"],
    "operator-linebreak": ["error", "after"],
    "padded-blocks": ["error", "never"],
    "quote-props": ["error", "consistent-as-needed"],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "semi": ["error", "always"],
    "space-before-blocks": ["error", { "functions": "always" }],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never"
    }],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": ["error", {
      "words": true,
      "nonwords": false
    }],
    "spaced-comment": ["error", "always", {
      "markers": ["!"]
    }],
    "unicode-bom": ["error", "never"]
  }
};
