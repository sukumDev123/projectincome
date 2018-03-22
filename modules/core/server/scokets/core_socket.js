'use strict'
//const Income = require('mongoose').model('Income')

var 
  path = require('path'),
  fs = require('fs'),
  http = require('http'),
  https = require('https'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  socketio = require('socket.io'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
 config = require(path.resolve('./config/config'))
  
module.exports = (io, app) => {

    io.on('connection', (socket) => {
        socket.on('InputNew', data => {
            var g = data;
            io.sockets.emit('showNew', g)
            
            
        })
       
        socket.on('disconnect', function(){
           console.log('user disconnect')
         });

    })
};