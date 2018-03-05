(function () {
    'use strict';

    angular
        .module('users')
        .controller('Authentication', Authentication)

    Authentication.$inject = ['$scope', 'Auth', 'UserService', '$location', '$state', '$timeout']
    /** @ngInject */
    function Authentication($scope, Auth, UserService, $location, $state, $timeout) {
        $scope.users = {}
        $scope.users.username = 'kungo000';
        $scope.users.password = '0859932942Ku'
        $scope.authentication = Auth;
        if ($scope.authentication.users) {
            $location.path('/home');
        }
        $scope.signup = function () {
            UserService.usersSignup($scope.users).then(suc => {
                $scope.authentication.users = suc;
                $state.go('home.insert')
            }).catch(err => {
                $scope.error = err.data;
                $timeout( function(){
                    $scope.error = false
                }, 5000 );
      
            })
        }
        $scope.signin = function () {
        
            UserService.usersSignin($scope.users).then(suc => {
                $scope.authentication.users = suc;
                $state.go('home')

            }).catch(err => {
                $scope.error = err.data;
                $timeout( function(){
                    $scope.error = false
                }, 5000 );
               
            })
        }

    }

}());