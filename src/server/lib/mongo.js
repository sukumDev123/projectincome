'use strict';
const mongoose = require('mongoose')
const config = require('../config');
const path = require('path');
var modelFile = () => {
    config.file.files.models.forEach(element => {
        require(path.resolve(element));

    });
}
mongoose.Promise = require('bluebird');
module.exports = function() {
    mongoose.set('debug', config.env_L.debug);
    mongoose.Promise = global.Promise;
    
    var db = mongoose.connect(config.env_L.mongoUri);
    

    modelFile();
    return db;

}