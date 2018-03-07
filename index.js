'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT  = process.env.PORT  || 3000;
const app = require('./config/lib/app')
const start = app.start();