const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const config = require('../default/backend_path');
const morgan = require('morgan')
var routes = function (app) {
    config.files.routes.forEach(element => {
        require(element)(app);
    });
}
var server = function () {
    const app = express();
   


    if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));


    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.engine('client.view.html', consolidate.swig)
    app.set('views', './');
    app.set('view engine', 'client.view.html');
    app.use(express.static('./'));

    //routes express
    routes(app);
   

    return app;
}
module.exports = server;