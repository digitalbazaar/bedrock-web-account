// translate `main.js` to CommonJS
require = require('esm')(module);
module.exports = require('./main.js');