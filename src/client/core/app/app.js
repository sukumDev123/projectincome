(function(window){
    'use strict';

   var core = "main";

    var service = {
        angularModuleName : core,
        angularDependencies: ['ui.router','ngResource'],
        registerModule: registerModuleFunction
    }

    function registerModuleFunction(moduleName,dependencies){
        angular.module(moduleName,dependencies || []);

        angular.module(core).requires.push(moduleName);
    }
    window.ApplicationConfig = service;





   
}(window));