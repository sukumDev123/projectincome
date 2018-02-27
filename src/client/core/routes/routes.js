(function () {
    'use strict';

    angular
        .module('core-routes')
        .config(Routes)
    Routes.$inject = ['$stateProvider']
    function Routes($stateProvider) {
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl: "src/client/core/views/select.client.view.html"
                
            })
            .state('home.insert', {
                url: "insert",
                templateUrl: "src/client/core/views/home.client.view.html"
            })
            .state('home.views', {
                url: "views",
                templateUrl: "src/client/core/views/views.client.view.html",
                controller:"ViewsIncomeTotal",
                resolve:{
                    viewsTest: getInformation
               
                }
            })
            getInformation.$inject = ['IncomeService'];
            function getInformation(IncomeService){
                return IncomeService.viewsInfor();
            }
    }
}());