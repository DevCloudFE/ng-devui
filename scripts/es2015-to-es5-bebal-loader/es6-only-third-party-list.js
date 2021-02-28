/**
 * 如果三方库只提供es6版本， 则添加到ES6_ONLY_THIRD_PARTY_LIST， 通过babel转换语法到es5
 */
const path = require('path');
const ES6_ONLY_THIRD_PARTY_LIST = [
    path.resolve('./node_modules/highlight.js') // ^10.0.0 no longer support ie 11
];
module.exports = ES6_ONLY_THIRD_PARTY_LIST;