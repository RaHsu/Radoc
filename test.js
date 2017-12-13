const json = require('./modules/json');
const config = json.readConfig('package.json');

console.log(config.name);
