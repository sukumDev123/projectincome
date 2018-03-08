'use strict'
const Income = require('mongoose').model('Income')

module.exports = (io, app) => {
    io.on('connection', (socket) => {
        socket.on('InputNew',data =>{
            io.sockets.emit('showNew',data)
        })

    })
};