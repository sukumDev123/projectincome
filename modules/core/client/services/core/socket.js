(function(){
    'use strict';

    angular
        .module('core')
        .factory('mySocket', Factory)

      
    /** @ngInject */
    function Factory(){
        const socket = io.connect();
        return socket ;
    }

}());