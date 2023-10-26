// index.js
const myPlugin = require('./src/my-plugin');

module.exports = function(io) {
    myPlugin(io);
};