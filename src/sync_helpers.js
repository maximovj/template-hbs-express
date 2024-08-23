const fs = require('fs');
const path = require('path');
const helpers = {};

const helpersPath = path.join(__dirname, 'helpers');

fs.readdirSync(helpersPath).forEach(file => {
    const helperName = path.basename(file, '.js');
    helpers[helperName] = require(path.join(helpersPath, file));
});

module.exports = Object.assign({}, ...Object.values(helpers));