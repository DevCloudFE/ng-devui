module.exports = {
  rules: {
    "no-useless-constructor": "off",
    "no-useless-concat":"off",
    'no-unused-expressions': 'off',
    "max-params": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@angular-eslint/component-class-suffix": ["error", { suffixes: ["Component", "Directive"] }],
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "d",
        "style": "kebab-case"
      }
    ],
    "@angular-eslint/directive-class-suffix":["error", { suffixes: ["Component", "Directive"] }],
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": ["attribute","element"],
        "prefix": "d",
        "style": "camelCase"
      }
    ],
    "@angular-eslint/no-host-metadata-property": "error",
    "@angular-eslint/no-input-rename": "off",
    "@angular-eslint/no-inputs-metadata-property": "error",
    "@angular-eslint/no-output-on-prefix": "error",
    "@angular-eslint/no-output-rename": "error",
    "@angular-eslint/no-outputs-metadata-property": "error",
    "@angular-eslint/use-lifecycle-interface": "error",
    "@angular-eslint/use-pipe-transform-interface": "error",
    "complexity": [
      'error',
      {
        max: 40,
      },
    ],

    "curly": "error",
    "eol-last": "error",
    "eqeqeq": [
      "error",
      "smart"
    ],
    "max-len": [
      "error",
      {
        "code": 140
      }
    ],
    "no-console": [
      "error",
      {
        "allow": [
          "log",
          "warn",
          "dir",
          "timeLog",
          "assert",
          "clear",
          "count",
          "countReset",
          "group",
          "groupEnd",
          "table",
          "dirxml",
          "error",
          "groupCollapsed",
          "Console",
          "profile",
          "profileEnd",
          "timeStamp",
          "context"
        ]
      }
    ],

    "no-multiple-empty-lines": "error",
    "no-shadow": "off", // 使用@typescript-eslint/no-shadow,规避使用enum类型报错
    "no-trailing-spaces": "error",
    "no-unused-labels": "error",
    "no-use-before-define": "error",
    "no-var": "error",
    "prefer-const": "error",
    "semi": "error",
    "space-in-parens": [
      "error",
      "never"
    ],
    "spaced-comment": [
      "error",
      "always"
    ],
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        "FunctionDeclaration": {
          "parameters": "first"
        },
        "FunctionExpression": {
          "parameters": "first"
        }
      }
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        }
      }
    ],
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/semi": [
      "error",
      "always"
    ],
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "@typescript-eslint/no-shadow":"error",
    "@angular-eslint/no-output-on-prefix":"off",
    "@angular-eslint/use-pipe-transform-interface":"off",

    "prefer-promise-reject-errors": "off",
    'max-nested-callbacks': ['error', 6],
    "@typescript-eslint/no-this-alias":"off",
    "accessor-pairs": "off",
    "max-depth": "off",
    "@typescript-eslint/member-ordering": "off",
    "array-callback-return":"off"
  }
};
