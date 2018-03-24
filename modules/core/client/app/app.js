(function (window) {
        'use strict';

        var core = "main";

        var service = {
            angularModuleName: core,
            angularDependencies: ['ui.router', 'ngResource', 'ui.router.state.events', 'ui-notification','zingchart-angularjs'],
            registerModule: registerModuleFunction
        }

        window.ApplicationConfig = service;

        function registerModuleFunction(moduleName, dependencies) {
            angular.module(moduleName, dependencies || []);

            angular.module(core).requires.push(moduleName);
        }

        angular.module('ui-notification').config(['NotificationProvider',
        function (NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 6000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'bottom'
            });
        }]);




}(window));