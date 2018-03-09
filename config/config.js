const defaultPa = require('./default/backend_path')
const envP  = require('./env/' + process.env.NODE_ENV + '.js');
const glob = require('glob')




function filesFunction(){
    
    var g = {
        models : glob.sync( defaultPa.files.models),
        routes : glob.sync(  defaultPa.files.routes),
        policies : glob.sync( defaultPa.files.policies )
    }
    var path = {
        files:g,
        env_L : envP
    }
    
    return path;
}



module.exports = filesFunction;