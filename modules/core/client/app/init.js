(function (app) {
  'use strict';

  angular.module(app.angularModuleName, app.angularDependencies)


  angular.element(document).ready(function () {
    angular.bootstrap(document.querySelector('#core'), [app.angularModuleName], {
      strictDi: true
    });
  });


}(ApplicationConfig));