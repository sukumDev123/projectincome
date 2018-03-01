(function(){
    'use strict';

    angular
        .module('users')
        .factory('Auth', Auth)
    Auth.$inject = ['$window'];
    
    function Auth($window){
        var users = {
            users : $window.users
        }
        return users;
    };
}());