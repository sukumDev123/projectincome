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
                controller : 'HeaderControl',
               
            })
            .state('home',{
                url:'/home',
                templateUrl:  "modules/core/client/views/select.client.view.html",
                data: {
                   roles:['user','admin'],
                   ignorePage : true
                },
                resolve:{
                    typeView : TypeAndSubType
                    
                },
                
            })
            .state('home.insert', {
                url: "/insert",
                templateUrl: "modules/core/client/views/home.client.view.html",
                
            })
            .state('home.insert.income',{
                url: "/income",
                templateUrl: "modules/core/client/views/income.client.view.html",
                controller : 'HomeController'
            })
            .state('home.insert.wanna',{
                url: "/wanna",
                templateUrl: "modules/core/client/views/wanna.client.view.html",
                controller : 'WannaController'
            })
            .state('home.views', {
                url: "/views",
                templateUrl: "modules/core/client/views/views.client.view.html",
                controller:"ViewsIncomeTotal",
                resolve:{
                    viewsTest: getInformation
                    
                }
            })
          
            TypeAndSubType.$inject = ['TypeAndSubType'];
            getInformation.$inject = ['IncomeService','Auth'];
            function getInformation(IncomeService,Auth){
                return IncomeService.viewsInformation().$promise;
            }
            function TypeAndSubType(TypeAndSubType){
                return TypeAndSubType.query({}).$promise;
            }
            $urlRouterProvider.otherwise('/')
    }
   
}());