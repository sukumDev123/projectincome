(function (app) {
  'use strict';

  angular.module(app.angularModuleName, app.angularDependencies);

  angular
    .module(app.angularModuleName)
    .config(bootstrapConfig);

  function bootstrapConfig(){
    
  }
  angular.element(document).ready(function () {
    angular.bootstrap(document.querySelector('#core'), [app.angularModuleName], {
      strictDi: true
    });
  });


}(ApplicationConfig));