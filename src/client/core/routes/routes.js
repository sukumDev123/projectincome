(function () {
    'use strict';

    angular
        .module('core-routes')
        .config(Routes)
        .run(rootScope)
    Routes.$inject = ['$stateProvider','$urlRouterProvider']
    function Routes($stateProvider,$urlRouterProvider) {
     
        $stateProvider
            .state('home',{
               
                url:'/',
                templateUrl: "src/client/core/views/select.client.view.html",
                data:{
                    roles : ['user']
                },
                controller:'CoreControl'
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
    rootScope.$inject=['$rootScope','Auth']
    function rootScope($rootScope,Auth){

       
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
            console.log("event,toState")
            // Verify that the state we are moving into has a redirect rule 
           /* if (toState.data && toState.data.redirect) {
                 // If it has then call injector.
                 var redirectTo = $injector.invoke(toState.data.redirect);
  
                 // Check that the call returned a state
                 if (redirectTo) {
                           // and go to that state instead
                           event.preventDefault();
                           $state.go(goToState);
                      }
                 }*/
            });
    }
}());