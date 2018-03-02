(function () {
    'use strict';

    angular
        .module('users')
        .controller('Authentication', Authentication)

    Authentication.$inject = ['$scope', 'Auth', 'UserService']
    /** @ngInject */
    function Authentication($scope, Auth, UserService) {
        $scope.users_check = Auth;

        $scope.signup = function(){
            UserService.usersSignup($scope.users).then(suc => {
                console.log(suc);
            }).catch(err => {
                console.log(err.data)
            })
        }
        $scope.signin = function(){
            UserService.usersSignin($scope.users).then(suc =>{
                console.log(suc)
            }).catch(err =>{
                console.log(err)
            })
        }

    }

}());