(function(){
    'use strict';

    angular
        .module('core')
        .service('mySocket', Factory)

      
    /** @ngInject */
    Factory.$inject = ['$state','Auth','$timeout']
    function Factory($state,Auth,$timeout){
        this.connect = function () {
            // Connect only when authenticated
           
              //if(Auth.users){
                this.socket = io();
             // }
            
          };
          this.connect();
      
          // Wrap the Socket.io 'on' method
          this.on = function (eventName, callback) {
            if (this.socket) {
              this.socket.on(eventName, function (data) {
                $timeout(function () {
                  callback(data);
                });
              });
            }
          };
      
          // Wrap the Socket.io 'emit' method
          this.emit = function (eventName, data) {
            if (this.socket) {
              this.socket.emit(eventName, data);
            }
          };
      
          // Wrap the Socket.io 'removeListener' method
          this.removeListener = function (eventName) {
            if (this.socket) {
              this.socket.removeListener(eventName);
            }
          };
    }

}());