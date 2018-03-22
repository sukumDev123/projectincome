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
            templateUrl:'modules/setting/client/views/setting-home.clilent.view.html',
            data:{
                roles:['user','admin']
            }
        })
        .state('setting.type',{
            url:'/putType',
            templateUrl:'modules/setting/client/views/setting_type.client.view.html',
        })
        .state('setting.user',{
            url:'/users',
            templateUrl:'modules/setting/client/views/setting_user.client.view.html',
            controller: 'SettingUser'
        })
        
        
    }

}());