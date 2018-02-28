(function(app){
    'use strict';

    angular.module(app.angularModuleName,app.angularDependencies);

    angular
    .module(app.angularModuleName)
    .config(bootstrapConfig);

  bootstrapConfig.$inject = ['$compileProvider', '$locationProvider', '$httpProvider', '$logProvider'];

  function bootstrapConfig($compileProvider, $locationProvider, $httpProvider, $logProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).hashPrefix('!');

    //$httpProvider.interceptors.push('authInterceptor');

    // Disable debug data for production environment
    // @link https://docs.angularjs.org/guide/production
    //$compileProvider.debugInfoEnabled(app.applicationEnvironment !== 'production');
    //$logProvider.debugEnabled(app.applicationEnvironment !== 'production');
  }

   angular.element(document).ready(function(){
    angular.bootstrap(document.querySelector('#core'),[app.angularModuleName],{
           strictDi: true
       });
   });

}(ApplicationConfig));