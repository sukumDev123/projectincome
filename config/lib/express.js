'use strict';
const path = require('path');
const express = require('express');
const hbs = require('express-hbs');
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser');
const config = require('../config')();
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');



const routes = (app) => {
    config.files.routes.forEach(element => {
        require(path.resolve(element))(app);
    });
}
const policy = (app) => {
    config.files.policies.forEach(ele => {    
        require(path.resolve(ele)).invokeRolesPolicies();
    })
}
var sessionFunction = (app) => {

    app.use(cookieParser())
    app.use(session({
        secret: 'secret_income_keyy',
        resave: false,
        saveUninitialized: true,

        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
}

const engine = (app) => {
    app.engine('client.view.html', hbs.express4({
        extname: '.client.view.html'
    }))
    app.set('views', './');
    app.set('view engine', 'client.view.html');
    app.use(express.static('./'));
}


var server = function () {
    const app = express();

    if (process.env.NODE_ENV === 'development') app.use( morgan('dev') );

    sessionFunction(app);

    engine(app);
    app.locals.jsFilesRoutes = config.clientP.routes
    app.locals.jsFilesControllers = config.clientP.controllers
    app.locals.jsFilesServices = config.clientP.services
    
    //routes express
    routes(app);

    policy(app);


    return app;
}

module.exports = server;