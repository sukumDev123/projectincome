//home.dash

(function () {
    'use strict';

    angular
        .module('dash-routes')
        .config(ConfigConfig)

    /** @ngInject */
    ConfigConfig.$inject = ['$stateProvider']

    function ConfigConfig($stateProvider) {
        $stateProvider
            .state('home.dash', {
                url: '/dashboard',
                controller: 'DashBoardController',
                resolve: {
                    DashGet: getInformation
                }
            })



        getInformation.$inject = ['IncomeService', 'Auth'];

        function getInformation(IncomeService, Auth) {
            return IncomeService.viewsInformation().$promise;
        }
    }

}());