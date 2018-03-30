(function () {
    'use strict';

    angular
        .module('wanna-routes')
        .config(ConfigConfig)

    /** @ngInject */
    ConfigConfig.$inject = ['$stateProvider']

    function ConfigConfig($stateProvider) {
        $stateProvider
            .state('home.insert.wanna', {
                url: "/wanna",
                templateUrl: "modules/wanna/client/views/wanna.client.view.html",
                controller: 'WannaController'
            })
    }

}());