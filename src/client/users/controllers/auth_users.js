(function () {
    'use strict';

    angular
        .module('users')
        .controller('Authentication', Authentication)

    Authentication.$inject = ['$scope', 'Auth', 'UserService','$location','$state']
    /** @ngInject */
    function Authentication($scope, Auth, UserService,$location,$state) {
        $scope.authentication = Auth;
        if($scope.authentication.user){
            $location.path('/');
        }
        $scope.signup = function(){
            UserService.usersSignup($scope.users).then(suc => {
              $scope.authentication.user = suc;
              $state.go('home.insert')
            }).catch(err => {
                console.log(err.data)
            })
        }
        $scope.signin = function(){
            UserService.usersSignin($scope.users).then(suc =>{
                 $scope.authentication.user = suc;
              $state.go('home')
                 
            }).catch(err =>{
                console.log(err)
            })
        }

    }

}());