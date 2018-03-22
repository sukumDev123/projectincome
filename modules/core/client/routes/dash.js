//home.dash

(function () {
    'use strict';

    angular
        .module('dash-routes')
        .config(ConfigConfig);
        
    ConfigConfig.$inject = ['$stateProvider']
    function ConfigConfig($stateProvider) {
        $stateProvider
            .state('home.dash', {
                url: '/dashboard',
                controller: 'DashBoardController',
                templateUrl:'modules/core/client/views/dashboard.client.view.html',
                resolve: {
                     viewsTest: getInformation,
                }
            })
        getInformation.$inject = ['IncomeService', 'Auth'];

        function getInformation(IncomeService, Auth) {
            return IncomeService.viewsInformation().$promise;
        }
    }

}());