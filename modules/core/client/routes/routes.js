(function () {
    'use strict';

    angular
        .module('core')
        .config(Routes)
        
    Routes.$inject = ['$stateProvider','$urlRouterProvider']
    function Routes($stateProvider,$urlRouterProvider) {
     
        $stateProvider
            .state('core',{
                url:'/',
                templateUrl: 'modules/core/client/views/first.client.view.html',
                controller : 'HeaderControl'
            })
            .state('home',{
                url:'/home',
                templateUrl:  "modules/core/client/views/select.client.view.html",
                data: {
                   roles:['user','admin'],
                   ignorePage : true
                }
                
            })
            .state('home.insert', {
                url: "/insert",
                templateUrl: "modules/core/client/views/home.client.view.html"
            })
            .state('home.views', {
                url: "/views",
                templateUrl: "modules/core/client/views/views.client.view.html",
                controller:"ViewsIncomeTotal",
                resolve:{
                    viewsTest: getInformation
               
                }
            })
           /* .state('home.views.show',{
                url:'/show',
                templateUrl:"modules/core/client/views/showStatic.client.view.html",
               
            })*/
           
            .state('home.views.day',{
                url:'/table/:type',
                templateUrl:"modules/core/client/views/table.client.view.html",
                controller:'ViewsIncomeTotal',
                
            })
            getInformation.$inject = ['IncomeService','Auth'];
            function getInformation(IncomeService,Auth){
                return IncomeService.viewsInformation().$promise;
            }
            $urlRouterProvider.otherwise('/')
    }
   
}());