(function(){
    'use strict';

    angular
        .module('users')
        .factory('UserService', Factory)

    /** @ngInject */
    Factory.$inject = ['$resource']
    function Factory($resource){
        var users = $resource('/api/users/:userId',{
            userId : '@id'
        },{
            sigup: {
                method:'POST',
                url:'/api/users/signup'
            },
            signin : {
                method: 'POST',
                url:'/api/users/signin'
            },
            update : {
                method : 'PUT'
            }
        })
        angular.extend(users,{
            usersSignin : function(obj){
                return this.signin(obj).$promise;
            },
            usersSignup: function(obj){
                return this.sigup(obj).$promise;
            },
            userUpdate : function(obj,id){
                return this.update({userId : id},obj).$promise;                
            }
        })

        return users;

       
    }

}());