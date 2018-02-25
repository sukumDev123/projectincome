const defaultPa = require('./default/backend_path')
const envP  = require('./env/' + process.env.NODE_ENV + '.js');

module.exports = {
    file: defaultPa,
    env_L : envP 
}