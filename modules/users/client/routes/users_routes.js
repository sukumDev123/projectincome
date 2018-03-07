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
                templateUrl: 'modules/users/client/views/auth.client.view.html'

            })
            .state('auth.signin', {
                url: '/signin',
                templateUrl: 'modules/users/client/views/sign_in.client.view.html'

            })
            .state('auth.signup', {
                url: '/signup',
                templateUrl: 'modules/users/client/views/sign_up.client.view.html'

            })
    }

}());