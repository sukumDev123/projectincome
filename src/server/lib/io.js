'use strict';
module.exports = function(io){
    io.sockets.on('connection', function (socket) {
        socket.on('Enews', function (data) {

            io.sockets.emit('news', data);
          
        });
      });
}