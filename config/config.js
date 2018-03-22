const defaultPa = require('./default/backend_path')
const envP  = require('./env/' + process.env.NODE_ENV + '.js');
const glob = require('glob')




function filesFunction(){
    
    var g = {
        models : glob.sync( defaultPa.files.models),
        routes : glob.sync(  defaultPa.files.routes),
        policies : glob.sync( defaultPa.files.policies )
    }
    var h = {
        title : defaultPa.title,
        routes : glob.sync(defaultPa.filesC.routes),
        controllers : glob.sync(defaultPa.filesC.controllers),
        services : glob.sync(defaultPa.filesC.services),
    }
    var path = {
        files:g,
        clientP :h,
        env_L : envP,
        sessionSecret: process.env.SESSION_SECRET || 'secret_income_keyy',
        sessionKey: 'sessionId'
    }
    
    return path;
}



module.exports = filesFunction;