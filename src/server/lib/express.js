const express = require('express');
const hbs = require('express-hbs');
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

    app.engine('client.view.html', hbs.express4({
        extname: '.server.view.html'
    }))
    app.set('views', './');
    app.set('view engine', 'client.view.html');
    app.use(express.static('./'));

    //routes express
    routes(app);
   

    return app;
}
module.exports = server;