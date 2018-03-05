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
                templateUrl: 'src/client/core/views/first.client.view.html'
            })
            .state('home',{
                url:'/home',
                templateUrl:  "src/client/core/views/select.client.view.html",
                data: {
                   roles:['user','admin'],
                   ignorePage : true
                }
                
            })
            .state('home.insert', {
                url: "/insert",
                templateUrl: "src/client/core/views/home.client.view.html"
            })
            .state('home.views', {
                url: "/views",
                templateUrl: "src/client/core/views/views.client.view.html",
                controller:"ViewsIncomeTotal",
                resolve:{
                    viewsTest: getInformation
               
                }
            })
            .state('home.views.show',{
                url:'/show',
                templateUrl:"src/client/core/views/showStatic.client.view.html",
               
            })
            .state('home.views.table',{
                url:'/table',
                templateUrl:"src/client/core/views/table.client.view.html",
               
            })
            getInformation.$inject = ['IncomeService'];
            function getInformation(IncomeService){
                return IncomeService.viewsInformation({}).$promise;
            }
            $urlRouterProvider.otherwise('/')
    }
   
}());