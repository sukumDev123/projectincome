(function () {
    'use strict';

    angular
        .module('users_routes')
        .config(ConfigConfig)
      
    ConfigConfig.$inject = ['$stateProvider'];

    function ConfigConfig(  $stateProvider) {
        $stateProvider
            .state('auth', {
                url: '/users',
                templateUrl: 'src/client/users/views/auth.client.view.html'

            })
            .state('auth.signin', {
                url: '/signin',
                templateUrl: 'src/client/users/views/sign_in.client.view.html'

            })
            .state('auth.signup', {
                url: '/signup',
                templateUrl: 'src/client/users/views/sign_up.client.view.html'

            })
    }

}());