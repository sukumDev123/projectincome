const config = require( "../default/backend_path");

'use strict';
module.exports = function(app){
    app.get('/',function(req,res){
       res.render('./src/client/core/views/layout',{
           title : config.title
       })
    })
}