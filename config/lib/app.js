'use strict'
const path = require('path')
const config = require(path.resolve('./config/config'))()
const chalk = require('chalk');
const express = require(path.resolve('./config/lib/express'))
const mongoose = require(path.resolve('./config/lib/mongo'))
const passport = require(path.resolve('./config/lib/passport'));
const db = mongoose();
const app = express();
const ps = passport();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const sockett = require(path.resolve('./modules/core/server/scokets/core_socket'))(io,app)

const os = require('os')
const networkInterfaces = os.networkInterfaces();

module.exports.start = function start() {
   
  
   server.listen(process.env.PORT, () => {
        console.log(chalk.rgb(181, 242, 38).bold("=========================================================\n"))
        console.log(chalk.rgb(181, 242, 38).bold('\tRun Host :   http://localhost:' + process.env.PORT));
        console.log(chalk.rgb(255, 255, 255).bold('\tENV : ' + process.env.NODE_ENV + ''));
        console.log(chalk.rgb(181, 242, 38).bold('\tDB :    ' + config.env_L.mongoUri));
        console.log(chalk.rgb(181, 242, 38).bold("\tIP ADDESS : " + networkInterfaces.enp0s26u1u2c4i2[0].address));
      
        console.log(chalk.rgb(181, 242, 38).bold("\n========================================================="))

    })
}