const express = require('express');
const hbs = require('express-hbs');
const passport = require('passport')
const bodyParser = require('body-parser');
const config = require('../default/backend_path');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
var routes = function (app) {
    config.files.routes.forEach(element => {
        require(path.resolve(element))(app);
    });
}
const policy = (app) => {
    require(path.resolve('./src/server/core/policies/core_polict')).invokeRolesPolicies();
}
var sessionFunction = (app) => {
    app.use(session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: true
    }))
    app.use(passport.initialize());
    app.use(passport.session());
}
var server = function () {
    const app = express();
   


    if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

    sessionFunction(app);

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
   
    policy(app);
    

    return app;
}
module.exports = server;