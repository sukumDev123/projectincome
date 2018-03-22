(function () {
    'use strict';

    angular
        .module('users')
        .controller('Authentication', Authentication)

    Authentication.$inject = ['$scope', 'Auth', 'UserService', '$location', '$state', '$timeout','Notification']
    /** @ngInject */
    function Authentication($scope, Auth, UserService, $location, $state, $timeout,Notification) {
        
        $scope.authentication = Auth;
        if ($scope.authentication.users) {
            $location.path('/home/dashboard');
        }
        $scope.signup = function () {
            UserService.usersSignup($scope.users).then(suc => {
                $scope.authentication.users = suc;
                $state.go('home.dash')
            }).catch(err => {

                $scope.error = err.data;
                $timeout( function(){
                    $scope.error = false
                }, 5000 );
      
            })
        }
        $scope.signin = function () {
        
            UserService.usersSignin($scope.users).then(suc => {
                Notification.success({ message: 'Welcome ' + suc.first });
                $scope.authentication.users = suc;
                $state.go('home.dash')

            }).catch(err => {
              
                Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signin Error!', delay: 6000 });
            })
        }

    }

}());