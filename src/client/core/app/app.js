(function(window){
    'use strict';

   var core = "main";

    var service = {
        registerModule: registerModuleFunction
    }

    function registerModuleFunction(moduleName,dependencies){
        angular.module(moduleName,dependencies || []);

        angular.module(core).requires.push(moduleName);
    }
    window.ApplicationConfig = service;





   angular.module(core,['ui.router','ngResource'])



   angular.element(document).ready(function(){
    angular.bootstrap(document.querySelector('#core'),[core],{
           strictDi: true
       });
   });

}(window));