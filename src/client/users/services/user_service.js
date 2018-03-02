(function(){
    'use strict';

    angular
        .module('users')
        .factory('UserService', Factory)

    /** @ngInject */
    Factory.$inject = ['$resource']
    function Factory($resource){
        var users = $resource('/api/users',{},{
            sigup: {
                method:'POST',
                url:'/api/users/signup'
            },
            signin : {
                method: 'POST',
                url:'/api/users/signin'
            }
        })
        angular.extend(users,{
            usersSignin : function(obj){
                return this.signin(obj).$promise;
            },
            usersSignup: function(obj){
                return this.sigup(obj).$promise;
            }
        })

        return users;

       
    }

}());