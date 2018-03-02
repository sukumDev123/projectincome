process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const express = require('./src/server/lib/express')
const mongoose = require('./src/server/lib/mongo')
const passport = require('./src/server/lib/passport');
const db = mongoose();
const app = express();
const ps = passport();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const socketCon = require('./src/server/lib/io')(io);
server.listen(3000)