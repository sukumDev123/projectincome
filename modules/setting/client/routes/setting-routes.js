(function(){
    'use strict';

    angular
        .module('setting-routes')
        .config(ConfigConfig)

        ConfigConfig.$inject = ['$stateProvider']
    function ConfigConfig($stateProvider){
        $stateProvider
        .state('home.type',{
            url:'/putType',
            templateUrl:'modules/setting/client/views/setting_type.client.view.html',
        })
        .state('home.user',{
            url:'/users',
            templateUrl:'modules/setting/client/views/setting_user.client.view.html',
            controller: 'SettingUser'
        })
        .state('home.total_infor',{
            url:'/conclude',
            templateUrl:'modules/setting/client/views/setting-home.clilent.view.html',
            controller:'ConcludeController',
            resolve : {
                viewsTest : getInformation
            }
            
        })
        getInformation.$inject = ['IncomeService','Auth']
        function getInformation(IncomeService, Auth) {
            return IncomeService.viewsInformation().$promise;
        }

    }

}());