(function(){
    'use strict';

    angular
        .module('setting-routes')
        .config(ConfigConfig)

        ConfigConfig.$inject = ['$stateProvider']
    function ConfigConfig($stateProvider){
        $stateProvider
        .state('setting',{
            url:'/setting',
            templateUrl:'src/client/setting/views/setting-home.clilent.view.html',
        })
        .state('setting.type',{
            url:'/putType',
            templateUrl:'src/client/setting/views/setting_type.client.view.html',
        })
        
    }

}());