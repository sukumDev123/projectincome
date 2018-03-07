'use strict'
const path = require('path')
const config = require(path.resolve('./config/config'))
const chalk = require('chalk');
const express = require(path.resolve('./config/lib/express'))
const mongoose = require(path.resolve('./config/lib/mongo'))
const passport = require(path.resolve('./config/lib/passport'));
const db = mongoose();
const app = express();
const ps = passport();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const socketCon = require(path.resolve('./config/lib/io'))(io);

module.exports.start = function start(){
    server.listen(process.env.PORT,()=>{
        console.log("=========================================================")
        console.log(chalk.green('Run Host :   http://localhost:' + process.env.PORT ));
        console.log(chalk.green('ENV :    ' + process.env.NODE_ENV ));
        console.log(chalk.green('DB :    ' + config.env_L.mongoUri ));
        console.log("=========================================================")
        
    })
}